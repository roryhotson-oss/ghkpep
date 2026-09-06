const genericImage = '/images/ghk-cu.jpg';

export const importedProductImageOverrides: Record<string, string> = {
  'imported-na-selank-amidate-30mg': '/images/NA Selank amidate 30mg.jpeg',
  'imported-epithalon': '/images/Epithalon.jpeg',
  'imported-semaglutide': '/images/Semaglutide.jpeg',
  'imported-cjc-1295-with-dac-2mg': '/images/CJC‑1295 with DAC.jpeg',
  'imported-cjc-1295-with-dac-5mg': '/images/CJC‑1295 with DAC.jpeg',
  'imported-tb-500-frag-10mg': '/images/tb-500-10mg.png',
  'imported-foxo4-10mg': '/images/FOXO4 10mg.jpeg',
  'imported-dermorphin-5mg': '/images/Dermorphin.jpeg',
  'imported-retatrutide-5-mg-cagrilintide-5-mg-10mg': '/images/cagrilintide-semaglutide-10mg.jpeg',
};

export function resolveCatalogImage(slug: string, image: string | null | undefined): string | null {
  if (importedProductImageOverrides[slug]) return importedProductImageOverrides[slug];
  if (slug.startsWith('imported-') && image === genericImage) return null;
  return image || null;
}
