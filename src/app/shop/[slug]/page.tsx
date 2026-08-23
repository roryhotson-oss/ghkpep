import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCommerceProduct } from '@/lib/commerce-store';
import ProductPageClient from './ProductPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCommerceProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const baseUrl = 'https://ghkpep.com';

  return {
    title: `${product.name} | GHKpep UK`,
    description: `${product.name} for in-vitro laboratory research, with batch documentation from Glyvantix Labs. Free discreet tracked shipping.`,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} UK`,
      `${product.name.toLowerCase()} research compound`,
      `${product.categoryLabel.toLowerCase()} research UK`,
      'laboratory research compounds UK',
    ],
    openGraph: {
      title: `${product.name} | GHKpep UK`,
      description: `Buy ${product.name} in the UK. Premium research compound with batch documentation and discreet tracked shipping.`,
      type: 'website',
      url: `${baseUrl}/shop/${product.slug}`,
      images: [
        {
          url: product.image || '/images/hero-lab.png',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | GHKpep UK`,
      description: `Buy ${product.name} in the UK. Premium research peptide, independently tested.`,
      images: [product.image || '/images/hero-lab.png'],
    },
    alternates: {
      canonical: `${baseUrl}/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getCommerceProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
