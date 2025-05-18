# Contributor Guide

## Dev Environment Tips
- The project is a Bun-based React/Vite application but falls back to npm if Bun is unavailable.
- Dependencies and scripts are declared in `package.json`.
- Static assets and the QDL programmer binary will be served from `public/` after setup.

## Testing Instructions
- To run all unit tests:
  ```bash
  bun run test
  ```
- Tests use Vitest and are located under `src/`.

## Build Instructions
- To build for production:
  ```bash
  bun run build
  ```
- The output is generated in the `dist/` directory.

## Preview Server
- To preview the production build locally:
  ```bash
  bun run start
    # or
  bun run start
  ```

## CI/CD
- Continuous Integration is defined in `.github/workflows/main.yaml`.
- Deployment to GitHub Pages is defined in `.github/workflows/deploy.yml`.

## Code Structure
- `src/app/`: React components and entrypoint (`index.jsx`, `Flash.jsx`).
- `src/utils/`: Core logic modules (`manifest.js`, `image.js`, `manager.js`, etc.).
- `src/QDL/`: QDL.js bindings and `programmer.bin`.
- `public/`: Static assets and programmer binary (populated by setup script).

## Pull Request Guidelines
- Branch naming: `feat/<description>`, `fix/<description>`.
- PR title format: `[flash] <Short Description>`.
- Ensure tests pass and CI is green before merging.

## Documentation

All detailed guides and plans for this repository are in the `docs/` directory:

- `docs/PROJECT_OVERVIEW.md`: Project overview and architecture.
- `docs/MIGRATION_PLAN.md`: High-level migration tasks to transition from React/Vite to Svelte/Astro.
- `docs/ASTRO_SVELTE_SETUP.md`: Step-by-step instructions to bootstrap Astro with Svelte and Tailwind CSS.
- `docs/COMPONENT_MIGRATION_GUIDE.md`: Guidelines for converting React components to Svelte.
- `docs/CODEX_AGENT_INSTRUCTIONS.md`: Specific instructions for Codex agents to automate the migration.

Please consult these files before proceeding with any migration or setup tasks. 