"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PlaygroundImage } from "@/data/playgroundEntries";

// One tile of the playground mosaic, cycling through that entry's own photographs.
//
// Three rules keep nine simultaneous slideshows from turning the section into a
// flickering wall:
//
// 1. A tile only runs while it is ON SCREEN. The observer starts and stops the interval,
//    so scrolling past the section leaves nine idle components, not nine live timers.
// 2. Every tile gets its own `stagger` (passed in by the parent, derived from its index)
//    added to the dwell time. Nine tiles on an identical 3s beat flip in unison and read
//    as a page-wide glitch; offsetting them makes the wall feel alive instead.
// 3. Frames are mounted lazily — the current one, and the one after it. The rest of the
//    entry's photos are never requested unless the tile actually reaches them, so a tile
//    with 27 images costs the same on load as one with 2.
const DWELL_MS = 3200;
const FADE_MS = 600;

export default function MosaicTile({
  frames,
  aspect,
  objectPosition,
  stagger = 0,
  sizes,
}: {
  frames: PlaygroundImage[];
  aspect: string;
  objectPosition?: string;
  stagger?: number;
  sizes: string;
}) {
  const [index, setIndex] = useState(0);
  // How far the tile has been allowed to reach. Frames beyond this are not in the DOM.
  const [reached, setReached] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion gets the cover and nothing else — a slideshow the user cannot stop
    // is exactly the kind of motion the preference is asking us not to run.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // A slice of the tile is enough: the point is "is it worth animating", not
      // "is it fully visible".
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || frames.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % frames.length;
        setReached((r) => Math.max(r, next));
        return next;
      });
    }, DWELL_MS + stagger);
    return () => clearInterval(id);
  }, [inView, frames.length, stagger]);

  // Mount through one past the current frame, so the next photo is already decoded when
  // the cross-fade starts and the tile never flashes its background mid-transition.
  const mountUpTo = Math.min(reached + 1, frames.length - 1);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-surface"
      style={{ aspectRatio: aspect }}
      // Pointing at a tile jumps it forward rather than pausing it: the tile is a link,
      // so a hover here means "show me more of this", not "hold still".
      onMouseEnter={() =>
        setIndex((i) => {
          const next = (i + 1) % frames.length;
          setReached((r) => Math.max(r, next));
          return next;
        })
      }
    >
      {frames.slice(0, mountUpTo + 1).map((frame, i) => (
        <Image
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          // Only the visible frame is exposed; the rest are the same subject and would
          // make a screen reader read the tile several times over.
          aria-hidden={i !== index}
          fill
          sizes={sizes}
          className="object-cover transition-opacity motion-reduce:transition-none"
          style={{
            objectPosition: objectPosition ?? "center",
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
