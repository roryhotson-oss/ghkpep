'use client';

import { useEffect, useState } from 'react';

type Settings = Record<'paypalUrl' | 'alipayUrl' | 'alipayQrUrl' | 'cryptoUrl' | 'bankTransferUrl' | 'wiseUrl' | 'revolutDetails' | 'coinbaseUrl' | 'bitcoinAddress' | 'ethereumAddress' | 'usdtAddress', string>;

const emptySettings: Settings = {
  paypalUrl: '',
  alipayUrl: '', alipayQrUrl: '', cryptoUrl: '', bankTransferUrl: '', wiseUrl: '', revolutDetails: '',
  coinbaseUrl: '', bitcoinAddress: '', ethereumAddress: '', usdtAddress: '',
};

const fields: { key: keyof Settings; label: string; help: string; multiline?: boolean }[] = [
  { key: 'paypalUrl', label: 'PayPal payment URL', help: 'Use your PayPal.Me link or a hosted PayPal checkout URL.' },
  { key: 'alipayUrl', label: 'Alipay payment URL', help: 'Use a verified checkout or payment-instructions URL.' },
  { key: 'alipayQrUrl', label: 'Alipay QR code image path', help: 'Use a public image path such as /images/alipay-qr.png, or a hosted image URL.' },
  { key: 'cryptoUrl', label: 'Crypto payment URL', help: 'Use your hosted crypto checkout or instructions URL.' },
  { key: 'bankTransferUrl', label: 'Bank transfer instructions URL', help: 'Link to the current BACS or bank-transfer instructions.' },
  { key: 'wiseUrl', label: 'Wise payment URL', help: 'Use a Wise payment link or current Wise payment instructions.' },
  { key: 'revolutDetails', label: 'Revolut details', help: 'Account name, IBAN, or payment instructions shown to customers.', multiline: true },
  { key: 'coinbaseUrl', label: 'Coinbase Commerce URL', help: 'Hosted Coinbase Commerce checkout or payment URL.' },
  { key: 'bitcoinAddress', label: 'Bitcoin address', help: 'Only publish a dedicated receiving address.' },
  { key: 'ethereumAddress', label: 'Ethereum address', help: 'Only publish a dedicated receiving address.' },
  { key: 'usdtAddress', label: 'USDT address', help: 'Include the network in the instructions before accepting payment.' },
];

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/payment-settings').then(async (response) => {
      const data = await response.json();
      if (response.ok) setSettings({ ...emptySettings, ...data.settings });
      else setStatus(data.error || 'Failed to load settings');
    }).catch(() => setStatus('Failed to load settings'));
  }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Saving...');
    const response = await fetch('/api/admin/payment-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    const data = await response.json();
    setStatus(response.ok ? 'Payment settings saved.' : (data.error || 'Failed to save settings'));
    if (response.ok) setSettings({ ...emptySettings, ...data.settings });
  };

  return <div className="p-6 lg:p-8 max-w-3xl">
    <div className="mb-8"><h1 className="text-3xl font-bold text-white mb-2">Payment Settings</h1><p className="text-[#a7b0b2]">Update customer-facing payment destinations without redeploying.</p></div>
    <form onSubmit={save} className="space-y-4">
      {fields.map(({ key, label, help, multiline }) => <div key={key} className="text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-xl p-5">
        <label className="block text-sm text-white font-medium mb-2">{label}</label>
        {multiline ? <textarea value={settings[key]} onChange={(event) => setSettings({ ...settings, [key]: event.target.value })} rows={3} className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-white text-sm" /> : <input type={key.endsWith('Url') ? 'url' : 'text'} value={settings[key]} onChange={(event) => setSettings({ ...settings, [key]: event.target.value })} className="w-full bg-[#111d2c] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-white text-sm" />}
        <p className="text-[#7b898e] text-xs mt-2">{help}</p>
      </div>)}
      <div className="flex items-center gap-4"><button type="submit" className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg">Save Payment Settings</button>{status && <span className="text-sm text-[#a7b0b2]">{status}</span>}</div>
    </form>
  </div>;
}