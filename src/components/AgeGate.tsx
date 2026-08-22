'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [accepted, setAccepted] = useState(false);
  const [age, setAge] = useState(false);
  const [researcher, setResearcher] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAgeGate = () => {
      const stored = localStorage.getItem('ghk-age-gate');
      if (stored === 'true') {
        setAccepted(true);
      }
    };
    checkAgeGate();
  }, []);

  const handleEnter = () => {
    if (!age || !researcher) {
      setErrorMessage('⚠️ Please check both boxes below to continue');
      return;
    }
    setErrorMessage('');
    try {
      localStorage.setItem('ghk-age-gate', 'true');
    } catch {
      // Ignore if localStorage is blocked
    }
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">GHK</span>
        </h1>
        <p className="text-[#888] text-sm mb-8">
          GHK supplies research compounds strictly for in-vitro laboratory/research use — not for human or veterinary consumption. By entering you confirm you are at least 21 and agree to our terms &amp; conditions.
        </p>

        <div className="space-y-4 text-left mb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={age}
              onChange={(e) => { setAge(e.target.checked); setErrorMessage(''); }}
              className="mt-1 w-5 h-5 accent-[#00d4aa] cursor-pointer"
            />
            <span className="text-sm text-[#ccc] group-hover:text-white transition">I am at least <strong>21 years of age</strong>.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={researcher}
              onChange={(e) => { setResearcher(e.target.checked); setErrorMessage(''); }}
              className="mt-1 w-5 h-5 accent-[#00d4aa] cursor-pointer"
            />
            <span className="text-sm text-[#ccc] group-hover:text-white transition">I confirm I am a <strong>qualified researcher</strong> purchasing for <strong>in vitro / laboratory research</strong> only — not for human or veterinary use.</span>
          </label>
        </div>

        {errorMessage && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm font-medium">
              {errorMessage}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleEnter}
          className="px-8 py-4 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition cursor-pointer text-lg"
        >
          Enter GHK
        </button>

        <p className="text-[#666] text-xs mt-6">
          By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not for use in diagnostic procedures, and have not been evaluated by the Medicines and Healthcare products Regulatory Agency (MHRA).
        </p>
      </div>
    </div>
  );
}
