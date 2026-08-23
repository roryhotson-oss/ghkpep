import { NextResponse } from 'next/server';
import { getCommerceProducts, getCommerceProduct } from '@/lib/commerce-store';

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

  const products = await getCommerceProducts();
  return NextResponse.json({ products });
}
