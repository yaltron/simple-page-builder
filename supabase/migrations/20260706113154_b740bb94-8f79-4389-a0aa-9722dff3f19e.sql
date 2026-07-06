ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS nmc_number text;
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS nmc_color text DEFAULT '#8B0F50';