
-- Careers tables
CREATE TABLE public.career_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text,
  type text,
  location text,
  experience text,
  description text,
  requirements text,
  is_active boolean NOT NULL DEFAULT true,
  deadline date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid REFERENCES public.career_listings(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  cover_letter text,
  resume_url text,
  portfolio_url text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Validation trigger for status + type
CREATE OR REPLACE FUNCTION public.career_applications_validate()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status NOT IN ('new','reviewing','shortlisted','rejected','hired') THEN
    RAISE EXCEPTION 'Invalid status';
  END IF;
  IF length(trim(NEW.full_name)) = 0 THEN RAISE EXCEPTION 'full_name required'; END IF;
  IF length(trim(NEW.email)) = 0 THEN RAISE EXCEPTION 'email required'; END IF;
  IF length(trim(NEW.phone)) = 0 THEN RAISE EXCEPTION 'phone required'; END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER career_applications_validate_trg
  BEFORE INSERT OR UPDATE ON public.career_applications
  FOR EACH ROW EXECUTE FUNCTION public.career_applications_validate();

CREATE TRIGGER career_applications_touch
  BEFORE UPDATE ON public.career_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER career_listings_touch
  BEFORE UPDATE ON public.career_listings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.career_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- career_listings policies
CREATE POLICY "Public can view active listings"
  ON public.career_listings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all listings"
  ON public.career_listings FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert listings"
  ON public.career_listings FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update listings"
  ON public.career_listings FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete listings"
  ON public.career_listings FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- career_applications policies
CREATE POLICY "Anyone can submit applications"
  ON public.career_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view applications"
  ON public.career_applications FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update applications"
  ON public.career_applications FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete applications"
  ON public.career_applications FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Gallery video_url
ALTER TABLE public.gallery_items
  ADD COLUMN IF NOT EXISTS video_url text;

-- Resumes storage bucket (private)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('resumes', 'resumes', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload a resume"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can read resumes"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resumes"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.career_applications;
