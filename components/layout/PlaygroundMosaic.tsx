import Link from "next/link";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import MosaicTile from "@/components/interactive/MosaicTile";
import playgroundEntries, { type PlaygroundImage } from "@/data/playgroundEntries";

// The homepage playground is a mosaic of EVERY entry, not a picked teaser row. The point
// of this section is volume — that there is a lot of it, and that it is worth a scroll —
// so the reading is "here is the pile", and the individual tile is secondary.
//
// CSS columns rather than grid. A grid needs every tile assigned a row span to look
// masonry, which means guessing spans from aspect ratios and still leaving ragged gaps
// when the guess is wrong; columns just flow the tiles and let them keep their own
// height. The trade-off is real and deliberate: columns order top-to-bottom within a
// column, not left-to-right across the row. Reading order is therefore per-column, which
// is fine here (the tiles have no sequence — it is a pile, not a list) and would NOT be
// fine for the work cards, which are ordered on purpose.
//
// Tiles keep their COVER's native aspect (DESIGN_DOC §5), which is what gives the wall
// its uneven, contact-sheet rhythm. The frames that cycle inside a tile are not all that
// shape, so those are cropped to the slot — the alternative is a mosaic that reflows
// every three seconds.

// Cap per tile. These entries run to 27 photographs; a tile that cycles all of them takes
// 90 seconds to come back around, which nobody sees, and mounts far more <Image> than the
// section can justify. Six is enough to read as "there is more here".
const MAX_FRAMES = 6;

// Evenly spaced through the entry rather than the first N, so a tile samples the whole
// shoot instead of six near-identical frames from the top of the folder. The cover leads,
// and duplicates of it are dropped — several entries repeat their cover inside `images`.
function framesFor(cover: PlaygroundImage, images: PlaygroundImage[]): PlaygroundImage[] {
  const rest = images.filter((img) => img.src !== cover.src);
  if (rest.length === 0) return [cover];

  const want = MAX_FRAMES - 1;
  const step = Math.max(1, Math.floor(rest.length / want));
  const sampled: PlaygroundImage[] = [];
  for (let i = 0; i < rest.length && sampled.length < want; i += step) {
    sampled.push(rest[i]);
  }
  return [cover, ...sampled];
}

const TILE_SIZES = "(max-width: 768px) 50vw, 33vw";

export default function PlaygroundMosaic() {
  return (
    <ul className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 lg:gap-5 [column-fill:balance]">
      {playgroundEntries.map((entry, i) => {
        const cover = entry.cover;
        return (
          // `break-inside-avoid` is load-bearing: without it a tile splits across a
          // column boundary and the image is cut in half. `mb-*` matches the gutter, so
          // vertical and horizontal gaps read as one spacing.
          <li key={entry.slug} className="mb-3 break-inside-avoid md:mb-4 lg:mb-5">
            <Link
              /* Same rule as PlaygroundCard on /playground: an entry's own `href` when it
                 has one (GestureSketch points away, to its case study), otherwise its own
                 page. Only 4 of the 12 entries define `href`, so a "/playground" fallback
                 sent the other 8 to the index they were already being clicked from. Every
                 entry without an `href` does have a page — generateStaticParams in
                 playground/[slug] builds one for all of them except the ones written
                 elsewhere, which are exactly the ones carrying an external `href`. */
              href={entry.href ?? `/playground/${entry.slug}`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {cover ? (
                <MosaicTile
                  frames={entry.coverFrames ?? framesFor(cover, entry.pageImages ?? entry.images)}
                  aspect={`${cover.width} / ${cover.height}`}
                  objectPosition={entry.coverPosition}
                  // 370ms apart. Prime-ish and unrelated to the 3200ms dwell, so the
                  // tiles drift out of phase instead of syncing back up.
                  stagger={i * 370}
                  sizes={TILE_SIZES}
                />
              ) : (
                // Entries with no cover have no native aspect to keep, so the placeholder
                // takes a portrait slot rather than collapsing to zero height.
                <div
                  className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-surface"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <CoverPlaceholder
                    src="/images/covers/vr.jpg"
                    alt={`${entry.title}: cover image coming soon`}
                    initial={entry.title[0]}
                    label="Coming soon"
                    sizes={TILE_SIZES}
                  />
                </div>
              )}

              {/* Title only, not title + one-liner. At mosaic scale the tile is roughly a
                  third of the column and the full card line ran to four lines under it,
                  which put more text on screen than image. The one-liner still carries
                  the piece on /playground, where the cards are full width. */}
              <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-2 transition-colors [@media(hover:hover)]:group-hover:text-accent">
                {entry.title}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
