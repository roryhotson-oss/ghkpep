'use client';

import { useState } from 'react';
import { Product } from '@/data/products';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [selectedType, setSelectedType] = useState<'vial' | 'box'>('vial');
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const cartItem = {
      slug: product.slug,
      name: product.name,
      price: product.price,
      boxPrice: product.boxPrice,
      image: product.image,
      lot: product.lot,
      qty: 1,
      type: selectedType
    };

    // Load existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingIndex = existingCart.findIndex(
      (item: { slug: string; type: string }) => item.slug === product.slug && item.type === selectedType
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].qty += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* Pricing */}
      <div className="mt-8 bg-[#141414] rounded-xl border border-[#222] p-6">
        <h3 className="font-semibold mb-4">Select Quantity</h3>
        <div className="space-y-3">
          <label 
            className={`flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border cursor-pointer transition ${
              selectedType === 'vial' ? 'border-[#00d4aa]' : 'border-[#222] hover:border-[#00d4aa]/30'
            }`}
            onClick={() => setSelectedType('vial')}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="quantity" 
                checked={selectedType === 'vial'}
                onChange={() => setSelectedType('vial')}
                className="accent-[#00d4aa]" 
              />
              <div>
                <p className="font-medium text-sm">1 Vial</p>
                <p className="text-[#888] text-xs">{product.name}</p>
              </div>
            </div>
            <span className="font-bold text-lg">£{product.price.toFixed(2)}</span>
          </label>
          <label 
            className={`flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border cursor-pointer transition ${
              selectedType === 'box' ? 'border-[#00d4aa]' : 'border-[#222] hover:border-[#00d4aa]/30'
            }`}
            onClick={() => setSelectedType('box')}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="quantity" 
                checked={selectedType === 'box'}
                onChange={() => setSelectedType('box')}
                className="accent-[#00d4aa]" 
              />
              <div>
                <p className="font-medium text-sm">Box of 10 Vials</p>
                <p className="text-[#888] text-xs">10 × {product.name} · Save 10%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-lg">£{product.boxPrice.toFixed(2)}</span>
              <p className="text-[#00d4aa] text-xs">£{(product.price * 10 - product.boxPrice).toFixed(2)} saved</p>
            </div>
          </label>
        </div>

        {/* Add to Cart */}
        <button 
          onClick={addToCart}
          className={`w-full mt-6 px-8 py-4 font-bold rounded-lg transition text-lg ${
            added 
              ? 'bg-green-600 text-white' 
              : 'bg-[#00d4aa] text-black hover:bg-[#00b894]'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>

        {/* Payment methods */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#888]">
          <span>Pay with:</span>
          <span className="px-2 py-1 bg-[#222] rounded">Alipay</span>
          <span className="px-2 py-1 bg-[#222] rounded">Bank Transfer</span>
          <span className="px-2 py-1 bg-[#222] rounded">Crypto</span>
        </div>
      </div>
    </>
  );
}
