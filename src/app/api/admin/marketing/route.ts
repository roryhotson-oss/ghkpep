import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { createMarketingPost, getMarketingPosts, updateMarketingPost, type MarketingPlatform, type MarketingStatus } from '@/lib/marketing-store';
import { getCommerceProduct } from '@/lib/commerce-store';

const platforms: MarketingPlatform[] = ['x', 'facebook', 'reddit', 'instagram', 'linkedin'];

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    return NextResponse.json({ posts: await getMarketingPosts() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Marketing posts could not be loaded';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json() as { productSlug?: string; platform?: MarketingPlatform; scheduledFor?: string | null };
    if (!body.productSlug || !body.platform || !platforms.includes(body.platform)) return NextResponse.json({ error: 'Product and platform are required' }, { status: 400 });
    const product = await getCommerceProduct(body.productSlug);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    const copy = `${product.name}: documented research material for in vitro laboratory research. Batch documentation available. Research use only. ${process.env.NEXT_PUBLIC_SITE_URL || 'https://ghkpep.com'}/shop/${product.slug}`;
    const post = await createMarketingPost({ productSlug: product.slug, platform: body.platform, content: copy, imageUrl: product.image, scheduledFor: body.scheduledFor || null });
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Marketing post creation failed:', error);
    const message = error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'message' in error ? String(error.message) : 'Marketing post could not be created';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json() as { id?: string; status?: MarketingStatus; scheduledFor?: string | null };
    if (!body.id || !body.status || !['draft', 'approved', 'scheduled', 'published', 'failed'].includes(body.status)) return NextResponse.json({ error: 'Post ID and valid status are required' }, { status: 400 });
    const post = await updateMarketingPost(body.id, { status: body.status, scheduledFor: body.scheduledFor });
    return post ? NextResponse.json({ post }) : NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch { return NextResponse.json({ error: 'Marketing post could not be updated' }, { status: 500 }); }
}