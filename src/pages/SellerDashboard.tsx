
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "./seller-dashboard/DashboardHeader";
import DashboardSidebar from "./seller-dashboard/DashboardSidebar";
import DashboardTab from "./seller-dashboard/tabs/DashboardTab";
import OrdersTab from "./seller-dashboard/tabs/OrdersTab";
import InventoryTab from "./seller-dashboard/tabs/InventoryTab";
import { recentOrders, inventoryItems, customerMessages } from "./seller-dashboard/data";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <SidebarInset className="p-0">
          <DashboardHeader title="Seller Dashboard" />
          
          <div className="p-6">
            <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <DashboardTab orders={recentOrders} customerMessages={customerMessages} />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrdersTab orders={recentOrders} />
              </TabsContent>
              
              <TabsContent value="inventory">
                <InventoryTab inventoryItems={inventoryItems} />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SellerDashboard;
