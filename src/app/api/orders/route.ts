import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { getCommerceProducts } from '@/lib/commerce-store';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { effectivePrice, getBundleDiscountPercent } from '@/lib/pricing';
import { verifyTurnstile, sanitizeString } from '@/lib/validation';
import { getEmailClient, getFromAddress, sendEmail } from '@/lib/email';

type Address = { name: string; line1: string; city: string; postcode: string; country: string; email?: string };
type OrderItemInput = { slug: string; qty: number; type: 'vial' | 'box'; strength?: number };

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = getSupabaseAdmin();
  if (!url || !anonKey || !supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });

  const cookieStore = await cookies();
  const authClient = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
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
      turnstileToken?: string;
    };
    const items = body.items || [];
    const billing = body.billingAddress;
    const shipping = body.shippingAddress || billing;
    if (!items.length || !billing || !shipping || !billing.name || !billing.email || !billing.line1 || !billing.city || !billing.postcode || !billing.country) {
      return NextResponse.json({ error: 'Complete order and billing details are required' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for') || '';
    const turnstileOk = await verifyTurnstile(body.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Human verification is required' }, { status: 403 });
    }

    const sanitizeAddress = (addr: Address): Address => ({
      name: sanitizeString(addr.name).slice(0, 200),
      email: addr.email ? sanitizeString(addr.email).slice(0, 254) : undefined,
      line1: sanitizeString(addr.line1).slice(0, 300),
      city: sanitizeString(addr.city).slice(0, 100),
      postcode: sanitizeString(addr.postcode).slice(0, 20),
      country: sanitizeString(addr.country).slice(0, 100),
    });
    const safeBilling = sanitizeAddress(billing);
    const safeShipping = shipping === billing ? safeBilling : sanitizeAddress(shipping);

    const products = await getCommerceProducts();
    const orderItems = items.map((item) => {
      const product = products.find((candidate) => candidate.slug === item.slug);
      const quantity = Number(item.qty);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('Invalid order item');
      const unitPrice = item.type === 'box' ? effectivePrice(product, 'box', item.strength) : effectivePrice(product, 'vial', item.strength);
      return { product, quantity, unitPrice, type: item.type };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const bundleDiscount = getBundleDiscountPercent(totalQuantity) / 100;
    const discountedSubtotal = subtotal * (1 - bundleDiscount);
    const shippingAmount = discountedSubtotal >= 150 ? 0 : 9.99;
    const total = Number((discountedSubtotal + shippingAmount).toFixed(2));
    const orderNumber = `GHK-${Date.now().toString(36).toUpperCase()}`;
    let userId: string | null = null;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && anonKey) {
      const cookieStore = await cookies();
      const authClient = createServerClient(url, anonKey, {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      });
      const { data: { user } } = await authClient.auth.getUser();
      userId = user?.id || null;
    }
    const { data: order, error: orderError } = await supabase.from('orders').insert({
      user_id: userId,
      order_number: orderNumber,
      customer_name: safeBilling.name,
      customer_email: safeBilling.email,
      total_amount: total,
      shipping_amount: shippingAmount,
      payment_method: body.paymentMethod || 'contact',
      payment_status: 'pending',
      payment_reference: body.paymentReference || null,
      payment_proof_url: body.paymentProofUrl || null,
      billing_address: safeBilling,
      shipping_address: safeShipping,
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

    after(async () => {
      try {
        const emailClient = getEmailClient();
        if (!emailClient) return;
        await sendEmail(emailClient, {
          from: getFromAddress(),
          to: [safeBilling.email || ''],
          subject: `Order ${orderNumber} received - GHK Peptides`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
            </div>
            <h2 style="color: #333;">Order ${orderNumber} Received</h2>
            <p style="color: #7b898e; line-height: 1.6;">Thank you for your order. We have received your details and will confirm your order shortly.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">Order total: &pound;${total.toFixed(2)}</p>
              <p style="margin: 10px 0 0 0;">Payment method: ${sanitizeString(body.paymentMethod || 'contact').slice(0, 50)}</p>
            </div>
            <p style="color: #7b898e; line-height: 1.6;">Our team will contact you to confirm payment and shipping. If you have any questions, reply to this email.</p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
              <p>This is an automated confirmation email from GHK Peptides.</p>
            </div>
          </div>`,
        });
      } catch (err) {
        console.error('Order confirmation email failed:', err);
      }
    });

    return NextResponse.json({ success: true, orderNumber: order.order_number }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Order could not be saved' }, { status: 500 });
  }
}
