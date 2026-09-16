import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Research Peptides UK',
  description:
    'Browse GHK-Cu peptides and documented research compounds supplied in the UK, with lot references, batch documentation and certificates of analysis.',
  alternates: {
    canonical: 'https://www.ghkpep.com/shop',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Shop Research Peptides UK | GHK Peptides',
    description:
      'Browse GHK-Cu peptides and documented research compounds supplied in the UK, with lot references and batch documentation.',
    url: 'https://www.ghkpep.com/shop',
    images: [
      {
            url: '/images/box10.jpeg',
        width: 1200,
        height: 630,
        alt: 'GHK Peptides research compounds catalog',
      },
    ],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
