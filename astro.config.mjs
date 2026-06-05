// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { LANGUAGE_LIST, DEFAULT_LANGUAGE } from './src/i18n/translations';

// Sitemap wants locales as a { code: pathPrefix } map; ours are 1:1.
const sitemapLocales = Object.fromEntries(LANGUAGE_LIST.map((l) => [l, l]));

// https://astro.build/config
export default defineConfig({
  site: 'https://sinclair.bio',
  // Build-time switch for the optional "Personal" section on the portfolio
  // page. Unset (default false) -> the section is dropped at build time, so
  // none of its content reaches dist/. Include it with:
  //   INCLUDE_PERSONAL=true pnpm build
  env: {
    schema: {
      INCLUDE_PERSONAL: envField.boolean({
        context: 'server',
        access: 'public',
        default: false,
      }),
    },
  },
  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: [...LANGUAGE_LIST],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // In production, the Cloudflare Pages Function at functions/index.ts handles
  // `/` with an Accept-Language-aware 302. This static redirect is only served
  // as a fallback (local `astro preview`, or if Functions are disabled).
  redirects: {
    '/': `/${DEFAULT_LANGUAGE}/`,
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
        defaultLocale: DEFAULT_LANGUAGE,
        locales: sitemapLocales,
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
