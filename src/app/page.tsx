import { products } from '@/data/products';
import MaintenanceContactForm from './MaintenanceContactForm';

const RESEARCH_PRODUCTS = products.filter((product) => product.category !== 'accessories');

export const metadata = {
  title: 'GHKpep | Temporary maintenance',
  description: 'GHKpep is temporarily undergoing scheduled maintenance while we finalise site updates and order processes. Product information remains available for reference and the service will reopen soon.',
};

export default function Home() {
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
              {RESEARCH_PRODUCTS.map((product) => (
                <div key={product.slug} className="overflow-hidden border border-[#cbdbe6] bg-white">
                  <div className="aspect-square bg-[#f7fafc] p-3">
                    <img src={product.image} alt={`${product.name} product reference`} className="h-full w-full object-contain" />
                  </div>
                  <p className="px-3 py-3 text-sm font-semibold text-[#10263d]">{product.name}</p>
                  <div className="flex gap-2 px-3 pb-3">
                    <a
                      href={`mailto:science@ghkpep.com?subject=${encodeURIComponent(`Buy 1 enquiry: ${product.name}`)}`}
                      className="flex-1 rounded-md bg-[#2e617e] px-2 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#214d68]"
                    >
                      Buy 1
                    </a>
                    <a
                      href={`mailto:science@ghkpep.com?subject=${encodeURIComponent(`Buy 10 enquiry: ${product.name}`)}`}
                      className="flex-1 rounded-md border border-[#9db8c7] bg-white px-2 py-2 text-center text-xs font-semibold text-[#2e617e] transition hover:bg-[#eef4f8]"
                    >
                      Buy 10
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border border-[#cbdbe6] bg-white px-5 py-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Need a human?</p>
            <h2 className="mt-2 text-xl font-bold text-[#10263d]">Orders are being placed now due to high interest</h2>
            <p className="mt-2 text-[#425b6d]">
              We work with a range of global and local suppliers. If you would like an updated full list and current prices, or want to place an order from 1 to 10 vials, email us and include your phone number. A human will call you to answer questions and arrange your order.
            </p>
            <p className="mt-3 font-semibold text-[#2e617e]">If you know GHK, you understand. If you do not know GHK, we can help.</p>
            <p className="mt-3 text-sm text-[#425b6d]">Ask and we will assist where we can. We keep product, COA, and quality information factual and clear, without inflated claims.</p>
            <MaintenanceContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
