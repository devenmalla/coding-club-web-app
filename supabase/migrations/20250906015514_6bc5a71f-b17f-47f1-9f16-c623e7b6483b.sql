-- Create gallery table for storing activity photos
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  uploaded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery
CREATE POLICY "Everyone can view gallery images" 
ON public.gallery 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage gallery" 
ON public.gallery 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['club_mentor'::app_role, 'student_coordinator'::app_role])
));

-- Add trigger for gallery timestamps
CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add location column to events table
ALTER TABLE public.events ADD COLUMN location TEXT;

-- Add expire_at column to announcements table
ALTER TABLE public.announcements ADD COLUMN expire_at TIMESTAMP WITH TIME ZONE;