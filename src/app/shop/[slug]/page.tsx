import { Metadata } from 'next';
import { getCommerceProduct } from '@/lib/commerce-store';
import { products as localProducts } from '@/data/products';
import Link from 'next/link';
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
      description: 'The research compound you are looking for is not in our catalogue. Browse the full range of documented research compounds and laboratory accessories.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const baseUrl = 'https://www.ghkpep.com';

  const keywords = [
    product.name.toLowerCase(),
    `${product.name.toLowerCase()} UK`,
    `${product.name.toLowerCase()} research compound`,
    `${product.categoryLabel.toLowerCase()} research UK`,
    'GHK peptides UK',
    'laboratory research compounds UK',
    'research peptides UK',
  ];
  if (product.slug === 'ghk-cu') {
    keywords.unshift('GHK-Cu peptides UK', 'GHK Cu peptide UK', 'UK GHK-Cu peptides');
  }

  return {
    title: `${product.name} | GHK Peptides`,
    description: `${product.name} for laboratory research use in the UK, with lot documentation and clear product information.`,
    keywords,
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
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl font-bold text-[#8298aa] mb-4">Product not found</h1>
        <p className="text-xl text-[#a7b0b2] mb-8">
          We couldn&apos;t find that compound in our catalogue. It may have been renamed or removed.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition"
        >
          Browse the catalogue
        </Link>
      </div>
    );
  }

  const pool = localProducts.filter((p) => p.slug !== product.slug && p.category !== 'accessories' && p.category !== 'peptide-holders');
  const sameCategory = pool.filter((p) => p.category === product.category);
  const others = pool.filter((p) => p.category !== product.category);
  const related = [...sameCategory, ...others].slice(0, 8);

  return <ProductPageClient product={product} related={related} />;
}
