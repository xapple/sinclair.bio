import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LANGUAGE, useTranslations, type Language } from './i18n/translations';

// Populates Astro.locals.lang and Astro.locals.t once per request so .astro
// components don't each have to derive them from the URL. Locale comes from
// Astro.currentLocale (set by the i18n config), falling back to the default
// for routes outside /[lang]/ (only the root redirect, which doesn't read
// locals).
export const onRequest = defineMiddleware((context, next) => {
  const lang = (context.currentLocale ?? DEFAULT_LANGUAGE) as Language;
  context.locals.lang = lang;
  context.locals.t = useTranslations(lang);
  return next();
});
