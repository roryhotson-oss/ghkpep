'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

interface CartItem {
  qty?: number;
}

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
      <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] border-b border-[#21c7a5]/20 py-3 px-4 text-center">
        <p className="text-[#21c7a5] text-xs tracking-wide leading-relaxed">
          ✨ Premium peptides from internationally recognised manufacturers, independently verified for purity. UK stock for rapid dispatch · Bulk orders fulfilled via our global partner network · Full tracking on every shipment · <span className="font-semibold">Undelivered? We reship free.</span> · <span className="font-semibold">Test shows a fault? Submit your results and receive free replacements.</span>
        </p>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
          <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">
            <span className="gradient-text">GHKpep</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/shop" className="text-[#e1e7e5] hover:text-[#21c7a5] transition">Shop</Link>
            <Link href="/testing" className="text-[#e1e7e5] hover:text-[#21c7a5] transition">Testing</Link>
            <Link href="/coa" className="text-[#e1e7e5] hover:text-[#21c7a5] transition">COAs</Link>
            <Link href="/contact" className="text-[#e1e7e5] hover:text-[#21c7a5] transition">Contact</Link>
            <Link href="/cart" className="relative text-[#e1e7e5] hover:text-[#21c7a5] transition">
              Cart
              <span className="absolute -top-1 -right-3 bg-[#21c7a5] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-[#e1e7e5] hover:text-[#21c7a5] transition"
                >
                  <div className="w-8 h-8 bg-[#21c7a5] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-[#2b3538] rounded-lg shadow-lg">
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#21c7a5] transition" onClick={() => setUserMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link href="/orders" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#21c7a5] transition" onClick={() => setUserMenuOpen(false)}>
                      Orders
                    </Link>
                    <Link href="/subscriptions" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#21c7a5] transition" onClick={() => setUserMenuOpen(false)}>
                      Subscription
                    </Link>
                    <Link href="/admin" className="block px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#21c7a5] transition" onClick={() => setUserMenuOpen(false)}>
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
                        className="w-full text-left px-4 py-3 text-sm text-[#e1e7e5] hover:bg-[#1a1a1a] hover:text-[#21c7a5] transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition text-sm">
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#2b3538] bg-[#0a0a0a] px-4 py-4 space-y-3 text-sm">
            <Link href="/shop" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/testing" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>Testing</Link>
            <Link href="/coa" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>COAs</Link>
            <Link href="/contact" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/cart" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>Cart</Link>
            <div className="border-t border-[#2b3538] pt-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-[#21c7a5] hover:text-[#16a98d]" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link href="/orders" className="block text-[#e1e7e5] hover:text-[#21c7a5]" onClick={() => setMobileOpen(false)}>Orders</Link>
                  <button
                    onClick={() => {
                      const supabase = getSupabaseBrowser();
                      if (supabase) void supabase.auth.signOut();
                      localStorage.removeItem('user');
                      setUser(null);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left text-[#e1e7e5] hover:text-[#21c7a5]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="block text-[#21c7a5] hover:text-[#16a98d] font-semibold" onClick={() => setMobileOpen(false)}>Sign In / Register</Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
