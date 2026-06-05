// Blocking theme bootstrap. Imported as raw text by src/layouts/Layout.astro
// (via `?raw`) and inlined inside a `<script is:inline>` tag in <head> so it
// runs before bundles load — FOUC guard.
//
// `THEME_BAR` is provided at inline time by Astro's `define:vars`, sourced
// from src/scripts/theme-switcher.ts. It's the topbar color; the
// <meta theme-color> tags use it so macOS Safari's toolbar (which samples the
// brown sticky topbar on scrollable pages) matches the bar instead of flashing.
//
// This file is the single source of truth for the apply-theme operation: it
// exposes `applyTheme` on `window.__sinclairTheme` so the bundled TS module
// (theme-switcher.ts) can call it instead of re-implementing the DOM writes.
//
// Plain JS on purpose: types or imports here would break when inlined into
// the <script> tag.

// FOUC guard: reveal main/footer once DOM is ready. Register FIRST so that
// any thrown error later in this bootstrap (e.g. localStorage access blocked
// by a storage-partitioning policy or sandboxed iframe) can't leave the body
// permanently hidden.
document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.dataset.domLoaded = 'true';
});

function resolveTheme() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) {
    // Storage access blocked — fall through to system preference.
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}

function applyTheme(color, root) {
  root = root || document;
  var html = root.documentElement;
  html.dataset.theme = color;

  var csMeta = root.querySelector('meta[name="color-scheme"]');
  if (csMeta) csMeta.content = color;

  var metas = root.querySelectorAll('meta[name="theme-color"]');
  for (var i = 0; i < metas.length; i++) {
    metas[i].setAttribute('content', THEME_BAR[color]);
  }
}

// Expose for the bundled module — bundles load after this inline script.
window.__sinclairTheme = { applyTheme: applyTheme };

try {
  applyTheme(resolveTheme());
} catch (e) {
  // DOM write failed — the reveal handler above still runs, so the page is
  // visible; users just get whatever theme the SSR HTML shipped with.
}
