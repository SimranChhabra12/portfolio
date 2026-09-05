"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import type { PlaygroundEntry } from "@/data/playgroundEntries";

export default function PlaygroundPopup({
  entry,
  onClose,
}: {
  entry: PlaygroundEntry;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // Stop the page behind the dialog from scrolling while it is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="playground-popup-title"
    >
      <div
        className="absolute inset-0 bg-[var(--dark-bg)]/70"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[var(--radius-card)] bg-cream shadow-[0_24px_48px_-16px_rgba(58,42,56,0.32)]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-cream/90 border border-ink/10 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-colors"
        >
          <span aria-hidden className="text-[16px] leading-none">
            ✕
          </span>
        </button>

        {entry.kind === "light" && entry.images.length > 0 ? (
          <div className="columns-2 gap-1 p-1">
            {entry.images.map((img, i) => (
              <div key={i} className="mb-1 overflow-hidden rounded-lg break-inside-avoid bg-surface">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto"
                  sizes="256px"
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative overflow-hidden rounded-t-[var(--radius-card)] bg-surface"
            /* Native aspect, so object-cover neither crops nor letterboxes (§5). */
            style={{
              aspectRatio: entry.cover
                ? `${entry.cover.width} / ${entry.cover.height}`
                : "1000 / 750",
            }}
          >
            {entry.cover ? (
              <Image
                src={entry.cover.src}
                alt={entry.cover.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) calc(100vw - 48px), 512px"
              />
            ) : (
              <CoverPlaceholder
                src="/images/covers/vr.jpg"
                alt={`${entry.title} — cover image coming soon`}
                initial={entry.title[0]}
                label="Coming soon"
                sizes="512px"
              />
            )}
          </div>
        )}

        <div className="p-8 flex flex-col gap-4">
          <p className="t-caption text-mauve">{entry.tags}</p>
          <h3 id="playground-popup-title" className="t-section text-ink !max-w-none">
            {entry.title}
          </h3>
          <p className="t-body text-ink !max-w-none">{entry.teaser}</p>

          {entry.kind === "full" && entry.href && (
            <Link
              href={entry.href}
              className="mt-2 inline-flex items-center gap-2 label text-cream bg-accent rounded-full px-6 py-3 self-start hover:bg-ink transition-colors"
            >
              See more
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
