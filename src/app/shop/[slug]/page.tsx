import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCommerceProduct } from '@/lib/commerce-store';
import { products as localProducts } from '@/data/products';
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

  const baseUrl = 'https://www.ghkpep.com';

  return {
    title: `${product.name} | GHK Peptides`,
    description: `${product.name} for laboratory research use in the UK, with lot documentation and clear product information.`,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} UK`,
      `${product.name.toLowerCase()} research compound`,
      `${product.categoryLabel.toLowerCase()} research UK`,
      'laboratory research compounds UK',
      'research peptides UK',
    ],
    openGraph: {
      title: `${product.name} | GHK Peptides`,
      description: `${product.name} for laboratory research use in the UK with lot documentation and clear product information.`,
      type: 'website',
      url: `${baseUrl}/shop/${product.slug}`,
      images: [
        {
          url: product.image || '/images/box10.jpeg',
          width: 1200,
          height: 630,
          alt: `${product.name} research compound`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | GHK Peptides`,
      description: `${product.name} for laboratory research use in the UK with lot documentation and clear product information.`,
      images: [product.image || '/images/box10.jpeg'],
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

  const pool = localProducts.filter((p) => p.slug !== product.slug && p.category !== 'accessories' && p.category !== 'peptide-holders');
  const sameCategory = pool.filter((p) => p.category === product.category);
  const others = pool.filter((p) => p.category !== product.category);
  const related = [...sameCategory, ...others].slice(0, 8);

  return <ProductPageClient product={product} related={related} />;
}
