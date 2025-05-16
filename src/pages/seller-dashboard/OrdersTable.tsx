
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

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
  showCheckbox?: boolean;
  showActions?: boolean;
}

const OrdersTable = ({ orders, showCheckbox = false, showActions = false }: OrdersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showCheckbox && (
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
          )}
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          {showActions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, i) => (
          <TableRow key={i}>
            {showCheckbox && (
              <TableCell>
                <Checkbox />
              </TableCell>
            )}
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
            {showActions && (
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
