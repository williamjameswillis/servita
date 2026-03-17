import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base";
import { clickElement, fillInput } from "../helpers";

export class CheckoutStepOnePage extends BasePage {
  readonly checkoutTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Checkout: Your Information"));
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.postalCodeInput = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
  }

  async verifyCheckoutTitleDisplayed() {
    await expect(this.checkoutTitle).toBeVisible();
  }

  async enterFirstName(firstName: string) {
    await fillInput(this.firstNameInput, firstName);
  }

  async enterLastName(lastName: string) {
    await fillInput(this.lastNameInput, lastName);
  }

  async enterPostalCode(postalCode: string) {
    await fillInput(this.postalCodeInput, postalCode);
  }

  async clickContinueButton() {
    await clickElement(this.continueButton);
  }
}
