'use client';

import { FormEvent, useState } from 'react';

/**
 * Janoshik Analytical report lookup.
 *
 * Compliance note: this component performs NO verification of its own and must
 * never state that a report is valid, authentic, or passed. It only forwards the
 * identifiers printed on a supplier's report to Janoshik's own verification page,
 * so the result comes from the testing laboratory rather than from us.
 */

const JANOSHIK_VERIFY_BASE = 'https://janoshik.com/tests/';

export default function JanoshikLookup() {
  const [reportId, setReportId] = useState('');
  const [code, setCode] = useState('');
  const [touched, setTouched] = useState(false);

  const cleanId = reportId.trim().replace(/[^A-Za-z0-9-]/g, '');
  const cleanCode = code.trim().replace(/[^A-Za-z0-9-]/g, '');
  const ready = cleanId.length > 0;

  const verifyUrl = cleanCode
    ? `${JANOSHIK_VERIFY_BASE}${encodeURIComponent(cleanId)}/${encodeURIComponent(cleanCode)}`
    : `${JANOSHIK_VERIFY_BASE}${encodeURIComponent(cleanId)}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!ready) return;
    window.open(verifyUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section
      id="janoshik"
      className="scroll-mt-24 text-[#e6edf3] bg-[#0a1420] rounded-3xl border-4 border-[#FBFAF7] shadow-md max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-[#8298aa] text-sm font-medium mb-2">Independent laboratory</p>
        <h2 className="text-3xl font-bold">Search Janoshik reports</h2>
        <p className="text-[#a7b0b2] mt-3 max-w-3xl">
          Some of the laboratories we source from have their material tested by Janoshik Analytical,
          an independent testing laboratory. If your vial or supplier documentation carries a Janoshik
          report number, you can check it directly with Janoshik using the form below. The result comes
          from Janoshik, not from GHK Peptides.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1.2fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor="janoshik-report" className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#a7b0b2] mb-1.5">
              Report number
            </label>
            <input
              id="janoshik-report"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={reportId}
              onChange={(event) => { setReportId(event.target.value); setTouched(false); }}
              placeholder="e.g. 24051"
              className="w-full text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
            />
          </div>

          <div>
            <label htmlFor="janoshik-code" className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#a7b0b2] mb-1.5">
              Access code <span className="font-normal normal-case tracking-normal text-[#7b898e]">(if printed)</span>
            </label>
            <input
              id="janoshik-code"
              type="text"
              autoComplete="off"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Optional"
              className="w-full text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8298aa]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-lg hover:bg-[#16283c] transition text-sm whitespace-nowrap"
          >
            Open on Janoshik
          </button>
        </form>

        {touched && !ready && (
          <p className="mt-3 text-sm text-amber-200">
            Enter the report number exactly as printed on the supplier&apos;s document.
          </p>
        )}

        <p className="mt-5 text-xs leading-6 text-[#7b898e] max-w-3xl">
          This form opens Janoshik Analytical&apos;s own verification page in a new tab. GHK Peptides does
          not carry out analytical testing, does not hold laboratory accreditation, and does not verify,
          host, or alter Janoshik reports. Not every product we list has a Janoshik report; availability
          depends on the source laboratory and the individual batch. If no report is held for a lot, no
          Janoshik record will be found. Any report you retrieve should be read in full and assessed on
          its own terms.
        </p>

        <a
          href="https://janoshik.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-[#8298aa] hover:underline"
        >
          Go to janoshik.com
        </a>
      </div>
    </section>
  );
}
