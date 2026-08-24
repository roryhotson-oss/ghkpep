import Image from 'next/image';
import Link from 'next/link';
import { getCommerceProducts } from '@/lib/commerce-store';
import QuickAddToCart from '@/components/QuickAddToCart';

export default async function HomeCatalog() {
  const products = await getCommerceProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[#253234]">
      <section className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-2xl border border-[#c8d5d3] mb-12 shadow-sm">
        <Image src="/images/hero-lab.png" alt="GHKpep laboratory research workspace" fill priority className="object-cover object-center opacity-75" sizes="(max-width: 768px) 100vw, 1200px" />
        <div className="absolute inset-0 bg-[#173b3b]/42" />
        <div className="relative z-10 flex min-h-[300px] sm:min-h-[360px] flex-col justify-end p-6 sm:p-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="text-[#afc0ca] text-sm font-semibold">GHKpep</p>
            <a href="https://uk-rscs.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#173b3b]/65 border border-[#b7eee1]/60 rounded-full text-[#d8fff7] text-[10px] font-bold tracking-wide hover:bg-[#b7eee1] hover:text-[#173b3b] transition">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              AUDITED · UK-RSCS.ORG
            </a>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Research compounds.</h1>
          <p className="text-[#effaf8] mt-3 max-w-xl">Documented research compounds and laboratory accessories, independently tested and ready for straightforward ordering.</p>
          <div className="flex flex-wrap gap-3 mt-6 text-xs font-semibold text-white">
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Independent testing</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Batch test report for every lot</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Tracked shipping</span>
          </div>
        </div>
      </section>

        <header className="mb-8">
          <p className="text-[#596b6d]">Browse the full catalog. Purchase individual vials or boxes of 10 where applicable. All prices in GBP.</p>
      </header>

      <div className="overflow-x-auto bg-[#f5f8f7] border border-[#c8d5d3] rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#d6e1df] text-[#596b6d]">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Documentation</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">Test report</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="group border-b border-[#d6e1df] last:border-0 hover:bg-[#eaf2f0] transition">
                <td className="px-4 py-3 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <Image src={product.image} alt={product.name} width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-[#657c8f] object-cover bg-[#e3ecea] shrink-0" />
                    <div className="min-w-0">
                      <Link href={`/shop/${product.slug}`} className="font-medium text-[#172324] hover:text-[#087f6b] transition">{product.name}</Link>
                      <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#7b898e] md:opacity-0 md:translate-y-1 md:transition-all md:duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#a7b0b2] whitespace-nowrap">{product.categoryLabel}</td>
                <td className="px-4 py-3 text-[#8298aa] whitespace-nowrap">Report available</td>
                <td className="px-4 py-3 text-[#253234] whitespace-nowrap">£{product.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <a href={`/api/coa?lot=${encodeURIComponent(product.lot)}`} target="_blank" rel="noreferrer" className="text-[#8298aa] hover:underline">View PDF</a>
                    <QuickAddToCart product={product} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/shop" className="px-5 py-2.5 bg-[#8298aa]/20 border border-[#8298aa] text-[#d8e2e8] font-semibold rounded-lg shadow-sm hover:bg-[#8298aa]/35 transition">View full catalog</Link>
        <Link href="/testing" className="px-5 py-2.5 bg-[#1b2731] border border-[#657c8f] text-[#d8e2e8] rounded-lg shadow-sm hover:bg-[#263744] hover:border-[#a6b8c4] transition">Testing standards</Link>
      </div>
    </div>
  );
}
