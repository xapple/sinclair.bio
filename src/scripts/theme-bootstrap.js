// Blocking theme bootstrap. Imported as raw text by src/layouts/Layout.astro
// (via `?raw`) and inlined inside a `<script is:inline>` tag in <head> so it
// runs before bundles load — FOUC guard.
//
// `THEME_BKGND` is provided at inline time by Astro's `define:vars`, sourced
// from src/scripts/theme-switcher.ts.
//
// This file is the single source of truth for the apply-theme operation: it
// exposes `applyTheme` on `window.__sinclairTheme` so the bundled TS module
// (theme-switcher.ts) can call it instead of re-implementing the DOM writes.
//
// Plain JS on purpose: types or imports here would break when inlined into
// the <script> tag.

function resolveTheme() {
  var stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(color, root) {
  root = root || document;
  var html = root.documentElement;
  html.classList.toggle('dark', color === 'dark');
  html.dataset.theme = color;

  var csMeta = root.querySelector('meta[name="color-scheme"]');
  if (csMeta) csMeta.content = color;

  var metas = root.querySelectorAll('meta[name="theme-color"]');
  for (var i = 0; i < metas.length; i++) {
    metas[i].setAttribute('content', THEME_BKGND[color]);
  }
}

// Expose for the bundled module — bundles load after this inline script.
window.__sinclairTheme = { applyTheme: applyTheme };

// Initial hard navigation
applyTheme(resolveTheme());

// FOUC guard: reveal main/footer once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.dataset.domLoaded = 'true';
});

// SPA navigation: theme the incoming document (including meta tags) so it
// arrives fully styled. Doing this before-swap avoids a frame of wrong theme
// that would let CSS-transitioned styles (e.g. the theme-switcher knob)
// animate from default to correct on every nav.
document.addEventListener('astro:before-swap', function (e) {
  applyTheme(resolveTheme(), e.newDocument);
  e.newDocument.documentElement.dataset.domLoaded = 'true';
});
