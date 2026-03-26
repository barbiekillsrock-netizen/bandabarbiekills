DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.opportunities;

CREATE POLICY "Enable insert for anonymous users"
ON public.opportunities
FOR INSERT
TO anon
WITH CHECK (true);