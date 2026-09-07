/**
 * The bone Kaiser is chasing.
 *
 * Drawn side-on in a 32x16 viewBox, pointing RIGHT — same convention as
 * KaiserSprite, so the two can share a flip if that's ever wanted. It rides
 * on the true pointer while Kaiser trails behind it; see KaiserCursor.
 *
 * Filled rather than pure line-art: at 22px wide an outline-only bone reads as
 * a smudge, and the fill is what makes the silhouette legible at speed.
 */
export default function BoneSprite() {
  return (
    <svg
      viewBox="0 0 32 16"
      width="24"
      height="12"
      fill="var(--cream)"
      stroke="var(--ink)"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* One path: two knobs per end joined by a waisted shaft. */}
      <path
        d="M9.4 4.2 A3.2 3.2 0 1 0 6.6 8 A3.2 3.2 0 1 0 9.4 11.8
           L22.6 11.8 A3.2 3.2 0 1 0 25.4 8 A3.2 3.2 0 1 0 22.6 4.2 Z"
      />
    </svg>
  );
}
