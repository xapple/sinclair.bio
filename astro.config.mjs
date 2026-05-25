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
      // Root `/` is a noindex redirect to /en/, and all auth pages
      // (/[lang]/login, /[lang]/forgot-password) are marked noindex via
      // AuthLayout — keep them out of the sitemap so the two signals agree.
      filter: (page) =>
        page !== 'https://sinclair.bio/' &&
        !/\/(login|forgot-password)\/?$/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr' },
      },
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
