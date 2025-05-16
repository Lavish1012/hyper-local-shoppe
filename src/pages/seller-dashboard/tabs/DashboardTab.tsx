
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import StatCard from "../StatCard";
import OrdersTable from "../OrdersTable";
import CustomerMessages from "../CustomerMessages";

interface DashboardTabProps {
  orders: any[];
  customerMessages: any[];
}

const DashboardTab = ({ orders, customerMessages }: DashboardTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Today's Orders"
          value="12"
          trend="up"
          trendValue="+18% from yesterday"
        />
        
        <StatCard 
          title="Today's Revenue"
          value="₹8,459"
          trend="up"
          trendValue="+24% from yesterday"
        />
        
        <StatCard 
          title="Inventory Alerts"
          value="3"
          alert="2 low stock • 1 out of stock"
        />
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
              <OrdersTable orders={orders.slice(0, 5)} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <CustomerMessages messages={customerMessages} />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
