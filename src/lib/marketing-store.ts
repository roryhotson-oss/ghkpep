import { getSupabaseAdmin } from '@/lib/supabase-admin';

export type MarketingPlatform = 'x' | 'facebook' | 'reddit' | 'instagram' | 'linkedin';
export type MarketingStatus = 'draft' | 'approved' | 'scheduled' | 'published' | 'failed';

export interface MarketingPost {
	id: string;
	productSlug: string;
	platform: MarketingPlatform;
	content: string;
	imageUrl: string;
	status: MarketingStatus;
	scheduledFor?: string | null;
	publishedAt?: string | null;
	externalPostId?: string | null;
	error?: string | null;
	createdAt: string;
}

function mapPost(row: Record<string, unknown>): MarketingPost {
	return {
		id: String(row.id),
		productSlug: String(row.product_slug || ''),
		platform: row.platform as MarketingPlatform,
		content: String(row.content || ''),
		imageUrl: String(row.image_url || ''),
		status: row.status as MarketingStatus,
		scheduledFor: row.scheduled_for as string | null,
		publishedAt: row.published_at as string | null,
		externalPostId: row.external_post_id as string | null,
		error: row.error as string | null,
		createdAt: String(row.created_at),
	};
}

function requireSupabase() {
	const supabase = getSupabaseAdmin();
	if (!supabase) throw new Error('Supabase is not configured for marketing storage');
	return supabase;
}

export async function getMarketingPosts(): Promise<MarketingPost[]> {
	const { data, error } = await requireSupabase().from('marketing_posts').select('*').order('created_at', { ascending: false });
	if (error) throw new Error(`Marketing posts could not be loaded: ${error.message}`);
	return (data || []).map(mapPost);
}

export async function createMarketingPost(post: { productSlug: string; platform: MarketingPlatform; content: string; imageUrl: string; scheduledFor?: string | null }): Promise<MarketingPost> {
	const { data, error } = await requireSupabase().from('marketing_posts').insert({ product_slug: post.productSlug, platform: post.platform, content: post.content, image_url: post.imageUrl, status: post.scheduledFor ? 'scheduled' : 'draft', scheduled_for: post.scheduledFor || null }).select('*').single();
	if (error || !data) throw new Error(`Marketing post could not be created: ${error?.message || 'no row returned'}`);
	return mapPost(data);
}

export async function updateMarketingPost(id: string, updates: { status?: MarketingStatus; scheduledFor?: string | null; publishedAt?: string | null; externalPostId?: string | null; error?: string | null }): Promise<MarketingPost | null> {
	const values = {
		...(updates.status ? { status: updates.status } : {}),
		...(updates.scheduledFor !== undefined ? { scheduled_for: updates.scheduledFor } : {}),
		...(updates.publishedAt !== undefined ? { published_at: updates.publishedAt } : {}),
		...(updates.externalPostId !== undefined ? { external_post_id: updates.externalPostId } : {}),
		...(updates.error !== undefined ? { error: updates.error } : {}),
		updated_at: new Date().toISOString(),
	};
	const { data, error } = await requireSupabase().from('marketing_posts').update(values).eq('id', id).select('*').maybeSingle();
	if (error) throw new Error(`Marketing post could not be updated: ${error.message}`);
	return data ? mapPost(data) : null;
}
