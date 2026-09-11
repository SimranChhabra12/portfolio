"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { KAISER_SUMMON } from "./KaiserCursor";

// The /about photo pile. Split out of HeroPhoto so the homepage hero (one still photo)
// can't be affected by anything here.
//
// Three rules, from Simran:
//  1. Never crop. Each photo keeps its own ratio and is scaled to fit the stage, so a
//     landscape shot shows as landscape and a portrait as portrait — nothing is forced
//     into 3:4 or rotated into another orientation.
//  2. Proportional. Every photo fits the same stage box, so they read as one set rather
//     than jumping between tiny and huge.
//  3. Fast and automatic. A new photo every ~2.5s, no pause on hover. The old HeroPhoto
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

// Kaiser's turn. "Come say hi to my baby boy, Kaiser!" fires KAISER_SUMMON; the pile
// listens for the same event (whether or not the cursor dog is on screen to answer it,
// so this works on phones too), plays his own photos quickly, then goes back to
// Simran's. The photo of the two of them stays in Simran's regular rotation instead.
// Kept in the same pile rather than a pop-up so the page doesn't grow a second thing
// to dismiss.
const kaiserPhotos = [
  { src: "/images/about/Kaiser/Kaiser-1.png", alt: "Kaiser, a German Shepherd, looking up at the camera with his tongue out", width: 1022, height: 1304 },
  { src: "/images/about/Kaiser/Kaiser-2.jpeg", alt: "Kaiser sitting outdoors in front of a stone wall", width: 1500, height: 2000 },
  { src: "/images/about/Kaiser/Kaiser-3.jpg", alt: "Kaiser sitting in an open suitcase with his head tilted", width: 1500, height: 2000 },
  { src: "/images/about/Kaiser/Kaiser-4.jpg", alt: "Kaiser lying down wearing a pair of glasses", width: 1500, height: 2000 },
];

const INTERVAL_MS = 2500;
/** Kaiser's photos go by faster than Simran's: a quick flick through, not a second slideshow. */
const KAISER_INTERVAL_MS = 1300;

type Deck = "simran" | "kaiser";

export default function AboutPhotoPile() {
  const [deck, setDeck] = useState<Deck>("simran");
  const [index, setIndex] = useState(0);
  // Where Simran's photos were when Kaiser's turn started, so they pick up there after.
  const [resumeAt, setResumeAt] = useState(0);

  // Current deck and position, readable from the event listener without making it
  // re-subscribe (or doing state updates inside another state update's updater).
  const deckRef = useRef<Deck>(deck);
  const indexRef = useRef(index);
  deckRef.current = deck;
  indexRef.current = index;

  // Any click on the link starts Kaiser's turn from his first photo.
  // Clicking again mid-turn restarts it, but keeps the original place in Simran's.
  useEffect(() => {
    const onSummon = () => {
      if (deckRef.current === "simran") setResumeAt(indexRef.current);
      setDeck("kaiser");
      setIndex(0);
    };
    window.addEventListener(KAISER_SUMMON, onSummon);
    return () => window.removeEventListener(KAISER_SUMMON, onSummon);
  }, []);

  // One timer per deck and position, restarted on every change, so the first Kaiser
  // photo gets a full interval instead of whatever was left on Simran's clock.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Under reduced motion Simran's photos stay still; Kaiser's turn still steps
    // through, because someone asked for it by clicking.
    if (reduced && deck === "simran") return;
    const id = setTimeout(() => {
      if (deck === "kaiser") {
        if (index + 1 < kaiserPhotos.length) setIndex(index + 1);
        else { setDeck("simran"); setIndex((resumeAt + 1) % photos.length); }
      } else {
        setIndex((index + 1) % photos.length);
      }
    }, deck === "kaiser" ? KAISER_INTERVAL_MS : INTERVAL_MS);
    return () => clearTimeout(id);
  }, [deck, index, resumeAt]);

  const shown = deck === "kaiser" ? kaiserPhotos[index] : photos[index];
  // Every photo is mounted once and loads up front, so switching decks is never
  // waiting on a download.
  const all = [...photos, ...kaiserPhotos];

  return (
    // Fixed stage. Photos are contained inside it, never cover-cropped.
    <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
      <div aria-hidden className="absolute inset-[6%] rotate-[-4deg] rounded-[var(--radius-card)] bg-surface" />
      <div aria-hidden className="absolute inset-[6%] rotate-[3deg] rounded-[var(--radius-card)] bg-blush/40" />

      {all.map((p) => (
        <div
          key={p.src}
          className="absolute inset-0 flex items-center justify-center"
          style={{ visibility: p === shown ? "visible" : "hidden" }}
          aria-hidden={p !== shown}
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
