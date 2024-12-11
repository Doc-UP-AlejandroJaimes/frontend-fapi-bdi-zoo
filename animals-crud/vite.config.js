import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist', // Directorio de salida
    emptyOutDir: true, // Limpia el directorio antes de construir
  },
  resolve: {
    alias: {
      '@': '/src', // Configuración opcional para usar '@' como alias a 'src'
    },
  },
});
