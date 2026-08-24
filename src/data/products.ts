export interface Product {
  id?: string;
  slug: string;
  name: string;
  price: number; // per vial in GBP
  boxPrice: number; // 10 vials box
  purity: string;
  category: string;
  categoryLabel: string;
  description: string;
  lot: string;
  image: string;
  stockQuantity?: number;
  discountPercent?: number;
}

export const products: Product[] = [
  {
    slug: "ghk-cu",
    name: "GHK-Cu 100mg",
    price: 35.99,
    boxPrice: 323.91,
    purity: "99.84%",
    category: "recovery",
    categoryLabel: "Copper Complex",
    description: "Copper complex of the Gly-His-Lys sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2419-A",
    image: "/images/ghk-cu-100mg.png"
  },
  {
    slug: "mots-c",
    name: "MOTS-C 10mg",
    price: 29.99,
    boxPrice: 269.91,
    purity: "99.79%",
    category: "longevity",
    categoryLabel: "Mitochondrial",
    description: "Mitochondrial-derived 16-residue sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2411-I",
    image: "/images/mots-c-10mg.png"
  },
  {
    slug: "nad-plus",
    name: "NAD+ 500mg",
    price: 47.99,
    boxPrice: 431.91,
    purity: "99.78%",
    category: "longevity",
    categoryLabel: "Cellular Cofactor",
    description: "Nicotinamide adenine dinucleotide, oxidized form. Supplied for in vitro laboratory research.",
    lot: "GHK-2417-C",
    image: "/images/nad-plus-500mg.png"
  },
  {
    slug: "klow",
    name: "KLOW 80mg",
    price: 67.99,
    boxPrice: 611.91,
    purity: "99.69%",
    category: "blend",
    categoryLabel: "Research Blend",
    description: "Co-lyophilized composite of GHK-Cu, KPV, BPC-157, and TB-500. Supplied for in vitro laboratory research.",
    lot: "GHK-2415-E",
    image: "/images/klow-80mg.png"
  },
  {
    slug: "glp3-rt",
    name: "GLP3-RT 10mg",
    price: 47.99,
    boxPrice: 431.91,
    purity: "99.71%",
    category: "metabolic",
    categoryLabel: "Incretin Analog",
    description: "Triple receptor agonist analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2418-B",
    image: "/images/glp3-rt-10mg.png"
  },
  {
    slug: "glutathione",
    name: "Glutathione 1500mg",
    price: 39.99,
    boxPrice: 359.91,
    purity: "99.81%",
    category: "longevity",
    categoryLabel: "Antioxidant",
    description: "Reduced glutathione (GSH), gamma-Glu-Cys-Gly. Supplied for in vitro laboratory research.",
    lot: "GHK-2414-F",
    image: "/images/glutathione-1500mg.png"
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3 10mg",
    price: 51.99,
    boxPrice: 467.91,
    purity: "99.74%",
    category: "recovery",
    categoryLabel: "Growth Factor",
    description: "Long R3 analog of IGF-1. Supplied for in vitro laboratory research.",
    lot: "GHK-2413-G",
    image: "/images/igf-1-lr3-10mg.png"
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin 10mg",
    price: 59.99,
    boxPrice: 539.91,
    purity: "99.88%",
    category: "recovery",
    categoryLabel: "Growth Hormone",
    description: "Stabilized GHRH analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2412-H",
    image: "/images/tesamorelin-10mg.png"
  },
  {
    slug: "glp2-tz",
    name: "GLP2-TZ 10mg",
    price: 31.99,
    boxPrice: 287.91,
    purity: "99.62%",
    category: "metabolic",
    categoryLabel: "GLP-2 Analog",
    description: "Long-acting GLP-2 receptor analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2416-D",
    image: "/images/glp2-tz-10mg.png"
  },
  {
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 (No DAC) + Ipamorelin 10mg",
    price: 43.99,
    boxPrice: 395.91,
    purity: "99.83%",
    category: "blend",
    categoryLabel: "Research Blend",
    description: "Co-lyophilized blend of Mod GRF(1-29) and Ipamorelin. Supplied for in vitro laboratory research.",
    lot: "GHK-2410-J",
    image: "/images/cjc-1295-no-dac-ipamorelin-10mg.png"
  },
  {
    slug: "refined-h2o",
    name: "GHK H2O 10ml",
    price: 11.99,
    boxPrice: 107.91,
    purity: "N/A",
    category: "accessories",
    categoryLabel: "Research Supplies",
    description: "Sterile bacteriostatic water for laboratory reconstitution. Supplied for in vitro laboratory research.",
    lot: "GHK-2420-K",
    image: "/images/refined-h2o-10ml.png"
  },
  {
    slug: "pt-141",
    name: "PT-141 10mg",
    price: 35.99,
    boxPrice: 323.91,
    purity: "≥99%",
    category: "metabolic",
    categoryLabel: "Melanocortin",
    description: "Melanocortin receptor agonist analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2421-L",
    image: "/images/pt-141-10mg.png"
  },
  {
    slug: "melanotan-2",
    name: "Melanotan II 10mg",
    price: 23.99,
    boxPrice: 215.91,
    purity: "≥99%",
    category: "metabolic",
    categoryLabel: "Melanocortin",
    description: "Non-selective melanocortin receptor agonist analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2422-M",
    image: "/images/melanotan-2-10mg.png"
  },
  {
    slug: "ss-31",
    name: "SS-31 10mg",
    price: 39.99,
    boxPrice: 359.91,
    purity: "≥99%",
    category: "longevity",
    categoryLabel: "Mitochondrial",
    description: "Mitochondria-targeted four-residue synthetic sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2423-N",
    image: "/images/ss-31-10mg.png"
  },
  {
    slug: "melanotan-1",
    name: "Melanotan I 10mg",
    price: 23.99,
    boxPrice: 215.91,
    purity: "≥99%",
    category: "metabolic",
    categoryLabel: "Melanocortin",
    description: "Synthetic alpha-MSH analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2424-O",
    image: "/images/melanotan-1-10mg.png"
  },
  {
    slug: "wolverine",
    name: "Wolverine 10mg",
    price: 45.99,
    boxPrice: 413.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Copper Composite",
    description: "Copper-bound composite, lyophilized powder. Supplied for in vitro laboratory research.",
    lot: "GHK-2425-P",
    image: "/images/wolverine-10mg.png"
  },
  {
    slug: "kiss-peptin",
    name: "Kiss Peptin 10mg",
    price: 27.99,
    boxPrice: 251.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Peptide",
    description: "Synthetic kisspeptin-10 sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2426-Q",
    image: "/images/kiss-peptin-10mg.png"
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide 5mg",
    price: 47.99,
    boxPrice: 431.91,
    purity: "≥99%",
    category: "metabolic",
    categoryLabel: "Amylin Analog",
    description: "Long-acting amylin analog. Supplied for in vitro laboratory research.",
    lot: "GHK-2427-R",
    image: "/images/cagrilintide-5mg.png"
  },
  {
    slug: "kpv",
    name: "KPV 10mg",
    price: 31.99,
    boxPrice: 287.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Anti-Inflammatory",
    description: "Lys-Pro-Val sequence, C-terminal fragment of alpha-MSH. Supplied for in vitro laboratory research.",
    lot: "GHK-2428-S",
    image: "/images/kpv-10mg.png"
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin 10mg",
    price: 39.99,
    boxPrice: 359.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Growth Hormone",
    description: "Selective GHS-R1a agonist. Supplied for in vitro laboratory research.",
    lot: "GHK-2429-T",
    image: "/images/ipamorelin-10mg.png"
  },
  {
    slug: "glow",
    name: "GLOW 70mg",
    price: 59.99,
    boxPrice: 539.91,
    purity: "≥99%",
    category: "blend",
    categoryLabel: "Research Blend",
    description: "Co-lyophilized composite of GHK-Cu, BPC-157, and TB-500. Supplied for in vitro laboratory research.",
    lot: "GHK-2430-U",
    image: "/images/glow-70mg.png"
  },
  {
    slug: "adamax",
    name: "Adamax 10mg",
    price: 43.99,
    boxPrice: 395.91,
    purity: "≥99%",
    category: "blend",
    categoryLabel: "Research Blend",
    description: "Synthetic research compound blend, lyophilized powder. Supplied for in vitro laboratory research.",
    lot: "GHK-2431-V",
    image: "/images/adamax-10mg.png"
  },
  {
    slug: "ahk-cu",
    name: "AHK-Cu 100mg",
    price: 41.99,
    boxPrice: 377.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Copper Complex",
    description: "Copper complex of the Ala-His-Lys sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2432-W",
    image: "/images/ahk-cu-100mg.png"
  },
  {
    slug: "bpc-157",
    name: "BPC-157 10mg",
    price: 31.99,
    boxPrice: 287.91,
    purity: "99.2%",
    category: "recovery",
    categoryLabel: "Healing Peptide",
    description: "Synthetic 15-residue sequence (GEPPPGKPADDAGLV). Supplied for in vitro laboratory research.",
    lot: "GHK-2433-X",
    image: "/images/bpc-157-10mg.png"
  },
  {
    slug: "selank",
    name: "Selank 10mg",
    price: 23.99,
    boxPrice: 215.91,
    purity: "99.0%",
    category: "cognitive",
    categoryLabel: "Tuftsin Analog",
    description: "Synthetic tuftsin analog (TP-7 sequence). Supplied for in vitro laboratory research.",
    lot: "GHK-2434-Y",
    image: "/images/selank-10mg.png"
  },
  {
    slug: "tb-500",
    name: "TB-500 10mg",
    price: 31.99,
    boxPrice: 287.91,
    purity: "≥99%",
    category: "recovery",
    categoryLabel: "Thymosin Fragment",
    description: "Acetylated Thymosin beta-4 fragment. Lyophilized powder, ≥99% purity (HPLC). Supplied for in vitro laboratory research.",
    lot: "GHK-2435-Z",
    image: "/images/tb-500-10mg.png"
  },
  {
    slug: "semax",
    name: "Semax 10mg",
    price: 23.99,
    boxPrice: 215.91,
    purity: "99.0%",
    category: "cognitive",
    categoryLabel: "ACTH Analog",
    description: "Synthetic ACTH(4-10) analog, seven-residue sequence. Supplied for in vitro laboratory research.",
    lot: "GHK-2436-AA",
    image: "/images/semax-10mg.png"
  },
  {
    slug: "vial-organizer-3ml",
    name: "3ml Vial Organizer Case",
    price: 9.99,
    boxPrice: 89.91,
    purity: "N/A",
    category: "accessories",
    categoryLabel: "Laboratory Accessories",
    description: "Compact protective organizer case for 3ml research vials. Supplied as a laboratory accessory.",
    lot: "ACC-0001-A",
    image: "/images/research-accessory-1.avif?v=7"
  },
  {
    slug: "protective-vial-storage-case",
    name: "Protective Vial Storage Case",
    price: 14.99,
    boxPrice: 134.91,
    purity: "N/A",
    category: "accessories",
    categoryLabel: "Laboratory Accessories",
    description: "Protective storage case for organizing and transporting research vials. Supplied as a laboratory accessory.",
    lot: "ACC-0002-B",
    image: "/images/research-accessory-2.avif?v=7"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
