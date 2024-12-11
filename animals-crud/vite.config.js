import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// export default defineConfig({
//   plugins: [svelte()],
// });

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/v1': {
        target: 'https://ljr9in3d88.execute-api.us-east-1.amazonaws.com/Prod/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      },
    },
  },
});