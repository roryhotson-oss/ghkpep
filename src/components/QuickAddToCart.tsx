'use client';

import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';

export default function QuickAddToCart({ product }: { product: Product }) {
  const dosageOptions = product.dosageOptions && product.dosageOptions.length > 0 ? product.dosageOptions : [5, 10, 15];
  const selectedDosage = dosageOptions.includes(10) ? 10 : dosageOptions[0];
  const dosageUnit = product.slug === 'refined-h2o' ? 'ml' : 'mg';

  const addToCart = () => {
    if (isOutOfStock(product)) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(
      (item: { slug: string; type: string; strength?: number }) => item.slug === product.slug && item.type === 'box' && item.strength === selectedDosage
    );

    if (existingIndex >= 0) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        slug: product.slug,
        name: `${product.name} ${selectedDosage}${dosageUnit}`,
        price: effectivePrice(product, 'box', selectedDosage),
        boxPrice: effectivePrice(product, 'box', selectedDosage),
        image: product.image,
        lot: product.lot,
        qty: 1,
        type: 'box' as const,
        strength: selectedDosage,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <button
      type="button"
      onClick={addToCart}
      disabled={isOutOfStock(product)}
      className="rounded-lg bg-[#0c1622] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#16283c] disabled:cursor-not-allowed disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100"
    >
      {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
    </button>
  );
}
