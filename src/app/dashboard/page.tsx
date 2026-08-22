'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  email: string;
  name: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
      } else {
        setUser(JSON.parse(storedUser));
      }
    };
    checkAuth();
  }, [router]);

  // Mock data - in production, fetch from API
  const mockOrders: Order[] = [
    { id: 'GHK-2024-001', date: '2024-08-20', status: 'Delivered', total: 127.98, items: 3 },
    { id: 'GHK-2024-002', date: '2024-08-15', status: 'Delivered', total: 89.99, items: 2 },
    { id: 'GHK-2024-003', date: '2024-08-10', status: 'Delivered', total: 245.50, items: 5 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-[#888]">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 border border-[#222] text-[#ccc] rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition"
        >
          Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <p className="text-[#888] text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{mockOrders.length}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <p className="text-[#888] text-sm mb-2">Total Spent</p>
          <p className="text-3xl font-bold">£{mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
        </div>
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <p className="text-[#888] text-sm mb-2">Account Status</p>
          <p className="text-3xl font-bold text-[#00d4aa]">Active</p>
        </div>
      </div>

      {/* Recurring Subscription Offer */}
      <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-xl p-6 border border-[#00d4aa]/20 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Set Up Recurring Orders</h2>
            <p className="text-[#888] text-sm mb-4">
              Never run out of essential compounds. Set up automatic deliveries and save up to 25% on every order.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="px-6 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition text-sm"
              >
                Set Up Subscription
              </button>
              <Link href="/shop" className="px-6 py-2 border border-[#00d4aa] text-[#00d4aa] rounded-lg hover:bg-[#00d4aa] hover:text-black transition text-sm">
                Browse Catalog
              </Link>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#00d4aa]">Save 25%</p>
            <p className="text-[#888] text-xs">on recurring orders</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222] mb-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/orders" className="text-[#00d4aa] text-sm hover:underline">
            View All Orders →
          </Link>
        </div>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#222]">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium">Order {order.id}</p>
                  <span className="px-2 py-0.5 bg-[#0a2a22] text-[#00d4aa] rounded-full text-xs">
                    {order.status}
                  </span>
                </div>
                <p className="text-[#888] text-sm">
                  {new Date(order.date).toLocaleDateString('en-GB')} · {order.items} items
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">£{order.total.toFixed(2)}</p>
                <Link href={`/orders/${order.id}`} className="text-[#00d4aa] text-xs hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/shop" className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#00d4aa]/30 transition">
          <h3 className="font-bold mb-2">Browse Catalog</h3>
          <p className="text-[#888] text-sm">Explore our research compounds</p>
        </Link>
        <Link href="/coa" className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#00d4aa]/30 transition">
          <h3 className="font-bold mb-2">View COAs</h3>
          <p className="text-[#888] text-sm">Access certificates of analysis</p>
        </Link>
        <Link href="/contact" className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#00d4aa]/30 transition">
          <h3 className="font-bold mb-2">Contact Support</h3>
          <p className="text-[#888] text-sm">Get help with your orders</p>
        </Link>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#222]">
            <div className="p-6 border-b border-[#222]">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Set Up Recurring Orders</h2>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-[#888] hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00d4aa]/30 cursor-pointer transition">
                  <h3 className="font-bold mb-2">Monthly</h3>
                  <p className="text-3xl font-bold mb-1">5% <span className="text-sm text-[#888]">off</span></p>
                  <p className="text-[#888] text-sm">Delivered every month</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border-2 border-[#00d4aa] cursor-pointer transition relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-[#00d4aa] text-black text-xs font-bold rounded-full">POPULAR</span>
                  </div>
                  <h3 className="font-bold mb-2">Quarterly</h3>
                  <p className="text-3xl font-bold mb-1">15% <span className="text-sm text-[#888]">off</span></p>
                  <p className="text-[#888] text-sm">Delivered every 3 months</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00d4aa]/30 cursor-pointer transition">
                  <h3 className="font-bold mb-2">Bi-Annual</h3>
                  <p className="text-3xl font-bold mb-1">25% <span className="text-sm text-[#888]">off</span></p>
                  <p className="text-[#888] text-sm">Delivered every 6 months</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-3">How it works:</h3>
                <ul className="space-y-2 text-sm text-[#888]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4aa]">✓</span>
                    <span>Choose your delivery frequency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4aa]">✓</span>
                    <span>Select which compounds you want on repeat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4aa]">✓</span>
                    <span>Get automatic discounts on every order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4aa]">✓</span>
                    <span>Pause, skip, or cancel anytime</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert('Subscription setup coming soon! This will integrate with your cart and order system.');
                    setShowSubscriptionModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition"
                >
                  Continue to Cart
                </button>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="px-6 py-3 border border-[#222] text-[#ccc] rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
