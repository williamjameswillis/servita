import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";

export class CheckoutStepTwoPage extends BasePage {
  readonly checkoutTitle: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Checkout: Overview"));
    this.finishButton = page.locator("[data-test='finish']");
  }

  async verifyCheckoutTitleDisplayed() {
    await expect(this.checkoutTitle).toBeVisible();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}
