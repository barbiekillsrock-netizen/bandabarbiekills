ALTER TABLE public.cost_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users"
ON public.cost_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

ALTER TABLE public.revenue_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users"
ON public.revenue_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);