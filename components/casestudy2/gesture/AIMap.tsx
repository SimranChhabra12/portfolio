import { T } from "../tokens";

const G = T.gesture;

// The map I drew before designing anything: every moment in a session placed on
// two axes — how mechanical or personal it is, and how much it should lean on
// AI. The split is the whole argument of the project: hand off the friction,
// protect the meaning.
//
// x: 0 = mechanical, 100 = personal.  y: 0 = lean on AI, 100 = stays human.
const MOMENTS = [
  { x: 9, y: 18, label: "Getting started", band: "ai" },
  { x: 26, y: 30, label: "Loosening up", band: "ai" },
  { x: 13, y: 40, label: "The tools: colour, size, undo", band: "ai" },
  { x: 47, y: 52, label: "Prompts, if you ask for them", band: "mid" },
  { x: 74, y: 72, label: "What you choose to draw", band: "human" },
  { x: 89, y: 83, label: "What the piece is about", band: "human" },
  { x: 62, y: 87, label: "Talking about it after", band: "human" },
] as const;

const DOT: Record<string, string> = {
  ai: G.green,
  mid: G.greenLight,
  human: G.plum,
};

function AxisLabel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--t-caption)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: T.inkMuted,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default function AIMap() {
  return (
    <figure className="w-full m-0">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16 / 11",
          minHeight: 320,
          border: `1px solid ${T.inkFaint}`,
          borderRadius: T.radius.darkBlock,
          backgroundColor: T.cream,
          overflow: "hidden",
        }}
      >
        {/* quadrant grounds — the two that matter are tinted, the other two stay empty */}
        <div
          className="absolute"
          style={{ inset: "0 50% 50% 0", backgroundColor: G.tint + "66" }}
        />
        <div
          className="absolute"
          style={{ inset: "50% 0 0 50%", backgroundColor: G.plum + "12" }}
        />
        {/* axes */}
        <div className="absolute" style={{ inset: "0 auto 0 50%", width: 1, backgroundColor: T.inkFaint }} />
        <div className="absolute" style={{ inset: "50% 0 auto 0", height: 1, backgroundColor: T.inkFaint }} />

        {/* quadrant names */}
        <p
          className="absolute"
          style={{
            top: "7%",
            left: "4%",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: T.type.sub,
            color: G.green,
          }}
        >
          Hand off the friction
        </p>
        <p
          className="absolute text-right"
          style={{
            bottom: "3%",
            right: "4%",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: T.type.sub,
            color: G.plum,
          }}
        >
          Protect the meaning
        </p>

        {/* the moments */}
        {MOMENTS.map((m) => (
          <div
            key={m.label}
            className="absolute flex items-center gap-2"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: m.x > 55 ? "translate(-100%, -50%)" : "translate(0, -50%)",
              flexDirection: m.x > 55 ? "row-reverse" : "row",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="shrink-0 rounded-full"
              style={{ width: 9, height: 9, backgroundColor: DOT[m.band] }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-caption)",
                color: T.ink,
                lineHeight: 1.3,
              }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* axis legend, outside the plot so it never collides with a label */}
      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
        <AxisLabel>↑ Lean on AI &nbsp;·&nbsp; ↓ Stays yours</AxisLabel>
        <AxisLabel>← Mechanical &nbsp;·&nbsp; Personal →</AxisLabel>
      </div>
      <figcaption
        className="mt-2"
        style={{ fontFamily: "var(--font-body)", fontSize: T.type.caption, color: T.inkMuted, lineHeight: 1.6 }}
      >
        The top-right quadrant is empty on purpose. A personal moment that leans on AI is the one
        place this can&apos;t go, because that&apos;s where the drawing would stop being yours.
      </figcaption>
    </figure>
  );
}
