// SEO/meta computation for Layout.astro's <head>. Pure data — no DOM — mirroring
// the schema.ts split, so the shell frontmatter is one call instead of a dozen
// URL builders. The head markup itself stays inline in Layout.astro.

import {
  LANGUAGES,
  LANGUAGE_LIST,
  DEFAULT_LANGUAGE,
  type Language,
} from "../i18n/translations";
import { getAlternatePath } from "../i18n/page";

interface SeoArgs {
  // Astro.url.pathname for the current page.
  pathname: string;
  // Astro.site (set in astro.config.mjs); falls back to the canonical origin.
  site: URL | undefined;
  lang: Language;
}

// Builds the canonical / hreflang / Open Graph / Twitter URL surface for a page.
// Returns siteUrl + ogImageUrl too, which the JSON-LD schema builders consume.
export function buildSeoMeta({ pathname, site, lang }: SeoArgs) {
  const siteUrl = site ?? new URL("https://sinclair.bio");
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const ogImageUrl = new URL("/og_card.png", siteUrl).toString();
  // Alternate-language URLs for hreflang. Swap the first path segment.
  const alternateLinks = LANGUAGE_LIST.map((l) => ({
    hreflang: l,
    href: new URL(getAlternatePath(lang, l, pathname), siteUrl).toString(),
  }));
  const xDefaultHref = new URL(
    getAlternatePath(lang, DEFAULT_LANGUAGE, pathname),
    siteUrl,
  ).toString();
  const ogLocale = LANGUAGES[lang].ogLocale;
  const ogAlternateLocales = LANGUAGE_LIST.filter((l) => l !== lang).map(
    (l) => LANGUAGES[l].ogLocale,
  );
  return {
    siteUrl,
    canonicalUrl,
    ogImageUrl,
    alternateLinks,
    xDefaultHref,
    ogLocale,
    ogAlternateLocales,
  };
}
