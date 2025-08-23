-- Remove sensitive data columns from customer_profiles table
ALTER TABLE public.customer_profiles 
DROP COLUMN IF EXISTS location_lat,
DROP COLUMN IF EXISTS location_lng,
DROP COLUMN IF EXISTS house_number,
DROP COLUMN IF EXISTS address,
DROP COLUMN IF EXISTS pincode,
DROP COLUMN IF EXISTS landmark;