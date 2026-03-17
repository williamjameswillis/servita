import { type Locator } from "@playwright/test";

export const taxRate = 0.08;
export const axeTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/** Sums the `price` of each product to produce a subtotal. */
export const calculateSubtotal = (products: { price: number }[]) =>
  products.reduce((total, product) => total + product.price, 0);

export const calculateTax = (amount: number) => {
  return amount * taxRate;
};

export const calculateTotal = (amount: number) => {
  return amount + calculateTax(amount);
};

export const inventoryPageA11yViolations = [
  {
    description: "Ensure select element has an accessible name",
    help: "Select element must have an accessible name",
    helpUrl:
      "https://dequeuniversity.com/rules/axe/4.11/select-name?application=playwright",
    id: "select-name",
    impact: "critical",
    nodes: [
      {
        all: [],
        any: [
          {
            data: null,
            id: "implicit-label",
            impact: "critical",
            message: "Element does not have an implicit (wrapped) <label>",
            relatedNodes: [],
          },
          {
            data: null,
            id: "explicit-label",
            impact: "critical",
            message: "Element does not have an explicit <label>",
            relatedNodes: [],
          },
          {
            data: null,
            id: "aria-label",
            impact: "critical",
            message: "aria-label attribute does not exist or is empty",
            relatedNodes: [],
          },
          {
            data: null,
            id: "aria-labelledby",
            impact: "critical",
            message:
              "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
            relatedNodes: [],
          },
          {
            data: { messageKey: "noAttr" },
            id: "non-empty-title",
            impact: "critical",
            message: "Element has no title attribute",
            relatedNodes: [],
          },
          {
            data: null,
            id: "presentational-role",
            impact: "critical",
            message:
              'Element\'s default semantics were not overridden with role="none" or role="presentation"',
            relatedNodes: [],
          },
        ],
        failureSummary:
          "Fix any of the following:\n" +
          "  Element does not have an implicit (wrapped) <label>\n" +
          "  Element does not have an explicit <label>\n" +
          "  aria-label attribute does not exist or is empty\n" +
          "  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n" +
          "  Element has no title attribute\n" +
          '  Element\'s default semantics were not overridden with role="none" or role="presentation"',
        html: '<select class="product_sort_container" data-test="product-sort-container"><option value="az">Name (A to Z)</option><option value="za">Name (Z to A)</option><option value="lohi">Price (low to high)</option><option value="hilo">Price (high to low)</option></select>',
        impact: "critical",
        none: [],
        target: ["select"],
      },
    ],
    tags: [
      "cat.forms",
      "wcag2a",
      "wcag412",
      "section508",
      "section508.22.n",
      "TTv5",
      "TT5.c",
      "EN-301-549",
      "EN-9.4.1.2",
      "ACT",
      "RGAAv4",
      "RGAA-11.1.1",
    ],
  },
];

export const clickElement = async (locator: Locator) => {
  await locator.click();
};

export const selectOption = async (locator: Locator, option: string) => {
  await locator.selectOption({ label: option });
};

export const fillInput = async (locator: Locator, value: string) => {
  await locator.fill(value);
};
