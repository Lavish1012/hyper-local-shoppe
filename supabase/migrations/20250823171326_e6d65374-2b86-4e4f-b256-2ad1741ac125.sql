-- Fix function security by setting search_path
CREATE OR REPLACE FUNCTION public.sync_public_seller_profile()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = 'public'
AS $$
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
$$;