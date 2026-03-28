import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GOOGLE_KEY =
      Deno.env.get("AI_API_KEY") || Deno.env.get("VITE_AI_API_KEY") || Deno.env.get("GOOGLE_AI_API_KEY");

    if (!GOOGLE_KEY) throw new Error("Chave de API não encontrada nos Secrets.");

    const { leadData, masterPrompt } = await req.json();

    const userPrompt = `
      ${masterPrompt}
      ---
      DADOS DO LEAD:
      Nome: ${leadData.client_name}
      Evento: ${leadData.event_type}
      Perfil: ${leadData.client_profile || "Não informado"}
      Histórico: ${leadData.negotiation_history || "Nenhum"}
    `.trim();

    // AJUSTE DE PM: Usando a rota v1 (estável) e o ID do Gemini 3 que você confirmou
    const MODEL_ID = "gemini-3-flash-preview";
    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL_ID}:generateContent?key=${GOOGLE_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("ERRO DETALHADO GOOGLE:", JSON.stringify(result));
      throw new Error(result.error?.message || `Erro Google: ${response.status}`);
    }

    const message = result.candidates?.[0]?.content?.parts?.[0]?.text || "IA não gerou resposta.";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("LOG DE ERRO FINAL:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
