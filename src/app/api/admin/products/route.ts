import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/data/products';
import { checkAdmin } from '@/lib/admin-auth';
import { getCommerceProducts, saveCommerceProduct } from '@/lib/commerce-store';

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await getCommerceProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, name, price, boxPrice, purity, category, categoryLabel, description, lot, image, stockQuantity, discountPercent } = body;

    const parsedPrice = Number(price);
    const parsedBoxPrice = boxPrice === undefined ? parsedPrice * 9 : Number(boxPrice);
    const parsedStock = stockQuantity === undefined ? 100 : Number(stockQuantity);
    const parsedDiscount = discountPercent === undefined ? 0 : Number(discountPercent);
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug) || typeof name !== 'string' || !name.trim() || !Number.isFinite(parsedPrice) || parsedPrice <= 0 || !Number.isFinite(parsedBoxPrice) || parsedBoxPrice <= 0 || !Number.isInteger(parsedStock) || parsedStock < 0 || !Number.isFinite(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      return NextResponse.json({ error: 'slug, name, and price are required' }, { status: 400 });
    }

    const products = await getCommerceProducts();
    if (products.find(p => p.slug === slug)) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 409 });
    }

    const newProduct: Product = {
      slug,
      name,
      price: parsedPrice,
      boxPrice: parsedBoxPrice,
      purity: purity || '≥99%',
      category: category || 'recovery',
      categoryLabel: categoryLabel || 'Research Compound',
      description: description || '',
      lot: lot || `GHK-${Date.now().toString(36).toUpperCase()}`,
      image: image || `/images/${slug}.png`,
      stockQuantity: parsedStock,
      discountPercent: parsedDiscount,
    };

    const savedProduct = await saveCommerceProduct(newProduct);
    return NextResponse.json({ success: true, product: savedProduct });
  } catch (error) {
    console.error('Add product error:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
