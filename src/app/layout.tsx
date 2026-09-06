import type { Metadata, Viewport } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';
import AnalyticsPrivacy from '@/components/AnalyticsPrivacy';
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
  metadataBase: new URL('https://www.ghkpep.com'),
  title: {
    default: 'GHK Peptides | Research Peptides & Laboratory Compounds',
    template: '%s | GHK Peptides',
  },
  description: 'GHK Peptides supplies documented research peptides and laboratory compounds for in vitro research use in the UK, with lot references and clear product information.',
  keywords: [
    'research peptides UK',
    'BPC-157 UK',
    'GHK-Cu research compound',
    'laboratory research compounds UK',
    'research peptide supplier UK',
    'batch documented research material',
    'MOTS-c peptide',
    'NAD+ peptide',
    'Tesamorelin UK',
    'TB-500 UK',
    'peptide suppliers UK',
    'documented research peptides',
  ],
  authors: [{ name: 'GHK Peptides', url: 'https://www.ghkpep.com' }],
  creator: 'GHK Peptides',
  publisher: 'GHK Peptides',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.ghkpep.com',
    siteName: 'GHK Peptides',
    title: 'GHK Peptides | Research Peptides & Laboratory Compounds',
    description: 'GHK Peptides supplies documented research peptides and laboratory compounds for in vitro research use in the UK, with lot references and clear product information.',
    images: [
      {
        url: '/images/box10.jpeg',
        width: 1200,
        height: 630,
        alt: 'GHK Peptides - Research compounds and peptide documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GHK Peptides | Research Peptides & Laboratory Compounds',
    description: 'Documented research peptides and laboratory compounds for in vitro research use in the UK.',
    images: ['/images/box10.jpeg'],
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
    canonical: 'https://www.ghkpep.com',
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
        <AnalyticsPrivacy />
      </body>
    </html>
  );
}
