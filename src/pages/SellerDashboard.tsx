
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "./seller-dashboard/DashboardHeader";
import DashboardSidebar from "./seller-dashboard/DashboardSidebar";
import DashboardTab from "./seller-dashboard/tabs/DashboardTab";
import OrdersTab from "./seller-dashboard/tabs/OrdersTab";
import InventoryTab from "./seller-dashboard/tabs/InventoryTab";
import { useSellerDashboardData } from "@/hooks/useSellerDashboardData";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { orders, inventory, messages, stats, loading, error } = useSellerDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                <DashboardTab orders={orders} customerMessages={messages} stats={stats} />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrdersTab orders={orders} />
              </TabsContent>
              
              <TabsContent value="inventory">
                <InventoryTab inventoryItems={inventory} />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SellerDashboard;
