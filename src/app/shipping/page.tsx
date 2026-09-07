import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Tracked Shipping</p>
          <h1 className="text-3xl font-bold">Shipping Information</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">Free, discreet tracked delivery orders over £400. Single vials ship promptly; orders over 5 vials are sourced as a box of 10 and typically arrive within 5–10 days.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <h3 className="font-bold mb-2">Discreet tracked dispatch</h3>
            <p className="text-[#a7b0b2] text-sm">Single-vial orders are dispatched promptly. Anything over 5 vials is sourced as a box of 10, with delivery factored into a typical 5–10 day wait.</p>
          </div>
          <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <h3 className="font-bold mb-2">Plain packaging</h3>
            <p className="text-[#a7b0b2] text-sm">Outer packaging is unmarked. Inner documentation includes lot, COA link, and handling notes.</p>
          </div>
          <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <h3 className="font-bold mb-2">Cold chain</h3>
            <p className="text-[#a7b0b2] text-sm">Temperature-sensitive compounds ship insulated with gel packs sized to your destination zone.</p>
          </div>
          <div className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
            <h3 className="font-bold mb-2">Trusted Labs</h3>
            <p className="text-[#a7b0b2] text-sm">Shipments are discreet and tracked. Tracking details are provided when the parcel enters transit.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Rates & transit</h2>
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-xl border border-[#FBFAF7]/70 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#FBFAF7]/70">
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Method</th>
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Transit</th>
                <th className="text-left px-6 py-3 text-[#a7b0b2] font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#FBFAF7]/70">
                <td className="px-6 py-4 font-medium">Standard tracked delivery</td>
                <td className="px-6 py-4 text-[#a7b0b2]">2–3 business days</td>
                <td className="px-6 py-4">Free</td>
              </tr>
              <tr className="border-b border-[#FBFAF7]/70">
                <td className="px-6 py-4 font-medium">Over 5 vials (box of 10 sourcing)</td>
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

        <div className="mt-8 text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
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
                We&apos;re confident in our quality standards. If you independently test our products and find they don&apos;t meet the specifications stated on the COA, simply <span className="font-semibold text-[#8298aa]">send us your test results and we&apos;ll provide free replacements</span>. We work only with internationally recognised manufacturers and provide a Certificate of Analysis with every order for your own independent verification.
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
