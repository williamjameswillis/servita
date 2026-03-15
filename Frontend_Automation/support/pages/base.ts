import { expect, type Locator, type Page } from "@playwright/test";
import { clickElement } from "../helpers";

export class BasePage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly pageTitle: Locator;
  readonly menuButton: Locator;
  readonly inventoryContainer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']");
    this.menuButton = page.getByText("Open Menu");
    this.pageTitle = page.getByText("Swag Labs");
    this.inventoryContainer = page.locator("[data-test='inventory-container']");
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

  async verifyInventoryContainerDisplayed() {
    await expect(this.inventoryContainer).toBeVisible();
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

  async verifySessionCookieExists(username: string) {
    const cookies = await this.page.context().cookies();
    const session = cookies.find(
      (c) => c.name === "session-username" && c.value === username,
    );
    expect(session).toBeDefined();
  }

  async verifySessionCookieCleared() {
    const cookies = await this.page.context().cookies();
    const session = cookies.find((c) => c.name === "session-username");
    expect(session).toBeUndefined();
  }
}
