// AIRA UI kit — the corrected design tokens for the rebuilt app screens.
//
// These exist because the AIRA screens on this page were flat Figma exports and
// couldn't be fixed. Each value below answers a specific defect in those exports:
//
//  - ground was pure #000, so cards read as floating gray slabs with no elevation
//  - four unrelated accent families competed (purple / blue / orange / red) with
//    nothing marking what was primary
//  - two radius scales for the same interaction type (pill prompts vs 12px cards)
//  - label and value set at the same size and weight
//
// The rule that resolves most of it: coral is the ONLY interactive accent, and the
// phase hues are the ONLY other hue family — they encode cycle data and nothing else.

export const K = {
  // Elevation comes from three near-black steps, never from pure black + gray.
  ground: "#0A0A0C",
  surface: "#141417",
  raised: "#1C1C20",
  hairline: "rgba(245, 243, 241, 0.08)",

  text: "#F5F3F1",
  muted: "rgba(245, 243, 241, 0.62)",
  faint: "rgba(245, 243, 241, 0.40)",

  /** The only accent for interactive and primary state. Never decorative. */
  coral: "#E8845C",
  coralWash: "rgba(232, 132, 92, 0.16)",

  /** Cycle-phase hues. Semantic only — these never mark interactivity. */
  phase: {
    menstrual: "#4A3F6B",
    follicular: "#6B93C4",
    ovulatory: "#4CA67E",
    luteal: "#EFA07A",
  },

  // One radius scale. Cards and tappable rows share `card` because they are the
  // same interaction type; `pill` is reserved for chips and segmented controls.
  radius: { card: 14, control: 10, pill: 999 },

  // One 4pt spacing scale.
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 },
  pagePad: 20,

  // A type scale where every step has one job.
  type: {
    label: { size: 11, weight: 600, tracking: "0.08em", upper: true },
    caption: { size: 12, weight: 400 },
    body: { size: 13, weight: 400 },
    value: { size: 15, weight: 600 },
    cardTitle: { size: 15, weight: 600 },
    screenTitle: { size: 19, weight: 600 },
    metric: { size: 40, weight: 600 },
  },
} as const;

/** Logical device viewport the screens are authored at (iPhone points). */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
