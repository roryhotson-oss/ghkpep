export default function ContactPage() {
  return (
    <div>
      <section className="bg-[#0d0d0d] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#888] text-sm">Typically respond within 24 hours</p>
          <h1 className="text-3xl font-bold mt-2">How can we help?</h1>
          <p className="text-[#888] mt-3 max-w-2xl">Our research support team is here to assist with orders, product questions, and lab-to-lab inquiries.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
              <h3 className="font-bold mb-4">Get in touch</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[#888] block">Email</span>
                  <a href="mailto:support@ghkpep.com" className="text-[#00d4aa] hover:underline">support@ghkpep.com</a>
                </div>
                <div>
                  <span className="text-[#888] block">WhatsApp</span>
                  <a href="https://wa.me/447XXXXXXXXX" target="_blank" rel="noopener" className="text-[#00d4aa] hover:underline flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
                <div>
                  <span className="text-[#888] block">Hours</span>
                  <span className="text-[#ccc]">Mon–Fri · 9am–6pm GMT</span>
                </div>
                <div>
                  <span className="text-[#888] block">Headquarters</span>
                  <span className="text-[#ccc]">United Kingdom</span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
              <h3 className="font-bold mb-3">Payment Methods</h3>
              <div className="space-y-2 text-sm text-[#888]">
                <p>✓ Alipay</p>
                <p>✓ Bank Transfer (BACS/CHAPS)</p>
                <p>✓ Cryptocurrency (BTC, ETH, USDT)</p>
              </div>
            </div>

            <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
              <h3 className="font-bold mb-3">Shipping</h3>
              <p className="text-sm text-[#888]">All orders shipped via <span className="text-[#00d4aa] font-medium">Trusted Labs</span> — tracked, discreet, and insured.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-[#141414] rounded-xl p-6 sm:p-8 border border-[#222] space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Name</label>
                  <input type="text" className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4aa]" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-[#888] mb-1">Email</label>
                  <input type="email" className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4aa]" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Institution / Lab</label>
                <input type="text" className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4aa]" placeholder="Your institution (optional)" />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Subject</label>
                <input type="text" className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4aa]" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Message</label>
                <textarea rows={6} className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4aa] resize-none" placeholder="Tell us about your inquiry..."></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
