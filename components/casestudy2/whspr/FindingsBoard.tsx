import { T } from "../tokens";

const W = T.whsprLight;

// Section 05 as a board rather than prose. Two of these findings contradict the
// thesis, and they are deliberately given the same size and position as the
// rest — outlined instead of filled, so they read as a different temperature
// rather than as a footnote.

type Finding = {
  count: string;
  claim: string;
  quote?: string;
  tone?: "supports" | "counter";
};

const FINDINGS: Finding[] = [
  {
    count: "6/7",
    claim: "Word of mouth decided whether they went",
    quote: "If someone I know has an opinion about it, that's the number one thing.",
  },
  {
    count: "7/7",
    claim: "No pushback on the women-only framing",
  },
  {
    count: "2/10",
    claim: "Wouldn't use it without a clear reason to choose it over reviews",
    quote: "It's nice if there's something that makes it more specific.",
    tone: "counter",
  },
  {
    count: "1/10",
    claim: "Wasn't sure she'd stop to post while out",
    quote: "I don't know how often I'm going to post.",
    tone: "counter",
  },
  {
    count: "Both",
    claim: "Long-form interviews named time of day, unprompted",
    quote: "Even just knowing what time of day a place is really, really busy.",
  },
  {
    count: "Every",
    claim: "Platform named was described as untrustworthy, not empty",
    quote: "I question the trustworthiness of Reddit users as well.",
  },
];

export default function FindingsBoard() {
  return (
    <div
      className="w-full my-2"
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3rem)",
      }}
    >
      <div className="flex flex-col gap-2 mb-8">
        <p
          style={{
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: W.amber,
            fontFamily: "var(--font-body)",
          }}
        >
          What came back
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: W.dusk400, lineHeight: 1.6 }}>
          Ten women across seven street conversations, plus two long-form interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FINDINGS.map((f, i) => {
          const counter = f.tone === "counter";
          return (
            <div
              key={i}
              className="flex flex-col gap-3 p-6"
              style={{
                backgroundColor: counter ? "transparent" : W.surface1,
                border: counter ? `1px solid ${W.amber}` : "1px solid transparent",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "2rem",
                  lineHeight: 1,
                  color: counter ? W.amber : W.textLight,
                }}
              >
                {f.count}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: W.textLight, lineHeight: 1.55 }}>
                {f.claim}
              </p>
              {f.quote && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: W.dusk400,
                    lineHeight: 1.55,
                  }}
                >
                  &ldquo;{f.quote}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p
        className="mt-6"
        style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: W.dusk500, lineHeight: 1.6 }}
      >
        Outlined cards are the findings that argued against the concept.
      </p>
    </div>
  );
}
