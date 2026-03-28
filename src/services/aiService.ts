import { supabase } from "@/integrations/supabase/client";

interface LeadData {
  client_name: string;
  phone?: string | null;
  event_type?: string | null;
  event_date?: string | null;
  location?: string | null;
  guests?: number | null;
  client_profile?: string | null;
  negotiation_history?: string | null;
}

export async function generateAISalesMessage(
  leadData: LeadData,
  masterPrompt: string
): Promise<string> {
  const { data, error } = await supabase.functions.invoke("generate-sales-message", {
    body: { leadData, masterPrompt },
  });

  if (error) throw new Error(error.message || "Erro ao gerar mensagem de IA");
  if (data?.error) throw new Error(data.error);
  return data.message;
}
