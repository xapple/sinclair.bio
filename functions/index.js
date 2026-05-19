const SUPPORTED = ['en', 'fr'];
const DEFAULT_LOCALE = 'en';

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const langs = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((s) => s.trim().split(';')[0].split('-')[0].toLowerCase())
    .filter(Boolean);
  const preferred = langs.find((l) => SUPPORTED.includes(l)) ?? DEFAULT_LOCALE;
  return Response.redirect(new URL(`/${preferred}/`, url).toString(), 302);
}
