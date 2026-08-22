export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://ghkpep.com/#organization',
        name: 'GHK Peptides',
        url: 'https://ghkpep.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ghkpep.com/images/logo.png',
        },
        description: 'Premium research peptides supplier in the UK. Independently tested by Glyvantix Labs.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@ghkpep.com',
          availableLanguage: ['English'],
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ghkpep.com/#website',
        url: 'https://ghkpep.com',
        name: 'GHK Peptides UK',
        description: 'Buy premium research peptides in the UK. Independently tested. Next day delivery.',
        publisher: {
          '@id': 'https://ghkpep.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://ghkpep.com/shop?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://ghkpep.com/#webpage',
        url: 'https://ghkpep.com',
        name: 'GHK Peptides UK | Premium Research Peptides | Next Day Delivery',
        isPartOf: {
          '@id': 'https://ghkpep.com/#website',
        },
        about: {
          '@id': 'https://ghkpep.com/#organization',
        },
        description: 'Buy premium research peptides in the UK. Independently tested by Glyvantix Labs. Free UK shipping over £150.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ghkpep.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Shop',
            item: 'https://ghkpep.com/shop',
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Research Peptides',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'BPC-157 Peptide',
              description: 'Premium research-grade BPC-157 peptide, independently tested by Glyvantix Labs.',
            },
            price: '31.99',
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            url: 'https://ghkpep.com/shop/bpc-157',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'GHK-Cu Peptide',
              description: 'Premium research-grade GHK-Cu peptide, independently tested by Glyvantix Labs.',
            },
            price: '35.99',
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            url: 'https://ghkpep.com/shop/ghk-cu',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What research peptides do you sell?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We sell premium research peptides including BPC-157, GHK-Cu, MOTS-c, NAD+, Tesamorelin, TB-500, and many more. All peptides are independently tested by Glyvantix Labs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you ship to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we ship throughout the UK with free shipping on orders over £150. Same day dispatch for orders placed before 2pm GMT.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are your peptides tested?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, all our peptides are independently tested by Glyvantix Labs. We provide full COA (Certificate of Analysis) for every batch.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
