'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === 'object') {
          setUser(parsed);
        }
      }
    };
    loadUser();
  }, []);

  return (
    <>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] border-b border-[#00d4aa]/20 py-3 px-4 text-center">
        <p className="text-[#00d4aa] text-xs tracking-wide leading-relaxed">
          ✨ Premium peptides from internationally recognised manufacturers, independently verified for purity. UK stock for rapid dispatch · Bulk orders fulfilled via our global partner network · Full tracking on every shipment · <span className="font-semibold">Undelivered? We reship free.</span> · <span className="font-semibold">Test shows a fault? Submit your results and receive free replacements.</span>
        </p>
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
            <Link href="/coa" className="text-[#ccc] hover:text-[#00d4aa] transition">COAs</Link>
            <Link href="/contact" className="text-[#ccc] hover:text-[#00d4aa] transition">Contact</Link>
            <Link href="/cart" className="relative text-[#ccc] hover:text-[#00d4aa] transition">
              Cart
              <span className="absolute -top-1 -right-3 bg-[#00d4aa] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-[#ccc] hover:text-[#00d4aa] transition"
                >
                  <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-[#222] rounded-lg shadow-lg">
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#00d4aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link href="/orders" className="block px-4 py-3 text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#00d4aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Orders
                    </Link>
                    <Link href="/subscriptions" className="block px-4 py-3 text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#00d4aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Subscription
                    </Link>
                    <Link href="/admin" className="block px-4 py-3 text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#00d4aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Admin Panel
                    </Link>
                    <div className="border-t border-[#222]">
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          setUser(null);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#00d4aa] transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition text-sm">
                Sign In
              </Link>
            )}
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
            <Link href="/coa" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>COAs</Link>
            <Link href="/contact" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/cart" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Cart</Link>
            <div className="border-t border-[#222] pt-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-[#00d4aa] hover:text-[#00b894]" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link href="/orders" className="block text-[#ccc] hover:text-[#00d4aa]" onClick={() => setMobileOpen(false)}>Orders</Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      setUser(null);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left text-[#ccc] hover:text-[#00d4aa]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="block text-[#00d4aa] hover:text-[#00b894] font-semibold" onClick={() => setMobileOpen(false)}>Sign In / Register</Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
