'use client';
import Image from 'next/image';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: '',
    name: '',
    price: '',
    boxPrice: '',
    purity: '≥99%',
    category: 'recovery',
    categoryLabel: '',
    description: '',
    lot: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'slug' && !prev.categoryLabel ? { categoryLabel: value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') } : {}),
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setForm(prev => ({ ...prev, name: value, slug: prev.slug === '' ? slug : prev.slug }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('slug', form.slug || 'product');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadedImage(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          image: uploadedImage || `/images/${form.slug}.png`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/products');
      } else {
        setError(data.error || 'Failed to create product');
      }
    } catch {
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-[#888]">Add a new research compound to the catalog</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-[#888] mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g. BPC-157 10mg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">URL Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g. bpc-157"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Lot Number</label>
                <input
                  type="text"
                  name="lot"
                  value={form.lot}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g. GHK-2437-AB"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Price per Vial (GBP) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="35.99"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Box Price (10 vials, GBP)</label>
                <input
                  type="number"
                  name="boxPrice"
                  value={form.boxPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder={form.price ? (parseFloat(form.price) * 9).toFixed(2) : '323.91'}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-white mb-4">Category & Classification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                >
                  <option value="recovery">Recovery</option>
                  <option value="longevity">Longevity</option>
                  <option value="metabolic">Metabolic</option>
                  <option value="cognitive">Cognitive</option>
                  <option value="blend">Research Blend</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Category Label</label>
                <input
                  type="text"
                  name="categoryLabel"
                  value={form.categoryLabel}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g. Healing Peptide"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Purity</label>
                <input
                  type="text"
                  name="purity"
                  value={form.purity}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="≥99%"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-white mb-4">Description</h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition resize-none"
              placeholder="Supplied for in-vitro laboratory research."
            />
          </div>

          {/* Image */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-white mb-4">Product Image</h2>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-[#1a1a1a] rounded-lg border-2 border-dashed border-[#333] flex items-center justify-center overflow-hidden relative">
                {imagePreview ? (
                  <Image src={imagePreview || "/images/placeholder.png"} alt="Preview" fill className="object-contain" sizes="400px" />
                ) : (
                  <svg className="w-8 h-8 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-[#888] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00d4aa] file:text-black hover:file:bg-[#00b894] file:cursor-pointer"
                />
                <p className="text-[#666] text-xs mt-2">PNG, JPEG, WebP or SVG. Max 5MB.</p>
                {uploadedImage && (
                  <p className="text-[#00d4aa] text-xs mt-1">✓ Image uploaded: {uploadedImage}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-8 py-3 border border-[#222] text-[#ccc] rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
