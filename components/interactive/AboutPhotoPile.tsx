"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// The /about photo pile. Split out of HeroPhoto so the homepage hero (one still photo)
// can't be affected by anything here.
//
// Three rules, from Simran:
//  1. Never crop. Each photo keeps its own ratio and is scaled to fit the stage, so a
//     landscape shot shows as landscape and a portrait as portrait — nothing is forced
//     into 3:4 or rotated into another orientation.
//  2. Proportional. Every photo fits the same stage box, so they read as one set rather
//     than jumping between tiny and huge.
//  3. Fast and automatic. A new photo every ~0.9s, no pause on hover. The old HeroPhoto
//     cycled every 4s and paused whenever the cursor sat over it, which read as "not
//     switching at all". At this speed a flip animation can't finish between photos, so
//     the swap is a straight cut.
//
// To add a photo: drop it in /public/images/about/ and add a row with its real pixel size.
const photos = [
  { src: "/images/about/hero-1.jpg", alt: "Simran in NYU graduation robes and an orange dress in Washington Square Park", width: 1200, height: 1600 },
  { src: "/images/about/hero-2.jpg", alt: "Simran sitting on a lawn with Kaiser, her German Shepherd", width: 1440, height: 1640 },
  { src: "/images/about/hero-3.png", alt: "Simran coloring a car at sunset during the Roadtrip Experience project", width: 916, height: 982 },
  { src: "/images/about/hero-4.jpg", alt: "Simran in Central Park with the Midtown skyline behind her", width: 1500, height: 2000 },
  { src: "/images/about/hero-5.jpg", alt: "Simran holding puppies at an animal shelter, surrounded by dogs", width: 1440, height: 1595 },
  { src: "/images/about/hero-6.jpg", alt: "Simran at an observation deck above Manhattan", width: 2000, height: 2667 },
];

const INTERVAL_MS = 900;

export default function AboutPhotoPile() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    // Fixed stage. Photos are contained inside it, never cover-cropped.
    <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
      <div aria-hidden className="absolute inset-[6%] rotate-[-4deg] rounded-[var(--radius-card)] bg-surface" />
      <div aria-hidden className="absolute inset-[6%] rotate-[3deg] rounded-[var(--radius-card)] bg-blush/40" />

      {photos.map((p, i) => (
        <div
          key={p.src}
          className="absolute inset-0 flex items-center justify-center"
          style={{ visibility: i === index ? "visible" : "hidden" }}
          aria-hidden={i !== index}
        >
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            // Contain, not cover: the photo's own ratio decides its shape.
            className="h-auto w-auto max-h-full max-w-full rounded-[var(--radius-card)] shadow-[0_24px_48px_-16px_rgba(58,42,56,0.32)]"
            sizes="(max-width: 768px) 90vw, 420px"
            // Every photo loads up front. Lazy-loading the hidden ones is what made the
            // old switch feel slow: the next photo was still downloading when its turn came.
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
