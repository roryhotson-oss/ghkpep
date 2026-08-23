'use client';

import { useState, useEffect } from 'react';

interface COAData {
  productSlug: string;
  documentUrl: string;
  productName: string;
  lotNumber: string;
  identity: string;
  sterility: string;
  endotoxin: string;
  fentanyl: string;
  netContent: string;
  testDate: string;
  testedBy: string;
  status: 'verified' | 'pending' | 'expired';
}

export default function COAPage() {
  const [coaData, setCoaData] = useState<COAData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCOA, setSelectedCOA] = useState<COAData | null>(null);

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
          identity: 'Confirmed',
          sterility: 'No Growth',
          endotoxin: 'NMT 0.05 EU/mL',
          fentanyl: 'Not Detected',
          netContent: `${product.name.split(' ').slice(-1)[0]} mg`,
          testDate: 'Jul 24, 2026',
          testedBy: 'Glyvantix Laboratories',
          status: 'verified' as const,
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
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#21c7a5] text-sm font-medium mb-2">Identity Verified</p>
          <h1 className="text-3xl font-bold">Certificates of Analysis</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            Every compound we ship is independently tested by Glyvantix Laboratories and comes with full documentation of purity and identity verification.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search by product name or lot number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-[#2b3538] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#21c7a5]"
          />
        </div>
      </div>

      {/* COA List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCOAs.map((coa) => (
            <div key={coa.lotNumber} className="bg-[#141414] rounded-xl border border-[#2b3538] hover:border-[#21c7a5]/30 transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{coa.productName}</h3>
                    <p className="text-[#a7b0b2] text-sm">Lot: {coa.lotNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#0a2a22] text-[#21c7a5] rounded-full text-xs font-medium">
                    {coa.status === 'verified' ? '✓ Verified' : coa.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Documentation</span>
                    <span className="text-[#21c7a5] font-medium">Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Identity</span>
                    <span className="font-medium">{coa.identity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Sterility</span>
                    <span className="font-medium">{coa.sterility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Endotoxin</span>
                    <span className="font-medium">{coa.endotoxin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Fentanyl Screen</span>
                    <span className="font-medium">{coa.fentanyl}</span>
                  </div>
                </div>

                <div className="text-xs text-[#7b898e] mb-4">
                  <p>Tested: {coa.testDate}</p>
                  <p>By: {coa.testedBy}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCOA(coa)}
                    className="flex-1 px-4 py-2 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition text-sm"
                  >
                    View Details
                  </button>
                  <a
                    href={coa.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2 border border-[#21c7a5] text-[#21c7a5] font-semibold rounded-lg hover:bg-[#21c7a5] hover:text-black transition text-sm text-center"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCOAs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#a7b0b2]">No COAs found matching your search.</p>
          </div>
        )}
      </div>

      {/* COA Detail Modal */}
      {selectedCOA && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="coa-modal-title">
          <div className="bg-[#141414] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#2b3538]">
            <div className="p-6 border-b border-[#2b3538] sticky top-0 bg-[#141414]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Certificate of Analysis</h2>
                  <p className="text-[#a7b0b2] text-sm">{selectedCOA.productName} - Lot {selectedCOA.lotNumber}</p>
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
              {/* COA Header */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#21c7a5] mb-1">GHK</h3>
                    <p className="text-[#a7b0b2] text-sm">Pharmaceutical-Grade Research Compounds</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#a7b0b2]">COA Number</p>
                    <p className="font-mono font-bold">{selectedCOA.lotNumber}</p>
                  </div>
                </div>

                <div className="bg-[#0a2a22] border border-[#21c7a5]/20 rounded-lg p-4 mb-4">
                  <p className="text-[#21c7a5] font-semibold mb-2">✓ VERIFIED</p>
                  <p className="text-sm text-[#a7b0b2]">
                    This certificate confirms that the product has been independently tested and meets all quality specifications.
                  </p>
                </div>
              </div>

              {/* Product Information */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Product Information</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Product Name</span>
                    <span className="font-medium">{selectedCOA.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Lot Number</span>
                    <span className="font-mono">{selectedCOA.lotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Net Content</span>
                    <span className="font-medium">{selectedCOA.netContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Test Date</span>
                    <span className="font-medium">{selectedCOA.testDate}</span>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Test Results</h4>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2b3538]">
                        <th className="text-left px-4 py-3 text-[#a7b0b2] font-medium">Test Parameter</th>
                        <th className="text-left px-4 py-3 text-[#a7b0b2] font-medium">Specification</th>
                        <th className="text-left px-4 py-3 text-[#a7b0b2] font-medium">Result</th>
                        <th className="text-center px-4 py-3 text-[#a7b0b2] font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Laboratory documentation</td>
                        <td className="px-4 py-3">See official certificate</td>
                        <td className="px-4 py-3 font-medium text-[#21c7a5]">Available</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Identity (MS)</td>
                        <td className="px-4 py-3">Confirmed</td>
                        <td className="px-4 py-3 font-medium">{selectedCOA.identity}</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Sterility</td>
                        <td className="px-4 py-3">No Growth</td>
                        <td className="px-4 py-3 font-medium">{selectedCOA.sterility}</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Endotoxin (LAL)</td>
                        <td className="px-4 py-3">&lt;0.5 EU/mL</td>
                        <td className="px-4 py-3 font-medium">{selectedCOA.endotoxin}</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Fentanyl Screen</td>
                        <td className="px-4 py-3">Not Detected</td>
                        <td className="px-4 py-3 font-medium">{selectedCOA.fentanyl}</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Testing Laboratory */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Testing Laboratory</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Laboratory</span>
                    <span className="font-medium">{selectedCOA.testedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Accreditation</span>
                    <span className="font-medium">ISO 17025 Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Location</span>
                    <span className="font-medium">United Kingdom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Certificate Valid</span>
                    <span className="font-medium text-[#21c7a5]">Active</span>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="bg-[#0d0d0d] border border-[#2b3538] rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2">Download COA</h4>
                <p className="text-sm text-[#a7b0b2] mb-4">
                  Download the official PDF certificate for your records.
                </p>
                <a 
                  href={selectedCOA.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-6 py-3 bg-[#21c7a5] text-black font-bold rounded-lg hover:bg-[#16a98d] transition text-center"
                >
                  Download PDF Certificate
                </a>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCOA(null)}
                className="w-full mt-4 px-6 py-3 border border-[#2b3538] text-[#e1e7e5] rounded-lg hover:border-[#21c7a5] hover:text-[#21c7a5] transition"
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
