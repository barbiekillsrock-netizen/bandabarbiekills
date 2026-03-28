
-- Add RLS policies for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read and upsert site_settings
CREATE POLICY "Allow authenticated read site_settings"
ON public.site_settings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated upsert site_settings"
ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Add unique constraint on key for upsert
ALTER TABLE public.site_settings ADD CONSTRAINT site_settings_key_unique UNIQUE (key);
