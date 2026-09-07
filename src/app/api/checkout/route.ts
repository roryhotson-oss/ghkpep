import Stripe from 'stripe';
import { getCommerceProducts } from '@/lib/commerce-store';
import { effectivePrice } from '@/lib/pricing';
import { verifyTurnstile, sanitizeString } from '@/lib/validation';

type Address = { name: string; line1: string; city: string; postcode: string; country: string; email?: string };
type OrderItemInput = { slug: string; qty: number; type: 'vial' | 'box'; strength?: number };

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('your-stripe-secret-key')) return null;
  return new Stripe(key);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ error: 'Card payments are not configured' }, { status: 503 });
  }

  try {
    const body = await request.json() as {
      items?: OrderItemInput[];
      billingAddress?: Address;
      shippingAddress?: Address;
      turnstileToken?: string;
    };

    const items = body.items || [];
    const billing = body.billingAddress;
    const shipping = body.shippingAddress || billing!;

    if (!items.length || !billing || !billing.name || !billing.email || !billing.line1 || !billing.city || !billing.postcode || !billing.country) {
      return Response.json({ error: 'Complete order and billing details are required' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for') || '';
    const turnstileOk = await verifyTurnstile(body.turnstileToken, ip);
    if (!turnstileOk) {
      return Response.json({ error: 'Human verification is required' }, { status: 403 });
    }

    const products = await getCommerceProducts();
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let orderTotal = 0;

    for (const item of items) {
      const product = products.find((p) => p.slug === item.slug);
      const quantity = Number(item.qty);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return Response.json({ error: `Invalid item: ${item.slug}` }, { status: 400 });
      }
      const unitPrice = item.type === 'box' ? effectivePrice(product, 'box', item.strength) : effectivePrice(product, 'vial', item.strength);
      const lineTotal = unitPrice * quantity;
      orderTotal += lineTotal;

      lineItems.push({
        quantity,
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(unitPrice * 100),
          product_data: {
            name: `${product.name} (${item.type === 'box' ? 'Box of 10' : '1 vial'})`,
            images: product.image ? [product.image.startsWith('http') ? product.image : `https://www.ghkpep.com${product.image}`] : [],
          },
        },
      });
    }

    const orderNumber = `GHK-${Date.now().toString(36).toUpperCase()}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `https://www.ghkpep.com/cart?stripe_success=1&order=${orderNumber}`,
      cancel_url: `https://www.ghkpep.com/cart?stripe_cancel=1`,
      client_reference_id: orderNumber,
      customer_email: billing.email,
      shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'NL', 'IE', 'ES', 'IT'] },
      metadata: {
        order_number: orderNumber,
        customer_name: sanitizeString(billing.name).slice(0, 200),
        customer_email: sanitizeString(billing.email).slice(0, 254),
        billing_line1: sanitizeString(billing.line1).slice(0, 300),
        billing_city: sanitizeString(billing.city).slice(0, 100),
        billing_postcode: sanitizeString(billing.postcode).slice(0, 20),
        billing_country: sanitizeString(billing.country).slice(0, 100),
        shipping_name: sanitizeString(shipping.name).slice(0, 200),
        shipping_line1: sanitizeString(shipping.line1).slice(0, 300),
        shipping_city: sanitizeString(shipping.city).slice(0, 100),
        shipping_postcode: sanitizeString(shipping.postcode).slice(0, 20),
        shipping_country: sanitizeString(shipping.country).slice(0, 100),
      },
    });

    return Response.json({ url: session.url, orderNumber });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: 'Could not create checkout session' }, { status: 500 });
  }
}
