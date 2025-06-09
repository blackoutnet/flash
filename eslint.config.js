import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Global configuration for all files
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        // Browser globals
        console: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        performance: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        AbortController: "readonly",
        ReadableStream: "readonly",
        WritableStream: "readonly",
        TextEncoder: "readonly",
        TextDecoder: "readonly",

        // Node globals
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      // Enforce arrow functions (as per workspace rules) - but as warnings for now
      "prefer-arrow-callback": "warn",
      "func-style": ["warn", "expression", { allowArrowFunctions: true }],

      // Modern JavaScript practices
      "prefer-const": "warn",
      "no-var": "error",
      "prefer-template": "warn",
      "prefer-destructuring": "off", // Too noisy for now

      // Code quality
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "off", // Allow console for now since it's used extensively
      "no-debugger": "error",

      // Import/Export rules
      "no-duplicate-imports": "error",

      // Best practices
      eqeqeq: ["warn", "always"],
      curly: "off", // Too noisy for now
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },

  // TypeScript configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "error",

      // Disable base rule in favor of TypeScript version
      "no-unused-vars": "off",
    },
  },

  // Astro configuration
  ...astro.configs.recommended,

  // Svelte configuration
  ...svelte.configs.recommended,
  {
    files: ["**/*.svelte"],
    rules: {
      // Custom Svelte rules
      "svelte/no-unused-svelte-ignore": "error",
      "svelte/prefer-class-directive": "warn",
      "svelte/prefer-style-directive": "warn",
      "svelte/shorthand-attribute": "warn",
      "svelte/shorthand-directive": "warn",
    },
  },

  // Test files configuration
  {
    files: [
      "**/*.test.{js,ts,svelte}",
      "**/*.spec.{js,ts,svelte}",
      "**/test/**/*.{js,ts}",
    ],
    rules: {
      // More lenient rules for test files
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Configuration files
  {
    files: ["*.config.{js,mjs,ts}", ".*.{js,mjs,ts}"],
    rules: {
      // Allow console in config files
      "no-console": "off",
      // Allow any in config files
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "**/*.d.ts",
      "public/**",
      ".vscode/**",
      ".github/**",
      "docs/**",
    ],
  },
];
