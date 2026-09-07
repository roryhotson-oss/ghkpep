const genericImage = '/images/ghk-cu.jpg';

const singleVialImageOverrides: Record<string, string> = {
  'cagrilintide': '/images/cagrilintide-5mg.jpg',
  'kiss-peptin': '/images/kiss-peptin-10mg.jpg',
  'melanotan-1': '/images/melanotan-1-10mg.jpg',
  'melanotan-2': '/images/melanotan-2-10mg.jpg',
  'pt-141': '/images/pt-141-10mg.jpg',
  'selank': '/images/selank-10mg.jpg',
  'semax': '/images/semax-10mg.jpg',
  'ss-31': '/images/ss-31-10mg.jpg',
  'tb-500': '/images/tb-500-10mg.jpg',
  'tesamorelin': '/images/tesamorelin-10mg.jpg',
  'wolverine': '/images/wolverine-10mg.jpg',
};

export const importedProductImageOverrides: Record<string, string> = {
  'imported-na-selank-amidate-30mg': '/images/NA Selank amidate 30mg.jpeg',
  'imported-epithalon': '/images/Epithalon.jpeg',
  'imported-semaglutide': '/images/Semaglutide.jpeg',
  'imported-cjc-1295-with-dac-2mg': '/images/CJC‑1295 with DAC.jpeg',
  'imported-cjc-1295-with-dac-5mg': '/images/CJC‑1295 with DAC.jpeg',
  'imported-tb-500-frag-10mg': '/images/tb-500-10mg.jpg',
  'imported-foxo4-10mg': '/images/FOXO4 10mg.jpeg',
  'imported-dermorphin-5mg': '/images/Dermorphin.jpeg',
  'imported-retatrutide-5-mg-cagrilintide-5-mg-10mg': '/images/cagrilintide-semaglutide-10mg.jpeg',
};

export function resolveCatalogImage(slug: string, image: string | null | undefined): string | null {
  if (singleVialImageOverrides[slug]) return singleVialImageOverrides[slug];
  if (importedProductImageOverrides[slug]) return importedProductImageOverrides[slug];
  if (slug.startsWith('imported-') && image === genericImage) return null;
  return image ?? null;
}
