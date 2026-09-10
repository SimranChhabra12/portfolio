import { T } from "@/components/casestudy2/tokens";

const RUST = "#C4472A";

// The three survey numbers, set open on the page like the other Resy figures:
// one rule across the top, hairlines between, no boxed cells. Resy's own version
// so the shared StatRow the other case studies use stays as it is.
export default function ResearchStats({
  stats,
  label = "From the survey",
}: {
  stats: { value: string; label: string }[];
  label?: string;
}) {
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
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ borderTop: `1px solid ${T.ink}` }}
      >
        {stats.map((s, i) => (
          <div
            key={s.value}
            className={`flex flex-col gap-2 pt-6 pb-2 ${
              i === 0 ? "sm:pr-8" : "sm:px-8 sm:border-l border-t sm:border-t-0 mt-4 sm:mt-0"
            }`}
            style={{ borderColor: T.inkFaint }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: T.type.section,
                color: RUST,
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: T.ink,
                lineHeight: 1.5,
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
