import Image from 'next/image';
import Link from 'next/link';
import { getCommerceProducts } from '@/lib/commerce-store';
import QuickAddToCart from '@/components/QuickAddToCart';
import GroupedCatalogRow from '@/components/GroupedCatalogRow';
import { effectivePrice } from '@/lib/pricing';
import { groupProducts, isProductGroup } from '@/lib/productGroups';

export default async function HomeCatalog() {
  const products = await getCommerceProducts();
  const displayProducts = groupProducts(products);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden rounded-3xl border-4 border-[#FBFAF7] bg-[#0c1622] mb-12 shadow-md">
        <Image
          src="/images/shop-hero.jpg"
          alt="Box of 10 GHK Peptides research vials"
          fill
          priority
          quality={95}
          className="object-cover object-right"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07121c] via-[#07121c]/85 to-transparent" />
        <div className="relative z-10 flex min-h-[380px] sm:min-h-[480px] flex-col justify-end p-6 sm:p-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div>
              <p className="text-[#e6edf3] text-sm font-semibold">GHK PEPTIDES</p>
              <p className="text-[#e6edf3] text-xs font-medium mt-1">Peptides UK · Direct · Wholesale</p>
            </div>
          </div>
          <p className="text-[#effaf8] mt-3 max-w-xl">Research compounds and laboratory accessories, supplied with the batch documentation we hold, for straightforward ordering.</p>
          <div className="flex flex-wrap gap-3 mt-6 text-xs font-semibold text-white">
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Third-party reports where available</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Lot reference on every batch</span>
            <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15">Tracked shipping</span>
          </div>
        </div>
      </section>

        <header className="mb-8">
          <p className="text-[#414d5c]">Browse the full catalog. Prices shown are for boxes of 10 where applicable. All prices in GBP.</p>
      </header>

      <div className="overflow-x-auto bg-[#e9f1f8] border border-[#b2c6db] rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#bccfe2] text-[#243a50]">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Documentation</th>
              <th className="px-4 py-3 font-medium">Box of 10</th>
              <th className="px-4 py-3 font-medium">Lot reference</th>
            </tr>
          </thead>
          <tbody>
            {displayProducts.map((entry) => {
              if (isProductGroup(entry)) {
                return <GroupedCatalogRow key={entry.key} group={entry} />;
              }
              const product = entry;
              return (
              <tr key={product.slug} className="group relative border-b border-[#bccfe2] last:border-0 hover:bg-[#d9e6f2] hover:shadow-lg hover:scale-[1.01] hover:z-10 transition text-[#243a50]">
                <td className="px-4 py-3 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <Image src={product.image} alt={product.name} width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-[#FBFAF7]/70 object-cover bg-[#dce7f2] shrink-0" />
                    <div className="min-w-0">
                      <Link href={`/shop/${product.slug}`} className="font-medium text-[#1c2c3e] hover:text-[#3E6B93] transition">{product.name}</Link>
                      <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#6e8299] md:opacity-0 md:translate-y-1 md:transition-all md:duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">{product.categoryLabel}</td>
                <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">Lot reference held</td>
                <td className="px-4 py-3 text-[#243a50] whitespace-nowrap">£{effectivePrice(product, 'box', product.dosageOptions?.includes(10) ? 10 : product.dosageOptions?.[0]).toFixed(2)} <span className="text-xs font-medium">(10 vials)</span></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <a href={`/api/coa?lot=${encodeURIComponent(product.lot)}`} target="_blank" rel="noreferrer" className="text-[#8298aa] hover:underline">Summary PDF</a>
                    <QuickAddToCart product={product} />
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/shop" className="px-5 py-2.5 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl shadow-md hover:bg-[#16283c] transition">View full catalog</Link>
        <Link href="/testing" className="px-5 py-2.5 bg-[#0c1622] border border-[#FBFAF7] text-[#e6edf3] rounded-lg shadow-sm hover:bg-[#16283c] transition">Testing documentation</Link>
      </div>
      </div>
    </div>
  );
}
