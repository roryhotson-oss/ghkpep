import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { getMarketingPosts, updateMarketingPost } from '@/lib/marketing-store';
import { publishFacebookPost } from '@/lib/meta-client';
import { publishTweet } from '@/lib/x-client';

async function publishPost(platform: string, content: string): Promise<string> {
  if (platform === 'x') return publishTweet(content);
  if (platform === 'facebook') return publishFacebookPost(content);
  throw new Error(`Publishing for ${platform} is not configured yet`);
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await request.json() as { id?: string };
    if (!id) return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    const post = (await getMarketingPosts()).find((candidate) => candidate.id === id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (!['approved', 'scheduled'].includes(post.status)) return NextResponse.json({ error: 'Only approved or scheduled posts can be published' }, { status: 400 });
    const externalPostId = await publishPost(post.platform, post.content);
    const updated = await updateMarketingPost(id, { status: 'published', publishedAt: new Date().toISOString(), externalPostId, error: null });
    return NextResponse.json({ post: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Publishing failed';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}