/**
 * Source of truth for theme background colors.
 *
 * These literals are needed by the blocking inline script in Layout.astro to
 * set <meta name="theme-color"> before CSS loads — at that point the
 * --color-back CSS variable is not yet available. They MUST match the
 * --color-back values in src/styles/global.css.
 */
export const THEME_BACK = {
  light: '#fffff8',
  dark: '#140c07',
} as const;

export type ThemeColor = keyof typeof THEME_BACK;
