'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/data/products';
import { effectivePrice, isOutOfStock } from '@/lib/pricing';
import ProductImage from '@/components/ProductImage';

interface Props {
  product: Product;
}

const researchContexts: Record<string, string> = {
  'ghk-cu': 'GHK-Cu is studied in laboratory models of copper binding, extracellular matrix signalling, fibroblast biology, and peptide structure.',
  'mots-c': 'MOTS-C is studied in laboratory models of mitochondrial signalling, cellular energy regulation, metabolic stress, and peptide stability.',
  'nad-plus': 'NAD+ is studied as a cellular redox cofactor in laboratory work on energy metabolism, mitochondrial function, and enzyme activity.',
  klow: 'KLOW is studied as a defined research blend in laboratory work examining the analytical properties and constituent behaviour of its peptide components.',
  'glp3-rt': 'GLP3-RT is studied in laboratory receptor and cell signalling models involving incretin related pathways and peptide receptor selectivity.',
  glutathione: 'Glutathione is studied in laboratory models of redox balance, thiol chemistry, oxidative stress, and cellular detoxification pathways.',
  'igf-1-lr3': 'IGF-1 LR3 is studied in laboratory models of growth factor receptor signalling, cell response pathways, and peptide structure.',
  tesamorelin: 'Tesamorelin is studied in laboratory models of growth hormone signalling and adipose tissue biology, including visceral adipose tissue, the fat stored around internal abdominal organs. The batch is tested as an individual research material; no combination use with another compound is implied.',
  'glp2-tz': 'GLP2-TZ is studied in laboratory receptor signalling and intestinal cell models focused on GLP-2 related peptide activity and stability.',
  'cjc-1295-ipamorelin': 'This blend is studied in laboratory models of growth hormone receptor signalling, peptide interaction, and the analytical behaviour of its two constituent sequences.',
  'refined-h2o': 'Bacteriostatic water is used in controlled laboratory workflows for research material preparation, handling, and storage where the protocol permits.',
  'pt-141': 'PT-141 is studied in laboratory melanocortin receptor models and signalling pathways associated with sexual arousal, alongside peptide structure and receptor activity research. The research context does not imply that this material causes a human effect or is intended for administration.',
  'melanotan-2': 'Melanotan II is studied in laboratory melanocortin receptor models, receptor selectivity, peptide stability, and cell signalling.',
  'ss-31': 'SS-31 is studied in laboratory models of mitochondrial membrane interactions, oxidative stress, cellular respiration, and peptide localisation.',
  'melanotan-1': 'Melanotan I is studied in laboratory melanocortin receptor models, receptor signalling, peptide structure, and cellular response.',
  wolverine: 'Wolverine is studied as a defined research blend in laboratory work examining peptide identity, constituent composition, and analytical behaviour.',
  'kiss-peptin': 'Kisspeptin is studied in laboratory models of G protein coupled receptor signalling, reproductive axis biology, peptide binding, and sequence activity.',
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

export default function ProductPageClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<'vial' | 'box'>('vial');
  const quantityLimit = product.category === 'accessories' ? 4 : 99;

  const price = effectivePrice(product, selectedType);
  const totalPrice = price * quantity;
  const offerUnitPrice = price * 0.95;
  const offerTotalPrice = offerUnitPrice * quantity;
  const researchContext = researchContexts[product.slug] || 'This material is studied in controlled laboratory work involving peptide structure, analytical chemistry, and cellular signalling.';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-400 hover:text-white">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/shop" className="text-gray-400 hover:text-white">
          Shop
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
          <ProductImage src={product.image} alt={product.name} className="object-cover" />
          <div className="absolute top-4 right-4 flex max-w-[calc(100%-2rem)] flex-col items-end gap-2">
            <div className="rounded-lg border border-[#8298aa] bg-[#17212a]/95 px-3 py-2 text-center text-xs font-semibold leading-tight text-[#d8e2e8] shadow-lg">
              Lyophilised raw material in a vial
            </div>
            <div className="rounded-md border border-[#aebfca]/70 bg-[#0d151c]/95 px-3 py-1.5 text-right text-[10px] font-mono font-semibold tracking-wide text-[#c2ced5] shadow-lg">
              Batch {product.lot}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-[#8298aa]/20 text-[#c2ced5] border border-[#657c8f] px-3 py-1 rounded-full text-sm font-semibold">
              Test report available
            </span>
            <span className="inline-block bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm ml-2">
              {product.categoryLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-white/60 mb-3">{product.description}</p>
          <p className="text-[#a6b8c4] text-sm mb-3">For research and chemistry use only. Each box is checked using a five vial composite sample to assess identity, purity, and other documented quality specifications.</p>
          <p className="text-[#a6b8c4] text-sm mb-6">Available to purchase as an individual vial or a box of 10.</p>
          <p className="text-amber-300/80 text-sm mb-6 border-l-2 border-amber-300/50 pl-3">
            Laboratory research use only. Not for human or veterinary use, diagnosis, or treatment. No dosing or medical guidance is provided.
          </p>

          {/* Lot Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Lot Number</span>
              <span className="font-mono text-white">{product.lot}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#22313d]/80 border border-[#617789] rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setSelectedType('vial')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedType === 'vial'
                    ? 'bg-[#9aafbd]/40 border border-[#aebfca] text-[#eef4f7]'
                    : 'bg-[#2b3b48] border border-[#617789] text-[#d5e0e6] hover:bg-[#354957]'
                }`}
              >
                1 Vial
                <div className="text-sm mt-1">£{effectivePrice(product, 'vial').toFixed(2)}</div>
              </button>
              <button
                onClick={() => setSelectedType('box')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedType === 'box'
                    ? 'bg-[#9aafbd]/40 border border-[#aebfca] text-[#eef4f7]'
                    : 'bg-[#2b3b48] border border-[#617789] text-[#d5e0e6] hover:bg-[#354957]'
                }`}
              >
                Box of 10
                <div className="text-sm mt-1">£{effectivePrice(product, 'box').toFixed(2)}</div>
              </button>
            </div>

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
                  className={`py-2 rounded-lg border font-semibold transition ${quantity === value ? 'bg-[#9aafbd]/40 border-[#aebfca] text-[#eef4f7]' : 'bg-[#2b3b48] border-[#617789] text-[#d5e0e6] hover:bg-[#354957]'}`}
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
              cart.push({
                slug: product.slug,
                name: product.name,
                price: effectivePrice(product, selectedType),
                boxPrice: effectivePrice(product, 'box'),
                image: product.image,
                lot: product.lot,
                qty: quantity,
                type: selectedType,
              });
              localStorage.setItem('cart', JSON.stringify(cart));
              window.dispatchEvent(new Event('cart-updated'));
              alert('Added to cart!');
            }}
            className="w-full bg-[#9aafbd]/40 border border-[#aebfca] text-[#eef4f7] font-bold py-4 rounded-lg hover:bg-[#9aafbd]/55 transition mb-6"
          >
            {isOutOfStock(product) ? 'Out of stock' : 'Add to Cart'}
          </button>

          <div className="border-y border-white/10 py-5 mb-6">
            <h2 className="text-lg font-semibold mb-2">Research context</h2>
            <p className="text-white/70 text-sm leading-relaxed">{researchContext} These are non clinical research areas only; no therapeutic, diagnostic, dosing, or administration use is implied.</p>
          </div>

          {/* Batch analytical test report link */}
          <div className="border-t border-white/10 pt-6">
            <a
              href={`/api/coa?lot=${encodeURIComponent(product.lot)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#a6b8c4] hover:text-[#d8e2e8]"
            >
              <span>View Batch Analytical Test Report</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 bg-white/5 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Five vial composite sample per box</li>
              <li>• Format: Lyophilized powder</li>
              <li>• Storage: -20°C</li>
              <li>• Research use only</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Batch analytical test report available</li>
              <li>• Full report available for each lot</li>
              <li>• 8-point testing protocol</li>
              <li>• UK based quality control</li>
            </ul>
          </div>
        </div>

        {/* Product offer */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2">Special Offer: 5% Off This Product</h2>
          <p className="text-white/60 mb-6">Purchase {product.name} today and receive 5% off your selected vial or box quantity.</p>
          <div className="bg-[#22313d] border border-[#718898] rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="font-semibold text-white">{selectedType === 'box' ? 'Box of 10 vials' : '1 vial'} offer price</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-[#a6b8c4]">£{offerUnitPrice.toFixed(2)}</span>
                <span className="text-sm text-white/50 line-through">£{price.toFixed(2)}</span>
                <span className="text-sm font-semibold text-[#a6b8c4]">5% off</span>
              </div>
              <p className="text-sm text-white/60 mt-1">{quantity} selected · Offer total £{offerTotalPrice.toFixed(2)}</p>
            </div>
            <button
              type="button"
              disabled={isOutOfStock(product)}
              onClick={() => {
                if (isOutOfStock(product)) return;
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                cart.push({
                  slug: product.slug,
                  name: product.name,
                  price: effectivePrice(product, 'vial') * 0.95,
                  boxPrice: effectivePrice(product, 'box') * 0.95,
                  image: product.image,
                  lot: product.lot,
                  qty: quantity,
                  type: selectedType,
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                window.dispatchEvent(new Event('cart-updated'));
                alert('5% off offer added to cart!');
              }}
              className="w-full md:w-auto bg-[#9aafbd]/40 border border-[#aebfca] text-[#eef4f7] font-bold py-3 px-6 rounded-lg hover:bg-[#9aafbd]/55 transition disabled:opacity-50"
            >
              Add 5% Off Offer
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
