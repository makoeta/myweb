// Per-page SEO helper: sets the document title (suffixed with the site name)
// plus matching Open Graph / Twitter card tags so shared links — chiefly on
// LinkedIn — render a proper preview instead of a bare URL.
export const SITE_NAME = "Maximilian König";

interface SeoOptions {
  /** page label, e.g. "projects". Omit on the landing page. */
  title?: string;
  description: string;
  /** absolute or root-relative image to override the global default. */
  image?: string;
}

export function useSeo({ title, description, image }: SeoOptions) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const url = useRequestURL();
  const absImage = image
    ? image.startsWith("http")
      ? image
      : `${url.origin}${withBase(image)}`
    : undefined;

  useHead({ title: fullTitle });
  useSeoMeta({
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url.href,
    twitterTitle: fullTitle,
    twitterDescription: description,
    ...(absImage ? { ogImage: absImage, twitterImage: absImage } : {}),
  });
}
