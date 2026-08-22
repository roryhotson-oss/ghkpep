import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Claims & Replacements</p>
          <h1 className="text-3xl font-bold">Returns & Replacements</h1>
          <p className="text-[#888] mt-3 max-w-2xl">Lost, stolen, or damaged in transit is handled by Trusted Labs when you add shipping protection at checkout. Wrong-item errors and COA mismatches are always on us. Because these are research compounds, opened material can't be returned.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full">Free replacement</span>
            <h3 className="font-bold mt-3 mb-2">Damaged in transit</h3>
            <p className="text-[#888] text-sm leading-relaxed">If a vial arrives broken, leaking, or with a compromised seal, email a photo of the package and the affected vials. We'll ship a replacement at no charge.</p>
            <p className="text-[#666] text-xs mt-3">Window: 7 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full">Full refund or replace</span>
            <h3 className="font-bold mt-3 mb-2">COA mismatch</h3>
            <p className="text-[#888] text-sm leading-relaxed">If independent verification shows a batch fails to match its published certificate of analysis, we will refund or replace the order in full and pull the lot from inventory immediately.</p>
            <p className="text-[#666] text-xs mt-3">Window: 30 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full">Replacement + return label</span>
            <h3 className="font-bold mt-3 mb-2">Wrong item shipped</h3>
            <p className="text-[#888] text-sm leading-relaxed">If you receive the wrong SKU, strength, or quantity, contact us and we'll send the correct item with a pre-paid return label for the original.</p>
            <p className="text-[#666] text-xs mt-3">Window: 14 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full">Full refund</span>
            <h3 className="font-bold mt-3 mb-2">Pre-shipment cancellation</h3>
            <p className="text-[#888] text-sm leading-relaxed">Orders can be cancelled for a full refund only before a shipping label has been assigned. As soon as a label is created, the order is no longer eligible for pre-shipment cancellation.</p>
            <p className="text-[#666] text-xs mt-3">Window: Before a shipping label is assigned</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">What we cannot return</h2>
        <ul className="text-[#888] text-sm space-y-2 mb-12">
          <li>• Opened, reconstituted, or partially used vials</li>
          <li>• Storage-condition failures after delivery (out-of-range temperature, exposure to light)</li>
          <li>• Bulk or custom-synthesized orders that have already begun production</li>
        </ul>

        <h2 className="text-xl font-bold mb-6">How to file a claim</h2>
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {[
            { num: "01", title: "Email support", desc: "support@ghkpep.com with your order number, lot, and photos." },
            { num: "02", title: "Receive RMA", desc: "We respond within 1 business day with an RMA number and next steps." },
            { num: "03", title: "Ship or discard", desc: "Most damage cases skip the return. Wrong-item cases get a pre-paid label." },
            { num: "04", title: "Refund or replace", desc: "Refund posts within 5 business days. Replacements ship same day when in stock." },
          ].map((step) => (
            <div key={step.num} className="bg-[#141414] rounded-xl p-5 border border-[#222]">
              <span className="text-[#00d4aa] font-bold">{step.num}</span>
              <h4 className="font-semibold text-sm mt-2">{step.title}</h4>
              <p className="text-[#888] text-xs mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="mailto:support@ghkpep.com?subject=Order%20issue" className="px-6 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition text-sm">Email support</a>
          <a href="https://wa.me/447XXXXXXXXX" target="_blank" rel="noopener" className="px-6 py-3 border border-[#333] text-[#ccc] rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp support
          </a>
        </div>
      </section>
    </div>
  );
}
