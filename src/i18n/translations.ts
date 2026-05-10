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
  "journey:experience-eyebrow": string;
  "journey:experience-title": string;
  "journey:experience-intro": string;
  "journey:education-eyebrow": string;
  "journey:education-title": string;
  "journey:education-intro": string;
  "home:page-title": string;
  "home:greeting": string;
  "home:name": string;
  "home:tagline": string;
  "home:card-location-heading": string;
  "home:location-city": string;
  "home:location-country": string;
  "home:card-languages-heading": string;
  "home:language-english": string;
  "home:language-french": string;
  "home:language-others": string;
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
  "home:contact-divider": string;
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
  "talk:page-title": string;
  "talk:heading": string;
  "talk:intro": string;
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
    "journey:heading-start": "Professional",
    "journey:heading-accent": "Journey",
    "journey:intro": "A focused view of the roles, research environments, and education that shape how I build data products.",
    "journey:experience-eyebrow": "Career",
    "journey:experience-title": "Experience",
    "journey:experience-intro": "From research labs and EU institutions to biotech and independent consulting.",
    "journey:education-eyebrow": "Education",
    "journey:education-title": "Education",
    "journey:education-intro": "Training in life sciences, bioinformatics, and computation.",
    "home:page-title": "Sinclair.Bio",
    "home:greeting": "Hello 👋",
    "home:name": "I'm Lucas Sinclair",
    "home:tagline": "Senior Data Scientist · PhD in Bioinformatics",
    "home:card-location-heading": "Location",
    "home:location-city": "1202, Geneva",
    "home:location-country": "Switzerland",
    "home:card-languages-heading": "Languages",
    "home:language-english": "English: native",
    "home:language-french": "French: native",
    "home:language-others": "Others: German (~B2)",
    "home:card-links-heading": "Links",
    "home:about-heading": "About",
    "home:about-p1": "I've spent the last 15 years leading exciting data-driven projects in life sciences and several other fields, turning complex research into actionable business insights and driving cross-functional collaboration between scientists, clinicians, and senior management.",
    "home:about-p2": "To achieve this, I build innovative digital products. Whether it's a command line tool to automate an analysis pipeline, or a graphical mobile application, I master the full production chain from the initial interface design, all the way through prototyping, development and deployment to cloud servers.",
    "home:about-p3": "I am fluent in most common technologies, and as an EPFL engineer with a PhD, I reason beyond specific brands or flavors of tools: what matters is grasping the theoretical concepts behind computation and fundamental data structures to combine these into efficient and useful products that deliver value.",
    "home:about-p4": "I lead projects end-to-end — scoping requirements with key stakeholders, assembling and mentoring the right team, in order to delivering results that inform strategic decision-makers at the organizational level.",
    "home:about-p5": "I excel at acquiring expertise in new domains very rapidly and am always keen to tackle interesting new challenges.",
    "home:contact-heading": "Get in Touch",
    "home:contact-name": "Your name",
    "home:contact-email": "Your email",
    "home:contact-message": "Your message",
    "home:contact-send": "Send",
    "home:contact-divider": "OR",
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
    "talk:page-title": "Sinclair.Bio | Talk",
    "talk:heading": "Let's talk",
    "talk:intro": "Pick a slot that works for you. We'll have a quick chat to see how I can help — no commitment, no prep needed.",
    "login:client-only": "Accounts are issued to new clients. Registration is not available.",
  },
  fr: {
    "nav:home": "Contact",
    "nav:journey": "Parcours",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Talk",
    "nav:blog": "Blog",
    "footer:copyright": "© 2026 Lucas Sinclair - Tous droits réservés",
    "footer:made-with": "Fait avec",
    "a11y:theme-switcher": "Changer de thème",
    "journey:page-title": "Sinclair.Bio | Parcours",
    "journey:heading-start": "Parcours",
    "journey:heading-accent": "professionnel",
    "journey:intro": "Un aperçu resserré des rôles, des environnements de recherche et du parcours académique qui façonnent ma manière de construire des produits data.",
    "journey:experience-eyebrow": "Carrière",
    "journey:experience-title": "Expérience",
    "journey:experience-intro": "Entre laboratoires de recherche, institutions européennes, biotech et conseil indépendant.",
    "journey:education-eyebrow": "Formation",
    "journey:education-title": "Formation",
    "journey:education-intro": "Une formation en sciences du vivant, bioinformatique et informatique.",
    "home:page-title": "Sinclair.Bio",
    "home:greeting": "Hello 👋",
    "home:name": "Moi c'est Lucas Sinclair",
    "home:tagline": "Senior Data Scientist · PhD en bioinformatique",
    "home:card-location-heading": "Localisation",
    "home:location-city": "1202, Genève",
    "home:location-country": "Suisse",
    "home:card-languages-heading": "Langues",
    "home:language-english": "Anglais: maternelle",
    "home:language-french": "Francais: maternelle",
    "home:language-others": "Autres: allemand (~B2)",
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
    "home:contact-divider": "OU",
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
    "talk:page-title": "Sinclair.Bio | Échange",
    "talk:heading": "Discutons",
    "talk:intro": "Choisissez un créneau qui vous convient. Un échange rapide pour voir comment je peux vous aider — sans engagement, sans préparation.",
    "login:client-only": "Les comptes sont délivrés aux nouveaux clients. L'inscription n'est pas disponible.",
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
