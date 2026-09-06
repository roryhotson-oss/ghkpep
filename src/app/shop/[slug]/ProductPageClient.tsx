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
  const offerUnitPrice = effectivePrice(product, 'box', selectedDosage) * 0.95;
  const offerTotalPrice = offerUnitPrice * quantity;
  const researchContext = researchContexts[product.slug] || 'This material is studied in controlled laboratory work involving peptide structure, analytical chemistry, and cellular signalling.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
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
        <div className="relative aspect-square bg-gradient-to-br from-[#0c1622] to-black rounded-3xl overflow-hidden border-4 border-[#FBFAF7] shadow-md">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="object-contain"
            showBoxLabel
            showPackagingNotice={product.category !== 'accessories' && product.category !== 'peptide-holders'}
          />
          <div className="absolute top-4 right-4 flex max-w-[calc(100%-2rem)] flex-col items-end gap-2">
            <div className="rounded-xl border-2 border-[#FBFAF7] bg-[#0c1622]/95 px-3 py-2 text-center text-xs font-semibold leading-tight text-[#d8e2e8] shadow-lg">
              {product.category === 'accessories' ? 'Accessories' : 'Lyophilised powder'}
            </div>
            <div className="rounded-xl border-2 border-[#FBFAF7] bg-[#0c1622]/95 px-3 py-1.5 text-right text-[10px] font-mono font-semibold tracking-wide text-[#c2ced5] shadow-lg">
              Holder refrigerated
            </div>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <div className="bg-[#FBFAF7] rounded-3xl shadow-md p-6">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-xl font-bold text-[#111827]">You may also like</h2>
              <span className="text-xs font-bold uppercase tracking-wide text-[#0f6b4f] bg-[#e2f3ea] px-2.5 py-1 rounded-full">10% off</span>
            </div>
            <p className="text-sm text-[#5a6673] mb-4">Add any of these alongside your order and save 10% on the box.</p>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {related.map((rel) => {
                const relDosage = rel.dosageOptions?.includes(10) ? 10 : rel.dosageOptions?.[0];
                const relPrice = effectivePrice(rel, 'box', relDosage);
                const relOffer = relPrice * 0.9;
                const relSoldOut = isOutOfStock(rel);
                return (
                  <div key={rel.slug} className="snap-start shrink-0 w-[190px] text-[#e6edf3] bg-[#0c1622] rounded-2xl border-4 border-[#ECE9E2] shadow-sm p-3 flex flex-col">
                    <Link href={`/shop/${rel.slug}`} className="block">
                      <div className="relative aspect-square bg-[#111d2c] rounded-xl overflow-hidden mb-2">
                        <ProductImage src={rel.image} alt={rel.name} className="object-contain" />
                      </div>
                      <p className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#8298aa] transition">{rel.name}</p>
                    </Link>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="font-bold text-white">£{relOffer.toFixed(2)}</span>
                      <span className="text-xs text-white/50 line-through">£{relPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-[#93a7b0] uppercase tracking-wide">Box of 10 · 10% off</p>
                    <button
                      type="button"
                      disabled={relSoldOut}
                      onClick={() => {
                        if (relSoldOut) return;
                        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        cart.push({
                          slug: rel.slug,
                          name: `${rel.name}${relDosage ? ` ${relDosage}mg` : ''}`,
                          price: relOffer,
                          boxPrice: relOffer,
                          image: rel.image,
                          lot: rel.lot,
                          qty: 1,
                          type: 'box',
                          strength: relDosage,
                        });
                        localStorage.setItem('cart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cart-updated'));
                        alert('10% off offer added to cart!');
                      }}
                      className="mt-2 w-full bg-[#0c1622] border-2 border-[#FBFAF7] text-white text-xs font-bold py-2 rounded-xl hover:bg-[#16283c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {relSoldOut ? 'Out of stock' : 'Add 10% Off'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        </div>

        {/* Product Info */}
        <div className="text-[#e6edf3] bg-[#0c1622] rounded-3xl p-6 lg:p-8 border-4 border-[#FBFAF7] shadow-md">
          <div className="mb-4">
            <span className="inline-block bg-[#0c1622] text-[#e6edf3] border-2 border-[#FBFAF7] px-3 py-1 rounded-xl text-sm font-semibold">
              Lot reference held
            </span>
            <span className="inline-block bg-[#0c1622] text-[#e6edf3] border-2 border-[#FBFAF7] px-3 py-1 rounded-xl text-sm ml-2">
              {product.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-white/60 mb-3">{product.description}</p>
          <p className="text-[#a6b8c4] text-sm mb-3">For laboratory research and chemistry use only. Any analytical documentation is produced by the source laboratory or a third-party laboratory it engages; availability and scope vary by lot.</p>
          <p className="text-[#a6b8c4] text-sm mb-6">We source directly from laboratories. Our prices reflect sourcing, packaging, and delivery costs, while keeping research materials reasonably priced.</p>
          <p className="text-amber-300/80 text-sm mb-6 border-l-2 border-amber-300/50 pl-3">
            Laboratory research use only. Not for human or veterinary use, diagnosis, or treatment. No dosing or medical guidance is provided.
          </p>

          {/* Lot Info */}
          <div className="bg-white/5 border border-[#FBFAF7]/70 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Lot Number</span>
              <span className="font-mono text-white">{product.lot}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#0c1622]/80 border border-[#FBFAF7] rounded-lg p-6 mb-6 shadow-sm">
            <div className="mb-4 rounded-lg border border-[#FBFAF7] bg-[#111d2c] p-4 text-center text-[#eef4f7]">
              <div className="text-xs uppercase tracking-[0.18em] text-[#d8e2e8]">Standard pack</div>
              <div className="mt-2 text-2xl font-bold">Box of 10</div>
              <div className="text-sm mt-1">£{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</div>
            </div>

            <label className="mb-4 block text-sm font-semibold text-[#d5e0e6]">
              Dosage
              <select
                value={selectedDosage}
                onChange={(event) => setSelectedDosage(Number(event.target.value))}
                className="mt-2 w-full rounded-lg border border-[#FBFAF7] bg-[#0c1622] px-3 py-3 font-normal text-[#eef4f7]"
              >
                {dosageOptions.map((dosage) => (
                  <option key={dosage} value={dosage}>{dosage}{dosageUnit}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/10 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-l-lg"
                >
                  −
                </button>
                <span className="px-6 py-2 text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quantityLimit, quantity + 1))}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <div className="flex-1 text-right">
                <div className="text-3xl font-bold text-white">£{totalPrice.toFixed(2)}</div>
                <div className="text-sm text-white/60">Total</div>
              </div>
            </div>
            {product.category === 'accessories' && <div className="mt-4">
              <p className="text-sm text-white/60 mb-2">Choose quantity</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((value) => <button
                  key={value}
                  type="button"
                  onClick={() => setQuantity(value)}
                  className={`py-2 rounded-lg border font-semibold transition ${quantity === value ? 'bg-[#0c1622] border-[#FBFAF7] text-white' : 'bg-[#0c1622] border-[#FBFAF7] text-[#d5e0e6] hover:bg-[#16283c]'}`}
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
            className="w-full bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold py-4 rounded-xl hover:bg-[#16283c] shadow-md transition mb-6"
          >
            {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
          </button>

          <div className="border-y border-white/10 py-5 mb-6">
            <h2 className="text-lg font-semibold mb-2">Research context</h2>
            <p className="text-white/70 text-sm leading-relaxed">{researchContext} These are non clinical research areas only; no therapeutic, diagnostic, dosing, or administration use is implied.</p>
          </div>

          {/* Batch reference summary link */}
          <div className="border-t border-white/10 pt-6">
            <a
              href={`/api/coa?lot=${encodeURIComponent(product.lot)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#a6b8c4] hover:text-[#d8e2e8]"
            >
              <span>View batch reference summary</span>
              <span>→</span>
            </a>
            <p className="mt-2 text-xs text-white/50">Catalogue and lot reference information only. Not a test report.</p>
          </div>
        </div>
      </div>

      {/* Product offer */}
      <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2">Special Offer: 5% Off This Product</h2>
          <p className="text-[#4a5561] mb-6">Purchase a box of 10 {product.name} today and receive 5% off.</p>
          <div className="bg-[#0c1622] border border-[#FBFAF7] rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="font-semibold text-white">Box of 10 vials offer price</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-[#a6b8c4]">£{offerUnitPrice.toFixed(2)}</span>
                <span className="text-sm text-white/50 line-through">£{effectivePrice(product, 'box', selectedDosage).toFixed(2)}</span>
                <span className="text-sm font-semibold text-[#a6b8c4]">5% off</span>
              </div>
                <p className="text-sm text-white/60 mt-1">{quantity} box{quantity === 1 ? '' : 'es'} selected · Offer total £{offerTotalPrice.toFixed(2)}</p>
            </div>
            <button
              type="button"
              disabled={isOutOfStock(product)}
              onClick={() => {
                if (isOutOfStock(product)) return;
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                cart.push({
                  slug: product.slug,
                  name: `${product.name} ${selectedDosage}${dosageUnit}`,
                  price: effectivePrice(product, 'box', selectedDosage) * 0.95,
                  boxPrice: effectivePrice(product, 'box', selectedDosage) * 0.95,
                  image: product.image,
                  lot: product.lot,
                  qty: quantity,
                  type: 'box',
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                window.dispatchEvent(new Event('cart-updated'));
                alert('5% off offer added to cart!');
              }}
              className="w-full md:w-auto bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#16283c] shadow-md transition disabled:opacity-50"
            >
              Add 5% Off Offer
            </button>
          </div>
      </div>

    </div>
  );
}
