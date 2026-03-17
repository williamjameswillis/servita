import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login";
import { MenuComponent } from "./components/menu";
import { InventoryPage } from "./pages/inventory";
import { CartPage } from "./pages/cart";
import { CheckoutStepOnePage } from "./pages/checkoutStepOne";
import { CheckoutStepTwoPage } from "./pages/checkoutStepTwo";
import { CheckoutCompletePage } from "./pages/checkoutComplete";
import AxeBuilder from "@axe-core/playwright";
import { axeTags } from "./helpers";

interface AxeFixture {
  makeAxeBuilder: () => AxeBuilder;
}

interface Pages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  menuComponent: MenuComponent;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
}

export const test = base.extend<Pages & AxeFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  menuComponent: async ({ page }, use) => {
    await use(new MenuComponent(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page }).withTags(axeTags);
    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
