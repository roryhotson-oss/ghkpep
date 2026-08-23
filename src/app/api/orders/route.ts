import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getCommerceProducts } from '@/lib/commerce-store';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

type Address = { name: string; line1: string; city: string; postcode: string; country: string; email?: string };
type OrderItemInput = { slug: string; qty: number; type: 'vial' | 'box' };

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = getSupabaseAdmin();
  if (!url || !anonKey || !supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  const cookieStore = await cookies();
  const authClient = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
    },
  });
  const { data: { user } } = await authClient.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const { data, error } = await supabase.from('orders').select('order_number, created_at, status, total_amount, payment_method, tracking_number, shipping_address, order_items(product_slug, product_name, quantity, unit_price)').eq('user_id', user.id).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Orders could not be loaded' }, { status: 500 });
  return NextResponse.json({ orders: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  try {
    const body = await request.json() as {
      items?: OrderItemInput[];
      billingAddress?: Address;
      shippingAddress?: Address;
      paymentMethod?: string;
      paymentReference?: string;
      paymentProofUrl?: string;
    };
    const items = body.items || [];
    const billing = body.billingAddress;
    const shipping = body.shippingAddress || billing;
    if (!items.length || !billing || !shipping || !billing.name || !billing.email || !billing.line1 || !billing.city || !billing.postcode || !billing.country) {
      return NextResponse.json({ error: 'Complete order and billing details are required' }, { status: 400 });
    }

    const products = await getCommerceProducts();
    const orderItems = items.map((item) => {
      const product = products.find((candidate) => candidate.slug === item.slug);
      const quantity = Number(item.qty);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('Invalid order item');
      const unitPrice = item.type === 'box' ? product.boxPrice : product.price;
      return { product, quantity, unitPrice, type: item.type };
    });
    const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const orderNumber = `GHK-${Date.now().toString(36).toUpperCase()}`;
    let userId: string | null = null;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && anonKey) {
      const cookieStore = await cookies();
      const authClient = createServerClient(url, anonKey, {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      });
      const { data: { user } } = await authClient.auth.getUser();
      userId = user?.id || null;
    }
    const { data: order, error: orderError } = await supabase.from('orders').insert({
      user_id: userId,
      order_number: orderNumber,
      customer_name: billing.name,
      customer_email: billing.email,
      total_amount: total,
      shipping_amount: 0,
      payment_method: body.paymentMethod || 'contact',
      payment_status: 'pending',
      payment_reference: body.paymentReference || null,
      payment_proof_url: body.paymentProofUrl || null,
      billing_address: billing,
      shipping_address: shipping,
      status: 'pending',
    }).select('id, order_number').single();
    if (orderError || !order) throw orderError || new Error('Order was not created');

    const { error: itemError } = await supabase.from('order_items').insert(orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.product.id || null,
      product_name: item.product.name,
      product_slug: item.product.slug,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
      item_type: item.type,
    })));
    if (itemError) throw itemError;

    return NextResponse.json({ success: true, orderNumber: order.order_number }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Order could not be saved' }, { status: 500 });
  }
}
