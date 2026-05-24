// --- Languages enum for type safety ---
export enum Languages {
  en = "en",
  fr = "fr",
}

const defaultLang = Languages.en;

// --- Translation keys (flat, colon-separated, fully typed) ---
type TranslationKey = {
  "nav:contact": string;
  "nav:journey": string;
  "nav:portfolio": string;
  "nav:talk": string;
  "footer:copyright": string;
  "footer:made-with": string;
  "a11y:theme-switcher": string;
  "a11y:home": string;
  "a11y:login": string;
  "a11y:toggle-menu": string;
  "a11y:select-language": string;
  "a11y:ai": string;
  "a11y:love": string;
  "journey:page-title": string;
  "journey:intro": string;
  "journey:experience-eyebrow": string;
  "journey:education-eyebrow": string;
  "journey:certifications-eyebrow": string;
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
  "home:contact-sending": string;
  "home:contact-sent": string;
  "home:contact-error": string;
  "home:contact-error-generic": string;
  "home:contact-divider": string;
  "home:dm-heading": string;
  "home:meeting-heading": string;
  "home:meeting-body": string;
  "login:page-title": string;
  "login:heading": string;
  "login:intro": string;
  "login:email-label": string;
  "login:email-placeholder": string;
  "login:password-label": string;
  "login:password-placeholder": string;
  "login:remember": string;
  "login:forgot": string;
  "login:submit": string;
  "login:client-only": string;
  "talk:page-title": string;
  "talk:heading": string;
  "talk:intro": string;
  "portfolio:page-title": string;
  "portfolio:open-source-heading": string;
  "portfolio:testimonials-heading": string;
  "portfolio:publications-heading": string;
  "portfolio:classes-heading": string;
  "portfolio:orcid-link": string;
  "portfolio:testimonial-translation-note": string;
  "meta:site-description": string;
  "meta:home-description": string;
  "meta:portfolio-description": string;
  "meta:talk-description": string;
  "meta:login-description": string;
};

export type TranslationKeyType = keyof TranslationKey;

export const translations: { [language in Languages]: TranslationKey } = {
  en: {
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
    "home:about-p4": "I lead projects end-to-end — scoping requirements with key stakeholders, assembling and mentoring the right team, in order to deliver results that inform strategic decision-makers at the organizational level.",
    "home:about-p5": "I excel at acquiring expertise in novel domains very rapidly and am always keen to tackle interesting new challenges.",
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
    "login:password-placeholder": "••••••••••••",
    "login:remember": "Remember me",
    "login:forgot": "Forgot your password?",
    "login:submit": "Log in",
    "login:client-only": "Accounts are issued to new clients. Registration is not available.",
    "talk:page-title": "Sinclair.Bio | Talk",
    "talk:heading": "Let's talk",
    "talk:intro": "Pick a slot that works for you. We'll have a quick chat to see how I can help — no commitment, no prep needed.",
    "portfolio:page-title": "Sinclair.Bio | Portfolio",
    "portfolio:open-source-heading": "Selected Open Source Projects",
    "portfolio:testimonials-heading": "Testimonials",
    "portfolio:publications-heading": "Selected Publications",
    "portfolio:classes-heading": "Selected Coursework",
    "portfolio:orcid-link": "More on ORCID",
    "portfolio:testimonial-translation-note": "(translated from French)",
    "meta:site-description": "Lucas Sinclair — Senior Data Scientist & PhD in Bioinformatics. 15+ years turning life-sciences research into data products: pipelines, web apps, and decision-grade analytics.",
    "meta:home-description": "Personal site of Lucas Sinclair, Senior Data Scientist and PhD in Bioinformatics based in Geneva. Independent consulting for life sciences and beyond.",
    "meta:portfolio-description": "Selected open-source projects, peer-reviewed publications, client testimonials and coursework by Lucas Sinclair.",
    "meta:talk-description": "Book a short call with Lucas Sinclair to discuss your data-science, bioinformatics, or software project — no commitment.",
    "meta:login-description": "Client login portal for Sinclair.Bio.",
  },
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
    "home:about-p1": "J'ai passé les 15 dernières années à piloter des projets axés sur les data dans les sciences de la vie ainsi que dans plusieurs autres domaines, transformant des travaux de recherche complexes en informations exploitables pour l’entreprise, tout en favorisant la collaboration transverse entre scientifiques, cliniciens et membres de la direction.",
    "home:about-p2": "Dans cet objectif, je conçois des produits numériques innovants. Qu’il s’agisse d’un outil en ligne de commande pour automatiser un pipeline d’analyse ou d’une application mobile dotée d’une interface graphique, je maîtrise l’ensemble de la chaîne de production, de la conception initiale de l’interface au prototypage, puis au développement et au déploiement sur des serveurs cloud.",
    "home:about-p3": "Je maîtrise la plupart des technologies courantes mais, en tant qu’ingénieur EPFL titulaire d’un doctorat, j’aborde les outils au-delà de leurs spécificités. Pour moi, l’essentiel est de comprendre les concepts théoriques computationnels et les structures de données fondamentales, afin de les combiner en solutions adaptées, efficaces et créatrices de valeur.",
    "home:about-p4": "Je mène des projets de bout en bout — en commençant par la définition des besoins avec les parties prenantes, puis en constituant et accompagnant la bonne équipe, et finalement en livrant des résultats qui éclairent les décideurs stratégiques à l'échelle organisationnelle.",
    "home:about-p5": "J’excelle dans l’acquisition rapide d’expertise dans de nouveaux domaines et je suis toujours enthousiaste à l’idée de relever des défis stimulants.",
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
    "login:password-placeholder": "••••••••••••",
    "login:remember": "Se souvenir de moi",
    "login:forgot": "Mot de passe oublié ?",
    "login:submit": "Se connecter",
    "login:client-only": "Les comptes sont délivrés aux nouveaux clients. L'inscription n'est pas disponible.",
    "talk:page-title": "Sinclair.Bio | Échange",
    "talk:heading": "Discutons",
    "talk:intro": "Choisissez un créneau qui vous convient. Un échange rapide pour voir comment je peux vous aider — sans engagement, sans préparation nécessaire.",
    "portfolio:page-title": "Sinclair.Bio | Portfolio",
    "portfolio:open-source-heading": "Sélection de projets open source",
    "portfolio:testimonials-heading": "Témoignages",
    "portfolio:publications-heading": "Sélection de publications",
    "portfolio:classes-heading": "Sélection de cours suivis",
    "portfolio:orcid-link": "Plus sur ORCID",
    "portfolio:testimonial-translation-note": "(traduit de l'anglais)",
    "meta:site-description": "Lucas Sinclair — Data Scientist Senior, PhD en bioinformatique. Plus de 15 ans à transformer la recherche en sciences de la vie en produits data : pipelines, applications web et analyses décisionnelles.",
    "meta:home-description": "Site personnel de Lucas Sinclair, Data Scientist Senior et docteur en bioinformatique basé à Genève. Conseil indépendant pour les sciences de la vie et d'autres domaines.",
    "meta:portfolio-description": "Sélection de projets open source, publications scientifiques, témoignages clients et formations de Lucas Sinclair.",
    "meta:talk-description": "Réservez un échange rapide avec Lucas Sinclair pour discuter de votre projet en data science, bioinformatique ou développement logiciel — sans engagement.",
    "meta:login-description": "Portail de connexion client pour Sinclair.Bio.",
  },
};

/**
 * Curried translation function.
 * Usage: const t = useTranslations(lang); t("nav:contact");
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
