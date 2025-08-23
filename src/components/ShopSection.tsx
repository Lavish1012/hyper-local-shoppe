
import { useState, useEffect } from "react";
import { Star, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface PublicShop {
  id: string;
  shop_name: string;
  store_type: string;
  general_area: string | null;
  city: string | null;
  state: string | null;
  opening_time: string | null;
  closing_time: string | null;
  delivery_available: boolean | null;
  logo_url: string | null;
  store_image_url: string | null;
  rating: number | null;
  total_reviews: number | null;
}

const ShopSection = () => {
  const [shops, setShops] = useState<PublicShop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicShops();
  }, []);

  const fetchPublicShops = async () => {
    try {
      const { data, error } = await supabase
        .from('public_seller_profiles')
        .select('*')
        .limit(4);
      
      if (error) {
        console.error('Error fetching shops:', error);
        return;
      }
      
      setShops(data || []);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStoreImage = (shop: PublicShop) => {
    if (shop.store_image_url) return shop.store_image_url;
    
    // Fallback images based on store type
    const imageMap: Record<string, string> = {
      grocery: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      electronics: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      clothing: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      books: "https://images.unsplash.com/photo-1532018047052-a7e3de9eb59a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      pharmacy: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    
    return imageMap[shop.store_type] || imageMap.grocery;
  };

  const formatTime = (time: string | null) => {
    if (!time) return null;
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isShopOpen = (shop: PublicShop) => {
    if (!shop.opening_time || !shop.closing_time) return null;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = shop.opening_time.split(':').map(Number);
    const [closeHour, closeMin] = shop.closing_time.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Shops Nearby</h2>
            <p className="mt-2 text-gray-600">Explore top-rated local shops around you</p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View all shops <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {shops.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No shops available yet. Be the first seller to join!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shops.map((shop) => {
              const isOpen = isShopOpen(shop);
              return (
                <div 
                  key={shop.id}
                  className="shop-card rounded-lg overflow-hidden border bg-white"
                >
                  <div className="relative h-48">
                    <img 
                      src={getStoreImage(shop)}
                      alt={shop.shop_name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                      {shop.store_type.replace('_', ' ')}
                    </div>
                    {isOpen !== null && (
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                        isOpen ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isOpen ? 'Open' : 'Closed'}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{shop.shop_name}</h3>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">
                          {shop.rating ? shop.rating.toFixed(1) : '0.0'}
                        </span>
                        {shop.total_reviews && shop.total_reviews > 0 && (
                          <span className="ml-1 text-xs text-gray-500">
                            ({shop.total_reviews})
                          </span>
                        )}
                      </div>
                      {shop.general_area && (
                        <>
                          <span className="mx-2 text-gray-300">•</span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {shop.general_area}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {shop.closing_time && (
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {isOpen 
                            ? `Open until ${formatTime(shop.closing_time)}`
                            : shop.opening_time 
                              ? `Opens at ${formatTime(shop.opening_time)}`
                              : 'Hours not available'
                          }
                        </span>
                      </div>
                    )}
                    
                    {shop.delivery_available && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        🚚 Delivery Available
                      </div>
                    )}
                    
                    <Button variant="outline" className="mt-4 w-full">View Shop</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
