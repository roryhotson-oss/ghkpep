import { MetadataRoute } from 'next';
import { getCommerceProducts } from '@/lib/commerce-store';

const SITE_UPDATED = new Date('2026-09-07');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ghkpep.com';
  const products = await getCommerceProducts();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: SITE_UPDATED,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coa`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testing`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quality`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/subscriptions`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
