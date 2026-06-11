// New-page half of the language-pill FLIP slide. Imported as raw text by
// src/layouts/Layout.astro (via `?raw`) and inlined in <head> with
// `define:vars={{ LANG_INDEX }}` so it runs before the topbar's first
// paint — a bundled (deferred) module would run after the pill is already
// visible at its final slot, too late to hold it at the old one.
//
// Protocol: when a visitor clicks a language-switch link, the old page
// stashes the pill's slot index plus a timestamp in sessionStorage (see
// initLangPillFlag in src/scripts/lang-pill.ts). This script reads the
// flag back and plays a FLIP: hold the pill at its pre-navigation slot
// for the first painted frame (html.lang-pill-slide + --lang-pill-from,
// styled in LanguageSwitcher.astro), then release it so the pill's CSS
// transition slides it to its natural position. Replaces the previous
// cross-document view-transition approach, which render-blocked
// navigation in Safari and never ran in Firefox.
//
// Plain JS on purpose: types or imports here would break when inlined into
// the <script> tag.

(function () {
  var raw = null;
  try {
    raw = sessionStorage.getItem('langPillFrom');
    if (raw !== null) sessionStorage.removeItem('langPillFrom');
  } catch (e) {
    return; // sessionStorage unavailable — skip the slide, page is fine
  }
  if (raw === null) return;

  var parts = raw.split(':');
  var from = parseInt(parts[0], 10);
  var stamp = parseInt(parts[1], 10);

  // Ignore malformed or stale flags (a click that never navigated would
  // otherwise trigger a phantom slide on a much later visit) and no-op
  // hops where the slot did not change.
  if (isNaN(from) || isNaN(stamp)) return;
  if (Date.now() - stamp > 5000) return;
  if (from === LANG_INDEX) return;

  // A document loading hidden (a background tab — sessionStorage is copied
  // into link-opened tabs) must not hold: rAF never fires while hidden, so
  // the release would wait for the first focus and replay the slide
  // arbitrarily later, in a tab that never showed the start state.
  if (document.hidden) return;

  var root = document.documentElement;
  root.style.setProperty('--lang-pill-from', String(from));
  root.classList.add('lang-pill-slide');

  // The labels ride along: while held, the previous slot's link must keep
  // the active (dark) label color so the switcher still reads as the page
  // the visitor just left. Only this script knows the slot, so the rule is
  // injected here; its inverse (the new active label wearing the inactive
  // look while held) is static CSS in LanguageSwitcher.astro.
  var holdStyle = document.createElement('style');
  holdStyle.textContent =
    'html.lang-pill-slide .language-switcher-desktop a[data-slot="' +
    from + '"] { color: var(--color-bar); }';
  document.head.appendChild(holdStyle);

  function play() {
    // Two frames: the first rAF callback runs before the held position has
    // been committed to the screen; releasing on the second guarantees one
    // painted frame at the old slot, so the transition has a start state.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove('lang-pill-slide');
        root.style.removeProperty('--lang-pill-from');
        holdStyle.remove();
      });
    });
  }

  // Wait for DOMContentLoaded so the pill exists and layout has settled;
  // it also lines the slide up with the FOUC guard revealing <main>.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', play);
  } else {
    play();
  }
})();
