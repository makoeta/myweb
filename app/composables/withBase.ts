// Prefixes a root-relative public asset path (e.g. "/uploads/foo.webp") with
// the app's base URL. Needed because this site deploys to a GitHub Pages
// *project* page (https://<user>.github.io/myweb/), so `app.baseURL` is
// "/myweb/" in production — any hardcoded "/uploads/..." or "/og.png" path
// resolves to the wrong (root) URL and 404s unless run through this first.
// Absolute URLs (http/https) are passed through untouched.
export function withBase(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  const base = useRuntimeConfig().app.baseURL;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
