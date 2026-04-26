// Edge Function: mp-webhook
// Recebe notificações do Mercado Pago, valida e atualiza status de forma idempotente.
// PÚBLICA — não exige JWT (Mercado Pago não envia auth header).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";

const MP_API = "https://api.mercadopago.com/v1/payments";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");
    if (!MP_TOKEN) throw new Error("MP_ACCESS_TOKEN ausente");

    // MP envia: { action, type, data: { id } } OU query param ?id=&topic=
    const url = new URL(req.url);
    const queryId = url.searchParams.get("id") ?? url.searchParams.get("data.id");
    const queryTopic = url.searchParams.get("topic") ?? url.searchParams.get("type");

    let payload: any = {};
    try { payload = await req.json(); } catch { /* MP às vezes manda vazio */ }

    const eventType = payload?.type ?? payload?.action ?? queryTopic ?? "unknown";
    const mpPaymentId = String(payload?.data?.id ?? queryId ?? "");

    // Log SEMPRE (mesmo que ignorado)
    await supabase.from("mp_webhook_logs").insert({
      mp_payment_id: mpPaymentId || null,
      event_type: eventType,
      raw_payload: payload ?? {},
      processed: false,
    });

    // Só processamos eventos de payment
    if (!mpPaymentId || !String(eventType).toLowerCase().includes("payment")) {
      return ok({ ignored: true });
    }

    // Idempotência: se já temos pagamento aprovado com esse mp_payment_id, ignora
    const { data: existing } = await supabase
      .from("payments")
      .select("id, status, show_setlist_id")
      .eq("mp_payment_id", mpPaymentId)
      .maybeSingle();

    if (existing?.status === "approved") {
      await markLogProcessed(supabase, mpPaymentId);
      return ok({ already_approved: true });
    }

    // Busca status real no MP (nunca confiar no payload)
    const mpRes = await fetch(`${MP_API}/${mpPaymentId}`, {
      headers: { "Authorization": `Bearer ${MP_TOKEN}` },
    });
    if (!mpRes.ok) {
      const txt = await mpRes.text();
      await markLogError(supabase, mpPaymentId, `MP fetch ${mpRes.status}: ${txt}`);
      return ok({ error: "MP fetch failed" }, 200); // 200 evita re-entrega infinita
    }
    const mp = await mpRes.json();
    const mpStatus = mp.status; // approved | pending | rejected | cancelled | refunded
    const externalRef = mp.external_reference; // = payment.id

    // Localiza pagamento por external_reference (mais confiável)
    const { data: payment } = await supabase
      .from("payments")
      .select("id, show_setlist_id, status")
      .eq("id", externalRef)
      .maybeSingle();

    if (!payment) {
      await markLogError(supabase, mpPaymentId, "Payment not found by external_reference");
      return ok({ ignored: true });
    }

    // Mapeia status
    const statusMap: Record<string, string> = {
      approved: "approved",
      pending: "pending",
      in_process: "pending",
      rejected: "rejected",
      cancelled: "cancelled",
      refunded: "refunded",
    };
    const newStatus = statusMap[mpStatus] ?? "pending";

    // Atualiza pagamento
    await supabase.from("payments").update({
      status: newStatus,
      mp_payment_id: mpPaymentId,
      approved_at: newStatus === "approved" ? new Date().toISOString() : null,
    }).eq("id", payment.id);

    // Atualiza slot
    if (newStatus === "approved") {
      await supabase.from("show_setlist").update({
        status: "locked",
        locked_at: new Date().toISOString(),
        pending_until: null,
      }).eq("id", payment.show_setlist_id);
    } else if (["rejected", "cancelled", "refunded"].includes(newStatus)) {
      // Libera slot se ainda estava pending neste pagamento
      const { data: slot } = await supabase.from("show_setlist")
        .select("status").eq("id", payment.show_setlist_id).maybeSingle();
      if (slot?.status === "pending") {
        await supabase.from("show_setlist").update({
          status: "available", pending_until: null,
        }).eq("id", payment.show_setlist_id);
      }
    }

    await markLogProcessed(supabase, mpPaymentId);
    return ok({ ok: true, status: newStatus });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("mp-webhook fatal", msg);
    return ok({ error: msg }, 200); // 200 evita retry infinito do MP
  }
});

async function markLogProcessed(supabase: any, mpId: string) {
  await supabase.from("mp_webhook_logs")
    .update({ processed: true })
    .eq("mp_payment_id", mpId)
    .eq("processed", false);
}
async function markLogError(supabase: any, mpId: string, msg: string) {
  await supabase.from("mp_webhook_logs")
    .update({ error_message: msg })
    .eq("mp_payment_id", mpId)
    .eq("processed", false);
}
function ok(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
