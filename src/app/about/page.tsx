import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#21c7a5] text-sm font-medium mb-2">Our story</p>
          <h1 className="text-3xl font-bold">A new standard for the lab.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">GHK exists because reference-grade research compounds shouldn&apos;t require a leap of faith. We built the supplier we wished we had.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          <p className="text-[#e1e7e5] text-lg leading-relaxed">
            GHKpep works in partnership with Glyvantix Research Lab for independent product documentation and testing.
          </p>
          <p className="text-[#a7b0b2] mt-6 leading-relaxed">
            Our documentation is audited through{' '}
            <a href="https://uk-rscs.org" target="_blank" rel="noreferrer" className="text-[#21c7a5] hover:underline">
              UK-RSCS.ORG
            </a>
            .
          </p>
          <p className="text-[#a7b0b2] mt-4 leading-relaxed">
            The catalog is intentionally narrow. Every product is one we&apos;d actually order ourselves, every batch is independently assayed, and every certificate of analysis is published openly on the product page before the lot ships. No exceptions.
          </p>
          <p className="text-[#a7b0b2] mt-4 leading-relaxed">
            Our products are sold strictly for in-vitro research. We do not provide dosing guidance, we do not claim therapeutic benefit, and we refuse any order that suggests human or animal consumption.
          </p>
        </div>
      </section>

      <section className="bg-[#0d0d0d] border-y border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-10 text-center">Six principles, written down.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Transparency by default", desc: "Every batch ships with a published certificate of analysis from a Glyvantix lab — linked from the product page, not buried in an email." },
            { title: "Reference-grade or nothing", desc: "We hold a 99% purity floor on every lot. Material that doesn&apos;t clear it is destroyed, not downgraded." },
            { title: "Built by lab people", desc: "Our QC team are working chemists. Documentation, packaging, and labeling are designed for how research actually runs." },
            { title: "Researcher-only", desc: "We verify research intent at the gate and refuse any order that suggests human or veterinary use. No exceptions, no quotas." },
            { title: "Long-term partnerships", desc: "We&apos;d rather earn one lab for ten years than chase one-time buyers. Pricing, allocation, and support are built around that." },
            { title: "Quietly premium", desc: "Discreet packaging, fast support, and an honest catalog. Nothing flashy, nothing hidden." },
            ].map((item) => (
              <div key={item.title} className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-[#a7b0b2] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d0d] border-t border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Built for the bench. Verified for your peace of mind.</h2>
          <p className="text-[#a7b0b2] mb-6">Browse the catalog, read a COA, or talk to our team. We respond to researcher questions within one business day.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="px-6 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition">Browse the catalog</Link>
            <Link href="/contact" className="px-6 py-3 border border-[#333] text-[#e1e7e5] rounded-lg hover:border-[#21c7a5] hover:text-[#21c7a5] transition">Contact the team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
