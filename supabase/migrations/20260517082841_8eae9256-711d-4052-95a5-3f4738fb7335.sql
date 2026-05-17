ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS follow_up_at timestamptz;

-- Update validation trigger to allow 'follow_up' status
CREATE OR REPLACE FUNCTION public.appointments_validate()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.preferred_time NOT IN ('Morning 8-11am','Afternoon 11am-2pm','Evening 2-5pm') THEN
    RAISE EXCEPTION 'Invalid preferred_time';
  END IF;
  IF NEW.status NOT IN ('new','confirmed','cancelled','completed','follow_up') THEN
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
$function$;