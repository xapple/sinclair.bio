// --- Languages enum for type safety ---
export enum Languages {
  en = "en",
  fr = "fr",
}

const defaultLang = Languages.en;

// --- English translations (source of truth for the key set) ---
const en = {
  "nav:contact": "Contact",
  "nav:journey": "Journey",
  "nav:portfolio": "Portfolio",
  "nav:talk": "Talk",
  "footer:copyright": "© %s Lucas Sinclair - All rights reserved",
  "footer:made-with": "Made with:",
  "a11y:theme-switcher": "Theme switcher",
  "a11y:home": "Home",
  "a11y:login": "Login",
  "a11y:toggle-menu": "Toggle navigation menu",
  "a11y:select-language": "Select language",
  "a11y:ai": "AI",
  "a11y:love": "love",
  "journey:page-title": "Sinclair.Bio | Journey",
  "journey:intro": "A focused view of the roles, research environments, and education that shape how I build data products.",
  "journey:experience-eyebrow": "Experience",
  "journey:education-eyebrow": "Education",
  "journey:certifications-eyebrow": "Certifications",
  "home:page-title": "Sinclair.Bio",
  "home:greeting": "Hello 👋",
  "home:name": "I'm Lucas Sinclair",
  "home:tagline": "Senior Data Scientist · PhD in Bioinformatics",
  "home:card-location-heading": "Location",
  "home:location-city": "1202, Geneva",
  "home:location-country": "Switzerland",
  "home:card-languages-heading": "Languages",
  "home:language-english": "English: native",
  "home:language-french": "French: native",
  "home:language-others": "Others: German (~B2)",
  "home:card-links-heading": "Links",
  "home:about-heading": "About",
  "home:contact-heading": "Get in Touch",
  "home:contact-name": "Your name",
  "home:contact-email": "Your email",
  "home:contact-message": "Your message",
  "home:contact-send": "Send",
  "home:contact-sending": "Sending...",
  "home:contact-sent": "✓ Message sent!",
  "home:contact-error": "Error: %s",
  "home:contact-error-generic": "Something went wrong. Please try again.",
  "home:contact-divider": "OR",
  "home:dm-heading": "Direct Messaging",
  "home:meeting-heading": "Short Meeting",
  "home:meeting-body": "Schedule a quick talk",
  "login:page-title": "Sinclair.Bio | Client Login",
  "login:heading": "Already a client with us?",
  "login:intro": "Log in here to access your private space.",
  "login:email-label": "Email",
  "login:email-placeholder": "name@company.com",
  "login:password-label": "Password",
  "login:password-placeholder": "",
  "login:remember": "Remember me",
  "login:forgot": "Forgot your password?",
  "login:submit": "Log in",
  "login:client-only": "Accounts are issued to new clients. Registration is not available.",
  "forgot:page-title": "Sinclair.Bio | Reset Password",
  "forgot:heading": "Forgot your password?",
  "forgot:intro": "Enter the email tied to your account and we'll send you a reset link.",
  "forgot:email-label": "Email",
  "forgot:email-placeholder": "name@company.com",
  "forgot:submit": "Send reset link",
  "forgot:back-to-login": "Back to login",
  "meta:forgot-description": "Request a password reset for your Sinclair.Bio client account.",
  "talk:page-title": "Sinclair.Bio | Talk",
  "talk:heading": "Let's talk",
  "talk:intro": "Pick a slot that works for you. We'll have a quick chat to see how I can help — no commitment, no prep needed.",
  "portfolio:page-title": "Sinclair.Bio | Portfolio",
  "portfolio:open-source-heading": "Selected Open Source Projects",
  "portfolio:testimonials-heading": "Testimonials",
  "portfolio:publications-heading": "Selected Publications",
  "portfolio:classes-heading": "Selected Coursework",
  "portfolio:github-link": "More on GitHub",
  "portfolio:orcid-link": "More on ORCID",
  "portfolio:testimonial-translation-note": "(translated from French)",
  "meta:site-description": "Lucas Sinclair — Senior Data Scientist & PhD in Bioinformatics. 15+ years turning life-sciences research into data products: pipelines, web apps, and decision-grade analytics.",
  "meta:home-description": "Personal site of Lucas Sinclair, Senior Data Scientist and PhD in Bioinformatics based in Geneva. Independent consulting for life sciences and beyond.",
  "meta:portfolio-description": "Selected open-source projects, peer-reviewed publications, client testimonials and coursework by Lucas Sinclair.",
  "meta:talk-description": "Book a short call with Lucas Sinclair to discuss your data-science, bioinformatics, or software project — no commitment.",
  "meta:login-description": "Client login portal for Sinclair.Bio.",
} as const;

export type TranslationKeyType = keyof typeof en;

export const translations = {
  en,
  fr: {
    "nav:contact": "Contact",
    "nav:journey": "Parcours",
    "nav:portfolio": "Portfolio",
    "nav:talk": "Discuter",
    "footer:copyright": "© %s Lucas Sinclair - Tous droits réservés",
    "footer:made-with": "Fait avec",
    "a11y:theme-switcher": "Changer de thème",
    "a11y:home": "Accueil",
    "a11y:login": "Espace client",
    "a11y:toggle-menu": "Ouvrir le menu de navigation",
    "a11y:select-language": "Choisir la langue",
    "a11y:ai": "IA",
    "a11y:love": "amour",
    "journey:page-title": "Sinclair.Bio | Parcours",
    "journey:intro": "Un aperçu resserré des rôles, des environnements de recherche et du parcours académique qui façonnent ma manière de construire des produits data.",
    "journey:experience-eyebrow": "Expérience",
    "journey:education-eyebrow": "Education",
    "journey:certifications-eyebrow": "Certifications",
    "home:page-title": "Sinclair.Bio",
    "home:greeting": "Bonjour 👋",
    "home:name": "Je suis Lucas Sinclair",
    "home:tagline": "Data Scientist Senior · PhD en bioinformatique",
    "home:card-location-heading": "Localisation",
    "home:location-city": "1202, Genève",
    "home:location-country": "Suisse",
    "home:card-languages-heading": "Langues",
    "home:language-english": "Anglais: maternelle",
    "home:language-french": "Français: maternelle",
    "home:language-others": "Autres: allemand (~B2)",
    "home:card-links-heading": "Liens",
    "home:about-heading": "À propos",
    "home:contact-heading": "Me contacter",
    "home:contact-name": "Votre nom",
    "home:contact-email": "Votre email",
    "home:contact-message": "Votre message",
    "home:contact-send": "Envoyer",
    "home:contact-sending": "Envoi en cours...",
    "home:contact-sent": "✓ Message envoyé !",
    "home:contact-error": "Erreur : %s",
    "home:contact-error-generic": "Une erreur est survenue. Veuillez réessayer.",
    "home:contact-divider": "OU",
    "home:dm-heading": "Messagerie directe",
    "home:meeting-heading": "De vive voix",
    "home:meeting-body": "Planifier un échange rapide",
    "login:page-title": "Sinclair.Bio | Espace client",
    "login:heading": "Déjà client chez nous ?",
    "login:intro": "Connectez-vous ici pour accéder à votre espace privé.",
    "login:email-label": "Email",
    "login:email-placeholder": "nom@entreprise.com",
    "login:password-label": "Mot de passe",
    "login:password-placeholder": "",
    "login:remember": "Se souvenir de moi",
    "login:forgot": "Mot de passe oublié ?",
    "login:submit": "Se connecter",
    "login:client-only": "Les comptes sont délivrés aux nouveaux clients. L'inscription n'est pas disponible.",
    "forgot:page-title": "Sinclair.Bio | Réinitialisation du mot de passe",
    "forgot:heading": "Mot de passe oublié ?",
    "forgot:intro": "Entrez l'email associé à votre compte et nous vous enverrons un lien de réinitialisation.",
    "forgot:email-label": "Email",
    "forgot:email-placeholder": "nom@entreprise.com",
    "forgot:submit": "Envoyer le lien",
    "forgot:back-to-login": "Retour à la connexion",
    "meta:forgot-description": "Demander la réinitialisation du mot de passe de votre compte client Sinclair.Bio.",
    "talk:page-title": "Sinclair.Bio | Échange",
    "talk:heading": "Discutons",
    "talk:intro": "Choisissez un créneau qui vous convient. Un échange rapide pour voir comment je peux vous aider — sans engagement, sans préparation nécessaire.",
    "portfolio:page-title": "Sinclair.Bio | Portfolio",
    "portfolio:open-source-heading": "Sélection de projets open source",
    "portfolio:testimonials-heading": "Témoignages",
    "portfolio:publications-heading": "Sélection de publications",
    "portfolio:classes-heading": "Sélection de cours suivis",
    "portfolio:github-link": "Plus sur GitHub",
    "portfolio:orcid-link": "Plus sur ORCID",
    "portfolio:testimonial-translation-note": "(traduit de l'anglais)",
    "meta:site-description": "Lucas Sinclair — Data Scientist Senior, PhD en bioinformatique. Plus de 15 ans à transformer la recherche en sciences de la vie en produits data : pipelines, applications web et analyses décisionnelles.",
    "meta:home-description": "Site personnel de Lucas Sinclair, Data Scientist Senior et docteur en bioinformatique basé à Genève. Conseil indépendant pour les sciences de la vie et d'autres domaines.",
    "meta:portfolio-description": "Sélection de projets open source, publications scientifiques, témoignages clients et formations de Lucas Sinclair.",
    "meta:talk-description": "Réservez un échange rapide avec Lucas Sinclair pour discuter de votre projet en data science, bioinformatique ou développement logiciel — sans engagement.",
    "meta:login-description": "Portail de connexion client pour Sinclair.Bio.",
  },
} as const satisfies Record<Languages, Record<TranslationKeyType, string>>;

/**
 * Curried translation function.
 * Usage: const t = useTranslations(lang); t("nav:contact");
 * Supports %s placeholder: t("%s project", "MyProject")
 */
export function useTranslations(
  language: Languages
): (key: TranslationKeyType, replace?: string) => string {
  return function t(key: TranslationKeyType, replace?: string): string {
    let translated: string = translations[language][key];
    if (replace !== undefined) translated = translated.replace("%s", replace);
    return translated;
  };
}

const LANGUAGE_VALUES = new Set<string>(Object.values(Languages));

/**
 * Extract language from the URL pathname.
 * Expects URLs like /en/..., /fr/...
 * Falls back to Languages.en if unrecognized.
 */
export function getLangFromUrl(url: URL): Languages {
  const [, segment] = url.pathname.split("/");
  return LANGUAGE_VALUES.has(segment) ? (segment as Languages) : defaultLang;
}
