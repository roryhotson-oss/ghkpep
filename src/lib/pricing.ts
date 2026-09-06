import type { Product } from '@/data/products';

function discountRate(product: Product): number {
  return Math.min(Math.max(product.discountPercent || 0, 0), 100);
}

export function getBundleDiscountPercent(quantity: number): number {
  if (quantity >= 5) return 10;
  if (quantity >= 2) return 5;
  return 0;
}

export function effectivePrice(product: Product, type: 'vial' | 'box', dosage?: number): number {
  const dosePrices = type === 'box' ? product.dosageBoxPrices : product.dosageVialPrices;
  const basePrice = dosage !== undefined && dosePrices?.[dosage] !== undefined
    ? dosePrices[dosage]
    : type === 'box' ? product.boxPrice : product.price;
  return Number((basePrice * (1 - discountRate(product) / 100)).toFixed(2));
}

export function orderTotalWithBundle(product: Product, type: 'vial' | 'box', dosage: number, quantity: number): number {
  const unitPrice = effectivePrice(product, type, dosage);
  const bundleDiscount = getBundleDiscountPercent(quantity) / 100;
  const subtotal = unitPrice * quantity;
  return Number((subtotal * (1 - bundleDiscount)).toFixed(2));
}

export function isOutOfStock(product: Product): boolean {
  return product.stockQuantity !== undefined && product.stockQuantity <= 0;
}
