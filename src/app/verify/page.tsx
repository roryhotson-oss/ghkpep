import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#2b3538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#21c7a5] text-sm font-medium mb-2">Authenticity Check</p>
          <h1 className="text-3xl font-bold">Verify your lot.</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">Enter the lot number printed on your vial label to pull up the independently-issued certificate of analysis.</p>
        </div>
      </section>

      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter lot number (e.g. GHK-2419-A)"
            className="flex-1 bg-[#141414] border border-[#2b3538] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#21c7a5]"
          />
          <button className="px-6 py-3 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition text-sm">
            Verify
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">How to read your certificate</h2>
          <div className="space-y-4">
            {[
              { title: "Identity", desc: "Mass spectrum confirming the exact molecular weight of the synthesized compound." },
              { title: "Purity", desc: "RP-HPLC chromatogram with the integrated area-% for the target and any quantifiable impurities." },
              { title: "Contaminants", desc: "LAL endotoxin, sterility, fentanyl screen, and water content." },
              { title: "Provenance", desc: "Lot number, synthesis date, test date, signing analyst, and the accredited lab's certificate number." },
            ].map((item) => (
              <div key={item.title} className="bg-[#141414] rounded-xl p-5 border border-[#2b3538]">
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-[#a7b0b2] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/coa" className="text-[#21c7a5] text-sm hover:underline">Browse all COAs</Link>
          <Link href="/testing" className="text-[#21c7a5] text-sm hover:underline">See testing methods</Link>
        </div>
      </section>
    </div>
  );
}
