import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login";
import { MenuComponent } from "./components/menu";
import { InventoryPage } from "./pages/inventory";

interface Pages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  menuComponent: MenuComponent;
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
});

export { expect } from "@playwright/test";
