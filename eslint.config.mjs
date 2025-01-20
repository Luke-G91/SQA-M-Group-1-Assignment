import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser, // Retain browser globals if needed
        ...globals.node, // Add Node.js globals
        ...globals.jest, // Add Jest globals
      },
    },
  },
  pluginJs.configs.recommended,
];

