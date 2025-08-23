-- Fix seller_profiles table to prevent contact information harvesting
-- Ensure RLS is enabled on seller_profiles table
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;

-- Create secure policies for seller_profiles that restrict access to sensitive contact info
CREATE POLICY "Authenticated sellers can view their own profile only"
ON public.seller_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated sellers can insert their own profile only"
ON public.seller_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated sellers can update their own profile only"
ON public.seller_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);