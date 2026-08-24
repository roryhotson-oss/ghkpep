import Link from 'next/link';
import { products } from '@/data/products';

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
            <p className="mt-5 max-w-xl text-lg text-[#425b6d] leading-8">
              We are making updates to our site and order processing. The catalogue is listed below for reference while the service is temporarily paused.
            </p>
          </div>

          <div className="mt-10 border-y border-[#cbdbe6] py-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Current catalogue</p>
                <h2 className="mt-2 text-2xl font-bold text-[#10263d]">Products available when we reopen</h2>
              </div>
              <p className="text-sm font-semibold text-[#607789]">{products.length} listings</p>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug} className="border-b border-[#d8e3ec] pb-2 text-base text-[#425b6d]">
                  {product.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border border-[#cbdbe6] bg-white px-5 py-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Need a human?</p>
            <h2 className="mt-2 text-xl font-bold text-[#10263d]">Orders are being placed now due to high interest</h2>
            <p className="mt-2 text-[#425b6d]">
              We work with a range of global and local suppliers. If you would like an updated full list and current prices, or want to place an order from 1 to 10 vials, email us and include your phone number. A human will call you to answer questions and arrange your order.
            </p>
            <Link
              href="mailto:support@ghkpep.com?subject=Product%20enquiry"
              className="mt-4 inline-flex font-bold text-[#2e617e] underline underline-offset-4 hover:text-[#10263d]"
            >
              Email support@ghkpep.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
