import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-bold text-[#00d4aa] mb-4">404</h1>
      <p className="text-xl text-[#888] mb-8">This compound doesn&apos;t exist in our catalog.</p>
      <Link href="/shop" className="px-8 py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00b894] transition">
        Browse Catalog
      </Link>
    </div>
  );
}
