import { products } from '@/data/products';
import MaintenanceContactForm from './MaintenanceContactForm';

const RESEARCH_PRODUCTS = products.filter((product) => product.category !== 'accessories');
const ADDITIONAL_REFERENCE_PRODUCTS = [
  { slug: 'mt-1-reference', name: 'MT-1 10mg', image: '/images/melanotan-1-10mg.png' },
  { slug: 'mt-2-reference', name: 'MT-2 10mg', image: '/images/melanotan-2-10mg.png' },
];
const DISPLAY_PRODUCTS = [...RESEARCH_PRODUCTS, ...ADDITIONAL_REFERENCE_PRODUCTS];
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || '';
const QUICK_MESSAGE_TEXT = 'Hello, I would like to leave a message about product availability.';

const getWhatsAppLink = (number: string, message: string) => {
  const sanitized = number.replace(/\D/g, '');
  if (!sanitized) return '';
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`;
};

const getTelegramLink = (username: string, message: string) => {
  const sanitized = username.trim().replace(/^@+/, '').replace(/[^a-zA-Z0-9_]/g, '');
  if (!sanitized) return '';
  return `https://t.me/${sanitized}?text=${encodeURIComponent(message)}`;
};

export const metadata = {
  title: 'GHKpep | Temporary maintenance',
  description: 'GHKpep is temporarily undergoing scheduled maintenance while we finalise site updates and order processes. Product information remains available for reference and the service will reopen soon.',
};

export default function Home() {
  const whatsappHref = getWhatsAppLink(WHATSAPP_NUMBER, QUICK_MESSAGE_TEXT);
  const telegramHref = getTelegramLink(TELEGRAM_USERNAME, QUICK_MESSAGE_TEXT);
  const primaryMessageHref = whatsappHref || telegramHref || '#maintenance-enquiry';
  const primaryMessageLabel = whatsappHref
    ? 'Leave a message on WhatsApp'
    : telegramHref
      ? 'Leave a message on Telegram'
      : 'Leave a message by enquiry form';

  return (
    <div className="min-h-[70vh] bg-[#eef4f8] text-[#10263d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4d7895]">Temporary maintenance</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-[#10263d]">
              GHKpep is currently undergoing scheduled maintenance.
            </h1>
            <p className="mt-4 text-xl font-semibold text-[#2e617e]">
              Those who buy GHK know GHK. If you&apos;re new to GHK, welcome to our community.
            </p>
            <p className="mt-5 max-w-xl text-lg text-[#425b6d] leading-8">
              We are making updates to our site and order processing while the service is temporarily paused.
            </p>
            <p className="mt-4 max-w-xl text-base text-[#425b6d] leading-7">
              Our product range is extensive. If you ask, we will assist with the information we can provide. We keep our approach practical: we do not rely on exaggerated COA or quality claims; we offer materials we know and can discuss clearly.
            </p>
          </div>

          <div className="mt-8 border-y border-[#cbdbe6] py-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Product images</p>
            <h2 className="mt-2 text-2xl font-bold text-[#10263d]">Selected catalogue references</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {DISPLAY_PRODUCTS.map((product) => (
                <div key={product.slug} className="overflow-hidden border border-[#9db8c7] bg-white shadow-md shadow-[#2e617e]/10 ring-1 ring-[#eef4f8]">
                  <div className="aspect-[16/10] overflow-hidden bg-[#f7fafc] p-0">
                    <img src={product.image} alt={`${product.name} product reference`} className="h-full w-full scale-110 object-contain" />
                  </div>
                  <p className="px-3 py-3 text-sm font-semibold text-[#10263d]">{product.name}</p>
                  <div className="flex gap-2 px-3 pb-3">
                    <a
                      href="#maintenance-enquiry"
                      aria-label={`Request one ${product.name}`}
                      className="flex-1 rounded-md bg-[#2e617e] px-2 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#214d68]"
                    >
                      Buy 1
                    </a>
                    <a
                      href="#maintenance-enquiry"
                      aria-label={`Request ten ${product.name}`}
                      className="flex-1 rounded-md border border-[#9db8c7] bg-white px-2 py-2 text-center text-xs font-semibold text-[#2e617e] transition hover:bg-[#eef4f8]"
                    >
                      Buy 10
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="maintenance-enquiry" className="mt-8 border border-[#cbdbe6] bg-white px-5 py-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Need a human?</p>
            <h2 className="mt-2 text-xl font-bold text-[#10263d]">1 to 10 vials available</h2>
            <p className="mt-2 text-[#425b6d]">
              Orders for 1 to 10 vials are available. Choose a product above, select Buy 1 or Buy 10, and complete the enquiry form below. We will review your request and contact you to discuss availability, documentation, and next steps.
            </p>
            <p className="mt-3 font-semibold text-[#2e617e]">If you know GHK, you understand. If you do not know GHK, we can help.</p>
            <p className="mt-3 text-sm text-[#425b6d]">Ask and we will assist where we can. We keep product, COA, and quality information factual and clear, without inflated claims.</p>
            <a
              href={primaryMessageHref}
              target={primaryMessageHref.startsWith('http') ? '_blank' : undefined}
              rel={primaryMessageHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-4 inline-flex items-center rounded-md bg-[#2e617e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214d68]"
            >
              {primaryMessageLabel}
            </a>
            {(whatsappHref || telegramHref) && (
              <div className="mt-4 rounded-md border border-[#cbdbe6] bg-[#f7fbfe] p-4">
                <p className="text-sm font-semibold text-[#2e617e]">Leave a quick message</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-[#2e617e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214d68]"
                    >
                      Message on WhatsApp
                    </a>
                  )}
                  {telegramHref && (
                    <a
                      href={telegramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border border-[#9db8c7] bg-white px-4 py-2 text-sm font-semibold text-[#2e617e] transition hover:bg-[#eef4f8]"
                    >
                      Message on Telegram
                    </a>
                  )}
                </div>
              </div>
            )}
            <MaintenanceContactForm />
          </div>

          <footer className="mt-8 border-t border-[#cbdbe6] pt-5 text-center text-xs leading-6 text-[#607789]">
            For laboratory research use only. Not for human or veterinary use, and not for diagnosis, treatment, cure, or prevention of any disease. Product information and documentation should be reviewed before any purchase or use.
          </footer>
        </div>
      </div>
    </div>
  );
}
