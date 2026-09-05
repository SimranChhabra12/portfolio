"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Frame is a fixed landscape aspect (628/438 ≈ 1.43, matching the reference site's hero
// treatment — see DESIGN_RULES.md), but three of these four photos are portrait. Every photo
// fills the frame so the carousel stays consistent (no letterboxed frames mid-rotation), and
// each one carries its own focal point so the crop never cuts Simran out. `focus` is the
// vertical object-position: 0% holds the top of the photo, 50% is centred.
const photos = [
  {
    src: "/hero/hero-1.jpg",
    alt: "Simran Chhabra at the Whspr showcase",
    width: 5712,
    height: 4284,
    // Landscape, near the frame's own aspect — barely cropped.
    focus: "50%",
  },
  {
    src: "/hero/hero-2.jpg",
    alt: "Simran Chhabra with rescued street dogs",
    width: 1440,
    height: 1595,
    // Kneeling with the dogs, low in the frame: centring here cuts her head off.
    focus: "0%",
  },
  {
    src: "/hero/hero-3.jpg",
    alt: "Simran Chhabra presenting a research poster",
    width: 4284,
    height: 5712,
    // She and the poster both sit mid-frame.
    focus: "50%",
  },
  {
    src: "/hero/hero-4.jpg",
    alt: "Simran Chhabra at the Whspr showcase, talking with visitors",
    width: 4284,
    height: 5712,
    // Slightly high, to keep the Whspr showcase board above the table in shot.
    focus: "35%",
  },
];

const INTERVAL_MS = 4000;
// The flip itself — kept short so the mid-rotation frame (where a turning photo reads as
// squashed or mirrored) passes too fast to register.
const TRANSITION_MS = 350;

export default function HeroPhoto() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative w-[var(--hero-photo-w)] sm:w-[var(--hero-photo-w-sm)] lg:w-[var(--hero-photo-w-lg)] aspect-[var(--hero-photo-aspect)] rounded-[var(--radius-card)] shadow-[0_24px_48px_-16px_rgba(58,42,56,0.32)] bg-surface"
      style={{ perspective: "1600px", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {photos.map((photo, i) => (
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
