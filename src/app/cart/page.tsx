'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/products';

export default function CartPage() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const sampleItems = [
    { ...products[0], qty: 1, type: 'vial' as const },
    { ...products[3], qty: 1, type: 'box' as const },
  ];

  const subtotal = sampleItems.reduce((acc, item) => {
    return acc + (item.type === 'box' ? item.boxPrice : item.price) * item.qty;
  }, 0);
  const shipping = subtotal > 150 ? 0 : 7.99;
  const total = subtotal + shipping;

  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {sampleItems.length === 0 ? (
              <div className="bg-[#141414] rounded-xl p-12 border border-[#222] text-center">
                <p className="text-[#888] mb-4">Your cart is empty.</p>
                <Link href="/shop" className="px-6 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              sampleItems.map((item, idx) => (
                <div key={idx} className="bg-[#141414] rounded-xl p-5 border border-[#222] flex gap-4">
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/shop/${item.slug}`} className="font-semibold hover:text-[#00d4aa] transition">{item.name}</Link>
                        <p className="text-[#888] text-xs mt-0.5">
                          {item.type === 'box' ? `Box of 10 vials · Lot ${item.lot}` : `1 vial · Lot ${item.lot}`}
                        </p>
                      </div>
                      <p className="font-bold">
                        £{(item.type === 'box' ? item.boxPrice : item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded-lg flex items-center justify-center text-sm hover:border-[#00d4aa] transition">−</button>
                        <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                        <button className="w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded-lg flex items-center justify-center text-sm hover:border-[#00d4aa] transition">+</button>
                      </div>
                      <button className="text-[#888] text-xs hover:text-red-400 transition">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#141414] rounded-xl p-6 border border-[#222] sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#888]">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888]">Shipping (Trusted Labs)</span>
                  <span>{shipping === 0 ? <span className="text-[#00d4aa]">FREE</span> : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-[#222] pt-3 flex justify-between font-bold text-base">
                  <span>Total (GBP)</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="font-semibold text-sm mb-3">Payment Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'alipay', label: 'Alipay', icon: '💳' },
                    { id: 'bank', label: 'Bank Transfer (BACS/CHAPS)', icon: '🏦' },
                    { id: 'crypto', label: 'Cryptocurrency (BTC/ETH/USDT)', icon: '₿' },
                  ].map((method) => (
                    <label key={method.id} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#222] cursor-pointer hover:border-[#00d4aa]/30 transition">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#00d4aa]"
                      />
                      <span className="text-lg">{method.icon}</span>
                      <span className="text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-4 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition text-lg">
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#888]">
                <span className="text-[#00d4aa]">🔒</span>
                <span>Secure checkout · Shipped via Trusted Labs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
