'use client';

import { useState } from 'react';

export default function MaintenanceContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Order or product enquiry',
          message: `Phone number: ${formData.phone}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error('Message could not be sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <p className="mt-4 border border-[#b9d2c0] bg-[#f2faf4] px-4 py-3 text-sm text-[#285c39]">
        Thanks. Your message has been sent, and a human will call you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4 border-t border-[#d8e3ec] pt-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#425b6d]">
          Name
          <input required value={formData.name} onChange={(event) => updateField('name', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" />
        </label>
        <label className="text-sm font-semibold text-[#425b6d]">
          Email
          <input required type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" />
        </label>
      </div>
      <label className="block text-sm font-semibold text-[#425b6d]">
        Phone number for callback
        <input required type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} className="mt-1 w-full border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" />
      </label>
      <label className="block text-sm font-semibold text-[#425b6d]">
        Your question or order request
        <textarea required minLength={10} rows={4} value={formData.message} onChange={(event) => updateField('message', event.target.value)} className="mt-1 w-full resize-y border border-[#cbdbe6] px-3 py-2 font-normal text-[#10263d]" placeholder="Tell us which product you are interested in and how many vials you need." />
      </label>
      {status === 'error' && <p className="text-sm text-[#9b2c2c]">We could not send your message. Please try again or email support@ghkpep.com.</p>}
      <button type="submit" disabled={status === 'sending'} className="bg-[#2e617e] px-5 py-2.5 font-bold text-white disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Send enquiry'}
      </button>
    </form>
  );
}
