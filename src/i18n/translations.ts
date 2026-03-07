// --- Languages enum for type safety ---
export enum Languages {
  en = "en",
  fr = "fr",
}

export const supportedLanguages = Object.keys(Languages).filter((k) =>
  isNaN(k as any)
);

const defaultLang = Languages.en;

// --- Translation keys (flat, colon-separated, fully typed) ---
type TranslationKey = {
  "nav:home": string;
  "nav:journey": string;
  "nav:projects": string;
  "nav:quote": string;
  "nav:contact": string;
  "a11y:theme-switcher": string;
};

export type TranslationKeyType = keyof TranslationKey;

export const translations: { [language in Languages]: TranslationKey } = {
  en: {
    "nav:home": "Home",
    "nav:journey": "Journey",
    "nav:projects": "Projects",
    "nav:quote": "Quote",
    "nav:contact": "Contact",
    "a11y:theme-switcher": "Theme switcher",
  },
  fr: {
    "nav:home": "Accueil",
    "nav:journey": "Parcours",
    "nav:projects": "Projets",
    "nav:quote": "Citation",
    "nav:contact": "Contact",
    "a11y:theme-switcher": "Changer de thème",
  },
};

/**
 * Curried translation function.
 * Usage: const t = useTranslations(lang); t("nav:home");
 * Supports %s placeholder: t("%s project", "MyProject")
 */
export function useTranslations(
  language: Languages
): (key: TranslationKeyType, replace?: string) => string {
  return function t(key: TranslationKeyType, replace?: string): string {
    let translated = translations[language][key];
    if (replace !== undefined) translated = translated.replace("%s", replace);
    return translated;
  };
}

/**
 * Extract language from the URL pathname.
 * Expects URLs like /en/..., /fr/...
 * Falls back to Languages.en if unrecognized.
 */
export function getLangFromUrl(url: URL): Languages {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return Languages[lang as keyof typeof Languages];
  return defaultLang;
}
