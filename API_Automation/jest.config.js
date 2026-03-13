import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: { module: "CommonJS", moduleDetection: "auto" },
}).transform;

/** @type {import("jest").Config} */
const config = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;