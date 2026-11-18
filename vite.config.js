import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

const lib = fileURLToPath(new URL('./src/lib', import.meta.url));
const runbookLayout = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '#lib': lib,
    },
  },
  plugins: [
    sveltekit({
      adapter: adapter({
        pages: 'rendered',
        assets: 'rendered',
      }),
      extensions: ['.svelte', '.svx'],
      preprocess: [
        vitePreprocess(),
        mdsvex({
          extensions: ['.svx'],
          layout: {
            runbook: runbookLayout,
          },
        }),
      ],
      prerender: {
        entries: ['/kb'],
      },
    }),
  ],
});
