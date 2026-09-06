'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';
import { effectivePrice, getBundleDiscountPercent, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';
import { groupProducts, isProductGroup, selectVariant, defaultDosage } from '@/lib/productGroups';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDosageByProduct, setSelectedDosageByProduct] = useState<Record<string, number>>({});

  const displayProducts = groupProducts(products);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
      })
      .catch(() => {});
  }, []);

  const scrollToSection = (direction: 'up' | 'down') => {
    const sections = Array.from(document.querySelectorAll('[data-scroll-section]')) as HTMLElement[];
    if (!sections.length) return;

    const currentIndex = sections.findIndex((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35;
    });

    const targetIndex = direction === 'down'
      ? Math.min(currentIndex === -1 ? 0 : currentIndex + 1, sections.length - 1)
      : Math.max(currentIndex === -1 ? 0 : currentIndex - 1, 0);

    sections[targetIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Scroll up"
          onClick={() => scrollToSection('up')}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FBFAF7] bg-[#0c1622]/95 text-xl text-[#e6edf3] shadow-lg transition hover:bg-[#16283c]"
        >
          ↑
        </button>
        <button
          type="button"
          aria-label="Scroll down"
          onClick={() => scrollToSection('down')}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FBFAF7] bg-[#0c1622]/95 text-xl text-[#e6edf3] shadow-lg transition hover:bg-[#16283c]"
        >
          ↓
        </button>
      </div>

      {/* Hero */}
      <section data-scroll-section className="border-b border-[#d8d4c9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative min-h-[380px] sm:min-h-[460px] overflow-hidden rounded-3xl border-4 border-[#FBFAF7] bg-[#0c1622] shadow-md">
            <Image
              src="/images/shop-hero.jpg"
              alt="Box of 10 GHK Peptides research vials"
              fill
              priority
              quality={95}
              className="object-cover object-right"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07121c] via-[#07121c]/85 to-transparent" />
            <div className="relative z-10 flex min-h-[340px] sm:min-h-[420px] max-w-2xl flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div>
                  <p className="text-[#e6edf3] text-sm font-semibold">GHK PEPTIDES</p>
                  <p className="text-[#e6edf3] text-xs font-medium mt-1">Peptides UK · Direct · Wholesale</p>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">Research Compounds</h1>
              <p className="text-[#e2eaf1] mt-4 max-w-2xl leading-relaxed">
                We source boxes of 10 vials from a small group of established laboratories with active research communities. Individual vials and boxes are supplied for laboratory research only, with supplier batch documentation where available.
              </p>
              <p className="text-[#b9c8d6] text-sm mt-2 max-w-2xl">
                Orders are shipped from China and typically arrive within 5–9 days. All prices are shown in GBP.
              </p>
              <p className="text-[#b9c8d6] text-sm mt-2 max-w-2xl">
                Click a listing to view the research peptides and other laboratory products we source.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[#FBFAF7] bg-[#0c1622]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e6edf3]">
                  Market matched
                </span>
                <span className="inline-flex items-center rounded-full border border-[#FBFAF7] bg-[#0c1622]/85 px-3 py-1.5 text-[10px] font-medium text-[#d8e2e8]">
                  2+ vials save 5% • 5+ save 10%
                </span>
              </div>
              <p className="text-[#b9c8d6] text-sm mt-3">{products.length} products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div data-scroll-section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((entry) => {
            if (isProductGroup(entry)) {
              const variants = entry.variants;
              const dosageOptions = variants.flatMap((variant) => variant.dosageOptions ?? []);
              const selectedDosage = selectedDosageByProduct[entry.key] ?? defaultDosage(variants);
              const selectedProduct = selectVariant(variants, selectedDosage);
              const dosageUnit = 'mg';
              const marketTier = entry.marketTier || 'mid-market';
              const marketBadge = marketTier === 'premium' ? 'Premium' : marketTier === 'value' ? 'Value' : 'Market matched';
              const bundleMessage = getBundleDiscountPercent(2) > 0 ? 'Bundle pricing: 2+ vials save 5%' : 'Bundle pricing';

              return (
                <div
                  key={entry.key}
                  className="group text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md hover:shadow-lg transition card-glow"
                >
                  <div className="aspect-square bg-[#111d2c] rounded-lg mb-4 overflow-hidden relative">
                    <ProductImage
                      src={entry.image}
                      alt={entry.name}
                      className="object-contain"
                      showBoxLabel
                      showPackagingNotice
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg font-medium">Lot reference</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg font-medium">{marketBadge}</span>
                  </div>
                  <p className="text-[#a7b0b2] text-xs">{entry.categoryLabel}</p>
                  <h3 className="font-semibold text-sm mt-1 group-hover:text-[#8298aa] transition line-clamp-1">{entry.name}</h3>
                  <p className="text-[#7b898e] text-xs mt-1 line-clamp-2">{entry.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">£{effectivePrice(selectedProduct, 'box', selectedDosage).toFixed(2)}</p>
                      <p className="text-[#7b898e] text-xs">{selectedDosage}{dosageUnit} · Box of 10</p>
                      <p className="text-[#93a7b0] text-[10px] uppercase tracking-[0.12em] mt-1">{bundleMessage}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-[11px] uppercase tracking-[0.12em] text-[#a7b0b2] mb-1.5">Dose</label>
                    <select
                      value={selectedDosage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedDosageByProduct((prev) => ({ ...prev, [entry.key]: Number(e.target.value) }));
                      }}
                      className="w-full rounded-md border border-[#FBFAF7] bg-[#0c1622] px-2.5 py-2 text-xs text-[#eef4f7] outline-none focus:border-[#3E6B93]"
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
                      className={`px-3 py-1.5 rounded-md border font-semibold shadow-sm transition ${isOutOfStock(selectedProduct) ? 'opacity-50 cursor-not-allowed border-[#FBFAF7]/70 bg-[#0c1622] text-[#c2ced5]' : 'border-[#FBFAF7] bg-[#0c1622] text-white hover:bg-[#16283c]'}`}
                    >
                      {isOutOfStock(selectedProduct) ? 'Out of stock' : 'Add to Cart'}
                    </button>
                    <Link
                      href={`/shop/${selectedProduct.slug}`}
                      className="px-3 py-1.5 rounded-md border border-[#FBFAF7]/70 bg-[#0c1622] text-[#c2ced5] text-xs font-medium shadow-sm transition hover:bg-[#16283c] hover:border-[#FBFAF7]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              );
            }

            const product = entry;
            const dosageOptions = product.dosageOptions && product.dosageOptions.length > 0 ? product.dosageOptions : [5, 10, 15];
            const selectedDosage = selectedDosageByProduct[product.slug] ?? (dosageOptions.includes(10) ? 10 : dosageOptions[0]);
            const dosageUnit = product.slug === 'refined-h2o' ? 'ml' : 'mg';
            const marketTier = product.marketTier || (product.price >= 28 ? 'premium' : 'mid-market');
            const marketBadge = marketTier === 'premium' ? 'Premium' : marketTier === 'value' ? 'Value' : 'Market matched';
            const bundleMessage = getBundleDiscountPercent(2) > 0 ? 'Bundle pricing: 2+ vials save 5%' : 'Bundle pricing';

            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md hover:shadow-lg transition card-glow"
              >
                <div className="aspect-square bg-[#111d2c] rounded-lg mb-4 overflow-hidden relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="object-contain"
                    showBoxLabel
                    showPackagingNotice={product.category !== 'accessories' && product.category !== 'peptide-holders'}
                  />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg font-medium">
                    Lot reference
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg font-medium">
                    {marketBadge}
                  </span>
                </div>
                <p className="text-[#a7b0b2] text-xs">{product.categoryLabel}</p>
                <h3 className="font-semibold text-sm mt-1 group-hover:text-[#8298aa] transition line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[#7b898e] text-xs mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">Box 10 £{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</p>
                    {product.discountPercent ? <p className="text-[#8298aa] text-xs">{product.discountPercent}% off</p> : null}
                    <p className="text-[#7b898e] text-xs">Bulk pack: £{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</p>
                    <p className="text-[#93a7b0] text-[10px] uppercase tracking-[0.12em] mt-1">{bundleMessage}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#a7b0b2] mb-1.5">Dose</label>
                  <select
                    value={selectedDosage}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedDosageByProduct((prev) => ({ ...prev, [product.slug]: Number(e.target.value) }));
                    }}
                  className="w-full rounded-md border border-[#FBFAF7] bg-[#0c1622] px-2.5 py-2 text-xs text-[#eef4f7] outline-none focus:border-[#3E6B93]"
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
                    className={`px-3 py-1.5 rounded-md border font-semibold shadow-sm transition ${isOutOfStock(product) ? 'opacity-50 cursor-not-allowed border-[#FBFAF7]/70 bg-[#0c1622] text-[#c2ced5]' : 'border-[#FBFAF7] bg-[#0c1622] text-white hover:bg-[#16283c]'}`}
                  >
                    {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
                  </button>
                  <span className="px-3 py-1.5 rounded-md border border-[#FBFAF7]/70 bg-[#0c1622] text-[#c2ced5] text-xs font-medium shadow-sm transition group-hover:bg-[#16283c] group-hover:border-[#FBFAF7]">View →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
