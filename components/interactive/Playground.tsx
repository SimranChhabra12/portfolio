"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import PlaygroundPopup from "@/components/interactive/PlaygroundPopup";
import playgroundEntries from "@/data/playgroundEntries";

/** Native aspect of /covers/vr.jpg — the stand-in used by entries without a cover. */
const PLACEHOLDER_ASPECT = "1000 / 750";

const TILE_SIZES =
  "(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), calc((1280px - 64px) / 3)";

export default function Playground({
  limit,
  preloadCount = 0,
}: {
  /** Render only the first N entries — used by the homepage teaser. Omit for the full collection. */
  limit?: number;
  /** How many leading tiles to preload. Only set this where the tiles are above the fold. */
  preloadCount?: number;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const entries = typeof limit === "number" ? playgroundEntries.slice(0, limit) : playgroundEntries;
  const openEntry = playgroundEntries.find((e) => e.slug === openSlug) ?? null;

  // Send focus back to the tile that opened the dialog.
  const handleClose = useCallback(() => {
    setOpenSlug(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <div>
      {/*
        Masonry via CSS columns so every tile keeps its own native aspect (§5: playground
        tile = native aspect, object-cover). DOM order is preserved, so tab order is correct
        even though the visual order flows down columns.
      */}
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-8 list-none p-0 m-0">
        {entries.map((entry, i) => (
          <li key={entry.slug} className="mb-12 break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenSlug(entry.slug);
              }}
              aria-haspopup="dialog"
              className="group block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              <div
                className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-surface"
                /* The box takes the image's own aspect, so object-cover crops nothing. */
                style={{ aspectRatio: entry.cover ? `${entry.cover.width} / ${entry.cover.height}` : PLACEHOLDER_ASPECT }}
              >
                {entry.cover ? (
                  <Image
                    src={entry.cover.src}
                    alt={entry.cover.alt}
                    fill
                    sizes={TILE_SIZES}
                    preload={i < preloadCount}
                    className="object-cover"
                  />
                ) : (
                  <CoverPlaceholder
                    src="/images/covers/vr.jpg"
                    alt={`${entry.title} — cover image coming soon`}
                    initial={entry.title[0]}
                    label="Coming soon"
                    sizes={TILE_SIZES}
                  />
                )}
              </div>

              <h3 className="t-section text-ink !max-w-none mt-6 group-hover:text-accent transition-colors">
                {entry.title}
              </h3>
              <p className="t-caption text-mauve mt-2">{entry.tags}</p>
            </button>
          </li>
        ))}
      </ul>

      {openEntry && <PlaygroundPopup entry={openEntry} onClose={handleClose} />}
    </div>
  );
}
