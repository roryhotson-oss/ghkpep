'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  institution?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
}

export default function AdminChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/messages')
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!response.ok) {
          setError(data.error || 'Failed to load messages');
          return;
        }
        setMessages(data.messages);
      })
      .catch(() => setError('Failed to load messages'));
  }, []);

  const updateStatus = async (id: string, status: Message['status']) => {
    const response = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) return;
    setMessages((current) => current.map((message) => message.id === id ? { ...message, status } : message));
    setSelected((current) => current?.id === id ? { ...current, status } : current);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Support Inbox</h1>
        <p className="text-[#a7b0b2]">Review customer messages and track replies.</p>
      </div>
      {error && <p className="mb-6 text-red-400 text-sm">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#2b3538] rounded-xl divide-y divide-[#2b3538]">
          {messages.length === 0 ? <p className="p-6 text-[#a7b0b2] text-sm">No support messages yet.</p> : messages.map((message) => (
            <button key={message.id} onClick={() => { setSelected(message); if (message.status === 'new') updateStatus(message.id, 'read'); }} className={`w-full text-left p-4 hover:bg-[#1a1a1a] transition ${selected?.id === message.id ? 'bg-[#1a1a1a]' : ''}`}>
              <div className="flex justify-between gap-3"><span className="text-white text-sm font-medium truncate">{message.name}</span><span className="text-[#21c7a5] text-xs">{message.status}</span></div>
              <p className="text-[#e1e7e5] text-sm truncate mt-1">{message.subject}</p>
              <p className="text-[#7b898e] text-xs mt-1">{new Date(message.created_at).toLocaleString('en-GB')}</p>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 bg-[#141414] border border-[#2b3538] rounded-xl p-6">
          {selected ? <>
            <div className="flex flex-wrap justify-between gap-4 border-b border-[#2b3538] pb-4 mb-6">
              <div><h2 className="text-xl font-bold text-white">{selected.subject}</h2><p className="text-[#a7b0b2] text-sm mt-1">{selected.name} · {selected.email}</p>{selected.institution && <p className="text-[#7b898e] text-xs mt-1">{selected.institution}</p>}</div>
              <select value={selected.status} onChange={(event) => updateStatus(selected.id, event.target.value as Message['status'])} className="bg-[#1a1a1a] border border-[#2b3538] rounded-lg px-3 py-2 text-sm text-white"><option value="new">New</option><option value="read">Read</option><option value="responded">Responded</option></select>
            </div>
            <p className="text-[#e1e7e5] text-sm whitespace-pre-wrap leading-relaxed">{selected.message}</p>
            <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className="inline-block mt-8 px-4 py-2 bg-[#21c7a5] text-black font-semibold rounded-lg text-sm">Reply by email</a>
          </> : <p className="text-[#a7b0b2] text-sm">Select a message to view the conversation.</p>}
        </div>
      </div>
    </div>
  );
}