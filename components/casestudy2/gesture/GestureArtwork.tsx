import { T } from "../tokens";

const G = T.gesture;

// MediaPipe's 21 hand landmarks, posed mid-pinch: thumb and index closed on
// each other, the other three fingers extended. Wrist at the origin, fingers
// up; CONTACT is where thumb tip and index tip meet, and the group transform
// puts that point on the end of the stroke — the hand is touching the line it
// is drawing, which is the whole premise of the tool.
const LM: [number, number][] = [
  [0, 0],
  [-40, -34], [-76, -90], [-96, -152], [-93, -212],
  [-52, -150], [-70, -196], [-88, -214], [-97, -218],
  [-14, -158], [-20, -212], [-24, -248], [-28, -282],
  [24, -152], [24, -204], [24, -238], [24, -268],
  [58, -138], [62, -182], [64, -210], [66, -236],
];
const BONES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];
const PALM = [0, 5, 9, 13, 17];
const CONTACT: [number, number] = [-95, -215];

const STROKE =
  "M 210 1010 C 300 700 470 520 660 600 C 830 672 800 940 950 930 C 1090 921 1060 640 1150 480";
const PINCH: [number, number] = [1150, 480];

/**
 * The GestureSketch cover artwork: one continuous stroke and the tracked hand
 * drawing it. Replaces the raw browser screenshot that used to be the cover —
 * that was cool-gray default UI chrome sitting inside a warm site.
 *
 * The same drawing is rendered to a JPG for the project card by
 * `scripts/gen-gesture-cover.mjs`. If one changes, change both.
 */
export default function GestureArtwork({
  className,
  /**
   * The card is 5:3 and shows the whole drawing. The hero band is far wider
   * than that, so it takes a crop rather than a `slice` of the full frame —
   * sliced, the stroke's descent falls off the bottom edge and the line reads
   * as starting nowhere.
   */
  crop = "full",
}: {
  className?: string;
  crop?: "full" | "band";
}) {
  const palm = "M " + PALM.map((i) => `${LM[i][0]} ${LM[i][1]}`).join(" L ") + " Z";

  return (
    <svg
      viewBox={crop === "band" ? "0 280 2000 760" : "0 0 2000 1200"}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A single green stroke, with the tracked skeleton of a pinching hand at the end of the line — the hand is the brush."
    >
      <defs>
        <radialGradient id="gs-wash" cx="58%" cy="34%" r="70%">
          <stop offset="0%" stopColor={G.tint} stopOpacity="0.85" />
          <stop offset="100%" stopColor={T.cream} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gs-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={G.greenLight} stopOpacity="0.55" />
          <stop offset="100%" stopColor={G.greenLight} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="2000" height="1200" fill={T.cream} />
      <rect width="2000" height="1200" fill="url(#gs-wash)" />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* earlier marks, still there: nothing you draw later overwrites them */}
        <path
          d="M 300 400 C 400 268 600 280 630 404 C 656 512 520 552 476 462"
          stroke={G.greenLight}
          strokeOpacity="0.42"
          strokeWidth="15"
        />
        <path
          d="M 1620 620 C 1712 556 1790 616 1748 712"
          stroke={G.plum}
          strokeOpacity="0.45"
          strokeWidth="13"
        />
        {/* the stroke being drawn right now */}
        <path d={STROKE} stroke={G.green} strokeOpacity="0.13" strokeWidth="48" />
        <path d={STROKE} stroke={G.green} strokeWidth="23" />
      </g>

      <circle cx={PINCH[0]} cy={PINCH[1]} r="165" fill="url(#gs-halo)" />

      <g
        transform={`translate(${PINCH[0]} ${PINCH[1]}) rotate(14) scale(1.75) translate(${-CONTACT[0]} ${-CONTACT[1]})`}
      >
        <path d={palm} fill={T.ink} fillOpacity="0.05" />
        <g stroke={T.ink} strokeOpacity="0.34" strokeWidth="5.5" strokeLinecap="round">
          {BONES.map(([a, b], i) => (
            <line key={i} x1={LM[a][0]} y1={LM[a][1]} x2={LM[b][0]} y2={LM[b][1]} />
          ))}
        </g>
        {LM.map(([x, y], i) => {
          const pinched = i === 4 || i === 8;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={pinched ? 11 : 8}
              fill={pinched ? G.green : T.ink}
              fillOpacity={pinched ? 1 : 0.6}
            />
          );
        })}
      </g>
    </svg>
  );
}
