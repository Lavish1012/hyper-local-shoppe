import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
  id: string;
  customer_name: string;
  order_date: string;
  items_count: number;
  total_amount: string;
  status: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock_quantity: number;
  price: string;
  status: string;
}

export interface CustomerMessage {
  id: string;
  customer_name: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface SellerStats {
  todayOrders: number;
  todayRevenue: string;
  inventoryAlerts: number;
}

export const useSellerDashboardData = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  const [stats, setStats] = useState<SellerStats>({
    todayOrders: 0,
    todayRevenue: '₹0',
    inventoryAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // For now, we'll create placeholder data since orders/inventory tables don't exist yet
        // In a real app, you would fetch from actual tables
        const mockOrders: Order[] = [
          {
            id: `ORD-${Date.now()}-1`,
            customer_name: 'Sample Customer 1',
            order_date: new Date().toISOString().split('T')[0],
            items_count: 2,
            total_amount: '₹850.00',
            status: 'Pending'
          },
          {
            id: `ORD-${Date.now()}-2`,
            customer_name: 'Sample Customer 2',
            order_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            items_count: 1,
            total_amount: '₹320.00',
            status: 'Completed'
          }
        ];

        const mockInventory: InventoryItem[] = [
          {
            id: '1',
            name: 'Sample Product 1',
            sku: 'SKU-001',
            category: 'General',
            stock_quantity: 15,
            price: '₹299.00',
            status: 'In Stock'
          },
          {
            id: '2',
            name: 'Sample Product 2',
            sku: 'SKU-002',
            category: 'General',
            stock_quantity: 2,
            price: '₹150.00',
            status: 'Low Stock'
          },
          {
            id: '3',
            name: 'Sample Product 3',
            sku: 'SKU-003',
            category: 'General',
            stock_quantity: 0,
            price: '₹450.00',
            status: 'Out of Stock'
          }
        ];

        const mockMessages: CustomerMessage[] = [
          {
            id: '1',
            customer_name: 'John Doe',
            message: 'Is this product available for delivery today?',
            created_at: new Date().toISOString(),
            is_read: false
          },
          {
            id: '2',
            customer_name: 'Jane Smith',
            message: 'Thank you for the quick service!',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            is_read: false
          }
        ];

        const todayOrders = mockOrders.filter(order => 
          order.order_date === new Date().toISOString().split('T')[0]
        ).length;

        const todayRevenue = mockOrders
          .filter(order => order.order_date === new Date().toISOString().split('T')[0])
          .reduce((total, order) => {
            const amount = parseFloat(order.total_amount.replace('₹', '').replace(',', ''));
            return total + amount;
          }, 0);

        const inventoryAlerts = mockInventory.filter(item => 
          item.stock_quantity <= 5
        ).length;

        setOrders(mockOrders);
        setInventory(mockInventory);
        setMessages(mockMessages);
        setStats({
          todayOrders,
          todayRevenue: `₹${todayRevenue.toLocaleString()}`,
          inventoryAlerts
        });

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return {
    orders,
    inventory,
    messages,
    stats,
    loading,
    error,
    refetch: () => {
      if (user) {
        setLoading(true);
        // Re-run the fetch logic
      }
    }
  };
};