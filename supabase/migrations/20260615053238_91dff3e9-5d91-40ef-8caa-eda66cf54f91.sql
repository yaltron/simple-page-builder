
-- 1) Doctors: slug column
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS slug text;

UPDATE public.doctors
SET slug = lower(regexp_replace(regexp_replace(coalesce(name,''), '^\s*[Dd]r\.?\s*', ''), '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- Strip trailing hyphens
UPDATE public.doctors SET slug = regexp_replace(slug, '(^-+|-+$)', '', 'g') WHERE slug ~ '(^-|-$)';

CREATE UNIQUE INDEX IF NOT EXISTS doctors_slug_unique ON public.doctors(slug) WHERE slug IS NOT NULL;

-- 2) Trust features table
CREATE TABLE IF NOT EXISTS public.trust_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL DEFAULT '',
  full_content text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Sparkles',
  icon_bg_color text NOT NULL DEFAULT '#8B0F50',
  page_heading text NOT NULL DEFAULT '',
  page_subtext text NOT NULL DEFAULT '',
  meta_title text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.trust_features TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trust_features TO authenticated;
GRANT ALL ON public.trust_features TO service_role;

ALTER TABLE public.trust_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active trust features"
  ON public.trust_features FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage trust features"
  ON public.trust_features FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trust_features_touch_updated_at
  BEFORE UPDATE ON public.trust_features
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed
INSERT INTO public.trust_features (title, slug, short_description, full_content, icon, icon_bg_color, page_heading, page_subtext, meta_title, meta_description, order_index)
VALUES
  ('Personalised Plans', 'personalised-plans',
   'Tailored fertility treatment plans designed around your unique medical history and goals.',
   '<p>Every couple''s fertility journey is unique. Our specialists craft personalised treatment plans based on thorough diagnostics, your medical history, and your personal goals — ensuring the highest possible chances of success while keeping your comfort at the centre of every decision.</p>',
   'UserCheck', '#8B0F50',
   'Personalised Plans for Every Journey',
   'Treatment tailored to you — never one-size-fits-all.',
   'Personalised Fertility Plans | Shubhashree IVF',
   'Customised IVF and fertility treatment plans designed for your unique medical needs at Shubhashree IVF Clinic, Kathmandu.', 1),
  ('Emotional Support', 'emotional-support',
   'Compassionate counselling and emotional care at every stage of your journey.',
   '<p>Fertility treatment is as much an emotional journey as a medical one. Our dedicated counsellors and care coordinators are here to listen, reassure, and walk beside you — from the first consultation to your happy ending.</p>',
   'HeartHandshake', '#8B0F50',
   'Compassionate Emotional Support',
   'You''re never alone on this journey.',
   'Emotional Support | Shubhashree IVF',
   'Compassionate counselling and emotional support throughout your fertility journey at Shubhashree IVF, Kathmandu.', 2),
  ('Affordable Care', 'affordable-care',
   'Transparent pricing and flexible plans that make world-class fertility care accessible.',
   '<p>World-class fertility care should not be out of reach. We offer transparent pricing, flexible payment options, and packages tailored to different budgets — without compromising on quality, technology, or outcomes.</p>',
   'HandCoins', '#8B0F50',
   'Affordable, Transparent Fertility Care',
   'Quality fertility treatment at honest, accessible prices.',
   'Affordable IVF & Fertility Care | Shubhashree IVF',
   'Transparent pricing and flexible payment plans for IVF and fertility treatments at Shubhashree IVF, Kathmandu.', 3)
ON CONFLICT (slug) DO NOTHING;
