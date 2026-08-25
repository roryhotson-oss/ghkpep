'use client';

import { useState } from 'react';
import Script from 'next/script';
import { products } from '@/data/products';

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => void };
  }
}

export default function MaintenanceContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', product: '', quantity: '1', message: '', website: '' });
  const rawSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const siteKey = rawSiteKey.includes('your-cloudflare-turnstile-site-key')
    ? (process.env.NODE_ENV !== 'production' ? '1x00000000000000000000AA' : '')
    : rawSiteKey;

  const renderTurnstile = () => {
    if (typeof window === 'undefined' || !siteKey || !window.turnstile) return;
    const element = document.getElementById('turnstile-maintenance');
    if (!element || element.childElementCount) return;
    window.turnstile.render(element, {
      sitekey: siteKey,
      callback: setTurnstileToken,
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileError('Cloudflare security check could not load.'),
    });
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setTurnstileError('');

    try {
      if (siteKey && !turnstileToken) {
        setTurnstileError('Please complete the security check.');
        setStatus('idle');
        return;
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'maintenance',
          website: formData.website,
          turnstileToken,
          subject: 'Order or product enquiry',
          message: `Phone number: ${formData.phone}\nProduct: ${formData.product}\nQuantity: ${formData.quantity}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error('Message could not be sent');
      setFormData({ name: '', email: '', phone: '', product: '', quantity: '1', message: '', website: '' });
      setTurnstileToken('');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <p className="mt-4 border border-[#b9d2c0] bg-[#f2faf4] px-4 py-3 text-sm text-[#285c39]">
        Thanks. Your message has been sent, and a human will call you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4 border-t border-[#d8e3ec] pt-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#425b6d]">
          Name
          <input required value={formData.name} onChange={(event) => updateField('name', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" />
        </label>
        <label className="text-sm font-semibold text-[#425b6d]">
          Email
          <input required type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" />
        </label>
      </div>
      <label className="block text-sm font-semibold text-[#425b6d]">
        Your phone number for callback (UK +44)
        <input required type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" placeholder="+44 7xxx xxxxxx" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#425b6d]">
          Product
          <select required value={formData.product} onChange={(event) => updateField('product', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] bg-white px-3 py-2 font-normal text-[#10263d]">
            <option value="" disabled>Select a product</option>
            {products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-[#425b6d]">
          Quantity
          <select required value={formData.quantity} onChange={(event) => updateField('quantity', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] bg-white px-3 py-2 font-normal text-[#10263d]">
            {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-[#425b6d]">
        Your question or order request
        <textarea required minLength={10} rows={4} value={formData.message} onChange={(event) => updateField('message', event.target.value)} className="mt-1 w-full resize-y border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" placeholder="Tell us which product you are interested in and how many vials you need." />
      </label>
      {siteKey ? <><div id="turnstile-maintenance" className="min-h-[65px]" /><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderTurnstile} /></> : <p className="text-sm text-[#9b2c2c]">Cloudflare security is not configured.</p>}
      {turnstileError && <p className="text-sm text-[#9b2c2c]">{turnstileError}</p>}
      {status === 'error' && <p className="text-sm text-[#9b2c2c]">We could not send your message. Please try again or email support@ghkpep.com.</p>}
      <input type="text" name="website" value={formData.website} onChange={(event) => updateField('website', event.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={status === 'sending' || !siteKey || !turnstileToken} className="bg-[#2e617e] px-5 py-2.5 font-bold text-white disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Send enquiry'}
      </button>
    </form>
  );
}
