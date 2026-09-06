'use client';

import { FormEvent, useState } from 'react';

type Product = {
  name: string;
  lot: string;
};

export default function VerifyForm() {
  const [lot, setLot] = useState('');
  const [result, setResult] = useState<Product | null>(null);
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestedLot = lot.trim().toUpperCase();
    if (!requestedLot) {
      setResult(null);
      setStatus('not-found');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Product lookup failed');
      const data = await response.json() as { products?: Product[] };
      const product = data.products?.find((item) => item.lot.toUpperCase() === requestedLot) || null;
      setResult(product);
      setStatus(product ? 'found' : 'not-found');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={lot}
          onChange={(event) => { setLot(event.target.value); setStatus('idle'); }}
          placeholder="Enter lot number (e.g. GHK-2419-A)"
          aria-label="Lot number"
          className="flex-1 text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
        />
        <button type="submit" disabled={loading} className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-lg border border-[#FBFAF7] hover:bg-[#16283c] transition text-sm disabled:opacity-60">
          {loading ? 'Checking...' : 'Verify'}
        </button>
      </form>

      {status === 'found' && result && (
        <div className="mt-6 rounded-lg border border-[#FBFAF7]/70 bg-[#17232d] p-5">
          <p className="text-[#a6b8c4] text-sm font-semibold">Lot found</p>
          <h2 className="text-lg font-bold mt-1">{result.name}</h2>
          <p className="text-[#a7b0b2] text-sm mt-1">Lot {result.lot} appears in our catalogue records. This confirms the lot reference only — it is not confirmation of any test result.</p>
        </div>
      )}
      {status === 'not-found' && <p className="mt-4 text-sm text-amber-200">No matching lot was found. Check the characters on the vial label and try again.</p>}
      {status === 'error' && <p className="mt-4 text-sm text-red-300">The lot could not be checked right now. Please try again.</p>}
    </div>
  );
}