// Design tokens for the Whspr, AIRA and GestureSketch case study pages ONLY.
// Deliberately scoped here (not in globals.css) so nothing else on the
// site — homepage, other case studies — is affected. Tweak values here.

export const T = {
  cream: "#FAF8F5",
  ink: "#2A1F28",
  inkFaint: "rgba(42, 31, 40, 0.08)", // hairlines / dividers
  inkFainter: "rgba(42, 31, 40, 0.04)", // very subtle fills
  inkMuted: "rgba(42, 31, 40, 0.6)", // captions / labels — still ink-toned, not gray

  whspr: {
    midnight: "#07080A",
    surface1: "#1A1A24",
    surface2: "#252533",
    amber: "#FF8830",
    amberDim: "#CC6F00",
    textLight: "#F4F4F8",
    dusk400: "#9292A0",
    dusk500: "#6B6B7E",
  },

  // The same keys as `whspr`, remapped for infographics sitting on cream, so a
  // component flips by swapping which set it reads. Signal Amber washes out on
  // cream (~2.3:1), so the accent is a burnt amber that holds as text (~6:1).
  whsprLight: {
    midnight: "#F2EDE6", // panel ground
    surface1: "#FFFFFF",
    surface2: "#E9E2D8",
    amber: "#B35A00",
    amberDim: "#CC6F00",
    textLight: "#2A1F28", // ink
    dusk400: "#6E6270",
    dusk500: "#7E727C",
  },

  aira: {
    dark: "#0A0A0C",
    darkAlt: "#101012",
    surface: "#1C1C1F",
    coral: "#E8845C",
    purple: "#4A3F6B", // winter
    blue: "#6B93C4", // spring
    green: "#4CA67E", // summer
    coralPhase: "#EFA07A", // autumn / luteal
    textLight: "#F5F3F1",
    textMuted: "rgba(245, 243, 241, 0.6)",
  },

  gesture: {
    green: "#3E6B5A", // project color — the drawn stroke
    greenLight: "#6FA98A",
    tint: "#E0F4D7", // sketch-line green wash
    plum: "#7A3F5D", // a second stroke's colour, and the "cut" marker
    surface: "#F0ECE6",
  },

  type: {
    // One type scale for the whole site: these now point at the globals.css tokens
    // (.t-display / .t-heading / .t-sub / .t-body / .t-caption) instead of a second set.
    hero: "var(--t-display)", // 40–84px
    section: "var(--t-page)", // 32–50px
    sub: "var(--t-sub)", // 20px
    body: "var(--t-body)", // 17px
    bodyLarge: "var(--t-sub)", // 20px
    caption: "var(--t-caption)", // 13px
  },

  space: {
    section: "clamp(5rem, 4rem + 4vw, 7.5rem)", // 80–120px
  },

  radius: {
    mockup: 14,
    darkBlock: 24,
  },

  measure: "68ch",
} as const;
