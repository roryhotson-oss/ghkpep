import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Tracked Shipping</p>
          <h1 className="text-3xl font-bold">Shipping Information</h1>
          <p className="text-[#888] mt-3 max-w-2xl">Fast, secure delivery via Trusted Labs with careful packaging to protect your research compounds.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h3 className="font-bold mb-2">1 business day dispatch</h3>
            <p className="text-[#888] text-sm">Orders placed before 2pm GMT Mon–Fri ship the same day. After cutoff, next business day.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h3 className="font-bold mb-2">Plain packaging</h3>
            <p className="text-[#888] text-sm">Outer packaging is unmarked. Inner documentation includes lot, COA link, and handling notes.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h3 className="font-bold mb-2">Cold chain</h3>
            <p className="text-[#888] text-sm">Temperature-sensitive compounds ship insulated with gel packs sized to your destination zone.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h3 className="font-bold mb-2">Trusted Labs</h3>
            <p className="text-[#888] text-sm">All UK shipments handled by Trusted Labs — tracked, insured, and discreet.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Rates & transit</h2>
        <div className="bg-[#141414] rounded-xl border border-[#222] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left px-6 py-3 text-[#888] font-medium">Method</th>
                <th className="text-left px-6 py-3 text-[#888] font-medium">Transit</th>
                <th className="text-left px-6 py-3 text-[#888] font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#222]">
                <td className="px-6 py-4 font-medium">Trusted Labs Standard</td>
                <td className="px-6 py-4 text-[#888]">2–3 business days</td>
                <td className="px-6 py-4">£7.99 — free over £150</td>
              </tr>
              <tr className="border-b border-[#222]">
                <td className="px-6 py-4 font-medium">Trusted Labs Next Day</td>
                <td className="px-6 py-4 text-[#888]">Next business day</td>
                <td className="px-6 py-4">£14.99 flat</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">International (EU)</td>
                <td className="px-6 py-4 text-[#888]">3–5 business days</td>
                <td className="px-6 py-4">£19.99 flat</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h3 className="font-bold mb-3">Shipping protection</h3>
          <p className="text-[#888] text-sm leading-relaxed">At checkout you can add shipping protection. The premium is priced against your order total and shown before you pay — it is optional and can be removed. When a protected parcel is lost, stolen, or damaged in transit, the claim is filed directly with Trusted Labs and resolved by them.</p>
        </div>

        {/* Delivery Guarantee */}
        <div className="mt-8 bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-xl p-6 border border-[#00d4aa]/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📦</div>
            <div>
              <h3 className="font-bold mb-2 text-[#00d4aa]">Delivery Guarantee</h3>
              <p className="text-[#ccc] text-sm leading-relaxed">
                We stand behind every shipment. If your package is marked as delivered but you haven&apos;t received it, or if it&apos;s lost in transit, we&apos;ll <span className="font-semibold text-[#00d4aa]">reship your order completely free of charge</span>. No questions asked, no additional cost to you. Your satisfaction and trust are our priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Guarantee */}
        <div className="mt-6 bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-xl p-6 border border-[#00d4aa]/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔬</div>
            <div>
              <h3 className="font-bold mb-2 text-[#00d4aa]">Quality Testing Guarantee</h3>
              <p className="text-[#ccc] text-sm leading-relaxed">
                We&apos;re confident in our quality standards. If you independently test our products and find they don&apos;t meet the specifications stated on the COA, simply <span className="font-semibold text-[#00d4aa]">send us your test results and we&apos;ll provide free replacements</span>. We work only with internationally recognised manufacturers and independently verify every batch, but we understand the importance of giving you complete peace of mind.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/returns" className="text-[#00d4aa] text-sm hover:underline">View returns policy →</Link>
        </div>
      </section>
    </div>
  );
}
