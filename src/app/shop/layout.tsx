import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Research Compounds',
  description:
    'Browse documented research compounds and laboratory accessories with lot references and batch documentation.',
  alternates: {
    canonical: 'https://ghkpep.com/shop',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Shop Research Compounds | GHKpep UK',
    description:
      'Browse documented research compounds and laboratory accessories with lot references and batch documentation.',
    url: 'https://ghkpep.com/shop',
    images: [
      {
        url: '/images/hero-lab.png',
        width: 1200,
        height: 630,
        alt: 'GHKpep research compounds catalog',
      },
    ],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
