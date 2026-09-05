"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PlaygroundImage } from "@/data/playgroundEntries";

/**
 * Horizontal gallery for a playground page.
 *
 * Scroll-snap does the work, so it is a real scroller on touch and a button-driven
 * carousel on a pointer — no JS is needed for it to be usable.
 *
 * Slides share a HEIGHT, not an aspect ratio: each one is as wide as its own image
 * needs to be. That is what keeps one entry's gallery the same size as the next one's
 * without doing the thing PLAYGROUND.md rules out — forcing mixed orientations into a
 * single frame, which either crops the subject or letterboxes it.
 */
export default function PlaygroundCarousel({
  images,
  label,
}: {
  images: PlaygroundImage[];
  label: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, []);

  // Keep the counter honest when the user scrolls or swipes the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Several slides are visible at once, so "current" is the leftmost one in view.
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const slides = Array.from(track.children);
        const first = slides.findIndex((slide) => visible.has(slide));
        if (first !== -1) setIndex(first);
      },
      { root: track, threshold: 0.6 }
    );
    for (const child of Array.from(track.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [images]);

  if (images.length === 0) return null;

  const step = (delta: number) => scrollTo(Math.min(images.length - 1, Math.max(0, index + delta)));

  return (
    <div
      className="w-full max-w-[var(--col-media,1000px)]"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <ul
        ref={trackRef}
        className="flex list-none p-0 m-0 gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}
      >
        {images.map((img, i) => (
          <li
            key={`${img.src}-${i}`}
            className="shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-surface h-[56vw] sm:h-[420px] lg:h-[560px]"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 640px) 80vw, 560px"
              // Fixed height, natural width: nothing is cropped and nothing letterboxes.
              className="h-full w-auto max-w-none object-contain"
            />
          </li>
        ))}
      </ul>

      {images.length > 1 && (
        <div className="flex items-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={index === 0}
            aria-label="Previous image"
            className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={index === images.length - 1}
            aria-label="Next image"
            className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <span aria-hidden>→</span>
          </button>
          <p className="t-caption text-mauve" aria-live="polite">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
