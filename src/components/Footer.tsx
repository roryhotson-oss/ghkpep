'use client';

import Link from 'next/link';

type FooterMenu = {
  title: string;
  blurb?: string;
  links?: { label: string; href: string }[];
};

const footerMenus: FooterMenu[] = [
  {
    title: 'GHK Peptides',
    blurb:
      'Documented research peptides with supplier batch references. UK based ordering and support; material manufactured by third-party laboratories in China.',
  },
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Recovery', href: '/shop?cat=recovery' },
      { label: 'Longevity', href: '/shop?cat=longevity' },
      { label: 'Metabolic', href: '/shop?cat=metabolic' },
      { label: 'Cognitive', href: '/shop?cat=cognitive' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Testing', href: '/testing' },
      { label: 'Peptide News', href: '/news' },
      { label: 'Sourcing & Review', href: '/quality' },
      { label: 'Batch References', href: '/coa' },
      { label: 'Search Janoshik Reports', href: '/coa#janoshik' },
      { label: 'Check a Lot Reference', href: '/verify' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About GHK', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'support@ghkpep.com', href: 'mailto:support@ghkpep.com' },
      { label: 'orders@ghkpep.com', href: 'mailto:orders@ghkpep.com' },
      { label: 'privacy@ghkpep.com', href: 'mailto:privacy@ghkpep.com' },
      { label: 'Contact Form', href: '/contact' },
    ],
  },
];

const badgePillClass =
  'inline-flex items-center gap-2 px-3 py-2 bg-[#0c1622] border border-[#FBFAF7]/80 rounded-full text-[#e6edf3] text-[10px] font-bold tracking-wide transition hover:bg-[#dce5ea] hover:text-[#0c1622]';

const partnerBadges: { label: string; href: string; external?: boolean }[] = [
  { label: 'BCOYLAD RESEARCH', href: '/about' },
  { label: 'MANUFACTURED IN CHINA', href: '/quality' },
];

const finnrickListings: { label: string; href: string }[] = [
  { label: 'HK Peptides · BPC-157', href: 'https://www.finnrick.com/products/bpc-157/vendors/hk-peptides' },
  { label: 'Guangzhou Jeep Biotechnology', href: 'https://www.finnrick.com/vendors/guangzhou-jeep-biotechnology-jeep' },
  { label: 'Nanjing Xiyuxun Technology (XYX)', href: 'https://www.finnrick.com/vendors/nanjing-xiyuxun-technology-xyx' },
  { label: 'Lejian Biotech', href: 'https://www.finnrick.com/vendors/lejian-biotech-peptide' },
];

export default function Footer() {
  return (
    <footer className="text-[#17212b] bg-[#c7e8f5] border-2 border-[#3d515a] mt-20">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#e3f5fb] border-2 border-[#3d515a] rounded-2xl p-8 sm:p-12 text-center shadow-[0_10px_24px_rgba(20,28,40,0.14)]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            All the research compounds you need, with the peace of mind and research community at your fingertips.
          </h2>
          <p className="max-w-2xl mx-auto text-[#34414a] leading-relaxed">
            Looking for a specific vial? Let us know and we will check whether it can be sourced for your lawful laboratory research.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-8 py-3 bg-[#b6ddeb] border-2 border-[#3d515a] text-[#17212b] font-semibold rounded-xl hover:bg-[#d7f0f8] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-[#3d515a]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm items-start">
          {footerMenus.map((menu) => (
            <details key={menu.title} className="group w-full">
              <summary className="flex cursor-pointer list-none [&::-webkit-details-marker]:hidden items-center justify-between gap-3 rounded-lg border-2 border-[#3d515a] bg-[#b6ddeb] px-4 py-2.5 font-semibold text-[#17212b] shadow-sm transition hover:bg-[#d7f0f8]">
                {menu.title}
                <span className="text-[#8298aa] text-lg leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-2 rounded-lg border-2 border-[#3d515a] bg-[#d7f0f8] p-4">
                {menu.blurb ? (
                  <p className="text-[#34414a] text-xs leading-relaxed">{menu.blurb}</p>
                ) : (
                    <ul className="space-y-2 text-[#34414a]">
                    {menu.links?.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith('mailto:') ? (
                          <a href={link.href} className="text-xs hover:text-[#8298aa] transition">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className="hover:text-[#8298aa] transition">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#5a6b72]">
        <div>
          <h4 className="font-bold text-[#8298aa] mb-2">Trade &amp; partners</h4>
          <div className="flex flex-wrap items-center gap-2">
            {partnerBadges.map((badge) =>
              badge.external ? (
                <a
                  key={badge.label}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={badgePillClass}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {badge.label}
                </a>
              ) : (
                <Link key={badge.label} href={badge.href} className={badgePillClass}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {badge.label}
                </Link>
              )
            )}
          </div>
          <p className="text-[#7b898e] text-[11px] leading-relaxed mt-2 max-w-3xl">
            Material is manufactured by third-party laboratories in China and shipped from there.
            Trade and research badges refer to supply and research arrangements only; they are not
            quality, accreditation, or regulatory approvals of any product.
          </p>

          <div className="mt-6">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#7b898e]">
              Finnrick listings
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {finnrickListings.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center px-3 py-2 bg-[#3d515a] border border-[#6d8792] rounded-lg text-[11px] font-medium text-[#d7e3e7] hover:text-white hover:bg-[#46606a] transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="text-[#7b898e] text-[11px] leading-relaxed mt-2 max-w-3xl">
              Finnrick is an independent third-party review site with no affiliation to GHK
              Peptides. Listings are published by Finnrick and are not endorsements by us, nor
              confirmation of any product claim.
            </p>
          </div>
        </div>
      </div>

      {/* Payment methods & bottom bar */}
      <div className="border-t border-[#5a6b72] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#7b898e] text-xs">
              © 2026 GHK Peptides. All rights reserved. Research compounds for in vitro laboratory use only.
            </p>
            <div className="flex items-center gap-4 text-[#7b898e] text-xs">
              <span>Payment:</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#111d2c] rounded text-[10px] font-medium">Alipay</span>
                <span className="px-2 py-1 bg-[#111d2c] rounded text-[10px] font-medium">Bank Transfer</span>
                <span className="px-2 py-1 bg-[#111d2c] rounded text-[10px] font-medium">Crypto (BTC/ETH/USDT)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#7b898e] text-xs">
              <span>Shipped via</span>
              <span className="px-2 py-1 bg-[#111d2c] rounded text-[10px] font-bold text-[#8298aa]">Trusted Labs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center border-t border-[#FBFAF7]/70 pt-4">
        <Link
          href="/admin/login"
          className="text-[#8298aa] text-xs hover:underline"
        >
          Admin Dashboard - Login
        </Link>
      </div>
    </footer>
  );
}
