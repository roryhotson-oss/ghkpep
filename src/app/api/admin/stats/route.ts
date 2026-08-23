import { NextResponse } from 'next/server';
import { getStats, getProducts } from '@/lib/admin-store';
import { checkAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = getStats();
  const products = getProducts();
  return NextResponse.json({ ...stats, products });
}
