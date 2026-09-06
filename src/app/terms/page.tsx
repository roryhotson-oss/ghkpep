export default function TermsPage() {
  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Terms</p>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-[#a7b0b2] mt-3">Last updated August 2026. The terms that govern use of ghkpep.com and purchases from GHK.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8 text-[#e1e7e5] text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Eligibility</h2>
            <p>You must be at least 21 years of age and a qualified researcher purchasing for in vitro or laboratory use to access this site or place an order.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Research use only</h2>
            <p>All products are sold strictly for laboratory research. They are not for human or veterinary use, not for diagnostic procedures, and have not been evaluated by the MHRA or FDA. Misuse is the sole responsibility of the buyer.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Orders & pricing</h2>
            <p>All prices are displayed in GBP (£). We reserve the right to refuse, cancel, or limit any order. Prices may change without notice. Confirmed orders ship at the price displayed at the time of checkout. Boxes of 10 vials are priced at a 10% discount to individual vial pricing. Email <a href="mailto:sales@ghkpep.com" className="text-[#8298aa] hover:underline">sales@ghkpep.com</a> for full pricing.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Payment methods</h2>
            <p>We accept payment via Alipay, bank transfer (BACS/CHAPS), and cryptocurrency (BTC, ETH, USDT). Orders are processed once payment has been confirmed and cleared.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Shipping & risk of loss</h2>
            <p>All orders are shipped via Trusted Labs. Title and risk of loss pass to the buyer once the carrier accepts the package. Refer to our <a href="/shipping" className="text-[#8298aa] hover:underline">shipping</a> and <a href="/returns" className="text-[#8298aa] hover:underline">returns</a> policies for damage and lost-package handling.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Intellectual property</h2>
            <p>All site content — including text, images, batch reference documents, and product descriptions — is the property of GHK and may not be reproduced without permission.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Warranties</h2>
            <p>Products are sold AS-IS for laboratory research use. Any analytical documentation supplied with a lot is produced by the source laboratory or a third-party laboratory it engages, and is passed on unaltered. GHK does not carry out analytical testing, holds no laboratory accreditation, and gives no warranty as to the accuracy of documentation produced by others. No warranty, express or implied, applies beyond this.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Limitation of liability</h2>
            <p>To the maximum extent permitted by law, GHK is not liable for indirect, incidental, or consequential damages arising from use of the site or products. Total liability is limited to the amount paid for the order at issue.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Governing law</h2>
            <p>These terms are governed by the laws of England and Wales, without regard to conflict-of-laws principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Changes</h2>
            <p>We may update these terms from time to time. Continued use of the site after an update constitutes acceptance of the revised terms.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
