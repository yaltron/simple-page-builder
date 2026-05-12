-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blogs
CREATE TABLE public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  featured_image text,
  featured_image_alt text,
  author text,
  category text,
  tags text[] DEFAULT '{}',
  focus_keyword text,
  secondary_keywords text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  word_count integer DEFAULT 0,
  reading_time integer DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blogs_status_published_at_idx ON public.blogs (status, published_at DESC);
CREATE INDEX blogs_slug_idx ON public.blogs (slug);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blogs"
  ON public.blogs FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can view all blogs"
  ON public.blogs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blogs"
  ON public.blogs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blogs"
  ON public.blogs FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blogs"
  ON public.blogs FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER blogs_touch_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Auto-set published_at when transitioning to published
CREATE OR REPLACE FUNCTION public.blogs_set_published_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blogs_published_at_trigger
  BEFORE INSERT OR UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.blogs_set_published_at();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog-images', 'blog-images', true, 5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif']);

CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));