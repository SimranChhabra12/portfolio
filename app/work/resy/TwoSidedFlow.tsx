import { T } from "@/components/casestudy2/tokens";

const RUST = "#C4472A";

export interface FlowStep {
  step: string;
  note?: string;
}

// The workflow, walked from both sides at once: guest on the left, restaurant on
// the right, and what sits between them down the middle.
//
// This used to be a rounded panel (dark for the problem, grey for the fix) that
// read like a slide dropped into the page. It's now open on the cream, built from
// rules and type like the rest of the case study. The two versions differ in the
// one place that matters: the line between the sides. Today it's broken (email),
// with Celebrations it's continuous (one request in the product).
export default function TwoSidedFlow({
  label,
  guest,
  restaurant,
  middle,
  tone = "problem",
}: {
  label: string;
  guest: FlowStep[];
  restaurant: FlowStep[];
  middle: string;
  tone?: "problem" | "resolved";
}) {
  const broken = tone === "problem";
  const line = broken ? `1px dashed ${RUST}` : `1px solid ${T.ink}`;

  const column = (title: string, steps: FlowStep[]) => (
    <div className="flex flex-col min-w-0">
      <p
        className="pb-3"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "var(--t-sub)",
          color: T.ink,
          lineHeight: 1.3,
          borderBottom: `1px solid ${T.inkFaint}`,
        }}
      >
        {title}
      </p>
      <ol className="flex flex-col list-none m-0 p-0">
        {steps.map((s, i) => (
          <li
            key={i}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 py-4"
            style={{ borderBottom: `1px solid ${T.inkFaint}` }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-body)",
                color: RUST,
                lineHeight: 1.5,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1 min-w-0">
              <span
                style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: T.ink, lineHeight: 1.5 }}
              >
                {s.step}
              </span>
              {s.note && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--t-caption)",
                    color: T.inkMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {s.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <figure className="w-full m-0">
      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: T.inkMuted,
        }}
      >
        {label}
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_9.5rem_minmax(0,1fr)] gap-y-8 pt-6"
        style={{ borderTop: `1px solid ${T.ink}` }}
      >
        {column("Guest", guest)}

        {/* What sits between the two sides. A vertical line on desktop, a
            horizontal one when the columns stack. */}
        <div className="relative flex items-center justify-center py-6 md:py-0">
          <span
            aria-hidden
            className="absolute hidden md:block top-0 bottom-0 left-1/2"
            style={{ borderLeft: line }}
          />
          <span
            aria-hidden
            className="absolute md:hidden left-0 right-0 top-1/2"
            style={{ borderTop: line }}
          />
          <span
            className="relative text-center px-3 py-2"
            style={{
              backgroundColor: T.cream,
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-caption)",
              lineHeight: 1.45,
              color: broken ? RUST : T.ink,
              maxWidth: "9rem",
            }}
          >
            {middle}
          </span>
        </div>

        {column("Restaurant", restaurant)}
      </div>
    </figure>
  );
}
