import { test } from "../support/fixtures";
import { loginCredentials } from "../support/loginCredentials";

test.describe("Login and Logout - ", () => {
  test.describe("Happy Path - ", () => {
    test("login as standard_user and logout", async ({
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
      await inventoryPage.verifyIfDuplicateProductImages(false);
      await inventoryPage.verifySessionCookieExistsForUser(
        loginCredentials.standardUser.username,
      );

      await inventoryPage.openMenu();
      await menuComponent.clickLogoutLink();

      await loginPage.verifyLoginContainerDisplayed();
      await inventoryPage.verifySessionCookieCleared();
    });
  });

  test.describe("Sad Path - ", () => {
    test("attempt login as locked_out_user and verify error message", async ({
      loginPage,
    }) => {
      const errorMessage =
        "Epic sadface: Sorry, this user has been locked out.";

      await loginPage.goToLoginPage();
      await loginPage.verifyLoginContainerDisplayed();

      await loginPage.enterUsername(loginCredentials.lockedOutUser.username);
      await loginPage.enterPassword(loginCredentials.lockedOutUser.password);
      await loginPage.clickLoginButton();

      await loginPage.verifyErrorMessageContains(errorMessage);
    });

    test("login as problem_user and verify error behavior", async ({
      loginPage,
      inventoryPage,
      menuComponent,
    }) => {
      await loginPage.goToLoginPage();
      await loginPage.verifyLoginContainerDisplayed();

      await loginPage.enterUsername(loginCredentials.problemUser.username);
      await loginPage.enterPassword(loginCredentials.problemUser.password);
      await loginPage.clickLoginButton();

      await inventoryPage.verifyProductsTitleDisplayed();
      await inventoryPage.verifyInventoryContainerDisplayed();
      await inventoryPage.verifyIfDuplicateProductImages(true);
      await inventoryPage.verifySessionCookieExistsForUser(
        loginCredentials.problemUser.username,
      );

      await inventoryPage.openMenu();
      await menuComponent.clickLogoutLink();

      await loginPage.verifyLoginContainerDisplayed();
      await inventoryPage.verifySessionCookieCleared();
    });

    test("login as performance_glitch_user and verify slow performance behavior", async ({
      loginPage,
      inventoryPage,
      menuComponent,
    }) => {
      await loginPage.goToLoginPage();
      await loginPage.verifyLoginContainerDisplayed();

      await loginPage.enterUsername(
        loginCredentials.performanceGlitchUser.username,
      );
      await loginPage.enterPassword(
        loginCredentials.performanceGlitchUser.password,
      );

      await loginPage.verifyPerformanceIssueBetweenActions(async () => {
        await loginPage.clickLoginButton();
        await inventoryPage.verifyProductsTitleDisplayed();
      }, 5000);

      await inventoryPage.verifyInventoryContainerDisplayed();
      await inventoryPage.verifyIfDuplicateProductImages(false);
      await inventoryPage.verifySessionCookieExistsForUser(
        loginCredentials.performanceGlitchUser.username,
      );

      await inventoryPage.openMenu();
      await menuComponent.clickLogoutLink();

      await loginPage.verifyLoginContainerDisplayed();
      await inventoryPage.verifySessionCookieCleared();
    });

    test.only("login as error_user and verify error behavior", async ({
      loginPage,
      inventoryPage,
      menuComponent,
    }) => {
      const productsDisplayedPerPage = 6;
      await loginPage.goToLoginPage();
      await loginPage.verifyLoginContainerDisplayed();

      await loginPage.enterUsername(loginCredentials.errorUser.username);
      await loginPage.enterPassword(loginCredentials.errorUser.password);
      await loginPage.clickLoginButton();

      await inventoryPage.verifyProductsTitleDisplayed();
      await inventoryPage.verifyInventoryContainerDisplayed();
      await inventoryPage.verifyIfDuplicateProductImages(false);
      await inventoryPage.verifySessionCookieExistsForUser(
        loginCredentials.errorUser.username,
      );

      await inventoryPage.clickAddToCartButtonForAllProducts();
      await inventoryPage.verifyCartBadgeCount(productsDisplayedPerPage, false);
      // add check for console error here once implemented

      await inventoryPage.openMenu();
      await menuComponent.clickLogoutLink();

      await loginPage.verifyLoginContainerDisplayed();
      await inventoryPage.verifySessionCookieCleared();
    });
  });
});
