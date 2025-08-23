-- Create a separate table for highly sensitive customer data
CREATE TABLE public.customer_sensitive_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES customer_profiles(user_id) ON DELETE CASCADE,
  -- Exact location data (highly sensitive)
  location_lat NUMERIC,
  location_lng NUMERIC,
  -- Full address details (sensitive)
  house_number TEXT,
  address TEXT,
  pincode TEXT,
  landmark TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on sensitive data table
ALTER TABLE public.customer_sensitive_data ENABLE ROW LEVEL SECURITY;

-- Extremely restrictive policies for sensitive data
CREATE POLICY "Users can only access their own sensitive data" 
ON public.customer_sensitive_data 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_customer_sensitive_data_updated_at
BEFORE UPDATE ON public.customer_sensitive_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing sensitive data from customer_profiles to new table
INSERT INTO public.customer_sensitive_data (
  user_id,
  location_lat,
  location_lng,
  house_number,
  address,
  pincode,
  landmark
)
SELECT 
  user_id,
  location_lat,
  location_lng,
  house_number,
  address,
  pincode,
  landmark
FROM public.customer_profiles
WHERE location_lat IS NOT NULL 
   OR location_lng IS NOT NULL 
   OR house_number IS NOT NULL 
   OR address IS NOT NULL 
   OR pincode IS NOT NULL 
   OR landmark IS NOT NULL
ON CONFLICT (user_id) DO NOTHING;

-- Remove sensitive data from customer_profiles table
ALTER TABLE public.customer_profiles 
DROP COLUMN IF EXISTS location_lat,
DROP COLUMN IF EXISTS location_lng,
DROP COLUMN IF EXISTS house_number,
DROP COLUMN IF EXISTS address,
DROP COLUMN IF EXISTS pincode,
DROP COLUMN IF EXISTS landmark;

-- Create a view for general customer location (city/state level only)
CREATE OR REPLACE VIEW public.customer_general_location AS
SELECT 
  cp.user_id,
  cp.city,
  cp.state,
  cp.area_street,
  -- Only show general area, not exact address
  CASE 
    WHEN csd.user_id IS NOT NULL THEN 'Available'
    ELSE 'Not Set'
  END as address_status
FROM public.customer_profiles cp
LEFT JOIN public.customer_sensitive_data csd ON cp.user_id = csd.user_id;

-- Enable RLS on the view
ALTER VIEW public.customer_general_location SET (security_barrier = true);

-- Create policy for the view
CREATE POLICY "Users can view general location info" 
ON public.customer_general_location 
FOR SELECT 
USING (auth.uid() = user_id);