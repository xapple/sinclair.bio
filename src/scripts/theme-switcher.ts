import { THEME_BACK } from "./theme-colors";

const ANIMATION_DURATION_MS = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches
  ? 0
  : 500;

// cubic-bezier approximation of GSAP's sine.inOut
const EASE_SINE_IN_OUT = "cubic-bezier(0.37, 0, 0.63, 1)";

/**
 * Sets the global theme.
 * Updates: .dark class (Tailwind), data-theme (SVG),
 * meta[name="theme-color"], meta[name="color-scheme"], aria-label.
 */
export function setTheme(color: "light" | "dark" | null): void {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const colorSchemeMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]'
  );

  // Resolve color: explicit > localStorage > OS preference
  if (color === null) {
    color = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    localStorage.setItem("theme", color);
  }

  // Tailwind dark mode: toggle .dark class
  document.documentElement.classList.toggle("dark", color === "dark");

  // SVG toggle styling: set data-theme
  document.documentElement.dataset.theme = color;

  // Update color-scheme meta
  if (colorSchemeMeta) colorSchemeMeta.content = color;

  // Update theme-color for mobile browser chrome
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", THEME_BACK[color]);
  }
}

/**
 * Sets up click handlers and OS preference listeners for theme switching.
 * Uses the Web Animations API for the sliding sun/moon animation.
 */
export function themeSwitcherManager(): void {
  const themeSwitchers =
    document.querySelectorAll<HTMLButtonElement>(".theme-switcher");
  const movement = 100;

  let runningAnimation: Animation | undefined;

  const slideIn = (selector: string, fromX: number, fromY: number) => {
    const el = document.querySelector<SVGElement>(selector);
    if (!el) return undefined;
    return el.animate(
      [
        { transform: `translate(${fromX}px, ${fromY}px)` },
        { transform: "translate(0, 0)" },
      ],
      { duration: ANIMATION_DURATION_MS, easing: EASE_SINE_IN_OUT }
    );
  };

  themeSwitchers.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (runningAnimation) {
        runningAnimation.finish();
        runningAnimation = undefined;
      }

      const isDark =
        document.documentElement.dataset.theme === "dark" ||
        document.documentElement.classList.contains("dark");

      if (isDark) {
        runningAnimation = slideIn("#theme-switcher-sun", -movement, movement);
        setTheme("light");
      } else {
        runningAnimation = slideIn(
          "#theme-switcher-moon",
          movement * 2,
          movement
        );
        setTheme("dark");
      }
    });
  });
}
