# Codex Agent Migration Instructions

This file directs Codex agents to automate the migration from React/Vite to Svelte/Astro.

## Workflow

1. Review `MIGRATION_PLAN.md` for an overview of high-level tasks.
2. Execute steps in `ASTRO_SVELTE_SETUP.md` to bootstrap the Astro/Svelte project.
3. Follow `COMPONENT_MIGRATION_GUIDE.md` to convert React components to Svelte.
4. Update utility modules and tests:
   - Adjust imports in `src/utils` for compatibility.
   - Migrate or configure tests for Svelte components.
5. Update `package.json` scripts and dependencies as per setup instructions.
6. Modify CI workflows in `.github/workflows/` to run `astro build` and deploy `dist/`.
7. Validate the project by running:
   ```bash
   bun run dev
   bun run test
   bun run build
   ```
8. Commit changes in logical chunks, referencing the task numbers from `MIGRATION_PLAN.md`.
9. Open a Pull Request for review once migration is complete.

## Agent Responsibilities

- Operate in the project root directory.
- Create, update, or remove files as specified in the migration guides.
- Report any missing dependencies or errors during build/test.
- Ensure that the final project maintains feature parity with the original React version. 