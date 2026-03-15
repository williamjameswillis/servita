import { expect, type Locator, type Page } from "@playwright/test";
import { selectOption } from "../helpers";
import { ProductSortOption } from "../models";
import { BasePage } from "./basePage";

export class InventoryPage extends BasePage {
  readonly productsTitle: Locator;
  readonly productSortDropdown: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    super(page);

    this.productsTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Products"));
    this.productSortDropdown = page.locator(
      "[data-test='product-sort-container']",
    );
    this.inventoryContainer = page.locator("[data-test='inventory-container']");
  }

  async verifyProductsTitleDisplayed() {
    await expect(this.productsTitle).toBeVisible();
  }

  async clickProductSortDropdownOption(option: ProductSortOption) {
    await selectOption(this.productSortDropdown, ProductSortOption[option]);
  }

  async verifyInventoryContainerDisplayed() {
    await expect(this.inventoryContainer).toBeVisible();
  }
}
