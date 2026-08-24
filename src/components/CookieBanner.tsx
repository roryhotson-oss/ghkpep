'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ghk-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(STORAGE_KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      localStorage.setItem('va-disable', choice === 'denied' ? '1' : '0');
    } catch {
      // Continue even when browser storage is unavailable.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-[80] p-4">
      <div className="mx-auto max-w-3xl border border-[#cbdbe6] bg-white p-5 text-[#10263d] shadow-2xl">
        <h2 className="text-sm font-bold">We value your privacy</h2>
        <p className="mt-2 text-xs leading-6 text-[#425b6d]">
          We use essential cookies to keep the site secure and remember your consent choice. Optional analytics cookies are off unless you choose to allow them.
        </p>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => choose('denied')} className="border border-[#b7cbd8] px-4 py-2 text-xs font-semibold text-[#425b6d] hover:bg-[#eef4f8]">
            Reject optional
          </button>
          <button type="button" onClick={() => choose('all')} className="bg-[#237c78] px-4 py-2 text-xs font-semibold text-white hover:bg-[#185d66]">
            Allow optional
          </button>
        </div>
      </div>
    </aside>
  );
}
