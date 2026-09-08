import Link from 'next/link';

export default function TestingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Supplier documentation</p>
          <h1 className="text-3xl font-bold">Third-party testing documentation, where suppliers provide it.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            GHK Peptides does not carry out analytical testing and does not hold laboratory accreditation. Where the laboratories we source from provide third-party analytical documentation for a lot, we make it available unaltered. Scope and methods vary by supplier and by batch.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/coa" className="px-6 py-2 bg-[#8298aa]/20 border border-[#8298aa] text-[#d8e2e8] font-semibold rounded-lg text-sm shadow-sm hover:bg-[#8298aa]/35 transition">See batch references</Link>
            <Link href="/coa#janoshik" className="px-6 py-2 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg text-sm shadow-sm hover:bg-[#16283c] transition">Search Janoshik reports</Link>
          </div>
        </div>
      </section>

      {/* Testing Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-[#8298aa] text-sm font-medium mb-2">The Panel</p>
          <h2 className="text-2xl font-bold">Methods you may see on a supplier&apos;s report.</h2>
          <p className="text-[#a7b0b2] mt-2 max-w-3xl">These are the analytical methods commonly used for research peptides. Which of them appear for any given lot is determined by the source laboratory, and the supplier&apos;s own document states what was actually tested. The descriptions below are general explanations of each method, not a claim that every method is run on every batch.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { method: "RP-HPLC", title: "Purity", desc: "Reverse-phase HPLC separates the target compound from impurities and process residuals to give a purity figure." },
            { method: "Amino Acid Analysis", title: "Content Verification", desc: "Acid hydrolysis followed by amino acid quantification is used to check mass and concentration against the stated content." },
            { method: "ESI / MALDI-MS", title: "Identity Confirmation", desc: "Mass spectrometry compares measured molecular weight against the theoretical value for the sequence." },
            { method: "ICP-MS", title: "Heavy Metals Screening", desc: "Inductively coupled plasma mass spectrometry screens for elemental contaminants such as lead, arsenic, cadmium and mercury." },
            { method: "USP <71>", title: "Sterility Testing", desc: "Membrane filtration into growth media, incubated and inspected. Applied to some presentations only." },
            { method: "LAL", title: "Endotoxin Testing", desc: "Limulus amebocyte lysate assay quantifies bacterial endotoxin, relevant to cell-culture compatibility." },
            { method: "LC-MS/MS", title: "Fentanyl Screen", desc: "Targeted screen for fentanyl and fentanyl analogues. Carried out by some laboratories as a contamination check." },
            { method: "Documentation review", title: "What we do", desc: "We review the documentation a supplier provides before listing a lot, record the lot reference, and publish the supplier's document unaltered where we hold one." },
          ].map((test) => (
            <div key={test.title} className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] px-2 py-1 bg-[#111d2c] text-[#a7b0b2] rounded font-mono">{test.method}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{test.title}</h3>
              <p className="text-[#a7b0b2] text-sm leading-relaxed">{test.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Traceability */}
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <p className="text-[#8298aa] text-sm font-medium mb-2">Traceability</p>
            <h2 className="text-2xl font-bold">How a lot reaches you.</h2>
            <p className="text-[#a7b0b2] mt-2 max-w-2xl">We source finished, filled material from established laboratories rather than manufacturing it ourselves. Each lot reference we receive is recorded so material can be traced back to the supplier batch it came from.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: 1, title: "Supplier selection", desc: "Sourced from a small group of established laboratories" },
              { step: 2, title: "Documentation review", desc: "Supplier paperwork reviewed before a lot is listed" },
              { step: 3, title: "Lot reference recorded", desc: "Batch reference retained against the listing" },
              { step: 4, title: "Third-party report", desc: "Published unaltered where the supplier provides one" },
              { step: 5, title: "Storage & dispatch", desc: "Packed for transport appropriate to the material" },
              { step: 6, title: "Reference available", desc: "Lot reference searchable on the batch references page" },
            ].map((item) => (
              <div key={item.step} className="text-[#e6edf3] bg-[#0c1622] rounded-xl p-5 border border-[#FBFAF7]/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#8298aa] font-bold text-lg">{item.step}.</span>
                </div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-[#a7b0b2] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/coa" className="text-[#8298aa] text-sm hover:underline">Look up a lot reference →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Common questions about testing</h2>
        <div className="space-y-4 max-w-3xl">
          {[
            { q: "Who performs the testing?", a: "Any analytical testing is carried out by the source laboratory or by a third-party laboratory it engages — for example Janoshik Analytical. GHK Peptides does not perform analytical testing and does not hold laboratory accreditation." },
            { q: "Does every lot come with a third-party report?", a: "No. Availability depends on the source laboratory and the individual batch. Where we hold a supplier's analytical document for a lot, we make it available unaltered; where we do not, we say so rather than substituting our own." },
            { q: "Can I check a report independently?", a: "Yes. If your documentation carries a Janoshik report number, you can look it up directly with Janoshik from our batch references page. The result comes from the laboratory, not from us." },
            { q: "What does the downloadable summary contain?", a: "Catalogue and lot reference information only. It is not a certificate of analysis and reports no testing by or for GHK Peptides." },
          ].map((faq) => (
            <details key={faq.q} className="group text-[#e6edf3] bg-[#0c1622] rounded-xl border border-[#FBFAF7]/70 overflow-hidden">
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
