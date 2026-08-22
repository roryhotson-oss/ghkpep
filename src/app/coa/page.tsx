export default function COAPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Identity Verified</p>
          <h1 className="text-3xl font-bold">Certificates of Analysis</h1>
          <p className="text-[#888] mt-3 max-w-2xl">Every compound we ship is independently tested and comes with full documentation of purity and identity verification.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Sample COA display */}
        <div className="bg-[#141414] rounded-xl border border-[#222] p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Certificate of Analysis</h2>
              <p className="text-[#888] text-sm">GHK-2419-A · GHK-Cu 100mg</p>
            </div>
            <span className="px-3 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full text-xs font-bold">Verified</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Compound</span>
              <p className="font-medium mt-1">GHK-Cu (Gly-His-Lys Copper Complex)</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Lot Number</span>
              <p className="font-medium mt-1">GHK-2419-A</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Identity (MS)</span>
              <p className="text-[#00d4aa] font-medium mt-1">✓ Confirmed</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Peptide Purity (HPLC)</span>
              <p className="text-[#00d4aa] font-medium mt-1">99.84%</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Sterility (PCR)</span>
              <p className="text-[#00d4aa] font-medium mt-1">No Growth</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Endotoxin (USP {'<85>'})</span>
              <p className="text-[#00d4aa] font-medium mt-1">NMT 0.05 EU/mL</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Fentanyl Screen</span>
              <p className="text-[#00d4aa] font-medium mt-1">Not Detected</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <span className="text-[#666] text-xs">Net Peptide Content</span>
              <p className="font-medium mt-1">98.2 mg</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#222] flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-[#666] text-xs block">Tested by</span>
              <span className="font-medium">Glyvantix Laboratories</span>
            </div>
            <div>
              <span className="text-[#666] text-xs block">Test date</span>
              <span className="font-medium">Jul 24, 2026</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-6 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg text-sm hover:bg-[#00b894] transition">
              Download PDF
            </button>
          </div>
        </div>

        <div className="text-center text-[#888] text-sm">
          <p>Certificates are published per-lot on each product page. Contact us for specific COA requests.</p>
        </div>
      </section>
    </div>
  );
}
