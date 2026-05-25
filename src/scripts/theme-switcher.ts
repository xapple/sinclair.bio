// --- Theme background colors ---
// Mirrors --color-bkgnd in src/styles/global.css. Duplicated here because the
// blocking inline script in Layout.astro (sourced from theme-bootstrap.js)
// needs these values before CSS loads to set <meta theme-color>. The value is
// passed into the inline script via Astro's `define:vars`. Keep both in sync.
export const THEME_BKGND = {
  light: "#fffff8",
  dark: "#140c07",
} as const;

export type ThemeColor = keyof typeof THEME_BKGND;

// cubic-bezier approximation of GSAP's sine.inOut
const EASE_SINE_IN_OUT = "cubic-bezier(0.37, 0, 0.63, 1)";

// `applyTheme` is installed on `window.__sinclairTheme` by the blocking inline
// bootstrap (src/scripts/theme-bootstrap.js) before any bundle loads, so it is
// always defined by the time this module runs.
declare global {
  interface Window {
    __sinclairTheme: {
      applyTheme: (color: ThemeColor, root?: Document) => void;
    };
  }
}

// Persist and apply a theme choice.
export function setTheme(color: ThemeColor): void {
  localStorage.setItem("theme", color);
  window.__sinclairTheme.applyTheme(color);
}

// Wires the desktop pill toggle's sliding sun/moon animation. Called fresh
// on every view-transition page-load so the new DOM nodes get listeners.
export function themeSwitcherManager(): void {
  const themeSwitchers =
    document.querySelectorAll<HTMLButtonElement>(".theme-switcher");
  const movement = 100;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let runningAnimation: Animation | undefined;

  const slideIn = (selector: string, fromX: number, fromY: number) => {
    const el = document.querySelector<SVGElement>(selector);
    if (!el) return undefined;
    return el.animate(
      [
        { transform: `translate(${fromX}px, ${fromY}px)` },
        { transform: "translate(0, 0)" },
      ],
      { duration: reducedMotion.matches ? 0 : 500, easing: EASE_SINE_IN_OUT }
    );
  };

  themeSwitchers.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (runningAnimation) {
        runningAnimation.finish();
        runningAnimation = undefined;
      }

      const isDark = document.documentElement.dataset.theme === "dark";

      if (isDark) {
        runningAnimation = slideIn("#theme-switcher-sun", -movement, movement);
        setTheme("light");
      } else {
        runningAnimation = slideIn("#theme-switcher-moon", movement * 2, movement);
        setTheme("dark");
      }
    });
  });
}
