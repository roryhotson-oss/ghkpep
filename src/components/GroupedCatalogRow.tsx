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
    <tr className="group relative border-b border-[#bccfe2] last:border-0 hover:bg-[#d9e6f2] hover:shadow-lg hover:scale-[1.01] hover:z-10 transition text-[#243a50]">
      <td className="px-4 py-3 min-w-[280px]">
        <div className="flex items-center gap-3">
          <Image src={group.image} alt={group.name} width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-[#FBFAF7]/70 object-cover bg-[#dce7f2] shrink-0" />
          <div className="min-w-0">
            <Link href={`/shop/${selectedProduct.slug}`} className="font-medium text-[#1c2c3e] hover:text-[#3E6B93] transition">{group.name}</Link>
            <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#6e8299] md:opacity-0 md:translate-y-1 md:transition-all md:duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100">{group.description}</p>
            <select
              value={selectedDosage}
              onChange={(e) => setSelectedDosage(Number(e.target.value))}
              className="mt-1.5 rounded-md border border-[#FBFAF7] bg-[#0c1622] px-2 py-1 text-xs text-[#e6edf3] outline-none focus:border-[#8298aa]"
            >
              {dosageOptions.map((dosage) => (
                <option key={dosage} value={dosage}>{dosage}mg</option>
              ))}
            </select>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">{group.categoryLabel}</td>
      <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">Lot reference held</td>
      <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">£{effectivePrice(selectedProduct, 'box', selectedDosage).toFixed(2)} <span className="text-xs font-medium">(10 vials)</span></td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <a href={`/api/coa?lot=${encodeURIComponent(selectedProduct.lot)}`} target="_blank" rel="noreferrer" className="text-[#8298aa] hover:underline">Summary PDF</a>
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
