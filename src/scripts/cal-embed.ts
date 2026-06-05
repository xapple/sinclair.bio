// Cal.com inline embed bootstrap & lifecycle helpers.
//
// The Cal.com loader (the queueing IIFE that installs `window.Cal` and
// lazy-loads embed.js) is the official `@calcom/embed-snippet` default export.
// The public surface (`mountCalEmbed`, `watchThemeAndRestyle`) is what the page
// script actually calls.
import snippet from '@calcom/embed-snippet';
//
// Theme handling on a light/dark toggle:
//   app.cal.eu's deployed booker reads its light/dark palette from the iframe
//   URL's `theme=` param at load and does NOT repaint it from a live `ui`
//   message — only `colorScheme` (the iframe canvas) applies live. So the only
//   way to actually re-theme the booker is to reload the iframe. We do that
//   *only while the visitor is still on the event-type list* (nothing to lose).
//   Once they pick an event type (Cal's public `eventTypeSelected` event), a
//   booking is in progress: we keep the live iframe and only push `colorScheme`
//   so the canvas matches, accepting that the booker palette stays as loaded.

// --- Public types --------------------------------------------------------

export interface CalEmbedOptions {
  calLink: string;
  namespace: string;
  origin: string;
  embedSrc: string;
  // Per-theme brand color hex values for Cal's cssVarsPerTheme. Cal needs
  // literal hex (CSS vars don't reach inside the iframe), so the page
  // resolves --theme-accent-{light,dark} at call time and passes them in.
  brandColors: { light: string; dark: string };
  // Element selector to mount into (defaults to '#cal-inline').
  elementSelector?: string;
}

// --- Cal global typing ---------------------------------------------------

// @calcom/embed-core ships an ambient `window.Cal` global with strict
// per-action config types. We instead drive Cal through its string-dispatch
// form — Cal('init', ns, cfg) and Cal.ns[x]('inline'|'ui'|'on', cfg) — against
// this loose local shape, casting `window.Cal` to it at the two read sites
// below. Embed-core's types don't model the string-dispatch form and omit the
// 'bookerReady' event we listen to, so satisfying them would mean changing
// runtime behavior; one boundary cast is the cleaner trade.
interface CalNamespace {
  (method: 'inline' | 'ui' | 'on', config: unknown): void;
}

interface CalInstance {
  (method: string, ...args: unknown[]): void;
  ns: Record<string, CalNamespace>;
}

// --- Defaults ------------------------------------------------------------

const DEFAULT_SELECTOR = '#cal-inline';

// --- Module state --------------------------------------------------------

let themeObserver: MutationObserver | null = null;
let lastTheme: 'dark' | 'light' | null = null;
let mounted = false;
// Set once the visitor selects an event type — from then on a booking is in
// progress and we must never reload the iframe to restyle it.
let engaged = false;

// --- Helpers -------------------------------------------------------------

function getCalTheme(): 'dark' | 'light' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// The `ui` instruction config for a given theme. At (re)mount this themes the
// whole booker; on a live toggle only its `colorScheme` actually takes effect
// (see file header), which is enough to keep the iframe canvas matching.
function uiConfigFor(theme: 'dark' | 'light', brand: { light: string; dark: string }) {
  return {
    hideEventTypeDetails: false,
    layout: 'month_view',
    theme,
    // Cal's iframe document defaults to `color-scheme: unset`. When our page
    // declares `color-scheme: dark` (Layout's <meta> in dark mode), that
    // mismatch makes the browser paint an opaque white canvas behind Cal's
    // transparent body, hiding the dark booking UI under white. Telling Cal the
    // page's color-scheme makes it set the same scheme inside the iframe, so the
    // schemes match and the canvas stays transparent. See calcom/cal.com#10032.
    colorScheme: theme,
    // Cal needs literal hex (CSS vars don't reach inside the iframe), so the
    // page resolves --theme-accent-{light,dark} and passes them in.
    cssVarsPerTheme: {
      light: { 'cal-brand': brand.light },
      dark: { 'cal-brand': brand.dark },
    },
  };
}

// Renders the inline embed + UI for a given theme. Used on first mount and on
// the untouched-state theme-change reload. Re-callable: Cal's `inline` rebuilds
// the iframe in the (now empty) container.
function renderInline(
  Cal: CalInstance,
  options: CalEmbedOptions,
  selector: string,
  theme: 'dark' | 'light',
): void {
  // `useSlotsViewOnSmallScreen` is intentionally OFF. When enabled, Cal
  // renders a dedicated slots view on small viewports with a sticky date
  // header above an internally-scrollable slot list — which creates a
  // second scroll context inside the iframe and fights the outer page's
  // scroll. With it off, Cal sizes the iframe to its full content and
  // auto-resizes the iframe (embed-core handles this internally), so the
  // content-sized wrapper grows with it and the outer page owns the only
  // scroll context.
  Cal.ns[options.namespace]('inline', {
    elementOrSelector: selector,
    config: { layout: 'month_view', theme },
    calLink: options.calLink,
  });

  Cal.ns[options.namespace]('ui', uiConfigFor(theme, options.brandColors));
}

// --- Public API ----------------------------------------------------------

// Mounts the Cal.com inline embed in the given element. Mounts at most once.
export function mountCalEmbed(options: CalEmbedOptions): void {
  if (mounted) return;

  const selector = options.elementSelector ?? DEFAULT_SELECTOR;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  // Install Cal's official embed loader (idempotent — a no-op once window.Cal
  // exists). We pass our self-hosted embed.js URL; the booking origin is set
  // via the 'init' call below, exactly as the Cal docs prescribe.
  snippet(options.embedSrc);

  const Cal = window.Cal as unknown as CalInstance | undefined;
  if (!Cal) return;

  Cal('init', options.namespace, { origin: options.origin });

  // Mark the booker "engaged" once the visitor moves past the event-type list,
  // so the theme observer below stops reloading the iframe from under an active
  // booking. Both are Cal's documented public events and neither fires for the
  // profile/event-type list we mount with, so they only trip on real progress:
  //   • eventTypeSelected — the visitor picked a meeting type
  //   • bookerReady       — a meeting's date/slots view finished loading
  // We listen to both for resilience across app.cal.eu's deployed embed. The
  // handlers live on the namespace's action manager, so they persist across the
  // untouched-state reloads `watchThemeAndRestyle` performs.
  for (const action of ['eventTypeSelected', 'bookerReady'] as const) {
    Cal.ns[options.namespace]('on', {
      action,
      callback: () => {
        engaged = true;
      },
    });
  }

  renderInline(Cal, options, selector, getCalTheme());

  mounted = true;
}

// Starts a MutationObserver on <html data-theme> that re-themes the embed when
// the site theme flips. While the booker is untouched it reloads the iframe in
// the new theme (the only way app.cal.eu repaints the booker palette); once a
// booking is in progress it leaves the live iframe alone and only pushes the new
// `colorScheme` so the canvas stays matched. Idempotent — only the first call
// installs the observer.
export function watchThemeAndRestyle(options: CalEmbedOptions): void {
  if (themeObserver) return;

  const selector = options.elementSelector ?? DEFAULT_SELECTOR;
  lastTheme = getCalTheme();
  const observer = new MutationObserver(() => {
    const theme = getCalTheme();
    if (theme === lastTheme) return;
    lastTheme = theme;

    const Cal = window.Cal as unknown as CalInstance | undefined;
    if (!Cal?.ns?.[options.namespace]) return;

    if (engaged) {
      // Booking in progress — preserve it; only the canvas can change live.
      Cal.ns[options.namespace]('ui', uiConfigFor(theme, options.brandColors));
      return;
    }

    // Still on the event-type list — safe to reload the iframe in the new theme.
    const el = document.querySelector<HTMLElement>(selector);
    if (el) el.innerHTML = '';
    renderInline(Cal, options, selector, theme);
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  themeObserver = observer;
}
