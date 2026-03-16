import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { clickElement } from "../helpers";
import { ProductModel } from "../models";

export class CheckoutStepTwoPage extends BasePage {
  readonly checkoutTitle: Locator;
  readonly finishButton: Locator;
  readonly cartItemsCount: Locator;
  readonly cartItemName: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Checkout: Overview"));
    this.finishButton = page.locator("[data-test='finish']");
    this.cartItemsCount = page.locator("[data-test='item-quantity']");
    this.cartItemName = page.locator("[data-test='inventory-item-name']");
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
    }
  }
}
