import { T } from "../tokens";

const G = T.gesture;

// A small tracked hand, palm-on, with one fingertip pinched to the thumb.
// Same landmark model as the cover artwork, redrawn flat and front-facing so
// which two fingers are touching is legible at 120px.
//
// Base pose: wrist at the origin, fingers up, all extended. `pinch` bends one
// finger down to the thumb tip and marks both contacts in green.
type Finger = "index" | "ring" | "pinky";

const THUMB_TIP: [number, number] = [-86, -186];

// [mcp, pip, dip, tip] for each finger, extended.
const FINGERS: Record<Finger | "middle", [number, number][]> = {
  index: [[-52, -150], [-58, -206], [-62, -240], [-66, -272]],
  middle: [[-14, -158], [-16, -218], [-18, -254], [-20, -288]],
  ring: [[24, -152], [26, -210], [28, -244], [30, -276]],
  pinky: [[58, -138], [62, -188], [64, -218], [66, -246]],
};
// Where each finger's joints go when it curls in to meet the thumb.
const CURLED: Record<Finger, [number, number][]> = {
  index: [[-52, -150], [-66, -196], [-80, -206], [-88, -190]],
  ring: [[24, -152], [-6, -196], [-46, -206], [-80, -190]],
  pinky: [[58, -138], [16, -184], [-32, -200], [-80, -188]],
};
const THUMB: [number, number][] = [[-40, -34], [-72, -90], [-88, -142], THUMB_TIP];
const WRIST: [number, number] = [0, 0];

export default function HandGlyph({
  pinch,
  size = 150,
}: {
  pinch: Finger;
  size?: number;
}) {
  const chains: { pts: [number, number][]; live: boolean }[] = [
    { pts: [WRIST, ...THUMB], live: true },
    ...(["index", "middle", "ring", "pinky"] as const).map((f) => {
      if (f === "middle") return { pts: [WRIST, ...FINGERS.middle], live: false };
      const live = f === pinch;
      return { pts: [WRIST, ...(live ? CURLED[f] : FINGERS[f])], live };
    }),
  ];

  return (
    <svg
      viewBox="-112 -302 190 318"
      width={size}
      height={size * (318 / 190)}
      aria-hidden
      style={{ display: "block", overflow: "visible" }}
    >
      {chains.map(({ pts, live }, i) => (
        <g key={i}>
          <polyline
            points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke={live ? G.green : T.ink}
            strokeOpacity={live ? 0.7 : 0.16}
            strokeWidth={live ? 8 : 5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.slice(1).map(([x, y], j) => (
            <circle
              key={j}
              cx={x}
              cy={y}
              r={7}
              fill={live ? G.green : T.ink}
              fillOpacity={live ? 0.85 : 0.2}
            />
          ))}
        </g>
      ))}
      {/* the contact itself — the only thing at full strength */}
      <circle cx={THUMB_TIP[0]} cy={THUMB_TIP[1]} r={17} fill={G.greenLight} fillOpacity={0.28} />
      <circle cx={THUMB_TIP[0]} cy={THUMB_TIP[1]} r={9} fill={G.green} />
    </svg>
  );
}
