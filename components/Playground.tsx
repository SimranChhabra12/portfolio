"use client";

import { useState } from "react";
import Image from "next/image";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import PlaygroundPopup from "@/components/PlaygroundPopup";
import playgroundEntries from "@/data/playgroundEntries";

export default function Playground() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openEntry = playgroundEntries.find((e) => e.slug === openSlug) ?? null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-14 lg:gap-y-20">
        {playgroundEntries.map((entry) => (
          <button
            key={entry.slug}
            type="button"
            onClick={() => setOpenSlug(entry.slug)}
            className="group block text-left"
          >
            {entry.cover ? (
              <div className="overflow-hidden rounded-[var(--radius-card)] bg-surface mb-6">
                <Image
                  src={entry.cover.src}
                  alt={`${entry.title} cover`}
                  width={entry.cover.width}
                  height={entry.cover.height}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="relative aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface mb-6">
                <CoverPlaceholder
                  src="/covers/vr.jpg"
                  alt={`${entry.title} placeholder cover`}
                  initial={entry.title[0]}
                  label="Coming soon"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            )}
            <h3 className="t-heading text-ink !max-w-none underline decoration-ink/20 underline-offset-4 group-hover:decoration-accent group-hover:text-accent transition-colors mb-2">
              {entry.title}
            </h3>
            <p className="label text-mauve">{entry.tags}</p>
          </button>
        ))}
      </div>

      {openEntry && <PlaygroundPopup entry={openEntry} onClose={() => setOpenSlug(null)} />}
    </div>
  );
}
