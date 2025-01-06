export interface Product {
  id: number;
  name: string;
  price: number;
  category: "pastel" | "drink";
  description?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: "pending" | "preparing" | "ready";
  total: number;
  timestamp: Date;
}

export interface OrderHistory {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
}
