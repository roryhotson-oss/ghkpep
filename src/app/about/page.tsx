import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Our story</p>
          <h1 className="text-3xl font-bold">A new standard for the lab.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">GHK exists because reference-grade research compounds shouldn&apos;t require a leap of faith. We built the supplier we wished we had.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          <p className="text-[#e1e7e5] text-lg leading-relaxed">
            GHK Peptides sources research compounds from a small group of established laboratories and supplies them, with the batch documentation we hold, for qualified laboratory research use.
          </p>
          <p className="text-[#a7b0b2] mt-6 leading-relaxed">
            We do not manufacture or test material ourselves, and we hold no laboratory accreditation. Where a source laboratory provides third-party analytical documentation for a lot, we make it available unaltered; where we hold none, we say so rather than substituting figures of our own.
          </p>
          <p className="text-[#a7b0b2] mt-4 leading-relaxed">
            The catalogue is intentionally narrow. We review the documentation a supplier provides before listing a lot, and record the lot reference so material can be traced back to the batch it came from.
          </p>
          <p className="text-[#a7b0b2] mt-4 leading-relaxed">
            Our products are sold strictly for in vitro research. We do not provide dosing guidance, we do not claim therapeutic benefit, and we refuse any order that suggests human or animal consumption.
          </p>
        </div>
      </section>

      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-10 text-center">Six principles, written down.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Transparency by default", desc: "Where we hold a supplier's analytical document for a lot, it is linked from the product page rather than buried in an email." },
            { title: "Documented or not listed", desc: "Lots without adequate supplier documentation are not listed. We do not fill gaps with figures of our own." },
            { title: "Built by lab people", desc: "Documentation, packaging, and labelling are designed for how research actually runs." },
            { title: "Researcher-only", desc: "We refuse any order that suggests human or veterinary use. No exceptions, no quotas." },
            { title: "Long-term partnerships", desc: "We'd rather earn one lab for ten years than chase one-time buyers. Pricing, allocation, and support are built around that." },
            { title: "Quietly premium", desc: "Discreet packaging, fast support, and an honest catalogue. Nothing flashy, nothing hidden." },
            ].map((item) => (
              <div key={item.title} className="text-[#34414a] bg-[#fbfaf7] rounded-2xl p-6 border border-[#d8d4c9] shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-[#a7b0b2] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Built for the bench. Verified for your peace of mind.</h2>
          <p className="text-[#a7b0b2] mb-6">Browse the catalog, read a COA, or talk to our team. We respond to researcher questions within one business day.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition">Browse the catalog</Link>
            <Link href="/contact" className="px-6 py-3 border border-[#FBFAF7]/70 text-[#e1e7e5] rounded-lg hover:border-[#8298aa] hover:text-[#8298aa] transition">Contact the team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
