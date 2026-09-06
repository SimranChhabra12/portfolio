import { T } from "../tokens";

const W = T.whspr;

// The three features cut between v1 and v2, each paired with what replaced it,
// over a shared evidence spine. The spine is the point: the cut was made on a
// participant's argument, not on the designer's taste.

const PAIRS: { killed: string; kept: string }[] = [
  { killed: "Crime statistics and population density on search", kept: "First-hand accounts, tagged with the time of the visit" },
  { killed: "AI pose detection for verification", kept: "ID check at the door, anonymous posts, nothing stored" },
  { killed: "An LLM summarizing contributions", kept: "Patterns surfaced across posts, never a conclusion" },
];

export default function KilledKept() {
  return (
    <div
      className="w-full my-2"
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3rem)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 mb-4">
        <p
          style={{
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: W.dusk500,
            fontFamily: "var(--font-body)",
          }}
        >
          Cut after research
        </p>
        <p
          className="hidden sm:block"
          style={{
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: W.amber,
            fontFamily: "var(--font-body)",
          }}
        >
          What replaced it
        </p>
      </div>

      <div className="flex flex-col">
        {PAIRS.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 py-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: W.dusk500,
                lineHeight: 1.6,
                textDecoration: "line-through",
                textDecorationColor: W.dusk500,
              }}
            >
              {p.killed}
            </p>
            <p
              className="pl-4 sm:pl-0"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: W.textLight,
                lineHeight: 1.6,
              }}
            >
              {p.kept}
            </p>
          </div>
        ))}
      </div>

      {/* The shared reason all three were cut */}
      <div
        className="mt-8 pt-8 flex flex-col gap-4"
        style={{ borderTop: `1px solid ${W.amber}` }}
      >
        <p
          style={{
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: W.amber,
            fontFamily: "var(--font-body)",
          }}
        >
          Why, in a participant&apos;s words
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: T.type.sub,
            color: W.textLight,
            lineHeight: 1.45,
          }}
        >
          &ldquo;Not just being present in a space, but start outwardly doing things towards me.&rdquo;
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: W.dusk400, lineHeight: 1.65 }}>
          Threat is behavior directed at you — not who happens to be nearby. All three cut features
          scored places by proximity and appearance instead, which is the reading she was arguing
          against.
        </p>
      </div>
    </div>
  );
}
