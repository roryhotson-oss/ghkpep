'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ProductGroup } from '@/lib/productGroups';
import { selectVariant, defaultDosage } from '@/lib/productGroups';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';

export default function GroupedCatalogRow({ group }: { group: ProductGroup }) {
  const [selectedDosage, setSelectedDosage] = useState(defaultDosage(group.variants));
  const selectedProduct = selectVariant(group.variants, selectedDosage);
  const dosageOptions = group.variants.flatMap((variant) => variant.dosageOptions ?? []);

  const addToCart = () => {
    if (isOutOfStock(selectedProduct)) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(
      (item: { slug: string; type: string; strength?: number }) =>
        item.slug === selectedProduct.slug && item.type === 'box' && item.strength === selectedDosage
    );

    if (existingIndex >= 0) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        slug: selectedProduct.slug,
        name: `${selectedProduct.name} ${selectedDosage}mg`,
        price: effectivePrice(selectedProduct, 'box', selectedDosage),
        boxPrice: effectivePrice(selectedProduct, 'box', selectedDosage),
        image: selectedProduct.image,
        lot: selectedProduct.lot,
        qty: 1,
        type: 'box' as const,
        strength: selectedDosage,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <tr className="group relative border-b border-[#e6e2da] last:border-0 hover:bg-[#eef8fb] transition text-[#34414a]">
      <td className="px-4 py-3 min-w-[280px]">
        <div className="flex items-center gap-3">
          <Image src={group.image} alt={group.name} width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-[#b8c7d1] object-cover bg-[#eef8fb] shrink-0" />
          <div className="min-w-0">
            <Link href={`/shop/${selectedProduct.slug}`} className="font-semibold text-[#34414a] hover:text-[#5b8ca0] transition">{group.name}</Link>
            <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#6e8299] md:opacity-0 md:translate-y-1 md:transition-all md:duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100">{group.description}</p>
            <select
              value={selectedDosage}
              onChange={(e) => setSelectedDosage(Number(e.target.value))}
              className="mt-1.5 rounded-md border border-[#c8dfe7] bg-white px-2 py-1 text-xs text-[#34414a] outline-none focus:border-[#5b8ca0]"
            >
              {dosageOptions.map((dosage) => (
                <option key={dosage} value={dosage}>{dosage}mg</option>
              ))}
            </select>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-[#53636b] whitespace-nowrap">{group.categoryLabel}</td>
      <td className="px-4 py-3 text-[#53636b] whitespace-nowrap">Batch reference</td>
      <td className="px-4 py-3 font-semibold text-[#34414a] whitespace-nowrap">£{effectivePrice(selectedProduct, 'box', selectedDosage).toFixed(2)} <span className="text-xs font-medium">(10 vials)</span></td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <button
            onClick={addToCart}
            disabled={isOutOfStock(selectedProduct)}
            className="text-xs font-bold text-[#3E6B93] hover:text-[#2C5170] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOutOfStock(selectedProduct) ? 'Out of stock' : 'Add to Cart'}
          </button>
        </div>
      </td>
    </tr>
  );
}
