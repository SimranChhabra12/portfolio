import { T } from "./tokens";

export interface HeadlineMeta {
  label: string;
  value: string;
}

/**
 * The headline unit shared by every case study: one block, the claim on the left
 * and the credits stacked on the right.
 *
 * The rule this encodes — from Whspr, which set the format — is that the top of a
 * case study states what the product does for someone, not what it is called. A
 * page that opens on "AIRA" or "Resy Celebrations" has spent its largest type on
 * a word the reader can't do anything with.
 *
 * `id` is load-bearing: SectionIndex aligns its first entry to this block and
 * reveals itself when the block arrives, so every page must pass one.
 */
export default function CaseStudyHeadline({
  id,
  headline,
  meta,
}: {
  id: string;
  headline: string;
  meta: HeadlineMeta[];
}) {
  return (
    <div
      id={id}
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
        {headline}
      </h1>

      {/* Right — credits, stacked so they read as one column against the title */}
      <dl className="flex flex-col gap-8 m-0">
        {meta.map((m) => (
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
