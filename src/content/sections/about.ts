import type { SectionBlock } from '@/components/sections/section-types';

export const aboutSections: SectionBlock[] = [
  {
    type: 'hero',
    eyebrow: 'Our story',
    title: 'A new standard for the lab.',
    description: 'GHK exists because reference-grade research compounds shouldn’t require a leap of faith. We built the supplier we wished we had.',
  },
  {
    type: 'content',
    paragraphs: [
      'GHKpep works in partnership with Glyvantix Research Lab for independent product documentation and testing.',
      'Our documentation is audited through UK-RSCS.ORG.',
      'The catalog is intentionally narrow. Every product is one we’d actually order ourselves, every batch is independently assayed, and every certificate of analysis is published openly on the product page before the lot ships. No exceptions.',
      'Our products are sold strictly for in-vitro research. We do not provide dosing guidance, we do not claim therapeutic benefit, and we refuse any order that suggests human or animal consumption.',
    ],
  },
  {
    type: 'feature-grid',
    title: 'Six principles, written down.',
    items: [
      {
        title: 'Transparency by default',
        description: 'Every batch ships with a published certificate of analysis from a Glyvantix lab — linked from the product page, not buried in an email.',
      },
      {
        title: 'Reference-grade or nothing',
        description: 'We hold a 99% purity floor on every lot. Material that doesn’t clear it is destroyed, not downgraded.',
      },
      {
        title: 'Built by lab people',
        description: 'Our QC team are working chemists. Documentation, packaging, and labeling are designed for how research actually runs.',
      },
      {
        title: 'Researcher-only',
        description: 'We verify research intent at the gate and refuse any order that suggests human or veterinary use. No exceptions, no quotas.',
      },
      {
        title: 'Long-term partnerships',
        description: 'We’d rather earn one lab for ten years than chase one-time buyers. Pricing, allocation, and support are built around that.',
      },
      {
        title: 'Quietly premium',
        description: 'Discreet packaging, fast support, and an honest catalog. Nothing flashy, nothing hidden.',
      },
    ],
  },
  {
    type: 'cta',
    title: 'Built for the bench. Verified for your peace of mind.',
    description: 'Browse the catalog, read a COA, or talk to our team. We respond to researcher questions within one business day.',
    actions: [
      { label: 'Browse the catalog', href: '/shop' },
      { label: 'Contact the team', href: '/contact', variant: 'secondary' },
    ],
  },
];
