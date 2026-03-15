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
  "journey:page-title": string;
  "journey:heading-start": string;
  "journey:heading-accent": string;
  "journey:intro": string;
  "cv:experience-heading": string;
  "cv:print-button": string;
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
    "journey:page-title": "Sinclair | Journey",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "A concise timeline of my professional path, key responsibilities, and delivery impact.",
    "cv:experience-heading": "Work Experience",
    "cv:print-button": "Print / Save as PDF",
  },
  fr: {
    "nav:home": "Accueil",
    "nav:journey": "Parcours",
    "nav:projects": "Projets",
    "nav:quote": "Citation",
    "nav:contact": "Contact",
    "a11y:theme-switcher": "Changer de thème",
    "journey:page-title": "Sinclair | Parcours",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "Un aperçu de mon parcours, des livrables clés et des responsabilités que je prends au quotidien.",
    "cv:experience-heading": "Expérience professionnelle",
    "cv:print-button": "Imprimer / Enregistrer en PDF",
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
