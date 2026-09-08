'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [accepted, setAccepted] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);
  const [consentChoice, setConsentChoice] = useState<string | null>(null);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [age, setAge] = useState(false);
  const [researcher, setResearcher] = useState(false);
  const [globalSourcing, setGlobalSourcing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAgeGate = () => {
      try {
        const stored = localStorage.getItem('ghk-age-gate');
        if (stored === 'true') {
          setAccepted(true);
          // Re-set the cookie if it expired — localStorage persists but the cookie
          // expires in 30 days, and the middleware checks the cookie, not localStorage.
          // Without this, the gate hides but the middleware rewrites every link back to /.
          if (!document.cookie.includes('ghk-age-gate=true')) {
            document.cookie = 'ghk-age-gate=true; path=/; max-age=2592000; SameSite=Lax';
          }
        }
        setConsentChoice(localStorage.getItem('ghk-cookie-consent'));
      } catch {
        setConsentChoice('denied');
      } finally {
        setStorageChecked(true);
      }
    };
    checkAgeGate();
  }, []);

  const handleEnter = () => {
    if (!age || !researcher || !globalSourcing) {
      setErrorMessage('Please confirm all three statements below to continue');
      return;
    }
    setErrorMessage('');
    try {
      localStorage.setItem('ghk-age-gate', 'true');
      document.cookie = 'ghk-age-gate=true; path=/; max-age=2592000; SameSite=Lax';
    } catch {
      // Ignore if localStorage is blocked
    }
    setAccepted(true);
  };

  const handleConsent = (choice: string) => {
    try {
      localStorage.setItem('ghk-cookie-consent', choice);
      localStorage.setItem('va-disable', choice === 'denied' ? '1' : '0');
    } catch {
      // Continue even if localStorage is blocked.
    }
    setConsentChoice(choice);
  };

  if (!storageChecked || (accepted && consentChoice !== null)) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="max-w-lg w-full text-center text-[#e6edf3] bg-[#0c1622] rounded-2xl border border-[#FBFAF7]/70 p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2"><span className="gradient-text">GHK Peptides</span></h1>
        <p className="text-[#a7b0b2] text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">GHK Peptides supplies batch documented research peptides to qualified laboratories and researchers conducting legitimate non clinical work. Nothing sold here is a medicine, treatment, or product for administration to a person or animal.</p>

        <div className="space-y-3 text-left mb-5 sm:mb-8">
          <label className="flex items-start gap-3 rounded-xl border border-[#FBFAF7]/70 bg-[#101010] p-3 sm:p-4 cursor-pointer group">
            <input type="checkbox" checked={age} onChange={(e) => { setAge(e.target.checked); setErrorMessage(''); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[#8298aa] cursor-pointer" />
            <span className="text-sm sm:text-base leading-relaxed text-[#e1e7e5] group-hover:text-white transition">I confirm that I am at least <strong>21 years of age</strong> and legally permitted to access this site and purchase research materials.</span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-[#FBFAF7]/70 bg-[#101010] p-3 sm:p-4 cursor-pointer group">
            <input type="checkbox" checked={researcher} onChange={(e) => { setResearcher(e.target.checked); setErrorMessage(''); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[#8298aa] cursor-pointer" />
            <span className="text-sm sm:text-base leading-relaxed text-[#e1e7e5] group-hover:text-white transition">I confirm that I am a <strong>qualified researcher</strong>. I will use these materials only for lawful laboratory or <strong>in vitro research</strong> and will never administer them to a person or animal.</span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-[#FBFAF7]/70 bg-[#101010] p-3 sm:p-4 cursor-pointer group">
            <input type="checkbox" checked={globalSourcing} onChange={(e) => { setGlobalSourcing(e.target.checked); setErrorMessage(''); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[#8298aa] cursor-pointer" />
            <span className="text-sm sm:text-base leading-relaxed text-[#e1e7e5] group-hover:text-white transition">I understand that products may be sourced internationally. I will check the rules that apply where I live and take responsibility for lawful purchase, import, storage, and research use.</span>
          </label>
        </div>

        {errorMessage && <div className="bg-red-900/30 border border-red-400/50 rounded-lg p-3 mb-4"><p className="text-red-300 text-sm font-medium">{errorMessage}</p></div>}

        <button type="button" onClick={handleEnter} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#0c1622] text-white font-bold rounded-lg hover:bg-[#16283c] shadow-lg shadow-[#3E6B93]/20 transition cursor-pointer text-base sm:text-lg">Enter GHK</button>

        <p className="text-[#7b898e] text-xs leading-relaxed mt-4 sm:mt-6">By selecting Enter GHK, you confirm that these declarations are accurate and accept responsibility for your access and use of the materials. GHK Peptides does not accept liability for use outside the stated research purpose. These products are not for human or veterinary use or diagnostic procedures, and have not been evaluated by the MHRA.</p>
      </div>

      {accepted && consentChoice === null && (
        <div className="absolute inset-0 bg-[#071624]/75 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white text-[#101820] rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-[#dce5eb]">
              <div className="px-4 sm:px-8 py-5 text-center border-b-4 border-[#8298aa] text-[#118cca] font-bold">Consent</div>
              <div className="px-4 sm:px-8 py-5 text-center font-semibold">Details</div>
              <div className="px-4 sm:px-8 py-5 text-center font-semibold">About Cookies</div>
            </div>
            <div className="p-6 sm:p-10">
              <h2 className="text-lg font-bold mb-3">This website uses cookies</h2>
              <p className="text-[#63717a] leading-relaxed">We use cookies to keep the site secure, remember your preferences, and understand how visitors use our services.</p>
              {showCookieSettings && <div className="mt-6 space-y-3 border-t border-[#dce5eb] pt-5 text-sm">
                <label className="flex items-center justify-between gap-4"><span><strong>Necessary cookies</strong><span className="block text-xs text-[#63717a]">Required for security, consent, and cart features.</span></span><input type="checkbox" checked disabled className="accent-[#8298aa]" /></label>
                <label className="flex items-center justify-between gap-4"><span><strong>Analytics cookies</strong><span className="block text-xs text-[#63717a]">Help us understand site usage.</span></span><input type="checkbox" checked={analyticsCookies} onChange={(event) => setAnalyticsCookies(event.target.checked)} className="accent-[#8298aa]" /></label>
                <label className="flex items-center justify-between gap-4"><span><strong>Marketing cookies</strong><span className="block text-xs text-[#63717a]">Used for relevant communications.</span></span><input type="checkbox" checked={marketingCookies} onChange={(event) => setMarketingCookies(event.target.checked)} className="accent-[#8298aa]" /></label>
              </div>}
              <div className="grid sm:grid-cols-3 gap-3 mt-8">
                <button type="button" onClick={() => handleConsent('denied')} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Deny</button>
                {showCookieSettings ? <button type="button" onClick={() => handleConsent(`custom:analytics=${analyticsCookies};marketing=${marketingCookies}`)} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Save choices</button> : <button type="button" onClick={() => setShowCookieSettings(true)} className="px-5 py-4 bg-[#edf0f2] rounded-xl font-semibold hover:bg-[#dfe5e8] transition">Customize</button>}
                <button type="button" onClick={() => handleConsent('all')} className="px-5 py-4 bg-[#0c1622] text-white rounded-xl font-semibold hover:bg-[#16283c] transition">Allow all</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
