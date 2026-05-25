# WONTFIX

Known issues that have been triaged and are not currently planned for a fix.
Priority labels: P1 (highest) → P3 (lowest).

---

## [P1] The booking page does not reach a usable scheduler

In `talk.astro` (line 30), the embed is initialized with `calLink: 'sinclair.bio'`,
which loads the Cal profile rather than the configured 30-minute event.

## [P2] Journey and Portfolio do not have page-level headings

The home outline skips from `<h1>` to `<h3>`.

## [P3] System theme changes overwrite an explicit user-selected theme

The bootstrap respects a stored preference, but `ThemeToggle.astro` (line 14)
calls `setTheme()` whenever the operating-system preference changes, writing
over the saved manual choice.

## [P3] Sitemap `lastmod` claims every page changed on every deployment

`astro.config.mjs` (line 25) assigns the build time to all URLs. The generated
sitemap gave all pages the audit build timestamp, even when content was
unchanged, making `lastmod` unreliable to crawlers.
