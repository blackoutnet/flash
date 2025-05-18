import { defineConfig } from 'astro/config';
import path from 'path';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [tailwind(), svelte({ extensions: ['.svelte'] })],
  outDir: 'dist',
  vite: {
    resolve: {
      alias: [
        { find: /^crc-32$/, replacement: path.resolve('./src/shims/crc32.js') },
        { find: /^xz-decompress$/, replacement: path.resolve('./src/shims/xz-decompress.js') },
      ],
    },
    ssr: {
      // Bundle QDL package during SSR to avoid missing module errors
      noExternal: ['@commaai/qdl', '@commaai/qdl/usblib'],
    },
  },
});
