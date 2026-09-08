// GestureSketch cover (DESIGN_DOC §5 — 5:3 at 2x, 2000x1200).
//
// The old cover was a raw browser screenshot: default gray buttons, a white
// canvas, cool grays fighting the warm palette used everywhere else. This
// replaces it with the project's own idea drawn rather than photographed —
// one continuous stroke, and the tracked hand that is drawing it, pinched at
// the leading end of the line.
//
// The same artwork exists as a React component
// (components/casestudy2/gesture/GestureArtwork.tsx) for the case study hero,
// where it scales crisply and can be re-cropped. If one changes, change both.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 2000;
const H = 1200;

const CREAM = "#FAF8F5";
const TINT = "#E0F4D7"; // cardTint — sketch-line green
const GREEN = "#3E6B5A"; // project color
const GREEN_LIGHT = "#6FA98A";
const PLUM = "#7A3F5D";
const INK = "#2A1F28";

// MediaPipe's 21 hand landmarks, posed mid-pinch: thumb and index closed on
// each other, the other three fingers extended. Coordinates are wrist-at-origin,
// fingers up; the pinch contact sits at CONTACT below, and the group transform
// puts that contact on the end of the stroke.
const LM = [
  [0, 0],                                                  // 0 wrist
  [-40, -34], [-76, -90], [-96, -152], [-93, -212],        // 1-4 thumb
  [-52, -150], [-70, -196], [-88, -214], [-97, -218],      // 5-8 index
  [-14, -158], [-20, -212], [-24, -248], [-28, -282],      // 9-12 middle
  [24, -152], [24, -204], [24, -238], [24, -268],          // 13-16 ring
  [58, -138], [62, -182], [64, -210], [66, -236],          // 17-20 pinky
];
const BONES = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17],
];
const PALM = [0, 5, 9, 13, 17];
const CONTACT = [-95, -215];

// The stroke the hand is in the middle of drawing. It ends at the pinch.
const STROKE =
  "M 210 1010 C 300 700 470 520 660 600 C 830 672 800 940 950 930 C 1090 921 1060 640 1150 480";
const PINCH = [1150, 480];
const HAND_SCALE = 1.75;
const HAND_ROTATE = 14;

export function svg({ width = W, height = H } = {}) {
  const palm =
    "M " + PALM.map((i) => `${LM[i][0]} ${LM[i][1]}`).join(" L ") + " Z";
  const bones = BONES.map(
    ([a, b]) =>
      `<line x1="${LM[a][0]}" y1="${LM[a][1]}" x2="${LM[b][0]}" y2="${LM[b][1]}" />`
  ).join("");
  const joints = LM.map(([x, y], i) => {
    const pinched = i === 4 || i === 8;
    return `<circle cx="${x}" cy="${y}" r="${pinched ? 11 : 8}" fill="${
      pinched ? GREEN : INK
    }" fill-opacity="${pinched ? 1 : 0.6}" />`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="wash" cx="58%" cy="34%" r="70%">
      <stop offset="0%" stop-color="${TINT}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${CREAM}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GREEN_LIGHT}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${GREEN_LIGHT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect width="${W}" height="${H}" fill="url(#wash)"/>

  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- earlier marks, still on the canvas: nothing you draw later overwrites them -->
    <path d="M 300 400 C 400 268 600 280 630 404 C 656 512 520 552 476 462"
          stroke="${GREEN_LIGHT}" stroke-opacity="0.42" stroke-width="15"/>
    <path d="M 1620 620 C 1712 556 1790 616 1748 712"
          stroke="${PLUM}" stroke-opacity="0.45" stroke-width="13"/>

    <!-- the stroke being drawn right now -->
    <path d="${STROKE}" stroke="${GREEN}" stroke-opacity="0.13" stroke-width="48"/>
    <path d="${STROKE}" stroke="${GREEN}" stroke-width="23"/>
  </g>

  <circle cx="${PINCH[0]}" cy="${PINCH[1]}" r="165" fill="url(#halo)"/>

  <g transform="translate(${PINCH[0]} ${PINCH[1]}) rotate(${HAND_ROTATE}) scale(${HAND_SCALE}) translate(${-CONTACT[0]} ${-CONTACT[1]})">
    <path d="${palm}" fill="${INK}" fill-opacity="0.05"/>
    <g stroke="${INK}" stroke-opacity="0.34" stroke-width="5.5" stroke-linecap="round">${bones}</g>
    ${joints}
  </g>
</svg>`;
}

const markup = svg();
writeFileSync(new URL("./gesture-cover.svg", import.meta.url), markup);
await sharp(Buffer.from(markup))
  .jpeg({ quality: 92 })
  .toFile(new URL("../public/images/covers/gesture-sketch.jpg", import.meta.url).pathname);
console.log("wrote public/images/covers/gesture-sketch.jpg");
