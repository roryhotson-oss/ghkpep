import type { SectionBlock } from '@/components/sections/section-types';

export const homeSections: SectionBlock[] = [
  {
    type: 'hero',
    eyebrow: 'GHKpep',
    title: 'Research compounds.',
    description: 'No noise. Just documented research compounds and lab accessories.',
  },
  {
    type: 'trust-strip',
    items: [
      { label: 'Audit', value: 'UK-RSCS.ORG' },
      { label: 'Assays', value: 'Independent COAs' },
      { label: 'Dispatch', value: 'UK stock' },
      { label: 'Support', value: '< 24 hours' },
    ],
  },
  {
    type: 'custom',
    key: 'home-catalog-table',
  },
  {
    type: 'split',
    eyebrow: 'Built to be section-driven',
    title: 'Compose your homepage from independent content blocks.',
    description: 'This layout pattern gives you Omegamino-style modular sections while keeping your own brand tone and conversion flow.',
    points: [
      'Each section is local and reusable across routes.',
      'Order can be changed through route-level config.',
      'Shared header/footer/layout remain untouched.',
    ],
    statLabel: 'Reusable blocks now powering the route',
    statValue: '6+',
    actions: [
      { label: 'Browse catalog', href: '/shop' },
      { label: 'Review testing standards', href: '/testing', variant: 'secondary' },
    ],
  },
];
