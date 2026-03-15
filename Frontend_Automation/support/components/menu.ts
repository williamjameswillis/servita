import { expect, type Locator, type Page } from "@playwright/test";
import { clickElement } from "../helpers";
import { BasePage } from "../pages/base";

export class MenuComponent extends BasePage {
  readonly closeButton: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly resetAppState: Locator;

  constructor(page: Page) {
    super(page);

    this.closeButton = page.getByText("Close Menu");
    this.allItems = page
      .locator("[data-test='inventory-sidebar-link']")
      .and(page.getByText("All Items"));
    this.about = page.locator("[data-test='about-sidebar-link']");
    this.logout = page.locator("[data-test='logout-sidebar-link']");
    this.resetAppState = page.locator("[data-test='reset-sidebar-link']");
  }

  async verifyAllItemsLinkDisplayed() {
    await expect(this.allItems).toBeVisible();
  }

  async clickCloseMenuButton() {
    await clickElement(this.closeButton);
  }

  async clickAllItemsLink() {
    await clickElement(this.allItems);
  }

  async clickAboutLink() {
    await clickElement(this.about);
  }

  async clickLogoutLink() {
    await clickElement(this.logout);
  }

  async clickResetAppStateLink() {
    await clickElement(this.resetAppState);
  }
}
