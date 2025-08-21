-- Create enum for store types
CREATE TYPE store_type AS ENUM (
  'grocery', 'dairy', 'medical', 'stationery', 'bakery', 
  'fruits_vegetables', 'electronics', 'clothing', 'hardware', 'other'
);

-- Create enum for product categories
CREATE TYPE product_category AS ENUM (
  'groceries', 'stationery', 'snacks', 'household', 'electronics', 
  'bakery', 'fruits_vegetables', 'dairy', 'medical', 'clothing', 'other'
);

-- Create enum for payment methods
CREATE TYPE payment_method AS ENUM ('cash', 'upi', 'card', 'bank_transfer');

-- Create customer_profiles table for onboarding data
CREATE TABLE public.customer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  age INTEGER,
  preferred_language TEXT DEFAULT 'English',
  city TEXT,
  address TEXT,
  pincode TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  shopping_preferences product_category[],
  notifications_sms BOOLEAN DEFAULT false,
  notifications_email BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seller_profiles table for onboarding data
CREATE TABLE public.seller_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  shop_name TEXT NOT NULL,
  store_type store_type NOT NULL,
  shop_address TEXT NOT NULL,
  shop_pincode TEXT NOT NULL,
  shop_location_lat DECIMAL(10, 8),
  shop_location_lng DECIMAL(11, 8),
  owner_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT,
  opening_time TIME,
  closing_time TIME,
  weekly_holidays TEXT[],
  products_sold product_category[],
  delivery_available BOOLEAN DEFAULT false,
  payment_methods payment_method[],
  logo_url TEXT,
  store_image_url TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customer_profiles
CREATE POLICY "Users can view their own customer profile" 
ON public.customer_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customer profile" 
ON public.customer_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer profile" 
ON public.customer_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for seller_profiles
CREATE POLICY "Users can view their own seller profile" 
ON public.seller_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own seller profile" 
ON public.seller_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own seller profile" 
ON public.seller_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_customer_profiles_updated_at
BEFORE UPDATE ON public.customer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_profiles_updated_at
BEFORE UPDATE ON public.seller_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();