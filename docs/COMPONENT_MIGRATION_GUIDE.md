# Component Migration Guide: React → Svelte

This guide helps convert existing React components in `src/app/` to Svelte components.

## General Rules

- Rename `.jsx` files to `.svelte`.
- Use a `<script>` tag with `export let` to declare props.
- Replace JSX syntax with Svelte templating (`{#if}`, `{#each}`, etc.).
- Use Svelte reactive declarations (`$:`) instead of React hooks for state and side effects.
- Handle events with `on:click`, `on:change`, etc., instead of `onClick`, `onChange`.

## Example Conversion

### React (LinearProgress in Flash.jsx)

```jsx
function LinearProgress({ value, barColor }) {
  return (
    <div className="progress-bar">
      <div style={{ width: `${value}%`, backgroundColor: barColor }} />
    </div>
  );
}
```

### Svelte (LinearProgress.svelte)

```svelte
<script>
  export let value;
  export let barColor;
</script>

<div class="progress-bar">
  <div style="width: {value}%; background-color: {barColor};"></div>
</div>

<style>
  /* Add relevant CSS or Tailwind classes here */
</style>
```

## Component-by-Component Steps

1. Identify component file (`Component.jsx`) in `src/app/`.
2. Create `Component.svelte` in `src/components/`.
3. Copy over markup:
   - Move JSX into the markup section of `.svelte` file.
   - Convert `className` to `class`.
4. Copy over props:
   - Add `export let` declarations for each prop.
5. Convert state/hooks:
   - `useState` → declared variables and reactive `$:` blocks.
   - `useEffect` → `onMount` or reactive statements.
6. Convert event handlers:
   - `<button onClick={...}>` → `<button on:click={...}>`.
7. Adjust imports:
   - `import` other components as `.svelte` files.
8. Test the component in an Astro page or layout.

## Testing

- After migrating each component, run `bun dev` and verify UI behavior.
- Update or add tests in the new environment (e.g., Vitest + @testing-library/svelte).
 