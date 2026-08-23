import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/admin-store';

const allProducts = getProducts();
const featuredProducts = allProducts.slice(0, 10);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Research,<br />
                <span className="gradient-text">Refined</span> And<br />
                Verified
              </h1>
              <p className="text-[#888] text-lg mt-6 max-w-lg">
                Every batch undergoes our 8-Step Verification Process, including extensive third-party testing and batch-specific Certificates of Analysis.
              </p>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/shop"
                  className="px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition"
                >
                  Browse Catalog
                </Link>
                <Link
                  href="/testing"
                  className="px-8 py-3 border border-[#333] text-[#ccc] font-semibold rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition"
                >
                  View Testing Standards
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-72 h-80 rounded-2xl bg-gradient-to-b from-[#0a2a22] to-[#0a1a2a] border border-[#222] overflow-hidden">
                  <Image src="/images/hero-lab.png" alt="GHK Research Vials" width={288} height={320} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-4 -right-4 bg-[#00d4aa] text-black text-xs font-bold px-3 py-1 rounded-full">
                  Glyvantix Tested
                </div>
                <div className="absolute -bottom-3 -left-3 bg-[#141414] border border-[#00d4aa]/30 rounded-lg px-3 py-2 text-xs">
                  <p className="text-[#00d4aa] font-bold">99.84%</p>
                  <p className="text-[#888]">Verified Purity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="overflow-hidden border-y border-[#222] bg-[#0d0d0d]">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6 text-sm text-[#888]">
                <span>8× TESTED</span>
                <span>•</span>
                <span>THIRD-PARTY VERIFIED</span>
                <span>•</span>
                <span>PREMIUM RESEARCH STANDARDS</span>
                <span>•</span>
                <span>SECURE CHECKOUT</span>
                <span>•</span>
                <span>UK SHIPPING VIA TRUSTED LABS</span>
                <span>•</span>
                <span>ALIPAY · BANK TRANSFER · CRYPTO</span>
                <span>•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#00d4aa] text-sm font-medium mb-2">Catalog · Featured</p>
            <h2 className="text-3xl font-bold">Reference-grade compounds, in stock.</h2>
          </div>
          <Link href="/shop" className="text-[#00d4aa] text-sm hover:underline hidden sm:block">
            Browse full catalog →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group bg-[#141414] rounded-xl p-4 border border-[#222] hover:border-[#00d4aa]/30 transition card-glow"
            >
              <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-3 overflow-hidden relative">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#0a2a22] text-[#00d4aa] rounded-full font-medium">
                  {product.purity}
                </span>
              </div>
              <p className="text-[#888] text-xs">{product.categoryLabel}</p>
              <h3 className="font-semibold text-sm mt-1 group-hover:text-[#00d4aa] transition">
                {product.name}
              </h3>
              <div className="mt-2">
                <p className="text-white font-bold">£{product.price.toFixed(2)}</p>
                <p className="text-[#666] text-xs">Lot · {product.lot}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/shop" className="text-[#00d4aa] text-sm hover:underline">
            Browse full catalog →
          </Link>
        </div>
      </section>

      {/* Testing Protocol */}
      <section className="bg-[#0d0d0d] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-[#00d4aa] text-sm font-medium mb-2">Quality Protocol</p>
            <h2 className="text-3xl font-bold">Every batch, 8× tested.</h2>
            <p className="text-[#888] mt-3 max-w-2xl mx-auto">
              No in-house rubber stamps. Eight separate analytical assays, performed by accredited third-party laboratories, signed onto the COA tied to every lot number we ship.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Purity", desc: "HPLC-UV quantification against certified reference material.", status: "Pass" },
              { num: "02", title: "Content Verification", desc: "Mass and concentration verified to labeled potency.", status: "Pass" },
              { num: "03", title: "Identity Confirmation", desc: "Mass spectrometry confirms exact molecular structure.", status: "Pass" },
              { num: "04", title: "Heavy Metals Screening", desc: "ICP-MS screen for Pb, As, Cd, Hg below USP <232> limits.", status: "Pass" },
              { num: "05", title: "Sterility Testing", desc: "USP <71> compliant sterility screen on every fill.", status: "Pass" },
              { num: "06", title: "Endotoxin Testing", desc: "LAL kinetic chromogenic assay, < 0.5 EU/mg.", status: "Pass" },
              { num: "07", title: "Batch Conformity", desc: "Independent batch review confirming every lot matches its release specification.", status: "Pass" },
              { num: "08", title: "Fentanyl Screen", desc: "LC-MS/MS screen confirms no fentanyl or analog contamination.", status: "Pass" },
            ].map((test) => (
              <div key={test.num} className="bg-[#141414] rounded-xl p-5 border border-[#222]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#00d4aa] font-bold text-lg">{test.num}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#0a2a22] text-[#00d4aa] rounded-full">{test.status}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{test.title}</h4>
                <p className="text-[#888] text-xs leading-relaxed">{test.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/testing"
              className="inline-block px-6 py-3 border border-[#333] text-[#ccc] rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition text-sm"
            >
              Proof, on demand — Verify any lot
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Discovery</p>
          <h2 className="text-3xl font-bold">Find the compound your protocol needs.</h2>
          <p className="text-[#888] mt-3">Browse by category or search the catalog directly.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Reference Compounds", count: "24 compounds", cat: "reference" },
            { name: "Lyophilized Powders", count: "18 compounds", cat: "lyophilized" },
            { name: "Research Blends", count: "12 compounds", cat: "blend" },
            { name: "Laboratory Accessories", count: "9 compounds", cat: "accessories" },
          ].map((cat) => (
            <Link
              key={cat.cat}
              href={`/shop?cat=${cat.cat}`}
              className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#00d4aa]/30 transition group"
            >
              <h3 className="font-bold text-lg group-hover:text-[#00d4aa] transition">{cat.name}</h3>
              <p className="text-[#888] text-sm mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Different */}
      <section className="bg-[#0d0d0d] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-[#00d4aa] text-sm font-medium mb-2">Why We&apos;re Different</p>
            <h2 className="text-3xl font-bold">A higher standard, documented end-to-end.</h2>
            <p className="text-[#888] mt-3">Most research suppliers ask for trust. We hand you the proof.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Eight-stage testing", desc: "Identity, potency, purity, fentanyl screen, stability, sterility, endotoxin, and batch consistency — every lot, no exceptions." },
              { title: "Transparent documentation", desc: "Every order arrives with a downloadable COA. Look up any batch from the public verification portal." },
              { title: "UK-based 8× testing", desc: "Every lot is independently analysed by accredited laboratories, with full chain-of-custody records on the COA." },
              { title: "Independent verification", desc: "We don't test ourselves. Every batch is verified by an accredited external laboratory partner." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COA Verification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Verification Center</p>
          <h2 className="text-3xl font-bold">Look up any batch. Read every result.</h2>
          <p className="text-[#888] mt-3 max-w-2xl mx-auto">
            Type any lot number from a GHK vial to pull the full certificate of analysis — identity, purity, sterility, endotoxin, and stability data, signed by the testing laboratory.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter lot number (e.g. GHK-2419-A)"
              className="flex-1 bg-[#141414] border border-[#222] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00d4aa]"
            />
            <Link
              href="/verify"
              className="px-6 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition text-sm"
            >
              Verify
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[#888]">
            <div className="flex items-center gap-2">
              <span className="text-[#00d4aa]">✓</span> Independent third-party laboratory
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00d4aa]">✓</span> Signed digital COA per lot
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00d4aa]">✓</span> Public batch verification portal
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00d4aa]">✓</span> Permanent record retention
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#0d0d0d] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-[#00d4aa] text-sm font-medium mb-2">Verified Researchers</p>
            <h2 className="text-3xl font-bold">Trusted in labs that don&apos;t tolerate guesswork.</h2>
            <p className="text-[#888] mt-2">4.9 / 5 · 1,284 verified reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Lot-to-lot consistency that we can actually plot. The COAs are the most thorough I've seen from a private supplier.", author: "Dr. Marin K.", role: "Postdoc, Cell Biology" },
              { quote: "Ordering, verification, and shipping are seamless. The Trusted Labs delivery saved me a half-day of paperwork.", author: "Lena Q.", role: "Independent Researcher" },
              { quote: "I trust the documentation. That's the whole game. GHK treats QC like the deliverable, not the afterthought.", author: "Dr. P. Okafor", role: "Principal Investigator" },
            ].map((review) => (
              <div key={review.author} className="bg-[#141414] rounded-xl p-6 border border-[#222]">
                <p className="text-[#ccc] text-sm leading-relaxed italic">&quot;{review.quote}&quot;</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">{review.author}</p>
                  <p className="text-[#888] text-xs">{review.role}</p>
                  <p className="text-[#00d4aa] text-xs mt-1">Verified buyer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked.</h2>
          <div className="space-y-4">
            {[
              { q: "What purity level are your compounds and how is it verified?", a: "All compounds meet a minimum 99% purity threshold, verified by RP-HPLC and confirmed by mass spectrometry. Results are published on the COA tied to each lot." },
              { q: "What is a Certificate of Analysis (COA) and how do I read it?", a: "A COA is a document issued by an independent Glyvantix-accredited laboratory detailing identity, purity, sterility, endotoxin, and fentanyl screen results for a specific lot. Each COA is linked from the product page." },
              { q: "How should I store the lyophilized product?", a: "Store lyophilized peptides at -20°C for long-term stability. Short-term storage at 2-8°C is acceptable for up to 6 months. Avoid repeated freeze-thaw cycles." },
              { q: "How long is the lyophilized product stable?", a: "When stored properly at -20°C, lyophilized peptides are stable for a minimum of 24 months from date of manufacture. Stability data is included on each COA." },
              { q: "How fast do you ship and is cold shipping required?", a: "Orders ship same-day via Trusted Labs if placed before 2pm GMT. Temperature-sensitive compounds ship with insulated packaging and gel packs. Standard UK delivery is 2-3 business days." },
              { q: "What payment methods do you accept?", a: "We accept Alipay, bank transfer (BACS/CHAPS), and cryptocurrency (BTC, ETH, USDT). All payments are processed securely." },
              { q: "Can I buy a box of 10 vials?", a: "Yes — all products are available as single vials or in boxes of 10. Box pricing offers a 10% discount on the per-vial cost." },
              { q: "Are these compounds for human use?", a: "No. All products are sold strictly for in-vitro laboratory research. They are not for human or veterinary use, not for diagnostic procedures, and have not been evaluated by the MHRA or FDA." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-[#141414] rounded-xl border border-[#222] overflow-hidden">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-sm flex items-center justify-between hover:text-[#00d4aa] transition">
                  {faq.q}
                  <span className="text-[#00d4aa] group-open:rotate-45 transition-transform text-lg ml-4">+</span>
                </summary>
                <div className="px-6 pb-4 text-[#888] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0d0d0d] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-[#00d4aa] text-sm font-medium mb-2">The Testing Protocol</p>
            <h2 className="text-3xl font-bold">Eight stages before a vial leaves the building.</h2>
            <p className="text-[#888] mt-3">A documented, repeatable verification pipeline applied to every single lot.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Synthesis", desc: "Solid-phase synthesis under controlled conditions." },
              { num: "02", title: "Identity (LC-MS)", desc: "Mass spectrometry confirms molecular weight and sequence." },
              { num: "03", title: "Purity (HPLC)", desc: "Quantitative analysis verifies ≥99% chromatographic purity." },
              { num: "04", title: "Sterility & Endotoxin", desc: "Validated screens guard against contamination." },
              { num: "05", title: "Stability", desc: "Accelerated and real-time stability across the shelf life." },
              { num: "06", title: "Consistency", desc: "Tolerance windows enforced batch-to-batch." },
              { num: "07", title: "Documentation", desc: "Every result published in a lot-specific COA." },
              { num: "08", title: "Release", desc: "Independent Glyvantix lab signs off before dispatch." },
            ].map((step) => (
              <div key={step.num} className="bg-[#141414] rounded-xl p-5 border border-[#222]">
                <span className="text-[#00d4aa] font-bold">{step.num}</span>
                <h4 className="font-semibold text-sm mt-2">{step.title}</h4>
                <p className="text-[#888] text-xs mt-1">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 flex gap-4 justify-center">
            <Link href="/quality" className="text-[#00d4aa] text-sm hover:underline">Read the full protocol</Link>
            <Link href="/verify" className="text-[#00d4aa] text-sm hover:underline">Verify a batch by lot number</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
