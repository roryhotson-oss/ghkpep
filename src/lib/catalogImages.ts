const genericImage = '/images/ghk-cu.png';

const singleVialImageOverrides: Record<string, string> = {
  'cagrilintide': '/images/cagrilintide.png',
  'kiss-peptin': '/images/kiss-peptin.png',
  'melanotan-1': '/images/melanotan-i.png',
  'melanotan-2': '/images/melanotan-ii.png',
  'pt-141': '/images/pt-141.png',
  'selank': '/images/selank.png',
  'semax': '/images/semax.png',
  'ss-31': '/images/ss-31.png',
  'tb-500': '/images/tb-500.png',
  'tesamorelin': '/images/tesamorelin.png',
  'wolverine': '/images/wolverine.png',
};

export const importedProductImageOverrides: Record<string, string> = {
  'imported-na-selank-amidate-30mg': '/images/na-selank-amidate.png',
  'imported-epithalon': '/images/epithalon.png',
  'imported-semaglutide': '/images/semaglutide.png',
  'imported-cjc-1295-with-dac-2mg': '/images/cjc-1295-with-dac.png',
  'imported-cjc-1295-with-dac-5mg': '/images/cjc-1295-with-dac.png',
  'imported-tb-500-frag-10mg': '/images/tb-500-frag.png',
  'imported-foxo4-10mg': '/images/foxo4.png',
  'imported-dermorphin-5mg': '/images/dermorphin.png',
  'imported-retatrutide-5-mg-cagrilintide-5-mg-10mg': '/images/retatrutide-cagrilintide.png',
};

export function resolveCatalogImage(slug: string, image: string | null | undefined): string | null {
  if (singleVialImageOverrides[slug]) return singleVialImageOverrides[slug];
  if (importedProductImageOverrides[slug]) return importedProductImageOverrides[slug];
  if (slug.startsWith('imported-') && image === genericImage) return null;
  return image ?? null;
}
