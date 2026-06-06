# www.sinclair

Personal portfolio site at sinclair.bio.

## Stack

- **Astro 6** (static site generator) + `@astrojs/sitemap` integration
- **Tailwind CSS v4** via `@tailwindcss/vite` Vite plugin
- **Web Animations API** for theme toggle animation
- **sharp** for build-time image optimization
- **TypeScript** (strict mode)
- **pnpm** package manager
- **Cloudflare Pages** host — root `/` redirect runs as a Pages Function (see `functions/`)

## Commands

- `pnpm dev` — dev server on port 4321
- `pnpm check` — `astro check` (type-check)
- `pnpm build` — `astro check && astro build` to `dist/` (then strips `.DS_Store`)
- `pnpm preview` — preview production build

## Project Structure

```
src/
├── assets/
│   ├── icons/               # Inline SVGs + index.ts registry; reference by basename via <Icon name="…" />
│   ├── profile.webp         # Hero portrait
│   ├── logo-name.svg        # "Sinclair" wordmark SVG (fill="currentColor"; inlined via ?raw)
│   └── theme-switcher.svg   # Pill-shaped toggle SVG
├── components/
│   ├── Callout.astro            # "More on X →" / stat callout (portfolio sections)
│   ├── Footer.astro             # Site footer
│   ├── GridDecoration.astro     # Decorative top-right grid
│   ├── Icon.astro               # <Icon name="…" size="xs|sm|md|lg" />
│   ├── InfoCard.astro           # Reusable card (optional href makes it a link)
│   ├── Reveal.astro             # Fade-up entrance wrapper (.page-reveal keyframe)
│   ├── SectionHeading.astro     # <h2> with leading icon + text
│   ├── Topbar.astro             # Sticky topbar: logo | nav | widgets + hamburger
│   ├── home/
│   │   ├── HeroSection.astro        # Greeting + portrait + tagline
│   │   ├── InfoCardsSection.astro   # Location / Languages / Links cards
│   │   ├── AboutSection.astro       # Prose from content/home/{lang}.md
│   │   └── ContactSection.astro     # Contact form + DM info + meeting card
│   ├── journey/
│   │   └── TimelineEntry.astro      # Shared timeline-row primitive (page maps fields onto it)
│   └── topbar/
│       ├── LanguageSwitcher.astro   # EN/FR pill with hreflang SEO links
│       ├── Logo.astro               # SVG logo + "Sinclair" wordmark
│       ├── NavLinks.astro           # Contact, Journey, Portfolio, Talk
│       └── ThemeToggle.astro        # Animated dark/light pill toggle (WAAPI)
├── content/                  # Astro content collections (per-lang)
│   ├── home/{en,fr}.md           # About prose (markdown body)
│   ├── journey/{en,fr}.json      # Experience / education / certifications
│   └── portfolio/{en,fr}.json    # Testimonials / publications / classes
├── content.config.ts         # Zod schemas for the collections above
├── data/
│   └── profile.ts            # Canonical profile URLs + social/DM channels (single source)
├── env.d.ts                  # Ambient App.Locals declaration (lang, t)
├── i18n/
│   ├── page.ts              # langStaticPaths(), getLangEntry(), getAlternatePath()
│   └── translations.ts      # LANGUAGES map + Language type, useTranslations()
├── layouts/
│   ├── AuthLayout.astro     # Centered card layout for login / forgot
│   └── Layout.astro         # HTML shell — meta, theme bootstrap, topbar, footer, frame
├── lib/
│   └── schema.ts            # JSON-LD builders (Person, WebSite) for SEO
├── middleware.ts            # Populates Astro.locals.lang + Astro.locals.t per request
├── pages/
│   └── [lang]/              # Dynamic routes — getStaticPaths over LANGUAGE_LIST
│       ├── forgot.astro
│       ├── index.astro
│       ├── journey.astro
│       ├── login.astro
│       ├── portfolio.astro
│       └── talk.astro
├── scripts/
│   ├── async-form.ts        # Shared async form-submit lifecycle (button state + status)
│   ├── auth-form.ts         # Login / forgot form wiring (delegates to async-form)
│   ├── cal-embed.ts         # Cal.com inline embed (mount + theme remount)
│   ├── contact-form.ts      # Home page contact form (delegates to async-form)
│   ├── lang-dropdown.ts     # Mobile language-switcher dropdown
│   ├── mobile-menu.ts       # Topbar hamburger toggle
│   ├── theme-bootstrap.js   # Blocking pre-CSS theme init (imported as ?raw)
│   └── theme-switcher.ts    # setTheme() + initThemeToggles() with WAAPI
└── styles/
    └── global.css           # Tailwind import, design tokens, dark variant, FOUC guard
```

Top-level dirs outside `src/`:

```
functions/index.ts           # Cloudflare Pages Function: Accept-Language-aware 302 on `/`
tests/                       # Python locale-redirect test (pytest)
docs/                        # TEMPLATES.md, mockup.pages, make-forest-puller-card.cjs
```

## Key Patterns

### i18n
- **Two languages**: English (default), French.
- **Routing**: `prefixDefaultLocale: true` — EN at `/en/`, FR at `/fr/`. In production the Cloudflare Pages Function at `functions/index.ts` handles `/` with an `Accept-Language`-aware 302; the static `'/' → '/en/'` redirect in `astro.config.mjs` is only a fallback (local `astro preview`, or if Functions are disabled).
- **Dynamic routes**: every page under `src/pages/[lang]/` uses `export const getStaticPaths = langStaticPaths` from `i18n/page.ts` — no duplication per locale.
- **Lang + translator on every page/component**: `src/middleware.ts` reads `Astro.currentLocale` once per request and populates `Astro.locals.lang` and `Astro.locals.t`. Pages and components just destructure: `const { lang, t } = Astro.locals` — no per-file `usePage`/`usePageFromUrl` helpers. The shape is typed via `App.Locals` in `src/env.d.ts`.
- **Translations**: `useTranslations(lang)` returns a curried `t(key)` function. Flat colon-separated keys (`"nav:contact"`), fully typed. Supports `%s` placeholder replacement.
- **Adding a language**: add an entry to the `LANGUAGES` map in `translations.ts` + a translations block — routes generate automatically.

### Content collections
- Three collections, one entry per language: `journey` and `portfolio` are JSON (structured data); `home` is markdown (prose body for the About section).
- Schemas live in `src/content.config.ts` (Zod).
- JSON collections load via `await getLangEntry('journey', lang)` (from `i18n/page.ts`) — the helper finds the entry whose id matches the lang.
- Markdown collections (`home`) use the same `getLangEntry` plus Astro's `render()` to produce a `<Content />` component — see `AboutSection.astro`.

### Layouts
- **`Layout.astro`** is the only HTML shell. It takes a `frame` prop that controls the slot wrapper:
  - `frame="standard"` (default) — wraps the slot in `.page-frame` + `.page-shell` (a width-constrained content column). Used by every content page. Each page can override the column width via `shellWidth="1100px"`; the home page passes `shellWidth="48rem"`.
  - `frame="centered"` — flex-centers a narrow card column. Used by auth pages via `AuthLayout`.
- **`AuthLayout.astro`** wraps `Layout` with `frame="centered"` and provides the shared card chrome (header, form element, submit button, footer slot) for `/login` and `/forgot`. Auth pages just supply input fields + footer content.

### Styling
Three layers, each with a defined job — choose by scope, not preference:
- **Tailwind utilities in markup** — one-off layout & spacing with no reuse (hero, topbar, footer, contact-form shell).
- **Named classes in `global.css`** — primitives shared across unrelated components: `.surface-card`, `.field-input`, `.link-underline`, `.section-heading`, `.section-eyebrow`, `.page-reveal`, `.bar-icon-btn`. Plain CSS (no `@apply`, so no `@reference` needed); `.surface-card` / `.bar-icon-btn` sit in `@layer components` so Tailwind utilities (`md:hidden`, `hover:border-accent`) still win the cascade.
- **Scoped `<style>` in a component** — bespoke, self-contained visuals with no reuse (journey timeline, portfolio cards, auth form, `Callout`).
- Colors always flow through `--color-*` tokens — never hardcode a hex in a component.

### Dark Mode
- **Single state**: a `data-theme="light|dark"` attribute on `<html>` drives everything. The Tailwind `dark:` variant is redefined in `global.css` (`@custom-variant dark (&:where([data-theme="dark"], …))`) to key off it, and the token blocks + SVG-toggle CSS read the same attribute — no separate `.dark` class to keep in sync.
- **Blocking inline script** in `<head>` (source: `src/scripts/theme-bootstrap.js`, imported as `?raw` and inlined via `set:html`) prevents flash of wrong theme. `THEME_BKGND` colors come in via `define:vars`.
- **`data-dom-loaded`** attribute hides `<main>`/`<footer>` until DOMContentLoaded (FOUC guard).
- **Persistence**: localStorage key `"theme"`, falls back to `prefers-color-scheme`.
- **Meta tags**: `theme-color` (mobile browser chrome) and `color-scheme` updated dynamically.
- **Animation**: Web Animations API (`element.animate()`) with a cubic-bezier approximation of GSAP's sine.inOut (`cubic-bezier(0.37, 0, 0.63, 1)`), respects `prefers-reduced-motion`.
- **Color tokens**: `--color-bkgnd`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-border`, `--color-accent`, plus `--color-bar` / `--color-bar-fg` (topbar stays dark in both modes). `--color-text` bridges Tailwind colors to the SVG toggle. The light/dark `--color-bkgnd` and `--color-accent` hexes are single-sourced from `THEME_BKGND` / `THEME_ACCENT` in `theme-switcher.ts`, injected by `Layout.astro` as `--theme-*` CSS vars (`define:vars`) and referenced here — one source, no copy to sync.

### Client scripts
- Non-trivial interactivity lives in `src/scripts/*.ts` as exported init functions (e.g. `initContactForm`, `initMobileMenu`). Components mount them with a 3-line `<script>` block:
  ```astro
  <script>
    import { initMobileMenu } from '../scripts/mobile-menu';
    initMobileMenu();
  </script>
  ```
- Form-submit UI (button → "sending…", POST via fetch, write status, restore button) is shared in `async-form.ts` (`initAsyncForm`). Each caller (`contact-form.ts`, `auth-form.ts`) only supplies a `mapResponse` callback owning its response-shape branching (HTTP codes, JSON fields, redirects).
- Localized strings for these scripts ride on `data-*` attributes on the relevant element, so the script files stay language-agnostic.
- Exception: `theme-bootstrap.js` is imported as `?raw` and inlined as a blocking script (must run before CSS to avoid FOUC).

### Components
- `Icon` renders an SVG by name (basename in `src/assets/icons/`) at preset sizes (`xs|sm|md|lg`). The registry in `src/assets/icons/index.ts` auto-loads every `.svg` in that directory via `import.meta.glob` — adding an icon is a drop-in, no import/barrel updates needed. It exports `getIcon(name)` (throws with the available list on an unknown name; used by `Icon` and `Callout`) — use `<Fragment set:html={getIcon('<name>')} />` for the few places that need raw SVG inside a custom-styled wrapper.
- `InfoCard` is a card primitive that becomes a link when given `href`. `icon` prop is an icon name (forwarded to `<Icon name=…>`).
- `ThemeToggle` uses `?raw` SVG import (`src/assets/theme-switcher.svg`) rendered inline via `set:html` so WAAPI can target the SVG's internal IDs (`#theme-switcher-sun`/`-moon`) and animate them — impossible from an opaque `<img>`. `logo-name.svg` is inlined the same way but for a different reason: it has no internal IDs and is painted with `fill="currentColor"`, so inlining lets it inherit the topbar text color and flip with the theme (an `<img src>` SVG is sandboxed from page CSS). Both live at `src/assets/` root, outside `/icons/`, because they're single-use, sized differently, and must be part of the DOM rather than fetched as opaque files from `public/`.
- `LanguageSwitcher` uses `<span>` for active lang (not a link), `<a rel="alternate" hreflang>` for others.
