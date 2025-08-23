
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Home,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  MessageSquare,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  return (
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
            <SidebarMenuButton tooltip="Orders" isActive={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
              <ShoppingBag />
              <span>Orders</span>
              <SidebarMenuBadge>2</SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Inventory" isActive={activeTab === "inventory"} onClick={() => setActiveTab("inventory")}>
              <Package />
              <span>Inventory</span>
              <SidebarMenuBadge>1</SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Products" isActive={activeTab === "products"} onClick={() => setActiveTab("products")}>
              <ShoppingBag />
              <span>Products</span>
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
  );
};

export default DashboardSidebar;
