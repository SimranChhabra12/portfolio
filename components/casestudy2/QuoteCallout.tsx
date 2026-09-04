import { T } from "./tokens";

export default function QuoteCallout({
  text,
  attribution,
  large = false,
  accent,
}: {
  text: string;
  attribution?: string;
  large?: boolean;
  accent?: string;
}) {
  return (
    <blockquote
      className="pl-6 lg:pl-8"
      style={{ borderLeft: `2px solid ${accent ?? T.ink}` }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: large ? T.type.section : T.type.sub,
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
