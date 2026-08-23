import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { getCommerceProduct, updateCommerceProduct, deleteCommerceProduct } from '@/lib/commerce-store';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const product = await getCommerceProduct(slug);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();

    // Parse numeric fields
    const updates: Record<string, unknown> = {};
    if (body.price !== undefined) {
      const price = Number(body.price);
      if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
      }
      updates.price = price;
    }
    if (body.boxPrice !== undefined) {
      const boxPrice = Number(body.boxPrice);
      if (!Number.isFinite(boxPrice) || boxPrice <= 0) {
        return NextResponse.json({ error: 'Box price must be a positive number' }, { status: 400 });
      }
      updates.boxPrice = boxPrice;
    }
    if (body.name !== undefined) updates.name = body.name;
    if (body.purity !== undefined) updates.purity = body.purity;
    if (body.category !== undefined) updates.category = body.category;
    if (body.categoryLabel !== undefined) updates.categoryLabel = body.categoryLabel;
    if (body.description !== undefined) updates.description = body.description;
    if (body.lot !== undefined) updates.lot = body.lot;
    if (body.image !== undefined) updates.image = body.image;
    if (body.stockQuantity !== undefined) {
      const stockQuantity = Number(body.stockQuantity);
      if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
        return NextResponse.json({ error: 'Stock must be a whole number of zero or more' }, { status: 400 });
      }
      updates.stockQuantity = stockQuantity;
    }
    if (body.discountPercent !== undefined) {
      const discountPercent = Number(body.discountPercent);
      if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
        return NextResponse.json({ error: 'Discount must be between 0 and 100 percent' }, { status: 400 });
      }
      updates.discountPercent = discountPercent;
    }

    const updated = await updateCommerceProduct(slug, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = await deleteCommerceProduct(slug);
  if (!deleted) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
