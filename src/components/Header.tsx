'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

interface CartItem {
  qty?: number;
}

const headerLinkClass = 'text-sm font-medium text-[#1F2933] transition hover:opacity-60';
const mobileHeaderLinkClass = 'block rounded-lg px-3 py-2 text-[#1F2933] font-medium transition hover:bg-[#ECE9E2]';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

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
    const supabase = getSupabaseBrowser();
    if (supabase) {
      supabase.auth.getUser().then((result: { data: { user: { email?: string | null; user_metadata?: { name?: string } } | null } }) => {
        const userEmail = result.data.user?.email;
        if (userEmail) {
          const userData = { email: userEmail, name: result.data.user?.user_metadata?.name || userEmail.split('@')[0] };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      });
    }
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum: number, item: CartItem) => sum + (item.qty || 1), 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  return (
    <>
      {/* Top banner */}
      <div className="py-2.5 px-4 text-center">
        <p className="text-[#6b7280] text-xs tracking-wide leading-relaxed">
          Research materials sourced from selected laboratories, with third-party testing information where available. Shipped from China · Typical arrival 5–9 days · All prices in GBP · Full tracking on every shipment.
        </p>
      </div>

      {/* Main nav — floating pill */}
      <header className="sticky top-3 z-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-full bg-[#FBFAF7]/95 backdrop-blur shadow-[0_8px_24px_rgba(20,28,40,0.12)] px-5 sm:px-8 h-16">
          <Link href="/" className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none text-[#111827]">
            GHK PEPTIDES
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className={headerLinkClass}>Full Catalog</Link>
            <Link href="/shop" className={headerLinkClass}>Shop</Link>
            <Link href="/contact" className={headerLinkClass}>Support</Link>
            <Link href="/cart" className={`${headerLinkClass} relative pr-4`}>
              Cart
              <span className="absolute -top-2 -right-1 bg-[#111827] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-[#1F2933] transition hover:opacity-60"
                >
                  <div className="w-7 h-7 bg-[#111827] rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#FBFAF7] rounded-2xl shadow-[0_8px_24px_rgba(20,28,40,0.16)] overflow-hidden">
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-[#1F2933] hover:bg-[#ECE9E2] transition" onClick={() => setUserMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link href="/orders" className="block px-4 py-3 text-sm text-[#1F2933] hover:bg-[#ECE9E2] transition" onClick={() => setUserMenuOpen(false)}>
                      Orders
                    </Link>
                    <Link href="/subscriptions" className="block px-4 py-3 text-sm text-[#1F2933] hover:bg-[#ECE9E2] transition" onClick={() => setUserMenuOpen(false)}>
                      Subscription
                    </Link>
                    <Link href="/admin" className="block px-4 py-3 text-sm text-[#1F2933] hover:bg-[#ECE9E2] transition" onClick={() => setUserMenuOpen(false)}>
                      Admin Panel
                    </Link>
                    <div className="border-t border-[#e5e1d8]">
                      <button
                        onClick={() => {
                          const supabase = getSupabaseBrowser();
                          if (supabase) void supabase.auth.signOut();
                          localStorage.removeItem('user');
                          setUser(null);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#1F2933] hover:bg-[#ECE9E2] transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={headerLinkClass}>
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#1F2933]"
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

        {mobileOpen && (
          <div className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#FBFAF7]/95 backdrop-blur shadow-[0_8px_24px_rgba(20,28,40,0.16)] px-4 py-4 space-y-1 text-sm">
            <Link href="/" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Full Catalog</Link>
            <Link href="/shop" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/contact" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Support</Link>
            <Link href="/cart" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Cart</Link>
            <div className="border-t border-[#e5e1d8] pt-2 mt-2">
              {user ? (
                <>
                  <Link href="/dashboard" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link href="/orders" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Orders</Link>
                  <button
                    onClick={() => {
                      const supabase = getSupabaseBrowser();
                      if (supabase) void supabase.auth.signOut();
                      localStorage.removeItem('user');
                      setUser(null);
                      setMobileOpen(false);
                    }}
                    className={`${mobileHeaderLinkClass} w-full text-left`}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className={`${mobileHeaderLinkClass} font-semibold`} onClick={() => setMobileOpen(false)}>Sign In / Register</Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
