import Link from "next/link";
import { formatDeckDate, type SlideDeck } from "@/lib/slides";

type DeckCardProps = {
  deck: SlideDeck;
  /** Wide horizontal layout for the newest deck at the top of the list. */
  featured?: boolean;
};

/**
 * A deck on the list page, drawn as its own title slide sitting on a small
 * stack of paper sheets. No thumbnails needed — same pen language as the
 * project wireframes. The whole card is one link, stretched from the title
 * (so nothing between the title and the <li> may be positioned or
 * transformed — it would capture the stretched link's ::after).
 */
export function DeckCard({ deck, featured = false }: DeckCardProps) {
  const slides = `${deck.slideCount} slides`;

  return (
    <li className={`deck${featured ? " deck--featured" : ""}`}>
      <div className="deck__cover">
        {/* the sheets underneath — fan out on hover */}
        <span className="deck__stack deck__stack--back" aria-hidden="true" />
        <span className="deck__stack deck__stack--mid" aria-hidden="true" />
        <div className="deck__sheet">
          <p className="deck__kicker handwrite">
            {featured && <span className="deck__latest">latest · </span>}
            via {deck.source.author} · {new URL(deck.source.url).hostname.replace(/^www\./, "")}
          </p>
          <h2 className="deck__title">
            <Link className="deck__link" href={`/slides/${deck.slug}`}>
              {deck.title}
            </Link>
          </h2>
          <svg
            className="doodle deck__underline draw"
            viewBox="0 0 120 10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path pathLength={1} d="M3 6 C 30 2, 60 9, 90 4 C 104 2, 113 6, 117 5" />
          </svg>
          <span className="deck__page handwrite" aria-hidden="true">
            01 / {String(deck.slideCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="deck__body">
        <p className="deck__meta handwrite">
          <time dateTime={deck.date}>{formatDeckDate(deck.date)}</time>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {slides}
        </p>
        <p className="deck__summary">{deck.summary}</p>
        {deck.source.title !== deck.title && (
          <p className="deck__source">
            from <cite>{deck.source.title}</cite>
          </p>
        )}
        <ul className="tags deck__tags" role="list" aria-label="Topics">
          {deck.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
