import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      // For GitHub Pages with custom domain, leave base empty
      // For username.github.io/repo-name, set base: '/repo-name'
      base: process.env.BASE_PATH || ''
    },
    alias: {
      $components: 'src/lib/components',
      $lib: 'src/lib'
    },
    prerender: {
      entries: ['*'],
      handleMissingId: 'warn'
    }
  }
};

export default config;
