import type { Metadata } from "next";
import { DeckCard } from "@/components/DeckCard";
import { Nav } from "@/components/Nav";
import { SectionHead } from "@/components/SectionHead";
import { SketchEffects } from "@/components/SketchEffects";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";
import { getSlideDecks } from "@/lib/slides";

const TITLE = `Slide Notes — ${SITE_NAME}`;
const DESCRIPTION =
  "Articles worth reading, boiled down into short slide decks — the key ideas in a few minutes, with a link back to the original.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/slides" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/slides`,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function SlidesPage() {
  const decks = getSlideDecks();
  const [latest, ...rest] = decks;
  const count = decks.length;

  return (
    <>
      <Nav current="slides" />
      <main id="main" className="section slides">
        <SectionHead as="h1" title="Slide Notes" />
        <p className="slides__lead">{DESCRIPTION}</p>

        {latest ? (
          <>
            <p className="handwrite slides__count">
              {count} {count === 1 ? "deck" : "decks"} so far ✏️
            </p>
            <ul className="decks" role="list">
              <DeckCard deck={latest} featured />
              {rest.map((deck) => (
                <DeckCard key={deck.slug} deck={deck} />
              ))}
            </ul>
          </>
        ) : (
          <div className="sketch-box slides__empty" role="status">
            <p className="handwrite">the first deck is still on the desk ✏️</p>
            <p>Check back soon.</p>
          </div>
        )}
      </main>
      <SketchEffects />
    </>
  );
}
