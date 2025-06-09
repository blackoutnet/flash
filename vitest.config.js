import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        ".astro/**",
        "src/test/**",
        "**/*.test.{js,ts}",
        "**/*.spec.{js,ts}",
        "**/types.{js,ts}",
        "**/*.config.{js,ts}",
        "src/env.d.ts",
        "src/shims/**",
        "src/QDL/**", // External QDL library bindings
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      all: true,
      include: ["src/**/*.{js,ts,svelte}"],
    },
  },
});
