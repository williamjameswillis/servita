import { expect, type Locator, type Page } from "@playwright/test";
import { clickElement } from "../helpers";

export class BasePage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly pageTitle: Locator;
  readonly menuButton: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly footer: Locator;
  readonly fullPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']");
    this.shoppingCartBadge = page.locator("[data-test='shopping-cart-badge']");
    this.menuButton = page.getByText("Open Menu");
    this.pageTitle = page.getByText("Swag Labs");
    this.twitterLink = page.locator("social-twitter");
    this.facebookLink = page.locator("social-facebook");
    this.linkedInLink = page.locator("social-linkedin");
    this.footer = page.locator("footer-copy");
    this.fullPage = page.locator("html");
  }

  async clickCart() {
    await clickElement(this.shoppingCartLink);
  }

  /**
   * Asserts the shopping cart badge count against an expected value.
   *
   * @param expectedCount - The number to compare the cart badge text against.
   * @param expectCountToMatch - Pass `true` to assert the badge shows exactly
   *   `expectedCount`, or `false` to assert it does not (e.g. error_user where
   *   add-to-cart buttons fail silently and the count should not update).
   */
  async verifyCartBadgeCount(
    expectedCount: number,
    expectCountToMatch: boolean,
  ) {
    await expect(this.shoppingCartBadge).toBeVisible();
    if (expectCountToMatch) {
      await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
    } else {
      await expect(this.shoppingCartBadge).not.toHaveText(
        expectedCount.toString(),
      );
    }
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

  async verifySessionCookieExistsForUser(username: string) {
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

  /**
   * Measures the time taken to execute the provided action and asserts that it
   * exceeds the given threshold. Use this to verify that a known performance
   * issue (e.g. slow login) is present — the test will fail if the action
   * completes faster than expected.
   *
   * @param action - An async callback containing the steps to time.
   * @param thresholdMs - Minimum duration in milliseconds the action must take.
   */
  async verifyPerformanceIssueBetweenActions(
    action: () => Promise<void>,
    thresholdMs: number,
  ) {
    const start = performance.now();
    await action();
    const elapsed = performance.now() - start;
    expect(
      elapsed,
      `Expected navigation to exceed ${thresholdMs}ms but completed in ${Math.round(elapsed)}ms`,
    ).toBeGreaterThan(thresholdMs);
  }

  async waitForPageError(errorMessage: string): Promise<void> {
    await this.page.waitForEvent("pageerror", (error) =>
      error.message.includes(errorMessage),
    );
  }

  async checkUIMatchesSnapshot() {
    await expect(this.fullPage).toMatchAriaSnapshot();
  }
}
