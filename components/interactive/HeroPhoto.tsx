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
    // Cropped in tight from hero-2.jpg (source box 780,1150 → 1660,2667). The full frame
    // was mostly observatory glass and skyline; this is her, with just enough window left
    // to place her. Already 880x1517, so the frame's own aspect matches the file and
    // `object-cover` has nothing left to trim — hence focus 50%.
    src: "/images/hero/hero-2-portrait.jpg",
    alt: "Simran Chhabra at One World Observatory, Manhattan skyline behind her",
    width: 880,
    height: 1517,
    focus: "50%",
  },
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Simran Chhabra in graduation dress under the Washington Square Arch",
    width: 2000,
    height: 2667,
    // She stands low and small in a tall frame; 85% keeps her full figure and the arch's
    // columns. Centring cuts her off at the waist, and 100% trades the arch for pavement.
    focus: "85%",
  },
];

const INTERVAL_MS = 4000;
// The flip itself — kept short so the mid-rotation frame (where a turning photo reads as
// squashed or mirrored) passes too fast to register.
const TRANSITION_MS = 350;

// `single` freezes the frame on the first photo and never starts the interval. The
// carousel format now lives on /about; the homepage hero keeps exactly one photo, so it
// renders the same frame without the motion rather than duplicating the component.
//
// `fluid` drops the fixed token widths for `w-full`, so the frame takes whatever column it
// is given. The homepage hero needs this: at a fixed 628px the photo leaves too little room
// beside it for `.t-display`, and "Product Designer" breaks mid-word. The aspect ratio is
// unchanged either way — only the width source moves from the token to the parent.
export default function HeroPhoto({
  single = false,
  fluid = false,
  aspect,
}: { single?: boolean; fluid?: boolean; aspect?: string } = {}) {
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

  // The 3D flip machinery only earns its keep when there is a second photo to turn to.
  // Under `single` there is one photo and no interval, so `perspective`, `preserve-3d`,
  // `backface-visibility` and the transform transition were all inert — but still enough to
  // promote a compositing layer on the homepage hero, the largest image on the site. Gate
  // them on the carousel actually running. No behaviour change on /about, which is the only
  // caller that flips.
  const flip = !single;

  return (
    <div
      className={`relative ${
        fluid
          ? "w-full"
          : "w-[var(--hero-photo-w)] sm:w-[var(--hero-photo-w-sm)] lg:w-[var(--hero-photo-w-lg)]"
      } rounded-[var(--radius-card)] shadow-[0_24px_48px_-16px_rgba(58,42,56,0.32)] bg-surface`}
      style={{
        perspective: flip ? "1600px" : undefined,
        overflow: "hidden",
        aspectRatio: aspect ?? "var(--hero-photo-aspect)",
      }}
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
            transform: flip ? (i === index ? "rotateY(0deg)" : "rotateY(-90deg)") : undefined,
            transformStyle: flip ? "preserve-3d" : undefined,
            backfaceVisibility: flip ? "hidden" : undefined,
            // Opacity and transform run on the same clock; when they drifted apart the
            // half-turned outgoing photo stayed visible under the incoming one.
            transition: flip
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TRANSITION_MS}ms ease-in-out`
              : undefined,
          }}
          sizes={
            fluid
              ? "(max-width: 768px) 90vw, 30vw"
              : "(max-width: 640px) 320px, (max-width: 1024px) 480px, 628px"
          }
          // `priority` is deprecated in Next 16 in favour of `preload`.
          preload={i === 0}
        />
      ))}
    </div>
  );
}
