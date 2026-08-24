'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  slug: string;
  name: string;
  price: number;
  boxPrice: number;
  purity: string;
  category: string;
  categoryLabel: string;
  description: string;
  lot: string;
  image: string;
  stockQuantity?: number;
  discountPercent?: number;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [form, setForm] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          await new Promise<void>((resolve) => {
            setForm(data.product);
            resolve();
          });
          await new Promise<void>((resolve) => {
            setImagePreview(data.product.image);
            resolve();
          });
        } else {
          await new Promise<void>((resolve) => {
            setError('Product not found');
            resolve();
          });
        }
      } catch {
        await new Promise<void>((resolve) => {
          setError('Failed to load product');
          resolve();
        });
      } finally {
        await new Promise<void>((resolve) => {
          setLoading(false);
          resolve();
        });
      }
    };
    fetchProduct();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('slug', slug);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        await new Promise<void>((resolve) => {
          setUploadedImage(data.url);
          resolve();
        });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          image: uploadedImage || form.image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('Product updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to update product');
      }
    } catch {
      setError('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#a7b0b2]">Loading product...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin/products')}
            className="p-2 text-[#a7b0b2] hover:text-white rounded-lg hover:bg-[#1a1a1a] transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Edit Product</h1>
            <p className="text-[#a7b0b2]">{form.name} · {form.slug}</p>
          </div>

          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Stock & Discount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm text-[#a7b0b2] mb-2">Stock Quantity</label><input type="number" name="stockQuantity" value={form.stockQuantity ?? 0} onChange={handleChange} min="0" step="1" className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-sm text-[#a7b0b2] mb-2">Product Discount (%)</label><input type="number" name="discountPercent" value={form.discountPercent ?? 0} onChange={handleChange} min="0" max="100" step="0.01" className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm" /></div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-[#a7b0b2] mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  disabled
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-2.5 text-[#7b898e] text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Lot Number</label>
                <input
                  type="text"
                  name="lot"
                  value={form.lot}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Price per Vial (GBP)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Box Price (10 vials, GBP)</label>
                <input
                  type="number"
                  name="boxPrice"
                  value={form.boxPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Category & Classification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                >
                  <option value="recovery">Recovery</option>
                  <option value="longevity">Longevity</option>
                  <option value="metabolic">Metabolic</option>
                  <option value="cognitive">Cognitive</option>
                  <option value="blend">Research Blend</option>
                  <option value="accessories">Accessories</option>
                  <option value="peptide-holders">Peptide Holders</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Category Label</label>
                <input
                  type="text"
                  name="categoryLabel"
                  value={form.categoryLabel}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Purity</label>
                <input
                  type="text"
                  name="purity"
                  value={form.purity}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Description</h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition resize-none"
            />
          </div>

          {/* Image */}
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h2 className="text-lg font-bold text-white mb-4">Product Image</h2>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-[#1a1a1a] rounded-lg border-2 border-dashed border-[#333] flex items-center justify-center overflow-hidden relative">
                {imagePreview ? (
                  <Image src={imagePreview || "/images/placeholder.svg"} alt="Preview" fill className="object-contain" sizes="400px" />
                ) : (
                  <svg className="w-8 h-8 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-[#a7b0b2] text-sm mb-2">Current: {form.image}</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-[#a7b0b2] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8298aa] file:text-black hover:file:bg-[#657c8f] file:cursor-pointer"
                />
                <p className="text-[#7b898e] text-xs mt-2">Upload a new image to replace the current one.</p>
                {uploadedImage && (
                  <p className="text-[#8298aa] text-xs mt-1">✓ New image uploaded: {uploadedImage}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-[#8298aa] text-black font-bold rounded-lg hover:bg-[#657c8f] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-8 py-3 border border-[#2b3538] text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
            >
              Back to Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
