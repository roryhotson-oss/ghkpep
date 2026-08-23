import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';

export default function HomeCatalogTableSection({ products }: { products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="overflow-x-auto bg-[#141414] border border-[#2b3538] rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#2b3538] text-[#a7b0b2]">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Purity</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">COA</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-b border-[#2b3538] last:border-0 hover:bg-[#1a1a1a] transition">
                <td className="px-4 py-3 min-w-[240px]">
                  <Link href={`/shop/${product.slug}`} className="flex items-center gap-3 group">
                    <Image src={product.image} alt={product.name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover bg-[#1a1a1a]" />
                    <span className="font-medium text-white group-hover:text-[#21c7a5] transition">{product.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#a7b0b2] whitespace-nowrap">{product.categoryLabel}</td>
                <td className="px-4 py-3 text-[#21c7a5] whitespace-nowrap">{product.purity}</td>
                <td className="px-4 py-3 text-white whitespace-nowrap">£{product.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a href={`/coas/COA-${product.slug}-${product.lot}.pdf`} target="_blank" rel="noreferrer" className="text-[#21c7a5] hover:underline">View PDF</a>
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
    </section>
  );
}
