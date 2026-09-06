'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const dosageOptions = product.dosageOptions && product.dosageOptions.length > 0 ? product.dosageOptions : [5, 10, 15];
  const [selectedType, setSelectedType] = useState<'vial' | 'box'>('vial');
  const [selectedDosage, setSelectedDosage] = useState<number>(dosageOptions.includes(10) ? 10 : dosageOptions[0]);
  const [added, setAdded] = useState(false);
  const dosageUnit = product.slug === 'refined-h2o' ? 'ml' : 'mg';

  const addToCart = () => {
    if (isOutOfStock(product)) return;
    const cartItem = {
      slug: product.slug,
      name: `${product.name} ${selectedDosage}${dosageUnit}`,
      price: effectivePrice(product, selectedType),
      boxPrice: effectivePrice(product, 'box', selectedDosage),
      image: product.image,
      lot: product.lot,
      qty: 1,
      type: selectedType,
      strength: selectedDosage,
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
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* Pricing */}
      <div className="mt-8 text-[#e6edf3] bg-[#0c1622] rounded-xl border border-[#FBFAF7]/70 p-6">
        <h3 className="font-semibold mb-4">Select Quantity</h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#dfe8ed] mb-2">
            Dosage
            <select
              value={selectedDosage}
              onChange={(event) => setSelectedDosage(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-[#FBFAF7] bg-[#111d2c] px-3 py-2 text-[#f0f5f8] outline-none focus:border-[#3E6B93]"
            >
              {dosageOptions.map((dosage) => (
                <option key={dosage} value={dosage}>{dosage}{dosageUnit}</option>
              ))}
            </select>
          </label>
          <label 
            className={`flex items-center justify-between p-4 bg-[#111d2c] rounded-lg border cursor-pointer transition ${
              selectedType === 'vial' ? 'border-[#3E6B93]' : 'border-[#FBFAF7]/70 hover:border-[#3E6B93]/40'
            }`}
            onClick={() => setSelectedType('vial')}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="quantity" 
                checked={selectedType === 'vial'}
                onChange={() => setSelectedType('vial')}
                className="accent-[#3E6B93]"
              />
              <div>
                <p className="font-medium text-sm">1 Vial</p>
                <p className="text-[#a7b0b2] text-xs">{product.name}</p>
              </div>
            </div>
            <span className="font-bold text-lg">£{effectivePrice(product, 'vial').toFixed(2)}</span>
          </label>
          <label 
            className={`flex items-center justify-between p-4 bg-[#111d2c] rounded-lg border cursor-pointer transition ${
              selectedType === 'box' ? 'border-[#3E6B93]' : 'border-[#FBFAF7]/70 hover:border-[#3E6B93]/40'
            }`}
            onClick={() => setSelectedType('box')}
          >
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="quantity" 
                checked={selectedType === 'box'}
                onChange={() => setSelectedType('box')}
                className="accent-[#3E6B93]"
              />
              <div>
                <p className="font-medium text-sm">Box of 10 Vials</p>
                <p className="text-[#a7b0b2] text-xs">10 × {product.name} · Save 10%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-lg">£{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</span>
              <p className="text-[#5B9BD5] text-xs">£{(product.price * 10 - effectivePrice(product, 'box', selectedDosage)).toFixed(2)} saved</p>
            </div>
          </label>
        </div>

        {/* Add to Cart */}
        <button 
          onClick={addToCart}
          className={`w-full mt-6 px-8 py-4 font-bold rounded-lg transition text-lg ${
            added 
              ? 'bg-green-600 text-white' 
              : 'bg-[#0c1622] text-white hover:bg-[#16283c] shadow-lg shadow-[#3E6B93]/20'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>

        {/* Payment methods */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#a7b0b2]">
          <span>Pay with:</span>
          <span className="px-2 py-1 bg-[#111d2c] rounded">Alipay</span>
          <span className="px-2 py-1 bg-[#111d2c] rounded">Bank Transfer</span>
          <span className="px-2 py-1 bg-[#111d2c] rounded">Crypto</span>
        </div>
      </div>
    </>
  );
}
