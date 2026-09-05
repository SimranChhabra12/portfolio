"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Not sticky (DESIGN_DOC §6). A fixed bar over a page whose whole point is generous
// whitespace eats a strip of every viewport and forces every page to carry top padding
// that compensates for it.

// `key` is what the active state is keyed on; `href` is where the link goes. Work and Play
// are hash sections on `/`, About is its own route — so About can never be the active item
// while you are on the homepage, and the scroll-spy below only ever tracks work/play.
const LINKS = [
  { key: "work", href: "/#work", label: "Work" },
  { key: "play", href: "/#play", label: "Play" },
  { key: "about", href: "/about", label: "About" },
] as const;

type Key = (typeof LINKS)[number]["key"];

// Routes decide the active item everywhere except the homepage, where there is no path
// to read and scroll position is the only signal.
function activeFromPath(pathname: string): Key | null {
  if (pathname === "/about") return "about";
  if (pathname.startsWith("/playground")) return "play";
  if (pathname.startsWith("/work")) return "work";
  return null;
}

export default function Nav({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const routeActive = activeFromPath(pathname);
  const isHome = routeActive === null;

  // Seeded to "work", not null: landing at `/` puts you above #work, so no section is
  // intersecting yet and the observer has nothing to say. The review asked for Work lit
  // "right off the bat", so Work is the resting state of the homepage, not an empty one.
  const [spy, setSpy] = useState<Key>("work");

  useEffect(() => {
    if (!isHome) return;

    type SpyKey = "work" | "play";
    const sections = (["work", "play"] as const)
      .map((key) => ({ key, el: document.getElementById(key) }))
      .filter((s): s is { key: SpyKey; el: HTMLElement } => Boolean(s.el));
    if (sections.length === 0) return;

    // Track ratios rather than reacting to each crossing: with two tall sections the
    // "most visible one wins" reading is stable, where a last-crossing-wins rule flickers
    // whenever a boundary sits mid-viewport.
    const ratios = new Map<SpyKey, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.id as SpyKey;
          ratios.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: SpyKey = "work";
        let bestRatio = 0;
        for (const [key, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = key;
            bestRatio = ratio;
          }
        }
        // bestRatio 0 means we are above #work (hero) or below #play (footer); both
        // resolve to the seeded resting state rather than dropping the highlight.
        setSpy(bestRatio === 0 ? "work" : best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    for (const { el } of sections) observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);

  const active: Key = isHome ? spy : routeActive;

  return (
    <nav
      className={`relative z-50 flex items-center justify-between gap-6 px-[var(--page-gutter,32px)] py-5 ${
        dark ? "bg-dark-bg" : "bg-cream"
      }`}
    >
      <Link
        href="/"
        className={`font-serif text-[20px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
          dark
            ? "text-surface [@media(hover:hover)]:hover:text-mauve focus-visible:outline-mauve"
            : "text-ink [@media(hover:hover)]:hover:text-accent focus-visible:outline-accent"
        }`}
      >
        Simran Chhabra
      </Link>
      <div className="flex items-center gap-6 sm:gap-8">
        {LINKS.map(({ key, href, label }) => {
          const isActive = key === active;
          return (
            <Link
              key={key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              // The underline carries the state as well as the colour does — colour alone
              // would be the only cue, and mauve→plum is a weak one at 13px (§9).
              className={`t-caption uppercase tracking-[0.08em] transition-colors underline-offset-[6px] decoration-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                isActive ? "underline" : "no-underline"
              } ${
                dark
                  ? `${
                      isActive ? "text-surface decoration-mauve" : "text-mauve"
                    } [@media(hover:hover)]:hover:text-surface focus-visible:outline-mauve`
                  : `${
                      isActive ? "text-accent decoration-accent" : "text-mauve"
                    } [@media(hover:hover)]:hover:text-accent focus-visible:outline-accent`
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
