'use client';
import Image from 'next/image';
import Script from 'next/script';

import Link from 'next/link';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => void };
  }
}

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

interface PaymentSettings {
  paypalUrl: string;
  alipayUrl: string;
  alipayQrUrl: string;
  cryptoUrl: string;
  bankTransferUrl: string;
  wiseUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({ paypalUrl: '', alipayUrl: '/contact', alipayQrUrl: '', cryptoUrl: '/contact', bankTransferUrl: '/contact', wiseUrl: '/contact' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  const [paypalAccount, setPaypalAccount] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [paymentProofName, setPaymentProofName] = useState('');
  const [billingAddress, setBillingAddress] = useState({ name: '', email: '', line1: '', city: '', postcode: '', country: '' });
  const [shippingAddress, setShippingAddress] = useState({ name: '', email: '', line1: '', city: '', postcode: '', country: '' });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const rawTurnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const turnstileSiteKey = rawTurnstileSiteKey.includes('your-cloudflare-turnstile-site-key')
    ? (process.env.NODE_ENV !== 'production' ? '1x00000000000000000000AA' : '')
    : rawTurnstileSiteKey;

  const renderTurnstile = () => {
    if (typeof window === 'undefined' || !showCheckoutModal || !turnstileSiteKey || !window.turnstile) return;
    const element = document.getElementById('turnstile-checkout');
    if (!element || element.childElementCount) return;
    window.turnstile.render(element, {
      sitekey: turnstileSiteKey,
      callback: setTurnstileToken,
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileError('Cloudflare security check could not load.'),
    });
  };

  useEffect(() => {
    // Load cart from localStorage on mount
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch {
          localStorage.removeItem('cart');
        }
      }
      setCartLoaded(true);
    };
    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, []);

  useEffect(() => {
    fetch('/api/payment-settings').then((response) => response.json()).then((data) => {
      if (data.settings) setPaymentSettings(data.settings);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    renderTurnstile();
    if (!showCheckoutModal || !turnstileSiteKey) return;
    const timer = window.setTimeout(renderTurnstile, 300);
    return () => window.clearTimeout(timer);
  }, [showCheckoutModal, turnstileSiteKey]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!cartLoaded) return;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, cartLoaded]);

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
    
    const paymentDetails = selectedPaymentMethod === 'paypal' && paypalAccount
      ? `\nPayPal account: ${paypalAccount}`
      : '';
    const shipping = sameAsBilling ? billingAddress : shippingAddress;
    const address = (value: typeof billingAddress) => `${value.name}\n${value.line1}\n${value.city}, ${value.postcode}\n${value.country}`;
    return `Hi GHK, I'd like to place an order:\n\n${items}\n\nSubtotal: £${subtotal.toFixed(2)}\nShipping: FREE\nTotal: £${total.toFixed(2)}\nPayment method: ${selectedPaymentMethod}${paymentDetails}\n\nBilling address:\n${address(billingAddress)}\n\nShipping address:\n${address(shipping)}${paymentProofUrl ? `\n\nPayment proof: ${window.location.origin}${paymentProofUrl}` : ''}\n\nPlease confirm my order and shipping details.`;
  };

  const handleCheckoutSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setCheckoutError('');
    setTurnstileError('');
    const shipping = sameAsBilling ? billingAddress : shippingAddress;
    const requiredFields = [billingAddress.name, billingAddress.email, billingAddress.line1, billingAddress.city, billingAddress.postcode, billingAddress.country, shipping.name, shipping.line1, shipping.city, shipping.postcode, shipping.country];
    if (requiredFields.some((value) => !value.trim())) {
      setCheckoutError('Please complete both billing and shipping addresses.');
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security check.');
      return;
    }
    if (turnstileToken) {
      const verification = await fetch('/api/turnstile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: turnstileToken }) });
      if (!verification.ok) {
        setTurnstileError('Cloudflare security check failed. Please try again.');
        setTurnstileToken('');
        return;
      }
    }

    const fileInput = form.elements.namedItem('payment-proof');
    const file = fileInput instanceof HTMLInputElement ? fileInput.files?.[0] : undefined;
    let uploadedProofUrl = paymentProofUrl;

    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const response = await fetch('/api/order-proof', { method: 'POST', body: uploadData });
      const data = await response.json();
      if (!response.ok) {
        setCheckoutError(data.error || 'Could not upload payment proof.');
        return;
      }
      uploadedProofUrl = data.url;
      setPaymentProofUrl(uploadedProofUrl);
      setPaymentProofName(file.name);
    }
    const orderResponse = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      items: cartItems.map((item) => ({ slug: item.slug, qty: item.qty, type: item.type })),
      billingAddress,
      shippingAddress: shipping,
      paymentMethod: selectedPaymentMethod,
      paymentReference: selectedPaymentMethod === 'paypal' ? paypalAccount : '',
      paymentProofUrl: uploadedProofUrl,
    }) });
    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      setPaymentProofName(orderData.orderNumber ? `order ${orderData.orderNumber}` : paymentProofName);
    }
    setCheckoutSubmitted(true);
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
  const hasBoxOrder = cartItems.some((item) => item.type === 'box');
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div>
      <section className="bg-[#10263d] border-b border-[#1d4667]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[#63c8f3] text-xs font-bold uppercase tracking-[0.22em] mb-3">Secure checkout</p>
          <h1 className="text-4xl font-black tracking-tight">Your Cart</h1>
          <p className="text-[#c8d8e4] mt-3 max-w-xl">Review your order and choose the payment method that works best for you.</p>
        </div>
      </section>

      <div className="bg-[#eef4f8] text-[#10263d] min-h-[calc(100vh-220px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-[#d7e3eb] text-center shadow-sm">
                <p className="text-[#607789] mb-4">Your cart is empty.</p>
                <Link href="/shop" className="inline-flex px-6 py-3 bg-[#8298aa] text-white font-semibold rounded-lg hover:bg-[#657c8f] transition">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#d7e3eb] flex gap-4 shadow-sm">
                  <div className="w-20 h-20 bg-[#eaf2f7] rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/shop/${item.slug}`} className="font-semibold hover:text-[#8298aa] transition">{item.name}</Link>
                        <p className="text-[#607789] text-xs mt-0.5">
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
                          className="w-8 h-8 bg-[#f3f7fa] border border-[#d7e3eb] rounded-lg flex items-center justify-center text-sm hover:border-[#8298aa] transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-8 h-8 bg-[#f3f7fa] border border-[#d7e3eb] rounded-lg flex items-center justify-center text-sm hover:border-[#8298aa] transition"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(idx)}
                        className="text-[#607789] text-xs hover:text-red-500 transition"
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
            <div className="bg-white rounded-2xl p-6 border border-[#d7e3eb] sticky top-24 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#607789]">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607789]">Shipping</span>
                  <span className="text-[#8298aa]">FREE</span>
                </div>
                <div className="border-t border-[#d7e3eb] pt-3 flex justify-between font-bold text-base">
                  <span>Total (GBP)</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-[#d7e3eb]">
                <div className="space-y-2">
                  <label className={`block p-3 rounded-lg border cursor-pointer transition ${selectedPaymentMethod === 'paypal' ? 'border-[#8298aa] bg-[#e8f6fd]' : 'border-[#d7e3eb] bg-[#f3f7fa]'}`}>
                    <span className="flex items-center gap-3">
                      <input type="radio" name="payment-method" value="paypal" checked={selectedPaymentMethod === 'paypal'} onChange={() => setSelectedPaymentMethod('paypal')} className="accent-[#8298aa]" />
                      <span className="text-lg font-black text-[#003087]">P</span>
                      <span className="text-sm font-semibold text-[#38566d]">PayPal</span>
                      {paymentSettings.paypalUrl && <a href={paymentSettings.paypalUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="ml-auto text-xs text-[#118cca] hover:underline">Open PayPal</a>}
                    </span>
                    {selectedPaymentMethod === 'paypal' && <span className="block mt-3 pl-8">
                      <span className="block text-xs leading-relaxed text-[#607789] mb-3">Use your order number as the payment reference. Do not include product names or research details in the memo.</span>
                      <span className="block text-xs font-semibold text-[#38566d] mb-1">Your PayPal account</span>
                      <input type="text" value={paypalAccount} onChange={(event) => setPaypalAccount(event.target.value)} placeholder="PayPal email or account name" className="w-full bg-white border border-[#cbdce6] rounded-lg px-3 py-2 text-sm text-[#10263d] placeholder:text-[#8ba0ad] focus:outline-none focus:border-[#8298aa]" />
                    </span>}
                  </label>
                  <div className={`p-3 rounded-lg border transition ${selectedPaymentMethod === 'alipay' ? 'border-[#8298aa] bg-[#e8f6fd]' : 'border-[#d7e3eb] bg-[#f3f7fa]'}`}>
                    <button type="button" onClick={() => setSelectedPaymentMethod('alipay')} className="w-full flex items-center gap-3 text-left">
                      <input type="radio" name="payment-method" value="alipay" checked={selectedPaymentMethod === 'alipay'} onChange={() => setSelectedPaymentMethod('alipay')} className="accent-[#8298aa]" />
                      <span className="text-lg">💳</span><span className="text-sm font-semibold text-[#38566d]">Alipay</span>
                    </button>
                    {selectedPaymentMethod === 'alipay' && <div className="mt-3 pl-8">
                      <p className="text-xs leading-relaxed text-[#607789]">You can pay with any bank or credit card using the Alipay app. Install Alipay, scan the QR code, and complete your payment securely.</p>
                      {paymentSettings.alipayQrUrl ? <Image src={paymentSettings.alipayQrUrl} alt="Alipay payment QR code" width={176} height={176} className="mt-4 w-44 h-44 object-contain rounded-lg border border-[#d7e3eb] bg-white p-2" /> : <p className="mt-3 text-xs text-[#b06a00]">Alipay QR code will appear here once it is added in Payment Settings.</p>}
                      <a href={paymentSettings.alipayUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs text-[#118cca] hover:underline">Open Alipay payment instructions</a>
                    </div>}
                  </div>
                  <button type="button" onClick={() => setSelectedPaymentMethod('bank transfer')} className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition ${selectedPaymentMethod === 'bank transfer' ? 'border-[#8298aa] bg-[#e8f6fd]' : 'border-[#d7e3eb] bg-[#f3f7fa] hover:border-[#8298aa]'}`}>
                    <span className="text-lg">🏦</span><span className="text-sm font-semibold text-[#38566d]">Bank transfer</span>
                  </button>
                  <button type="button" onClick={() => setSelectedPaymentMethod('crypto')} className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition ${selectedPaymentMethod === 'crypto' ? 'border-[#8298aa] bg-[#e8f6fd]' : 'border-[#d7e3eb] bg-[#f3f7fa] hover:border-[#8298aa]'}`}>
                    <span className="text-lg">₿</span><span className="text-sm font-semibold text-[#38566d]">Crypto</span>
                  </button>
                </div>
                <p className="text-xs text-[#607789] mt-2">Payment details are provided after checkout.</p>
              </div>

              <button 
                onClick={() => setShowCheckoutModal(true)}
                className="w-full mt-6 px-6 py-4 bg-[#8298aa] text-white font-bold rounded-lg hover:bg-[#657c8f] transition text-lg"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#607789]">
                <span className="text-[#8298aa]">🔒</span>
                <span>{hasBoxOrder ? 'Free global delivery · 5–10 days · discreet tracking' : 'Free discreet tracked delivery'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-[#071624]/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-[#10263d] rounded-2xl border border-[#d7e3eb] max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Complete Your Order</h2>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-[#607789] hover:text-[#10263d] text-2xl"
              >
                ×
              </button>
            </div>

            {!checkoutSubmitted ? <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <p className="text-[#607789] text-sm">Add your billing and shipping details, then upload your payment screenshot before choosing how to discuss the order with us.</p>
              <fieldset className="border border-[#d7e3eb] rounded-xl p-4">
                <legend className="px-2 text-sm font-bold">Billing address</legend>
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {(['name', 'email', 'line1', 'city', 'postcode', 'country'] as const).map((field) => <input key={field} required type={field === 'email' ? 'email' : 'text'} value={billingAddress[field]} onChange={(event) => setBillingAddress({ ...billingAddress, [field]: event.target.value })} placeholder={field === 'line1' ? 'Street address' : field === 'postcode' ? 'Postcode / ZIP' : field === 'name' ? 'Full name' : field[0].toUpperCase() + field.slice(1)} className="w-full bg-[#f3f7fa] border border-[#d7e3eb] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-[#8298aa]" />)}
                </div>
              </fieldset>
              <label className="flex items-center gap-2 text-sm text-[#38566d]"><input type="checkbox" checked={sameAsBilling} onChange={(event) => setSameAsBilling(event.target.checked)} className="accent-[#8298aa]" /> Shipping address is the same as billing</label>
              {!sameAsBilling && <fieldset className="border border-[#d7e3eb] rounded-xl p-4">
                <legend className="px-2 text-sm font-bold">Shipping address</legend>
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {(['name', 'line1', 'city', 'postcode', 'country'] as const).map((field) => <input key={field} required value={shippingAddress[field]} onChange={(event) => setShippingAddress({ ...shippingAddress, [field]: event.target.value })} placeholder={field === 'line1' ? 'Street address' : field === 'postcode' ? 'Postcode / ZIP' : field === 'name' ? 'Full name' : field[0].toUpperCase() + field.slice(1)} className="w-full bg-[#f3f7fa] border border-[#d7e3eb] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-[#8298aa]" />)}
                </div>
              </fieldset>}
              <label className="block border border-dashed border-[#9db8c7] rounded-xl p-4 cursor-pointer hover:border-[#8298aa] transition"><span className="block text-sm font-bold">Upload payment screenshot</span><span className="block text-xs text-[#607789] mt-1">PNG, JPEG, or WebP up to 5MB. This is optional if you have not paid yet.</span><input name="payment-proof" type="file" accept="image/png,image/jpeg,image/webp" className="mt-3 block w-full text-sm text-[#607789]" /></label>
              {turnstileSiteKey && <><div id="turnstile-checkout" className="min-h-[65px]" /><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderTurnstile} /></>}
              {checkoutError && <p className="text-sm text-red-600" role="alert">{checkoutError}</p>}
              {turnstileError && <p className="text-sm text-red-600" role="alert">{turnstileError}</p>}
              <button type="submit" className="w-full px-6 py-4 bg-[#8298aa] text-white font-bold rounded-lg hover:bg-[#657c8f] transition">Continue to Contact Options</button>
            </form> : <>
            <p className="text-[#607789] text-sm mb-6">Your order details{paymentProofName ? ` and ${paymentProofName}` : ''} are ready. Discuss your order through WhatsApp, Telegram, phone, or email.</p>
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
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#10263d] text-white font-bold rounded-lg hover:bg-[#1d4667] transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Order via Email
              </button>
              <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || ''}`} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#edf5f9] text-[#10263d] font-bold rounded-lg hover:bg-[#dcecf4] transition border border-[#d7e3eb]">☎ Call to discuss your order</a>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2b3538]">
              <p className="text-xs text-[#607789] text-center mb-3">
                Your order details will be sent with the message. We&apos;ll respond within 24 hours with payment instructions.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-[#607789]">
                <span className="flex items-center gap-1">
                  <span className="text-[#8298aa]">💳</span> Alipay
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#8298aa]">₿</span> Crypto
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#8298aa]">🏦</span> Bank Transfer
                </span>
              </div>
            </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
