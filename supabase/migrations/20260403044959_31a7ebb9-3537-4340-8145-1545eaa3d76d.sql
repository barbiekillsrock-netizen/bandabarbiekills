
-- Remove the overly permissive anon SELECT policy
DROP POLICY IF EXISTS "Anon read briefing by opportunity_id" ON public.music_briefings;

-- Create a security-definer function that returns briefing data
-- only when the exact opportunity_id is provided
CREATE OR REPLACE FUNCTION public.get_briefing_by_opportunity(p_opportunity_id uuid)
RETURNS SETOF public.music_briefings
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.music_briefings
  WHERE opportunity_id = p_opportunity_id
  LIMIT 1;
$$;
