import slideDecks from "@/content/slide-decks.json";

/**
 * Slide notes: article summaries published as standalone HTML decks.
 *
 * The deck HTML lives in a Cloudflare R2 bucket and is embedded with an
 * <iframe>; this site only owns the metadata (src/content/slide-decks.json).
 * Pages are prerendered at build time (static export), so publishing a deck
 * is `npm run deck:add` (uploads to R2 + writes the JSON entry from the
 * deck's <head> meta tags — see decks/README.md) → commit → deploy.
 *
 * Keep at least one deck: with `output: "export"`, `next build` fails if
 * /slides/[slug] has no pages to generate.
 */

export type SlideDeck = {
  /** URL segment: /slides/<slug>. Lowercase and hyphenated; must be unique. */
  slug: string;
  title: string;
  /** One or two sentences — used on the list card and as the meta description. */
  summary: string;
  /** Publish date, ISO `YYYY-MM-DD`. The list is sorted newest first. */
  date: string;
  slideCount: number;
  /** The article this deck summarizes. */
  source: {
    title: string;
    author: string;
    url: string;
  };
  tags: string[];
  /** Object key of the HTML file in the R2 bucket. Defaults to `<slug>.html`. */
  file?: string;
};

// Typed here so a malformed JSON entry fails `tsc`/`next build`.
const SLIDE_DECKS: SlideDeck[] = slideDecks;

/**
 * Public origin the R2 bucket is served from (a custom domain, or the
 * r2.dev URL while testing). Read at build time; no trailing slash.
 */
const SLIDES_ORIGIN = (process.env.NEXT_PUBLIC_SLIDES_URL ?? "").replace(
  /\/+$/,
  ""
);

export function getSlideDecks(): SlideDeck[] {
  return [...SLIDE_DECKS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getSlideDeck(slug: string): SlideDeck | undefined {
  return SLIDE_DECKS.find((deck) => deck.slug === slug);
}

/** Absolute URL of the deck's HTML on R2, or null when R2 isn't configured. */
export function getDeckFileUrl(deck: SlideDeck): string | null {
  if (!SLIDES_ORIGIN) return null;
  const key = deck.file ?? `${deck.slug}.html`;
  return `${SLIDES_ORIGIN}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

const deckDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `2026-10-28` → `28 Oct 2026` (UTC, so build machines agree). */
export function formatDeckDate(isoDate: string): string {
  return deckDateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}
