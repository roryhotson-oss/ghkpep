import { getProducts as getLocalProducts, getProduct as getLocalProduct } from '@/lib/admin-store';
import type { Product } from '@/data/products';
import { products as localProducts } from '@/data/products';
import type { Order } from '@/lib/admin-store';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { resolveCatalogImage } from '@/lib/catalogImages';

// Build a complete image path map from local products
const productImageMap: Record<string, string> = {};
localProducts.forEach(p => {
  productImageMap[p.slug] = p.image;
});

// Override box prices from Supabase with curated local values
const boxPriceOverrides: Record<string, number> = {
  'klow': 389,
  'glutathione': 199,
  'glp2-tz': 119,
  'melanotan-2': 125,
  'melanotan-1': 135,
  'kiss-peptin': 159,
  'kpv': 149,
  'ipamorelin': 119,
  'glow': 369,
  'adamax': 299,
  'ahk-cu': 149,
  'bpc-157': 249,
};

// Per-vial price overrides: use curated local product prices as source of truth
const vialPriceMap: Record<string, number> = {};
localProducts.forEach(p => {
  vialPriceMap[p.slug] = p.price;
});

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

function sanitizeCategoryLabel(label: string): string {
  const trimmed = label.trim();
  const replacements: Record<string, string> = {
    'Healing Peptide': 'Sequence Peptide',
    'Anti-Inflammatory': 'Sequence Fragment',
    'Growth Hormone': 'Peptide Research',
    'Growth Factor': 'Peptide Research',
    'Amylin Analog': 'Amylin Research',
    'GLP-2 Analog': 'GLP-2 Research',
    'Incretin Analog': 'Incretin Research',
    'Tuftsin Analog': 'Tuftsin Research',
    'ACTH Analog': 'ACTH Research',
  };
  return replacements[trimmed] || trimmed;
}

function sanitizeDescription(description: string): string {
  return description
    .replace('Triple receptor agonist analog.', 'Triple-sequence research analog.')
    .replace('Long R3 analog of IGF-1.', 'Long R3 sequence analog of IGF-1.')
    .replace('Stabilized GHRH analog.', 'Stabilized GHRH sequence analog.')
    .replace('Long-acting GLP-2 receptor analog.', 'GLP-2 related sequence analog with extended stability profile.')
    .replace('Melanocortin receptor agonist analog.', 'Melanocortin-related sequence analog.')
    .replace('Non-selective melanocortin receptor agonist analog.', 'Melanocortin-related sequence analog.')
    .replace('Synthetic alpha-MSH analog.', 'Synthetic alpha-MSH related sequence.')
    .replace('Long-acting amylin analog.', 'Amylin-related sequence analog.')
    .replace('Selective GHS-R1a agonist.', 'GHS-R1a related synthetic sequence.')
    .replace('Synthetic ACTH(4-10) analog, seven-residue sequence.', 'ACTH(4-10)-related synthetic seven-residue sequence.');
}

function mapProduct(row: ProductRow): Product | null {
  // Keep curated local product images consistent while older database rows are updated.
  const image = resolveCatalogImage(row.slug, productImageMap[row.slug] || row.image_url || `/images/${row.slug}.jpg`);
  if (!image) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.slug === 'refined-h2o' ? 'GHK bac Water 10ml' : row.slug === 'adamax' ? 'Adamax 5mg' : row.slug === 'dsip' ? 'DSIP' : row.name,
    price: vialPriceMap[row.slug] ?? Number(row.price),
    boxPrice: boxPriceOverrides[row.slug] ?? Number(row.box_price),
    purity: row.purity || 'N/A',
    category: row.category || 'recovery',
    categoryLabel: sanitizeCategoryLabel(row.category_label || 'Research Compound'),
    description: sanitizeDescription(row.description || ''),
    lot: row.lot_number || row.slug.toUpperCase(),
    image,
    stockQuantity: row.slug === 'refined-h2o' ? 0 : Number(row.stock_quantity ?? 100),
    discountPercent: Number(row.discount_percent ?? 0),
    dosageOptions: row.slug === 'ghk-cu' ? [50, 100] : row.slug === 'mots-c' ? [10, 40] : row.slug === 'nad-plus' ? [100, 250, 500, 1000] : row.slug === 'klow' ? [80] : row.slug === 'glp3-rt' ? [5, 10, 15, 20, 39, 40, 50, 60] : row.slug === 'glutathione' ? [1200, 1500] : row.slug === 'igf-1-lr3' ? [0.1, 1] : row.slug === 'tesamorelin' ? [2, 5, 10, 20] : row.slug === 'glp2-tz' ? [5, 10, 15, 20, 30, 40, 50, 60, 100, 120] : row.slug === 'cjc-1295-ipamorelin' ? [10, 20] : row.slug === 'refined-h2o' ? [3, 10] : row.slug === 'pt-141' ? [10] : row.slug === 'melanotan-2' ? [10] : row.slug === 'ss-31' ? [10, 50] : row.slug === 'melanotan-1' ? [10] : row.slug === 'wolverine' ? [10, 20] : row.slug === 'kiss-peptin' ? [5, 10] : row.slug === 'cagrilintide' ? [5, 10, 20] : row.slug === 'kpv' ? [5, 10] : row.slug === 'ipamorelin' ? [2, 5, 10] : row.slug === 'glow' ? [70] : row.slug === 'adamax' ? [5] : row.slug === 'ahk-cu' ? [100] : row.slug === 'bpc-157' ? [2, 5, 10, 20] : row.slug === 'tb-500' ? [5, 10, 20] : row.slug === 'semax' ? [5, 10, 30] : row.slug === 'dsip' ? [2, 5, 10, 15] : row.slug === 'imported-epithalon' ? [10, 40, 50] : row.slug === 'imported-aicar' ? [50, 100] : [5, 10, 15],
    dosageBoxPrices: row.slug === 'ghk-cu' ? { 50: 55, 100: 75 } : row.slug === 'mots-c' ? { 10: 119, 40: 399 } : row.slug === 'nad-plus' ? { 100: 75, 250: 95, 500: 120, 1000: 195 } : row.slug === 'klow' ? { 80: 255 } : row.slug === 'glp3-rt' ? { 5: 80, 10: 112, 15: 165, 20: 225, 39: 275, 40: 340, 50: 395, 60: 475 } : row.slug === 'glutathione' ? { 1200: 125, 1500: 175 } : row.slug === 'igf-1-lr3' ? { 0.1: 75, 1: 399 } : row.slug === 'tesamorelin' ? { 2: 99, 5: 179, 10: 319, 20: 619 } : row.slug === 'glp2-tz' ? { 5: 62.5, 10: 50, 15: 85, 20: 105, 30: 125, 40: 165, 50: 210, 60: 270, 100: 313, 120: 510 } : row.slug === 'cjc-1295-ipamorelin' ? { 10: 179, 20: 329 } : row.slug === 'pt-141' ? { 10: 125 } : row.slug === 'melanotan-2' ? { 10: 75 } : row.slug === 'ss-31' ? { 10: 130, 50: 310 } : row.slug === 'melanotan-1' ? { 10: 95 } : row.slug === 'wolverine' ? { 10: 150, 20: 265 } : row.slug === 'kiss-peptin' ? { 5: 99, 10: 149 } : row.slug === 'cagrilintide' ? { 5: 149, 10: 279, 20: 469 } : row.slug === 'kpv' ? { 5: 75, 10: 109 } : row.slug === 'ipamorelin' ? { 2: 55, 5: 79, 10: 119 } : row.slug === 'glow' ? { 70: 295 } : row.slug === 'adamax' ? { 5: 235 } : row.slug === 'ahk-cu' ? { 100: 159 } : row.slug === 'bpc-157' ? { 2: 45, 5: 70, 10: 90, 20: 140 } : row.slug === 'tb-500' ? { 5: 149, 10: 249, 20: 529 } : row.slug === 'dsip' ? { 2: 50, 5: 70, 10: 110, 15: 165 } : row.slug === 'imported-epithalon' ? { 10: 107.25, 40: 257.4, 50: 321.75 } : row.slug === 'imported-oxytocin-acetate' ? { 2: 40.95, 5: 68.25 } : row.slug === 'imported-aicar' ? { 50: 99.45, 100: 146.25 } : undefined,
    dosageVialPrices: row.slug === 'imported-epithalon' ? { 10: 10.72, 40: 25.74, 50: 32.17 } : row.slug === 'imported-oxytocin-acetate' ? { 2: 4.1, 5: 6.83 } : row.slug === 'imported-aicar' ? { 50: 9.95, 100: 14.63 } : undefined,
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
  const local = getLocalProducts();
  if (!supabase) return local;
  try {
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error || !data || data.length === 0) return local;
    const supabaseProducts = (data as ProductRow[])
      .map(mapProduct)
      .filter((product): product is Product => product !== null);
    const supabaseSlugs = new Set(supabaseProducts.map((p) => p.slug));
    const localOnly = local.filter((p) => !supabaseSlugs.has(p.slug));
    return [...supabaseProducts, ...localOnly].sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('Supabase products fetch error, falling back to local:', err);
    return local;
  }
}

export async function getCommerceProduct(slug: string): Promise<Product | undefined> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return getLocalProduct(slug);
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
    if (error || !data) return getLocalProduct(slug);
    return mapProduct(data as ProductRow) ?? getLocalProduct(slug);
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
  const savedProduct = mapProduct(data as ProductRow);
  if (!savedProduct) throw new Error('Product image policy rejected the saved product');
  return savedProduct;
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
