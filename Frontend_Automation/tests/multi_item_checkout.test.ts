import { test } from "../support/fixtures";
import { loginCredentials } from "../support/loginCredentials";
import { ProductModel } from "../support/models";
import { createCheckOutInformation } from "../support/testDataFactory";

test.describe("Multi Item Checkout - ", () => {
  test("login as standard_user then add multiple items to the cart and checkout", async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    const products: ProductModel[] = [
      {
        code: "sauce-labs-backpack",
        name: "Sauce Labs Backpack",
      },
      {
        code: "sauce-labs-bike-light",
        name: "Sauce Labs Bike Light",
      },
    ];

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

    await inventoryPage.clickAddToCartButtonFor(products);
    await inventoryPage.verifyCartBadgeCount(2, true);
    await inventoryPage.clickCart();

    await cartPage.verifyCartTitleDisplayed();
    await cartPage.verifyCartItemsCount(2);
    await cartPage.verifyCartContainsItem(products);
    await cartPage.clickCheckoutButton();

    await checkoutStepOnePage.verifyCheckoutTitleDisplayed();
    const checkOutInfo = createCheckOutInformation();
    await checkoutStepOnePage.enterFirstName(checkOutInfo.firstName);
    await checkoutStepOnePage.enterLastName(checkOutInfo.lastName);
    await checkoutStepOnePage.enterPostalCode(checkOutInfo.postCode);
    await checkoutStepOnePage.clickContinueButton();

    await checkoutStepTwoPage.verifyCheckoutTitleDisplayed();
    await checkoutStepTwoPage.verifyCartItemsCount(2);
    await checkoutStepTwoPage.verifyCartContainsItem(products);
    // maybe add verify of price + delivery price and total price here as well?
    await checkoutStepTwoPage.clickFinishButton();

    await checkoutCompletePage.verifyCheckoutCompleteTitleDisplayed();
    await checkoutCompletePage.verifyCheckoutCompleteMessageDisplayed();
    await checkoutCompletePage.clickBackHomeButton();

    await inventoryPage.verifyProductsTitleDisplayed();
    await inventoryPage.verifyInventoryContainerDisplayed();
  });
});
