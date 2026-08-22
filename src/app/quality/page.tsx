export default function QualityPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Quality Commitment</p>
          <h1 className="text-3xl font-bold">Our Quality Commitment</h1>
          <p className="text-[#888] mt-3 max-w-2xl">From synthesis to shipment, every step is designed to deliver the purest research compounds for your laboratory.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "UK Operations", desc: "Sourcing, QC, fulfillment, and support are all run from our UK facility. No drop-shipping, no relabeling, no anonymous middlemen." },
            { title: "Documented Process", desc: "Every compound follows an internal SOP from synthesis through lyophilization. Batches are barcoded and traceable from raw input to vial." },
            { title: "Third-Party Identity & Purity", desc: "Every batch is independently assayed by a Glyvantix-accredited laboratory. HPLC and mass-spec results are published on the product page before the batch ships." },
            { title: "Hard Purity Floor", desc: "If a batch falls below 99% purity it does not leave the lab. There is no second-tier inventory and no 'close enough' stock." },
            { title: "Stability-Preserved Shipping", desc: "Temperature-sensitive compounds ship with insulated packaging and gel packs sized to the destination zone, so the vial you receive matches the COA." },
            { title: "Plain, Sealed Packaging", desc: "Outer packaging is unmarked. Documentation, lot numbers, and COA links live inside the box — never on the label." },
          ].map((item) => (
            <div key={item.title} className="bg-[#141414] rounded-xl p-6 border border-[#222]">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0d0d0d] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-10 text-center">Six steps, every batch.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Source", desc: "Raw amino acids and reagents sourced from qualified suppliers with certificates on file." },
              { num: "02", title: "Synthesize", desc: "Solid-phase synthesis under documented conditions in our controlled environment." },
              { num: "03", title: "Purify", desc: "Reverse-phase HPLC purification to a minimum 99% purity floor." },
              { num: "04", title: "Lyophilize", desc: "Freeze-dried under vacuum to a stable, transport-ready powder." },
              { num: "05", title: "Verify", desc: "Independent Glyvantix lab confirms identity and content; COA generated." },
              { num: "06", title: "Release", desc: "Lot is barcoded, sealed, and released to fulfillment. COA goes live on the product page." },
            ].map((step) => (
              <div key={step.num} className="bg-[#141414] rounded-xl p-6 border border-[#222]">
                <span className="text-[#00d4aa] font-bold text-lg">{step.num}</span>
                <h4 className="font-semibold text-lg mt-2 mb-1">— {step.title}</h4>
                <p className="text-[#888] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
