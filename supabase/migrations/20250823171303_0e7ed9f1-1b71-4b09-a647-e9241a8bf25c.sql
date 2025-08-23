-- Create public seller profiles table for customer-facing information
CREATE TABLE public.public_seller_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  store_type store_type NOT NULL,
  general_area TEXT, -- General area instead of exact address
  city TEXT,
  state TEXT,
  opening_time TIME,
  closing_time TIME,
  weekly_holidays TEXT[],
  products_sold TEXT[],
  delivery_available BOOLEAN DEFAULT false,
  payment_methods TEXT[],
  logo_url TEXT,
  store_image_url TEXT,
  rating NUMERIC DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(seller_id)
);

-- Enable RLS on public seller profiles
ALTER TABLE public.public_seller_profiles ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view public seller profiles (customer-facing info only)
CREATE POLICY "Anyone can view public seller profiles" 
ON public.public_seller_profiles 
FOR SELECT 
USING (true);

-- Only sellers can manage their own public profile
CREATE POLICY "Sellers can insert their own public profile" 
ON public.public_seller_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own public profile" 
ON public.public_seller_profiles 
FOR UPDATE 
USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own public profile" 
ON public.public_seller_profiles 
FOR DELETE 
USING (auth.uid() = seller_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_public_seller_profiles_updated_at
BEFORE UPDATE ON public.public_seller_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to sync public profile when seller profile is updated
CREATE OR REPLACE FUNCTION public.sync_public_seller_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update public profile
  INSERT INTO public.public_seller_profiles (
    seller_id,
    shop_name,
    store_type,
    general_area,
    city,
    state,
    opening_time,
    closing_time,
    weekly_holidays,
    products_sold,
    delivery_available,
    payment_methods,
    logo_url,
    store_image_url
  ) VALUES (
    NEW.user_id,
    NEW.shop_name,
    NEW.store_type,
    NEW.area_street, -- Use area_street as general_area
    NEW.state,
    NEW.state,
    NEW.opening_time,
    NEW.closing_time,
    NEW.weekly_holidays,
    NEW.products_sold,
    NEW.delivery_available,
    NEW.payment_methods,
    NEW.logo_url,
    NEW.store_image_url
  )
  ON CONFLICT (seller_id) 
  DO UPDATE SET
    shop_name = NEW.shop_name,
    store_type = NEW.store_type,
    general_area = NEW.area_street,
    city = NEW.state,
    state = NEW.state,
    opening_time = NEW.opening_time,
    closing_time = NEW.closing_time,
    weekly_holidays = NEW.weekly_holidays,
    products_sold = NEW.products_sold,
    delivery_available = NEW.delivery_available,
    payment_methods = NEW.payment_methods,
    logo_url = NEW.logo_url,
    store_image_url = NEW.store_image_url,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync public profile when seller profile changes
CREATE TRIGGER sync_public_seller_profile_trigger
AFTER INSERT OR UPDATE ON public.seller_profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_public_seller_profile();

-- Populate existing public profiles from current seller profiles
INSERT INTO public.public_seller_profiles (
  seller_id,
  shop_name,
  store_type,
  general_area,
  city,
  state,
  opening_time,
  closing_time,
  weekly_holidays,
  products_sold,
  delivery_available,
  payment_methods,
  logo_url,
  store_image_url
)
SELECT 
  user_id,
  shop_name,
  store_type,
  area_street,
  state,
  state,
  opening_time,
  closing_time,
  weekly_holidays,
  products_sold,
  delivery_available,
  payment_methods,
  logo_url,
  store_image_url
FROM public.seller_profiles
ON CONFLICT (seller_id) DO NOTHING;