import { NextResponse } from 'next/server';
import { getProducts, getProduct } from '@/lib/admin-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  }

  const products = getProducts();
  return NextResponse.json({ products });
}
