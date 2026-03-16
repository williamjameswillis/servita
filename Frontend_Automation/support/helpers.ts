import { type Locator } from "@playwright/test";

export const taxRate = 0.08;

/** Sums the `price` of each product to produce a subtotal. */
export const calculateSubtotal = (products: { price: number }[]) =>
  products.reduce((total, product) => total + product.price, 0);

export const calculateTax = (amount: number) => {
  return amount * taxRate;
};

export const calculateTotal = (amount: number) => {
  return amount + calculateTax(amount);
};

export const clickElement = async (locator: Locator) => {
  await locator.click();
};

export const selectOption = async (locator: Locator, option: string) => {
  await locator.selectOption({ label: option });
};

export const fillInput = async (locator: Locator, value: string) => {
  await locator.fill(value);
};
