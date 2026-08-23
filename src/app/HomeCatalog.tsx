import Image from 'next/image';
import Link from 'next/link';
import { getCommerceProducts } from '@/lib/commerce-store';
import QuickAddToCart from '@/components/QuickAddToCart';

export default async function HomeCatalog() {
  const products = await getCommerceProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-2xl border border-[#2b3538] mb-12">
        <Image src="/images/hero-lab.png" alt="GHKpep laboratory research workspace" fill priority className="object-cover object-center opacity-60" sizes="(max-width: 768px) 100vw, 1200px" />
        <div className="absolute inset-0 bg-[#07121c]/65" />
        <div className="relative z-10 flex min-h-[300px] sm:min-h-[360px] flex-col justify-end p-6 sm:p-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="text-[#63e6c6] text-sm font-semibold">GHKpep</p>
            <a href="https://uk-rscs.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#07121c]/80 border border-[#63e6c6]/50 rounded-full text-[#63e6c6] text-[10px] font-bold tracking-wide hover:bg-[#63e6c6] hover:text-black transition">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              AUDITED · UK-RSCS.ORG
            </a>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Research compounds.</h1>
          <p className="text-[#d4e1e7] mt-3 max-w-xl">Documented research compounds and laboratory accessories, independently tested and ready for straightforward ordering.</p>
          <div className="flex flex-wrap gap-3 mt-6 text-xs font-semibold text-white">
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Independent testing</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">COA for every batch</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Tracked shipping</span>
          </div>
        </div>
      </section>

      <header className="mb-8">
          <p className="text-[#a7b0b2]">Browse the full catalog. Purchase individual vials or boxes of 10 where applicable. All prices in GBP.</p>
      </header>

      <div className="overflow-x-auto bg-[#141414] border border-[#2b3538] rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#2b3538] text-[#a7b0b2]">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Documentation</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">COA</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="group border-b border-[#2b3538] last:border-0 hover:bg-[#1a1a1a] transition">
                <td className="px-4 py-3 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <Image src={product.image} alt={product.name} width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#1a1a1a] shrink-0" />
                    <div className="min-w-0">
                      <Link href={`/shop/${product.slug}`} className="font-medium text-white hover:text-[#21c7a5] transition">{product.name}</Link>
                      <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#7b898e] md:opacity-0 md:translate-y-1 md:transition-all md:duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#a7b0b2] whitespace-nowrap">{product.categoryLabel}</td>
                <td className="px-4 py-3 text-[#21c7a5] whitespace-nowrap">COA available</td>
                <td className="px-4 py-3 text-white whitespace-nowrap">£{product.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <a href={`/api/coa?lot=${encodeURIComponent(product.lot)}`} target="_blank" rel="noreferrer" className="text-[#21c7a5] hover:underline">View PDF</a>
                    <QuickAddToCart product={product} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/shop" className="px-5 py-2.5 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition">View full catalog</Link>
        <Link href="/testing" className="px-5 py-2.5 border border-[#333] text-[#e1e7e5] rounded-lg hover:border-[#21c7a5] hover:text-[#21c7a5] transition">Testing standards</Link>
      </div>
    </div>
  );
}
