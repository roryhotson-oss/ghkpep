import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#222] mt-20">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0a2a22] to-[#0a1a2a] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            All the research compounds you need, with the peace of mind and research community at your fingertips.
          </h2>
          <Link
            href="/shop"
            className="inline-block mt-6 px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1a1a1a]">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2">Research updates from GHK</h3>
          <p className="text-[#888] text-sm">Subscribe for catalog updates, new research compounds, and quality documentation news.</p>
        </div>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-[#141414] border border-[#222] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00d4aa]"
          />
          <button className="px-6 py-2 bg-[#00d4aa] text-black font-semibold rounded-lg text-sm hover:bg-[#00b894] transition">
            Subscribe
          </button>
        </div>
        <p className="text-center text-[#666] text-xs mt-3">For researchers and labs. No spam, unsubscribe anytime.</p>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1a1a1a]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-[#00d4aa] mb-4">GHK</h4>
            <p className="text-[#888] text-xs leading-relaxed">
              Reference-grade research peptides with independent ISO 17025 testing. UK-based supplier for laboratory research.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/shop" className="hover:text-[#00d4aa] transition">All Products</Link></li>
              <li><Link href="/shop?cat=recovery" className="hover:text-[#00d4aa] transition">Recovery</Link></li>
              <li><Link href="/shop?cat=longevity" className="hover:text-[#00d4aa] transition">Longevity</Link></li>
              <li><Link href="/shop?cat=metabolic" className="hover:text-[#00d4aa] transition">Metabolic</Link></li>
              <li><Link href="/shop?cat=cognitive" className="hover:text-[#00d4aa] transition">Cognitive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/testing" className="hover:text-[#00d4aa] transition">Testing Standards</Link></li>
              <li><Link href="/quality" className="hover:text-[#00d4aa] transition">Quality Assurance</Link></li>
              <li><Link href="/coa" className="hover:text-[#00d4aa] transition">Certificates of Analysis</Link></li>
              <li><Link href="/verify" className="hover:text-[#00d4aa] transition">Verify a Batch</Link></li>
              <li><Link href="/shipping" className="hover:text-[#00d4aa] transition">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-[#00d4aa] transition">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-[#888]">
              <li><Link href="/about" className="hover:text-[#00d4aa] transition">About GHK</Link></li>
              <li><Link href="/contact" className="hover:text-[#00d4aa] transition">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-[#00d4aa] transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00d4aa] transition">Privacy Policy</Link></li>
              <li>
                <a href="https://wa.me/447XXXXXXXXX" target="_blank" rel="noopener" className="hover:text-[#00d4aa] transition flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment methods & bottom bar */}
      <div className="border-t border-[#1a1a1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#666] text-xs">
              © 2026 GHK. All rights reserved. Research compounds for in-vitro laboratory use only.
            </p>
            <div className="flex items-center gap-4 text-[#666] text-xs">
              <span>Payment:</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Alipay</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Bank Transfer</span>
                <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-medium">Crypto (BTC/ETH/USDT)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#666] text-xs">
              <span>Shipped via</span>
              <span className="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] font-bold text-[#00d4aa]">Trusted Labs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
