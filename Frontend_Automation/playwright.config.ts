import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env["CI"];
export const baseURL = "https://www.saucedemo.com";

const baseProject = { name: "chromium", use: { ...devices["Desktop Chrome"] } };
const projectsToRun = isCI
  ? [baseProject]
  : [
      baseProject,
      { name: "firefox", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit", use: { ...devices["Desktop Safari"] } },
      { name: "mobile safari (iphone)", use: { ...devices["iPhone 15"] } },
      { name: "mobile safari (ipad)", use: { ...devices["iPad Pro 11"] } },
    ];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 2,
  reporter: [
    ["html", { outputFolder: "html-report", open: isCI ? "never" : "always" }],
  ],
  use: {
    baseURL: baseURL,
    trace: "retain-on-first-failure",
    screenshot: "on-first-failure",
  },
  projects: projectsToRun,
});
