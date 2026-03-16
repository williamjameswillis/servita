import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";

export class CartPage extends BasePage {
  readonly cartTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Your Cart"));
  }

  async verifyCartTitleDisplayed() {
    await expect(this.cartTitle).toBeVisible();
  }
}
