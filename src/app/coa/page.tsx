'use client';

import { useState, useEffect, useRef } from 'react';
import JanoshikLookup from '@/components/JanoshikLookup';

interface COAData {
  productSlug: string;
  documentUrl: string;
  productName: string;
  lotNumber: string;
  purityReference: string;
  netContent: string;
}

/**
 * Compliance note: never derive evidence claims (identity, sterility, endotoxin,
 * screening results or "verified" status) from a seed, hash or product-name
 * substring. Only real per-lot data supplied by the source laboratory may be shown.
 */

export default function COAPage() {
  const [coaData, setCoaData] = useState<COAData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCOA, setSelectedCOA] = useState<COAData | null>(null);
  const reportModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reportModalRef.current?.scrollTo({ top: 0 });
  }, [selectedCOA]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const products = data.products || [];
        const coas: COAData[] = products.map((product: { slug: string; name: string; lot: string; purity: string }) => ({
          productSlug: product.slug,
          documentUrl: `/api/coa?lot=${encodeURIComponent(product.lot)}`,
          productName: product.name,
          lotNumber: product.lot,
          purityReference: product.purity || 'Not stated',
          netContent: product.name.split(' ').at(-1) ?? '—',
        }));
        setCoaData(coas);
      })
      .catch(() => {});
  }, []);

  const filteredCOAs = coaData.filter(coa => 
    coa.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coa.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="text-[#e6edf3] bg-[#0a1420] rounded-3xl border-4 border-[#FBFAF7] shadow-md max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Batch References</p>
          <h1 className="text-3xl font-bold">Batch references &amp; independent reports</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            Look up the catalogue and lot reference information we hold for each batch. GHK Peptides does not carry out analytical testing. Where a source laboratory provides third-party analytical documentation, it is supplied separately and unaltered, and independent reports can be checked directly with the testing laboratory below.
          </p>
        </div>
      </section>

      {/* Independent laboratory report lookup */}
      <JanoshikLookup />

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search by product name or lot number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-[#e6edf3] bg-[#0c1622] border border-[#FBFAF7]/70 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8298aa]"
          />
        </div>
      </div>

      {/* Batch analytical test report list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCOAs.map((coa) => (
            <div key={coa.lotNumber} className="text-[#e6edf3] bg-[#0c1622] rounded-xl border border-[#FBFAF7]/70 hover:border-[#8298aa]/30 transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{coa.productName}</h3>
                    <p className="text-[#a7b0b2] text-sm">Batch Number: {coa.lotNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg text-xs font-medium">
                    Reference summary
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Catalogue purity reference</span>
                    <span className="text-[#8298aa] font-medium">{coa.purityReference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Presentation</span>
                    <span className="font-medium">{coa.netContent}</span>
                  </div>
                </div>

                <div className="text-xs text-[#7b898e] mb-4">
                  <p>Catalogue and lot reference information only. Not a test report.</p>
                  <p className="mt-1">Third-party analytical documentation, where a supplier provides it, is supplied separately and unaltered.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCOA(coa)}
                    className="px-3 py-1.5 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-md hover:bg-[#16283c] transition text-xs"
                  >
                    Report
                  </button>
                  <a
                    href={coa.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 border border-[#8298aa] text-[#8298aa] font-semibold rounded-md hover:bg-[#8298aa] hover:text-black transition text-xs text-center"
                  >
                    Download summary
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCOAs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#a7b0b2]">No batch references found matching your search.</p>
          </div>
        )}
      </div>

      {/* Batch analytical test report detail modal */}
      {selectedCOA && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="coa-modal-title">
          <div ref={reportModalRef} className="text-[#e6edf3] bg-[#0c1622] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#FBFAF7]/70">
            <div className="p-6 border-b border-[#FBFAF7]/70 sticky top-0 text-[#e6edf3] bg-[#0c1622]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Batch reference summary</h2>
                  <p className="text-[#a7b0b2] text-sm">{selectedCOA.productName} - Batch {selectedCOA.lotNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedCOA(null)}
                  className="text-[#a7b0b2] hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Report header */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#8298aa] mb-1">GHK</h3>
                    <p className="text-[#a7b0b2] text-sm">Documented research materials</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#a7b0b2]">Report Reference</p>
                    <p className="font-mono font-bold">{selectedCOA.lotNumber}</p>
                  </div>
                </div>

                <div className="bg-[#17232d] border border-[#8298aa]/20 rounded-lg p-4 mb-4">
                  <p className="text-[#8298aa] font-semibold mb-2">BATCH REFERENCE</p>
                  <p className="text-sm text-[#a7b0b2]">
                    This records the catalogue and lot reference information held for the stated research material. It is not a test report, and not a statement of human safety, treatment suitability, or regulatory approval.
                  </p>
                </div>
              </div>

              {/* Product Information */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Product Information</h4>
                <div className="bg-[#111d2c] rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Product Name</span>
                    <span className="font-medium">{selectedCOA.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Batch Number (Lot)</span>
                    <span className="font-mono">{selectedCOA.lotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Presentation</span>
                    <span className="font-medium">{selectedCOA.netContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Catalogue purity reference</span>
                    <span className="font-medium">{selectedCOA.purityReference}</span>
                  </div>
                </div>
              </div>

              {/* Analytical documentation */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Analytical documentation</h4>
                <div className="bg-[#111d2c] rounded-lg p-4 text-sm text-[#a7b0b2] space-y-3">
                  <p>
                    GHK Peptides does not carry out analytical testing and does not hold laboratory
                    accreditation. We do not publish test results of our own.
                  </p>
                  <p>
                    Where the source laboratory supplies third-party analytical documentation for a
                    lot, it is provided separately and unaltered. Scope and methods vary by supplier
                    and by batch; the supplier&apos;s document states what was tested.
                  </p>
                  <p>
                    Independent reports can also be looked up directly with the testing laboratory
                    using the{' '}
                    <a href="/coa#janoshik" className="text-[#8298aa] hover:underline">
                      Janoshik report lookup
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Download Section */}
              <div className="text-[#e6edf3] bg-[#0a1420] border border-[#FBFAF7]/70 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2">Download batch reference summary</h4>
                <p className="text-sm text-[#a7b0b2] mb-4">
                  A record of the catalogue and lot reference information we hold. This is not a
                  certificate of analysis and reports no testing by or for GHK Peptides.
                </p>
                <a 
                  href={selectedCOA.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-lg hover:bg-[#16283c] transition text-center"
                >
                  Download PDF summary
                </a>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCOA(null)}
                className="w-full mt-4 px-6 py-3 border border-[#FBFAF7]/70 text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
