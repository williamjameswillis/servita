import { expect, type Locator, type Page } from "@playwright/test";
import { fillInput, clickElement } from "../helpers";
import { BasePage } from "./base";

export class LoginPage extends BasePage {
  readonly loginContainer: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.loginContainer = page.locator("[data-test='login-container']");
    this.usernameInput = page.locator("[data-test='username']");
    this.passwordInput = page.locator("[data-test='password']");
    this.loginButton = page.locator("[data-test='login-button']");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async goToLoginPage() {
    await this.page.goto("/");
  }

  async verifyLoginContainerDisplayed() {
    await expect(this.loginContainer).toBeVisible();
  }

  async enterUsername(username: string) {
    await fillInput(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await fillInput(this.passwordInput, password);
  }

  async clickLoginButton() {
    await clickElement(this.loginButton);
  }

  async verifyErrorMessageContains(text: string) {
    await expect(this.errorMessage).toHaveText(text);
  }
}
