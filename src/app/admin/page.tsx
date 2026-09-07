"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  slug: string;
  name: string;
  price: number;
  boxPrice: number;
  purity: string;
  category: string;
  categoryLabel: string;
  description: string;
  lot: string;
  image: string;
  stockQuantity?: number;
  discountPercent?: number;
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: { slug: string; name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  channel: string;
  notes: string;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  avgOrderValue: number;
  totalProducts: number;
  totalSubscribers: number;
  topProducts: { slug: string; name: string; quantity: number; revenue: number }[];
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  recentOrders: Order[];
  statusBreakdown: { pending: number; processing: number; shipped: number; delivered: number; cancelled: number };
  lowStockProducts: number;
  fulfilledOrders: number;
  products: Product[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [statsRes, productsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/products"),
      ]);
      const statsData = statsRes.ok ? await statsRes.json() : null;
      const productsData = productsRes.ok ? await productsRes.json() : { products: [] };
      return { ...statsData, products: productsData.products };
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStats();
        if (data) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#a7b0b2]">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-red-400">Failed to load dashboard data</p>
      </div>
    );
  }

  const currentMonthRevenue = stats.revenueByMonth[stats.revenueByMonth.length - 1]?.revenue || 0;
  const prevMonthRevenue = stats.revenueByMonth[stats.revenueByMonth.length - 2]?.revenue || 0;
  const growthRate = prevMonthRevenue > 0 ? (((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1) : currentMonthRevenue > 0 ? "100.0" : "0";

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">E-Commerce Dashboard</h1>
        <p className="text-[#a7b0b2]">Manage your GHK Peptides store</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { href: '/admin/products/new', label: 'Add Product', icon: 'M12 4v16m8-8H4', primary: true },
          { href: '/admin/products', label: 'Products & Images', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
          { href: '/admin/emails', label: 'Send Emails', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
          { href: '/admin/orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
          { href: '/admin/marketing', label: 'Marketing', icon: 'M3 11l18-5v12L3 13v-2zm0 0l4 1v7a2 2 0 01-2 2H4a1 1 0 01-1-1v-9z' },
          { href: '/admin/chat', label: 'Support Inbox', icon: 'M8 10h8m-8 4h5m-9 5l-3 3V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H8z' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex flex-col items-center gap-2 rounded-xl p-4 border text-center transition ${
              action.primary
                ? 'bg-[#8298aa] border-[#8298aa] text-black hover:bg-[#16283c]'
                : 'text-[#e6edf3] bg-[#0c1622] border-[#FBFAF7]/70 text-[#e1e7e5] hover:border-[#8298aa] hover:text-[#8298aa]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
            </svg>
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Revenue */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8298aa]/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a7b0b2] text-sm font-medium">Total Revenue</span>
            </div>
            <p className="text-3xl font-bold text-white">GBP {stats.totalRevenue.toLocaleString()}</p>
            <p className="text-[#a7b0b2] text-xs mt-1">All time sales</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a7b0b2] text-sm font-medium">Total Orders</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
            <p className="text-green-400 text-xs mt-1">+{growthRate}% growth</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a7b0b2] text-sm font-medium">Pending Orders</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{stats.pendingOrders}</p>
            <p className="text-[#a7b0b2] text-xs mt-1">Need attention</p>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a7b0b2] text-sm font-medium">Avg Order Value</span>
            </div>
            <p className="text-3xl font-bold text-white">GBP {stats.avgOrderValue.toFixed(2)}</p>
            <p className="text-[#a7b0b2] text-xs mt-1">Per transaction</p>
          </div>
        </div>

        {/* Low Stock */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a7b0b2] text-sm font-medium">Low Stock</span>
            </div>
            <p className="text-3xl font-bold text-pink-400">{stats.lowStockProducts}</p>
            <p className="text-[#a7b0b2] text-xs mt-1">Products below 10 units</p>
          </div>
        </div>
      </div>

      {/* Revenue & Orders Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Month */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Revenue Trend (Last 6 Months)</h2>
            <span className="text-[#8298aa] text-sm">GBP {stats.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="space-y-4">
            {(stats.revenueByMonth || []).map((month) => {
              const maxRevenue = Math.max(...(stats.revenueByMonth.map(m => m.revenue) || [1]));
              const width = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
              const isBest = month.revenue === maxRevenue;
              return (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="text-sm text-[#a7b0b2] w-20">{month.month}</span>
                  <div className="flex-1 bg-[#111d2c] rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#8298aa] to-[#8298aa]/30 rounded-full flex items-center justify-end pr-3 transition-all duration-500 ${
                        isBest ? "ring-2 ring-[#8298aa] ring-offset-2 ring-offset-[#0c1622]" : ""
                      }`}
                      style={{ width: `${Math.max(width, 3)}%` }}
                    >
                      {month.revenue > 0 && (
                        <span className="text-[11px] text-black font-bold">GBP {month.revenue.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[#a7b0b2] w-12 text-right">{month.orders} orders</span>
                </div>
              );
            })}
            {(!stats.revenueByMonth || stats.revenueByMonth.every(m => m.revenue === 0)) && (
              <p className="text-[#a7b0b2] text-sm text-center py-6">No revenue data yet. Start selling to see trends!</p>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">Order Status Distribution</h2>
          <div className="space-y-3">
            {[
              { label: "Pending", count: stats.statusBreakdown.pending, color: "yellow", bg: "bg-yellow-500/10" },
              { label: "Processing", count: stats.statusBreakdown.processing, color: "blue", bg: "bg-blue-500/10" },
              { label: "Shipped", count: stats.statusBreakdown.shipped, color: "purple", bg: "bg-purple-500/10" },
              { label: "Delivered", count: stats.statusBreakdown.delivered, color: "green", bg: "bg-green-500/10" },
              { label: "Cancelled", count: stats.statusBreakdown.cancelled, color: "red", bg: "bg-red-500/10" },
            ].map((status) => {
              const total = Object.values(stats.statusBreakdown).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (status.count / total) * 100 : 0;
              return (
                <div key={status.label} className="flex items-center gap-3">
                  <span className={`text-xs text-${status.color}-400 font-medium w-20`}>{status.label}</span>
                  <div className="flex-1 bg-[#111d2c] rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full ${status.bg} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-white w-12 text-right">{status.count}</span>
                </div>
              );
            })}
          </div>
          <Link href="/admin/orders" className="mt-4 inline-block text-[#8298aa] text-sm hover:underline">
            Manage Orders -&gt;
          </Link>
        </div>
      </div>

      {/* Products Section with Quick Edit */}
      <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Products ({stats.totalProducts})</h2>
          <Link href="/admin/products" className="text-[#8298aa] text-sm hover:underline">
            All Products -&gt;
          </Link>
        </div>

        {stats.products && stats.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.products.slice(0, 6).map((product) => (
              <div key={product.slug} className="bg-[#111d2c] rounded-lg p-4 border border-[#FBFAF7]/70 group">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[#0f0f0f] rounded-lg flex-shrink-0 overflow-hidden border border-[#FBFAF7]/70">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#a7b0b2] text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium truncate">{product.name}</h3>
                      <span className="text-xs text-[#a7b0b2] px-2 py-0.5 bg-[#0f0f0f] rounded">{product.categoryLabel}</span>
                    </div>
                    <p className="text-sm text-[#a7b0b2] mt-1">GBP {product.price.toFixed(2)}</p>
                    <p className="text-xs text-[#7b898e] mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/admin/products/${product.slug}/edit`}
                        className="text-xs px-3 py-1.5 bg-[#8298aa]/10 text-[#8298aa] rounded-lg hover:bg-[#8298aa]/20 transition"
                      >
                        Edit / Upload Image
                      </Link>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-xs px-3 py-1.5 bg-[#111d2c] text-[#e1e7e5] rounded-lg hover:bg-[#16283c] transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#a7b0b2] mb-4">No products yet</p>
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-[#0c1622] border-2 border-[#FBFAF7] text-white text-sm font-medium rounded-lg hover:bg-[#16283c] transition"
            >
              + Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Top Products by Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">Top Selling Products</h2>
          {stats.topProducts && stats.topProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((product, index) => {
                return (
                  <div key={product.slug} className="flex items-center justify-between p-3 bg-[#111d2c] rounded-lg border border-[#FBFAF7]/70">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-[#8298aa] font-bold">{index + 1}</span>
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        <p className="text-xs text-[#a7b0b2]">{product.quantity} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#8298aa] font-bold">GBP {product.revenue.toLocaleString()}</p>
                      <p className="text-xs text-[#7b898e]">revenue</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#a7b0b2] text-sm text-center py-6">No sales data yet</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[#8298aa] text-sm hover:underline">
              View All
            </Link>
          </div>
          {stats.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-3 bg-[#111d2c] rounded-lg border border-[#FBFAF7]/70">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">Order #{order.id.slice(0, 8)}...</p>
                      <p className="text-xs text-[#a7b0b2] mt-1">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#8298aa] font-bold">GBP {order.total.toFixed(2)}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full mt-1 block ${
                          order.status === "delivered"
                            ? "bg-green-500/10 text-green-400"
                            : order.status === "shipped"
                            ? "bg-purple-500/10 text-purple-400"
                            : order.status === "processing"
                            ? "bg-blue-500/10 text-blue-400"
                            : order.status === "cancelled"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#7b898e] mt-2">{new Date(order.date).toLocaleDateString("en-GB")}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#a7b0b2] text-sm text-center py-6">No orders yet</p>
          )}
        </div>
      </div>

    </div>
  );
}
