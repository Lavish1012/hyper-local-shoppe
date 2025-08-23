-- Fix profiles table RLS policies to prevent email harvesting
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create more secure policies that only allow authenticated users to access their own profile
CREATE POLICY "Authenticated users can view their own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own profile only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Also fix seller_profiles table to prevent contact info scraping
DROP POLICY IF EXISTS "Users can view their own seller profile" ON public.seller_profiles;
DROP POLICY IF EXISTS "Users can insert their own seller profile" ON public.seller_profiles;
DROP POLICY IF EXISTS "Users can update their own seller profile" ON public.seller_profiles;

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

-- Ensure RLS is enabled on seller_profiles table
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;