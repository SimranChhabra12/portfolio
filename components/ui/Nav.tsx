"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark, { WORDMARK_ROMAN } from "@/components/ui/Wordmark";
import { useEffect, useState } from "react";
import { T } from "@/components/casestudy2/tokens";

// One header for the whole site. This is the /work/whspr bar, generalised: a fixed,
// translucent cream strip with a hairline under it, which turns transparent with light
// type while a full-bleed dark cover is still passing under it (`coverId`). Previously
// the site carried three different headers — the sitewide one in flow, CaseStudyNav, and
// the whspr over-cover one — and they drifted from each other.
//
// Being fixed, the bar is out of flow: pages that used to stack under it carry a
// NAV_H spacer at the top of <main> so their existing rhythm is unchanged.
export const NAV_H = 66;

// `key` is what the active state is keyed on; the href depends on where you are. Work and
// Play exist twice — as sections of `/` and as their own routes — so on the homepage they
// scroll to the section (and the scroll-spy below tracks them), while everywhere else they
// go to the full route rather than bouncing the visitor back to the homepage. About is only
// ever a route, so it can never be the active item while you are on the homepage.
const LINKS = [
  { key: "work", homeHref: "/#work", href: "/work", label: "Work" },
  { key: "play", homeHref: "/#play", href: "/playground", label: "Play" },
  { key: "about", homeHref: "/about", href: "/about", label: "About" },
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

/**
 * @param coverId DOM id of a full-bleed dark cover at the top of the page. While it is
 * still under the bar the bar is transparent with light type, so the cover reads as the
 * header's own background. Omit it on pages that open on cream.
 */
export default function Nav({ coverId }: { coverId?: string } = {}) {
  const pathname = usePathname();
  const routeActive = activeFromPath(pathname);
  const isHome = routeActive === null;

  // Seeded to "work", not null: landing at `/` puts you above #work, so no section is
  // intersecting yet and the observer has nothing to say. The review asked for Work lit
  // "right off the bat", so Work is the resting state of the homepage, not an empty one.
  const [spy, setSpy] = useState<Key>("work");

  // Starts true only when there is a cover to be over, so a cream page never flashes
  // light-on-cream type before the observer's first callback.
  const [overCover, setOverCover] = useState(Boolean(coverId));

  useEffect(() => {
    if (!coverId) return;
    const el = document.getElementById(coverId);
    if (!el) return;
    // Watch the cover itself rather than doing scroll math: the bar flips the moment the
    // cover's bottom edge passes under it, at any cover height.
    const io = new IntersectionObserver(
      ([entry]) => setOverCover(entry.isIntersecting),
      { rootMargin: `-${NAV_H}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [coverId]);

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

  // Over a cover every item takes the cover's light tone — mauve/accent are cream-page
  // colours and disappear against a photograph.
  const fg = overCover ? T.whspr.textLight : T.ink;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-5"
      style={{
        backgroundColor: overCover ? "transparent" : "rgba(250, 248, 245, 0.85)",
        backdropFilter: overCover ? "none" : "blur(4px)",
        borderBottom: `1px solid ${overCover ? "transparent" : T.inkFaint}`,
        transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
        color: fg,
      }}
    >
      {/* Same shell as every page, so the wordmark sits on the content's left edge. */}
      <div className="max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)] flex items-center justify-between gap-6">
      {/* Wordmark in Gurmukhi. `lang="pa"` so a screen reader switches voice instead of
          reading Punjabi glyphs with an English one, and `aria-label` keeps the accessible
          name as the roman spelling — the link is the route home and the name a visitor
          searches for. `font-gurmukhi-serif`, not `font-serif`: Playfair has no Gurmukhi
          coverage, so the roman face would silently fall back per-glyph. */}
      <Link
        href="/"
        lang="pa"
        aria-label={WORDMARK_ROMAN}
        className="transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        style={{ fontWeight: 500, color: fg }}
      >
        <Wordmark size="1.125rem" />
      </Link>
      <div className="flex items-center gap-6 sm:gap-8">
        {LINKS.map(({ key, homeHref, href, label }) => {
          const isActive = key === active;
          const to = isHome ? homeHref : href;
          return (
            <Link
              key={key}
              href={to}
              aria-current={isActive ? "page" : undefined}
              // The underline carries the state as well as the colour does — colour alone
              // would be the only cue, and mauve→plum is a weak one at 15px (§9).
              className={`uppercase tracking-[0.08em] transition-colors underline-offset-[6px] decoration-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                isActive ? "underline" : "no-underline"
              }`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                color: fg,
                opacity: isActive ? 1 : 0.7,
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
      </div>
    </nav>
  );
}
