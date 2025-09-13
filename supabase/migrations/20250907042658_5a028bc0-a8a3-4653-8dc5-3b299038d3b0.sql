-- Add registration open and close dates to events table
ALTER TABLE public.events 
ADD COLUMN registration_open_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN registration_close_date TIMESTAMP WITH TIME ZONE;