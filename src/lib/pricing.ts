import type { Product } from '@/data/products';

function discountRate(product: Product): number {
  return Math.min(Math.max(product.discountPercent || 0, 0), 100);
}

export function effectivePrice(product: Product, type: 'vial' | 'box'): number {
  const basePrice = type === 'box' ? product.boxPrice : product.price;
  return Number((basePrice * (1 - discountRate(product) / 100)).toFixed(2));
}

export function isOutOfStock(product: Product): boolean {
  return product.stockQuantity !== undefined && product.stockQuantity <= 0;
}
