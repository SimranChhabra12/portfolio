import { T } from "../tokens";

const W = T.whspr;

// The four design decisions, rendered as a repeating five-cell unit rather than
// a paragraph each. The point of the shape is the bottom two rows: every
// decision carries both a citation and a person. `voice.stance` flips the last
// row between evidence that supports the choice and evidence that argues
// against it — decision 4 is the one that argues against, and it should look
// different without looking like an error.

export type DecisionVoice = {
  quote: string;
  attribution: string;
  stance?: "supports" | "challenges";
};

const LABEL = {
  fontSize: "0.8125rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  color: W.dusk500,
  fontFamily: "var(--font-body)",
  lineHeight: 1.4,
};

const BODY = {
  fontFamily: "var(--font-body)",
  fontSize: "0.9375rem",
  color: W.textLight,
  lineHeight: 1.65,
};

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
      style={{ borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)" }}
    >
      <p style={LABEL}>{label}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function DecisionCard({
  index,
  choice,
  insteadOf,
  because,
  research,
  voice,
}: {
  index: number;
  choice: string;
  insteadOf: string;
  because: string;
  research?: string;
  voice?: DecisionVoice;
}) {
  const challenges = voice?.stance === "challenges";

  return (
    <div
      className="w-full my-2"
      style={{ backgroundColor: W.midnight, borderRadius: T.radius.darkBlock, overflow: "hidden" }}
    >
      {/* Index + the choice itself, given the most weight in the card */}
      <div
        className="px-6 lg:px-8 pt-7 pb-6 flex flex-col gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p style={{ ...LABEL, color: W.amber }}>Decision {index}</p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: T.type.sub,
            color: W.textLight,
            lineHeight: 1.25,
          }}
        >
          {choice}
        </p>
      </div>

      <Row label="Instead of">
        <p style={{ ...BODY, color: W.dusk400 }}>{insteadOf}</p>
      </Row>

      <Row label="Because" last={!research && !voice}>
        <p style={BODY}>{because}</p>
      </Row>

      {research && (
        <Row label="Research" last={!voice}>
          <p style={{ ...BODY, color: W.dusk400 }}>{research}</p>
        </Row>
      )}

      {voice && (
        <Row label={challenges ? "But they said" : "They said"} last>
          <div
            className="flex flex-col gap-2 pl-4"
            style={{
              borderLeft: `2px solid ${challenges ? W.dusk500 : W.amber}`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.0625rem",
                color: challenges ? W.dusk400 : W.textLight,
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
