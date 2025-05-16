
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  ShoppingBag,
  Heart,
  Settings,
  MapPin,
  Search,
  Filter,
  Star,
  ChevronRight,
  Package,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("explore");

  const recentOrders = [
    {
      id: "ORD-7829",
      shop: "Modern Electronics",
      date: "May 12, 2025",
      status: "Ready for pickup",
      items: 2,
      total: "$89.99",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=200&auto=format"
    },
    {
      id: "ORD-7801",
      shop: "Fresh Grocers",
      date: "May 10, 2025",
      status: "Completed",
      items: 8,
      total: "$43.50",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=200&auto=format"
    }
  ];

  const nearbyItems = [
    {
      name: "Sony WH-1000XM5 Headphones",
      shop: "Modern Electronics",
      distance: "0.7 km",
      price: "$349.99",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&auto=format"
    },
    {
      name: "Fresh Organic Avocados",
      shop: "Green Market",
      distance: "1.2 km",
      price: "$3.99 each",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=200&auto=format"
    },
    {
      name: "Handcrafted Leather Wallet",
      shop: "Artisan Crafts",
      distance: "1.5 km",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=200&auto=format"
    },
    {
      name: "Organic Cotton T-Shirt",
      shop: "Eco Fashions",
      distance: "2.1 km",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format"
    }
  ];

  const savedItems = [
    {
      name: "Bose QuietComfort Earbuds",
      shop: "Sound Systems Plus",
      price: "$279.99",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200&auto=format"
    },
    {
      name: "Handmade Ceramic Mug Set",
      shop: "Artisan Crafts",
      price: "$38.50",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=200&auto=format"
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-market-primary" />
              <span className="text-xl font-bold">LocalMarket</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Home" isActive={activeTab === "explore"} onClick={() => setActiveTab("explore")}>
                  <Home />
                  <span>Explore</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Orders" onClick={() => setActiveTab("orders")}>
                  <ShoppingBag />
                  <span>Orders</span>
                  <SidebarMenuBadge>2</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Saved Items" onClick={() => setActiveTab("saved")}>
                  <Heart />
                  <span>Saved Items</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Notifications">
                  <Bell />
                  <span>Notifications</span>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Link to="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-0">
          <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">My Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>New Delhi, India</span>
              </div>
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="explore" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="explore">Explore Nearby</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="saved">Saved Items</TabsTrigger>
              </TabsList>
              
              <TabsContent value="explore" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Discover Nearby</h2>
                    <p className="text-gray-600">Products available at shops near you</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative block w-full md:w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search nearby products..." className="pl-9" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {nearbyItems.map((item, i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square w-full relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg font-semibold truncate">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.shop}</span>
                          <span className="flex items-center text-market-secondary font-medium">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {item.distance}
                          </span>
                        </div>
                        <p className="font-medium mt-2">{item.price}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button size="sm" className="bg-market-primary hover:bg-market-primary/90">
                          Reserve
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Popular Shops Nearby</h2>
                    <Button variant="link" className="text-market-primary">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=150&auto=format" 
                            alt="Shop"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Modern Electronics</h3>
                          <div className="flex items-center text-amber-500 text-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5" />
                            <span className="text-gray-600 ml-1">(42)</span>
                          </div>
                          <span className="text-xs text-gray-500">0.7 km • Open until 8 PM</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=150&auto=format" 
                            alt="Shop"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Fresh Grocers</h3>
                          <div className="flex items-center text-amber-500 text-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-gray-600 ml-1">(87)</span>
                          </div>
                          <span className="text-xs text-gray-500">1.2 km • Open until 9 PM</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=150&auto=format" 
                            alt="Shop"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Artisan Crafts</h3>
                          <div className="flex items-center text-amber-500 text-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <Star className="h-3.5 w-3.5" />
                            <span className="text-gray-600 ml-1">(29)</span>
                          </div>
                          <span className="text-xs text-gray-500">1.5 km • Open until 6 PM</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">My Orders</h2>
                  <p className="text-gray-600">Track and manage your current and previous orders</p>
                </div>
                
                <div className="space-y-4">
                  {recentOrders.map((order, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-24 h-24">
                            <img 
                              src={order.image} 
                              alt={order.shop}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-wrap justify-between gap-2">
                              <div>
                                <p className="font-medium">{order.shop}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "Ready for pickup" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.status}
                              </div>
                            </div>
                            <div className="flex justify-between items-end mt-3">
                              <div>
                                <div className="text-sm text-gray-500">Order #{order.id}</div>
                                <div className="text-sm">{order.items} items • {order.total}</div>
                              </div>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">Looking for older orders?</h3>
                  <p className="text-gray-500 mb-4">View your complete order history</p>
                  <Button>
                    View Order History
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Saved Items</h2>
                  <p className="text-gray-600">Products you've saved for later</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.map((item, i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square w-full relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.shop}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.price}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" className="bg-market-primary hover:bg-market-primary/90">
                              Find Nearby
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {savedItems.length < 3 && (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Clock className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">Save items for later</h3>
                    <p className="text-gray-500 mb-4">Explore products and click the heart icon to save them here</p>
                    <Button onClick={() => setActiveTab("explore")}>
                      Explore Products
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
