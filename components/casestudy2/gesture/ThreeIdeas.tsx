import { T } from "../tokens";

const G = T.gesture;

// The three ideas the map pointed to, one per moment in a session — and what
// actually happened to each. The status is the point of the visual: only one
// was built, one was built and then removed, one never got past scope.
const IDEAS = [
  {
    moment: "Before you begin",
    title: "Audio-visual calm",
    body: "Sound and visuals to settle you in before the canvas appears.",
    status: "Scoped, not built",
    tone: "faint",
  },
  {
    moment: "Starting",
    title: "Gesture drawing",
    body: "Draw in the air with your hand. Nothing permanent, nothing to ruin.",
    status: "Built as GestureSketch",
    tone: "built",
  },
  {
    moment: "When you're stuck",
    title: "A prompt assistant",
    body: "Gentle nudges you could take or ignore, never an instruction.",
    status: "Built, then cut",
    tone: "cut",
  },
] as const;

const TONE = {
  built: { bg: G.tint + "80", border: G.green, status: G.green },
  cut: { bg: G.plum + "10", border: G.plum + "66", status: G.plum },
  faint: { bg: "transparent", border: T.inkFaint, status: T.inkMuted },
} as const;

export default function ThreeIdeas() {
  return (
    <figure className="w-full m-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {IDEAS.map((idea) => {
        const tone = TONE[idea.tone];
        return (
          <div
            key={idea.title}
            className="flex flex-col gap-3 p-6 lg:p-7"
            style={{
              backgroundColor: tone.bg,
              border: `1px solid ${tone.border}`,
              borderRadius: T.radius.mockup,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: T.inkMuted,
              }}
            >
              {idea.moment}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: T.type.sub,
                lineHeight: 1.25,
                color: T.ink,
              }}
            >
              {idea.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                lineHeight: 1.6,
                color: T.inkMuted,
                flexGrow: 1,
              }}
            >
              {idea.body}
            </p>
            <p
              className="mt-2 pt-3"
              style={{
                borderTop: `1px solid ${T.inkFaint}`,
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: tone.status,
                textDecoration: idea.tone === "cut" ? "line-through" : undefined,
                textDecorationThickness: idea.tone === "cut" ? "1px" : undefined,
              }}
            >
              {idea.status}
            </p>
          </div>
        );
      })}
    </figure>
  );
}
