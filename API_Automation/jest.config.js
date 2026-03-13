import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
const config = {
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        openReport: true,
      },
    ],
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;
