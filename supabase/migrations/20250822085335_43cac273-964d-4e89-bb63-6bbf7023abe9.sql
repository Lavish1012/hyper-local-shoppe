-- Add detailed address fields to customer_profiles table
ALTER TABLE customer_profiles 
ADD COLUMN house_number TEXT,
ADD COLUMN area_street TEXT,
ADD COLUMN landmark TEXT,
ADD COLUMN state TEXT;

-- Add detailed address fields to seller_profiles table  
ALTER TABLE seller_profiles
ADD COLUMN house_number TEXT,
ADD COLUMN area_street TEXT, 
ADD COLUMN landmark TEXT,
ADD COLUMN state TEXT;