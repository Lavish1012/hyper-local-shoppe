
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import InventoryTable from "../InventoryTable";

interface InventoryTabProps {
  inventoryItems: any[];
}

const InventoryTab = ({ inventoryItems }: InventoryTabProps) => {
  return (
    <div className="space-y-6">
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
          <InventoryTable items={inventoryItems} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryTab;
