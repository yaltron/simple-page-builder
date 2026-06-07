
-- 1. Remove career_applications from realtime publication (not subscribed anywhere)
ALTER PUBLICATION supabase_realtime DROP TABLE public.career_applications;

-- 2. Harden resumes bucket INSERT: filename must start with a random UUID and be a resume file
DROP POLICY IF EXISTS "Anyone can upload a resume to uuid path" ON storage.objects;

CREATE POLICY "Anonymous resume upload to unguessable path"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = 'uploads'
  AND (storage.foldername(name))[2] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  AND storage.filename(name) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_.+\.(pdf|doc|docx)$'
);
