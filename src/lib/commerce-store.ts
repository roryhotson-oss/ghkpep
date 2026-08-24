import { getProducts as getLocalProducts, getProduct as getLocalProduct } from '@/lib/admin-store';
import type { Product } from '@/data/products';
import type { Order } from '@/lib/admin-store';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

type ProductRow = {
  id?: string;
  slug: string;
  name: string;
  description?: string | null;
  price: number | string;
  box_price: number | string;
  purity?: string | null;
  category?: string | null;
  category_label?: string | null;
  lot_number?: string | null;
  image_url?: string | null;
  stock_quantity?: number | string | null;
  discount_percent?: number | string | null;
};

function mapProduct(row: ProductRow): Product {
  const imageOverrides: Record<string, string> = {
    'melanotan-2': '/images/melanotan-2-10mg.png',
    'ss-31': '/images/ss-31-10mg.png',
    'melanotan-1': '/images/melanotan-1-10mg.png',
    wolverine: '/images/wolverine-10mg.png',
    'kiss-peptin': '/images/kiss-peptin-10mg.png',
    cagrilintide: '/images/cagrilintide-5mg.png',
    'tb-500': '/images/tb-500-10mg.png',
  };

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    boxPrice: Number(row.box_price),
    purity: row.purity || 'N/A',
    category: row.category || 'recovery',
    categoryLabel: row.category_label || 'Research Compound',
    description: row.description || '',
    lot: row.lot_number || row.slug.toUpperCase(),
    image: imageOverrides[row.slug] || row.image_url || `/images/${row.slug}.png`,
    stockQuantity: Number(row.stock_quantity ?? 100),
    discountPercent: Number(row.discount_percent ?? 0),
  };
}

function productRow(product: Product) {
  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    box_price: product.boxPrice,
    purity: product.purity,
    category: product.category,
    category_label: product.categoryLabel,
    lot_number: product.lot,
    image_url: product.image,
    stock_quantity: product.stockQuantity ?? 100,
    discount_percent: product.discountPercent ?? 0,
  };
}

export async function getCommerceProducts(): Promise<Product[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return getLocalProducts();
  try {
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error || !data || data.length === 0) return getLocalProducts();
    return (data as ProductRow[]).map(mapProduct);
  } catch (err) {
    console.warn('Supabase products fetch error, falling back to local:', err);
    return getLocalProducts();
  }
}

export async function getCommerceProduct(slug: string): Promise<Product | undefined> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return getLocalProduct(slug);
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
    if (error || !data) return getLocalProduct(slug);
    return mapProduct(data as ProductRow);
  } catch (err) {
    console.warn('Supabase product fetch error, falling back to local:', err);
    return getLocalProduct(slug);
  }
}

export async function getCommerceOrders(): Promise<Order[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return (await import('@/lib/admin-store')).getOrders();
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
  if (error || !data) return (await import('@/lib/admin-store')).getOrders();
  return data.map((row) => ({
    id: row.order_number,
    date: row.created_at,
    customerName: row.customer_name || 'Customer',
    customerEmail: row.customer_email || '',
    items: (row.order_items || []).map((item: { product_slug: string; product_name: string; quantity: number; unit_price: number | string }) => ({
      slug: item.product_slug,
      name: item.product_name,
      quantity: Number(item.quantity),
      price: Number(item.unit_price),
    })),
    total: Number(row.total_amount),
    status: row.status === 'paid' ? 'processing' : row.status,
    channel: row.payment_method || 'contact',
    notes: row.notes || '',
    paymentProofUrl: row.payment_proof_url || '',
    trackingNumber: row.tracking_number || '',
    shippingAddress: row.shipping_address || null,
  })) as Order[];
}

export async function getCommerceStats() {
  const [products, orders] = await Promise.all([getCommerceProducts(), getCommerceOrders()]);
  const validOrders = orders.filter((order) => order.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
  validOrders.forEach((order) => order.items.forEach((item) => {
    productSales[item.slug] ||= { name: item.name, quantity: 0, revenue: 0 };
    productSales[item.slug].quantity += item.quantity;
    productSales[item.slug].revenue += item.quantity * item.price;
  }));
  const revenueByMonth = [];
  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - offset);
    const monthOrders = validOrders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
    });
    revenueByMonth.push({
      month: date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      revenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
      orders: monthOrders.length,
    });
  }
  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === 'pending').length,
    avgOrderValue: validOrders.length ? totalRevenue / validOrders.length : 0,
    totalProducts: products.length,
    totalSubscribers: 0,
    lowStockProducts: products.filter((product) => product.stockQuantity !== undefined && product.stockQuantity < 10).length,
    fulfilledOrders: validOrders.length,
    topProducts: Object.entries(productSales).map(([slug, data]) => ({ slug, ...data })).sort((a, b) => b.quantity - a.quantity).slice(0, 10),
    revenueByMonth,
    recentOrders: orders.slice(0, 10),
    statusBreakdown: {
      pending: orders.filter((order) => order.status === 'pending').length,
      processing: orders.filter((order) => order.status === 'processing').length,
      shipped: orders.filter((order) => order.status === 'shipped').length,
      delivered: orders.filter((order) => order.status === 'delivered').length,
      cancelled: orders.filter((order) => order.status === 'cancelled').length,
    },
  };
}

export async function saveCommerceProduct(product: Product): Promise<Product> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const { addProduct } = await import('@/lib/admin-store');
    addProduct(product);
    return product;
  }
  const { data, error } = await supabase.from('products').upsert(productRow(product), { onConflict: 'slug' }).select('*').single();
  if (error || !data) throw error || new Error('Product could not be saved');
  return mapProduct(data as ProductRow);
}

export async function updateCommerceProduct(slug: string, updates: Partial<Product>): Promise<Product | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return (await import('@/lib/admin-store')).updateProduct(slug, updates);
  const mapped: Record<string, unknown> = {};
  const fields: Array<[keyof Product, string]> = [['name', 'name'], ['description', 'description'], ['price', 'price'], ['boxPrice', 'box_price'], ['purity', 'purity'], ['category', 'category'], ['categoryLabel', 'category_label'], ['lot', 'lot_number'], ['image', 'image_url'], ['stockQuantity', 'stock_quantity'], ['discountPercent', 'discount_percent']];
  fields.forEach(([key, column]) => { if (updates[key] !== undefined) mapped[column] = updates[key]; });
  const { data, error } = await supabase.from('products').update(mapped).eq('slug', slug).select('*').maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}

export async function deleteCommerceProduct(slug: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return (await import('@/lib/admin-store')).deleteProduct(slug);
  const { data, error } = await supabase.from('products').delete().eq('slug', slug).select('slug');
  if (error) throw error;
  return Boolean(data?.length);
}
