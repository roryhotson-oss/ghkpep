import SectionRenderer from '@/components/sections/SectionRenderer';
import { aboutSections } from '@/content/sections/about';

export default function AboutPage() {
  return <SectionRenderer blocks={aboutSections} />;
}
