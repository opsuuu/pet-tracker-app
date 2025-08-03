import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reacthook from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginRegExp from "eslint-plugin-regexp";
import pluginImportX from "eslint-plugin-import-x";

const shouldTypeCheck =
  typeof process.env.VSCODE_PID === "string" || typeof process.env.CURSOR_TRACE_ID === "string";

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
  },
  eslint.configs.recommended,
  prettierConfig,
  ...tseslint.configs.recommended,
  pluginRegExp.configs["flat/recommended"],
  {
    name: "main",
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
        project: shouldTypeCheck ? ["./tsconfig.json"] : undefined,
      },
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
    plugins: {
      "import-x": pluginImportX,
      react,
      "react-hooks": reacthook,
      prettier,
      tailwindcss: tailwindcss(),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-undef": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      semi: ["error", "always"],
      "linebreak-style": ["error", "unix"],
      // TypeScript 規則
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      // React 規則
      "react/prop-types": "off",
      "react/display-name": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      // Import 規則
      "import-x/no-duplicates": "error",
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false,
        },
      ],
      // Regexp 規則
      "regexp/prefer-regexp-exec": "error",
      "regexp/prefer-regexp-test": "error",
      // in some cases using explicit letter-casing is more performant than the `i` flag
      "regexp/use-ignore-case": "off",
    },
  },
);
