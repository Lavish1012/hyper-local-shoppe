
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import OrdersTable from "../OrdersTable";

interface OrdersTabProps {
  orders: any[];
}

const OrdersTab = ({ orders }: OrdersTabProps) => {
  return (
    <div className="space-y-6">
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
          <OrdersTable orders={orders} showCheckbox showActions />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTab;
