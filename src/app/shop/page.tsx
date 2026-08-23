import SectionRenderer from '@/components/sections/SectionRenderer';
import ShopCatalogSection from '@/components/sections/custom/ShopCatalogSection';
import { shopSections } from '@/content/sections/shop';

export default function ShopPage() {
  return (
    <SectionRenderer
      blocks={shopSections}
      customRenderers={{
        'shop-catalog-grid': <ShopCatalogSection />,
      }}
    />
  );
}
