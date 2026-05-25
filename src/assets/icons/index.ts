// Auto-loaded SVG registry. Drop a new file into this directory and it
// becomes available as <Icon name="<basename>" /> — no barrel update needed.
//
// import.meta.glob is resolved by Vite at build time, so this incurs no
// runtime cost; the SVG strings are inlined into the rendered HTML only on
// pages that reference them via the registry.

const modules = import.meta.glob<string>('./*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function basename(path: string): string {
  return path.replace(/^\.\//, '').replace(/\.svg$/, '');
}

export const icons: Record<string, string> = Object.fromEntries(
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
