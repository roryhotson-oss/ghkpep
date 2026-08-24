import type { Metadata, Viewport } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import FooterConditional from '@/components/FooterConditional';
import StructuredData from '@/components/StructuredData';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8298aa',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ghkpep.com'),
  title: {
    default: 'GHKpep UK | Research Peptides, BPC-157, GHK-Cu',
    template: '%s | GHKpep UK',
  },
  description: 'GHKpep supplies documented research compounds for in vitro laboratory use, with independent testing and free discreet tracked shipping.',
  keywords: [
    'research peptides UK',
    'BPC-157 UK',
    'GHK-Cu research compound',
    'laboratory research compounds UK',
    'MOTS-c peptide',
    'NAD+ peptide',
    'Tesamorelin UK',
    'TB-500 UK',
    'peptide suppliers UK',
    'independently tested peptides',
    'documented research peptides',
  ],
  authors: [{ name: 'GHKpep', url: 'https://ghkpep.com' }],
  creator: 'GHKpep',
  publisher: 'GHKpep',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ghkpep.com',
    siteName: 'GHKpep UK',
    title: 'GHKpep UK | Research Peptides',
    description: 'GHKpep supplies documented research compounds for in vitro laboratory use, with independent testing and free discreet tracked shipping.',
    images: [
      {
        url: '/images/hero-lab.png',
        width: 1200,
        height: 630,
        alt: 'GHK Peptides UK - Premium Research Peptides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GHKpep UK | Research Peptides',
    description: 'Documented research compounds with independent testing and free discreet tracked shipping.',
    images: ['/images/hero-lab.png'],
    creator: '@ghkpeptides',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  alternates: {
    canonical: 'https://ghkpep.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="canonical" href="https://ghkpep.com" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="geo.position" content="54.702354;-3.276575" />
        <meta name="ICBM" content="54.702354, -3.276575" />
      </head>
      <body>
        <StructuredData />
        <SiteChrome />
        <main><ErrorBoundary>{children}</ErrorBoundary></main>
        <FooterConditional />
      </body>
    </html>
  );
}
