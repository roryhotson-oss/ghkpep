'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

interface CartItem {
  qty?: number;
}

const headerLinkClass = 'inline-flex items-center rounded-md border border-[#3b4b57] bg-[#17212a] px-3 py-1.5 text-[#c2ced5] shadow-sm transition hover:bg-[#263744] hover:border-[#a6b8c4]';
const mobileHeaderLinkClass = 'block rounded-md border border-[#3b4b57] bg-[#17212a] px-3 py-2 text-[#c2ced5] shadow-sm transition hover:bg-[#263744] hover:border-[#a6b8c4]';

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
      <div className="bg-gradient-to-r from-[#1b2527] to-[#20292d] border-b border-[#39484a] py-3 px-4 text-center">
        <p className="text-[#b8c5c5] text-xs tracking-wide leading-relaxed">
          ✨ Premium peptides from internationally recognised manufacturers, independently verified for purity. UK stock for rapid dispatch · Bulk orders fulfilled via our global partner network · Full tracking on every shipment · <span className="font-semibold">Undelivered? We reship free.</span> · <span className="font-semibold">Test shows a fault? Submit your results and receive free replacements.</span>
        </p>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
          <Link href="/" className="text-3xl sm:text-4xl font-bold tracking-normal leading-none">
            <span className="gradient-text drop-shadow-[0_0_10px_rgba(142,174,192,0.28)]">GHKpep</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/shop" className={headerLinkClass}>Shop</Link>
            <Link href="/testing" className={headerLinkClass}>Testing</Link>
            <Link href="/coa" className={headerLinkClass}>Test Reports</Link>
            <Link href="/contact" className={headerLinkClass}>Support</Link>
            <Link href="/cart" className={`${headerLinkClass} relative`}>
              Cart
              <span className="absolute -top-1 -right-3 bg-[#8298aa] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-md border border-[#3b4b57] bg-[#17212a] px-2 py-1 text-[#c2ced5] shadow-sm transition hover:bg-[#263744] hover:border-[#a6b8c4]"
                >
                  <div className="w-8 h-8 bg-[#8298aa] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-[#2b3538] rounded-lg shadow-lg">
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#8298aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link href="/orders" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#8298aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Orders
                    </Link>
                    <Link href="/subscriptions" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#8298aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Subscription
                    </Link>
                    <Link href="/admin" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#8298aa] transition" onClick={() => setUserMenuOpen(false)}>
                      Admin Panel
                    </Link>
                    <div className="border-t border-[#2b3538]">
                      <button
                        onClick={() => {
                          const supabase = getSupabaseBrowser();
                          if (supabase) void supabase.auth.signOut();
                          localStorage.removeItem('user');
                          setUser(null);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#8298aa] transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-[#8298aa]/25 border border-[#8298aa] text-[#d8e2e8] font-semibold rounded-lg shadow-sm hover:bg-[#8298aa]/40 transition text-sm">
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#e1e7e5]"
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
          <div className="md:hidden border-t border-[#2b3538] bg-[#0a0a0a] px-4 py-4 space-y-3 text-sm">
            <Link href="/shop" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/testing" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Testing</Link>
            <Link href="/coa" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Test Reports</Link>
            <Link href="/contact" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Support</Link>
            <Link href="/cart" className={mobileHeaderLinkClass} onClick={() => setMobileOpen(false)}>Cart</Link>
            <div className="border-t border-[#2b3538] pt-3">
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
