import squareMenuSvg from '../assets/icons/square-menu.svg?raw';
import squareXSvg from '../assets/icons/square-x.svg?raw';

// Wires the topbar's mobile hamburger: toggles `data-closed` on the menu
// element (CSS handles the height/opacity transition) and swaps the icon glyph.
export function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isClosed = menu.toggleAttribute('data-closed');
    const isOpen = !isClosed;
    if (icon) icon.innerHTML = isOpen ? squareXSvg : squareMenuSvg;
    toggle.setAttribute('aria-expanded', String(isOpen));
    // Remove closed menu from the keyboard / a11y tree — CSS only hides it
    // visually, so without `inert` the Journey/Portfolio/Talk anchors remain
    // tab-focusable while collapsed.
    menu.toggleAttribute('inert', isClosed);
  });
}
