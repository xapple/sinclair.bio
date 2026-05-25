import { Languages, useTranslations, type TranslationKeyType } from './translations';
import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content';

// Standard getStaticPaths body for every [lang]/* route.
export function langStaticPaths() {
  return Object.values(Languages).map((lang) => ({ params: { lang } }));
}

// Extract the language and translator from the current Astro page params.
// Replaces the per-page boilerplate of pulling `lang` from `Astro.params`
// followed by `useTranslations(lang)`. Call sites pass `Astro.params`, which
// inherits the `{ lang: Languages }` type from `langStaticPaths`.
export function usePage(params: { lang: Languages }): {
  lang: Languages;
  t: (key: TranslationKeyType, replace?: string) => string;
} {
  const { lang } = params;
  return { lang, t: useTranslations(lang) };
}

// Fetch a content-collection entry keyed by language.
// Collections under src/content/*/{en,fr}.json have one entry per language,
// so the language code is the entry id.
export async function getLangEntry<C extends CollectionKey>(
  collection: C,
  lang: Languages,
): Promise<CollectionEntry<C>> {
  const entries = await getCollection(collection);
  const entry = entries.find((e) => e.id === lang);
  if (!entry) throw new Error(`No "${collection}" content found for lang: ${lang}`);
  return entry;
}

// Swap the leading /{lang}/ segment of a pathname to the target language.
// Used for hreflang link tags and in-app language switching. With
// prefixDefaultLocale: true, every page lives under /{lang}/...
export function getAlternatePath(
  currentLang: Languages,
  targetLang: Languages,
  pathname: string,
): string {
  return pathname.replace(new RegExp(`^/${currentLang}(/|$)`), `/${targetLang}$1`);
}
