import { NextResponse } from 'next/server';
import { getProducts as getLocalProducts } from '@/lib/admin-store';
import { getCommerceProduct } from '@/lib/commerce-store';

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const product = await getCommerceProduct(slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  }

  const products = getLocalProducts();
  return NextResponse.json({ products });
}
