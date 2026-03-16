export const ProductSortOption = {
  az: "Name (A to Z)",
  za: "Name (Z to A)",
  lohi: "Price (low to high)",
  hilo: "Price (high to low)",
} as const;

export type ProductSortOption = keyof typeof ProductSortOption;

export interface ProductModel {
  code: string;
  name: string;
}
