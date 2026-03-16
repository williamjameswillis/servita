import { test } from "../support/fixtures";
import { loginCredentials } from "../support/loginCredentials";

test.describe("Single Item Checkout - ", () => {
  test.only("login as standard_user then add a single item to the cart and checkout then logout", async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    const productName = "sauce-labs-backpack";

    await loginPage.goToLoginPage();
    await loginPage.verifyLoginContainerDisplayed();

    await loginPage.enterUsername(loginCredentials.standardUser.username);
    await loginPage.enterPassword(loginCredentials.standardUser.password);
    await loginPage.clickLoginButton();

    await inventoryPage.verifyProductsTitleDisplayed();
    await inventoryPage.verifyInventoryContainerDisplayed();
    await inventoryPage.verifyIfDuplicateProductImages(false);
    await inventoryPage.verifySessionCookieExistsForUser(
      loginCredentials.standardUser.username,
    );

    await inventoryPage.clickAddToCartButtonFor(productName);
    await inventoryPage.verifyCartBadgeCount(1, true);
    await inventoryPage.clickCart();

    await cartPage.verifyCartTitleDisplayed();
  });
});
