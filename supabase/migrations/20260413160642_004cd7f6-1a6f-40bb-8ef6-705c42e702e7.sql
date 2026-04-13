-- Allow anon to SELECT pending briefings so the UPDATE can find matching rows
CREATE POLICY "Anon can read pending briefings"
ON public.music_briefings
FOR SELECT
TO anon
USING (status = 'pending');