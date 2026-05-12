
CREATE TABLE public.homepage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view homepage content"
  ON public.homepage_content FOR SELECT USING (true);

CREATE POLICY "Admins can insert homepage content"
  ON public.homepage_content FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update homepage content"
  ON public.homepage_content FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete homepage content"
  ON public.homepage_content FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER homepage_content_touch
  BEFORE UPDATE ON public.homepage_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view about content"
  ON public.about_content FOR SELECT USING (true);

CREATE POLICY "Admins can insert about content"
  ON public.about_content FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update about content"
  ON public.about_content FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete about content"
  ON public.about_content FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER about_content_touch
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed homepage hero
INSERT INTO public.homepage_content (section, content) VALUES
  ('hero', jsonb_build_object(
    'headline', 'Bringing Happiness Into Your Life',
    'headline_highlight', 'Your Life',
    'subheadline', 'With over 12 years of excellence and 5,000+ successful treatments, Subhashree IVF & Fertility Centre has been transforming dreams of parenthood into beautiful realities for families across Nepal and beyond.',
    'cta_primary_text', 'Book Free Consultation',
    'cta_primary_url', '/contact',
    'cta_secondary_text', 'Watch Our Story',
    'story_video_url', 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'story_video_thumbnail', '',
    'story_video_thumbnail_alt', 'Our story',
    'slides', jsonb_build_array(
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=90&fit=crop',
      'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=90&fit=crop',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=90&fit=crop',
      'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=90&fit=crop',
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=90&fit=crop'
    )
  )),
  ('miracles', jsonb_build_object(
    'count', 5000,
    'count_suffix', '+',
    'heading', 'Miracles & Counting',
    'description', 'Every baby born at Subhashree IVF is a miracle we celebrate. These are the faces of hope, the smiles of joy, and the beginning of beautiful family stories.',
    'cta_text', 'Your Miracle Awaits',
    'cta_url', '/success-stories'
  ));

-- Seed about content
INSERT INTO public.about_content (section, content) VALUES
  ('story_images', jsonb_build_object(
    'images', jsonb_build_array(
      jsonb_build_object('url', '/src/assets/who-clinic.jpg', 'alt', 'Our clinic'),
      jsonb_build_object('url', '/src/assets/who-team.jpg', 'alt', 'Our team')
    ),
    'paragraph_1', 'Founded over 12 years ago, Subhashree IVF & Fertility Centre has grown into Nepal''s most trusted name in reproductive medicine. From our first clinic to today''s full-service centre of excellence, our mission has remained the same — bringing happiness into your life.',
    'paragraph_2', 'With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.'
  )),
  ('mission_vision', jsonb_build_object(
    'mission_title', 'Our Mission',
    'mission_text', 'To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support — at a cost accessible to all.',
    'vision_title', 'Our Vision',
    'vision_text', 'To be South Asia''s most trusted fertility centre, recognised for medical excellence, ethical practice and the joy we bring to families.'
  )),
  ('values', jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('icon', 'HeartHandshake', 'title', 'Compassion', 'description', 'Every patient is treated with empathy, dignity and unwavering support.'),
      jsonb_build_object('icon', 'ShieldCheck', 'title', 'Excellence', 'description', 'World-class technology and protocols, refined over more than a decade.'),
      jsonb_build_object('icon', 'Sparkles', 'title', 'Hope', 'description', 'We believe in the dream of every family — and work tirelessly to honour it.')
    )
  ));
