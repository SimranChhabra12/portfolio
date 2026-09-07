"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// `focus` is the vertical object-position, chosen by previewing the actual crop rather than
// by eye. 0% holds the top of the photo, 100% the bottom. It only does real work where the
// file's own ratio differs from the frame it is rendered in; both callers now pass
// aspect="3 / 4", so a 3:4 file is placed unchanged and 50% is a no-op.
const photos = [
  {
    // Cropped from NewHeroImage_HomePage.jpeg (source box 1120,2902 → 3228,5712), a
    // 4284x5712 full-length shot where she reads small. This centres on her and lets her
    // fill ~78% of the frame height: deliberately looser than the old hero-2-portrait.jpg,
    // which was a tight head-to-knees crop.
    //
    // Cut to 3:4, which is the ratio BOTH callers render at, so the file is placed
    // unchanged on each and focus 50% is a no-op. The homepage used to pass 880/1517 while
    // /about passed 3/4, which meant whichever file matched one page was re-cropped by the
    // other. Tested against 880/1517 and a 1.43 landscape crop in the homepage pairing:
    // landscape aligned with the text block almost exactly but shrank her to a figure in a
    // plaza, and 880/1517 overshot the text by ~120px. 3:4 is the middle, and it is the
    // ratio that lets one file serve both pages.
    src: "/images/hero/hero-grad-arch.jpg",
    alt: "Simran Chhabra in graduation robes under the Washington Square Arch",
    width: 1200,
    height: 1600,
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
