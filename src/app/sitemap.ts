import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSlideDecks } from "@/lib/slides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const decks = getSlideDecks();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/slides`,
      lastModified: decks[0] ? new Date(decks[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...decks.map((deck) => ({
      url: `${SITE_URL}/slides/${deck.slug}`,
      lastModified: new Date(deck.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
