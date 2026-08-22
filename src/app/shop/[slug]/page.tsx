import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/admin-store';
import ProductPageClient from './ProductPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const baseUrl = 'https://ghkpep.com';

  return {
    title: `${product.name} | GHK Peptides UK`,
    description: `Buy ${product.name} in the UK. Premium research peptide, independently tested by Glyvantix Labs. Purity ${product.purity}. Free UK shipping over £150.`,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} UK`,
      `buy ${product.name.toLowerCase()}`,
      `${product.name.toLowerCase()} peptide`,
      `${product.name.toLowerCase()} research peptide`,
      `${product.categoryLabel.toLowerCase()} peptide UK`,
      'research peptides UK',
      'buy peptides UK',
    ],
    openGraph: {
      title: `${product.name} | GHK Peptides UK`,
      description: `Buy ${product.name} in the UK. Premium research peptide, independently tested. Purity ${product.purity}.`,
      type: 'website',
      url: `${baseUrl}/shop/${product.slug}`,
      images: [
        {
          url: product.image || '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | GHK Peptides UK`,
      description: `Buy ${product.name} in the UK. Premium research peptide, independently tested.`,
      images: [product.image || '/images/og-image.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
