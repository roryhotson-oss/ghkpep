import Image from 'next/image';
import Link from 'next/link';

const categoryHighlights = [
  { title: 'Peptide Research', image: '/images/ghk-cu.jpg' },
  { title: 'Research Blends', image: '/images/cjc-1295-ipamorelin.jpeg' },
  { title: 'Metabolic Research', image: '/images/glp3-rt.jpg' },
  { title: 'Laboratory Supplies', image: '/images/vial-organizer-3ml.jpg' },
];

const popularMaterials = [
  { name: 'GHK-Cu Research Peptide', slug: 'ghk-cu', image: '/images/ghk-cu.jpg', detail: 'Copper Complex' },
  { name: 'MOTS-C Research Peptide', slug: 'mots-c', image: '/images/mots-c.jpg', detail: 'Mitochondrial' },
  { name: 'KLOW 80mg', slug: 'klow', image: '/images/klow.jpg', detail: 'Research Blend' },
  { name: 'GLP3-RT 10mg', slug: 'glp3-rt', image: '/images/glp3-rt.jpg', detail: 'Incretin Research' },
];

export default async function HomeCatalog() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-12 pt-0 sm:pt-2">
        <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-[#34414a] sm:text-6xl lg:text-7xl">
          Wholesale Peptides
          <br />
          for Laboratory Research
        </h1>
        <div className="hero-photo-board relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[420px]">
          <div className="hero-photo-window absolute inset-3 overflow-hidden rounded-[1.5rem] sm:inset-5 sm:rounded-[1.75rem]">
            <Image
              src="/images/shop-hero.jpeg"
              alt="Box of 10 GHK Peptides research vials"
              fill
              priority
              quality={95}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8d4c9] pt-10 sm:pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8792]">Explore the range</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#34414a] sm:text-3xl">Research materials</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[#5b8ca0] hover:underline">Shop all</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {categoryHighlights.map((category) => (
            <Link key={category.title} href="/shop" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#d8d4c9] bg-[#eef8fb]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#34414a] transition group-hover:text-[#5b8ca0]">{category.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-[#d8d4c9] pt-10 sm:mt-20 sm:pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8792]">Selected materials</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#34414a] sm:text-3xl">Popular research peptides</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[#5b8ca0] hover:underline">View shop</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {popularMaterials.map((material) => (
            <Link key={material.slug} href={`/shop/${material.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#d8d4c9] bg-[#eef8fb]">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6d8792]">{material.detail}</p>
              <h3 className="mt-1 text-sm font-bold text-[#34414a] transition group-hover:text-[#5b8ca0]">{material.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
