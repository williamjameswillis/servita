import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { ProductModel } from "../models";

export class CartPage extends BasePage {
  readonly cartTitle: Locator;
  readonly cartItemsCount: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemName: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Your Cart"));
    this.cartItemsCount = page.locator("[data-test='item-quantity']");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.cartItemName = page.locator("[data-test='inventory-item-name']");
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
