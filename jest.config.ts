import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }] },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
