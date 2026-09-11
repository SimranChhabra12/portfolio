import { T } from "./tokens";

export interface HeadlineMeta {
  label: string;
  value: string;
}

/**
 * The headline unit shared by every case study: one block, the claim on the left
 * and the credits stacked on the right.
 *
 * The top of a case study still states what the product does for someone, not just
 * what it is called: "Name: claim". The name takes display size and the claim sits
 * under it at a quieter grade (2026-09-10). Both at display size was overwhelming.
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
  // "Name: what it does" is split so the name holds display size and the claim drops to
  // a quieter second line. One string at display size read as a wall of type. Both halves
  // stay inside the one <h1>, so the full line is still the page heading.
  const colon = headline.indexOf(": ");
  const name = colon === -1 ? headline : headline.slice(0, colon);
  const claim = colon === -1 ? null : headline.slice(colon + 2);

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
        <span className="block">{name}</span>
        {/* Keeps the heading's text "Name: claim" for screen readers and search. */}
        {claim && <span className="sr-only">: </span>}
        {claim && (
          <span
            className="block"
            style={{
              fontSize: "clamp(1.25rem, 1rem + 1vw, 1.75rem)",
              lineHeight: 1.35,
              opacity: 0.75,
              marginTop: "0.75rem",
            }}
          >
            {claim}
          </span>
        )}
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
