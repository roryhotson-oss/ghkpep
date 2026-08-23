'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';

export default function ShopCatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadError, setLoadError] = useState(false);
  const [cartNotice, setCartNotice] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoadError(false);
      })
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  const filteredProducts = selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory);

  const categories = useMemo(() => {
    const counts = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', label: 'All', count: products.length },
      { id: 'recovery', label: 'Tissue & Matrix', count: counts.recovery ?? 0 },
      { id: 'cognitive', label: 'Neuro Research', count: counts.cognitive ?? 0 },
      { id: 'longevity', label: 'Mitochondrial & Cellular', count: counts.longevity ?? 0 },
      { id: 'metabolic', label: 'Incretin & Amylin', count: counts.metabolic ?? 0 },
      { id: 'blend', label: 'Research Blends', count: counts.blend ?? 0 },
      { id: 'accessories', label: 'Accessories', count: counts.accessories ?? 0 },
      { id: 'peptide-holders', label: 'Peptide Holders', count: counts['peptide-holders'] ?? 0 },
    ];
  }, [products]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#2b3538]">
        <div className="flex flex-wrap gap-2 text-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#21c7a5] text-black'
                  : 'bg-[#141414] text-[#e1e7e5] border border-[#2b3538] hover:border-[#21c7a5]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loadError ? (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-900/20 p-4 text-sm text-red-300">
            We could not load products right now. Please refresh the page or try again shortly.
          </div>
        ) : null}
        {cartNotice ? (
          <div className="mb-6 rounded-lg border border-[#21c7a5]/30 bg-[#0a2a22]/40 p-4 text-sm text-[#b9f6e7]">
            {cartNotice}
          </div>
        ) : null}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group bg-[#141414] rounded-xl p-4 border border-[#2b3538] hover:border-[#21c7a5]/30 transition card-glow"
            >
              <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-3 overflow-hidden relative">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#0a2a22] text-[#21c7a5] rounded-full font-medium">{product.purity}</span>
              </div>
              <p className="text-[#a7b0b2] text-xs">{product.categoryLabel}</p>
              <h3 className="font-semibold text-sm mt-1 group-hover:text-[#21c7a5] transition line-clamp-1">{product.name}</h3>
              <p className="text-[#7b898e] text-xs mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">From £{effectivePrice(product, 'vial').toFixed(2)}</p>
                  {product.discountPercent ? <p className="text-[#21c7a5] text-xs">{product.discountPercent}% off</p> : null}
                  <p className="text-[#7b898e] text-xs">Box of 10: £{effectivePrice(product, 'box').toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isOutOfStock(product)) return;
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    cart.push({
                      slug: product.slug,
                      name: product.name,
                      price: effectivePrice(product, 'vial'),
                      boxPrice: effectivePrice(product, 'box'),
                      image: product.image,
                      lot: product.lot,
                      qty: 1,
                      type: 'vial' as const,
                    });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('cart-updated'));
                    setCartNotice(`${product.name} added to cart.`);
                    window.setTimeout(() => setCartNotice(''), 2200);
                  }}
                  className={`text-[#21c7a5] text-xs font-medium ${isOutOfStock(product) ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                >
                  {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
                </button>
                <span className="text-[#21c7a5] text-xs font-medium group-hover:underline">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
