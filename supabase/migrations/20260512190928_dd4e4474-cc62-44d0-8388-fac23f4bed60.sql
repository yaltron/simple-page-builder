-- Seed default site settings rows for Chunk D features (idempotent)
INSERT INTO public.site_settings (key, value, description) VALUES
  ('announcement_bar', '{"is_active": false, "message": "🎉 Free consultation this week — book now!", "link_text": "", "link_url": "", "background_color": "#E6007E", "text_color": "#FFFFFF"}'::jsonb, 'Top announcement bar'),
  ('analytics', '{"ga4_id": "", "tawk_property_id": "", "tawk_widget_id": ""}'::jsonb, 'GA4 + Tawk.to chat IDs'),
  ('cookie_consent', '{"is_active": true, "message": "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.", "policy_url": "/privacy"}'::jsonb, 'Cookie consent banner'),
  ('patient_portal', '{"is_active": false, "title": "Patient Portal — Coming Soon", "description": "Access your reports, appointments and treatment journey securely online.", "cta_text": "Notify Me"}'::jsonb, 'Patient portal teaser')
ON CONFLICT (key) DO NOTHING;