import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-bold text-[#8298aa] mb-4">404</h1>
      <p className="text-xl text-[#a7b0b2] mb-8">This compound doesn&apos;t exist in our catalog.</p>
      <Link href="/shop" className="px-8 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition">
        Browse Catalog
      </Link>
    </div>
  );
}
