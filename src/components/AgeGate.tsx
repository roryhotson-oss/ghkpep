'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [accepted, setAccepted] = useState(false);
  const [consentChoice, setConsentChoice] = useState<string | null>(null);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [age, setAge] = useState(false);
  const [researcher, setResearcher] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAgeGate = () => {
      const stored = localStorage.getItem('ghk-age-gate');
      if (stored === 'true') {
        setAccepted(true);
      }
      setConsentChoice(localStorage.getItem('ghk-cookie-consent'));
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

  const handleConsent = (choice: string) => {
    try {
      localStorage.setItem('ghk-cookie-consent', choice);
    } catch {
      // Continue even if localStorage is blocked.
    }
    setConsentChoice(choice);
  };

  if (accepted && consentChoice !== null) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center bg-[#141414] rounded-2xl border border-[#2b3538] p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">GHKpep</span></h1>
        <p className="text-[#a7b0b2] text-sm mb-8">GHK supplies research compounds strictly for in-vitro laboratory/research use — not for human or veterinary consumption.</p>

        <div className="space-y-4 text-left mb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={age} onChange={(e) => { setAge(e.target.checked); setErrorMessage(''); }} className="mt-1 w-5 h-5 accent-[#21c7a5] cursor-pointer" />
            <span className="text-sm text-[#e1e7e5] group-hover:text-white transition">I am at least <strong>21 years of age</strong>.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={researcher} onChange={(e) => { setResearcher(e.target.checked); setErrorMessage(''); }} className="mt-1 w-5 h-5 accent-[#21c7a5] cursor-pointer" />
            <span className="text-sm text-[#e1e7e5] group-hover:text-white transition">I confirm I am a <strong>qualified researcher</strong> purchasing for <strong>in vitro / laboratory research</strong> only — not for human or veterinary use.</span>
          </label>
        </div>

        {errorMessage && <div className="bg-red-900/30 border border-red-400/50 rounded-lg p-3 mb-4"><p className="text-red-300 text-sm font-medium">{errorMessage}</p></div>}

        <button type="button" onClick={handleEnter} className="px-8 py-4 bg-[#21c7a5] text-black font-bold rounded-lg hover:bg-[#16a98d] transition cursor-pointer text-lg">Enter GHK</button>

        <p className="text-[#7b898e] text-xs mt-6">By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not for use in diagnostic procedures, and have not been evaluated by the MHRA.</p>
      </div>

      {consentChoice === null && (
        <div className="absolute inset-0 bg-[#071624]/75 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white text-[#101820] rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-[#dce5eb]">
              <div className="px-4 sm:px-8 py-5 text-center border-b-4 border-[#139fe8] text-[#118cca] font-bold">Consent</div>
              <div className="px-4 sm:px-8 py-5 text-center font-semibold">Details</div>
              <div className="px-4 sm:px-8 py-5 text-center font-semibold">About Cookies</div>
            </div>
            <div className="p-6 sm:p-10">
              <h2 className="text-lg font-bold mb-3">This website uses cookies</h2>
              <p className="text-[#63717a] leading-relaxed">We use cookies to keep the site secure, remember your preferences, and understand how visitors use our services.</p>
              {showCookieSettings && <div className="mt-6 space-y-3 border-t border-[#dce5eb] pt-5 text-sm">
                <label className="flex items-center justify-between gap-4"><span><strong>Necessary cookies</strong><span className="block text-xs text-[#63717a]">Required for security, consent, and cart features.</span></span><input type="checkbox" checked disabled className="accent-[#139fe8]" /></label>
                <label className="flex items-center justify-between gap-4"><span><strong>Analytics cookies</strong><span className="block text-xs text-[#63717a]">Help us understand site usage.</span></span><input type="checkbox" checked={analyticsCookies} onChange={(event) => setAnalyticsCookies(event.target.checked)} className="accent-[#139fe8]" /></label>
                <label className="flex items-center justify-between gap-4"><span><strong>Marketing cookies</strong><span className="block text-xs text-[#63717a]">Used for relevant communications.</span></span><input type="checkbox" checked={marketingCookies} onChange={(event) => setMarketingCookies(event.target.checked)} className="accent-[#139fe8]" /></label>
              </div>}
              <div className="grid sm:grid-cols-3 gap-3 mt-8">
                <button type="button" onClick={() => handleConsent('denied')} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Deny</button>
                {showCookieSettings ? <button type="button" onClick={() => handleConsent(`custom:analytics=${analyticsCookies};marketing=${marketingCookies}`)} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Save choices</button> : <button type="button" onClick={() => setShowCookieSettings(true)} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Customize</button>}
                <button type="button" onClick={() => handleConsent('all')} className="px-5 py-4 bg-[#139fe8] text-white rounded-xl font-semibold hover:bg-[#0b87c9] transition">Allow all</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
