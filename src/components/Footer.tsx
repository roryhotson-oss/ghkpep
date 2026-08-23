'use client';

import Link from 'next/link';
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {status === 'success' ? (
        <div className="bg-[#0a2a22] border border-[#00d4aa]/30 rounded-lg p-4 text-center">
          <p className="text-[#00d4aa] font-semibold">✓ Subscribed!</p>
          <p className="text-[#888] text-sm mt-1">Check your email for confirmation.</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-[#141414] border border-[#222] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00d4aa]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg text-sm hover:bg-[#00b894] transition disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-red-400 text-xs mt-2">Failed to subscribe. Please try again.</p>
          )}
        </>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#222] mt-20">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            All the research compounds you need, with the peace of mind and research community at your fingertips.
          </h2>
          <Link
            href="/shop"
            className="inline-block mt-6 px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1a1a1a]">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2">Research updates from GHK</h3>
          <p className="text-[#888] text-sm">Subscribe for catalog updates, new research compounds, and quality documentation news.</p>
        </div>
        <NewsletterForm />
        <p className="text-center text-[#666] text-xs mt-3">For researchers and labs. No spam, unsubscribe anytime.</p>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1a1a1a]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-[#00d4aa] mb-4">GHK</h4>
            <p className="text-[#888] text-xs leading-relaxed">
              Reference-grade research peptides with independent Glyvantix testing. UK-based supplier for laboratory research.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/shop" className="hover:text-[#00d4aa] transition">All Products</Link></li>
              <li><Link href="/shop?cat=recovery" className="hover:text-[#00d4aa] transition">Recovery</Link></li>
              <li><Link href="/shop?cat=longevity" className="hover:text-[#00d4aa] transition">Longevity</Link></li>
              <li><Link href="/shop?cat=metabolic" className="hover:text-[#00d4aa] transition">Metabolic</Link></li>
              <li><Link href="/shop?cat=cognitive" className="hover:text-[#00d4aa] transition">Cognitive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/testing" className="hover:text-[#00d4aa] transition">Testing Standards</Link></li>
              <li><Link href="/quality" className="hover:text-[#00d4aa] transition">Quality Assurance</Link></li>
              <li><Link href="/coa" className="hover:text-[#00d4aa] transition">Certificates of Analysis</Link></li>
              <li><Link href="/verify" className="hover:text-[#00d4aa] transition">Verify a Batch</Link></li>
              <li><Link href="/shipping" className="hover:text-[#00d4aa] transition">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-[#00d4aa] transition">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/about" className="hover:text-[#00d4aa] transition">About GHK</Link></li>
              <li><Link href="/contact" className="hover:text-[#00d4aa] transition">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-[#00d4aa] transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00d4aa] transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment methods & bottom bar */}
      <div className="border-t border-[#1a1a1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#666] text-xs">
              © 2026 GHK. All rights reserved. Research compounds for in-vitro laboratory use only.
            </p>
            <div className="flex items-center gap-4 text-[#666] text-xs">
              <span>Payment:</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Alipay</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Bank Transfer</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Crypto (BTC/ETH/USDT)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#666] text-xs">
              <span>Shipped via</span>
              <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-bold text-[#00d4aa]">Trusted Labs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center border-t border-[#222] pt-4">
        <Link
          href="/admin/login"
          className="text-[#00d4aa] text-xs hover:underline"
        >
          Admin Dashboard  Login
        </Link>
      </div>
    </footer>
  );
}
