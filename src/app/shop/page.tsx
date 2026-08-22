import Link from 'next/link';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#00d4aa] text-sm font-medium mb-2">Reference-Grade Catalog</p>
          <h1 className="text-3xl font-bold">Research Compounds</h1>
          <p className="text-[#888] mt-3 max-w-2xl">
            Every vial is independently tested and accompanied by a downloadable certificate of analysis. All prices in GBP. Box of 10 vials available.
          </p>
          <p className="text-[#888] text-sm mt-2">{products.length} in catalog</p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#222]">
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/shop" className="px-4 py-2 bg-[#00d4aa] text-black rounded-full font-medium">All</Link>
          <Link href="/shop?cat=recovery" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Tissue &amp; Matrix</Link>
          <Link href="/shop?cat=cognitive" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Neuro Research</Link>
          <Link href="/shop?cat=longevity" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Mitochondrial &amp; Cellular</Link>
          <Link href="/shop?cat=metabolic" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Incretin &amp; Amylin</Link>
          <Link href="/shop?cat=blend" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Research Blends</Link>
          <Link href="/shop?cat=accessories" className="px-4 py-2 bg-[#141414] text-[#ccc] rounded-full hover:border-[#00d4aa] border border-[#222] transition">Accessories</Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group bg-[#141414] rounded-xl p-4 border border-[#222] hover:border-[#00d4aa]/30 transition card-glow"
            >
              <div className="aspect-square bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                <span className="text-4xl">🧪</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#0a2a22] text-[#00d4aa] rounded-full font-medium">
                  {product.purity}
                </span>
              </div>
              <p className="text-[#888] text-xs">{product.categoryLabel}</p>
              <h3 className="font-semibold text-sm mt-1 group-hover:text-[#00d4aa] transition line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[#666] text-xs mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">From £{product.price.toFixed(2)}</p>
                  <p className="text-[#666] text-xs">Box of 10: £{product.boxPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-[#00d4aa] text-xs font-medium group-hover:underline">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
