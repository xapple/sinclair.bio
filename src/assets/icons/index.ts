// Auto-loaded SVG registry. Drop a new file into this directory and it
// becomes available as <Icon name="<basename>" /> — no barrel update needed.
//
// import.meta.glob is resolved by Vite at build time, so this incurs no
// runtime cost; the SVG strings are inlined into the rendered HTML only on
// pages that reference them via the registry.

// Every .svg in this directory, plus the shared "Sinclair.Bio" wordmark that
// lives one level up (single-sourced with the topbar Logo, which imports the
// same file directly). Exposing it here lets entries reference it as
// <Icon name="logo-name" /> without copying the asset.
const modules = import.meta.glob<string>(['./*.svg', '../logo-name.svg'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

function basename(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.svg$/, '');
}

// Module-local: callers go through getIcon(), which validates the name.
const icons: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, svg]) => [basename(path), svg]),
);

export function getIcon(name: string): string {
  const svg = icons[name];
  if (!svg) {
    const available = Object.keys(icons).sort().join(', ');
    throw new Error(`Unknown icon "${name}". Available: ${available}`);
  }
  return svg;
}
