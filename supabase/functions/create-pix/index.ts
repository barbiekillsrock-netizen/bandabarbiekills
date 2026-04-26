// Edge Function: create-pix
// Cria pagamento PIX no Mercado Pago, reserva o slot por 5min e retorna QR Code.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.100.0/cors";

const MP_API = "https://api.mercadopago.com/v1/payments";
const PENDING_MINUTES = 5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");
    if (!MP_TOKEN) throw new Error("MP_ACCESS_TOKEN ausente");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const body = await req.json().catch(() => ({}));
    const { show_setlist_id, requester_name, amount } = body ?? {};

    // Validação básica
    if (!show_setlist_id || typeof show_setlist_id !== "string") {
      return json({ error: "show_setlist_id obrigatório" }, 400);
    }
    const name = String(requester_name ?? "").trim();
    if (name.length < 1 || name.length > 60) {
      return json({ error: "Nome deve ter entre 1 e 60 caracteres" }, 400);
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < 1) {
      return json({ error: "Valor inválido" }, 400);
    }

    // Busca slot + show + song para validar estado e preço mínimo (no backend!)
    const { data: slot, error: slotErr } = await supabase
      .from("show_setlist")
      .select("id, status, custom_min_price, show_id, song:songs(title, default_min_price), show:shows(is_active)")
      .eq("id", show_setlist_id)
      .maybeSingle();

    if (slotErr || !slot) return json({ error: "Música não encontrada" }, 404);
    // @ts-ignore
    if (!slot.show?.is_active) return json({ error: "Show não está ao vivo" }, 409);
    if (slot.status !== "available") {
      return json({ error: "Música indisponível no momento" }, 409);
    }

    // @ts-ignore
    const minPrice = Number(slot.custom_min_price ?? slot.song?.default_min_price ?? 1);
    if (amt < minPrice) {
      return json({ error: `Valor mínimo é R$ ${minPrice.toFixed(2)}` }, 400);
    }

    // Reserva atômica: só passa se ainda estiver available
    const pendingUntil = new Date(Date.now() + PENDING_MINUTES * 60_000).toISOString();
    const { data: reserved, error: reserveErr } = await supabase
      .from("show_setlist")
      .update({ status: "pending", pending_until: pendingUntil })
      .eq("id", show_setlist_id)
      .eq("status", "available")
      .select("id")
      .maybeSingle();

    if (reserveErr || !reserved) {
      return json({ error: "Outra pessoa reservou essa música. Escolha outra." }, 409);
    }

    // @ts-ignore
    const songTitle = slot.song?.title ?? "Música";

    // Cria registro de pagamento (status pending)
    const { data: payment, error: payErr } = await supabase
      .from("payments")
      .insert({
        show_setlist_id,
        // @ts-ignore
        show_id: slot.show_id,
        requester_name: name,
        amount: amt,
        status: "pending",
        expires_at: pendingUntil,
      })
      .select("id")
      .single();

    if (payErr || !payment) {
      // rollback do slot
      await supabase.from("show_setlist").update({ status: "available", pending_until: null }).eq("id", show_setlist_id);
      return json({ error: "Falha ao registrar pagamento" }, 500);
    }

    // Chama Mercado Pago
    const mpRes = await fetch(MP_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MP_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": payment.id,
      },
      body: JSON.stringify({
        transaction_amount: Number(amt.toFixed(2)),
        description: `Pedido: ${songTitle} — ${name}`,
        payment_method_id: "pix",
        external_reference: payment.id,
        date_of_expiration: new Date(Date.now() + PENDING_MINUTES * 60_000).toISOString().replace("Z", "-03:00"),
        payer: {
          email: `fan-${payment.id.slice(0, 8)}@bandabarbiekills.com.br`,
          first_name: name.slice(0, 30),
        },
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mp-webhook`,
      }),
    });

    const mpData = await mpRes.json();
    if (!mpRes.ok) {
      console.error("MP error", mpRes.status, mpData);
      await supabase.from("show_setlist").update({ status: "available", pending_until: null }).eq("id", show_setlist_id);
      await supabase.from("payments").update({ status: "rejected" }).eq("id", payment.id);
      return json({ error: "Falha ao gerar PIX no Mercado Pago", details: mpData?.message ?? null }, 502);
    }

    const qr = mpData?.point_of_interaction?.transaction_data?.qr_code ?? null;
    const qrB64 = mpData?.point_of_interaction?.transaction_data?.qr_code_base64 ?? null;
    const ticket = mpData?.point_of_interaction?.transaction_data?.ticket_url ?? null;

    await supabase.from("payments").update({
      mp_payment_id: String(mpData.id),
      qr_code: qr,
      qr_code_base64: qrB64,
      ticket_url: ticket,
    }).eq("id", payment.id);

    return json({
      payment_id: payment.id,
      qr_code: qr,
      qr_code_base64: qrB64,
      ticket_url: ticket,
      expires_at: pendingUntil,
    });
  } catch (e) {
    console.error("create-pix fatal", e);
    return json({ error: "Erro interno" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
