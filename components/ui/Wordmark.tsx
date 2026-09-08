// The name, in Gurmukhi. ONE definition, used by every header and footer signature on the
// site — the Punjabi mark had been applied to the homepage nav only, so case study pages
// and the section footers still read "Simran Chhabra" in roman and the identity changed
// depending on which page you were on. Anything that renders the name renders this.
//
// Three things travel with the glyphs and are the reason this is a component rather than a
// string constant:
//   - `font-gurmukhi-serif`. Playfair carries no Gurmukhi, so a header that sets
//     `--font-display` by hand falls back per-glyph to whatever the OS has — or tofu.
//   - `lang="pa"`, so a screen reader switches voice instead of reading Gurmukhi with an
//     English one.
//   - `aria-label`/`title` of "Simran", so the accessible name stays the roman spelling a
//     visitor searches for.
export const WORDMARK = "ਸਿਮਰਨ";
export const WORDMARK_ROMAN = "Simran";

export default function Wordmark({
  className = "",
  size = "20px",
  style,
}: {
  className?: string;
  size?: string;
  /** For callers that theme from the case study token object rather than Tailwind. */
  style?: React.CSSProperties;
}) {
  return (
    <span
      lang="pa"
      // `title` rather than `aria-label`: on a <span> inside a link the label belongs to
      // the link, and the enclosing <Link>/<span> here supplies it.
      title={WORDMARK_ROMAN}
      className={`font-gurmukhi-serif whitespace-nowrap ${className}`}
      style={{ fontSize: size, ...style }}
    >
      {WORDMARK}
    </span>
  );
}
