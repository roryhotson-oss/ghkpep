'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';

interface Props {
  product: Product;
}

export default function ProductPageClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<'vial' | 'box'>('vial');
  const quantityLimit = product.category === 'accessories' ? 4 : 99;

  const price = effectivePrice(product, selectedType);
  const totalPrice = price * quantity;
  const offerUnitPrice = price * 0.95;
  const offerTotalPrice = offerUnitPrice * quantity;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-400 hover:text-white">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/shop" className="text-gray-400 hover:text-white">
          Shop
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
          <ProductImage src={product.image} alt={product.name} className="object-cover" />
          <div className="absolute top-4 right-4 bg-teal-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Glyvantix Tested
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-semibold">
              COA available
            </span>
            <span className="inline-block bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm ml-2">
              {product.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-white/60 mb-3">{product.description}</p>
          <p className="text-teal-300 text-sm mb-6">Available to purchase as an individual vial or a box of 10.</p>
          <p className="text-amber-300/80 text-sm mb-6 border-l-2 border-amber-300/50 pl-3">
            Laboratory research use only. Not for human or veterinary use, diagnosis, or treatment. No dosing or medical guidance is provided.
          </p>

          {/* Lot Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Lot Number</span>
              <span className="font-mono text-white">{product.lot}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white/5 rounded-lg p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setSelectedType('vial')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedType === 'vial'
                    ? 'bg-teal-500 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                1 Vial
                <div className="text-sm mt-1">£{effectivePrice(product, 'vial').toFixed(2)}</div>
              </button>
              <button
                onClick={() => setSelectedType('box')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedType === 'box'
                    ? 'bg-teal-500 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Box of 10
                <div className="text-sm mt-1">£{effectivePrice(product, 'box').toFixed(2)}</div>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/10 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-l-lg"
                >
                  −
                </button>
                <span className="px-6 py-2 text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quantityLimit, quantity + 1))}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <div className="flex-1 text-right">
                <div className="text-3xl font-bold text-white">£{totalPrice.toFixed(2)}</div>
                <div className="text-sm text-white/60">Total</div>
              </div>
            </div>
            {product.category === 'accessories' && <div className="mt-4">
              <p className="text-sm text-white/60 mb-2">Choose quantity</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((value) => <button
                  key={value}
                  type="button"
                  onClick={() => setQuantity(value)}
                  className={`py-2 rounded-lg font-semibold transition ${quantity === value ? 'bg-teal-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {value}
                </button>)}
              </div>
            </div>}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={isOutOfStock(product)}
            onClick={() => {
              if (isOutOfStock(product)) return;
              const cart = JSON.parse(localStorage.getItem('cart') || '[]');
              cart.push({
                slug: product.slug,
                name: product.name,
                price: effectivePrice(product, selectedType),
                boxPrice: effectivePrice(product, 'box'),
                image: product.image,
                lot: product.lot,
                qty: quantity,
                type: selectedType,
              });
              localStorage.setItem('cart', JSON.stringify(cart));
              window.dispatchEvent(new Event('cart-updated'));
              alert('Added to cart!');
            }}
            className="w-full bg-teal-500 text-black font-bold py-4 rounded-lg hover:bg-teal-600 transition mb-6"
          >
            {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
          </button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-teal-500">✓</span>
              <span className="text-white/80">Independently Tested</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-teal-500">✓</span>
              <span className="text-white/80">Free UK Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-teal-500">✓</span>
              <span className="text-white/80">Same Day Dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-teal-500">✓</span>
              <span className="text-white/80">COA Available</span>
            </div>
          </div>

          {/* COA Link */}
          <div className="border-t border-white/10 pt-6">
            <a
              href={`/api/coa?lot=${encodeURIComponent(product.lot)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300"
            >
              <span>View Certificate of Analysis</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 bg-white/5 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Batch documentation available</li>
              <li>• Format: Lyophilized powder</li>
              <li>• Storage: -20°C</li>
              <li>• Research use only</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Independently tested by Glyvantix Labs</li>
              <li>• Full COA available for each batch</li>
              <li>• 8-point testing protocol</li>
              <li>• UK-based quality control</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product offer */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-2">Special Offer: 5% Off This Product</h2>
        <p className="text-white/60 mb-6">Purchase {product.name} today and receive 5% off your selected vial or box quantity.</p>
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="font-semibold text-white">{selectedType === 'box' ? 'Box of 10 vials' : '1 vial'} offer price</p>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-bold text-teal-400">£{offerUnitPrice.toFixed(2)}</span>
              <span className="text-sm text-white/50 line-through">£{price.toFixed(2)}</span>
              <span className="text-sm font-semibold text-teal-400">5% off</span>
            </div>
            <p className="text-sm text-white/60 mt-1">{quantity} selected · Offer total £{offerTotalPrice.toFixed(2)}</p>
          </div>
          <button
            type="button"
            disabled={isOutOfStock(product)}
            onClick={() => {
              if (isOutOfStock(product)) return;
              const cart = JSON.parse(localStorage.getItem('cart') || '[]');
              cart.push({
                slug: product.slug,
                name: product.name,
                price: effectivePrice(product, 'vial') * 0.95,
                boxPrice: effectivePrice(product, 'box') * 0.95,
                image: product.image,
                lot: product.lot,
                qty: quantity,
                type: selectedType,
              });
              localStorage.setItem('cart', JSON.stringify(cart));
              window.dispatchEvent(new Event('cart-updated'));
              alert('5% off offer added to cart!');
            }}
            className="w-full md:w-auto bg-teal-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
          >
            Add 5% Off Offer
          </button>
        </div>
      </div>
    </div>
  );
}
