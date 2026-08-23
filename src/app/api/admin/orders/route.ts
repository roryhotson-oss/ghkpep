import { NextRequest, NextResponse } from 'next/server';
import { updateOrder } from '@/lib/admin-store';
import { checkAdmin } from '@/lib/admin-auth';
import { getCommerceOrders } from '@/lib/commerce-store';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await getCommerceOrders();
  return NextResponse.json({ orders });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (status !== undefined) {
      if (typeof status !== 'string' || !allowedStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
      }
      updates.status = status;
    }
    if (notes !== undefined) {
      if (typeof notes !== 'string') {
        return NextResponse.json({ error: 'Notes must be text' }, { status: 400 });
      }
      updates.notes = notes;
    }
    if (body.trackingNumber !== undefined) {
      if (typeof body.trackingNumber !== 'string' || body.trackingNumber.length > 100) return NextResponse.json({ error: 'Invalid tracking number' }, { status: 400 });
      updates.trackingNumber = body.trackingNumber.trim();
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      if (status === 'processing') {
        const { data: sourceOrder, error: sourceError } = await supabase.from('orders').select('stock_reduced, order_items(product_slug, quantity)').eq('order_number', id).maybeSingle();
        if (sourceError) throw sourceError;
        if (sourceOrder && !sourceOrder.stock_reduced) {
          for (const item of sourceOrder.order_items || []) {
            const { data: product, error: productError } = await supabase.from('products').select('stock_quantity').eq('slug', item.product_slug).maybeSingle();
            if (productError) throw productError;
            if (product) {
              const nextStock = Math.max(0, Number(product.stock_quantity) - Number(item.quantity));
              const { error: stockError } = await supabase.from('products').update({ stock_quantity: nextStock }).eq('slug', item.product_slug);
              if (stockError) throw stockError;
            }
          }
          updates.stock_reduced = true;
        }
      }
      const databaseUpdates: Record<string, unknown> = { ...updates, tracking_number: updates.trackingNumber, stock_reduced: updates.stock_reduced };
      delete databaseUpdates.trackingNumber;
      delete databaseUpdates.stock_reduced;
      const { data, error } = await supabase.from('orders').update({ ...databaseUpdates, ...(updates.stock_reduced !== undefined ? { stock_reduced: updates.stock_reduced } : {}) }).eq('order_number', id).select('*').maybeSingle();
      if (error) throw error;
      if (data) return NextResponse.json({ success: true, order: data });
    }
    const updated = updateOrder(id, updates as Partial<import('@/lib/admin-store').Order>);
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
