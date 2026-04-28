
-- Add proposal_terms column to opportunities (rich-text/markdown style content shown at end of public proposal)
ALTER TABLE public.opportunities
ADD COLUMN IF NOT EXISTS proposal_terms TEXT;

-- Default text for existing opportunities that have none set
UPDATE public.opportunities
SET proposal_terms = E'É possível realizar a contratação do som com outra empresa, importante ressaltar que é necessário a empresa incluir o rider de palco backline em sua proposta. Nosso rider pode ser acessado pelo endereço www.bandabarbiekills.com.br/rider\n\nAlimentação da equipe durante o evento por conta do contratante\n\nO pagamento pode ser parcelado de acordo com a preferência do contratante, em número de parcelas a ser definido, conforme estabelecido em contrato, com quitação prevista para até 15 dias antes do evento.'
WHERE proposal_terms IS NULL;

-- Update RPC to expose proposal_terms in the public proposal payload
CREATE OR REPLACE FUNCTION public.get_proposal_data(p_opportunity_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_opp jsonb;
  v_revenues jsonb;
BEGIN
  SELECT jsonb_build_object(
    'id', id,
    'client_name', client_name,
    'event_type', event_type,
    'event_date', event_date,
    'location', location,
    'guests', guests,
    'proposal_terms', proposal_terms
  )
  INTO v_opp
  FROM public.opportunities
  WHERE id = p_opportunity_id;

  IF v_opp IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', id,
      'title', title,
      'description', description,
      'sale_value', sale_value
    ) ORDER BY created_at
  ), '[]'::jsonb)
  INTO v_revenues
  FROM public.revenue_items
  WHERE opportunity_id = p_opportunity_id;

  RETURN jsonb_build_object(
    'opportunity', v_opp,
    'revenues', v_revenues
  );
END;
$function$;
