const genericImage = '/images/ghk-cu.jpg';

const singleVialImageOverrides: Record<string, string> = {
  'cagrilintide': '/images/cagrilintide-5mg.png',
  'kiss-peptin': '/images/kiss-peptin-10mg.png',
  'melanotan-1': '/images/melanotan-1-10mg.png',
  'melanotan-2': '/images/melanotan-2-10mg.png',
  'pt-141': '/images/pt-141-10mg.png',
  'selank': '/images/selank-10mg.png',
  'semax': '/images/semax-10mg.png',
  'ss-31': '/images/ss-31-10mg.png',
  'tb-500': '/images/tb-500-10mg.png',
  'tesamorelin': '/images/tesamorelin-10mg.png',
  'wolverine': '/images/wolverine-10mg.png',
};

function standardizedImagePath(image: string): string {
  const match = image.match(/^\/images\/(.+)\.(avif|jpeg|jpg|png|webp)$/i);
  if (!match) return image;

  return `/images/standardized-v2/${match[1]}--${match[2].toLowerCase()}.jpg`;
}

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
  if (singleVialImageOverrides[slug]) return singleVialImageOverrides[slug];
  if (importedProductImageOverrides[slug]) return standardizedImagePath(importedProductImageOverrides[slug]);
  if (slug.startsWith('imported-') && image === genericImage) return null;
  return image ? standardizedImagePath(image) : null;
}
