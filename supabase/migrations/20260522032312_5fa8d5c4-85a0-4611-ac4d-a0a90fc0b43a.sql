
CREATE TABLE public.moments_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  image_alt text,
  span_class text NOT NULL DEFAULT 'normal' CHECK (span_class IN ('normal','wide','wider','high')),
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_moments_gallery_active_order ON public.moments_gallery (is_active, order_index);

CREATE TRIGGER moments_gallery_touch_updated_at
BEFORE UPDATE ON public.moments_gallery
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.moments_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active moments"
  ON public.moments_gallery FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can view all moments"
  ON public.moments_gallery FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert moments"
  ON public.moments_gallery FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update moments"
  ON public.moments_gallery FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete moments"
  ON public.moments_gallery FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
