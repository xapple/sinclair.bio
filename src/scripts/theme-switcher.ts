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
const SLIDE_MOVEMENT = 100;

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

let runningAnimation: Animation | undefined;

// Animates the sun/moon SVG sliding in (desktop pill only). The compact mobile
// toggle has no SVG to animate, so it skips this step.
function animateSlideIn(target: 'sun' | 'moon'): void {
  if (runningAnimation) {
    runningAnimation.finish();
    runningAnimation = undefined;
  }
  const el = document.querySelector<SVGElement>(`#theme-switcher-${target}`);
  if (!el) return;
  const fromX = target === 'sun' ? -SLIDE_MOVEMENT : SLIDE_MOVEMENT * 2;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  runningAnimation = el.animate(
    [
      { transform: `translate(${fromX}px, ${SLIDE_MOVEMENT}px)` },
      { transform: "translate(0, 0)" },
    ],
    { duration: reducedMotion ? 0 : 500, easing: EASE_SINE_IN_OUT },
  );
}

function toggleTheme({ animate }: { animate: boolean }): void {
  const isDark = document.documentElement.dataset.theme === "dark";
  const next: ThemeColor = isDark ? "light" : "dark";
  if (animate) animateSlideIn(isDark ? 'sun' : 'moon');
  setTheme(next);
}

// Wires every theme-toggle button: the desktop pill (animated) and the
// compact mobile icon (no animation, no SVG to slide).
export function initThemeToggles(): void {
  document.querySelectorAll<HTMLButtonElement>(".theme-switcher").forEach((btn) => {
    btn.addEventListener("click", () => toggleTheme({ animate: true }));
  });
  document.querySelectorAll<HTMLButtonElement>(".compact-theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => toggleTheme({ animate: false }));
  });
}
