import { T } from "../tokens";

// One figure per design decision. Deliberately not Whspr's treatment (monoline
// figures + thought bubbles on a panel): here each woman is seen in an arched
// vanity mirror filled with one of the Dream Of bottle gradients, the thought
// sits under the mirror as a line of serif italic, and there's no panel.
// The thoughts are written from what the interviews found, not quoted.

const SAGE = "#4F6B4E"; // matches DECISION_PALETTES.dreamofLight.accent
const BLUSH = "#E9B8C8"; // the pink on every Dream Of cap
const FACE = "#FBF7F2"; // skin/face fill so lines don't show the mirror through
// Pink cap fading into each bottle's colour, top to bottom.
const MIRRORS: [string, string][] = [
  ["#F8D5E1", "#D3E8F7"], // pink into sky
  ["#F8D5E1", "#DCEFD5"], // pink into mint
  ["#F8D5E1", "#E4DDF4"], // pink into lilac
];

type Woman = {
  decision: string;
  point: string;
  thought: string;
  title: string;
  figure: React.ReactNode;
};

const line = {
  fill: "none",
  stroke: T.ink,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const accent = { ...line, stroke: SAGE };

const WOMEN: Woman[] = [
  {
    decision: "Decision 1",
    point: "Before-and-afters near the top",
    thought: "I used the last one for 3 months. Nothing changed.",
    title: "A woman with her hair in a bun holding a jar, next to a calendar with three months crossed out",
    figure: (
      <>
        <g {...line}>
          {/* bun + head */}
          <circle cx="92" cy="40" r="12" />
          <path d="M70 78C70 58 82 50 96 50 112 50 122 60 122 78" />
          <path d="M72 76C70 100 82 118 96 118 110 118 122 102 120 80" />
          <path d="M84 90q4 2 8 0M102 90q4 2 8 0" />
          <path d="M92 106q4-2 8 0" />
          {/* shoulders */}
          <path d="M44 200C48 162 70 142 96 136 122 142 144 162 148 200" />
        </g>
        {/* the jar, in the brand's pink, held at the chest */}
        <rect x="80" y="152" width="32" height="28" rx="6" fill={BLUSH} stroke={T.ink} strokeWidth={2} />
        <path d="M80 161h32" stroke={T.ink} strokeWidth={2} />
        <g {...line}>
          <path d="M76 184c-6-6-6-16 4-20M116 184c6-6 6-16-4-20" />
        </g>
        {/* calendar: three months crossed out */}
        <g {...line}>
          <rect x="130" y="58" width="42" height="40" rx="4" />
          <path d="M130 69h42M139 54v8M163 54v8" />
        </g>
        <g {...accent} strokeWidth={2}>
          <path d="M135 77l7 7M142 77l-7 7" />
          <path d="M147 77l7 7M154 77l-7 7" />
          <path d="M159 77l7 7M166 77l-7 7" />
        </g>
      </>
    ),
  },
  {
    decision: "Decision 2",
    point: "Shop by what your hair is doing",
    thought: "My scalp gets flaky and my hair frizzes. Which one is for that?",
    title: "A woman with frizzy curly hair touching her head, with small flakes near her scalp",
    figure: (
      <>
        <g {...line}>
          {/* frizzy curls outline */}
          <path d="M62 96c-8-4-10-16-2-22-6-10 2-22 12-20 0-12 14-18 22-10 6-10 22-8 26 2 10-4 22 4 20 14 10 2 14 14 8 22 8 6 6 18-2 22" />
          {/* face */}
          <path d="M74 84C72 106 84 124 100 124 116 124 128 106 126 84" />
          <path d="M86 98q4 2 8 0M106 98q4 2 8 0" />
          <path d="M96 112q4 2 8 0" />
          {/* shoulders */}
          <path d="M46 200C50 164 74 146 100 142 126 146 150 164 154 200" />
          {/* hand raised to the side of her head */}
          <path d="M150 184C156 150 152 120 140 100" />
          <path d="M140 100c-2-8 4-14 10-10M146 96c0-8 8-10 12-4" />
        </g>
        {/* frizz strands + flakes */}
        <g {...accent} strokeWidth={2}>
          <path d="M40 60l-8-4M44 42l-6-8M60 30l-2-9M150 34l6-8M164 52l9-3" />
        </g>
        <g fill={SAGE}>
          <circle cx="84" cy="70" r="2" />
          <circle cx="98" cy="64" r="2" />
          <circle cx="112" cy="70" r="2" />
          <circle cx="104" cy="76" r="1.6" />
        </g>
      </>
    ),
  },
  {
    decision: "Decision 3",
    point: "Compare it to the dry shampoo you know",
    thought: "Last time it left white streaks in my hair.",
    title: "A woman with long dark hair holding an aerosol can, with a spray cloud and white streaks on her hair",
    figure: (
      <>
        <g {...line}>
          {/* long loose hair with a centre parting, open at the forehead so it
              reads as hair and not a hood */}
          <path d="M104 46C88 44 76 56 78 82 78 112 74 140 66 160 70 166 64 172 60 178" />
          <path d="M104 46C120 44 134 56 132 84 132 116 136 142 144 160 140 166 146 172 150 178" />
          <path d="M104 46C100 56 94 62 84 66M104 46C108 56 116 62 126 66" />
          <path d="M72 128c-4 14-6 26-4 38M138 128c4 14 6 26 4 38" />
          {/* face */}
          <path d="M82 82C80 106 92 122 104 122 118 122 128 106 128 84" />
          <path d="M92 96q4 2 8 0M110 96q4 2 8 0" />
          <path d="M100 110q4-2 8 0" />
          {/* shoulders */}
          <path d="M44 200C50 172 72 162 104 160 136 162 156 172 162 200" />
          {/* arm up to the can */}
          <path d="M58 194C50 182 44 172 40 162" />
        </g>
        {/* streaks the last dry shampoo left in her hair */}
        <g {...accent} strokeWidth={2.2} strokeDasharray="5 5">
          <path d="M70 118l-3 26M66 152l-2 16M136 116l3 26M140 150l2 16" />
        </g>
        {/* aerosol can: cap, nozzle, and the spray going everywhere */}
        <g {...line}>
          <rect x="28" y="114" width="22" height="46" rx="5" />
          <path d="M32 114v-8h14v8M40 106v-6h8" />
        </g>
        <g fill={SAGE}>
          <circle cx="54" cy="96" r="2.2" />
          <circle cx="62" cy="88" r="2.2" />
          <circle cx="60" cy="102" r="2" />
          <circle cx="70" cy="94" r="2" />
          <circle cx="68" cy="80" r="1.8" />
          <circle cx="76" cy="86" r="1.8" />
          <circle cx="74" cy="104" r="1.6" />
        </g>
      </>
    ),
  },
];

const label = {
  fontSize: "0.75rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontFamily: "var(--font-body)",
};

// Arched mirror, 200 wide. The figure (drawn on a 200x200 grid) is pushed down
// 44 so its head sits inside the arch, and clipped to the glass.
const ARCH = "M12 252V104A88 88 0 0 1 188 104V252Z";

export default function ThreeWomen() {
  return (
    <div className="w-full my-2 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
      {WOMEN.map((w, i) => {
        const [top, bottom] = MIRRORS[i % MIRRORS.length];
        const id = `dreamof-mirror-${i}`;
        return (
          <figure key={w.decision} className="m-0 flex flex-col gap-4 min-w-0">
            <svg viewBox="0 0 200 260" className="w-full max-w-[240px]" role="img" aria-label={w.title}>
              <defs>
                <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={top} />
                  <stop offset="1" stopColor={bottom} />
                </linearGradient>
                <clipPath id={`${id}-c`}>
                  <path d={ARCH} />
                </clipPath>
              </defs>
              <path d={ARCH} fill={`url(#${id}-g)`} />
              <g clipPath={`url(#${id}-c)`}>
                <g transform="translate(0 52)">{w.figure}</g>
              </g>
              {/* mirror frame: a thin ink arch, then a soft second line inside */}
              <path d={ARCH} fill="none" stroke={T.ink} strokeWidth={2} />
              <path d="M22 252V106A78 78 0 0 1 178 106V252" fill="none" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={1.5} />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.0625rem",
                color: T.ink,
                lineHeight: 1.45,
                maxWidth: "26ch",
              }}
            >
              {w.thought}
            </p>
            <figcaption className="flex flex-col gap-1">
              <span style={{ ...label, color: SAGE }}>{w.decision}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 500, color: T.ink, lineHeight: 1.45 }}>
                {w.point}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
