import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Research Compounds',
  description:
    'Browse documented research compounds and laboratory accessories with lot references and batch documentation.',
  alternates: {
    canonical: 'https://www.ghkpep.com/shop',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Shop Research Compounds | GHK Peptides',
    description:
      'Browse documented research compounds and laboratory accessories with lot references and batch documentation.',
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
