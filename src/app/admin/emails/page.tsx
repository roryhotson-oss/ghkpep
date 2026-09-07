'use client';

import { useEffect, useState } from 'react';

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}
interface Customer {
  email: string;
  name: string;
}

type RecipientMode = 'all-subscribers' | 'all-customers' | 'custom';

export default function AdminEmailsPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    recipients: 'custom' as RecipientMode,
    to: '',
    subject: '',
    html: '',
  });

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('/api/admin/email');
        if (res.ok) {
          const data = await res.json();
          await new Promise<void>((resolve) => {
            setSubscribers(data.subscribers);
            setCustomers(data.customers || []);
            resolve();
          });
        }
      } catch (err) {
        console.error('Failed to fetch subscribers:', err);
      } finally {
        await new Promise<void>((resolve) => {
          setLoading(false);
          resolve();
        });
      }
    };
    fetchSubscribers();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        recipients: form.recipients,
        to: form.recipients === 'custom' ? form.to.split(',').map(e => e.trim()).filter(Boolean) : undefined,
        subject: form.subject,
        html: form.html,
      };

      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await new Promise<void>((resolve) => {
          setResult(data.results);
          resolve();
        });
        await new Promise<void>((resolve) => {
          setForm({ ...form, subject: '', html: '' });
          resolve();
        });
      } else {
        await new Promise<void>((resolve) => {
          setError(data.error || 'Failed to send emails');
          resolve();
        });
      }
    } catch {
      await new Promise<void>((resolve) => {
        setError('Failed to send emails');
        resolve();
      });
    } finally {
      await new Promise<void>((resolve) => {
        setSending(false);
        resolve();
      });
    }
  };

  const templates = [
    {
      name: 'New Product Announcement',
      subject: 'New Research Compound Available at GHK Peptides',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
  </div>
  <h2 style="color: #333;">New Product Available!</h2>
  <p style="color: #7b898e; line-height: 1.6;">We are pleased to announce a new research compound now available in our catalog.</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0;"><strong>Product:</strong> [Product Name]</p>
    <p style="margin: 10px 0 0 0;"><strong>Price:</strong> £[Price]</p>
    <p style="margin: 10px 0 0 0;"><strong>Purity:</strong> [Purity]</p>
  </div>
  <p style="color: #7b898e;">Visit our shop to learn more and place your order.</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://ghkpep.com/shop" style="display: inline-block; padding: 12px 30px; background: #8298aa; color: #000; font-weight: bold; border-radius: 8px; text-decoration: none;">Shop Now</a>
  </div>
</div>`,
    },
    {
      name: 'Newsletter / Update',
      subject: 'GHK Peptides - Latest Updates',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
  </div>
  <h2 style="color: #333;">Latest Updates</h2>
  <p style="color: #7b898e; line-height: 1.6;">Dear Researcher,</p>
  <p style="color: #7b898e; line-height: 1.6;">We wanted to share some exciting updates from GHK Peptides...</p>
  <p style="color: #7b898e; line-height: 1.6;">[Your content here]</p>
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
    <p>You received this email because you subscribed to GHK Peptides updates.</p>
  </div>
</div>`,
    },
    {
      name: 'Promotional Offer',
      subject: 'Special Offer from GHK Peptides',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #8298aa; font-size: 32px; margin: 0;">GHK Peptides</h1>
  </div>
  <div style="text-align: center; margin: 30px 0;">
    <h2 style="color: #333; font-size: 28px;">[Discount]% Off</h2>
    <p style="color: #7b898e;">Use code: <strong style="color: #8298aa; font-size: 20px;">[CODE]</strong></p>
  </div>
  <p style="color: #7b898e; line-height: 1.6; text-align: center;">Valid until [Date]. Terms and conditions apply.</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://ghkpep.com/shop" style="display: inline-block; padding: 12px 30px; background: #8298aa; color: #000; font-weight: bold; border-radius: 8px; text-decoration: none;">Shop Now</a>
  </div>
</div>`,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#a7b0b2]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Email Campaigns</h1>
        <p className="text-[#a7b0b2]">{subscribers.length} subscribers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSend} className="space-y-4">
            {/* Recipients */}
            <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
              <h2 className="text-lg font-bold text-white mb-4">Recipients</h2>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, recipients: 'all-subscribers' })}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm border transition ${
                    form.recipients === 'all-subscribers'
                      ? 'bg-[#8298aa]/10 border-[#8298aa] text-[#8298aa]'
                      : 'bg-[#111d2c] border-[#FBFAF7]/70 text-[#a7b0b2] hover:border-[#FBFAF7]/70'
                  }`}
                >
                  All Subscribers ({subscribers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, recipients: 'all-customers' })}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm border transition ${
                    form.recipients === 'all-customers'
                      ? 'bg-[#8298aa]/10 border-[#8298aa] text-[#8298aa]'
                      : 'bg-[#111d2c] border-[#FBFAF7]/70 text-[#a7b0b2] hover:border-[#FBFAF7]/70'
                  }`}
                >
                  All Customers ({customers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, recipients: 'custom' })}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm border transition ${
                    form.recipients === 'custom'
                      ? 'bg-[#8298aa]/10 border-[#8298aa] text-[#8298aa]'
                      : 'bg-[#111d2c] border-[#FBFAF7]/70 text-[#a7b0b2] hover:border-[#FBFAF7]/70'
                  }`}
                >
                  Custom List
                </button>
              </div>
              {form.recipients === 'custom' && (
                <textarea
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  placeholder="Enter email addresses, separated by commas"
                  rows={3}
                  className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition resize-none"
                />
              )}
            </div>

            {/* Subject */}
            <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
              <label className="block text-sm text-[#a7b0b2] mb-2">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8298aa] transition"
                placeholder="Email subject line"
                required
              />
            </div>

            {/* Body */}
            <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
              <label className="block text-sm text-[#a7b0b2] mb-2">Email Body (HTML)</label>
              <textarea
                value={form.html}
                onChange={(e) => setForm({ ...form, html: e.target.value })}
                rows={15}
                className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#8298aa] transition resize-none"
                placeholder="<div>Your HTML email content here...</div>"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            {result && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                ✓ Sent {result.sent} emails successfully{result.failed > 0 ? `, ${result.failed} failed` : ''}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="px-8 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg hover:bg-[#16283c] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Emails'}
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
            <h2 className="text-lg font-bold text-white mb-4">Quick Templates</h2>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => setForm({ ...form, subject: template.subject, html: template.html })}
                  className="w-full text-left px-4 py-3 bg-[#111d2c] rounded-lg border border-[#FBFAF7]/70 hover:border-[#8298aa]/30 transition"
                >
                  <p className="text-white text-sm font-medium">{template.name}</p>
                  <p className="text-[#a7b0b2] text-xs mt-1">{template.subject}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Subscribers List */}
          <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
            <h2 className="text-lg font-bold text-white mb-4">Subscribers ({subscribers.length})</h2>
            {subscribers.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {subscribers.slice(0, 50).map((sub) => (
                  <div key={sub.email} className="flex justify-between items-center py-1">
                    <span className="text-[#e1e7e5] text-sm truncate">{sub.email}</span>
                    <span className="text-[#7b898e] text-xs flex-shrink-0">{new Date(sub.subscribedAt).toLocaleDateString('en-GB')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#a7b0b2] text-sm">No subscribers yet. They will appear when visitors sign up for the newsletter.</p>
            )}
          </div>

          {/* Config Notice */}
          <div className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">Email Configuration</h2>
            <p className="text-[#a7b0b2] text-sm">
              Email sending requires SMTP credentials. Set <code className="text-[#8298aa]">SMTP_USER</code> and <code className="text-[#8298aa]">SMTP_PASSWORD</code> in your environment variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
