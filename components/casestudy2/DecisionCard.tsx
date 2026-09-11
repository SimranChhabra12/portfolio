import { T } from "./tokens";

// Shared decision unit for every case study.
//
// Promoted out of `whspr/DecisionCard` because it was the only one of the three
// decision treatments on the site that carried "instead of" and "because" —
// i.e. the only one that showed judgment rather than describing activity. Resy
// and GestureSketch used `Section.DecisionBlock` (index + title + body), AIRA
// used bare H3s, so the same rhetorical move looked different three times.
//
// The shape is a repeating five-cell unit rather than a paragraph. The point is
// the bottom two rows: a decision carries both a citation and a person.
// `voice.stance` flips the last row between evidence that supports the choice
// and evidence that argues against it — that second case should look different
// without looking like an error.

export type DecisionVoice = {
  quote: string;
  attribution: string;
  stance?: "supports" | "challenges";
};

export type DecisionPalette = {
  bg: string;
  accent: string;
  text: string;
  muted: string;
  label: string;
  hairline: string;
};

/**
 * One palette per project, so the card picks up the page it sits on instead of
 * dragging Whspr's midnight/amber onto four other case studies.
 */
export const DECISION_PALETTES: Record<string, DecisionPalette> = {
  whspr: {
    bg: T.whspr.midnight,
    accent: T.whspr.amber,
    text: T.whspr.textLight,
    muted: T.whspr.dusk400,
    label: T.whspr.dusk500,
    hairline: "rgba(255,255,255,0.06)",
  },
  whsprLight: {
    bg: T.whsprLight.midnight,
    accent: T.whsprLight.amber,
    text: T.whsprLight.textLight,
    muted: T.whsprLight.dusk400,
    label: T.whsprLight.dusk500,
    hairline: "rgba(42,31,40,0.08)",
  },
  aira: {
    bg: T.aira.dark,
    accent: T.aira.coral,
    text: T.aira.textLight,
    muted: T.aira.textMuted,
    label: "rgba(245, 243, 241, 0.45)",
    hairline: "rgba(255,255,255,0.07)",
  },
  resy: {
    bg: "#141416",
    accent: "#FE482D",
    text: "#FFFFFF",
    muted: "rgba(255, 255, 255, 0.62)",
    label: "rgba(255, 255, 255, 0.40)",
    hairline: "rgba(255, 255, 255, 0.09)",
  },
  dreamof: {
    bg: "#1A211A",
    accent: "#9DBE8E",
    text: "#F3F1EC",
    muted: "rgba(243, 241, 236, 0.62)",
    label: "rgba(243, 241, 236, 0.42)",
    hairline: "rgba(255,255,255,0.07)",
  },
  // Dream Of's decisions sit on the cream page (variant="notes"), so the accent
  // is a darker sage that holds up as text on cream; #9DBE8E washes out there.
  dreamofLight: {
    bg: T.cream,
    accent: "#4F6B4E",
    text: T.ink,
    muted: T.inkMuted,
    label: T.inkMuted,
    hairline: T.inkFaint,
  },
  gesture: {
    bg: "#1C2620",
    accent: T.gesture.greenLight,
    text: "#F2F0EB",
    muted: "rgba(242, 240, 235, 0.62)",
    label: "rgba(242, 240, 235, 0.42)",
    hairline: "rgba(255,255,255,0.07)",
  },
};

export default function DecisionCard({
  index,
  choice,
  insteadOf,
  because,
  research,
  voice,
  project = "whspr",
  quoteScale = 1,
  variant = "card",
}: {
  quoteScale?: number;
  variant?: "card" | "notes";
  index: number;
  choice: string;
  insteadOf: string;
  because: string;
  research?: string;
  voice?: DecisionVoice;
  project?: keyof typeof DECISION_PALETTES | string;
}) {
  const P = DECISION_PALETTES[project] ?? DECISION_PALETTES.whspr;
  const challenges = voice?.stance === "challenges";

  const LABEL = {
    fontSize: "var(--t-caption)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: P.label,
    fontFamily: "var(--font-body)",
    lineHeight: 1.4,
  };

  const BODY = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--t-body)",
    color: P.text,
    lineHeight: 1.65,
  };

  // "notes": the same content read as a designer's written decision rather than
  // a filled-in template — no panel, no label column, the rejected option struck
  // through in line.
  if (variant === "notes") {
    return (
      <div className="w-full my-2 pt-6 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4" style={{ borderTop: `1px solid ${T.ink}` }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: T.type.sub, color: P.accent, lineHeight: 1.25 }}>
          {String(index).padStart(2, "0")}
        </p>
        <div className="flex flex-col gap-3 min-w-0" style={{ maxWidth: "60ch" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: T.type.sub, color: T.ink, lineHeight: 1.25 }}>
            {choice}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: T.inkMuted, lineHeight: 1.6 }}>
            Not <span style={{ textDecoration: "line-through", textDecorationColor: P.accent }}>{insteadOf.charAt(0).toLowerCase() + insteadOf.slice(1)}</span>
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: T.ink, lineHeight: 1.7 }}>{because}</p>
          {research && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: T.inkMuted, lineHeight: 1.6 }}>
              <span style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "var(--t-caption)", marginRight: "0.5rem" }}>
                Research
              </span>
              {research}
            </p>
          )}
        </div>
      </div>
    );
  }

  function Row({
    label,
    children,
    last = false,
  }: {
    label: string;
    children: React.ReactNode;
    last?: boolean;
  }) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-2 sm:gap-8 px-6 lg:px-8 py-5"
        style={{ borderBottom: last ? "none" : `1px solid ${P.hairline}` }}
      >
        <p style={LABEL}>{label}</p>
        <div className="min-w-0">{children}</div>
      </div>
    );
  }

  return (
    <div
      className="w-full my-2"
      style={{ backgroundColor: P.bg, borderRadius: T.radius.darkBlock, overflow: "hidden" }}
    >
      {/* Index + the choice itself, given the most weight in the card */}
      <div
        className="px-6 lg:px-8 pt-7 pb-6 flex flex-col gap-3"
        style={{ borderBottom: `1px solid ${P.hairline}` }}
      >
        <p style={{ ...LABEL, color: P.accent }}>Decision {index}</p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: T.type.sub,
            color: P.text,
            lineHeight: 1.25,
          }}
        >
          {choice}
        </p>
      </div>

      <Row label="Instead of">
        <p style={{ ...BODY, color: P.muted }}>{insteadOf}</p>
      </Row>

      <Row label="Because" last={!research && !voice}>
        <p style={BODY}>{because}</p>
      </Row>

      {research && (
        <Row label="Research" last={!voice}>
          <p style={{ ...BODY, color: P.muted }}>{research}</p>
        </Row>
      )}

      {voice && (
        <Row label={challenges ? "But they said" : "They said"} last>
          <div
            className="flex flex-col gap-2 pl-4"
            style={{ borderLeft: `2px solid ${challenges ? P.label : P.accent}` }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: `calc(1.0625rem * ${quoteScale})`,
                color: challenges ? P.muted : P.text,
                lineHeight: 1.5,
              }}
            >
              &ldquo;{voice.quote}&rdquo;
            </p>
            <p style={{ ...LABEL, letterSpacing: "0.06em", textTransform: "none" }}>
              {voice.attribution}
            </p>
          </div>
        </Row>
      )}
    </div>
  );
}
