import SectionRenderer from '@/components/sections/SectionRenderer';
import ContactSupportFormSection from '@/components/sections/custom/ContactSupportFormSection';
import { contactSections } from '@/content/sections/contact';

export default function ContactPage() {
  return (
    <SectionRenderer
      blocks={contactSections}
      customRenderers={{
        'contact-support-form': () => <ContactSupportFormSection />,
      }}
    />
  );
}
