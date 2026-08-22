'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top banner */}
      <div className="bg-[#111] border-b border-[#222] py-2 px-4 text-xs text-center text-[#888] tracking-wide">
        Research Use Only · Not For Human Or Animal Consumption · 21+ Only
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="gradient-text">GHK</span>
            <span className="text-[#888] text-sm ml-1 font-normal">pep.com</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/shop" className="text-[#ccc] hover:text-[#00d4aa] transition">Shop</Link>
            <Link href="/testing" className="text-[#ccc] hover:text-[#00d4aa] transition">Testing</Link>
            <Link href="/quality" className="text-[#ccc] hover:text-[#00d4aa] transition">Quality</Link>
            <Link href="/coa" className="text-[#ccc] hover:text-[#00d4aa] transition">COAs</Link>
            <Link href="/about" className="text-[#ccc] hover:text-[#00d4aa] transition">About</Link>
            <Link href="/contact" className="text-[#ccc] hover:text-[#00d4aa] transition">Contact</Link>
            <Link href="/cart" className="relative text-[#ccc] hover:text-[#00d4aa] transition">
              Cart
              <span className="absolute -top-1 -right-3 bg-[#00d4aa] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#ccc]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#222] bg-[#0a0a0a] px-4 py-4 space-y-3 text-sm">
            <Link href="/shop" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/testing" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Testing</Link>
            <Link href="/quality" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Quality</Link>
            <Link href="/coa" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>COAs</Link>
            <Link href="/about" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/cart" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Cart</Link>
          </div>
        )}
      </header>
    </>
  );
}
