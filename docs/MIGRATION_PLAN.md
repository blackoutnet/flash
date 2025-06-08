# Migration Plan: React/Vite → Svelte/Astro

## Goal
Migrate the existing Flash project from a React/Vite setup to an Astro project using the Svelte framework, while preserving functionality and CI/CD.

## High-Level Tasks

1. Initialize a new Astro project with Svelte integration.
2. Install and configure Tailwind CSS in the Astro project.
3. Migrate static assets and public files (`assets/`, `programmer.bin`, icons).
4. Convert `index.html` to an Astro page (`src/pages/index.astro`).
5. Convert React components in `src/app/*.jsx` to Svelte components and integrate them into Astro.
6. Update utility modules (`src/utils`) for compatibility (adjust imports, ensure browser API support).
7. Integrate QDL.js and ensure the `programmer.bin` file is served correctly.
8. Update `package.json` scripts to use Astro commands (`dev`, `build`, `preview`).
9. Adapt tests for the new environment (e.g., Vitest with Svelte support).
10. Adjust CI workflows (`.github/workflows`) to build and deploy the Astro site.
11. Remove obsolete Vite-specific files (`vite.config.js`, outdated `index.html`).
12. Validate functionality manually and via automated tests.
13. Update documentation (`README.md`, `PROJECT_OVERVIEW.md`) to reflect the new stack.

## Deliverables

- A functional Astro/Svelte project with feature parity.
- Updated CI/CD pipeline for build and deployment.
- Revised documentation detailing the new setup. 