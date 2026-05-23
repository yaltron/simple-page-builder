
-- 1) Tighten site-media public read policy: require name (blocks broad listing)
DROP POLICY IF EXISTS "Public can view site-media" ON storage.objects;
CREATE POLICY "Public can read individual site-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-media' AND name IS NOT NULL);

-- 2) Restrict resume uploads to uploads/{uuid}/<filename> path
DROP POLICY IF EXISTS "Anyone can upload a resume" ON storage.objects;
CREATE POLICY "Anyone can upload a resume to uuid path"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = 'uploads'
  AND (storage.foldername(name))[2] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

-- 3) Realtime channel authorization via RLS on realtime.messages
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- Admins can subscribe/broadcast to any channel
DROP POLICY IF EXISTS "Admins full realtime access" ON realtime.messages;
CREATE POLICY "Admins full realtime access"
ON realtime.messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Anyone (anon + authenticated) can subscribe to non-sensitive public channels
DROP POLICY IF EXISTS "Public realtime channels" ON realtime.messages;
CREATE POLICY "Public realtime channels"
ON realtime.messages FOR SELECT
TO anon, authenticated
USING (
  realtime.topic() LIKE 'moments_gallery%'
  OR realtime.topic() LIKE 'testimonials%'
  OR realtime.topic() LIKE 'doctors%'
);
