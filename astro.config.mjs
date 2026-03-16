// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false, // We'll apply manually in global.css
    })
  ],
  vite: {
    ssr: {
      noExternal: ['gsap', 'lenis']
    }
  }
});
