import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { ProductModel } from "../models";

export class CartPage extends BasePage {
  readonly cartTitle: Locator;
  readonly cartItemsCount: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Your Cart"));
    this.cartItemsCount = page.locator("[data-test='item-quantity']");
    this.checkoutButton = page.locator("[data-test='checkout']");
  }

  async verifyCartTitleDisplayed() {
    await expect(this.cartTitle).toBeVisible();
  }

  async verifyCartItemsCount(expectedCount: number) {
    await expect(this.cartItemsCount).toHaveCount(expectedCount);
  }

  async verifyCartContainsItem(products: ProductModel[]) {
    for (const [index, product] of products.entries()) {
      const cartItemRemoveButton = this.page.locator(
        `[data-test='remove-${product.code}']`,
      );
      await expect(cartItemRemoveButton).toBeVisible();

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

  async clickRemoveItem(itemCode: string) {
    const cartItemRemoveButton = this.page.locator(
      `[data-test='remove-${itemCode}']`,
    );
    await cartItemRemoveButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
