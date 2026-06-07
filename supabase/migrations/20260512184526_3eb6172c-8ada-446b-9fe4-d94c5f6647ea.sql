
-- POPUP BANNERS
CREATE TABLE public.popup_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text,
  image_alt text,
  button_text text,
  button_url text,
  is_active boolean NOT NULL DEFAULT false,
  show_after_seconds integer NOT NULL DEFAULT 3,
  show_on_pages text[] NOT NULL DEFAULT ARRAY['all']::text[],
  show_once_per_session boolean NOT NULL DEFAULT true,
  background_color text DEFAULT '#FFFFFF',
  start_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.popup_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active popups"
  ON public.popup_banners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all popups"
  ON public.popup_banners FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert popups"
  ON public.popup_banners FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update popups"
  ON public.popup_banners FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete popups"
  ON public.popup_banners FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER popup_banners_touch
  BEFORE UPDATE ON public.popup_banners
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Ensure only one popup is active at a time
CREATE OR REPLACE FUNCTION public.popup_banners_single_active()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_active = true THEN
    UPDATE public.popup_banners
    SET is_active = false
    WHERE id <> NEW.id AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER popup_banners_single_active_trg
  AFTER INSERT OR UPDATE OF is_active ON public.popup_banners
  FOR EACH ROW EXECUTE FUNCTION public.popup_banners_single_active();

-- FAQS
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active faqs"
  ON public.faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all faqs"
  ON public.faqs FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert faqs"
  ON public.faqs FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update faqs"
  ON public.faqs FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete faqs"
  ON public.faqs FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER faqs_touch
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX idx_faqs_category_order ON public.faqs(category, order_index);

-- Seed FAQs from the existing static content
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
  ('What is infertility?', '<p>Infertility is defined as the inability to conceive after one year of regular, unprotected intercourse. For women over 35, this timeframe is reduced to six months. It can affect both men and women and may be caused by various factors including hormonal imbalances, structural problems, or lifestyle factors.</p>', 'General', 1),
  ('Is infertility primarily a woman''s problem?', '<p>No, infertility affects both men and women equally. About one-third of infertility cases are attributed to female factors, one-third to male factors, and the remaining third to a combination of both or unexplained causes.</p>', 'General', 2),
  ('Does age affect fertility?', '<p>Yes, age significantly affects fertility, particularly for women. Female fertility begins to decline after age 30 and more rapidly after 35.</p>', 'General', 3),
  ('What is the IVF process?', '<p>IVF (In Vitro Fertilization) involves several steps: ovarian stimulation, egg retrieval, fertilization in our laboratory, embryo development, and transfer to the uterus.</p>', 'IVF', 1),
  ('How many IVF cycles are usually needed?', '<p>The number of IVF cycles needed varies by couple. Many couples achieve success within 2-3 cycles.</p>', 'IVF', 2),
  ('What is the cost of IVF at Subhashree IVF?', '<p>The cost varies depending on the treatment plan and medications. Please contact us for a personalised consultation and detailed estimate.</p>', 'Costs', 1);
