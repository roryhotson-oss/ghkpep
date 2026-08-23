'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: { slug: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  channel: string;
  notes: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };
    loadOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await new Promise<void>((resolve) => {
      setUpdatingId(orderId);
      resolve();
    });
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        await new Promise<void>((resolve) => {
          setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as Order['status'] } : o));
          resolve();
        });
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      await new Promise<void>((resolve) => {
        setUpdatingId(null);
        resolve();
      });
    }
  };

  const filtered = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#a7b0b2]">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-[#a7b0b2]">{orders.length} total orders · {orders.filter(o => o.status === 'pending').length} pending</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              statusFilter === status
                ? 'bg-[#21c7a5] text-black font-semibold'
                : 'bg-[#141414] text-[#a7b0b2] border border-[#2b3538] hover:border-[#21c7a5] hover:text-[#21c7a5]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-1 text-xs opacity-70">
                ({orders.filter(o => status === 'all' || o.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-[#141414] rounded-xl border border-[#2b3538] overflow-hidden">
              {/* Order Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1a1a] transition"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-white font-medium">{order.id}</p>
                    <p className="text-[#a7b0b2] text-sm">{order.customerName} · {new Date(order.date).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="text-white font-bold">£{order.total.toFixed(2)}</span>
                  <svg
                    className={`w-5 h-5 text-[#a7b0b2] transition ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="px-4 pb-4 border-t border-[#2b3538]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Order Details */}
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Customer</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-[#e1e7e5]">{order.customerName}</p>
                        <p className="text-[#a7b0b2]">{order.customerEmail}</p>
                        <p className="text-[#a7b0b2]">Channel: {order.channel || 'Website'}</p>
                      </div>

                      <h3 className="text-sm font-semibold text-white mt-4 mb-3">Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-[#e1e7e5]">{item.name} × {item.quantity}</span>
                            <span className="text-[#a7b0b2]">£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#2b3538]">
                          <span className="text-white">Total</span>
                          <span className="text-[#21c7a5]">£{order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-4">
                          <h3 className="text-sm font-semibold text-white mb-2">Notes</h3>
                          <p className="text-[#a7b0b2] text-sm">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Status Update */}
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Update Status</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(order.id, status)}
                            disabled={updatingId === order.id}
                            className={`px-3 py-2 rounded-lg text-xs border transition ${
                              order.status === status
                                ? statusColors[status]
                                : 'bg-[#1a1a1a] text-[#a7b0b2] border-[#2b3538] hover:border-[#21c7a5] hover:text-[#21c7a5]'
                            } disabled:opacity-50`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#141414] rounded-xl border border-[#2b3538]">
          <svg className="w-12 h-12 text-[#333] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-[#a7b0b2]">No orders found</p>
          <p className="text-[#7b898e] text-sm mt-1">Orders from customers will appear here</p>
        </div>
      )}
    </div>
  );
}
