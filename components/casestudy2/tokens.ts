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
    hero: "clamp(3.5rem, 2.6rem + 3.6vw, 4.5rem)", // 56–72px
    section: "clamp(2.25rem, 1.9rem + 1.5vw, 2.75rem)", // 36–44px
    sub: "clamp(1.375rem, 1.25rem + 0.5vw, 1.625rem)", // 22–26px
    body: "1.125rem", // 18px
    bodyLarge: "1.25rem", // 20px
    caption: "0.9375rem", // 15px
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
