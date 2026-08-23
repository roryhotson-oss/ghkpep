'use client';

import { useState } from 'react';

export default function ContactSupportFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', institution: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-4">Get in touch</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[#a7b0b2] block">Email</span>
                <span className="text-[#21c7a5]">Contact us via the form or checkout options</span>
              </div>
              <div>
                <span className="text-[#a7b0b2] block">Response Time</span>
                <span className="text-[#e1e7e5]">Within 24 hours</span>
              </div>
              <div>
                <span className="text-[#a7b0b2] block">Location</span>
                <span className="text-[#e1e7e5]">United Kingdom</span>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-3">Payment Methods</h3>
            <div className="space-y-2 text-sm text-[#a7b0b2]">
              <p>✓ Alipay</p>
              <p>✓ Bank Transfer (BACS/CHAPS)</p>
              <p>✓ Cryptocurrency (BTC, ETH, USDT)</p>
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-3">Shipping</h3>
            <p className="text-sm text-[#a7b0b2]">All orders shipped via <span className="text-[#21c7a5] font-medium">Trusted Labs</span> — tracked, discreet, and insured.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {status === 'success' ? (
            <div className="bg-[#141414] rounded-xl p-8 border border-[#2b3538] text-center">
              <div className="text-[#21c7a5] text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-[#a7b0b2] mb-6">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#141414] rounded-xl p-6 sm:p-8 border border-[#2b3538] space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#a7b0b2] mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#21c7a5]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a7b0b2] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#21c7a5]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-1">Institution / Lab</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#21c7a5]"
                  placeholder="Your institution (optional)"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#21c7a5]"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a7b0b2] mb-1">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#21c7a5] resize-none"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>
              {status === 'error' ? (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
                  Failed to send message. Please try again or contact us via WhatsApp or Telegram from the checkout page.
                </div>
              ) : null}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
