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
  "footer:copyright": string;
  "footer:made-with": string;
  "a11y:theme-switcher": string;
  "journey:page-title": string;
  "journey:heading-start": string;
  "journey:heading-accent": string;
  "journey:intro": string;
  "home:page-title": string;
  "home:greeting": string;
  "home:name": string;
  "home:tagline": string;
  "home:card-location-heading": string;
  "home:card-languages-heading": string;
  "home:card-links-heading": string;
  "home:about-heading": string;
  "home:about-p1": string;
  "home:about-p2": string;
  "home:about-p3": string;
  "home:about-p4": string;
  "home:about-p5": string;
  "home:contact-heading": string;
  "home:contact-name": string;
  "home:contact-email": string;
  "home:contact-message": string;
  "home:contact-send": string;
  "home:dm-heading": string;
  "login:page-title": string;
  "login:heading": string;
  "login:intro": string;
  "login:email-label": string;
  "login:email-placeholder": string;
  "login:password-label": string;
  "login:password-placeholder": string;
  "login:remember": string;
  "login:forgot": string;
  "login:notice": string;
  "login:submit": string;
  "login:divider": string;
  "login:google": string;
  "login:github": string;
  "login:client-only": string;
};

export type TranslationKeyType = keyof TranslationKey;

export const translations: { [language in Languages]: TranslationKey } = {
  en: {
    "nav:home": "Contact",
    "nav:journey": "Journey",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Talk",
    "nav:blog": "Blog",
    "footer:copyright": "© 2026 Lucas Sinclair - All rights reserved",
    "footer:made-with": "Made with:",
    "a11y:theme-switcher": "Theme switcher",
    "journey:page-title": "Sinclair.Bio | Journey",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "A concise timeline of my professional path, key responsibilities, and delivery impact.",
    "home:page-title": "Sinclair.Bio",
    "home:greeting": "Hello 👋",
    "home:name": "I'm Lucas Sinclair",
    "home:tagline": "Senior Data Scientist · PhD in Bioinformatics",
    "home:card-location-heading": "Location",
    "home:card-languages-heading": "Languages",
    "home:card-links-heading": "Links",
    "home:about-heading": "About",
    "home:about-p1": "I've spent the last 15 years leading data-driven projects in life sciences and several other fields, turning complex research into actionable insights and driving cross-functional collaboration between scientists, clinicians, and senior management.",
    "home:about-p2": "To do this, I build digital products. Whether it's a command line tool to automate an analysis pipeline, or a graphical mobile application, I master the full tool-chain from the initial interface design, all the way through prototyping, development and deployment to cloud servers.",
    "home:about-p3": "I am fluent in most common technologies, but as an EPFL engineer with a PhD, I reason beyond specific brands or flavors of tools: what matters is grasping the theoretical concepts behind computation and fundamental data structures to combine these into efficient and useful products.",
    "home:about-p4": "I lead projects end-to-end — scoping requirements with key stakeholders, assembling and mentoring the right team, finally delivering results that inform strategic decision-makers at the organizational level.",
    "home:about-p5": "I excel at acquiring expertise in new domains very rapidly and am always keen to tackle interesting new challenges.",
    "home:contact-heading": "Get in Touch",
    "home:contact-name": "Your name",
    "home:contact-email": "Your email",
    "home:contact-message": "Your message",
    "home:contact-send": "Send",
    "home:dm-heading": "Direct Messaging",
    "login:page-title": "Sinclair.Bio | Client Login",
    "login:heading": "Already a client with us?",
    "login:intro": "Log in here to access your private space.",
    "login:email-label": "Email",
    "login:email-placeholder": "name@company.com",
    "login:password-label": "Password",
    "login:password-placeholder": "••••••••••••",
    "login:remember": "Remember me",
    "login:forgot": "Forgot your password?",
    "login:notice": "This portal is not yet active.",
    "login:submit": "Log in",
    "login:divider": "or continue with",
    "login:google": "Google",
    "login:github": "GitHub",
    "login:client-only": "Accounts are issued to new clients. Registration is not available.",
  },
  fr: {
    "nav:home": "Contact",
    "nav:journey": "Parcours",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Talk",
    "nav:blog": "Blog",
    "footer:copyright": "© 2026 Lucas Sinclair - Tous droits reserves",
    "footer:made-with": "Fait avec",
    "a11y:theme-switcher": "Changer de thème",
    "journey:page-title": "Sinclair.Bio | Parcours",
    "journey:heading-start": "Work",
    "journey:heading-accent": "Experience",
    "journey:intro": "Un aperçu de mon parcours, des livrables clés et des responsabilités que je prends au quotidien.",
    "home:page-title": "Sinclair.Bio",
    "home:greeting": "Bonjour 👋",
    "home:name": "Je suis Lucas Sinclair",
    "home:tagline": "Data Scientist Senior · Doctorat en bioinformatique",
    "home:card-location-heading": "Localisation",
    "home:card-languages-heading": "Langues",
    "home:card-links-heading": "Liens",
    "home:about-heading": "À propos",
    "home:about-p1": "J'ai passé les 15 dernières années à piloter des projets fondés sur la donnée dans les sciences du vivant et d'autres domaines, transformant des recherches complexes en insights actionnables et facilitant la collaboration entre scientifiques, cliniciens et direction.",
    "home:about-p2": "Pour cela, je conçois des produits numériques. Qu'il s'agisse d'un outil en ligne de commande pour automatiser un pipeline d'analyse ou d'une application mobile graphique, je maîtrise l'ensemble de la chaîne : du design d'interface initial jusqu'au prototypage, au développement et au déploiement sur serveurs cloud.",
    "home:about-p3": "Je maîtrise la plupart des technologies courantes, mais en tant qu'ingénieur EPFL avec un doctorat, je raisonne au-delà des marques ou outils spécifiques : ce qui compte, c'est la compréhension des concepts théoriques du calcul et des structures de données fondamentales pour les combiner en produits efficaces et utiles.",
    "home:about-p4": "Je pilote les projets de bout en bout — en cadrant les besoins avec les parties prenantes clés, en constituant et accompagnant la bonne équipe, et en livrant des résultats qui éclairent les décideurs stratégiques à l'échelle organisationnelle.",
    "home:about-p5": "J'excelle à acquérir une expertise dans de nouveaux domaines très rapidement et je suis toujours prêt à relever de nouveaux défis intéressants.",
    "home:contact-heading": "Me contacter",
    "home:contact-name": "Votre nom",
    "home:contact-email": "Votre email",
    "home:contact-message": "Votre message",
    "home:contact-send": "Envoyer",
    "home:dm-heading": "Messagerie directe",
    "login:page-title": "Sinclair.Bio | Espace client",
    "login:heading": "Déjà client chez nous ?",
    "login:intro": "Connectez-vous ici pour accéder à votre espace privé.",
    "login:email-label": "Email",
    "login:email-placeholder": "nom@entreprise.com",
    "login:password-label": "Mot de passe",
    "login:password-placeholder": "••••••••••••",
    "login:remember": "Se souvenir de moi",
    "login:forgot": "Mot de passe oublié ?",
    "login:notice": "Ce portail n'est pas encore actif.",
    "login:submit": "Se connecter",
    "login:divider": "ou continuer avec",
    "login:google": "Google",
    "login:github": "GitHub",
    "login:client-only": "Les comptes sont délivrés aux nouveaux clients. L'inscription n'est pas disponible.",
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
