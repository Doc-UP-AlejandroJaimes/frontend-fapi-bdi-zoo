import preprocess from 'svelte-preprocess';

/** @type {import('svelte').Config} */
const config = {
  preprocess: preprocess(), // Utilizamos la exportación por defecto
};

export default config;
