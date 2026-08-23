export interface SectionAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface SectionTrustItem {
  label: string;
  value: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type SectionBlock =
  | {
      type: 'hero';
      eyebrow?: string;
      title: string;
      description?: string;
      actions?: SectionAction[];
      meta?: string;
    }
  | {
      type: 'trust-strip';
      items: SectionTrustItem[];
    }
  | {
      type: 'split';
      eyebrow?: string;
      title: string;
      description: string;
      points: string[];
      statLabel?: string;
      statValue?: string;
      note?: string;
      actions?: SectionAction[];
    }
  | {
      type: 'feature-grid';
      title: string;
      description?: string;
      columns?: 2 | 3 | 4;
      items: FeatureItem[];
    }
  | {
      type: 'content';
      title?: string;
      paragraphs: string[];
    }
  | {
      type: 'faq';
      title: string;
      items: FaqItem[];
    }
  | {
      type: 'cta';
      title: string;
      description?: string;
      actions: SectionAction[];
    }
  | {
      type: 'custom';
      key: string;
    };
