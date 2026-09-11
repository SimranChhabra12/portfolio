import PlaygroundCard from "@/components/interactive/PlaygroundCard";
import playgroundEntries, { PLAYGROUND_CATEGORIES, type PlaygroundEntry } from "@/data/playgroundEntries";

/**
 * The playground collection: one card, one scale, grouped into titled sections
 * (Creative tech, Fashion & styling, Community & events). Entries keep their array
 * order inside each section.
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
  /** Render only the first N entries, ungrouped. Omit for the full, sectioned collection. */
  limit?: number;
  /** How many leading tiles to preload. Only set this where the tiles are above the fold. */
  preloadCount?: number;
}) {
  if (typeof limit === "number") {
    return <Grid entries={playgroundEntries.slice(0, limit)} preloadCount={preloadCount} offset={0} />;
  }

  // Preloading counts tiles across the whole page, not per section, so only the
  // first few on screen are prioritised.
  let offset = 0;
  const sections = PLAYGROUND_CATEGORIES.map((cat) => {
    const entries = playgroundEntries.filter((e) => e.category === cat.id);
    const start = offset;
    offset += entries.length;
    return { ...cat, entries, start };
  }).filter((s) => s.entries.length > 0);

  return (
    <div className="flex flex-col gap-24">
      {sections.map((s) => (
        <section key={s.id} aria-labelledby={`playground-${s.id}`} className="!p-0">
          {/* Same Playfair as every other heading, one step heavier (600, already loaded
              for .t-display), so the sections read clearly without adding a typeface. */}
          <h2 id={`playground-${s.id}`} className="t-section text-ink !max-w-none mb-10 !font-semibold">
            {s.label}
          </h2>
          <Grid entries={s.entries} preloadCount={preloadCount} offset={s.start} />
        </section>
      ))}
    </div>
  );
}

function Grid({
  entries,
  preloadCount,
  offset,
}: {
  entries: PlaygroundEntry[];
  preloadCount: number;
  offset: number;
}) {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20 list-none p-0 m-0">
      {entries.map((entry, i) => (
        <li key={entry.slug}>
          <PlaygroundCard entry={entry} preload={offset + i < preloadCount} />
        </li>
      ))}
    </ul>
  );
}
