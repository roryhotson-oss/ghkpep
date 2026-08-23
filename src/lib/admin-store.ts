import fs from 'fs';
import path from 'path';
import { products as initialProducts, type Product } from '@/data/products';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize products.json from products.ts if it doesn't exist
if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
}

// Initialize orders.json if it doesn't exist
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// Initialize subscribers.json if it doesn't exist
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
}

// --- Products ---
export function getProducts(): Product[] {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  return JSON.parse(data).map((product: Product) => ({
    ...product,
    stockQuantity: product.stockQuantity ?? 100,
    discountPercent: product.discountPercent ?? 0,
  }));
}

export function getProduct(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

export function addProduct(product: Product): void {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

export function updateProduct(slug: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.slug === slug);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(slug: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.slug !== slug);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// --- Orders ---
export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: { slug: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  channel: string;
  notes: string;
}

export function getOrders(): Order[] {
  const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates };
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  return orders[index];
}

// --- Subscribers ---
export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

export function getSubscribers(): Subscriber[] {
  const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function addSubscriber(email: string, source: string = 'website'): void {
  const subscribers = getSubscribers();
  if (!subscribers.find(s => s.email === email)) {
    subscribers.unshift({ email, subscribedAt: new Date().toISOString(), source });
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  }
}

// --- Stats ---
export function getStats() {
  const products = getProducts();
  const orders = getOrders();
  const subscribers = getSubscribers();

  const validOrders = orders.filter(o => o.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const avgOrderValue = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;

  // Product popularity from orders
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
  validOrders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.slug]) {
        productSales[item.slug] = { name: item.name, quantity: 0, revenue: 0 };
      }
      productSales[item.slug].quantity += item.quantity;
      productSales[item.slug].revenue += item.quantity * item.price;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  // Revenue by month (last 6 months)
  const revenueByMonth: { month: string; revenue: number; orders: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStr = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    const monthOrders = validOrders.filter(o => {
      const oDate = new Date(o.date);
      return oDate.getMonth() === date.getMonth() && oDate.getFullYear() === date.getFullYear();
    });
    revenueByMonth.push({
      month: monthStr,
      revenue: monthOrders.reduce((sum, o) => sum + o.total, 0),
      orders: monthOrders.length,
    });
  }

  // Recent orders (last 10)
  const recentOrders = orders.slice(0, 10);

  // Status breakdown
  const statusBreakdown = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    avgOrderValue,
    totalProducts: products.length,
    totalSubscribers: subscribers.length,
    lowStockProducts: products.filter(product => product.stockQuantity !== undefined && product.stockQuantity < 10).length,
    fulfilledOrders: validOrders.length,
    topProducts,
    revenueByMonth,
    recentOrders,
    statusBreakdown,
  };
}
