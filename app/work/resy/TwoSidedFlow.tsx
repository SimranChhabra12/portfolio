import { T } from "@/components/casestudy2/tokens";

const RUST = "#C4472A";

export interface FlowStep {
  step: string;
  note?: string;
}

// The workflow, walked from both sides at once — guest on the left, restaurant
// on the right, and what sits between them in the middle.
//
// This replaces the deck slides the review flagged as a weaker medium (E5):
// the "current-state journey" and the "before / after" comparison are rebuilt
// as native blocks so they scale, reflow at 390px, and read as page content.
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
  const dark = tone === "problem";
  const bg = dark ? "#231A18" : T.inkFainter;
  const ink = dark ? "#F5F1EE" : T.ink;
  const muted = dark ? "rgba(245, 241, 238, 0.55)" : T.inkMuted;
  const rule = dark ? "rgba(245, 241, 238, 0.14)" : T.inkFaint;
  const accent = dark ? RUST : "#2E7D5B";

  const column = (title: string, steps: FlowStep[]) => (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accent,
        }}
      >
        {title}
      </p>
      <ol className="flex flex-col gap-3 list-none">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-3 items-start"
            style={{ paddingBottom: i === steps.length - 1 ? 0 : "0.75rem", borderBottom: i === steps.length - 1 ? "none" : `1px solid ${rule}` }}
          >
            <span
              className="shrink-0"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: muted,
                lineHeight: 1.7,
                minWidth: "1.25rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1 min-w-0">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: ink,
                  lineHeight: 1.5,
                }}
              >
                {s.step}
              </span>
              {s.note && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: T.type.caption,
                    color: muted,
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
    <div
      className="w-full"
      style={{
        backgroundColor: bg,
        borderRadius: T.radius.darkBlock,
        border: dark ? "none" : `1px solid ${T.inkFaint}`,
        padding: "clamp(1.5rem, 1rem + 2.5vw, 2.75rem)",
      }}
    >
      <p
        className="mb-8"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: muted,
        }}
      >
        {label}
      </p>

      <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-stretch">
        {column("Guest", guest)}

        {/* What sits between the two sides */}
        <div
          className="flex md:flex-col items-center justify-center gap-3 shrink-0 md:w-40"
          style={{
            borderTop: `1px solid ${rule}`,
            borderBottom: `1px solid ${rule}`,
            padding: "1rem 0",
          }}
        >
          <span
            aria-hidden
            style={{ color: accent, fontSize: "1.25rem", lineHeight: 1 }}
          >
            ⇄
          </span>
          <span
            className="text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.caption,
              color: ink,
              lineHeight: 1.45,
            }}
          >
            {middle}
          </span>
        </div>

        {column("Restaurant", restaurant)}
      </div>
    </div>
  );
}
