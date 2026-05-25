# WONTFIX

Known issues that have been triaged and are not currently planned for a fix.

---

## Portfolio has Lorem Ipsum demo Packages

## Login and Forgot password post to a unimplemented endpoint

## The mobile hamburger is open by default

## The booking page does not reach a usable scheduler

In `talk.astro` (line 30), the embed is initialized with `calLink: 'sinclair.bio'`,
which loads the Cal profile rather than the configured 30-minute event.

## Journey and Portfolio do not have page-level headings

The home outline skips from `<h1>` to `<h3>`.

## System theme changes overwrite an explicit user-selected theme

The bootstrap respects a stored preference, but `ThemeToggle.astro` (line 14)
calls `setTheme()` whenever the operating-system preference changes, writing
over the saved manual choice.

## Sitemap `lastmod` claims every page changed on every deployment

`astro.config.mjs` (line 25) assigns the build time to all URLs. The generated
sitemap gave all pages the audit build timestamp, even when content was
unchanged, making `lastmod` unreliable to crawlers.

## The current Cal iframe contents are cleared on remount

The Cal embed wrapper depends on an internal upstream event and remounts the booking flow on theme changes.
In cal-embed.ts (line 133), the current iframe contents are cleared on remount; cal-embed.ts (line 162) subscribes to __dimensionChanged; and cal-embed.ts (line 180) remounts whenever the site theme changes. Cal documents __dimensionChanged as internal and not intended for external integrations. Once the existing scheduler-link WONTFIX item is resolved, switching theme during booking can also discard the visitor's progress.
Refactor this integration around Cal's generated/documented embed APIs, without clearing a live booking iframe merely to restyle it.