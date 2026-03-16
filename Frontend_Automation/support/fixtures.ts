import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login";
import { MenuComponent } from "./components/menu";
import { InventoryPage } from "./pages/inventory";
import { CartPage } from "./pages/cart";

interface Pages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  menuComponent: MenuComponent;
  cartPage: CartPage;
}

export const test = base.extend<Pages>({
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
});

export { expect } from "@playwright/test";
