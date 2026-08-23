import { NextResponse } from 'next/server';
import { getCommerceProducts, getCommerceStats } from '@/lib/commerce-store';
import { checkAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = await getCommerceStats();
  const products = await getCommerceProducts();
  return NextResponse.json({ ...stats, products });
}
