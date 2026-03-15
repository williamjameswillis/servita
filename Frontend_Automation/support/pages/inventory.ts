import { expect, type Locator, type Page } from "@playwright/test";
import { selectOption } from "../helpers";
import { ProductSortOption } from "../models";
import { BasePage } from "./base";

export class InventoryPage extends BasePage {
  readonly productsTitle: Locator;
  readonly productSortDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.productsTitle = page
      .locator("[data-test='title']")
      .and(page.getByText("Products"));
    this.productSortDropdown = page.locator(
      "[data-test='product-sort-container']",
    );
  }

  async verifyProductsTitleDisplayed() {
    await expect(this.productsTitle).toBeVisible();
  }

  async clickProductSortDropdownOption(option: ProductSortOption) {
    await selectOption(this.productSortDropdown, ProductSortOption[option]);
  }
}
