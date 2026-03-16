import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { clickElement } from "../helpers";

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
    clickElement(this.finishButton);
  }

  async verifyCartItemsCount(expectedCount: number) {
    await expect(this.cartItemsCount).toHaveText(expectedCount.toString());
  }

  async verifyCartContainsItem(itemName: string) {
    const cartItemName = this.page.locator(`[data-test='inventory-item-name']`);
    await expect(cartItemName).toHaveText(itemName);
  }
}
