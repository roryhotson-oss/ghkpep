'use client';
import Image from 'next/image';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  boxPrice: number;
  image: string;
  lot: string;
  qty: number;
  type: 'vial' | 'box';
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    // Load cart from localStorage on mount
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (index: number, change: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(1, updated[index].qty + change);
      return updated;
    });
  };

  const removeItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const generateOrderMessage = () => {
    const items = cartItems.map(item => 
      `${item.name} (${item.type === 'box' ? 'Box of 10' : '1 vial'}) x${item.qty} - £${(item.type === 'box' ? item.boxPrice : item.price).toFixed(2)}`
    ).join('\n');
    
    return `Hi GHK, I&apos;d like to place an order:\n\n${items}\n\nSubtotal: £${subtotal.toFixed(2)}\nShipping: ${shipping === 0 ? 'FREE' : '£' + shipping.toFixed(2)}\nTotal: £${total.toFixed(2)}\n\nPlease provide payment instructions and shipping details.`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(generateOrderMessage());
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
  };

  const handleTelegram = () => {
    const message = encodeURIComponent(generateOrderMessage());
    const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || '';
    if (telegramUsername) {
      window.open(`https://t.me/${telegramUsername}?text=${message}`, '_blank');
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('New Order from GHKpep.com');
    const body = encodeURIComponent(generateOrderMessage());
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
    if (contactEmail) {
      window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`, '_blank');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
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
            {cartItems.length === 0 ? (
              <div className="bg-[#141414] rounded-xl p-12 border border-[#222] text-center">
                <p className="text-[#888] mb-4">Your cart is empty.</p>
                <Link href="/shop" className="px-6 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="bg-[#141414] rounded-xl p-5 border border-[#222] flex gap-4">
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
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
                        <button 
                          onClick={() => updateQuantity(idx, -1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded-lg flex items-center justify-center text-sm hover:border-[#00d4aa] transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded-lg flex items-center justify-center text-sm hover:border-[#00d4aa] transition"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(idx)}
                        className="text-[#888] text-xs hover:text-red-400 transition"
                      >
                        Remove
                      </button>
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

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-[#222]">
                <h3 className="font-semibold text-sm mb-3">Payment Options</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <span className="text-2xl mb-1">💳</span>
                    <span className="text-xs text-[#888]">Alipay</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <span className="text-2xl mb-1">₿</span>
                    <span className="text-xs text-[#888]">Crypto</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <span className="text-2xl mb-1">🏦</span>
                    <span className="text-xs text-[#888]">Bank Transfer</span>
                  </div>
                </div>
                <p className="text-xs text-[#888] mt-2">Payment details provided after checkout</p>
              </div>

              <button 
                onClick={() => setShowCheckoutModal(true)}
                className="w-full mt-6 px-6 py-4 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition text-lg"
              >
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

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] rounded-xl border border-[#222] max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Complete Your Order</h2>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-[#888] hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-[#888] text-sm mb-6">
              Contact us via WhatsApp, Telegram, or Email to discuss your order, payment options, and shipping details.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20bd5a] transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </button>

              <button
                onClick={handleTelegram}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#0088cc] text-white font-bold rounded-lg hover:bg-[#0077b5] transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Order via Telegram
              </button>

              <button
                onClick={handleEmail}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#141414] text-white font-bold rounded-lg hover:bg-[#1a1a1a] transition border border-[#222] hover:border-[#00d4aa]/30"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Order via Email
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#222]">
              <p className="text-xs text-[#888] text-center mb-3">
                Your order details will be sent with the message. We&apos;ll respond within 24 hours with payment instructions.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-[#888]">
                <span className="flex items-center gap-1">
                  <span className="text-[#00d4aa]">💳</span> Alipay
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#00d4aa]">₿</span> Crypto
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#00d4aa]">🏦</span> Bank Transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
