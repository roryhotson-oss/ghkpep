'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';

interface Props {
  product: Product;
  related?: Product[];
}

const researchContexts: Record<string, string> = {
  'ghk-cu': 'GHK-Cu is studied in laboratory models of copper binding, extracellular matrix signalling, fibroblast biology, and peptide structure.',
  'mots-c': 'MOTS-C is studied in laboratory models of mitochondrial signalling, cellular energy regulation, metabolic stress, and peptide stability.',
  'nad-plus': 'NAD+ is studied as a cellular redox cofactor in laboratory work on energy metabolism, mitochondrial function, and enzyme activity.',
  klow: 'KLOW is studied as a defined research blend in laboratory work examining the analytical properties and constituent behaviour of its peptide components.',
  'glp3-rt': 'GLP3-RT is studied in laboratory receptor and cell signalling models involving incretin related pathways and peptide receptor selectivity.',
  glutathione: 'Glutathione is studied in laboratory models of redox balance, thiol chemistry, oxidative stress, and cellular detoxification pathways.',
  'igf-1-lr3': 'IGF-1 LR3 is studied in laboratory models of growth factor receptor signalling, cell response pathways, and peptide structure.',
  tesamorelin: 'Tesamorelin is studied in laboratory models of peptide signalling, sequence stability, and analytical behaviour. The batch is tested as an individual research material; no combination use with another compound is implied.',
  'glp2-tz': 'GLP2-TZ is studied in laboratory receptor signalling and intestinal cell models focused on GLP-2 related peptide activity and stability.',
  'cjc-1295-ipamorelin': 'This blend is studied in laboratory models of growth hormone receptor signalling, peptide interaction, and the analytical behaviour of its two constituent sequences.',
  'refined-h2o': 'Bacteriostatic water is used in controlled laboratory workflows for research material preparation, handling, and storage where the protocol permits.',
  'pt-141': 'PT-141 is studied in laboratory melanocortin pathway models, receptor selectivity, and peptide structure research. The research context does not imply human effect or administration.',
  'melanotan-2': 'Melanotan II is studied in laboratory melanocortin receptor models, receptor selectivity, peptide stability, and cell signalling.',
  'ss-31': 'SS-31 is studied in laboratory models of mitochondrial membrane interactions, oxidative stress, cellular respiration, and peptide localisation.',
  'melanotan-1': 'Melanotan I is studied in laboratory melanocortin receptor models, receptor signalling, peptide structure, and cellular response.',
  wolverine: 'Wolverine is studied as a defined research blend in laboratory work examining peptide identity, constituent composition, and analytical behaviour.',
  'kiss-peptin': 'Kisspeptin is studied in laboratory models of G protein-coupled receptor signalling, peptide binding, and sequence activity.',
  cagrilintide: 'Cagrilintide is studied in laboratory amylin receptor models, peptide receptor signalling, molecular stability, and structure activity research.',
  kpv: 'KPV is studied in laboratory models of peptide signalling, melanocortin related pathways, cell response, and sequence behaviour.',
  ipamorelin: 'Ipamorelin is studied in laboratory growth hormone secretagogue receptor models, receptor selectivity, and peptide signalling.',
  glow: 'GLOW is studied as a defined research blend in laboratory work examining constituent identity, composition, and analytical behaviour.',
  adamax: 'Adamax is studied as a defined research blend in laboratory work examining constituent composition, peptide identity, and stability.',
  'ahk-cu': 'AHK-Cu is studied in laboratory models of copper binding, peptide structure, extracellular matrix signalling, and cell response.',
  'bpc-157': 'BPC-157 is studied in laboratory models of peptide stability, cell signalling, tissue culture response, and sequence behaviour.',
  selank: 'Selank is studied in laboratory models of peptide signalling, neurochemical pathways, sequence stability, and cell response.',
  'tb-500': 'TB-500 is studied in laboratory models of peptide structure, cell migration signalling, tissue culture response, and sequence stability.',
  semax: 'Semax is studied in laboratory models of peptide signalling, ACTH related sequence behaviour, neuronal cell models, and molecular stability.',
  'vial-organizer-3ml': 'This accessory supports controlled laboratory workflows involving the organisation and protected storage of research vials.',
  'protective-vial-storage-case': 'This accessory supports controlled laboratory workflows involving the protected storage and transport of research vials.',
};

export default function ProductPageClient({ product, related = [] }: Props) {
  const dosageOptions = product.dosageOptions && product.dosageOptions.length > 0 ? product.dosageOptions : [5, 10, 15];
  const [quantity, setQuantity] = useState(1);
  const [selectedDosage, setSelectedDosage] = useState<number>(dosageOptions.includes(10) ? 10 : dosageOptions[0]);
  const quantityLimit = product.category === 'accessories' ? 4 : 99;
  const dosageUnit = product.slug === 'refined-h2o' ? 'ml' : 'mg';

  const price = effectivePrice(product, 'box', selectedDosage);
  const totalPrice = price * quantity;
  const researchContext = researchContexts[product.slug] || 'This material is studied in controlled laboratory work involving peptide structure, analytical chemistry, and cellular signalling.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      {/* Breadcrumb */}
      <nav className="flex mb-5 text-sm">
        <Link href="/" className="text-[#7b898e] hover:text-[#8298aa] transition">
          Home
        </Link>
        <span className="mx-2 text-[#7b898e]">/</span>
        <Link href="/shop" className="text-[#7b898e] hover:text-[#8298aa] transition">
          Shop
        </Link>
        <span className="mx-2 text-[#7b898e]">/</span>
        <span className="text-[#1F2933] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
        {/* Product Image + related carousel */}
        <div className="flex flex-col gap-8">
        <div className="hero-photo-board relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[1.5rem]">
          <div className="hero-photo-window absolute inset-3 overflow-hidden rounded-[1rem]">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="object-contain scale-125"
            />
          </div>
        </div>

        </div>

        {/* Product Info */}
        <div className="text-[#34414a] bg-[#fbfaf7] rounded-3xl p-6 lg:p-8 border border-[#d8d4c9] shadow-[0_10px_24px_rgba(52,65,74,0.08)]">
          <div className="mb-4">
            <span className="inline-block bg-[#eef8fb] text-[#5b8ca0] border border-[#c8dfe7] px-3 py-1 rounded-full text-sm font-semibold">
              {product.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-[#66747b] mb-3">{product.description}</p>
          <p className="text-[#66747b] text-sm mb-3">For laboratory research and chemistry use only. Any analytical documentation is produced by the source laboratory or a third-party laboratory it engages; availability and scope vary by lot.</p>
          <p className="text-[#66747b] text-sm mb-6">We source directly from laboratories. Our prices reflect sourcing, packaging, and delivery costs, while keeping research materials reasonably priced.</p>
          <p className="text-[#8b6d38] text-sm mb-6 border-l-2 border-[#d2b477] pl-3">
            Laboratory research use only. Not for human or veterinary use, diagnosis, or treatment. No dosing or medical guidance is provided.
          </p>

          {/* Lot Info */}
          <div className="bg-[#eef8fb] border border-[#c8dfe7] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[#66747b] text-sm">Lot Number</span>
              <span className="font-mono text-[#34414a]">{product.lot}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#eef8fb] border border-[#c8dfe7] rounded-lg p-6 mb-6 shadow-sm">
            <div className="mb-4 rounded-lg border border-[#c8dfe7] bg-white p-4 text-center text-[#34414a]">
              <div className="text-xs uppercase tracking-[0.18em] text-[#6d8792]">Standard pack</div>
              <div className="mt-2 text-2xl font-bold">Box of 10</div>
              <div className="text-sm mt-1">£{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</div>
            </div>

            <label className="mb-4 block text-sm font-semibold text-[#53636b]">
              Dosage
              <select
                value={selectedDosage}
                onChange={(event) => setSelectedDosage(Number(event.target.value))}
                className="mt-2 w-full rounded-lg border border-[#c8dfe7] bg-white px-3 py-3 font-normal text-[#34414a]"
              >
                {dosageOptions.map((dosage) => (
                  <option key={dosage} value={dosage}>{dosage}{dosageUnit}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#c8dfe7] bg-white rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-[#5b8ca0] hover:bg-[#dceff7] rounded-l-lg"
                >
                  −
                </button>
                <span className="px-6 py-2 text-[#34414a] font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quantityLimit, quantity + 1))}
                  className="px-4 py-2 text-[#5b8ca0] hover:bg-[#dceff7] rounded-r-lg"
                >
                  +
                </button>
              </div>
              <div className="flex-1 text-right">
                <div className="text-3xl font-bold text-[#34414a]">£{totalPrice.toFixed(2)}</div>
                <div className="text-sm text-[#66747b]">Total</div>
              </div>
            </div>
            {product.category === 'accessories' && <div className="mt-4">
              <p className="text-sm text-[#66747b] mb-2">Choose quantity</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((value) => <button
                  key={value}
                  type="button"
                  onClick={() => setQuantity(value)}
                  className={`py-2 rounded-lg border font-semibold transition ${quantity === value ? 'bg-[#5b8ca0] border-[#5b8ca0] text-white' : 'bg-white border-[#c8dfe7] text-[#5b8ca0] hover:bg-[#eef8fb]'}`}
                >
                  {value}
                </button>)}
              </div>
            </div>}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={isOutOfStock(product)}
            onClick={() => {
              if (isOutOfStock(product)) return;
              const cart = JSON.parse(localStorage.getItem('cart') || '[]');
              const cartName = `${product.name} ${selectedDosage}${dosageUnit}`;
              cart.push({
                slug: product.slug,
                name: cartName,
                price: effectivePrice(product, 'box', selectedDosage),
                boxPrice: effectivePrice(product, 'box', selectedDosage),
                image: product.image,
                lot: product.lot,
                qty: quantity,
                type: 'box',
                strength: selectedDosage,
              });
              localStorage.setItem('cart', JSON.stringify(cart));
              window.dispatchEvent(new Event('cart-updated'));
              alert('Added to cart!');
            }}
            className="w-full bg-[#5b8ca0] border border-[#5b8ca0] text-white font-bold py-4 rounded-xl hover:bg-[#466f7f] shadow-md transition mb-6"
          >
            {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
          </button>

          <div className="border-y border-[#d8d4c9] py-5 mb-6">
            <h2 className="text-lg font-semibold mb-2">Research context</h2>
            <p className="text-[#66747b] text-sm leading-relaxed">{researchContext} These are non clinical research areas only; no therapeutic, diagnostic, dosing, or administration use is implied.</p>
          </div>

        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="mt-12 rounded-3xl border border-[#d8d4c9] bg-[#fbfaf7] p-6 shadow-[0_8px_20px_rgba(52,65,74,0.06)]">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#34414a]">You may also like</h2>
              <p className="mt-1 text-sm text-[#66747b]">Explore related research materials from the same catalogue.</p>
            </div>
            <span className="rounded-full bg-[#eef8fb] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#5b8ca0]">Related</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
            {related.map((rel) => {
              const relDosage = rel.dosageOptions?.includes(10) ? 10 : rel.dosageOptions?.[0];
              const relPrice = effectivePrice(rel, 'box', relDosage);
              const relSoldOut = isOutOfStock(rel);
              return (
                <div key={rel.slug} className="snap-start flex w-[190px] shrink-0 flex-col rounded-2xl bg-[#fbfaf7] p-3 text-[#34414a] shadow-sm">
                  <Link href={`/shop/${rel.slug}`} className="block">
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
                      <ProductImage
                        src={rel.image}
                        alt={rel.name}
                        className="object-contain"
                      />
                    </div>
                    <p className="line-clamp-2 text-sm font-semibold leading-snug transition hover:text-[#5b8ca0]">{rel.name}</p>
                  </Link>
                  <p className="mt-1.5 font-bold text-[#34414a]">£{relPrice.toFixed(2)}</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#6d8792]">Box of 10</p>
                  <button
                    type="button"
                    disabled={relSoldOut}
                    onClick={() => {
                      if (relSoldOut) return;
                      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                      cart.push({ slug: rel.slug, name: `${rel.name}${relDosage ? ` ${relDosage}mg` : ''}`, price: relPrice, boxPrice: relPrice, image: rel.image, lot: rel.lot, qty: 1, type: 'box', strength: relDosage });
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.dispatchEvent(new Event('cart-updated'));
                      alert('Added to cart!');
                    }}
                    className="mt-2 w-full rounded-xl border border-[#5b8ca0] bg-[#5b8ca0] py-2 text-xs font-bold text-white transition hover:bg-[#466f7f] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {relSoldOut ? 'Out of stock' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
