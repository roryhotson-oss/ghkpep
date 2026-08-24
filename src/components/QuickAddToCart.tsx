'use client';

import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';

export default function QuickAddToCart({ product }: { product: Product }) {
  const addToCart = () => {
    if (isOutOfStock(product)) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(
      (item: { slug: string; type: string }) => item.slug === product.slug && item.type === 'vial'
    );

    if (existingIndex >= 0) {
      cart[existingIndex].qty += 1;
    } else {
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
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <button
      type="button"
      onClick={addToCart}
      disabled={isOutOfStock(product)}
      className="rounded-lg bg-[#8298aa] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#657c8f] disabled:cursor-not-allowed disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100"
    >
      {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
    </button>
  );
}
