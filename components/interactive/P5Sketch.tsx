"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type p5 from "p5";
import sketches from "@/components/interactive/sketches";
import type { PlaygroundImage } from "@/data/playgroundEntries";

type Status = "poster" | "live";

/**
 * Live p5.js canvas, sized to the media column.
 *
 * Three things make this safe to drop on a page:
 * - It renders the poster on the server AND on the first client render, so there is
 *   nothing to mismatch. p5 is never imported at module scope — the import happens in
 *   an effect, which only ever runs in the browser, so no `ssr: false` dance is needed.
 * - It does not load p5 at all until the canvas is near the viewport, and calls
 *   `noLoop()` the moment it leaves, so an off-screen sketch costs nothing.
 * - Under `prefers-reduced-motion` it stays on the poster and never loads p5.
 */
export default function P5Sketch({
  sketch,
  poster,
  caption,
}: {
  /** Key into the sketch registry. An unknown id leaves the poster in place. */
  sketch: string;
  poster: PlaygroundImage;
  caption?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<p5 | null>(null);
  const [status, setStatus] = useState<Status>("poster");

  useEffect(() => {
    const host = hostRef.current;
    const loadSketch = sketches[sketch];
    if (!host || !loadSketch) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let cancelled = false;
    let starting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const instance = instanceRef.current;

        if (!entry.isIntersecting) {
          // Off-screen: stop drawing. The instance is kept so scrolling back is instant.
          instance?.noLoop();
          host.dataset.sketchState = "paused";
          return;
        }

        if (instance) {
          instance.loop();
          host.dataset.sketchState = "running";
          return;
        }
        if (starting) return;
        starting = true;

        Promise.all([import("p5"), loadSketch()]).then(([mod, factory]) => {
          if (cancelled) return;
          const P5 = mod.default;
          instanceRef.current = new P5((p) => factory(p, host), host);
          host.dataset.sketchState = "running";
          setStatus("live");
        });
      },
      // Start loading just before it is reached, so the canvas is drawing on arrival.
      { rootMargin: "200px 0px" }
    );

    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      instanceRef.current?.remove();
      instanceRef.current = null;
    };
  }, [sketch]);

  return (
    <figure className="m-0">
      <div
        ref={hostRef}
        // Reflects whether the canvas is drawing. Set by the observer rather than by
        // React state, so pausing an off-screen sketch costs no re-render.
        data-sketch-state="idle"
        // The canvas p5 appends is absolutely positioned into this box, so the box —
        // not the canvas — is what holds the 5:3 slot every other media element uses.
        className="relative w-full max-w-[var(--col-media,1000px)] aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:w-full [&>canvas]:h-full"
      >
        {/* Stays mounted under the canvas: it is the reduced-motion and pre-load state. */}
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1000px"
          className={`object-cover transition-opacity duration-500 ${
            status === "live" ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      {caption && <figcaption className="t-caption text-mauve mt-3">{caption}</figcaption>}
    </figure>
  );
}
