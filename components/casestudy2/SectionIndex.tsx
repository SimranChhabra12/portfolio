"use client";

import { useEffect, useState } from "react";
import { T } from "./tokens";

export interface IndexItem {
  id: string;
  number: string;
  label: string;
}

// Clearance below the fixed nav bar once the cover has scrolled away.
const NAV_CLEARANCE = 112;
// The h1 the index aligns to has line-height 1.15, so its glyphs start a few px
// below the element's box top; the index captions sit tighter in their line box.
// This nudge lines the first entry up with the headline's first line optically
// rather than by bounding box.
const HEADLINE_OPTICAL_NUDGE = 6;

/**
 * Persistent contents index, pinned in the page's left margin and travelling
 * with the reader. It marks where you are in a long case study and lets you
 * jump between topics without scrolling back to a menu.
 *
 * It lives outside the 1000px content column, so it only appears at 2xl and
 * up, where the margin is actually wide enough to hold it without crowding
 * the text. Below that the page is unchanged.
 *
 * Vertically it starts level with the project headline rather than immediately
 * under the cover image — sitting tight below the cover it read as a caption on
 * the image instead of a contents list for the writing. It travels with the
 * headline while that is on screen, then pins under the nav once the headline
 * scrolls away. It fades in as the headline block arrives.
 */
export default function SectionIndex({
  items,
  alignWithId,
  revealWithId,
}: {
  items: IndexItem[];
  /** Element the index's first entry lines up with — the headline block. */
  alignWithId?: string;
  /** Element whose arrival reveals the index — the headline block. */
  revealWithId?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [visible, setVisible] = useState(!revealWithId);
  const [top, setTop] = useState(NAV_CLEARANCE);

  // Track which section the reader is in, and keep the index level with the
  // headline until the nav clearance takes over. The reading line sits at 35% of
  // the viewport, so a topic lights up when it reaches reading position rather
  // than when it first peeks in.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      if (sections.length) {
        const line = window.innerHeight * 0.35;
        let current = sections[0];
        for (const el of sections) {
          if (el.getBoundingClientRect().top <= line) current = el;
        }
        setActiveId(current.id);
      }

      const headline = alignWithId ? document.getElementById(alignWithId) : null;
      const headlineTop = headline
        ? headline.getBoundingClientRect().top + HEADLINE_OPTICAL_NUDGE
        : 0;
      setTop(Math.max(NAV_CLEARANCE, headlineTop));

      // Visible from the moment the headline block enters the viewport.
      const reveal = revealWithId ? document.getElementById(revealWithId) : null;
      setVisible(!reveal || reveal.getBoundingClientRect().top < window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, alignWithId, revealWithId]);

  return (
    <nav
      aria-label="Contents"
      className="hidden 2xl:block fixed z-40"
      style={{
        left: "clamp(1.5rem, calc((100vw - var(--col-media, 1000px)) / 2 - 10.5rem), 5rem)",
        top,
        width: "9.5rem",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 250ms ease",
      }}
    >
      <ol className="flex flex-col gap-3 m-0 p-0" style={{ listStyle: "none" }}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className="flex items-baseline gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: T.type.caption,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  lineHeight: 1.4,
                  color: active ? T.ink : T.inkMuted,
                  opacity: active ? 1 : 0.7,
                  transition: "color 180ms ease, opacity 180ms ease",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 3,
                    alignSelf: "stretch",
                    flex: "0 0 3px",
                    borderRadius: 2,
                    backgroundColor: active ? T.whspr.amber : "transparent",
                    marginRight: "0.375rem",
                  }}
                />
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{item.number}</span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
