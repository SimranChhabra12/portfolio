"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Frame is a fixed landscape aspect (628/438 ≈ 1.43, matching the reference site's hero
// treatment — see DESIGN_RULES.md), but both of these photos are portrait 3:4. Filling the
// frame therefore keeps only ~52% of each photo's height, so the vertical focal point does
// real work here — `focus` is the vertical object-position, chosen by previewing the actual
// crop rather than by eye. 0% holds the top of the photo, 100% the bottom.
const photos = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Simran Chhabra in graduation dress under the Washington Square Arch",
    width: 2000,
    height: 2667,
    // She stands low and small in a tall frame; 85% keeps her full figure and the arch's
    // columns. Centring cuts her off at the waist, and 100% trades the arch for pavement.
    focus: "85%",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Simran Chhabra at One World Observatory, Manhattan skyline behind her",
    width: 2000,
    height: 2667,
    // Enough headroom that her face clears the top edge, while keeping the skyline in shot.
    focus: "65%",
  },
];

const INTERVAL_MS = 4000;
// The flip itself — kept short so the mid-rotation frame (where a turning photo reads as
// squashed or mirrored) passes too fast to register.
const TRANSITION_MS = 350;

// `single` freezes the frame on the first photo and never starts the interval. The
// carousel format now lives on /about; the homepage hero keeps exactly one photo, so it
// renders the same frame without the motion rather than duplicating the component.
export default function HeroPhoto({ single = false }: { single?: boolean } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (single || reducedMotionRef.current || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [single, paused]);

  const shown = single ? [photos[0]] : photos;

  return (
    <div
      className="relative w-[var(--hero-photo-w)] sm:w-[var(--hero-photo-w-sm)] lg:w-[var(--hero-photo-w-lg)] aspect-[var(--hero-photo-aspect)] rounded-[var(--radius-card)] shadow-[0_24px_48px_-16px_rgba(58,42,56,0.32)] bg-surface"
      style={{ perspective: "1600px", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {shown.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          aria-hidden={i !== index}
          fill
          className="object-cover"
          style={{
            objectPosition: `50% ${photo.focus}`,
            opacity: i === index ? 1 : 0,
            transform: i === index ? "rotateY(0deg)" : "rotateY(-90deg)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            // Opacity and transform run on the same clock; when they drifted apart the
            // half-turned outgoing photo stayed visible under the incoming one.
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TRANSITION_MS}ms ease-in-out`,
          }}
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 628px"
          // `priority` is deprecated in Next 16 in favour of `preload`.
          preload={i === 0}
        />
      ))}
    </div>
  );
}
