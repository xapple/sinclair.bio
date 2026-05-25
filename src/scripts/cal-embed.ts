// Cal.com inline embed bootstrap & lifecycle helpers.
//
// The Cal.com docs ship a tightly-minified IIFE loader; we keep it as the
// `installCalLoader` private helper (renamed identifiers, properly typed) so
// it stays close to upstream. The public surface (`mountCalEmbed`,
// `watchThemeAndRemount`) is what the page script actually calls.

// --- Public types --------------------------------------------------------

export interface CalEmbedOptions {
  calLink: string;
  namespace: string;
  origin: string;
  embedSrc: string;
  // Element selector to mount into (defaults to '#cal-inline').
  elementSelector?: string;
  // Optional per-theme brand color overrides (defaults to the existing
  // burgundy palette).
  brandColors?: { light: string; dark: string };
}

// --- Cal global typing ---------------------------------------------------

// Cal's queue entries are method-call tuples like ['init', 'ns', {...}].
type CalQueueEntry = unknown[];

type CalNamespaceMethod = 'inline' | 'ui' | 'on';

interface CalNamespace {
  (method: CalNamespaceMethod, config: unknown): void;
  q: CalQueueEntry[];
}

interface CalInstance {
  (method: string, ...args: unknown[]): void;
  loaded: boolean;
  q: CalQueueEntry[];
  ns: Record<string, CalNamespace>;
}

declare global {
  interface Window {
    Cal?: CalInstance;
  }
}

// --- Defaults ------------------------------------------------------------

const DEFAULT_BRAND_COLORS = {
  light: '#6b2c2c',
  dark: '#b85252',
} as const;

const DEFAULT_SELECTOR = '#cal-inline';

// --- Module state --------------------------------------------------------

let themeObserver: MutationObserver | null = null;
let lastTheme: 'dark' | 'light' | null = null;

// --- Helpers -------------------------------------------------------------

function getCalTheme(): 'dark' | 'light' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// Official Cal.com embed bootstrap. Installs `window.Cal` as a queueing
// proxy and lazy-loads embed.js on first call. Idempotent — once `Cal` is
// installed, subsequent calls are a no-op.
function installCalLoader(win: Window, scriptSrc: string, initMethod: string): void {
  const push = (target: { q: CalQueueEntry[] }, args: CalQueueEntry): void => {
    target.q.push(args);
  };
  const doc = win.document;
  if (win.Cal) return;

  const cal = function (this: unknown): void {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.from(arguments) as CalQueueEntry;
    const self = cal as unknown as CalInstance;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      doc.head.appendChild(doc.createElement('script')).setAttribute('src', scriptSrc);
      self.loaded = true;
    }
    if (args[0] === initMethod) {
      const api = function (this: unknown): void {
        // eslint-disable-next-line prefer-rest-params
        push(api as unknown as { q: CalQueueEntry[] }, Array.from(arguments) as CalQueueEntry);
      } as unknown as CalNamespace;
      const ns = args[1];
      api.q = api.q || [];
      if (typeof ns === 'string') {
        self.ns[ns] = self.ns[ns] || api;
        push(self.ns[ns], args);
        push(self, ['initNamespace', ns]);
      } else {
        push(self, args);
      }
      return;
    }
    push(self, args);
  } as unknown as CalInstance;

  win.Cal = cal;
}

// --- Public API ----------------------------------------------------------

// Mounts (or re-mounts) the Cal.com inline embed in the given element.
// Idempotent — safe to call again on theme toggle to swap the embed's theme.
export function mountCalEmbed(options: CalEmbedOptions): void {
  const selector = options.elementSelector ?? DEFAULT_SELECTOR;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  installCalLoader(window, options.embedSrc, 'init');

  const Cal = window.Cal;
  if (!Cal) return;

  const theme = getCalTheme();
  const brand = options.brandColors ?? DEFAULT_BRAND_COLORS;

  Cal('init', options.namespace, { origin: options.origin });

  // Clear any previous render (theme-change re-mount).
  el.innerHTML = '';

  Cal.ns[options.namespace]('inline', {
    elementOrSelector: selector,
    config: { layout: 'month_view', theme, useSlotsViewOnSmallScreen: true },
    calLink: options.calLink,
  });

  Cal.ns[options.namespace]('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
    theme,
    cssVarsPerTheme: {
      light: { 'cal-brand': brand.light },
      dark: { 'cal-brand': brand.dark },
    },
  });
}

// Starts a MutationObserver on <html data-theme> that re-mounts the embed
// when the theme flips. Idempotent — safe to call multiple times; only the
// first call installs the observer.
export function watchThemeAndRemount(options: CalEmbedOptions): void {
  if (themeObserver) return;

  lastTheme = getCalTheme();
  const observer = new MutationObserver(() => {
    const theme = getCalTheme();
    if (theme === lastTheme) return;
    lastTheme = theme;
    mountCalEmbed(options);
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  themeObserver = observer;
}
