import { T } from "../tokens";

// The headline unit: one block, title on the left and the credits stacked on
// the right. The top of the page states what the product does for someone,
// not what it is called.

const META: { label: string; value: string }[] = [
  { label: "Role", value: "UX Researcher • Product Strategist • Prototyping • Visual & Interaction Designer" },
  { label: "Platform", value: "Mobile Application" },
  { label: "Timeline", value: "4 months | Jan 2026 – May 2026" },
];

export default function ProjectHeadline() {
  return (
    <div
      id="whspr-headline"
      className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-x-16 gap-y-12 items-start"
    >
      {/* Left — the claim, not the name */}
      <h1
        style={{
          fontFamily: "var(--font-display), serif",
          fontWeight: 400,
          fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)",
          lineHeight: 1.15,
          color: T.ink,
          textWrap: "balance",
          margin: 0,
        }}
      >
        Whspr: Crowdsourced urban intelligence platform for women
      </h1>

      {/* Right — credits, stacked so they read as one column against the title */}
      <dl className="flex flex-col gap-8 m-0">
        {META.map((m) => (
          <div key={m.label} className="min-w-0">
            <dt
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: T.type.caption,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: T.inkMuted,
                marginBottom: "0.5rem",
              }}
            >
              {m.label}
            </dt>
            <dd
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.9375rem",
                color: T.ink,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
