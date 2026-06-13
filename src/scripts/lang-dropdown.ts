// Wires the mobile language-switcher dropdown: click the globe button to
// open, click anywhere else to close.
export function initLangDropdown(): void {
  const toggle = document.getElementById('lang-dropdown-toggle');
  const dropdown = document.getElementById('lang-dropdown');
  if (!toggle || !dropdown) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', () => {
    if (!dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Escape closes the open menu and returns focus to the toggle, so the
  // role="menu" it advertises is actually keyboard-dismissible.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}
