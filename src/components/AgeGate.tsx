'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [accepted, setAccepted] = useState(true);
  const [age, setAge] = useState(false);
  const [researcher, setResearcher] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ghk-age-gate');
    if (!stored) {
      setAccepted(false);
    }
  }, []);

  const handleEnter = () => {
    if (age && researcher) {
      localStorage.setItem('ghk-age-gate', 'true');
      setAccepted(true);
    }
  };

  if (accepted) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">GHK</span>
        </h1>
        <p className="text-[#888] text-sm mb-8">
          GHK supplies research compounds strictly for in-vitro laboratory/research use — not for human or veterinary consumption. By entering you confirm you are at least 21 and agree to our terms &amp; conditions.
        </p>

        <div className="space-y-4 text-left mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={age}
              onChange={(e) => setAge(e.target.checked)}
              className="mt-1 accent-[#00d4aa]"
            />
            <span className="text-sm text-[#ccc]">I am at least <strong>21 years of age</strong>.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={researcher}
              onChange={(e) => setResearcher(e.target.checked)}
              className="mt-1 accent-[#00d4aa]"
            />
            <span className="text-sm text-[#ccc]">I confirm I am a <strong>qualified researcher</strong> purchasing for <strong>in vitro / laboratory research</strong> only — not for human or veterinary use.</span>
          </label>
        </div>

        <button
          onClick={handleEnter}
          disabled={!age || !researcher}
          className="px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition disabled:opacity-30 disabled:cursor-not-allowed"
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
