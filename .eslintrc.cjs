/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  ignorePatterns: ["dist", "node_modules"],
};
