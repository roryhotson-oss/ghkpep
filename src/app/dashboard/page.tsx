'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PaymentSettings {
  alipayUrl: string;
  cryptoUrl: string;
  bankTransferUrl: string;
  wiseUrl: string;
}

interface User {
  email: string;
  name: string;
}

interface DashboardOrder {
  order_number: string;
  status: string;
  total_amount: number | string;
  tracking_number?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({ alipayUrl: '/contact', cryptoUrl: '/contact', bankTransferUrl: '/contact', wiseUrl: '/contact' });
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
      } else {
        setUser(JSON.parse(storedUser));
        fetch('/api/orders').then((response) => response.ok ? response.json() : { orders: [] }).then((data) => setOrders(data.orders || [])).catch(() => setOrders([]));
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    fetch('/api/payment-settings').then((response) => response.json()).then((data) => {
      if (data.settings) setPaymentSettings(data.settings);
    }).catch(() => {});
  }, []);

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);

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
          <p className="text-[#a7b0b2]">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 border border-[#FBFAF7]/70 text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
        >
          Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <p className="text-[#a7b0b2] text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <p className="text-[#a7b0b2] text-sm mb-2">Total Spent</p>
          <p className="text-3xl font-bold">£{totalSpent.toFixed(2)}</p>
        </div>
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <p className="text-[#a7b0b2] text-sm mb-2">Account Status</p>
          <p className="text-3xl font-bold text-[#8298aa]">Active</p>
        </div>
      </div>

      {/* Recurring Subscription Offer */}
      <div className="bg-gradient-to-r from-[#17232d] to-[#1c2733] rounded-xl p-6 border border-[#8298aa]/20 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Set Up Recurring Orders</h2>
            <p className="text-[#a7b0b2] text-sm mb-4">
              Never run out of essential compounds. Set up automatic deliveries and save up to 25% on every order.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="px-6 py-2 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition text-sm"
              >
                Set Up Subscription
              </button>
              <Link href="/shop" className="px-6 py-2 border border-[#8298aa] text-[#8298aa] rounded-lg hover:bg-[#8298aa] hover:text-black transition text-sm">
                Browse Catalog
              </Link>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#8298aa]">Save 25%</p>
            <p className="text-[#a7b0b2] text-xs">on recurring orders</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
        <p className="text-[#a7b0b2] text-sm mb-6">
          We accept the following payment methods. Your order details and shipping address will be collected at checkout.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Bank Transfer */}
            <a href={paymentSettings.bankTransferUrl} className="block bg-[#111d2c] rounded-lg p-4 border border-[#FBFAF7]/70 hover:border-[#8298aa] transition">
            <h3 className="font-bold text-white mb-2">Bank Transfer</h3>
            <p className="text-[#a7b0b2] text-xs mb-3">
              View current bank transfer instructions. Orders ship after payment confirmation.
            </p>
              <span className="text-[#8298aa] text-xs">View payment instructions -&gt;</span>
            </a>

          {/* Crypto */}
            <a href={paymentSettings.cryptoUrl} className="block bg-[#111d2c] rounded-lg p-4 border border-[#FBFAF7]/70 hover:border-[#8298aa] transition">
            <h3 className="font-bold text-white mb-2">Cryptocurrency</h3>
            <p className="text-[#a7b0b2] text-xs mb-3">
              View current cryptocurrency payment instructions for BTC, ETH, or USDT.
            </p>
              <span className="text-[#8298aa] text-xs">View payment instructions -&gt;</span>
            </a>

          {/* AliExpress / Alipay */}
            <a href={paymentSettings.alipayUrl} className="block bg-[#111d2c] rounded-lg p-4 border border-[#FBFAF7]/70 hover:border-[#8298aa] transition">
            <h3 className="font-bold text-white mb-2">AliExpress / Alipay</h3>
            <p className="text-[#a7b0b2] text-xs mb-3">
              View current Alipay payment instructions and checkout details.
            </p>
              <span className="text-[#8298aa] text-xs">View payment instructions -&gt;</span>
            </a>

          {/* Wise */}
            <a href={paymentSettings.wiseUrl} className="block bg-[#111d2c] rounded-lg p-4 border border-[#FBFAF7]/70 hover:border-[#8298aa] transition">
            <h3 className="font-bold text-white mb-2">Wise</h3>
            <p className="text-[#a7b0b2] text-xs mb-3">View current Wise payment instructions.</p>
              <span className="text-[#8298aa] text-xs">View payment instructions -&gt;</span>
            </a>
        </div>
        <p className="text-xs text-[#7b898e] mt-4">
          <strong>Note:</strong> Your shipping address and phone number will be collected at checkout and included in your order confirmation.
        </p>
      </div>

      {/* Recent Orders */}
      <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md mb-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/orders" className="text-[#8298aa] text-sm hover:underline">
            View All Orders →
          </Link>
        </div>
        <div className="space-y-3">
          {orders.length === 0 ? <p className="text-[#a7b0b2] text-sm text-center py-6">No orders yet.</p> : <div className="space-y-3">{orders.slice(0, 3).map((order) => <div key={order.order_number} className="flex flex-wrap items-center justify-between gap-3 bg-[#111d2c] rounded-lg p-3"><div><p className="font-medium">{order.order_number}</p><p className="text-[#a7b0b2] text-xs">{order.status}</p></div><div className="text-right"><p className="font-bold">£{Number(order.total_amount).toFixed(2)}</p>{order.tracking_number && <a href={`https://www.17track.net/en?nums=${encodeURIComponent(order.tracking_number)}`} target="_blank" rel="noreferrer" className="text-[#8298aa] text-xs hover:underline">Track with 17TRACK</a>}</div></div>)}</div>}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/shop" className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md hover:border-[#8298aa]/30 transition">
          <h3 className="font-bold mb-2">Browse Catalog</h3>
          <p className="text-[#a7b0b2] text-sm">Explore our research compounds</p>
        </Link>
        <Link href="/coa" className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md hover:border-[#8298aa]/30 transition">
          <h3 className="font-bold mb-2">View COAs</h3>
          <p className="text-[#a7b0b2] text-sm">Access certificates of analysis</p>
        </Link>
        <Link href="/contact" className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md hover:border-[#8298aa]/30 transition">
          <h3 className="font-bold mb-2">Contact Support</h3>
          <p className="text-[#a7b0b2] text-sm">Get help with your orders</p>
        </Link>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="text-[#e6edf3] bg-[#0c1622] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#FBFAF7]/70">
            <div className="p-6 border-b border-[#FBFAF7]/70">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Set Up Recurring Orders</h2>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-[#a7b0b2] hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#111d2c] rounded-lg p-6 border border-[#FBFAF7]/70 hover:border-[#8298aa]/30 cursor-pointer transition">
                  <h3 className="font-bold mb-2">Monthly</h3>
                  <p className="text-3xl font-bold mb-1">5% <span className="text-sm text-[#a7b0b2]">off</span></p>
                  <p className="text-[#a7b0b2] text-sm">Delivered every month</p>
                </div>
                <div className="bg-[#111d2c] rounded-lg p-6 border-2 border-[#8298aa] cursor-pointer transition relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-[#0c1622] border-2 border-[#FBFAF7] text-white text-xs font-bold rounded-full">POPULAR</span>
                  </div>
                  <h3 className="font-bold mb-2">Quarterly</h3>
                  <p className="text-3xl font-bold mb-1">15% <span className="text-sm text-[#a7b0b2]">off</span></p>
                  <p className="text-[#a7b0b2] text-sm">Delivered every 3 months</p>
                </div>
                <div className="bg-[#111d2c] rounded-lg p-6 border border-[#FBFAF7]/70 hover:border-[#8298aa]/30 cursor-pointer transition">
                  <h3 className="font-bold mb-2">Bi-Annual</h3>
                  <p className="text-3xl font-bold mb-1">25% <span className="text-sm text-[#a7b0b2]">off</span></p>
                  <p className="text-[#a7b0b2] text-sm">Delivered every 6 months</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-3">How it works:</h3>
                <ul className="space-y-2 text-sm text-[#a7b0b2]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8298aa]">✓</span>
                    <span>Choose your delivery frequency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8298aa]">✓</span>
                    <span>Select which compounds you want on repeat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8298aa]">✓</span>
                    <span>Get automatic discounts on every order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8298aa]">✓</span>
                    <span>Pause, skip, or cancel anytime</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSubscriptionModal(false);
                    router.push('/cart');
                  }}
                  className="flex-1 px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg hover:bg-[#16283c] transition"
                >
                  Continue to Cart
                </button>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="px-6 py-3 border border-[#FBFAF7]/70 text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
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
