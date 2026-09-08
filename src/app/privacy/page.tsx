export default function PrivacyPage() {
  return (
    <div>
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Privacy</p>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-[#a7b0b2] mt-3">Last updated August 2026. How GHK collects, uses, and protects information.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8 text-[#e1e7e5] text-sm leading-relaxed">
          <p>This page describes how GHK handles information collected through this website. By using the site you agree to the practices described here.</p>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Information we collect</h2>
            <p>Account details you provide (name, email, shipping address), order history, payment metadata processed by our payments processor, and standard server/analytics logs (IP, browser, referrer).</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">How we use it</h2>
            <p>To process and ship your orders, support your account, respond to inquiries, prevent fraud, and improve the site. We do not sell personal data.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Subprocessors</h2>
            <p>We use third party services for payments (Alipay, crypto processors), email, analytics, shipping (Trusted Labs), and infrastructure. Each is contractually bound to handle data only as we direct.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Cookies</h2>
            <p>We use first-party cookies for sessions and cart, and limited analytics cookies to understand site usage. You can disable cookies in your browser; some features may not work as a result.</p>
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#3d515a]">
                  <th className="text-left py-2 pr-4 text-[#8298aa]">Cookie</th>
                  <th className="text-left py-2 pr-4 text-[#8298aa]">Purpose</th>
                  <th className="text-left py-2 text-[#8298aa]">Duration</th>
                </tr>
              </thead>
              <tbody className="text-[#a7b0b2]">
                <tr className="border-b border-[#3d515a]/50">
                  <td className="py-2 pr-4">ghk-age-gate</td>
                  <td className="py-2 pr-4">Remembers that you have confirmed the age gate</td>
                  <td className="py-2">30 days</td>
                </tr>
                <tr className="border-b border-[#3d515a]/50">
                  <td className="py-2 pr-4">ghk-cookie-consent</td>
                  <td className="py-2 pr-4">Stores your cookie consent choice</td>
                  <td className="py-2">Persistent</td>
                </tr>
                <tr className="border-b border-[#3d515a]/50">
                  <td className="py-2 pr-4">va-disable</td>
                  <td className="py-2 pr-4">Disables Vercel Analytics when consent is denied</td>
                  <td className="py-2">Persistent</td>
                </tr>
                <tr className="border-b border-[#3d515a]/50">
                  <td className="py-2 pr-4">admin_session</td>
                  <td className="py-2 pr-4">Admin panel authentication (admin users only)</td>
                  <td className="py-2">24 hours</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">sb-*-auth-token</td>
                  <td className="py-2 pr-4">Supabase user authentication (logged-in users only)</td>
                  <td className="py-2">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Retention</h2>
            <p>Order and account records are retained for as long as required by UK tax and consumer-protection law. Marketing data is retained until you unsubscribe.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Your rights (UK GDPR)</h2>
            <p>Under UK GDPR you have the right to access, rectify, erase, restrict processing, and data portability. You can request any of these by writing to privacy@ghkpep.com. We respond within 30 days.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Contact</h2>
            <p>Questions about this policy: <a href="mailto:privacy@ghkpep.com" className="text-[#8298aa] hover:underline">privacy@ghkpep.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
