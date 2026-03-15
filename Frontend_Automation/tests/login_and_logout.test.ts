import { test } from "../support/fixtures";
import { loginCredentials } from "../support/loginCredentials";

test.describe("Login as", () => {
  test("standard_user and Logout", async ({
    loginPage,
    inventoryPage,
    menuComponent,
  }) => {
    await loginPage.goToLoginPage();
    await loginPage.verifyLoginContainerDisplayed();

    await loginPage.enterUsername(loginCredentials.standardUser.username);
    await loginPage.enterPassword(loginCredentials.standardUser.password);
    await loginPage.clickLoginButton();

    await inventoryPage.verifyProductsTitleDisplayed();
    await inventoryPage.verifyInventoryContainerDisplayed();
    await inventoryPage.verifySessionCookieExists(
      loginCredentials.standardUser.username,
    );

    await inventoryPage.openMenu();
    await menuComponent.clickLogoutLink();

    await loginPage.verifyLoginContainerDisplayed();
    await inventoryPage.verifySessionCookieCleared();
  });
});
