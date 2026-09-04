import { T } from "../tokens";

const W = T.whspr;

// "Gap diagram — remade to match the dark/amber system." Built in code per
// the Notion build notes rather than sourced from the original deck.
export default function GapDiagram() {
  return (
    <div
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3.5rem)",
      }}
    >
      <p
        className="mb-8 lg:mb-10"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: T.type.sub,
          color: W.textLight,
          lineHeight: 1.3,
        }}
      >
        &ldquo;Not another safety app.&rdquo;
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div className="p-6 lg:p-8 flex flex-col gap-4" style={{ backgroundColor: W.surface1 }}>
          <p
            style={{
              fontSize: T.type.caption,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: W.dusk400,
              fontFamily: "var(--font-body)",
            }}
          >
            Existing safety apps
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Raise the salience of threat",
              "Alert you to incidents that aren't nearby",
              "Make the city feel scarier",
            ].map((t, i) => (
              <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: W.dusk500, lineHeight: 1.6 }}>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 lg:p-8 flex flex-col gap-4" style={{ backgroundColor: W.surface2 }}>
          <p
            style={{
              fontSize: T.type.caption,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: W.dusk400,
              fontFamily: "var(--font-body)",
            }}
          >
            Whspr
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Makes existing knowledge findable",
              "First-hand context, not a threat feed",
              "A quiet resource, not an alarm",
            ].map((t, i) => (
              <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: W.textLight, lineHeight: 1.6 }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
