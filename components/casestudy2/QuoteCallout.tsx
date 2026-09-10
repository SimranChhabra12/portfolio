import { T } from "./tokens";

export default function QuoteCallout({
  text,
  attribution,
  large = false,
  accent,
  scale = 1,
  italic = true,
}: {
  text: string;
  attribution?: string;
  large?: boolean;
  accent?: string;
  scale?: number;
  italic?: boolean;
}) {
  // Pull quotes run at 60% of the heading scale they used to use. At full size a
  // large quote was bigger than the section headings and read like a slide title.
  // The floor keeps a small quote from dropping below body text.
  const baseSize = large ? T.type.section : T.type.sub;
  const size = `max(${T.type.body}, calc(${baseSize} * ${0.6 * scale}))`;
  return (
    <blockquote
      className="pl-6 lg:pl-8"
      style={{ borderLeft: `2px solid ${accent ?? T.ink}` }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontStyle: italic ? "italic" : "normal",
          fontSize: size,
          lineHeight: 1.4,
          color: T.ink,
          marginBottom: attribution ? "0.75rem" : 0,
          maxWidth: "38ch",
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite
          className="not-italic block"
          style={{
            fontSize: T.type.caption,
            color: T.inkMuted,
            fontFamily: "var(--font-body)",
          }}
        >
          {attribution}
        </cite>
      )}
    </blockquote>
  );
}
