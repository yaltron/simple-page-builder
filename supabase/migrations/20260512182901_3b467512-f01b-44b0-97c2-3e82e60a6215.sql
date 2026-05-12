-- Appointments table
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  service text,
  consultation_type text NOT NULL DEFAULT 'In-Clinic',
  message text,
  admin_notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Validation trigger (preferred_time and status enums via trigger, not CHECK, to remain mutable-friendly)
CREATE OR REPLACE FUNCTION public.appointments_validate()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.preferred_time NOT IN ('Morning 8-11am','Afternoon 11am-2pm','Evening 2-5pm') THEN
    RAISE EXCEPTION 'Invalid preferred_time';
  END IF;
  IF NEW.status NOT IN ('new','confirmed','cancelled','completed') THEN
    RAISE EXCEPTION 'Invalid status';
  END IF;
  IF length(trim(NEW.full_name)) = 0 THEN
    RAISE EXCEPTION 'full_name required';
  END IF;
  IF length(trim(NEW.phone)) = 0 THEN
    RAISE EXCEPTION 'phone required';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER appointments_validate_trg
BEFORE INSERT OR UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.appointments_validate();

CREATE TRIGGER appointments_touch_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- RLS: public can INSERT (booking form), only admins can SELECT/UPDATE/DELETE
CREATE POLICY "Anyone can create appointments"
  ON public.appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view appointments"
  ON public.appointments FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update appointments"
  ON public.appointments FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete appointments"
  ON public.appointments FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX idx_appointments_preferred_date ON public.appointments(preferred_date);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER TABLE public.appointments REPLICA IDENTITY FULL;