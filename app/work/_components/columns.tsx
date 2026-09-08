import type { ReactNode } from "react";

// Case study layout columns — DESIGN_DOC §4.
//
// The one proportion that matters: visuals are wider than the words.
// Feature visuals run the full media column (~1000px); prose is capped at the
// text column (~640px) and shares the visuals' left edge. That lands the media
// column at ~1.56x the text column.
//
// Values come from the layout tokens in globals.css. The literal fallbacks are
// the same numbers from §4, so these render correctly on a branch that hasn't
// picked up the token block yet.
export const COL_MEDIA = "var(--col-media, 1000px)";
export const COL_TEXT = "var(--col-text, 640px)";
export const PAGE_GUTTER = "var(--page-gutter, 32px)";
export const SECTION_GAP = "var(--section-gap, clamp(4rem, 10vh, 6rem))";

/**
 * Page shell for a case study: a centred column exactly as wide as a feature
 * visual, so every block on the page shares one left edge.
 */
export function CaseStudyShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div style={{ paddingLeft: PAGE_GUTTER, paddingRight: PAGE_GUTTER }} className={className}>
      <div className="w-full min-w-0" style={{ maxWidth: COL_MEDIA, marginLeft: "auto", marginRight: "auto" }}>
        {children}
      </div>
    </div>
  );
}

/** Prose column — never the media width. A 1000px paragraph is unreadable. */
export function Prose({
  children,
  gap = "1.5rem",
}: {
  children: ReactNode;
  gap?: string;
}) {
  return (
    <div className="flex flex-col w-full min-w-0" style={{ maxWidth: COL_TEXT, gap }}>
      {children}
    </div>
  );
}

/**
 * A wide visual. Defaults to the full media column; pass `maxWidth` to cap it
 * at an asset's intrinsic width so nothing is ever upscaled.
 */
export function Media({
  children,
  maxWidth,
}: {
  children: ReactNode;
  maxWidth?: number | string;
}) {
  return (
    <div className="w-full min-w-0" style={{ maxWidth: maxWidth ?? COL_MEDIA }}>
      {children}
    </div>
  );
}
