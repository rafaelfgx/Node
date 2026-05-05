import eslint from "@eslint/js";
import eslintTypescript from "typescript-eslint";
import eslintPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
    {
        ignores: ["node_modules", "dist", "coverage", "*.mjs"]
    },
    eslint.configs.recommended,
    ...eslintTypescript.configs.strict,
    eslintPrettier,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.vitest
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        rules: {
            "@typescript-eslint/no-extraneous-class": "off"
        }
    }
];
