'use client';

import { startTransition, useEffect, useState } from 'react';

interface Product { slug: string; name: string }
interface Post { id: string; productSlug: string; platform: string; content: string; imageUrl: string; status: string; createdAt: string }

export default function MarketingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [productSlug, setProductSlug] = useState('');
  const [platform, setPlatform] = useState('x');
  const [scheduledFor, setScheduledFor] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    void Promise.all([fetch('/api/admin/products'), fetch('/api/admin/marketing')]).then(async ([productsResponse, postsResponse]) => {
      const productsData = productsResponse.ok ? await productsResponse.json() : { products: [] };
      const postsData = postsResponse.ok ? await postsResponse.json() : { posts: [], error: 'Marketing storage is unavailable. Check the Supabase service-role key.' };
      startTransition(() => {
        setProducts(productsData.products || []);
        setPosts(postsData.posts || []);
        if (postsData.error) setStatus(postsData.error);
      });
    });
  }, []);

  const createDraft = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Creating draft...');
    const response = await fetch('/api/admin/marketing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productSlug, platform, scheduledFor: scheduledFor || null }) });
    const data = await response.json();
    setStatus(response.ok ? 'Draft created.' : (data.error || 'Could not create draft.'));
    if (response.ok) { setPosts((currentPosts) => [data.post, ...currentPosts]); setProductSlug(''); setScheduledFor(''); }
  };

  const updateStatus = async (id: string, nextStatus: string) => {
    const response = await fetch('/api/admin/marketing', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: nextStatus, scheduledFor: nextStatus === 'scheduled' ? scheduledFor || null : null }) });
    if (response.ok) { const data = await response.json(); setPosts((currentPosts) => currentPosts.map((post) => post.id === id ? data.post : post)); }
  };

  const publish = async (id: string) => {
    setStatus('Publishing...');
    const response = await fetch('/api/admin/marketing/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const data = await response.json();
    setStatus(response.ok ? 'Published.' : (data.error || 'Publishing failed.'));
    if (response.ok) setPosts((currentPosts) => currentPosts.map((post) => post.id === id ? data.post : post));
  };

  return <div className="p-6 lg:p-8 max-w-6xl">
    <div className="mb-8"><h1 className="text-3xl font-bold text-white mb-2">Marketing</h1><p className="text-[#a7b0b2]">Create, review, and prepare product posts for your connected social channels.</p></div>
    <form onSubmit={createDraft} className="text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-3 md:items-end">
      <label className="flex-1 text-sm text-[#a7b0b2]">Product<select required value={productSlug} onChange={(event) => setProductSlug(event.target.value)} className="mt-2 w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-3 py-3 text-white"><option value="">Select a product</option>{products.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label>
      <label className="md:w-44 text-sm text-[#a7b0b2]">Platform<select value={platform} onChange={(event) => setPlatform(event.target.value)} className="mt-2 w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-3 py-3 text-white"><option value="x">X</option><option value="facebook">Facebook</option><option value="reddit">Reddit</option><option value="instagram">Instagram</option><option value="linkedin">LinkedIn</option></select></label>
      <label className="md:w-56 text-sm text-[#a7b0b2]">Schedule time<input type="datetime-local" value={scheduledFor} onChange={(event) => setScheduledFor(event.target.value)} className="mt-2 w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-3 py-3 text-white" /></label>
      <button type="submit" className="px-5 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white rounded-lg font-bold">Create Draft</button>
      {status && <span className="text-sm text-[#a7b0b2]">{status}</span>}
    </form>
    <div className="space-y-4">{posts.length === 0 ? <div className="text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-xl p-8 text-[#a7b0b2]">No marketing drafts yet.</div> : posts.map((post) => <article key={post.id} className="text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-xl p-5"><div className="flex flex-wrap items-center justify-between gap-3 mb-3"><div><span className="text-[#8298aa] font-bold uppercase text-xs">{post.platform}</span><span className="text-[#7b898e] text-xs ml-3">{post.productSlug}</span></div><div className="flex gap-2"><select value={post.status} onChange={(event) => updateStatus(post.id, event.target.value)} className="bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-3 py-2 text-xs text-white"><option value="draft">Draft</option><option value="approved">Approved</option><option value="scheduled">Scheduled</option><option value="published">Published</option><option value="failed">Failed</option></select>{['approved', 'scheduled'].includes(post.status) && <button type="button" onClick={() => publish(post.id)} className="px-3 py-2 bg-[#0c1622] border-2 border-[#FBFAF7] text-white rounded-lg text-xs font-bold">Publish now</button>}</div></div><p className="text-[#e1e7e5] text-sm leading-relaxed">{post.content}</p>{post.imageUrl && <p className="text-[#7b898e] text-xs mt-3">Image: {post.imageUrl}</p>}</article>)}</div>
  </div>;
}
