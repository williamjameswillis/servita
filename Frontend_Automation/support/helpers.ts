import { type Locator } from "@playwright/test";

export const clickElement = async (locator: Locator) => {
  await locator.click();
};

export const selectOption = async (locator: Locator, option: string) => {
  await locator.selectOption({ label: option });
};

export const fillInput = async (locator: Locator, value: string) => {
  await locator.fill(value);
};
