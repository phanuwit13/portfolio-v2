/**
 * Canonical site URL used by metadata, sitemap, robots and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL at build time if the domain changes —
 * everything derives from this single value.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://phanuwit-k.pages.dev";

export const SITE_NAME = "Phanuwit Kittirong";
export const SITE_TITLE = "Phanuwit Kittirong — Senior Front-End Developer";
export const SITE_DESCRIPTION =
  "Portfolio of Phanuwit Kittirong, Senior Front-End Developer with 5+ years of experience in React.js, TypeScript and Next.js.";

/**
 * The site-wide share card (app/opengraph-image.tsx). Pages that set their
 * own `openGraph`/`twitter` metadata replace the inherited objects wholesale,
 * so they must list this image again or shares go out without one.
 */
export const SITE_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};
