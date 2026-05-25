/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    lang: import('./i18n/translations').Languages;
    t: ReturnType<typeof import('./i18n/translations').useTranslations>;
  }
}
