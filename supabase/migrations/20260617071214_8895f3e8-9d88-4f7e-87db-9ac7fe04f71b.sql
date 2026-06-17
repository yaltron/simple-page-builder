
-- 1) When to visit checklist items
CREATE TABLE public.when_to_visit_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.when_to_visit_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.when_to_visit_items TO authenticated;
GRANT ALL ON public.when_to_visit_items TO service_role;

ALTER TABLE public.when_to_visit_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view when_to_visit_items"
  ON public.when_to_visit_items FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage when_to_visit_items insert"
  ON public.when_to_visit_items FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage when_to_visit_items update"
  ON public.when_to_visit_items FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage when_to_visit_items delete"
  ON public.when_to_visit_items FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER when_to_visit_items_touch
  BEFORE UPDATE ON public.when_to_visit_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed initial items
INSERT INTO public.when_to_visit_items (text, order_index, is_active) VALUES
  ('Couples who cannot conceive naturally', 1, true),
  ('Couples with recurrent pregnancy losses', 2, true),
  ('Couples carrying genetic disorders', 3, true),
  ('Men with fertility issues', 4, true),
  ('Women with ovarian problems', 5, true),
  ('Cancer patients preserving fertility', 6, true);

-- 2) Services: extra fields for full pages
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS full_content text,
  ADD COLUMN IF NOT EXISTS page_heading text,
  ADD COLUMN IF NOT EXISTS page_subtext text,
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS hero_image_url text,
  ADD COLUMN IF NOT EXISTS hero_image_alt text,
  ADD COLUMN IF NOT EXISTS key_points text[] NOT NULL DEFAULT '{}';

-- Backfill any blank slugs from title
UPDATE public.services
SET slug = regexp_replace(lower(coalesce(title,'')), '[^a-z0-9]+', '-', 'g')
WHERE slug IS NULL OR slug = '';

-- 3) Seed virtual_tour homepage_content row (idempotent)
INSERT INTO public.homepage_content (section, content)
VALUES ('virtual_tour', jsonb_build_object(
  'heading', 'Take a Virtual Tour of Our Clinic',
  'subtext', 'Explore our facilities from the comfort of your home.',
  'button_text', 'Watch Tour Video',
  'video_url', '',
  'autoplay', false,
  'is_active', true
))
ON CONFLICT (section) DO NOTHING;

-- 4) Address site setting
INSERT INTO public.site_settings (key, value, description)
VALUES ('address', jsonb_build_object('value', 'Soalteemod, Kathmandu, Nepal'), 'Clinic address shown in footer and contact page')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
