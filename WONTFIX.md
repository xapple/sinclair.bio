# WONTFIX

Known issues that have been triaged and are not currently planned for a fix.

---

## The mobile hamburger is open by default

This actually works well for the mobile interface navigation.

## The booking page does not reach a usable scheduler

In `talk.astro`, the embed is initialized with `calLink: 'sinclair.bio'`,
which loads the Cal profile rather than the configured 30-minute event.
This is good because now the user change choose either 15 or 30 minutes bookings.

## Journey and Portfolio do not have page-level headings

The home outline skips from `<h1>` to `<h3>`. This is a design choice.

## System theme changes overwrite an explicit user-selected theme

The bootstrap respects a stored preference, but `ThemeToggle.astro` (line 14)
calls `setTheme()` whenever the operating-system preference changes, writing
over the saved manual choice. We want the OS to take precedence in such cases.

## The “Contact” navigation item navigates to Home

The “Contact” navigation item does not navigate to the contact section.
In NavLinks.astro (line 5), it links to /${lang}/, and ContactSection.astro
(line 15) has no target id.
From Journey, Portfolio, or Talk, visitors selecting “Contact” land at the 
hero instead of the form.
This is expected as the home page is actually the contact form.

## Sitemap `lastmod` claims every page changed on every deployment

`astro.config.mjs` (line 25) assigns the build time to all URLs. The generated
sitemap gave all pages the audit build timestamp, even when content was
unchanged, making `lastmod` unreliable to crawlers. 
We could have a script that gives real per-page lastmod times by parsing the
git log, but this seems like overengineering.

## The test suite only has live production tests.

For instance test_locale_redirect.py makes network requests against the deployed site. Yes, this is intended, we have decided not to test the local dev instance.