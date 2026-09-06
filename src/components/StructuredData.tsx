import { getCommerceProducts } from '@/lib/commerce-store';

export default async function StructuredData() {
  const products = await getCommerceProducts();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.ghkpep.com/#organization',
        name: 'GHK Peptides',
        url: 'https://www.ghkpep.com',
        description: 'Documented research compounds for in vitro laboratory use.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@ghkpep.com',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.ghkpep.com/#website',
        url: 'https://www.ghkpep.com',
        name: 'GHK Peptides',
        publisher: { '@id': 'https://www.ghkpep.com/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.ghkpep.com/#webpage',
        url: 'https://www.ghkpep.com',
        name: 'GHK Peptides | Research Peptides & Laboratory Compounds',
        isPartOf: { '@id': 'https://www.ghkpep.com/#website' },
        about: { '@id': 'https://www.ghkpep.com/#organization' },
        description: 'Documented research peptides and laboratory compounds for in vitro research use in the UK.',
      },
      {
        '@type': 'ItemList',
        name: 'GHK Peptides research compounds',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://www.ghkpep.com/shop/${product.slug}`,
          item: {
            '@type': 'Product',
            name: product.name,
            description: `${product.name} supplied for in vitro laboratory research use only. Lot reference documentation available.`,
            image: `https://www.ghkpep.com${product.image}`,
            sku: product.slug,
            brand: { '@type': 'Brand', name: 'GHK Peptides' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: product.price.toFixed(2),
              availability: product.stockQuantity === 0
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
              url: `https://www.ghkpep.com/shop/${product.slug}`,
            },
            subjectOf: {
              '@type': 'DigitalDocument',
              name: `${product.name} batch reference summary`,
              url: `https://www.ghkpep.com/api/coa?lot=${encodeURIComponent(product.lot)}`,
              encodingFormat: 'application/pdf',
            },
          },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
