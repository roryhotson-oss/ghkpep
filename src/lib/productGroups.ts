import type { Product } from '@/data/products';

export interface ProductGroup {
  key: string;
  name: string;
  description: string;
  image: string;
  categoryLabel: string;
  category: string;
  marketTier?: Product['marketTier'];
  variants: Product[];
}

export type DisplayEntry = Product | ProductGroup;

export function isProductGroup(entry: DisplayEntry): entry is ProductGroup {
  return (entry as ProductGroup).variants !== undefined;
}

const FAMILY_SUFFIX = /-(\d+(?:\.\d+)?)mg$/i;
const NAME_MG_SUFFIX = /\s\d+(?:\.\d+)?mg$/i;
const NAME_MG_VALUE = /(\d+(?:\.\d+)?)mg/i;

/** Groups separate mg-variant slugs of the same product family into one display entry. */
export function groupProducts(products: Product[]): DisplayEntry[] {
  const familyCounts = new Map<string, number>();
  products.forEach((product) => {
    const match = product.slug.match(FAMILY_SUFFIX);
    if (!match) return;
    const base = product.slug.slice(0, match.index);
    familyCounts.set(base, (familyCounts.get(base) ?? 0) + 1);
  });

  const groups = new Map<string, ProductGroup>();
  const entries: DisplayEntry[] = [];

  products.forEach((product) => {
    const match = product.slug.match(FAMILY_SUFFIX);
    const base = match ? product.slug.slice(0, match.index) : undefined;

    if (!base || (familyCounts.get(base) ?? 0) < 2) {
      entries.push(product);
      return;
    }

    const existing = groups.get(base);
    if (existing) {
      existing.variants.push(product);
      return;
    }

    const group: ProductGroup = {
      key: base,
      name: product.name.replace(NAME_MG_SUFFIX, ''),
      description: product.description,
      image: product.image,
      categoryLabel: product.categoryLabel,
      category: product.category,
      marketTier: product.marketTier,
      variants: [product],
    };
    groups.set(base, group);
    entries.push(group);
  });

  groups.forEach((group) => {
    group.variants.sort((a, b) => variantDose(a) - variantDose(b));
  });

  return entries;
}

export function variantDose(product: Product): number {
  return Number(product.name.match(NAME_MG_VALUE)?.[1] ?? product.dosageOptions?.[0] ?? 0);
}

export function selectVariant(variants: Product[], dosage: number): Product {
  return (
    variants.find((variant) => variantDose(variant) === dosage || (variant.dosageOptions ?? []).includes(dosage)) ??
    variants[0]
  );
}

export function defaultDosage(variants: Product[]): number {
  const doses = variants.flatMap((variant) => variant.dosageOptions ?? [variantDose(variant)]);
  return doses.includes(10) ? 10 : doses[0] ?? 5;
}
