import type { SectionBlock } from '@/components/sections/section-types';

export const contactSections: SectionBlock[] = [
  {
    type: 'hero',
    title: 'How can we help?',
    description: 'Our research support team is here to assist with orders, product questions, and lab-to-lab inquiries.',
    meta: 'Typically respond within 24 hours',
  },
  {
    type: 'custom',
    key: 'contact-support-form',
  },
  {
    type: 'split',
    eyebrow: 'Omegamino-inspired modular section',
    title: 'Inquiry routing built as a standalone section block.',
    description: 'Support, payment, and shipping context now lives in one reusable component that can be dropped into any route configuration.',
    points: [
      'No changes to site-level layout or navigation are needed.',
      'Form logic remains isolated and easy to maintain.',
      'Visual style stays aligned with the current brand system.',
    ],
    statLabel: 'Average first response target',
    statValue: '24h',
  },
];
