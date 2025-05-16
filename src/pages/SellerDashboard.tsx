
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  Home,
  Package,
  ShoppingBag,
  Users,
  ChevronRight,
  Plus,
  TrendingUp,
  Calendar,
  Search,
  Bell,
  Filter,
  LayoutDashboard,
  Star,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
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

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const recentOrders = [
    { 
      id: "ORD-5892", 
      customer: "Amit Sharma", 
      date: "May 16, 2025", 
      items: 2, 
      total: "₹1,499.00", 
      status: "Ready for pickup" 
    },
    { 
      id: "ORD-5891", 
      customer: "Priya Patel", 
      date: "May 16, 2025", 
      items: 1, 
      total: "₹249.50", 
      status: "Completed" 
    },
    { 
      id: "ORD-5880", 
      customer: "Rahul Gupta", 
      date: "May 15, 2025", 
      items: 3, 
      total: "₹799.00", 
      status: "Completed" 
    },
    { 
      id: "ORD-5878", 
      customer: "Sneha Reddy", 
      date: "May 15, 2025", 
      items: 1, 
      total: "₹3,499.00", 
      status: "Completed" 
    },
    { 
      id: "ORD-5872", 
      customer: "Kiran Kumar", 
      date: "May 14, 2025", 
      items: 2, 
      total: "₹545.00", 
      status: "Completed" 
    }
  ];

  const inventoryItems = [
    {
      name: "Wireless Bluetooth Earbuds",
      sku: "EAR-001",
      category: "Electronics",
      stock: 15,
      price: "₹1,999.00",
      status: "In Stock"
    },
    {
      name: "Smart Fitness Tracker",
      sku: "FIT-101",
      category: "Electronics",
      stock: 8,
      price: "₹2,499.00",
      status: "In Stock"
    },
    {
      name: "Portable Power Bank 10000mAh",
      sku: "PWR-202",
      category: "Electronics",
      stock: 3,
      price: "₹999.00",
      status: "Low Stock"
    },
    {
      name: "USB-C Fast Charging Cable",
      sku: "CAB-303",
      category: "Accessories",
      stock: 42,
      price: "₹249.00",
      status: "In Stock"
    },
    {
      name: "Wireless Charging Pad",
      sku: "CHG-505",
      category: "Electronics",
      stock: 0,
      price: "₹799.00",
      status: "Out of Stock"
    }
  ];

  const customerMessages = [
    {
      id: 1,
      customer: "Vijay Mehta",
      message: "Do you have the Bluetooth earbuds in black color?",
      time: "10:23 AM",
      unread: true
    },
    {
      id: 2,
      customer: "Ananya Singh",
      message: "When will the smart watches be restocked?",
      time: "Yesterday",
      unread: true
    },
    {
      id: 3,
      customer: "Rohan Kapoor",
      message: "Thanks for the quick pickup experience!",
      time: "May 15",
      unread: false
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-market-primary" />
              <span className="text-xl font-bold">Seller Portal</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
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
                <SidebarMenuButton tooltip="Inventory" onClick={() => setActiveTab("inventory")}>
                  <Package />
                  <span>Inventory</span>
                  <SidebarMenuBadge>1</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Customers">
                  <Users />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <TrendingUp />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Messages">
                  <MessageSquare />
                  <span>Messages</span>
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
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium">Modern Electronics</p>
                <p className="text-xs text-gray-500">New Delhi, India</p>
              </div>
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs ml-1">4.8</span>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-0">
          <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Seller Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search orders, products..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                May 16, 2025
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Today's Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +18% from yesterday
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Today's Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹8,459</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +24% from yesterday
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Inventory Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-amber-600 flex items-center mt-1">
                        2 low stock • 1 out of stock
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle>Recent Orders</CardTitle>
                          <Button variant="ghost" className="h-8 text-market-primary">
                            View All <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Items</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentOrders.slice(0, 5).map((order, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    order.status === "Ready for pickup" 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-blue-100 text-blue-800"
                                  }`}>
                                    {order.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Customer Messages</CardTitle>
                        <CardDescription>Recent inquiries from customers</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {customerMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`p-3 rounded-lg border ${
                              msg.unread ? "bg-market-primary/5 border-market-primary/20" : "bg-white"
                            }`}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{msg.customer}</span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">{msg.message}</p>
                          </div>
                        ))}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View All Messages
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">In-Store Pickup Orders</h2>
                    <p className="text-gray-600">Manage customer pickup orders</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <div className="relative block w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search orders..." className="pl-9" />
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "Ready for pickup" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Inventory</h2>
                    <p className="text-gray-600">Manage your product inventory</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-market-primary hover:bg-market-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                    <Button variant="outline">
                      Bulk Import
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="relative block w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search products..." className="pl-9" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          Category: All
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>Product Name</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventoryItems.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item.status === "In Stock" 
                                  ? "bg-green-100 text-green-800" 
                                  : item.status === "Low Stock" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SellerDashboard;
