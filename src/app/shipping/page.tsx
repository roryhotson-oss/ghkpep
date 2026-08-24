import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Tracked Shipping</p>
          <h1 className="text-3xl font-bold">Shipping Information</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">Free, discreet tracked delivery. Box-of-10 purchases are sourced globally and typically arrive within 5–10 days.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-2">Discreet tracked dispatch</h3>
            <p className="text-[#a7b0b2] text-sm">Single-vial orders are dispatched promptly. Box-of-10 purchases are sourced globally and delivery is factored into a typical 5–10 day wait.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-2">Plain packaging</h3>
            <p className="text-[#a7b0b2] text-sm">Outer packaging is unmarked. Inner documentation includes lot, COA link, and handling notes.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-2">Cold chain</h3>
            <p className="text-[#a7b0b2] text-sm">Temperature-sensitive compounds ship insulated with gel packs sized to your destination zone.</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
            <h3 className="font-bold mb-2">Trusted Labs</h3>
            <p className="text-[#a7b0b2] text-sm">Shipments are discreet and tracked. Tracking details are provided when the parcel enters transit.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Rates & transit</h2>
        <div className="bg-[#141414] rounded-xl border border-[#2b3538] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2b3538]">
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Method</th>
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Transit</th>
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2b3538]">
                <td className="px-6 py-4 font-medium">Standard tracked delivery</td>
                <td className="px-6 py-4 text-[#a7b0b2]">2–3 business days</td>
                <td className="px-6 py-4">Free</td>
              </tr>
              <tr className="border-b border-[#2b3538]">
                <td className="px-6 py-4 font-medium">Box of 10 global sourcing</td>
                <td className="px-6 py-4 text-[#a7b0b2]">5–10 days</td>
                <td className="px-6 py-4">Free</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Tracking</td>
                <td className="px-6 py-4 text-[#a7b0b2]">Provided at dispatch</td>
                <td className="px-6 py-4">Included</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
          <h3 className="font-bold mb-3">Shipping protection</h3>
          <p className="text-[#a7b0b2] text-sm leading-relaxed">At checkout you can add shipping protection. The premium is priced against your order total and shown before you pay — it is optional and can be removed. When a protected parcel is lost, stolen, or damaged in transit, the claim is filed directly with Trusted Labs and resolved by them.</p>
        </div>

        {/* Delivery Guarantee */}
        <div className="mt-8 bg-gradient-to-r from-[#17232d] to-[#1c2733] rounded-xl p-6 border border-[#8298aa]/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📦</div>
            <div>
              <h3 className="font-bold mb-2 text-[#8298aa]">Delivery Guarantee</h3>
              <p className="text-[#e1e7e5] text-sm leading-relaxed">
                We stand behind every shipment. If your package is marked as delivered but you haven&apos;t received it, or if it&apos;s lost in transit, we&apos;ll <span className="font-semibold text-[#8298aa]">reship your order completely free of charge</span>. No questions asked, no additional cost to you. Your satisfaction and trust are our priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Guarantee */}
        <div className="mt-6 bg-gradient-to-r from-[#17232d] to-[#1c2733] rounded-xl p-6 border border-[#8298aa]/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔬</div>
            <div>
              <h3 className="font-bold mb-2 text-[#8298aa]">Quality Testing Guarantee</h3>
              <p className="text-[#e1e7e5] text-sm leading-relaxed">
                We&apos;re confident in our quality standards. If you independently test our products and find they don&apos;t meet the specifications stated on the COA, simply <span className="font-semibold text-[#8298aa]">send us your test results and we&apos;ll provide free replacements</span>. We work only with internationally recognised manufacturers and independently verify every batch, but we understand the importance of giving you complete peace of mind.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/returns" className="text-[#8298aa] text-sm hover:underline">View returns policy →</Link>
        </div>
      </section>
    </div>
  );
}
