
// Sample data for seller dashboard

export const recentOrders = [
  { 
    id: "ORD-5892", 
    customer: "Amit Sharma", 
    date: "May 16, 2025", 
    items: 2, 
    total: "₹1,499.00", 
    status: "Ready for pickup" 
  },
  { 
    id: "ORD-5891", 
    customer: "Priya Patel", 
    date: "May 16, 2025", 
    items: 1, 
    total: "₹249.50", 
    status: "Completed" 
  },
  { 
    id: "ORD-5880", 
    customer: "Rahul Gupta", 
    date: "May 15, 2025", 
    items: 3, 
    total: "₹799.00", 
    status: "Completed" 
  },
  { 
    id: "ORD-5878", 
    customer: "Sneha Reddy", 
    date: "May 15, 2025", 
    items: 1, 
    total: "₹3,499.00", 
    status: "Completed" 
  },
  { 
    id: "ORD-5872", 
    customer: "Kiran Kumar", 
    date: "May 14, 2025", 
    items: 2, 
    total: "₹545.00", 
    status: "Completed" 
  }
];

export const inventoryItems = [
  {
    name: "Wireless Bluetooth Earbuds",
    sku: "EAR-001",
    category: "Electronics",
    stock: 15,
    price: "₹1,999.00",
    status: "In Stock"
  },
  {
    name: "Smart Fitness Tracker",
    sku: "FIT-101",
    category: "Electronics",
    stock: 8,
    price: "₹2,499.00",
    status: "In Stock"
  },
  {
    name: "Portable Power Bank 10000mAh",
    sku: "PWR-202",
    category: "Electronics",
    stock: 3,
    price: "₹999.00",
    status: "Low Stock"
  },
  {
    name: "USB-C Fast Charging Cable",
    sku: "CAB-303",
    category: "Accessories",
    stock: 42,
    price: "₹249.00",
    status: "In Stock"
  },
  {
    name: "Wireless Charging Pad",
    sku: "CHG-505",
    category: "Electronics",
    stock: 0,
    price: "₹799.00",
    status: "Out of Stock"
  }
];

export const customerMessages = [
  {
    id: 1,
    customer: "Vijay Mehta",
    message: "Do you have the Bluetooth earbuds in black color?",
    time: "10:23 AM",
    unread: true
  },
  {
    id: 2,
    customer: "Ananya Singh",
    message: "When will the smart watches be restocked?",
    time: "Yesterday",
    unread: true
  },
  {
    id: 3,
    customer: "Rohan Kapoor",
    message: "Thanks for the quick pickup experience!",
    time: "May 15",
    unread: false
  }
];
