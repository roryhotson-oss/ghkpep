'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
      })
      .catch(() => {});
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
    { id: 'peptide-holders', label: 'Peptide Holders', count: products.filter(p => p.category === 'peptide-holders').length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#3b4b57] shadow-sm">
            <Image src="/images/hero-lab.png" alt="Dark laboratory workspace with research vials" fill priority className="object-cover object-center opacity-45" sizes="(max-width: 768px) 100vw, 1200px" />
            <div className="absolute inset-0 bg-[#07121c]/65" />
            <div className="relative z-10 flex min-h-[280px] max-w-2xl flex-col justify-center p-6 sm:p-10">
              <p className="text-[#afc0ca] text-sm font-medium mb-2">Reference Grade Catalog</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Research Compounds</h1>
              <p className="text-[#d8e2e8] mt-3 max-w-2xl">
                Every product is accompanied by batch documentation and sold as a one-off vial by default. Ordering more than 5? We source a fresh box of 10 specifically for that quantity. All prices in GBP.
              </p>
              <p className="text-[#b8c5c5] text-sm mt-2">{filteredProducts.length} products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#2b3538]">
        <div className="flex flex-wrap gap-2 text-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#8298aa]/25 text-[#d8e2e8] border border-[#8298aa] shadow-sm'
                  : 'bg-[#17212a] text-[#c2ced5] border border-[#3b4b57] shadow-sm hover:bg-[#202e39] hover:border-[#8298aa]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group bg-[#141414] rounded-xl p-6 border border-[#2b3538] hover:border-[#8298aa]/30 transition card-glow"
            >
              <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden relative">
                <ProductImage src={product.image} alt={product.name} className="object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#17232d] text-[#8298aa] rounded-full font-medium">
                  COA available
                </span>
              </div>
              <p className="text-[#a7b0b2] text-xs">{product.categoryLabel}</p>
              <h3 className="font-semibold text-sm mt-1 group-hover:text-[#8298aa] transition line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[#7b898e] text-xs mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">From £{effectivePrice(product, 'vial').toFixed(2)}</p>
                  {product.discountPercent ? <p className="text-[#8298aa] text-xs">{product.discountPercent}% off</p> : null}
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
                    alert('Added to cart!');
                  }}
                  className={`px-3 py-1.5 rounded-md border border-[#657c8f] bg-[#1b2731] text-[#c2ced5] text-xs font-medium shadow-sm transition ${isOutOfStock(product) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#263744] hover:border-[#a6b8c4]'}`}
                >
                  {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
                </button>
                <span className="px-3 py-1.5 rounded-md border border-[#657c8f] bg-[#1b2731] text-[#c2ced5] text-xs font-medium shadow-sm transition group-hover:bg-[#263744] group-hover:border-[#a6b8c4]">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
