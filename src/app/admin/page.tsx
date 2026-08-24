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
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product> & { slug: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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

  const startEditing = (product: Product) => {
    setEditingProduct(product.slug);
    setEditForm({ ...product });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  const saveProduct = async () => {
    if (!editForm) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${editForm.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setSuccessMsg("Product updated successfully!");
        setEditingProduct(null);
        setEditForm(null);
        const data = await fetchStats();
        if (data) {
          setStats(data);
        }
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditForm(null);
  };

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

  const growthRate = stats.totalOrders > 0 ? ((stats.recentOrders.length / Math.max(stats.totalOrders - stats.recentOrders.length, 1)) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header with Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">E-Commerce Dashboard</h1>
            <p className="text-[#a7b0b2]">Manage your GHK Peptides store</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-[#8298aa] text-black text-sm font-medium rounded-lg hover:bg-[#657c8f] transition"
            >
              + Add Product
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2b3538] text-[#e1e7e5] text-sm font-medium rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
            >
              View All Orders
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2b3538] text-[#e1e7e5] text-sm font-medium rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/payment-settings"
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2b3538] text-[#e1e7e5] text-sm font-medium rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
            >
              Payment Settings
            </Link>
            <Link
              href="/admin/chat"
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2b3538] text-[#e1e7e5] text-sm font-medium rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
            >
              Support Inbox
            </Link>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
          {successMsg}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Revenue */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] relative overflow-hidden group">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] relative overflow-hidden group">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] relative overflow-hidden group">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] relative overflow-hidden group">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] relative overflow-hidden group">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
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
                  <div className="flex-1 bg-[#1a1a1a] rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#8298aa] to-[#8298aa]/30 rounded-full flex items-center justify-end pr-3 transition-all duration-500 ${
                        isBest ? "ring-2 ring-[#8298aa] ring-offset-2 ring-offset-[#141414]" : ""
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
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
                  <div className="flex-1 bg-[#1a1a1a] rounded-full h-6 overflow-hidden">
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
      <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Products ({stats.totalProducts})</h2>
          <Link href="/admin/products" className="text-[#8298aa] text-sm hover:underline">
            All Products -&gt;
          </Link>
        </div>

        {stats.products && stats.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.products.slice(0, 6).map((product) => (
              <div key={product.slug} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2b3538] group">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[#0f0f0f] rounded-lg flex-shrink-0 overflow-hidden border border-[#2b3538]">
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
                      <button
                        onClick={() => startEditing(product)}
                        className="text-xs px-3 py-1.5 bg-[#8298aa]/10 text-[#8298aa] rounded-lg hover:bg-[#8298aa]/20 transition"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-xs px-3 py-1.5 bg-[#2b3538] text-[#e1e7e5] rounded-lg hover:bg-[#333] transition"
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
              className="px-4 py-2 bg-[#8298aa] text-black text-sm font-medium rounded-lg hover:bg-[#657c8f] transition"
            >
              + Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Top Products by Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
          <h2 className="text-lg font-bold text-white mb-4">Top Selling Products</h2>
          {stats.topProducts && stats.topProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((product, index) => {
                return (
                  <div key={product.slug} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#2b3538]">
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
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[#8298aa] text-sm hover:underline">
              View All
            </Link>
          </div>
          {stats.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#2b3538]">
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

      {/* Quick Edit Modal */}
      {editingProduct && editForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538] max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Edit Product</h2>
              <button
                onClick={cancelEditing}
                className="text-[#a7b0b2] hover:text-white transition"
              >
                X
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name || ""}
                  onChange={handleEditChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Price (GBP)</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price || 0}
                  onChange={handleEditChange}
                  step="0.01"
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Box Price (GBP)</label>
                <input
                  type="number"
                  name="boxPrice"
                  value={editForm.boxPrice || 0}
                  onChange={handleEditChange}
                  step="0.01"
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Purity</label>
                <input
                  type="text"
                  name="purity"
                  value={editForm.purity || ""}
                  onChange={handleEditChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Category</label>
                <select
                  name="category"
                  value={editForm.category || ""}
                  onChange={handleEditChange}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa]"
                >
                  <option value="peptides">Peptides</option>
                  <option value="sarms">SARMs</option>
                  <option value="nootropics">Nootropics</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-2">Description</label>
                <textarea
                  name="description"
                  value={editForm.description || ""}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#8298aa] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveProduct}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-[#8298aa] text-black font-medium rounded-lg hover:bg-[#657c8f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={cancelEditing}
                className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#2b3538] text-[#e1e7e5] font-medium rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
