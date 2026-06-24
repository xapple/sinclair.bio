// Scroll-triggered fade-up for .page-reveal elements. Inlined verbatim at the
// end of <body> by Layout.astro (imported via ?raw) — NOT bundled — for two
// reasons:
//   1. Reliability. This script sets the `data-js-reveal` gate that global.css
//      uses to hold every .page-reveal at opacity 0 until it scrolls into view.
//      If the script never ran, that gate would leave the whole page invisible.
//      An inline end-of-body script always runs once the parser reaches it; a
//      bundled module could fail to load and hide everything.
//   2. Timing. It sets the gate synchronously, before the FOUC guard reveals
//      content (data-dom-loaded fires on DOMContentLoaded, after this script),
//      so the capped on-load cascade in global.css never auto-starts and there
//      is no flash before the observer takes over.
//
// Why it exists: the per-element fade-up used to run on every .page-reveal at
// once on page load. iOS Safari suppresses taps on the (fully tappable) nav
// links for as long as it is compositing that whole-page entrance — for ~1-2s
// the page looks loaded but won't navigate. Desktop Chrome's compositor keeps
// input live throughout, so it never showed there. Animating only the on-screen
// handful, and the rest as they're scrolled to, keeps that compositing work
// tiny so the topbar stays responsive the instant the page lands.
//
// Plain JS on purpose: inlined into a <script> tag, so no types or imports.
(function () {
  var els = document.querySelectorAll('.page-reveal');
  if (!els.length) return;
  // Gate the CSS: hold every fade-up until we add .in-view (see global.css).
  document.documentElement.dataset.jsReveal = 'true';
  function revealAll() {
    for (var i = 0; i < els.length; i++) els[i].classList.add('in-view');
  }
  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { /* matchMedia unavailable — treat as no preference */ }
  // No observer support, or the user prefers reduced motion: show all at once.
  if (reduce || !('IntersectionObserver' in window)) { revealAll(); return; }
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) continue;
      entries[i].target.classList.add('in-view');
      io.unobserve(entries[i].target);
    }
  }, { threshold: 0 });
  // The items already on screen get a short staggered entrance (capped, so a
  // tall first screen can't reintroduce a long cascade); items revealed later
  // by scrolling fade in immediately as they enter the viewport.
  var vh = window.innerHeight || document.documentElement.clientHeight;
  var step = 0;
  for (var j = 0; j < els.length; j++) {
    var rect = els[j].getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      els[j].style.animationDelay = Math.min(step * 70, 280) + 'ms';
      step++;
    }
    io.observe(els[j]);
  }
})();
