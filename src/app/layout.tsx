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
  themeColor: '#00d4aa',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ghkpep.com'),
  title: {
    default: 'GHK Peptides UK | Research Peptides, BPC-157, GHK-Cu | Next Day Delivery',
    template: '%s | GHK Peptides UK',
  },
  description: 'Buy premium research peptides in the UK. BPC-157, GHK-Cu, MOTS-c, NAD+ and more. Independently tested by Glyvantix Labs. Free UK shipping over £150. Same day dispatch.',
  keywords: [
    'research peptides UK',
    'buy peptides UK',
    'BPC-157 UK',
    'GHK-Cu peptide',
    'research chemicals UK',
    'peptides for sale UK',
    'MOTS-c peptide',
    'NAD+ peptide',
    'Tesamorelin UK',
    'TB-500 UK',
    'peptide suppliers UK',
    'next day peptide delivery',
    'independently tested peptides',
    'Glyvantix tested peptides',
  ],
  authors: [{ name: 'GHK Peptides', url: 'https://ghkpep.com' }],
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
    url: 'https://ghkpep.com',
    siteName: 'GHK Peptides UK',
    title: 'GHK Peptides UK | Premium Research Peptides | Next Day Delivery',
    description: 'Buy premium research peptides in the UK. Independently tested by Glyvantix Labs. Free UK shipping over £150. Same day dispatch.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GHK Peptides UK - Premium Research Peptides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GHK Peptides UK | Premium Research Peptides',
    description: 'Buy premium research peptides in the UK. Independently tested. Next day delivery.',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
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
