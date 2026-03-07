import gsap from "gsap";

const ANIMATION_DURATION = window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches
  ? 0
  : 0.5;

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
  const themeSwitchers =
    document.querySelectorAll<HTMLButtonElement>(".theme-switcher");

  // Resolve color: explicit > OS preference
  if (color === null) {
    color = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Tailwind dark mode: toggle .dark class
  document.documentElement.classList.toggle("dark", color === "dark");

  // SVG toggle styling: set data-theme
  document.documentElement.dataset.theme = color;

  // Update color-scheme meta
  if (colorSchemeMeta) colorSchemeMeta.content = color;

  // Update theme-color for mobile browser chrome
  if (themeColorMeta) {
    const themeColor = color === "dark" ? "#030712" : "#ffffff";
    themeColorMeta.setAttribute("content", themeColor);
  }

  // Update aria-label for accessibility
  themeSwitchers.forEach((btn) => {
    btn.setAttribute(
      "aria-label",
      color === "dark" ? "Dark mode active" : "Light mode active"
    );
  });
}

/**
 * Sets up click handlers and OS preference listeners for theme switching.
 * Uses GSAP for the sliding sun/moon animation.
 */
export function themeSwitcherManager(): void {
  const themeSwitchers =
    document.querySelectorAll<HTMLButtonElement>(".theme-switcher");
  const movement = 100;
  const ease: gsap.EaseString = "sine.inOut";

  let runningAnimation: gsap.core.Tween | undefined;

  themeSwitchers.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Complete any running animation immediately
      if (runningAnimation) {
        runningAnimation.progress(1);
        runningAnimation = undefined;
      }

      const isDark =
        document.documentElement.dataset.theme === "dark" ||
        document.documentElement.classList.contains("dark");

      if (isDark) {
        // Switching to light: animate the sun icon in
        runningAnimation = gsap.from("#theme-switcher-sun", {
          x: -movement,
          y: movement,
          duration: ANIMATION_DURATION,
          ease,
        });
        setTheme("light");
      } else {
        // Switching to dark: animate the moon icon in
        runningAnimation = gsap.from("#theme-switcher-moon", {
          x: movement * 2,
          y: movement,
          duration: ANIMATION_DURATION,
          ease,
        });
        setTheme("dark");
      }
    });
  });

  // Listen for OS preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });
}
