import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { clickElement } from "../helpers";

export class CheckoutCompletePage extends BasePage {
  readonly checkoutCompleteTitle: Locator;
  readonly checkoutCompleteMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutCompleteTitle = page
      .locator("[data-test='complete-header']")
      .and(page.getByText("Thank you for your order!"));
    this.checkoutCompleteMessage = page
      .locator("[data-test='complete-text']")
      .and(
        page.getByText(
          "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
        ),
      );
    this.backHomeButton = page.locator("[data-test='back-to-products']");
  }

  async verifyCheckoutCompleteTitleDisplayed() {
    await expect(this.checkoutCompleteTitle).toBeVisible();
  }

  async verifyCheckoutCompleteMessageDisplayed() {
    await expect(this.checkoutCompleteMessage).toBeVisible();
  }

  async clickBackHomeButton() {
    clickElement(this.backHomeButton);
  }
}
