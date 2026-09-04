"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Frame is a fixed landscape aspect (628/438 ≈ 1.43, matching the reference site's hero
// treatment — see DESIGN_RULES.md). Photos whose native aspect is close to that can fill the
// frame with a mild center-crop; photos far from it (portrait shots) would lose the subject to
// a blanket crop, so they're shown whole (contain) against a neutral fill instead.
const photos = [
  {
    src: "/hero/hero-1.jpg",
    alt: "Simran Chhabra at the Whspr showcase",
    width: 5712,
    height: 4284,
    fit: "cover" as const,
  },
  {
    src: "/hero/hero-2.jpg",
    alt: "Simran Chhabra with rescued street dogs",
    width: 1440,
    height: 1595,
    fit: "cover" as const,
  },
  {
    src: "/hero/hero-3.jpg",
    alt: "Simran Chhabra presenting a research poster",
    width: 4284,
    height: 5712,
    fit: "contain" as const,
  },
  {
    src: "/hero/hero-4.jpg",
    alt: "Simran Chhabra at the Whspr showcase, talking with visitors",
    width: 4284,
    height: 5712,
    fit: "contain" as const,
  },
];

const INTERVAL_MS = 4000;

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
          className={photo.fit === "contain" ? "object-contain" : "object-cover"}
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "rotateY(0deg)" : "rotateY(-90deg)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease-in-out",
          }}
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 628px"
          priority={i === 0}
        />
      ))}
    </div>
  );
}
