import { T } from "../tokens";

const W = T.whsprLight;

// Finding F9 in portfolio_docs/whspr-research/FINDINGS.md: every feature people
// asked for WITHOUT being prompted, counted across the ten street conversations
// and two long-form interviews.
//
// It sits in "What I'd Do Next" rather than in Research because its job is to
// justify one specific claim — that route safety outranked every feature I did
// build. That sentence was previously an assertion; this is the evidence for it.
//
// Counts are small and the chart says so. Bars are scaled against the top count
// (2), not padded to look like a survey, and the exact n is printed on each row
// so nobody reads proportion where there is only tally.

type Ask = { label: string; count: number; note?: string; built?: boolean };

const ASKS: Ask[] = [
  { label: "Getting home safely (the route, not the venue)", count: 2, note: "one called it her biggest factor" },
  { label: "Age policy: 18+ vs 21+, and filtering by it", count: 2 },
  { label: "Queer-friendliness", count: 2, note: "one long back-and-forth, one agreement" },
  { label: "Events, like karaoke night or a poetry slam", count: 2 },
  { label: "Cost and cover charge", count: 1 },
  { label: "Whether the venue confiscates pepper spray", count: 1 },
  { label: "“Will people here look out for me”", count: 1 },
];

const MAX = 2;

export default function FeatureAsks() {
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
            fontSize: "var(--t-caption)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: W.amber,
            fontFamily: "var(--font-body)",
          }}
        >
          What they asked for, unprompted
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-body)",
            color: W.dusk400,
            lineHeight: 1.6,
            maxWidth: "52ch",
          }}
        >
          Nobody was shown these or asked about them. People brought them up on their own, across
          10 street conversations and 2 long-form interviews.
        </p>
      </div>

      <ul className="flex flex-col gap-4 list-none p-0 m-0">
        {ASKS.map((a) => (
          <li key={a.label} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_180px] gap-2 sm:gap-6 items-center">
            <div className="flex flex-col gap-1 min-w-0">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.textLight, lineHeight: 1.45 }}>
                {a.label}
              </p>
              {a.note && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.dusk500, lineHeight: 1.5 }}>
                  {a.note}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Bar. Scaled against the top count, never padded to fill the track. */}
              <div
                className="flex-1 min-w-0"
                style={{ height: 10, backgroundColor: W.surface2, borderRadius: 2, overflow: "hidden" }}
              >
                <div
                  style={{
                    width: `${(a.count / MAX) * 100}%`,
                    height: "100%",
                    backgroundColor: W.amber,
                    borderRadius: 2,
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--t-body)",
                  color: W.textLight,
                  lineHeight: 1,
                  minWidth: "3.5rem",
                }}
              >
                {a.count === 1 ? "1 person" : `${a.count} people`}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p
        className="mt-8"
        style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.dusk500, lineHeight: 1.6, maxWidth: "60ch" }}
      >
        These are small numbers, and the chart doesn&apos;t pretend otherwise. The point is that
        more people brought up getting home than any feature I actually designed.
      </p>
    </div>
  );
}
