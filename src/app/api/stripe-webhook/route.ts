import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { getCommerceProducts } from '@/lib/commerce-store';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('your-stripe-secret-key')) return null;
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  if (!signature || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Missing signature or webhook secret' }), { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await request.text();

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderNumber = session.client_reference_id || session.metadata?.order_number;

    if (!orderNumber) {
      console.error('Stripe webhook: no order number in session', session.id);
      return new Response(JSON.stringify({ error: 'No order number' }), { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error('Stripe webhook: Supabase not configured');
      return new Response(JSON.stringify({ error: 'Database not configured' }), { status: 503 });
    }

    // Check if order already exists (idempotency)
    const { data: existing } = await supabase.from('orders').select('id').eq('order_number', orderNumber).maybeSingle();
    if (existing) {
      return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200 });
    }

    const metadata = session.metadata || {};
    const billingAddress = {
      name: metadata.customer_name || '',
      email: metadata.customer_email || '',
      line1: metadata.billing_line1 || '',
      city: metadata.billing_city || '',
      postcode: metadata.billing_postcode || '',
      country: metadata.billing_country || '',
    };
    const shippingAddress = {
      name: metadata.shipping_name || metadata.customer_name || '',
      line1: metadata.shipping_line1 || metadata.billing_line1 || '',
      city: metadata.shipping_city || metadata.billing_city || '',
      postcode: metadata.shipping_postcode || metadata.billing_postcode || '',
      country: metadata.shipping_country || metadata.billing_country || '',
    };

    // Reconstruct order items from line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const products = await getCommerceProducts();
    const orderItems = lineItems.data.map((li) => {
      const name = li.description || '';
      const isBox = name.toLowerCase().includes('box');
      const product = products.find((p) => name.toLowerCase().includes(p.name.toLowerCase()));
      return {
        product_id: product?.id || null,
        product_name: product?.name || name,
        product_slug: product?.slug || '',
        quantity: li.quantity || 1,
        unit_price: li.amount_total ? li.amount_total / 100 / (li.quantity || 1) : 0,
        total_price: li.amount_total ? li.amount_total / 100 : 0,
        item_type: isBox ? 'box' : 'vial',
      };
    });

    const { error: orderError } = await supabase.from('orders').insert({
      order_number: orderNumber,
      customer_name: billingAddress.name,
      customer_email: billingAddress.email || session.customer_details?.email || '',
      total_amount: session.amount_total ? session.amount_total / 100 : 0,
      shipping_amount: 0,
      payment_method: 'stripe',
      payment_status: 'paid',
      payment_reference: session.payment_intent as string,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      status: 'processing',
    }).select('id').single();

    if (orderError) {
      console.error('Stripe webhook: order insert failed', orderError);
      return new Response(JSON.stringify({ error: 'Order creation failed' }), { status: 500 });
    }

    // Insert order items
    const orderId = (await supabase.from('orders').select('id').eq('order_number', orderNumber).maybeSingle()).data?.id;
    if (orderId) {
      const { error: itemError } = await supabase.from('order_items').insert(
        orderItems.map((item) => ({ ...item, order_id: orderId }))
      );
      if (itemError) console.error('Stripe webhook: order items insert failed', itemError);
    }

    console.log(`Stripe webhook: order ${orderNumber} created and marked as paid`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
