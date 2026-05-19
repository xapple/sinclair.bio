// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sinclair.bio',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      // Root `/` is a noindex redirect to /en/, so keep it out of the sitemap.
      filter: (page) => page !== 'https://sinclair.bio/',
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
