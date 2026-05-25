// JSON-LD schemas for Layout.astro <head>. Pure data builders — no DOM.

import type { Languages } from "../i18n/translations";
import type { useTranslations } from "../i18n/translations";

type TFn = ReturnType<typeof useTranslations>;

interface SchemaArgs {
  siteUrl: URL;
  ogImageUrl: string;
  lang: Languages;
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
    sameAs: [
      "https://orcid.org/0000-0003-4134-3571",
      "https://github.com/xapple",
      "https://linkedin.com/in/sinclair-bio",
    ],
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
