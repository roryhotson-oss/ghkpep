'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', count: products.length },
    { id: 'recovery', label: 'Tissue & Matrix', count: products.filter(p => p.category === 'recovery').length },
    { id: 'cognitive', label: 'Neuro Research', count: products.filter(p => p.category === 'cognitive').length },
    { id: 'longevity', label: 'Mitochondrial & Cellular', count: products.filter(p => p.category === 'longevity').length },
    { id: 'metabolic', label: 'Incretin & Amylin', count: products.filter(p => p.category === 'metabolic').length },
    { id: 'blend', label: 'Research Blends', count: products.filter(p => p.category === 'blend').length },
    { id: 'accessories', label: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Reference-Grade Catalog</p>
          <h1 className="text-3xl font-bold">Research Compounds</h1>
          <p className="text-[#888] mt-3 max-w-2xl">
            Every vial is independently tested and accompanied by a downloadable certificate of analysis. All prices in GBP. Box of 10 vials available.
          </p>
          <p className="text-[#888] text-sm mt-2">{filteredProducts.length} products</p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#222]">
        <div className="flex flex-wrap gap-2 text-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#00d4aa] text-black'
                  : 'bg-[#141414] text-[#ccc] border border-[#222] hover:border-[#00d4aa]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group bg-[#141414] rounded-xl p-4 border border-[#222] hover:border-[#00d4aa]/30 transition card-glow"
            >
              <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#0a2a22] text-[#00d4aa] rounded-full font-medium">
                  {product.purity}
                </span>
              </div>
              <p className="text-[#888] text-xs">{product.categoryLabel}</p>
              <h3 className="font-semibold text-sm mt-1 group-hover:text-[#00d4aa] transition line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[#666] text-xs mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">From £{product.price.toFixed(2)}</p>
                  <p className="text-[#666] text-xs">Box of 10: £{product.boxPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    cart.push({
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      boxPrice: product.boxPrice,
                      image: product.image,
                      lot: product.lot,
                      qty: 1,
                      type: 'vial' as const,
                    });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Added to cart!');
                  }}
                  className="text-[#00d4aa] text-xs font-medium hover:underline"
                >
                  Add to Cart
                </button>
                <span className="text-[#00d4aa] text-xs font-medium group-hover:underline">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
