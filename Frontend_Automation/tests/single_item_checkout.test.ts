import { expect, test } from "../support/fixtures";
import { inventoryPageA11yViolations } from "../support/helpers";
import { loginCredentials } from "../support/loginCredentials";
import { ProductModel } from "../support/models";
import { createCheckOutInformation } from "../support/testDataFactory";

test.describe("Single Item Checkout - ", () => {
  test("login as standard_user then add a single item to the cart and checkout", async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
    makeAxeBuilder,
  }) => {
    let axeResults;
    const products: ProductModel[] = [
      {
        code: "sauce-labs-backpack",
        name: "Sauce Labs Backpack",
        price: 29.99,
      },
    ];

    await loginPage.goToLoginPage();
    await loginPage.verifyLoginContainerDisplayed();

    await loginPage.enterUsername(loginCredentials.standardUser.username);
    await loginPage.enterPassword(loginCredentials.standardUser.password);
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual([]);
    await loginPage.clickLoginButton();

    await inventoryPage.verifyProductsTitleDisplayed();
    await inventoryPage.verifyInventoryContainerDisplayed();
    await inventoryPage.verifyIfDuplicateProductImages(false);
    await inventoryPage.verifySessionCookieExistsForUser(
      loginCredentials.standardUser.username,
    );

    await inventoryPage.clickAddToCartButtonFor(products);
    await inventoryPage.verifyCartBadgeCount(1, true);

    // i would log a tech debt ticket to address the known a11y violations on inventory page
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual(inventoryPageA11yViolations);
    await inventoryPage.clickCart();

    await cartPage.verifyCartTitleDisplayed();
    await cartPage.verifyCartItemsCount(1);
    await cartPage.verifyCartContainsItem(products);
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual([]);
    await cartPage.clickCheckoutButton();

    await checkoutStepOnePage.verifyCheckoutTitleDisplayed();
    const checkOutInfo = createCheckOutInformation();
    await checkoutStepOnePage.enterFirstName(checkOutInfo.firstName);
    await checkoutStepOnePage.enterLastName(checkOutInfo.lastName);
    await checkoutStepOnePage.enterPostalCode(checkOutInfo.postCode);
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual([]);
    await checkoutStepOnePage.clickContinueButton();

    await checkoutStepTwoPage.verifyCheckoutTitleDisplayed();
    await checkoutStepTwoPage.verifyCartItemsCount(1);
    await checkoutStepTwoPage.verifyCartContainsItem(products);
    await checkoutStepTwoPage.verifySubtotal(products);
    await checkoutStepTwoPage.verifyTax(products);
    await checkoutStepTwoPage.verifyTotal(products);
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual([]);
    await checkoutStepTwoPage.clickFinishButton();

    await checkoutCompletePage.verifyCheckoutCompleteTitleDisplayed();
    await checkoutCompletePage.verifyCheckoutCompleteMessageDisplayed();
    axeResults = await makeAxeBuilder().analyze();
    expect(axeResults.violations).toEqual([]);
    await checkoutCompletePage.clickBackHomeButton();

    await inventoryPage.verifyProductsTitleDisplayed();
    await inventoryPage.verifyInventoryContainerDisplayed();
  });
});
