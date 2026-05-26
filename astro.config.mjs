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
  // In production, the Cloudflare Pages Function at functions/index.ts handles
  // `/` with an Accept-Language-aware 302. This static redirect is only served
  // as a fallback (local `astro preview`, or if Functions are disabled).
  redirects: {
    '/': '/en/',
  },
  integrations: [
    sitemap({
      // Root `/` is a noindex redirect to /en/, and all auth pages
      // (/[lang]/login, /[lang]/forgot) are marked noindex via
      // AuthLayout — keep them out of the sitemap so the two signals agree.
      filter: (page) =>
        page !== 'https://sinclair.bio/' &&
        !/\/(login|forgot)\/?$/.test(page),
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
