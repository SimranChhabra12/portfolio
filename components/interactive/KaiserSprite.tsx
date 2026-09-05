/**
 * Kaiser — the line-art German Shepherd who trails the cursor.
 *
 * Drawn side-on facing RIGHT. KaiserCursor flips him with scaleX(-1) when he's
 * travelling left, so nothing here should assume a direction.
 *
 * Every part that animates is its own <g> with an explicit transform-origin in
 * viewBox units (`transform-box: view-box` makes those px values resolve against
 * the 64x48 coordinate system, not the element's own bbox). The keyframes that
 * drive them live in globals.css under "Kaiser" — the class names here are the
 * contract between the two files.
 *
 * Far-side legs sit at lower opacity. That one trick is doing most of the work
 * of making a six-stroke drawing read as a body with depth.
 */
export default function KaiserSprite() {
  return (
    <svg
      viewBox="0 0 64 48"
      width="56"
      height="42"
      fill="none"
      stroke="var(--ink)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Far front leg first, so the torso draws over it. */}
      <g className="k-leg k-leg-ff" opacity={0.4}>
        <path d="M41.8 28.8 L41.8 36 L43 42.6 L45.2 43.4" />
      </g>

      {/*
        Everything from the chest back lives in .k-torso, and the two FRONT legs
        deliberately don't. That split is what makes the sit work: sitting pivots
        .k-torso about the chest so the rump drops, while the front legs stay
        planted and vertical — which is what a sitting dog actually does. The hind
        legs ride inside, so their fold composes on top of the torso's rotation
        instead of fighting it.
      */}
      <g className="k-torso">
        <g className="k-leg k-leg-bf" opacity={0.4}>
          <path d="M21.6 28.8 C19.8 32.2, 20.6 35.2, 22.8 37.2 L22 42.6 L24.2 43.4" />
        </g>

        {/* Tail — hinged at the croup, bushier stroke than the rest */}
        <g className="k-tail">
          <path
            d="M13.5 26 C9 26.4, 5.4 29.6, 4 34.6 C3.4 36.8, 4.8 38.2, 6.4 37.2"
            strokeWidth={2.6}
          />
        </g>

        {/* Body. Shallow and long: the topline drops from withers to croup (the
            GSD slope), and the belly sits high so the legs read long. Deep-bodied
            is the failure mode here — it turns him into a pig. */}
        <g className="k-body">
          <path d="M40 17.6 C33 15.2, 22 17, 16.4 22.4 C13.4 24.8, 13.2 28.8, 16.2 30.6 C20.5 32, 24 30.2, 28.5 29.6 C33 29, 37.4 30.6, 40.4 29.4 C43.8 26.4, 43.6 20, 40 17.6 Z" />
        </g>

        {/* Head: neck, skull, muzzle, ears */}
        <g className="k-head">
          {/* nape and throat — the neck is a wedge, not a stick */}
          <path d="M39 19 C41.6 14.6, 44 11.4, 47 9.5" />
          <path d="M43 24 C45.6 21, 48.2 18, 50.5 16" />
          {/* skull over the stop, down the muzzle, back along the jaw */}
          <path d="M47 9.5 C50.5 8, 54.5 9.2, 56 12.2 C56.8 13.8, 59.4 14.6, 61 15.8 L60 18.4 C57.4 19.2, 54 19.2, 51.6 18.2 C50.9 17.9, 50.6 16.6, 50.5 16" />
          {/* far ear */}
          <path d="M47 9.6 L47.6 3.4 L51 8.6" opacity={0.4} />
          {/* near ear — the one that flicks */}
          <g className="k-ear">
            <path d="M51 9 L52.8 2.2 L56.4 8.6" />
          </g>
          <circle cx={54.4} cy={12.2} r={0.9} fill="var(--ink)" stroke="none" />
          <circle cx={60.4} cy={16.2} r={1.15} fill="var(--ink)" stroke="none" />
        </g>

        {/* Collar — the only colour on him, drawn across the neck */}
        <path
          className="k-collar"
          d="M44.6 13.8 C45.7 16.4, 45.9 19, 45.4 21.4"
          stroke="var(--accent)"
          strokeWidth={2.4}
        />

        <g className="k-leg k-leg-bn">
          <path d="M18.5 29 C16.6 32.4, 17.4 35.4, 19.6 37.4 L18.8 42.6 L21.2 43.4" />
        </g>
      </g>

      <g className="k-leg k-leg-fn">
        <path d="M39 29 L38.6 36 L39.8 42.6 L42.2 43.4" />
      </g>
    </svg>
  );
}
