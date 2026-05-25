import { Languages } from '../src/i18n/translations';

const SUPPORTED: readonly string[] = Object.values(Languages);
const DEFAULT_LOCALE: string = Languages.en;

/**
 * Parse an Accept-Language header into language tags sorted by descending
 * q-value (tags without an explicit q default to 1.0). Stable for equal
 * q-values — preserves the order the client sent them in.
 */
function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];
  return header
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      let q = 1;
      for (const p of params) {
        const [k, v] = p.trim().split('=');
        if (k === 'q') {
          const parsed = parseFloat(v);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { tag: tag.toLowerCase(), q, index };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)
    .map((entry) => entry.tag);
}

export async function onRequest({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const ranked = parseAcceptLanguage(request.headers.get('accept-language'));
  const preferred =
    ranked.map((tag) => tag.split('-')[0]).find((l) => SUPPORTED.includes(l)) ??
    DEFAULT_LOCALE;

  // Preserve query string (utm_*, referral params, etc.) across the redirect.
  // Hash fragments aren't sent in the Location header by browsers anyway.
  const target = new URL(`/${preferred}/`, url);
  target.search = url.search;

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      // Cache key must vary on Accept-Language — otherwise the edge can serve
      // an EN redirect to an FR visitor (or vice versa).
      Vary: 'Accept-Language',
      // Belt-and-braces: keep the redirect out of shared caches entirely.
      'Cache-Control': 'no-store',
    },
  });
}
