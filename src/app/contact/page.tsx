'use client';


import { useState } from 'react';
import Script from 'next/script';
import { products } from '@/data/products';

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => void };
  }
}





export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    product: '',
    quantity: '1',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const rawSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const siteKey = rawSiteKey.includes('your-cloudflare-turnstile-site-key')
    ? (process.env.NODE_ENV !== 'production' ? '1x00000000000000000000AA' : '')
    : rawSiteKey;
  const renderTurnstile = () => {
    if (!siteKey || !window.turnstile) return;
    const element = document.getElementById('turnstile-contact');
    if (!element || element.childElementCount) return;
    window.turnstile.render(element, {
      sitekey: siteKey,
      callback: setTurnstileToken,
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileError('Cloudflare security check could not load.'),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTurnstileError('');

    try {
      if (siteKey && !turnstileToken) {
        setTurnstileError('Please complete the Cloudflare security check.');
        setStatus('idle');
        return;
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (response.ok) {
        setStatus('success');
        setTurnstileToken('');
        setFormData({ name: '', email: '', institution: '', product: '', quantity: '1', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#5b8ca0] text-sm">Typically respond within 24 hours</p>
          <h1 className="text-3xl font-bold mt-2">How can we help?</h1>
          <p className="text-[#53636b] mt-3 max-w-2xl">Our research support team is here to assist with orders, product questions, and lab-to-lab inquiries.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 items-start gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
              <h3 className="font-bold mb-4">Get in touch</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[#a7b0b2] block">General Inquiries</span>
                  <a href="mailto:support@ghkpep.com" className="text-[#8298aa] hover:underline">support@ghkpep.com</a>
                </div>
                <div>
                  <span className="text-[#a7b0b2] block">Orders & Shipping</span>
                  <a href="mailto:orders@ghkpep.com" className="text-[#8298aa] hover:underline">orders@ghkpep.com</a>
                </div>
                <div>
                  <span className="text-[#a7b0b2] block">Full pricing</span>
                  <span className="text-[#e1e7e5]">Email <a href="mailto:sales@ghkpep.com" className="text-[#8298aa] hover:underline">sales@ghkpep.com</a> for full pricing.</span>
                </div>
                <div>
                  <span className="text-[#a7b0b2] block">Privacy & Data</span>
                  <a href="mailto:privacy@ghkpep.com" className="text-[#8298aa] hover:underline">privacy@ghkpep.com</a>
                </div>
                <div>
                  <span className="text-[#a7b0b2] block">Response Time</span>
                  <span className="text-[#e1e7e5]">Within 24 hours</span>
                </div>
                <div>
                  <span className="text-[#a7b0b2] block">Location</span>
                  <span className="text-[#e1e7e5]">United Kingdom</span>
                </div>
              </div>
            </div>

            <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
              <h3 className="font-bold mb-3">Payment Methods</h3>
              <div className="space-y-2 text-sm text-[#a7b0b2]">
                <p>✓ Alipay</p>
                <p>✓ Bank Transfer (BACS/CHAPS)</p>
                <p>✓ Cryptocurrency (BTC, ETH, USDT)</p>
              </div>
            </div>

            <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
              <h3 className="font-bold mb-3">Shipping</h3>
              <p className="text-sm text-[#a7b0b2]">All orders shipped via <span className="text-[#8298aa] font-medium">Trusted Labs</span> — tracked, discreet, and insured.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 min-w-0">
            {status === 'success' ? (
              <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-8 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)] text-center">
                <div className="text-[#8298aa] text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                <p className="text-[#a7b0b2] mb-6">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 sm:p-8 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)] space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#53636b] mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#53636b] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#53636b] mb-1">Institution / Lab</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                    placeholder="Your institution (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#53636b] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#53636b] mb-1">Product</label>
                    <select
                      required
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                    >
                      <option value="" disabled>Select a product</option>
                      {products.map((product) => (
                        <option key={product.slug} value={product.name}>{product.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#53636b] mb-1">Quantity</label>
                    <select
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0]"
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
                        <option key={quantity} value={quantity}>{quantity}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#53636b] mb-1">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#c8dfe7] rounded-lg px-4 py-2.5 text-sm text-[#34414a] focus:outline-none focus:border-[#5b8ca0] resize-none"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                {status === 'error' && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
                    Failed to send message. Please try again or contact us via WhatsApp or Telegram from the checkout page.
                  </div>
                )}
                {siteKey && <><div id="turnstile-contact" className="min-h-[65px]" /><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderTurnstile} /></>}
                {turnstileError && <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">{turnstileError}</div>}
                <button
                  type="submit"
                  disabled={status === 'loading' || Boolean(siteKey && !turnstileToken)}
                  className="w-full px-8 py-3 bg-[#5b8ca0] border border-[#5b8ca0] text-white font-semibold rounded-xl hover:bg-[#466f7f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
