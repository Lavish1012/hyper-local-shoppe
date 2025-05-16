
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryItem {
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
}

const InventoryTable = ({ items }: InventoryTableProps) => {
  return (
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
        {items.map((item, i) => (
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
  );
};

export default InventoryTable;
