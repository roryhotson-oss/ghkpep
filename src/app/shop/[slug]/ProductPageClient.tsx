'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductPageClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<'vial' | 'box'>('vial');

  const price = selectedType === 'box' ? product.boxPrice : product.price;
  const totalPrice = price * quantity;

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
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🧪</span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-teal-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Glyvantix Tested
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-semibold">
              {product.purity}
            </span>
            <span className="inline-block bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm ml-2">
              {product.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-white/60 mb-6">{product.description}</p>

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
                <div className="text-sm mt-1">£{product.price.toFixed(2)}</div>
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
                <div className="text-sm mt-1">£{product.boxPrice.toFixed(2)}</div>
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
                  onClick={() => setQuantity(quantity + 1)}
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
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-teal-500 text-black font-bold py-4 rounded-lg hover:bg-teal-600 transition mb-6">
            Add to Cart
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
              href={`/api/coa?lot=${product.lot}`}
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
              <li>• Purity: {product.purity}</li>
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

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* This would be populated with related products */}
        </div>
      </div>
    </div>
  );
}
