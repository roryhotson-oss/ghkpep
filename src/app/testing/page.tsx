import Link from 'next/link';

export default function TestingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Independent Testing</p>
          <h1 className="text-3xl font-bold">Eight assays. Every batch. Published.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            Identity, purity, water content, fentanyl screen, endotoxin, and sterility — verified by an ISO/IEC 17025-accredited lab before any vial leaves the facility.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/coa" className="px-6 py-2 bg-[#8298aa]/20 border border-[#8298aa] text-[#d8e2e8] font-semibold rounded-lg text-sm shadow-sm hover:bg-[#8298aa]/35 transition">See batch test reports</Link>
            <Link href="/verify" className="px-6 py-2 bg-[#1b2731] border border-[#657c8f] text-[#d8e2e8] rounded-lg text-sm shadow-sm hover:bg-[#263744] hover:border-[#a6b8c4] transition">Verify a batch</Link>
          </div>
        </div>
      </section>

      {/* Testing Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-[#8298aa] text-sm font-medium mb-2">The Panel</p>
          <h2 className="text-2xl font-bold">What we test for, and how.</h2>
          <p className="text-[#a7b0b2] mt-2">Each method below is run per-lot. Limits reflect our internal release specification — typically tighter than pharmacopeial minimums.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { method: "RP-HPLC", title: "Purity", desc: "Reverse-phase HPLC with UV/DAD detection quantifies the target compound against impurities and process residuals.", limit: "≥ 99.0%", instrument: "Agilent 1260 Infinity II" },
            { method: "Amino Acid Analysis", title: "Content Verification", desc: "Acid hydrolysis followed by amino acid quantification verifies mass and concentration match the labeled potency.", limit: "Labeled potency confirmed", instrument: "Hitachi L-8900" },
            { method: "ESI / MALDI-MS", title: "Identity Confirmation", desc: "Mass spectrometry confirms exact molecular weight and detects any truncated or modified sequences.", limit: "± 0.1 Da of theoretical", instrument: "Thermo Q Exactive" },
            { method: "ICP-MS", title: "Heavy Metals Screening", desc: "Inductively coupled plasma mass spectrometry screens for lead, arsenic, cadmium, and mercury below USP <232> thresholds.", limit: "USP <232> limits", instrument: "Agilent 7900 ICP-MS" },
            { method: "USP <71>", title: "Sterility Testing", desc: "Membrane filtration into fluid thioglycollate and tryptic soy broth, incubated and inspected per USP <71>.", limit: "No growth at 14 days", instrument: "Membrane filtration" },
            { method: "LAL Kinetic Chromogenic", title: "Endotoxin Testing", desc: "Limulus amebocyte lysate assay quantifies bacterial endotoxin levels for cell-culture compatibility.", limit: "< 0.5 EU/mg", instrument: "Charles River Endosafe" },
            { method: "Independent Release Review", title: "Batch Conformity Verification", desc: "Final third party review confirms every assay result matches the lot's release specification and that the published COA is true to the vial.", limit: "Matches release spec & COA", instrument: "ISO/IEC 17025 lab review" },
            { method: "LC-MS/MS", title: "Fentanyl Screen", desc: "Targeted LC-MS/MS screen confirms absence of fentanyl and fentanyl analog contamination in every lot.", limit: "Not detected", instrument: "Sciex Triple Quad 6500+" },
          ].map((test) => (
            <div key={test.title} className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] px-2 py-1 bg-[#2b3538] text-[#a7b0b2] rounded font-mono">{test.method}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{test.title}</h3>
              <p className="text-[#a7b0b2] text-sm leading-relaxed mb-4">{test.desc}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7b898e]">Release limit</span>
                  <p className="text-[#8298aa] font-medium mt-0.5">{test.limit}</p>
                </div>
                <div>
                  <span className="text-[#7b898e]">Instrument</span>
                  <p className="text-[#e1e7e5] font-medium mt-0.5">{test.instrument}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chain of Custody */}
      <section className="bg-[#0d0d0d] border-y border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <p className="text-[#8298aa] text-sm font-medium mb-2">Chain of Custody</p>
            <h2 className="text-2xl font-bold">From synthesis to shelf, every sample is tracked.</h2>
            <p className="text-[#a7b0b2] mt-2 max-w-2xl">Each lot is assigned a unique identifier at the point of synthesis. That ID follows the material through purification, lyophilization, fill, and every test point — and is printed on the vial label and the COA.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: 1, title: "Synthesis complete", desc: "SPPS, 32 coupling steps" },
              { step: 2, title: "RP-HPLC purification", desc: "Pooled fractions ≥ 99.4%" },
              { step: 3, title: "Lyophilization", desc: "Residual H₂O 3.1%" },
              { step: 4, title: "Independent release panel", desc: "Documented assay review" },
              { step: 5, title: "Fill & seal", desc: "Argon-purged headspace" },
              { step: 6, title: "COA published", desc: "Available on product page" },
            ].map((item) => (
              <div key={item.step} className="bg-[#141414] rounded-xl p-5 border border-[#2b3538]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#8298aa] font-bold text-lg">{item.step}.</span>
                  <span className="text-xs text-[#7b898e] font-mono">LOT-2487</span>
                </div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-[#a7b0b2] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/verify" className="text-[#8298aa] text-sm hover:underline">Verify a lot →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Common questions about our testing</h2>
        <div className="space-y-4 max-w-3xl">
          {[
            { q: "Who performs the testing?", a: "Independent laboratories accredited to ISO/IEC 17025 perform identity, purity, and contamination assays. Our internal QC repeats HPLC on every lot as a release gate." },
            { q: "When is the COA published?", a: "Before the lot is released to fulfillment. If a lot has no COA on its product page, it cannot ship." },
            { q: "What happens if a batch fails?", a: "It is quarantined and destroyed. We do not downgrade, re-sell, or sub-brand failed material." },
            { q: "Can I see raw chromatograms?", a: "Yes — every published COA links to the full HPLC trace and mass spectrum as PDFs." },
          ].map((faq) => (
            <details key={faq.q} className="group bg-[#141414] rounded-xl border border-[#2b3538] overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 font-semibold text-sm flex items-center justify-between hover:text-[#8298aa] transition">
                {faq.q}
                <span className="text-[#8298aa] group-open:rotate-45 transition-transform text-lg ml-4">+</span>
              </summary>
              <div className="px-6 pb-4 text-[#a7b0b2] text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
