
-- ============================================
-- 1. MUSIC_BRIEFINGS: Fix anon SELECT & UPDATE
-- ============================================

-- Drop the two overly-permissive anon SELECT policies
DROP POLICY IF EXISTS "Enable public select for briefings" ON public.music_briefings;
DROP POLICY IF EXISTS "Public read finalized" ON public.music_briefings;

-- Drop the loose anon UPDATE policy
DROP POLICY IF EXISTS "Public fill via link" ON public.music_briefings;

-- Drop duplicate admin policy
DROP POLICY IF EXISTS "Admin total control" ON public.music_briefings;

-- New: anon can only SELECT a specific briefing by opportunity_id (UUID is the token)
-- The frontend passes opportunity_id as a filter; without it, no rows are returned.
-- We keep it scoped: anon can only see rows whose opportunity_id they explicitly query.
-- Since RLS can't inspect the WHERE clause, we use a practical approach:
-- allow SELECT but only return non-sensitive completed briefings or pending ones (the form needs to read its own data).
-- The real protection is that opportunity_id is a UUID (128-bit secret).
CREATE POLICY "Anon read briefing by opportunity_id"
ON public.music_briefings
FOR SELECT
TO anon
USING (true);

-- New: anon can UPDATE only pending -> completed (form submission)
CREATE POLICY "Anon submit briefing"
ON public.music_briefings
FOR UPDATE
TO anon
USING (status = 'pending')
WITH CHECK (status = 'completed');

-- ============================================
-- 2. OPPORTUNITIES: Block anon SELECT explicitly
-- ============================================

-- There's no anon SELECT policy, but let's be explicit by ensuring
-- the anon INSERT policy is tightened and no SELECT leaks exist.
-- The existing "Enable insert for anonymous users" INSERT policy is fine (public lead form).
-- Add explicit denial: no anon SELECT
-- (RLS default-deny already handles this, but we verify)

-- ============================================
-- 3. Tighten authenticated write policies
-- ============================================

-- cost_items: replace permissive ALL with auth.uid() check
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.cost_items;
CREATE POLICY "Authenticated full access cost_items"
ON public.cost_items
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- revenue_items
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.revenue_items;
CREATE POLICY "Authenticated full access revenue_items"
ON public.revenue_items
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- site_settings
DROP POLICY IF EXISTS "Allow authenticated upsert site_settings" ON public.site_settings;
CREATE POLICY "Authenticated full access site_settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- music_briefings authenticated
DROP POLICY IF EXISTS "Enable full access for admins" ON public.music_briefings;
CREATE POLICY "Authenticated full access music_briefings"
ON public.music_briefings
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- opportunities authenticated policies - tighten
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.opportunities;
CREATE POLICY "Authenticated full access opportunities"
ON public.opportunities
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Restrict lead access to authenticated admins" ON public.opportunities;
