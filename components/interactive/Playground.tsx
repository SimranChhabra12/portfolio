import PlaygroundCard from "@/components/interactive/PlaygroundCard";
import playgroundEntries from "@/data/playgroundEntries";

/**
 * The playground collection: one grid, one card, one scale.
 *
 * There is no longer a pop-up path. Every tile links to `/playground/<slug>`, which is
 * what makes the detail views a consistent size — the old split opened `light` entries
 * in a small modal and `full` ones on a full-width page.
 *
 * No "use client": nothing here holds state any more.
 */
export default function Playground({
  limit,
  preloadCount = 0,
}: {
  /** Render only the first N entries — used by the homepage teaser. Omit for the full collection. */
  limit?: number;
  /** How many leading tiles to preload. Only set this where the tiles are above the fold. */
  preloadCount?: number;
}) {
  const entries = typeof limit === "number" ? playgroundEntries.slice(0, limit) : playgroundEntries;

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20 list-none p-0 m-0">
      {entries.map((entry, i) => (
        <li key={entry.slug}>
          <PlaygroundCard entry={entry} preload={i < preloadCount} />
        </li>
      ))}
    </ul>
  );
}
