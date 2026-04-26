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
    if (!GOOGLE_KEY) throw new Error("API_KEY_NAO_CONFIGURADA");

    const { leadData, masterPrompt } = await req.json();

    const userPrompt = `
      ${masterPrompt}
      ---
      DADOS DO LEAD:
      Nome: ${leadData.client_name}
      Evento: ${leadData.event_type}
      Perfil: ${leadData.client_profile || "Não informado"}
    `.trim();

    // AJUSTE DE OURO: Usando v1beta em vez de v1
    const MODEL_ID = "gemini-3-flash-preview";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GOOGLE_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("ERRO_GOOGLE_LOG:", JSON.stringify(result));
      throw new Error(result.error?.message || `Erro Google: ${response.status}`);
    }

    const message = result.candidates?.[0]?.content?.parts?.[0]?.text || "IA sem resposta.";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("LOG_DE_ERRO_FINAL:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
