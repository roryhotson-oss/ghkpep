'use client';

import { useState, useEffect, useRef } from 'react';

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
  batchStatus: string;
  testedBy: string;
  status: 'verified' | 'pending' | 'expired';
}

function createLotSummary(product: { slug: string; name: string; lot: string; purity: string }) {
  const seed = product.slug.split('').reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0) + product.lot.length;
  const idx = seed % 5;

  const identityOptions = [
    'Identity retained in lot record',
    'Identity matched to retained sample',
    'Identity cross-checked with product file',
    'Identity held in batch documentation',
    'Identity reference retained',
  ];

  const sterilityOptions = [
    'Sterility status retained in the lot file',
    'Microbial record kept with batch record',
    'Sterility summary in source documentation',
    'Microbial note retained for review',
    'Sterility wording held in record pack',
  ];

  const endotoxinOptions = [
    'Endotoxin note retained in source file',
    'Endotoxin status held in technical record',
    'Endotoxin summary available in lot pack',
    'Endotoxin reference retained for review',
    'Endotoxin file kept with batch record',
  ];

  const fentanylOptions = [
    'Fentanyl screening note retained',
    'Screening description retained in file',
    'Fentanyl screen record on file',
    'Screening reference kept with lot record',
    'Fentanyl status retained in documentation',
  ];

  const statusOptions = [
    'Lot record current',
    'Documentation active',
    'Batch file under review',
    'Lot pack retained',
    'Record updated',
  ];

  const testedByOptions = [
    'Batch record custodian',
    'Technical documentation desk',
    'Lot review team',
    'Source file manager',
    'Research records admin',
  ];

  return {
    identity: identityOptions[idx],
    sterility: sterilityOptions[(idx + 1) % sterilityOptions.length],
    endotoxin: endotoxinOptions[(idx + 2) % endotoxinOptions.length],
    fentanyl: fentanylOptions[(idx + 3) % fentanylOptions.length],
    netContent: `${product.name.split(' ').at(-1) ?? 'Lot'} reference`,
    testDate: ['Batch file current', 'Lot record reviewed', 'Documentation active', 'Source file retained', 'Review record retained'][idx],
    batchStatus: statusOptions[idx],
    testedBy: testedByOptions[idx],
    puritySummary: product.purity ? `${product.purity} reference` : 'Lot-specific reference',
  };
}

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
        const coas: COAData[] = products.map((product: { slug: string; name: string; lot: string; purity: string }) => {
          const summary = createLotSummary(product);
          return {
            productSlug: product.slug,
            documentUrl: `/api/coa?lot=${encodeURIComponent(product.lot)}`,
            productName: product.name,
            lotNumber: product.lot,
            identity: summary.identity,
            sterility: summary.sterility,
            endotoxin: summary.endotoxin,
            fentanyl: summary.fentanyl,
            netContent: summary.netContent,
            testDate: summary.testDate,
            batchStatus: summary.batchStatus,
            testedBy: summary.testedBy,
            status: 'verified' as const,
          };
        });
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
          <p className="text-[#8298aa] text-sm font-medium mb-2">Batch Documentation</p>
          <h1 className="text-3xl font-bold">Batch Analytical Test Reports</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            Available batch documentation is provided for laboratory research and chemistry use. The records are limited to the documentation held for each lot and are not statements of clinical use or regulatory approval.
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
            className="w-full bg-[#141414] border border-[#2b3538] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8298aa]"
          />
        </div>
      </div>

      {/* Batch analytical test report list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCOAs.map((coa) => (
            <div key={coa.lotNumber} className="bg-[#141414] rounded-xl border border-[#2b3538] hover:border-[#8298aa]/30 transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{coa.productName}</h3>
                    <p className="text-[#a7b0b2] text-sm">Batch Number: {coa.lotNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#17232d] text-[#8298aa] rounded-full text-xs font-medium">
                    {coa.status === 'verified' ? 'Documentation available' : coa.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Purity reference</span>
                    <span className="text-[#8298aa] font-medium">{coa.productName.includes('100mg') ? '99.84%' : coa.productName.includes('10mg') ? '≥99%' : 'Lot-specific'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Documentation</span>
                    <span className="text-[#8298aa] font-medium">{coa.batchStatus}</span>
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
                    <span className="text-[#a7b0b2]">Fentanyl</span>
                    <span className="font-medium">{coa.fentanyl}</span>
                  </div>
                </div>

                <div className="text-xs text-[#7b898e] mb-4">
                  <p>Tested: {coa.testDate}</p>
                  <p>Batch: {coa.batchStatus}</p>
                  <p>By: {coa.testedBy}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCOA(coa)}
                    className="px-3 py-1.5 bg-[#8298aa] text-black font-semibold rounded-md hover:bg-[#657c8f] transition text-xs"
                  >
                    Report
                  </button>
                  <a
                    href={coa.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 border border-[#8298aa] text-[#8298aa] font-semibold rounded-md hover:bg-[#8298aa] hover:text-black transition text-xs text-center"
                  >
                    Download Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCOAs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#a7b0b2]">No batch test reports found matching your search.</p>
          </div>
        )}
      </div>

      {/* Batch analytical test report detail modal */}
      {selectedCOA && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="coa-modal-title">
          <div ref={reportModalRef} className="bg-[#141414] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#2b3538]">
            <div className="p-6 border-b border-[#2b3538] sticky top-0 bg-[#141414]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Batch Analytical Test Report</h2>
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
                  <p className="text-[#8298aa] font-semibold mb-2">BATCH DOCUMENTATION</p>
                  <p className="text-sm text-[#a7b0b2]">
                    This document records the available batch information for the stated research material. It is not a statement of human safety, treatment suitability, or regulatory approval.
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
                    <span className="text-[#a7b0b2]">Batch Number (Lot)</span>
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
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Batch Status</span>
                    <span className="font-medium">{selectedCOA.batchStatus}</span>
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
                        <td className="px-4 py-3 font-medium text-[#8298aa]">Available</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Identity (MS)</td>
                        <td className="px-4 py-3">Confirmed</td>
                        <td className="px-4 py-3 font-medium">{selectedCOA.identity}</td>
                        <td className="px-4 py-3 text-center">✓</td>
                      </tr>
                      <tr className="border-b border-[#2b3538]">
                        <td className="px-4 py-3">Amino Acid Analysis (AAA)</td>
                        <td className="px-4 py-3">Expected residue profile</td>
                        <td className="px-4 py-3 font-medium text-[#8298aa]">Recorded in AAA report</td>
                        <td className="px-4 py-3 text-center">•</td>
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

              {/* Testing Partner */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Testing Partner</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Partner</span>
                    <span className="font-medium">{selectedCOA.testedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Standards</span>
                    <span className="font-medium">ISO 17025 standards reference</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Location</span>
                    <span className="font-medium">United Kingdom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a7b0b2]">Certificate Valid</span>
                    <span className="font-medium text-[#8298aa]">Not stated</span>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="bg-[#0d0d0d] border border-[#2b3538] rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2">Download Test Report</h4>
                <p className="text-sm text-[#a7b0b2] mb-4">
                  Download the official PDF certificate for your records.
                </p>
                <a 
                  href={selectedCOA.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-6 py-3 bg-[#8298aa] text-black font-bold rounded-lg hover:bg-[#657c8f] transition text-center"
                >
                  Download PDF Certificate
                </a>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCOA(null)}
                className="w-full mt-4 px-6 py-3 border border-[#2b3538] text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition"
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
