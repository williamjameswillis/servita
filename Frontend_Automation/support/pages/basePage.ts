import { expect, type Locator, type Page } from "@playwright/test";
import { clickElement } from "../helpers";

export class BasePage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly pageTitle: Locator;
  readonly menuButton: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']");
    this.menuButton = page.locator("[data-test='open-menu']");
    this.pageTitle = page.getByText("Swag Labs");
    this.twitterLink = page.locator("social-twitter");
    this.facebookLink = page.locator("social-facebook");
    this.linkedInLink = page.locator("social-linkedin");
    this.footer = page.locator("footer-copy");
  }

  async clickCart() {
    await clickElement(this.shoppingCartLink);
  }

  async openMenu() {
    await clickElement(this.menuButton);
  }

  async verifyPageTitleDisplayed() {
    await expect(this.pageTitle).toBeVisible();
  }

  async clickTwitterLink() {
    await clickElement(this.twitterLink);
  }

  async clickFacebookLink() {
    await clickElement(this.facebookLink);
  }

  async clickLinkedInLink() {
    await clickElement(this.linkedInLink);
  }

  async verifyFooterDisplayed() {
    await expect(this.footer).toBeVisible();
  }
}
