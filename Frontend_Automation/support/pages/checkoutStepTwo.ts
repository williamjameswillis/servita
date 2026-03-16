import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  clickElement,
} from "../helpers";
import { ProductModel } from "../models";

export class CheckoutStepTwoPage extends BasePage {
  readonly checkoutTitle: Locator;
  readonly finishButton: Locator;
  readonly cartItemsCount: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Checkout: Overview"));
    this.finishButton = page.locator("[data-test='finish']");
    this.cartItemsCount = page.locator("[data-test='item-quantity']");
    this.subtotalLabel = page.locator("[data-test='subtotal-label']");
    this.taxLabel = page.locator("[data-test='tax-label']");
    this.totalLabel = page.locator("[data-test='total-label']");
  }

  async verifyCheckoutTitleDisplayed() {
    await expect(this.checkoutTitle).toBeVisible();
  }

  async clickFinishButton() {
    await clickElement(this.finishButton);
  }

  async verifyCartItemsCount(expectedCount: number) {
    await expect(this.cartItemsCount).toHaveCount(expectedCount);
  }

  async verifyCartContainsItem(products: ProductModel[]) {
    for (const [index, product] of products.entries()) {
      const cartItemName = this.page
        .locator(`[data-test='inventory-item-name']`)
        .nth(index);
      await expect(cartItemName).toHaveText(product.name);

      const cartItemPrice = this.page
        .locator(`[data-test='inventory-item-price']`)
        .nth(index);
      await expect(cartItemPrice).toHaveText(`$${product.price.toFixed(2)}`);
    }
  }

  async verifySubtotal(products: ProductModel[]) {
    const subtotal = calculateSubtotal(products);
    await expect(this.subtotalLabel).toHaveText(
      `Item total: $${subtotal.toFixed(2)}`,
    );
  }

  async verifyTax(products: ProductModel[]) {
    const subtotal = calculateSubtotal(products);
    await expect(this.taxLabel).toHaveText(
      `Tax: $${calculateTax(subtotal).toFixed(2)}`,
    );
  }

  async verifyTotal(products: ProductModel[]) {
    const subtotal = calculateSubtotal(products);
    await expect(this.totalLabel).toHaveText(
      `Total: $${calculateTotal(subtotal).toFixed(2)}`,
    );
  }
}
