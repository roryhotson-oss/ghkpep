'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';
import { groupProducts, isProductGroup, selectVariant, defaultDosage } from '@/lib/productGroups';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDosageByProduct, setSelectedDosageByProduct] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm] = useState(() => typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('search') || '');

  const displayProducts = groupProducts(products);
  const filteredProducts = displayProducts.filter((entry) => {
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    const searchableText = `${entry.name} ${entry.description} ${entry.categoryLabel}`.toLowerCase();
    return matchesCategory && (!searchTerm || searchableText.includes(searchTerm.toLowerCase()));
  });
  const categories = [
    { value: 'all', label: 'All materials' },
    { value: 'recovery', label: 'Peptide research' },
    { value: 'longevity', label: 'Longevity research' },
    { value: 'metabolic', label: 'Metabolic research' },
    { value: 'blend', label: 'Research blends' },
    { value: 'accessories', label: 'Laboratory supplies' },
  ];

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Products Grid */}
      <div data-scroll-section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 border-b border-[#d8d4c9] pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8792]">GHK Peptides</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#34414a] sm:text-4xl">Research materials</h1>
            </div>
            <p className="text-sm text-[#66747b]">{filteredProducts.length} catalog entries</p>
          </div>
          <nav aria-label="Product categories" className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${selectedCategory === category.value ? 'border-[#5b8ca0] bg-[#5b8ca0] text-white' : 'border-[#c8dfe7] bg-[#eef8fb] text-[#5b8ca0] hover:border-[#5b8ca0]'}`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
          {filteredProducts.map((entry) => {
            if (isProductGroup(entry)) {
              const variants = entry.variants;
              const dosageOptions = variants.flatMap((variant) => variant.dosageOptions ?? []);
              const selectedDosage = selectedDosageByProduct[entry.key] ?? defaultDosage(variants);
              const selectedProduct = selectVariant(variants, selectedDosage);
              const dosageUnit = 'mg';
              const bundleMessage = 'Bundle pricing: 2 x boxes save 7.5%';

              return (
                <div
                  key={entry.key}
                  className="group flex flex-col text-[#34414a] bg-[#fbfaf7] rounded-2xl p-4 border-2 border-[#111827] shadow-[0_8px_20px_rgba(52,65,74,0.06)] hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(52,65,74,0.12)] transition"
                >
                  <div className="aspect-[16/9] rounded-xl mb-4 overflow-hidden relative">
                    <ProductImage
                      src={entry.image}
                      alt={entry.name}
                      className="object-contain !scale-100"
                    />
                  </div>
                  <p className="text-[#6d8792] text-[11px] font-semibold uppercase tracking-[0.12em]">{entry.categoryLabel}</p>
                  <h3 className="font-bold text-lg mt-1 group-hover:text-[#5b8ca0] transition line-clamp-2">{entry.name}</h3>
                  <p className="text-[#66747b] text-xs mt-1 line-clamp-2">{entry.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[#34414a] font-bold">£{effectivePrice(selectedProduct, 'box', selectedDosage).toFixed(2)}</p>
                      <p className="text-[#66747b] text-xs">{selectedDosage}{dosageUnit} · Box of 10</p>
                      <p className="text-[#6d8792] text-[10px] uppercase tracking-[0.12em] mt-1">{bundleMessage}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-[11px] uppercase tracking-[0.12em] text-[#6d8792] mb-1.5">Dose</label>
                    <select
                      value={selectedDosage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedDosageByProduct((prev) => ({ ...prev, [entry.key]: Number(e.target.value) }));
                      }}
                      className="w-full rounded-md border border-[#c8dfe7] bg-white px-2.5 py-2 text-xs text-[#34414a] outline-none focus:border-[#5b8ca0]"
                    >
                      {dosageOptions.map((dosage) => (
                        <option key={`${entry.key}-${dosage}`} value={dosage}>{dosage}{dosageUnit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        if (!selectedProduct || isOutOfStock(selectedProduct)) return;
                        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        cart.push({
                          slug: selectedProduct.slug,
                          name: `${selectedProduct.name} ${selectedDosage}${dosageUnit}`,
                          price: effectivePrice(selectedProduct, 'box', selectedDosage),
                          boxPrice: effectivePrice(selectedProduct, 'box', selectedDosage),
                          image: selectedProduct.image,
                          lot: selectedProduct.lot,
                          qty: 1,
                          type: 'box' as const,
                          strength: selectedDosage,
                        });
                        localStorage.setItem('cart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cart-updated'));
                        alert('Added to cart!');
                      }}
                      className={`px-3 py-1.5 rounded-md border font-semibold shadow-sm transition ${isOutOfStock(selectedProduct) ? 'opacity-50 cursor-not-allowed border-[#c8dfe7] bg-[#eef8fb] text-[#8a989e]' : 'border-[#5b8ca0] bg-[#5b8ca0] text-white hover:bg-[#466f7f]'}`}
                    >
                      {isOutOfStock(selectedProduct) ? 'Out of stock' : 'Add to Cart'}
                    </button>
                    <Link
                      href={`/shop/${selectedProduct.slug}`}
                      aria-label={`View ${selectedProduct.name}`}
                      title={`View ${selectedProduct.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c8dfe7] bg-white text-lg text-[#5b8ca0] shadow-sm transition hover:bg-[#eef8fb] hover:border-[#5b8ca0]"
                    >
                      →
                    </Link>
                  </div>
                </div>
              );
            }

            const product = entry;
            const dosageOptions = product.dosageOptions && product.dosageOptions.length > 0 ? product.dosageOptions : [5, 10, 15];
            const selectedDosage = selectedDosageByProduct[product.slug] ?? (dosageOptions.includes(10) ? 10 : dosageOptions[0]);
            const dosageUnit = product.slug === 'refined-h2o' ? 'ml' : 'mg';
            const bundleMessage = 'Bundle pricing: 2 x boxes save 7.5%';

            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group flex flex-col text-[#34414a] bg-[#fbfaf7] rounded-2xl p-4 border-2 border-[#111827] shadow-[0_8px_20px_rgba(52,65,74,0.06)] hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(52,65,74,0.12)] transition"
              >
                <div className="aspect-[16/9] rounded-xl mb-4 overflow-hidden relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="object-contain !scale-100"
                  />
                </div>
                <p className="text-[#6d8792] text-[11px] font-semibold uppercase tracking-[0.12em]">{product.categoryLabel}</p>
                <h3 className="font-bold text-lg mt-1 group-hover:text-[#5b8ca0] transition line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[#66747b] text-xs mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[#34414a] font-bold">£{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</p>
                    {product.discountPercent ? <p className="text-[#5b8ca0] text-xs">{product.discountPercent}% off</p> : null}
                    <p className="text-[#6d8792] text-[10px] uppercase tracking-[0.12em] mt-1">{bundleMessage}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#6d8792] mb-1.5">Dose</label>
                  <select
                    value={selectedDosage}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedDosageByProduct((prev) => ({ ...prev, [product.slug]: Number(e.target.value) }));
                    }}
                  className="w-full rounded-md border border-[#c8dfe7] bg-white px-2.5 py-2 text-xs text-[#34414a] outline-none focus:border-[#5b8ca0]"
                  >
                    {dosageOptions.map((dosage) => (
                      <option key={dosage} value={dosage}>{dosage}{dosageUnit}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isOutOfStock(product)) return;
                      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                      cart.push({
                        slug: product.slug,
                        name: `${product.name} ${selectedDosage}${dosageUnit}`,
                        price: effectivePrice(product, 'vial'),
                        boxPrice: effectivePrice(product, 'box', selectedDosage),
                        image: product.image,
                        lot: product.lot,
                        qty: 1,
                        type: 'vial' as const,
                        strength: selectedDosage,
                      });
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.dispatchEvent(new Event('cart-updated'));
                      alert('Added to cart!');
                    }}
                    className={`px-3 py-1.5 rounded-md border font-semibold shadow-sm transition ${isOutOfStock(product) ? 'opacity-50 cursor-not-allowed border-[#c8dfe7] bg-[#eef8fb] text-[#8a989e]' : 'border-[#5b8ca0] bg-[#5b8ca0] text-white hover:bg-[#466f7f]'}`}
                  >
                    {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
                  </button>
                  <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c8dfe7] bg-white text-lg text-[#5b8ca0] shadow-sm transition group-hover:bg-[#eef8fb] group-hover:border-[#5b8ca0]">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
