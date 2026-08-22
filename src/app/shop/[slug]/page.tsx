import { products } from '@/data/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#888] mb-8">
          <Link href="/" className="hover:text-[#00d4aa]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#00d4aa]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[#ccc]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-[#141414] rounded-2xl border border-[#222] flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl">🧪</span>
                <p className="text-[#00d4aa] font-bold mt-4">GHK</p>
                <p className="text-[#888] text-sm">{product.name}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="aspect-square bg-[#141414] rounded-lg border border-[#222] flex items-center justify-center text-2xl">🧪</div>
              <div className="aspect-square bg-[#141414] rounded-lg border border-[#222] flex items-center justify-center text-2xl">📋</div>
              <div className="aspect-square bg-[#141414] rounded-lg border border-[#222] flex items-center justify-center text-2xl">📦</div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-3 py-1 bg-[#0a2a22] text-[#00d4aa] rounded-full font-medium">
                {product.purity} Purity
              </span>
              <span className="text-xs px-3 py-1 bg-[#141414] border border-[#222] text-[#888] rounded-full">
                Lot · {product.lot}
              </span>
            </div>

            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-[#888] mt-2">{product.categoryLabel}</p>
            <p className="text-[#ccc] mt-4 leading-relaxed">{product.description}</p>

            {/* Pricing */}
            <div className="mt-8 bg-[#141414] rounded-xl border border-[#222] p-6">
              <h3 className="font-semibold mb-4">Select Quantity</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#222] cursor-pointer hover:border-[#00d4aa]/30 transition">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="quantity" defaultChecked className="accent-[#00d4aa]" />
                    <div>
                      <p className="font-medium text-sm">1 Vial</p>
                      <p className="text-[#888] text-xs">{product.name}</p>
                    </div>
                  </div>
                  <span className="font-bold text-lg">£{product.price.toFixed(2)}</span>
                </label>
                <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#222] cursor-pointer hover:border-[#00d4aa]/30 transition">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="quantity" className="accent-[#00d4aa]" />
                    <div>
                      <p className="font-medium text-sm">Box of 10 Vials</p>
                      <p className="text-[#888] text-xs">10 × {product.name} · Save 10%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">£{product.boxPrice.toFixed(2)}</span>
                    <p className="text-[#00d4aa] text-xs">£{(product.price * 10 - product.boxPrice).toFixed(2)} saved</p>
                  </div>
                </label>
              </div>

              {/* Add to Cart */}
              <button className="w-full mt-6 px-8 py-4 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition text-lg">
                Add to Cart
              </button>

              {/* Payment methods */}
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#888]">
                <span>Pay with:</span>
                <span className="px-2 py-1 bg-[#222] rounded">Alipay</span>
                <span className="px-2 py-1 bg-[#222] rounded">Bank Transfer</span>
                <span className="px-2 py-1 bg-[#222] rounded">Crypto</span>
              </div>
            </div>

            {/* Product details */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-[#222]">
                <span className="text-[#888]">Purity</span>
                <span className="font-medium">{product.purity}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#222]">
                <span className="text-[#888]">Lot Number</span>
                <span className="font-medium">{product.lot}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#222]">
                <span className="text-[#888]">Format</span>
                <span className="font-medium">Lyophilized Powder</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#222]">
                <span className="text-[#888]">Storage</span>
                <span className="font-medium">-20°C</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#222]">
                <span className="text-[#888]">Shipping</span>
                <span className="font-medium">Trusted Labs · 2-3 days</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#888]">COA</span>
                <Link href="/coa" className="text-[#00d4aa] hover:underline">Download PDF</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/shop/${rp.slug}`}
                  className="group bg-[#141414] rounded-xl p-4 border border-[#222] hover:border-[#00d4aa]/30 transition card-glow"
                >
                  <div className="aspect-square bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-3">
                    <span className="text-3xl">🧪</span>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-[#00d4aa] transition">{rp.name}</h3>
                  <p className="text-[#888] text-xs mt-1">{rp.categoryLabel}</p>
                  <p className="text-white font-bold mt-2">£{rp.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
