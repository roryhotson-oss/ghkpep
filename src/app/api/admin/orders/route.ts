import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrder } from '@/lib/admin-store';
import { checkAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = getOrders();
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

    const updates: Record<string, string> = {};
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

    const updated = updateOrder(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
