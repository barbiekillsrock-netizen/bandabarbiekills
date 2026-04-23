CREATE OR REPLACE FUNCTION public.get_proposal_data(p_opportunity_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
    'guests', guests
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
$$;

GRANT EXECUTE ON FUNCTION public.get_proposal_data(uuid) TO anon, authenticated;