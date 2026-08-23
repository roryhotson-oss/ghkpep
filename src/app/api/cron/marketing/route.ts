import { NextRequest, NextResponse } from 'next/server';
import { getMarketingPosts, updateMarketingPost } from '@/lib/marketing-store';
import { publishFacebookPost } from '@/lib/meta-client';
import { publishTweet } from '@/lib/x-client';

async function publishPost(platform: string, content: string): Promise<string> {
  if (platform === 'x') return publishTweet(content);
  if (platform === 'facebook') return publishFacebookPost(content);
  throw new Error(`Publishing for ${platform} is not configured yet`);
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const duePosts = (await getMarketingPosts()).filter((post) => ['x', 'facebook'].includes(post.platform) && post.status === 'scheduled' && post.scheduledFor && new Date(post.scheduledFor).getTime() <= Date.now());
  const results = [];
  for (const post of duePosts) {
    try {
      const externalPostId = await publishPost(post.platform, post.content);
      await updateMarketingPost(post.id, { status: 'published', publishedAt: new Date().toISOString(), externalPostId, error: null });
      results.push({ id: post.id, status: 'published' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Publishing failed';
      await updateMarketingPost(post.id, { status: 'failed', error: message });
      results.push({ id: post.id, status: 'failed' });
    }
  }
  return NextResponse.json({ processed: results.length, results });
}