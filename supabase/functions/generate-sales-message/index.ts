import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Responde a requisições de pre-flight do navegador
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Busca a sua chave do Google que você salvou no Supabase
    // O código tenta os nomes mais prováveis que você cadastrou
    const GOOGLE_API_KEY =
      Deno.env.get("AI_API_KEY") || Deno.env.get("VITE_AI_API_KEY") || Deno.env.get("GOOGLE_AI_API_KEY");

    if (!GOOGLE_API_KEY) {
      throw new Error("Chave de API do Google não encontrada nos Secrets do Supabase.");
    }

    const { leadData, masterPrompt } = await req.json();

    // Monta a pergunta para o Gemini
    const userPrompt = `
      ${masterPrompt}

      DADOS DO LEAD PARA PERSONALIZAR A MENSAGEM:
      - Nome: ${leadData.client_name}
      - Evento: ${leadData.event_type}
      - Perfil: ${leadData.client_profile || "Não informado"}
      - Histórico: ${leadData.negotiation_history || "Nenhum"}
    `.trim();

    // Chamada DIRETA para o Google Gemini (Bypassing Lovable Gateway)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na API do Google:", errorData);
      throw new Error(`Erro do Google: ${response.status}`);
    }

    const data = await response.json();

    // Extrai o texto da estrutura de resposta do Google
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível gerar a mensagem.";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Erro na Edge Function:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
