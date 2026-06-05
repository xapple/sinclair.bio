// JSON-LD schemas for Layout.astro <head>. Pure data builders — no DOM.

import type { Language, useTranslations } from "../i18n/translations";
import { PROFILES } from "../data/profile";

type TFn = ReturnType<typeof useTranslations>;

interface SchemaArgs {
  siteUrl: URL;
  ogImageUrl: string;
  lang: Language;
  t: TFn;
}

export function buildPersonSchema({ siteUrl, ogImageUrl, t }: SchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lucas Sinclair",
    url: siteUrl.toString(),
    image: ogImageUrl,
    jobTitle: "Senior Data Scientist",
    description: t("meta:site-description"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geneva",
      addressCountry: "CH",
    },
    sameAs: [PROFILES.orcid, PROFILES.github, PROFILES.linkedin],
  };
}

export function buildWebsiteSchema({ siteUrl, lang }: SchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sinclair.Bio",
    url: siteUrl.toString(),
    inLanguage: lang,
  };
}
