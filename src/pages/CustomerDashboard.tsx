import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Heart, MapPin, Star, Search, Filter, Package, Truck, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for customer dashboard
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: 3,
      total: 45.99,
      status: "Delivered",
      shop: "Fresh Fruits Market"
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      items: 2,
      total: 23.50,
      status: "In Transit",
      shop: "Local Bakery"
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      items: 5,
      total: 67.25,
      status: "Processing",
      shop: "Green Grocers"
    }
  ];

  const wishlistItems = [
    {
      id: "WISH-001",
      name: "Organic Honey",
      price: 12.99,
      shop: "Natural Foods Co.",
      image: "/placeholder.svg",
      available: true
    },
    {
      id: "WISH-002",
      name: "Artisan Bread",
      price: 8.50,
      shop: "Corner Bakery",
      image: "/placeholder.svg",
      available: false
    },
    {
      id: "WISH-003",
      name: "Fresh Strawberries",
      price: 5.99,
      shop: "Berry Farm",
      image: "/placeholder.svg",
      available: true
    }
  ];

  const nearbyStores = [
    {
      id: "STORE-001",
      name: "Fresh Market Plus",
      distance: "0.3 km",
      rating: 4.8,
      category: "Grocery",
      image: "/placeholder.svg"
    },
    {
      id: "STORE-002",
      name: "Artisan Coffee House",
      distance: "0.5 km",
      rating: 4.6,
      category: "Cafe",
      image: "/placeholder.svg"
    },
    {
      id: "STORE-003",
      name: "Local Pharmacy",
      distance: "0.7 km",
      rating: 4.9,
      category: "Health",
      image: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">Discover local businesses and manage your orders</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$456.73</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                  <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nearby Stores</p>
                  <p className="text-2xl font-bold text-gray-900">{nearbyStores.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="stores">Nearby Stores</TabsTrigger>
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
          </TabsList>

          {/* Recent Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>Track your recent purchases and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{order.shop} • {order.items} items</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${order.total}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Wishlist
                </CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.shop}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price}</span>
                        <Badge variant={item.available ? "default" : "secondary"}>
                          {item.available ? "Available" : "Out of Stock"}
                        </Badge>
                      </div>
                      <Button className="w-full mt-3" disabled={!item.available}>
                        {item.available ? "Add to Cart" : "Notify When Available"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nearby Stores Tab */}
          <TabsContent value="stores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Nearby Stores
                </CardTitle>
                <CardDescription>Discover local businesses in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyStores.map((store) => (
                    <div key={store.id} className="border rounded-lg p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold mb-1">{store.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{store.rating}</span>
                        <span className="text-sm text-gray-500">• {store.distance}</span>
                      </div>
                      <Badge variant="outline" className="mb-3">{store.category}</Badge>
                      <Button className="w-full">Visit Store</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browse Products Tab */}
          <TabsContent value="browse">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Browse Products
                </CardTitle>
                <CardDescription>Find products from local businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start searching to discover amazing local products!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;