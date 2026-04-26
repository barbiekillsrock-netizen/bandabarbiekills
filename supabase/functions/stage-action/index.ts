// Edge Function: stage-action
// Operações administrativas do Painel de Palco (autenticado).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.100.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const supabaseAuth = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: claims, error: claimsErr } = await supabaseAuth.auth.getClaims(
    authHeader.replace("Bearer ", ""),
  );
  if (claimsErr || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const body = await req.json();
    const { action } = body;

    // Marcar música como tocada
    if (action === "mark_played") {
      const { setlist_id } = body;
      if (!setlist_id) return json({ error: "setlist_id obrigatório" }, 400);
      const now = new Date().toISOString();
      await supabase.from("show_setlist").update({ status: "played", played_at: now }).eq("id", setlist_id);
      await supabase.from("payments").update({ played_at: now })
        .eq("show_setlist_id", setlist_id).eq("status", "approved").is("played_at", null);
      return json({ ok: true });
    }

    // Pagamento manual (fallback de emergência)
    if (action === "manual_payment") {
      const { setlist_id, requester_name, amount } = body;
      if (!setlist_id || !requester_name) return json({ error: "Dados inválidos" }, 400);
      const { data: slot } = await supabase
        .from("show_setlist").select("show_id, status").eq("id", setlist_id).maybeSingle();
      if (!slot) return json({ error: "Slot não encontrado" }, 404);

      const now = new Date().toISOString();
      await supabase.from("payments").insert({
        show_setlist_id: setlist_id,
        show_id: slot.show_id,
        requester_name: String(requester_name).slice(0, 60),
        amount: Number(amount) || 0,
        status: "approved",
        is_manual: true,
        approved_at: now,
      });
      await supabase.from("show_setlist").update({
        status: "locked", locked_at: now, pending_until: null,
      }).eq("id", setlist_id);
      return json({ ok: true });
    }

    // Liberar slot manualmente (admin desbloqueia algo travado por engano)
    if (action === "release_slot") {
      const { setlist_id } = body;
      if (!setlist_id) return json({ error: "setlist_id obrigatório" }, 400);
      await supabase.from("show_setlist").update({
        status: "available", pending_until: null, locked_at: null, played_at: null,
      }).eq("id", setlist_id);
      return json({ ok: true });
    }

    // Toggle live (garante que apenas 1 show está ativo)
    if (action === "toggle_live") {
      const { show_id, is_active } = body;
      if (!show_id) return json({ error: "show_id obrigatório" }, 400);
      if (is_active) {
        await supabase.from("shows").update({ is_active: false }).neq("id", show_id);
      }
      await supabase.from("shows").update({ is_active: !!is_active }).eq("id", show_id);
      return json({ ok: true });
    }

    return json({ error: "Ação desconhecida" }, 400);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("stage-action error", msg);
    return json({ error: msg }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
