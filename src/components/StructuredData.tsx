import { getCommerceProducts } from '@/lib/commerce-store';

export default async function StructuredData() {
  const products = await getCommerceProducts();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://ghkpep.com/#organization',
        name: 'GHKpep',
        url: 'https://ghkpep.com',
        description: 'Documented research compounds for in-vitro laboratory use.',
        sameAs: ['https://uk-rscs.org'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@ghkpep.com',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ghkpep.com/#website',
        url: 'https://ghkpep.com',
        name: 'GHKpep UK',
        publisher: { '@id': 'https://ghkpep.com/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://ghkpep.com/#webpage',
        url: 'https://ghkpep.com',
        name: 'GHKpep UK | Research Compounds',
        isPartOf: { '@id': 'https://ghkpep.com/#website' },
        about: { '@id': 'https://ghkpep.com/#organization' },
        description: 'Documented research compounds with independent testing and certificates of analysis.',
      },
      {
        '@type': 'ItemList',
        name: 'GHKpep research compounds',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://ghkpep.com/shop/${product.slug}`,
          item: {
            '@type': 'Product',
            name: product.name,
            description: `${product.name} for in-vitro laboratory research with batch documentation.`,
            image: `https://ghkpep.com${product.image}`,
            sku: product.slug,
            brand: { '@type': 'Brand', name: 'GHKpep' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'GBP',
              price: product.price.toFixed(2),
              availability: product.stockQuantity === 0
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
              url: `https://ghkpep.com/shop/${product.slug}`,
            },
            subjectOf: {
              '@type': 'DigitalDocument',
              name: `${product.name} Certificate of Analysis`,
              url: `https://ghkpep.com/api/coa?lot=${encodeURIComponent(product.lot)}`,
              encodingFormat: 'application/pdf',
            },
          },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
