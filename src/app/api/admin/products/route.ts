import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProducts, addProduct } from '@/lib/admin-store';
import type { Product } from '@/data/products';

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

  const products = getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, name, price, boxPrice, purity, category, categoryLabel, description, lot, image } = body;

    if (!slug || !name || price === undefined) {
      return NextResponse.json({ error: 'slug, name, and price are required' }, { status: 400 });
    }

    const products = getProducts();
    if (products.find(p => p.slug === slug)) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 409 });
    }

    const newProduct: Product = {
      slug,
      name,
      price: parseFloat(price),
      boxPrice: parseFloat(boxPrice) || parseFloat(price) * 9,
      purity: purity || '≥99%',
      category: category || 'recovery',
      categoryLabel: categoryLabel || 'Research Compound',
      description: description || '',
      lot: lot || `GHK-${Date.now().toString(36).toUpperCase()}`,
      image: image || `/images/${slug}.png`,
    };

    addProduct(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Add product error:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
