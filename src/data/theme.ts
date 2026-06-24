// Single source of truth for the site's theme color hex values. Pure data — no
// DOM, no runtime — so the server-rendered Layout.astro can import these into
// frontmatter without reaching into a client-runtime module. Sits alongside
// profile.ts / personal.ts, where the project's other single-source constants
// live. The behavior (persist + animate the toggle) is in
// src/scripts/theme-switcher.ts; the blocking flash guard is theme-bootstrap.js.

// --- Page background ---
// --color-bkgnd. Layout.astro injects these into CSS as --theme-bkgnd-light /
// --theme-bkgnd-dark, which global.css's @theme + [data-theme] blocks reference.
// (The <meta name="theme-color"> tags use THEME_BAR, not this — see below.)
export const THEME_BKGND = {
  light: "#fffff8",
  dark: "#140c07",
} as const;

// --- Brand burgundy ---
// Single source for --color-accent (both modes) and for third-party embeds that
// need literal hex (e.g. Cal.com's cssVarsPerTheme — CSS vars don't reach inside
// the iframe, so contact.astro passes these in). Layout.astro pipes them into CSS as
// --theme-accent-{light,dark} via define:vars; global.css references them in
// @theme + the dark block.
export const THEME_ACCENT = {
  light: "#6b2c2c",
  dark: "#cc6464",
} as const;

// --- Topbar color ---
// Single source for --color-bar. Layout.astro mirrors it into CSS as
// --theme-bar-{light,dark}. --color-bar drives the topbar AND the <body>
// background (see Layout.astro): Safari 26 derives its toolbar tint from the
// body background, so a bar-colored body keeps the browser chrome the same
// brown as the topbar instead of flashing to the page background mid-navigation.
// The same color also feeds the <meta name="theme-color"> tags, which color the
// chrome on mobile and browsers that still honor that tag (Safari 26 ignores it).
export const THEME_BAR = {
  light: "#4a1e1e",
  dark: "#3a1414",
} as const;

export type ThemeColor = keyof typeof THEME_BKGND;
