// Resy Celebrations UI kit — design tokens for the in-repo prototype.
//
// These replace the nine CSS custom properties the standalone Surge build had.
// Everything else in that build was a raw literal: fifteen distinct font sizes,
// spacing with no rhythm, and `rgba(51,110,222,0.18)` hand-copied into six rules.
// Porting that as-is would have frozen the inconsistency into React.
//
// Each decision below answers a specific defect in the old build:
//
//  - primary CTAs were iOS blue (#336EDE) while Resy's red appeared only on a tab
//    icon and a badge, so the whole thing read as a generic iOS demo rather than a
//    feature inside Resy. Red is now the only interactive accent.
//  - elevation came from #1C1C1E + #2C2C2E with a #38383A divider — two steps and a
//    line. Three near-black steps give cards somewhere to sit.
//  - no spacing or type scale existed at all.

export const R = {
  // Three near-black steps. Elevation is never pure black plus gray.
  ground: "#141416",
  surface: "#1E1E21",
  raised: "#26262A",
  hairline: "rgba(255, 255, 255, 0.09)",

  text: "#FFFFFF",
  muted: "rgba(255, 255, 255, 0.62)",
  faint: "rgba(255, 255, 255, 0.40)",

  /**
   * Resy red — the ONLY interactive accent. Primary buttons, active tab, selected
   * state, the Celebrations badge. Never decorative, never two accents competing.
   */
  brand: "#FE482D",
  brandWash: "rgba(254, 72, 45, 0.15)",
  brandInk: "#FFFFFF",

  /** Status hues. Semantic only — these never mark interactivity. */
  status: {
    confirmed: "#5FBF6A",
    confirmedWash: "rgba(95, 191, 106, 0.16)",
    pending: "#E0A33C",
    pendingWash: "rgba(224, 163, 60, 0.16)",
    declined: "rgba(255, 255, 255, 0.40)",
    declinedWash: "rgba(255, 255, 255, 0.08)",
  },

  // One radius scale. Cards and tappable rows share `card` (same interaction
  // type); `pill` is reserved for chips and segmented controls.
  radius: { card: 14, control: 10, pill: 999, sheet: 20 },

  // One 4pt spacing scale.
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 36 },
  pagePad: 20,

  // A type scale where every step has one job.
  type: {
    label: { size: 11, weight: 700, tracking: "0.07em" },
    caption: { size: 12, weight: 500 },
    body: { size: 14, weight: 400 },
    value: { size: 15, weight: 600 },
    cardTitle: { size: 16, weight: 700 },
    screenTitle: { size: 17, weight: 700 },
    display: { size: 30, weight: 800 },
  },

  // Chrome heights, needed by both PhoneShell and any screen that pins a CTA.
  chrome: { statusBar: 47, header: 52, tabBar: 76, cta: 88 },
} as const;

/** Logical device viewport the screens are authored at (iPhone points). */
export const SCREEN_W = 390;
export const SCREEN_H = 844;

export const FONT = "var(--font-body), system-ui, -apple-system, sans-serif";
