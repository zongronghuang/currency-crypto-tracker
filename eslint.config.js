import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11yLint from "eslint-plugin-jsx-a11y";
import jestDomLint from "eslint-plugin-jest-dom";
import tseslint from "typescript-eslint";
import vitestLint from "eslint-plugin-vitest";
import testingLibraryLint from "eslint-plugin-testing-library";
import tanstackQueryLint from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // 基本規則
  globalIgnores(["dist"]),

  /*
    eslint.config.js 為最新版設定檔，要求只能使用 plugin 的 flat 版本設定!
    
    加入新 plugin，要看是否內部區分一般 configs 或 flat 版的 configs：
    優先使用 flat 版本設定!!
  */
  js.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  jsxA11yLint.flatConfigs.recommended,
  jestDomLint.configs["flat/recommended"],
  vitestLint.configs.recommended,
  testingLibraryLint.configs["flat/react"],
  tanstackQueryLint.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // custom rules to override rule presets
    rules: {
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["closedby"],
        },
      ],
      // TypeScript + Zod is sufficient; no need of PropTypes
      "react/prop-types": "off",

      // Error should be of any type
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
