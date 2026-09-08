import type { ReactNode } from "react";

/**
 * Full-bleed cover band at the very top of a case study, sitting behind the fixed
 * nav so the nav reads as the band's own header.
 *
 * This owns the shared part of the format — the id the Nav watches, the padding
 * that clears the nav, the horizontal crop — and nothing else. Each project fills
 * it differently: Whspr's three phones on midnight, AIRA's textured field, Resy's
 * prototype screens. The format is shared; the image is not. Both references the
 * portfolio is calibrated against do the same (Honey Mehta's CNN and Tart heroes
 * share a shape and nothing else), and five case studies that open identically
 * read as a template rather than a body of work.
 *
 * `id` must match the `coverId` passed to <Nav>, which is what flips the bar to
 * light type while the band is still underneath it.
 */
export default function CoverBand({
  id,
  background,
  children,
  paddingTop = "clamp(6rem, 4.5rem + 4vw, 8rem)",
  paddingBottom = "clamp(3rem, 2rem + 3vw, 4.5rem)",
}: {
  id: string;
  /** Any CSS background — the band's ground, in the project's own palette. */
  background: string;
  children: ReactNode;
  paddingTop?: string;
  paddingBottom?: string;
}) {
  return (
    <div
      id={id}
      className="relative w-full overflow-hidden"
      style={{ background, paddingTop, paddingBottom }}
    >
      {children}
    </div>
  );
}
