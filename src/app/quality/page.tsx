export default function QualityPage() {
  return (
    <div>
      <section className="text-[#e6edf3] bg-[#0a1420] rounded-3xl border-4 border-[#FBFAF7] shadow-md max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Sourcing &amp; Review</p>
          <h1 className="text-3xl font-bold">How we select and check what we list.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">We source finished research material from a small group of established laboratories and review the documentation they provide before listing a lot. We do not manufacture, synthesise, or test material ourselves.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "UK Based", desc: "Ordering, customer support, and record keeping are run from the UK. Material is sourced from third-party laboratories and shipped from China." },
            { title: "Supplier Selection", desc: "We work with a small number of established laboratories with active research communities, rather than buying from open marketplaces." },
            { title: "Documentation Review", desc: "Supplier paperwork is reviewed before a lot is listed. Lot references are recorded so material can be traced back to the supplier batch." },
            { title: "Third-Party Reports", desc: "Where a source laboratory provides third-party analytical documentation, we make it available unaltered. Availability varies by lot and by supplier." },
            { title: "Listing Standards", desc: "Lots without adequate supplier documentation are not listed. We do not substitute our own figures where a supplier document is absent." },
            { title: "Plain, Sealed Packaging", desc: "Outer packaging is unmarked. Lot references and documentation links are inside the box — never on the outer label." },
          ].map((item) => (
            <div key={item.title} className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[#a7b0b2] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-[#e6edf3] bg-[#0a1420] rounded-3xl border-4 border-[#FBFAF7] shadow-md max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-10 text-center">Six steps, every listing.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Select", desc: "Identify an established source laboratory with an active research community and a track record." },
              { num: "02", title: "Request", desc: "Request the batch documentation the laboratory holds for the specific lot on offer." },
              { num: "03", title: "Review", desc: "Review that documentation for completeness and consistency before deciding whether to list." },
              { num: "04", title: "Record", desc: "Record the lot reference against the listing so material can be traced to its source batch." },
              { num: "05", title: "Publish", desc: "Publish any supplier-provided third-party report unaltered, and state plainly where none is held." },
              { num: "06", title: "List", desc: "List the lot for laboratory research use, with its reference searchable on the batch references page." },
            ].map((step) => (
              <div key={step.num} className="text-[#e6edf3] bg-[#0c1622] rounded-2xl p-6 border-4 border-[#FBFAF7] shadow-md">
                <span className="text-[#8298aa] font-bold text-lg">{step.num}</span>
                <h4 className="font-semibold text-lg mt-2 mb-1">— {step.title}</h4>
                <p className="text-[#a7b0b2] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
