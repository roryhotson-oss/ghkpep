import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#21c7a5] text-sm font-medium mb-2">Claims & Replacements</p>
          <h1 className="text-3xl font-bold">Returns & Replacements</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">Lost, stolen, or damaged in transit is handled by Trusted Labs when you add shipping protection at checkout. Wrong-item errors and COA mismatches are always on us. Because these are research compounds, opened material can&apos;t be returned.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#21c7a5] rounded-full">Free replacement</span>
            <h3 className="font-bold mt-3 mb-2">Damaged in transit</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If a vial arrives broken, leaking, or with a compromised seal, email a photo of the package and the affected vials. We&apos;ll ship a replacement at no charge.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 7 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#21c7a5] rounded-full">Full refund or replace</span>
            <h3 className="font-bold mt-3 mb-2">COA mismatch</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If independent verification shows a batch fails to match its published certificate of analysis, we will refund or replace the order in full and pull the lot from inventory immediately.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 30 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#21c7a5] rounded-full">Replacement + return label</span>
            <h3 className="font-bold mt-3 mb-2">Wrong item shipped</h3>
            <p className="text-[#a7b0b2] text-sm leading-relaxed">If you receive the wrong SKU, strength, or quantity, contact us and we&apos;ll send the correct item with a pre-paid return label for the original.</p>
            <p className="text-[#7b898e] text-xs mt-3">Window: 14 days from delivery</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <span className="text-[10px] px-2 py-1 bg-[#0a2a22] text-[#21c7a5] rounded-full">Full refund</span>
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
            <div key={step.num} className="bg-[#141414] rounded-xl p-5 border border-[#2b3538]">
              <span className="text-[#21c7a5] font-bold">{step.num}</span>
              <h4 className="font-semibold text-sm mt-2">{step.title}</h4>
              <p className="text-[#a7b0b2] text-xs mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
          <h3 className="font-bold mb-3">Need help with a return?</h3>
          <p className="text-[#a7b0b2] text-sm mb-4">Contact us via WhatsApp, Telegram, or Email from the checkout page to file a claim.</p>
          <Link href="/cart" className="inline-block px-6 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition text-sm">
            Go to Checkout
          </Link>
        </div>
      </section>
    </div>
  );
}
