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
            d="M13.5 26 C8.6 26.2, 4.6 29.4, 2.8 34.8 C1.9 37.6, 3.4 40.2, 5.8 39.4"
            strokeWidth={3.2}
          />
        </g>

        {/* Body. Shallow and long: the topline drops from withers to croup (the
            GSD slope), and the belly sits high so the legs read long. Deep-bodied
            is the failure mode here — it turns him into a pig. */}
        <g className="k-body">
          {/* The black saddle. A GSD is read from its two-tone coat before
              anything else, so this soft fill does more for the breed than any
              amount of outline fussing. Drawn first, inside the body group, so
              the outline below closes over its edges. */}
          <path
            d="M38.4 18.4 C31 16.6, 21.6 18.2, 16.6 22.6 C14.8 24.2, 14.6 26.8, 15.6 28.6
               C18.8 27.4, 22.4 28, 25.6 27.4 C29.4 26.8, 33.4 24.4, 37 25.8
               C39 23.4, 39.4 20.6, 38.4 18.4 Z"
            fill="var(--ink)"
            fillOpacity={0.26}
            stroke="none"
          />
          <path d="M40 17.6 C33 15.2, 22 17, 16.4 22.4 C13.4 24.8, 13.2 28.8, 16.2 30.6 C20.5 32, 24 30.2, 28.5 29.6 C33 29, 37.4 30.6, 40.4 29.4 C43.8 26.4, 43.6 20, 40 17.6 Z" />
        </g>

        {/* Head: neck, skull, muzzle, ears */}
        <g className="k-head">
          {/* nape and throat — the neck is a wedge, not a stick */}
          <path d="M39 19 C41.6 14.6, 44 11.4, 47 9.5" />
          <path d="M43 24 C45.6 21, 48.2 18, 50.5 16" />
          {/* skull over the stop, down the muzzle, back along the jaw */}
          <path d="M47 9.5 C50.6 7.8, 54.8 9.2, 56.2 12.4 C56.6 13.4, 59.6 14.4, 62.2 15.6 L61.2 18.6 C58 19.4, 54 19.4, 51.6 18.3 C50.9 18, 50.6 16.6, 50.5 16" />
          {/* far ear */}
          <path d="M46.6 10 L46.6 1.6 L51.2 8.4" opacity={0.4} />
          {/* near ear — the one that flicks */}
          <g className="k-ear">
            <path d="M50.4 9.8 L52.8 0.4 L57 8.8" />
          </g>
          <circle cx={54.4} cy={12.2} r={0.9} fill="var(--ink)" stroke="none" />
          <circle cx={61.5} cy={16.1} r={1.15} fill="var(--ink)" stroke="none" />
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
