import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { SketchEffects } from "@/components/SketchEffects";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";
import {
  formatDeckDate,
  getDeckFileUrl,
  getSlideDeck,
  getSlideDecks,
} from "@/lib/slides";

// Static export: only the decks known at build time get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getSlideDecks().map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata(
  props: PageProps<"/slides/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const deck = getSlideDeck(slug);
  if (!deck) return {};

  const title = `${deck.title} — Slide Notes`;
  return {
    title,
    description: deck.summary,
    alternates: { canonical: `/slides/${deck.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/slides/${deck.slug}`,
      siteName: SITE_NAME,
      title,
      description: deck.summary,
      publishedTime: deck.date,
      authors: [SITE_NAME],
      tags: deck.tags,
      locale: "en_US",
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: deck.summary,
      images: [SITE_OG_IMAGE],
    },
  };
}

export default async function SlideDeckPage(props: PageProps<"/slides/[slug]">) {
  const { slug } = await props.params;
  const deck = getSlideDeck(slug);
  if (!deck) notFound();

  const fileUrl = getDeckFileUrl(deck);

  return (
    <>
      <Nav current="slides" />
      <main id="main" className="section deck-view">
        <Link className="deck-view__back" href="/slides">
          <svg viewBox="0 0 28 14" aria-hidden="true">
            <path d="M26 7 C 18 6, 10 8, 3 7 M 8 2 L 2 7 L 8 12" />
          </svg>
          All slide notes
        </Link>

        <header className="deck-view__head">
          <p className="deck__meta handwrite">
            <time dateTime={deck.date}>{formatDeckDate(deck.date)}</time>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {deck.slideCount} slides
          </p>
          <h1 className="deck-view__title">{deck.title}</h1>
          <p className="deck-view__summary">{deck.summary}</p>
          <p className="deck__source">
            Summarized from{" "}
            <a href={deck.source.url} target="_blank" rel="noopener noreferrer">
              {deck.source.title}
            </a>{" "}
            by {deck.source.author}
          </p>
        </header>

        <div className="deck-view__stage">
          {fileUrl ? (
            <iframe
              src={fileUrl}
              title={`Slides: ${deck.title}`}
              allow="fullscreen"
              // The deck is served from the R2 origin, not this site's, so it
              // stays isolated even with scripts + its own origin allowed
              // (slide frameworks need both for navigation and storage).
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <p className="deck-view__missing" role="status">
              These slides aren&apos;t available right now.
            </p>
          )}
        </div>

        {fileUrl && (
          <div className="deck-view__actions">
            <p className="handwrite deck-view__hint">
              click a slide, then use ← → to flip through
            </p>
            <a
              className="btn-sketch"
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in a new tab
              <svg className="btn-sketch__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 18 C 10 14, 14 10, 18 6 M 9 6 L 18 6 L 18 15" />
              </svg>
            </a>
          </div>
        )}
      </main>
      <SketchEffects />
    </>
  );
}
