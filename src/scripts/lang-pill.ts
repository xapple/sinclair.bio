// Old-page half of the language-pill FLIP slide (the new-page half is
// src/scripts/lang-pill-slide.js, inlined in Layout's <head>). On a
// language-switch click, stash the pill's current slot plus a timestamp in
// sessionStorage; the next page reads the flag back and slides its pill in
// from that slot. Both switcher widgets set the flag — when the click comes
// from the mobile dropdown the desktop pill is display-hidden on the next
// page too, so the slide is simply invisible there.
export function initLangPillFlag(): void {
  const desktop = document.querySelector<HTMLElement>('.language-switcher-desktop');
  const index = desktop?.dataset.langIndex;
  if (index === undefined) return;

  // The only <a rel="alternate" hreflang> elements on a page are the
  // language-switch links (head alternates are <link>, not <a>).
  const links = document.querySelectorAll<HTMLAnchorElement>('a[rel="alternate"][hreflang]');
  for (const link of links) {
    link.addEventListener('click', (e) => {
      // Modifier clicks open a new tab/window: this tab keeps its page (so
      // the flag would only linger), and Chrome/Firefox copy sessionStorage
      // into the link-opened tab, which loads hidden and must not replay a
      // slide whose start state it never showed.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      try {
        sessionStorage.setItem('langPillFrom', `${index}:${Date.now()}`);
      } catch {
        // sessionStorage unavailable — the next page just skips the slide.
      }
    });
  }
}
