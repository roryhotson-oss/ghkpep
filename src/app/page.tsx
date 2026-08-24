import Image from 'next/image';

export const metadata = {
  title: 'GHKpep | Temporary maintenance',
  description: 'GHKpep is temporarily undergoing scheduled maintenance while we finalise site updates and order processes. Product information remains available for reference and the service will reopen soon.',
};

export default function Home() {
  return (
    <div className="min-h-[70vh] bg-[#eef4f8] text-[#10263d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4d7895]">Temporary maintenance</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-[#10263d]">
              GHKpep is currently undergoing scheduled maintenance.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[#425b6d] leading-8">
              We are making updates to our site and order processing. Product information remains available for reference while the service is temporarily paused.
            </p>
            <p className="mt-6 text-base text-[#425b6d]">
              The catalog and ordering service will reopen soon. For urgent enquiries, please email support@ghkpep.com.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#d8e3ec] bg-white shadow-[0_24px_60px_rgba(16,38,61,0.08)]">
            <div className="relative h-[420px] w-full">
              <Image
                src="/images/hero-lab.png"
                alt="Research peptide product display"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="border-t border-[#d8e3ec] bg-white px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4d7895]">Current listing</p>
              <p className="mt-2 text-lg font-semibold text-[#10263d]">BPC-157 research vial</p>
              <p className="text-sm text-[#607789]">Lot reference and product information remain visible while maintenance is in progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
