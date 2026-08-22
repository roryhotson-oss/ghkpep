import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOrders, updateOrder } from '@/lib/admin-store';

const SESSION_SECRET = process.env.SESSION_SECRET || 'ghk-peptides-admin-secret-key-2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ghkpep.com';

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const email = parts[0];
    const timestamp = parseInt(parts[1]);
    const secret = parts.slice(2).join(':');
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) return false;
    if (secret !== SESSION_SECRET) return false;
    if (email !== ADMIN_EMAIL) return false;
    return true;
  } catch {
    return false;
  }
}

async function checkAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');
  return !!token && verifyToken(token.value);
}

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
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

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
