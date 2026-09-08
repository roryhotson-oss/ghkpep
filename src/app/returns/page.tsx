import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Claims & Replacements</p>
          <h1 className="text-3xl font-bold">Returns & Replacements</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">Lost, stolen, or damaged in transit is handled by Trusted Labs when you add shipping protection at checkout. Wrong-item errors and COA mismatches are always on us. Because these are research compounds, opened material can&apos;t be returned.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <span className="text-[10px] px-2 py-1 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg">Free replacement</span>
            <h3 className="font-bold mt-3 mb-2">Damaged in transit</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If a vial arrives broken, leaking, or with a compromised seal, email a photo of the package and the affected vials. We&apos;ll ship a replacement at no charge.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 7 days from delivery</p>
          </div>
          <div className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <span className="text-[10px] px-2 py-1 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg">Full refund or replace</span>
            <h3 className="font-bold mt-3 mb-2">COA mismatch</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If independent verification shows a batch fails to match its published certificate of analysis, we will refund or replace the order in full and pull the lot from inventory immediately.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 30 days from delivery</p>
          </div>
          <div className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <span className="text-[10px] px-2 py-1 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg">Replacement + return label</span>
            <h3 className="font-bold mt-3 mb-2">Wrong item shipped</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If you receive the wrong SKU, strength, or quantity, contact us and we&apos;ll send the correct item with a pre-paid return label for the original.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 14 days from delivery</p>
          </div>
          <div className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <span className="text-[10px] px-2 py-1 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg">Full refund</span>
            <h3 className="font-bold mt-3 mb-2">Pre-shipment cancellation</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">Orders can be cancelled for a full refund only before a shipping label has been assigned. As soon as a label is created, the order is no longer eligible for pre-shipment cancellation.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: Before a shipping label is assigned</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">What we cannot return</h2>
        <ul className="text-[#a7b0b2] text-sm space-y-2 mb-12">
          <li>• Opened, reconstituted, or partially used vials</li>
          <li>• Storage-condition failures after delivery (out-of-range temperature, exposure to light)</li>
          <li>• Bulk or custom-synthesized orders that have already begun production</li>
        </ul>

        <h2 className="text-xl font-bold mb-6">How to file a claim</h2>
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {[
            { num: "01", title: "Contact us", desc: "Use WhatsApp, Telegram, or Email from checkout with your order number, lot, and photos." },
            { num: "02", title: "Receive RMA", desc: "We respond within 1 business day with an RMA number and next steps." },
            { num: "03", title: "Ship or discard", desc: "Most damage cases skip the return. Wrong-item cases get a pre-paid label." },
            { num: "04", title: "Refund or replace", desc: "Refund posts within 5 business days. Replacements ship same day when in stock." },
          ].map((step) => (
            <div key={step.num} className="text-[#e6edf3] bg-[#0c1622] rounded-xl p-5 border border-[#FBFAF7]/70">
              <span className="text-[#8298aa] font-bold">{step.num}</span>
              <h4 className="font-semibold text-sm mt-2">{step.title}</h4>
              <p className="text-[#a7b0b2] text-xs mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
          <h3 className="font-bold mb-3">Need help with a return?</h3>
          <p className="text-[#a7b0b2] text-sm mb-4">Contact us via WhatsApp, Telegram, or Email from the checkout page to file a claim.</p>
          <Link href="/cart" className="inline-block px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition text-sm">
            Go to Checkout
          </Link>
        </div>
      </section>
    </div>
  );
}
