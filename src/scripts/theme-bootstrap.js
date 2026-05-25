// Blocking theme bootstrap. Imported as raw text by src/layouts/Layout.astro
// (via `?raw`) and inlined inside a `<script is:inline>` tag in <head> so it
// runs before bundles load — FOUC guard.
//
// `THEME_BKGND` is provided at inline time by Astro's `define:vars`, sourced
// from src/scripts/theme-switcher.ts (single source of truth for the values).
//
// This file mirrors resolveTheme/applyTheme in theme-switcher.ts. The bundled
// module re-implements them with TS types because this file ships as raw text
// (no imports/exports, plain JS) — keep the two logic paths in sync.
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
