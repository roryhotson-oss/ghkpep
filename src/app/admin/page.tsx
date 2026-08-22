'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  avgOrderValue: number;
  totalProducts: number;
  totalSubscribers: number;
  topProducts: { slug: string; name: string; quantity: number; revenue: number }[];
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  recentOrders: { id: string; date: string; customerName: string; total: number; status: string; items: number }[];
  statusBreakdown: { pending: number; processing: number; shipped: number; delivered: number; cancelled: number };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#888]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#888]">Welcome to GHK Peptides admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-sm">Total Revenue</span>
            <span className="w-10 h-10 bg-[#00d4aa]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#00d4aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-white">£{stats?.totalRevenue.toFixed(2) || '0.00'}</p>
          <p className="text-[#888] text-xs mt-1">Avg: £{stats?.avgOrderValue.toFixed(2) || '0.00'}/order</p>
        </div>

        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-sm">Total Orders</span>
            <span className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.totalOrders || 0}</p>
          <p className="text-yellow-400 text-xs mt-1">{stats?.pendingOrders || 0} pending</p>
        </div>

        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-sm">Products</span>
            <span className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.totalProducts || 0}</p>
          <Link href="/admin/products" className="text-[#00d4aa] text-xs mt-1 hover:underline">Manage →</Link>
        </div>

        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-sm">Subscribers</span>
            <span className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.totalSubscribers || 0}</p>
          <Link href="/admin/emails" className="text-[#00d4aa] text-xs mt-1 hover:underline">Send email →</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">Revenue (Last 6 Months)</h2>
          <div className="space-y-3">
            {(stats?.revenueByMonth || []).map((month) => {
              const maxRevenue = Math.max(...(stats?.revenueByMonth.map(m => m.revenue) || [1]));
              const width = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
              return (
                <div key={month.month} className="flex items-center gap-3">
                  <span className="text-xs text-[#888] w-16 flex-shrink-0">{month.month}</span>
                  <div className="flex-1 bg-[#1a1a1a] rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00d4aa] to-[#00d4aa]/50 rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max(width, 2)}%` }}
                    >
                      {month.revenue > 0 && (
                        <span className="text-[10px] text-black font-bold">£{month.revenue.toFixed(0)}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[#888] w-16 text-right">{month.orders} orders</span>
                </div>
              );
            })}
            {(!stats?.revenueByMonth || stats.revenueByMonth.every(m => m.revenue === 0)) && (
              <p className="text-[#888] text-sm text-center py-4">No order data yet</p>
            )}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">Order Status</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Pending', count: stats?.statusBreakdown.pending || 0, color: 'yellow' },
              { label: 'Processing', count: stats?.statusBreakdown.processing || 0, color: 'blue' },
              { label: 'Shipped', count: stats?.statusBreakdown.shipped || 0, color: 'purple' },
              { label: 'Delivered', count: stats?.statusBreakdown.delivered || 0, color: 'green' },
              { label: 'Cancelled', count: stats?.statusBreakdown.cancelled || 0, color: 'red' },
            ].map((status) => (
              <div key={status.label} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#222]">
                <p className={`text-2xl font-bold text-${status.color}-400`}>{status.count}</p>
                <p className="text-[#888] text-sm">{status.label}</p>
              </div>
            ))}
          </div>
          <Link href="/admin/orders" className="mt-4 inline-block text-[#00d4aa] text-sm hover:underline">
            View all orders →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222] mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-[#00d4aa] text-sm hover:underline">View All →</Link>
        </div>
        {stats?.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#888] border-b border-[#222]">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#222]/50">
                    <td className="py-3 text-white font-medium">{order.id}</td>
                    <td className="py-3 text-[#ccc]">{order.customerName}</td>
                    <td className="py-3 text-[#888]">{new Date(order.date).toLocaleDateString('en-GB')}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-500/10 text-green-400' :
                        order.status === 'shipped' ? 'bg-purple-500/10 text-purple-400' :
                        order.status === 'processing' ? 'bg-blue-500/10 text-blue-400' :
                        order.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-white font-medium">£{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#888] text-sm text-center py-8">No orders yet. Orders will appear here when customers place them.</p>
        )}
      </div>

      {/* Top Products */}
      <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Top Products</h2>
          <Link href="/admin/products" className="text-[#00d4aa] text-sm hover:underline">Manage Products →</Link>
        </div>
        {stats?.topProducts && stats.topProducts.length > 0 ? (
          <div className="space-y-2">
            {stats.topProducts.map((product, index) => (
              <div key={product.slug} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#222]">
                <div className="flex items-center gap-3">
                  <span className="text-[#888] text-sm w-6">#{index + 1}</span>
                  <span className="text-white text-sm">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#888] text-sm">{product.quantity} sold</span>
                  <span className="text-[#00d4aa] text-sm font-medium">£{product.revenue.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#888] text-sm text-center py-8">No sales data yet</p>
        )}
      </div>
    </div>
  );
}
