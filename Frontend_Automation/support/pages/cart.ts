import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";

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
    await expect(this.cartItemsCount).toHaveText(expectedCount.toString());
  }

  async verifyCartContainsItem(itemCode: string, itemName: string) {
    const cartItemRemoveButton = this.page.locator(
      `[data-test='remove-${itemCode}']`,
    );
    await expect(cartItemRemoveButton).toBeVisible();
    const cartItemName = this.page.locator(`[data-test='inventory-item-name']`);
    await expect(cartItemName).toHaveText(itemName);
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
