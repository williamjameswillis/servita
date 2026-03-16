import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";

export class CartPage extends BasePage {
  readonly cartTitle: Locator;
  readonly cartItemsCount: Locator;
  checkoutButton: Locator;

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
    await expect(this.cartItemsCount).toHaveText(expectedCount.toString());
  }

  async verifyCartContainsItem(itemName: string) {
    const cartItemRemoveButton = this.page.locator(
      `[data-test='remove-${itemName}']`,
    );
    await expect(cartItemRemoveButton).toBeVisible();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
