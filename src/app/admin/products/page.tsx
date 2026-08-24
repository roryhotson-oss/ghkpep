'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function SafeImage({ src, alt, fill, className, sizes }: { src: string; alt: string; fill?: boolean; className?: string; sizes?: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <Image
        src="/images/hero-lab.png"
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        await new Promise<void>((resolve) => {
          setProducts(products.filter(p => p.slug !== slug));
          resolve();
        });
        await new Promise<void>((resolve) => {
          setDeleteConfirm(null);
          resolve();
        });
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#a7b0b2]">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-[#a7b0b2]">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-[#21c7a5] text-black font-bold rounded-lg hover:bg-[#16a98d] transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#21c7a5] transition"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#141414] border border-[#2b3538] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#21c7a5] transition"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div key={product.slug} className="bg-[#141414] rounded-xl border border-[#2b3538] overflow-hidden hover:border-[#333] transition">
            {/* Image */}
            <div className="h-48 bg-[#1a1a1a] flex items-center justify-center p-4 relative">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                className="max-h-full max-w-full object-contain"
                sizes="200px"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-semibold text-sm">{product.name}</h3>
                  <p className="text-[#a7b0b2] text-xs">{product.categoryLabel} · {product.purity}</p>
                </div>
                <span className="text-[#21c7a5] font-bold text-sm">£{product.price.toFixed(2)}{product.discountPercent ? ` (-${product.discountPercent}%)` : ''}</span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-[#a7b0b2]">
                  <span>Box: £{product.boxPrice.toFixed(2)}</span>
                  <span className="mx-2">·</span>
                  <span>Lot: {product.lot}</span>
                  <span className={product.stockQuantity === 0 ? 'text-red-400' : product.stockQuantity !== undefined && product.stockQuantity < 10 ? 'text-yellow-400' : ''}>Stock: {product.stockQuantity ?? '—'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#2b3538]">
                <Link
                  href={`/admin/products/${product.slug}/edit`}
                  className="flex-1 px-3 py-2 bg-[#1a1a1a] text-[#e1e7e5] rounded-lg text-xs text-center hover:bg-[#2b3538] hover:text-white transition"
                >
                  Edit
                </Link>
                <Link
                  href={`/shop/${product.slug}`}
                  className="flex-1 px-3 py-2 bg-[#1a1a1a] text-[#e1e7e5] rounded-lg text-xs text-center hover:bg-[#2b3538] hover:text-white transition"
                >
                  View
                </Link>
                {deleteConfirm === product.slug ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(product.slug)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-2 bg-[#1a1a1a] text-[#a7b0b2] rounded-lg text-xs hover:bg-[#2b3538] transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(product.slug)}
                    className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#a7b0b2]">No products found</p>
        </div>
      )}
    </div>
  );
}
