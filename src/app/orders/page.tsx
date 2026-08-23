'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shipping: {
    method: string;
    tracking?: string;
  };
  payment: {
    method: string;
  };
}

export default function OrdersPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
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
    {
      id: 'GHK-2024-001',
      date: '2024-08-20',
      status: 'Delivered',
      total: 127.98,
      items: [
        { name: 'GHK-Cu 100mg', quantity: 1, price: 35.99, image: '/images/ghk-cu-100mg.png' },
        { name: 'BPC-157 10mg', quantity: 1, price: 31.99, image: '/images/bpc-157-10mg.png' },
        { name: 'KPV 10mg', quantity: 2, price: 30.00, image: '/images/kpv-10mg.png' },
      ],
      shipping: { method: 'Trusted Labs Standard', tracking: 'TL-2024-888999' },
      payment: { method: 'Alipay' },
    },
    {
      id: 'GHK-2024-002',
      date: '2024-08-15',
      status: 'Delivered',
      total: 89.99,
      items: [
        { name: 'NAD+ 500mg', quantity: 1, price: 47.99, image: '/images/nad-plus-500mg.png' },
        { name: 'MOTS-C 10mg', quantity: 1, price: 29.99, image: '/images/mots-c-10mg.png' },
      ],
      shipping: { method: 'Trusted Labs Standard', tracking: 'TL-2024-777888' },
      payment: { method: 'Bank Transfer' },
    },
    {
      id: 'GHK-2024-003',
      date: '2024-08-10',
      status: 'Delivered',
      total: 245.50,
      items: [
        { name: 'Box of 10: GHK-Cu 100mg', quantity: 1, price: 323.91, image: '/images/ghk-cu-100mg.png' },
      ],
      shipping: { method: 'Trusted Labs Next Day', tracking: 'TL-2024-666777' },
      payment: { method: 'Crypto (USDT)' },
    },
  ];

  if (!user) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-[#888]">View and track all your orders</p>
        </div>
        <Link href="/shop" className="px-6 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition">
          Shop Now
        </Link>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-[#141414] rounded-xl border border-[#222] overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-[#222] bg-[#1a1a1a]">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold">Order {order.id}</h2>
                    <span className="px-3 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[#888] text-sm">
                    Placed on {new Date(order.date).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">£{order.total.toFixed(2)}</p>
                  <p className="text-[#888] text-sm">{order.items.length} items</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[#888] text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">£{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="p-6 border-t border-[#222] bg-[#1a1a1a]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[#666] mb-1">Shipping Method</p>
                  <p className="font-medium">{order.shipping.method}</p>
                  {order.shipping.tracking && (
                    <p className="text-[#00d4aa] text-xs mt-1">
                      Tracking: {order.shipping.tracking}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[#666] mb-1">Payment Method</p>
                  <p className="font-medium">{order.payment.method}</p>
                </div>
                <div className="text-right">
                  <button className="text-[#00d4aa] text-sm hover:underline">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
