// Wires the topbar's mobile hamburger: toggles `data-closed` on the menu
// (CSS handles the height/opacity transition) and mirrors that state onto the
// toggle button (CSS handles the icon swap).
export function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isClosed = menu.toggleAttribute('data-closed');
    const isOpen = !isClosed;
    toggle.toggleAttribute('data-menu-closed', isClosed);
    toggle.setAttribute('aria-expanded', String(isOpen));
    // Capture focus location before `inert` blurs any focused menu link.
    const focusWasInside = menu.contains(document.activeElement);
    // Remove closed menu from the keyboard / a11y tree — CSS only hides it
    // visually, so without `inert` the Journey/Portfolio/Contact anchors remain
    // tab-focusable while collapsed.
    menu.toggleAttribute('inert', isClosed);
    // Closing while focus sat on a menu link drops focus to <body>; send it
    // back to the toggle so the Tab order continues from the hamburger.
    if (isClosed && focusWasInside) toggle.focus();
  });
}
