# Astro + Svelte Setup Instructions

Follow these steps to bootstrap an Astro project using Svelte as the component framework.

## 1. Initialize Astro Project

```bash
bun create astro@latest flash-astro
cd flash-astro
```

When prompted:
- Select "Custom" template.
- Enable "Svelte" integration.

## 2. Install Dependencies

```bash
bun install
```

Add Tailwind CSS:

```bash
bun add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.cjs`:

```js
module.exports = {
  content: ['./src/**/*.{astro,html,js,svelte}'],
  theme: { extend: {} },
  plugins: [],
}
```

Create `src/styles/global.css` and import Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import global CSS in `src/pages/_app.astro` or `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
---
<slot />
```

## 3. Copy Static Assets

- Copy `src/assets/` to `public/assets/`.
- Copy `src/QDL/programmer.bin` to `public/qdl/programmer.bin`.
- Copy other static files (icons, images) to `public/`.

## 4. Configure QDL.js

```bash
bun add qdl.js
```

Ensure code references the correct path:

```js
const programmerPath = '/qdl/programmer.bin';
```

## 5. Update Package Scripts

In `package.json`:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "test": "vitest"
}
```

## 6. Set Up CI/CD

- Update GitHub Actions workflows to use `astro build` and deploy `dist/`.
- Ensure environment variables (if any) are passed through.

```yaml
# Example build step
- run: bun install
- run: bun run build # invokes astro build
``` 