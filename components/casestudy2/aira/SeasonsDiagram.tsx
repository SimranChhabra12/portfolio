import { T } from "../tokens";

const A = T.aira;

const phases = [
  { season: "Winter", phase: "Menstrual", color: A.purple, feel: "Rest and recovery" },
  { season: "Spring", phase: "Follicular", color: A.blue, feel: "Rising energy, new ideas" },
  { season: "Summer", phase: "Ovulatory", color: A.green, feel: "High energy and clarity" },
  { season: "Autumn", phase: "Luteal", color: A.coralPhase, feel: "Slowing down, turning inward" },
];

// "Four-seasons explainer diagram — made, in AIRA palette" per the Notion
// build notes: built in code from the phase colors, not sourced.
export default function SeasonsDiagram() {
  return (
    <div
      style={{
        backgroundColor: A.dark,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3.5rem)",
      }}
    >
      <p
        className="mb-8 lg:mb-10"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: A.textMuted,
        }}
      >
        Phases → Seasons → How it feels
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        {phases.map((p) => (
          <div key={p.season} className="p-5 lg:p-6 flex flex-col gap-4" style={{ backgroundColor: A.surface }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: p.color,
                display: "block",
              }}
            />
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.25rem", color: A.textLight, lineHeight: 1.2 }}>
                {p.season}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: A.textMuted, marginTop: 2 }}>
                {p.phase}
              </p>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: A.textLight, lineHeight: 1.5, opacity: 0.85 }}>
              {p.feel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
