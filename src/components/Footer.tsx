'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#2b3538] mt-20">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            All the research compounds you need, with the peace of mind and research community at your fingertips.
          </h2>
          <Link
            href="/shop"
            className="inline-block mt-6 px-8 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1a1a1a]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-[#21c7a5] mb-4">GHKpep</h4>
            <p className="text-[#a7b0b2] text-xs leading-relaxed">
              Reference-grade research peptides with independent Glyvantix testing. UK-based supplier for laboratory research.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-[#a7b0b2]">
              <li><Link href="/shop" className="hover:text-[#21c7a5] transition">All Products</Link></li>
              <li><Link href="/shop?cat=recovery" className="hover:text-[#21c7a5] transition">Recovery</Link></li>
              <li><Link href="/shop?cat=longevity" className="hover:text-[#21c7a5] transition">Longevity</Link></li>
              <li><Link href="/shop?cat=metabolic" className="hover:text-[#21c7a5] transition">Metabolic</Link></li>
              <li><Link href="/shop?cat=cognitive" className="hover:text-[#21c7a5] transition">Cognitive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-[#a7b0b2]">
              <li><Link href="/testing" className="hover:text-[#21c7a5] transition">Testing Standards</Link></li>
              <li><Link href="/quality" className="hover:text-[#21c7a5] transition">Quality Assurance</Link></li>
              <li><Link href="/coa" className="hover:text-[#21c7a5] transition">Certificates of Analysis</Link></li>
              <li><Link href="/verify" className="hover:text-[#21c7a5] transition">Verify a Batch</Link></li>
              <li><Link href="/shipping" className="hover:text-[#21c7a5] transition">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-[#21c7a5] transition">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-[#a7b0b2]">
              <li><Link href="/about" className="hover:text-[#21c7a5] transition">About GHK</Link></li>
              <li><Link href="/contact" className="hover:text-[#21c7a5] transition">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-[#21c7a5] transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#21c7a5] transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment methods & bottom bar */}
      <div className="border-t border-[#1a1a1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#7b898e] text-xs">
              © 2026 GHKpep. All rights reserved. Research compounds for in-vitro laboratory use only.
            </p>
            <div className="flex items-center gap-4 text-[#7b898e] text-xs">
              <span>Payment:</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Alipay</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Bank Transfer</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Crypto (BTC/ETH/USDT)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#7b898e] text-xs">
              <span>Shipped via</span>
              <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-bold text-[#21c7a5]">Trusted Labs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center border-t border-[#2b3538] pt-4">
        <Link
          href="/admin/login"
          className="text-[#21c7a5] text-xs hover:underline"
        >
            Admin Dashboard - Login
        </Link>
      </div>
    </footer>
  );
}
