import { expect, type Locator, type Page } from "@playwright/test";
import { selectOption } from "../helpers";
import { ProductSortOption } from "../models";
import { BasePage } from "./base";

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

  async verifyInventoryContainerDisplayed() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  /**
   * Asserts whether duplicate product image `src` values are present on the
   * inventory page. Uses a Set to deduplicate the collected `src` values —
   * if the Set size differs from the total count, duplicates exist.
   *
   * @param exists - Pass `true` to assert duplicates are present (e.g. problem_user),
   *                 or `false` to assert all images are unique (happy path).
   */
  async verifyIfDuplicateProductImages(exists: boolean) {
    const images = await this.page
      .locator("[data-test$='-img']")
      .evaluateAll((imgs: HTMLImageElement[]) =>
        imgs.map((img) => img.getAttribute("src")),
      );
    if (exists) {
      expect(
        new Set(images).size,
        `Expected duplicate product image src(s) but all were unique`,
      ).toBeLessThan(images.length);
    } else {
      expect(new Set(images).size, `Duplicate product image src(s) found`).toBe(
        images.length,
      );
    }
  }

  async clickProductSortDropdownOption(option: ProductSortOption) {
    await selectOption(this.productSortDropdown, ProductSortOption[option]);
  }

  async clickAddToCartButtonFor(productName: string) {
    const addToCartLocator = this.page.locator(
      `[data-test='add-to-cart-${productName}']`,
    );

    await addToCartLocator.click();
  }

  /**
   * Clicks the "Add to cart" button for every product on the inventory page.
   * Captures the initial button count upfront, then clicks `.first()` on each
   * iteration — since each click replaces the button with "Remove", using
   * `.first()` always targets the next remaining button rather than a stale index.
   */
  async clickAddToCartButtonForAllProducts() {
    const addToCartLocator = this.page.locator("[data-test^='add-to-cart-']");
    const count = await addToCartLocator.count();
    for (let i = 0; i < count; i++) {
      await addToCartLocator.first().click();
    }
  }
}
