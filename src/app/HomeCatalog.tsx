import SectionRenderer from '@/components/sections/SectionRenderer';
import HomeCatalogTableSection from '@/components/sections/custom/HomeCatalogTableSection';
import { homeSections } from '@/content/sections/home';
import { getProducts } from '@/lib/admin-store';

export default function HomeCatalog() {
  const products = getProducts();

  return (
    <SectionRenderer
      blocks={homeSections}
      customRenderers={{
        'home-catalog-table': () => <HomeCatalogTableSection products={products} />,
      }}
    />
  );
}
