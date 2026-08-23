import type { SectionBlock } from '@/components/sections/section-types';

export const shopSections: SectionBlock[] = [
  {
    type: 'hero',
    eyebrow: 'Reference-Grade Catalog',
    title: 'Research Compounds',
    description: 'Every vial is independently tested and accompanied by a downloadable certificate of analysis. All prices in GBP. Box of 10 vials available.',
  },
  {
    type: 'custom',
    key: 'shop-catalog-grid',
  },
  {
    type: 'faq',
    title: 'Ordering FAQs',
    items: [
      {
        question: 'Where can I check lot-level documentation?',
        answer: 'Each product links directly to lot-based COA PDFs so your team can verify purity and identifiers before ordering.',
      },
      {
        question: 'Do you support higher-volume procurement?',
        answer: 'Yes. Use the contact form with your expected cadence and compounds, and the team can support bulk purchasing workflows.',
      },
      {
        question: 'What shipping model do you use?',
        answer: 'Orders are dispatched from UK stock with tracked, discreet handling and support follow-up if anything is delayed.',
      },
    ],
  },
];
