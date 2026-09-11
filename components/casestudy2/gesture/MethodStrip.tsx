import { T } from "../tokens";

const G = T.gesture;

// "Method strip — 7 interviews + survey, then the 3 findings as a small row."
// Left: what was actually run. Right: the three things it turned up, which all
// collapse into one shape — getting in is the hard part, not the drawing.
const METHODS = [
  { value: "7", label: "Interviews" },
  { value: "1", label: "Survey" },
  { value: "6", label: "Concept tests" },
  { value: "1", label: "Therapist review" },
];

const FINDINGS = [
  {
    heading: "Didn't know how to start",
    body: "People sat down to make something and froze before the first mark.",
  },
  {
    heading: "Afraid of being bad at it",
    body: "Worried the thing they made would be judged, or would prove they can't draw.",
  },
  {
    heading: "Didn't want anyone watching",
    body: "The younger people wanted this private, on their own time, no one in the room.",
  },
];

export default function MethodStrip() {
  return (
    <figure className="w-full m-0 flex flex-col gap-px" style={{ backgroundColor: T.inkFaint }}>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{ backgroundColor: T.inkFaint }}
      >
        {METHODS.map((m) => (
          <div
            key={m.label}
            className="flex flex-col gap-1 px-6 py-7"
            style={{ backgroundColor: T.cream }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: T.type.section,
                lineHeight: 1,
                color: G.green,
              }}
            >
              {m.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: T.inkMuted,
              }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-px"
        style={{ backgroundColor: T.inkFaint }}
      >
        {FINDINGS.map((f, i) => (
          <div
            key={f.heading}
            className="flex flex-col gap-3 px-6 py-8"
            style={{ backgroundColor: G.tint + "4D" }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                letterSpacing: "0.08em",
                color: G.green,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--t-sub)",
                lineHeight: 1.3,
                color: T.ink,
              }}
            >
              {f.heading}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                lineHeight: 1.6,
                color: T.inkMuted,
              }}
            >
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div className="px-6 py-6" style={{ backgroundColor: T.ink }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: T.type.sub,
            color: T.cream,
            lineHeight: 1.3,
          }}
        >
          All three come back to the same thing: the hardest part is starting, more than the drawing itself.
        </p>
      </div>
    </figure>
  );
}
