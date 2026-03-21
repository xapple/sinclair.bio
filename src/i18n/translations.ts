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
  "nav:portfolio": string;
  "nav:talk": string;
  "nav:blog": string;
  "a11y:theme-switcher": string;
  "journey:page-title": string;
  "journey:heading-start": string;
  "journey:heading-accent": string;
  "journey:intro": string;
"home:page-title": string;
  "home:tagline": string;
  "home:location": string;
  "home:cta-journey": string;
  "home:cta-contact": string;
  "home:about-heading": string;
  "home:about-body": string;
  "home:experience-heading": string;
  "home:exp-1-title": string;
  "home:exp-1-company": string;
  "home:exp-1-period": string;
  "home:exp-1-desc": string;
};

export type TranslationKeyType = keyof TranslationKey;

export const translations: { [language in Languages]: TranslationKey } = {
  en: {
    "nav:home": "Contact",
    "nav:journey": "Journey",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Talk",
    "nav:blog": "Blog",
    "a11y:theme-switcher": "Theme switcher",
    "journey:page-title": "Sinclair.Bio | Journey",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "A concise timeline of my professional path, key responsibilities, and delivery impact.",
"home:page-title": "Sinclair.Bio",
    "home:tagline": "Senior Data Scientist · PhD in Bioinformatics · EPFL",
    "home:location": "Geneva, Switzerland · FR & EN native",
    "home:cta-journey": "View my journey",
    "home:cta-contact": "Get in touch",
    "home:about-heading": "About",
    "home:about-body": "I've spent the last 15 years leading data-driven projects in life sciences and several other fields, turning complex research into actionable insights and driving cross-functional collaboration between scientists, clinicians, and senior management. I build digital products end-to-end — from command-line pipelines to graphical mobile applications — mastering the full tool-chain from interface design through prototyping, development, and cloud deployment. As an EPFL engineer with a PhD, I reason beyond specific tools: what matters is grasping the theoretical concepts behind computation and fundamental data structures to combine them into efficient, useful products. I lead projects end-to-end, scoping requirements with key stakeholders, assembling and mentoring the right team, and delivering results that inform strategic decision-makers.",
    "home:experience-heading": "Experience",
    "home:exp-1-title": "Senior Consultant Contractor",
    "home:exp-1-company": "Various missions · Contract",
    "home:exp-1-period": "Mar 2025 – Present · Geneva, Switzerland",
    "home:exp-1-desc": "Developing advanced digital products and solutions for private clients. Specialising in agentic LLMs, project management, and full-stack delivery.",
  },
  fr: {
    "nav:home": "Contact",
    "nav:journey": "Parcours",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Talk",
    "nav:blog": "Blog",
    "a11y:theme-switcher": "Changer de thème",
    "journey:page-title": "Sinclair.Bio | Parcours",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "Un aperçu de mon parcours, des livrables clés et des responsabilités que je prends au quotidien.",
"home:page-title": "Sinclair.Bio",
    "home:tagline": "Data Scientist Senior · Doctorat en bioinformatique · EPFL",
    "home:location": "Genève, Suisse · FR & EN natif",
    "home:cta-journey": "Mon parcours",
    "home:cta-contact": "Me contacter",
    "home:about-heading": "À propos",
    "home:about-body": "J'ai passé les 15 dernières années à piloter des projets fondés sur la donnée dans les sciences du vivant et d'autres domaines, transformant des recherches complexes en insights actionnables et facilitant la collaboration entre scientifiques, cliniciens et direction. Je construis des produits numériques de bout en bout — des pipelines en ligne de commande aux applications mobiles — en maîtrisant toute la chaîne, du design d'interface au déploiement cloud. Ingénieur EPFL avec un doctorat, je raisonne au-delà des outils spécifiques : ce qui compte, c'est la compréhension des concepts fondamentaux du calcul et des structures de données pour les combiner en produits efficaces et utiles. Je dirige les projets de A à Z, en cadrant les besoins avec les parties prenantes, en constituant et accompagnant l'équipe, et en livrant des résultats qui éclairent les décideurs stratégiques.",
    "home:experience-heading": "Expérience",
    "home:exp-1-title": "Consultant Indépendant Senior",
    "home:exp-1-company": "Diverses missions · Contrat",
    "home:exp-1-period": "Mar 2025 – Présent · Genève, Suisse",
    "home:exp-1-desc": "Développement de produits numériques avancés pour des clients privés. Spécialisation en LLMs agentiques, gestion de projet et livraison full-stack.",
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
