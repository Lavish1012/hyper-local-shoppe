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

        // Fetch real data from database
        const today = new Date().toISOString().split('T')[0];

        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('seller_id', user.id);

        if (ordersError) throw ordersError;

        // Transform orders data
        const transformedOrders: Order[] = (ordersData || []).map(order => ({
          id: order.id,
          customer_name: 'Customer', // We'll need to join with profiles later
          order_date: new Date(order.created_at).toISOString().split('T')[0],
          items_count: 1, // This will be calculated from order items later
          total_amount: `₹${order.total_amount}`,
          status: order.status
        }));

        // Fetch products (for inventory)
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('seller_id', user.id);

        if (productsError) throw productsError;

        // Transform products to inventory format
        const transformedInventory: InventoryItem[] = (productsData || []).map(product => ({
          id: product.id,
          name: product.name,
          sku: `SKU-${product.id.slice(0, 8)}`,
          category: product.category,
          stock_quantity: product.quantity,
          price: `₹${product.price}`,
          status: product.quantity > 5 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock'
        }));

        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('receiver_id', user.id)
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        // Transform messages
        const transformedMessages: CustomerMessage[] = (messagesData || []).map(message => ({
          id: message.id,
          customer_name: 'Customer', // We'll need to join with profiles later
          message: message.message,
          created_at: message.created_at,
          is_read: message.is_read
        }));

        // Calculate stats
        const todayOrders = transformedOrders.filter(order => 
          order.order_date === today
        ).length;

        const todayRevenue = transformedOrders
          .filter(order => order.order_date === today)
          .reduce((total, order) => {
            const amount = parseFloat(order.total_amount.replace('₹', '').replace(',', ''));
            return total + amount;
          }, 0);

        const inventoryAlerts = transformedInventory.filter(item => 
          item.stock_quantity <= 5
        ).length;

        setOrders(transformedOrders);
        setInventory(transformedInventory);
        setMessages(transformedMessages);
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