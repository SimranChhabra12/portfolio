import { T } from "../tokens";

const W = T.whsprLight;

// Three problems from the thesis interviews, each shown as a moment before a
// night out: a monoline figure, the thought going through her head, the pattern
// it stands for, and the literature it sits on. The thoughts are written, not
// quoted, so they sit in thought bubbles rather than quotation marks.

type Woman = {
  title: string;
  problem: string;
  thought: string;
  source: string;
  figure: React.ReactNode;
};

const line = {
  fill: "none",
  stroke: W.textLight,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const WOMEN: Woman[] = [
  {
    title: "A woman with curly hair looking down at her phone while messages fade away",
    problem: "The knowledge exists, and it disappears",
    thought: "Wonder if any of my friends have been here before? Let me text the chat.",
    source: "Johnson, via Betz",
    figure: (
      <>
        <g {...line}>
          <path d="M70 96C58 92 56 76 64 68 58 56 68 42 80 44 84 32 100 30 108 38 118 30 134 36 134 48 146 52 148 68 140 76 148 86 144 100 132 102" />
          <path d="M76 78C74 104 88 124 104 124 120 124 130 108 128 86" />
          <path d="M86 96q5 3 10 0M110 96q5 3 10 0M100 112q4 2 8 0" />
          <path d="M48 200C52 160 76 144 100 140 124 144 146 160 152 200" />
          <path d="M88 150l24-4 4 26-24 4z" />
          <path d="M84 172c-6-8-4-18 4-22M124 166c6-6 6-16-2-20" />
        </g>
        <circle cx="92" cy="106" r="4" fill={W.amberDim} />
        <g {...line} stroke={W.amber}>
          <path d="M146 28c8-6 22-6 30 0-2 8-12 11-20 8l-8 6z" />
          <path d="M156 62c6-4 16-4 22 0" opacity={0.55} />
          <path d="M164 82h10" opacity={0.28} />
        </g>
      </>
    ),
  },
  {
    title: "A woman with a bob pressing a hand to her forehead, eyes squeezed shut",
    problem: "Tools amplify fear, or flatten it into a score",
    thought: "Damn, Citizen makes me scared to even leave my home.",
    source: "Chordia et al., 2023",
    figure: (
      <>
        <g {...line}>
          <path d="M72 112C62 80 70 50 100 44 132 40 144 70 136 112" />
          <path d="M76 72C90 70 104 64 112 54 118 64 126 70 134 72" />
          <path d="M80 76C76 102 88 124 104 124 120 124 130 104 128 80" />
          <path d="M88 92l7 3-7 3M120 92l-7 3 7 3" />
          <path d="M98 112q3-2 6 0t6 0" />
          <path d="M42 200C46 164 70 146 96 140" />
          <path d="M162 200C170 160 162 110 144 82" />
          <path d="M144 82C132 68 110 64 98 70" />
          <path d="M102 68c-6-2-10 2-8 6M112 64c-6-3-10 1-9 5M122 64c-5-3-9 0-8 4" />
        </g>
        <circle cx="90" cy="106" r="4" fill={W.amberDim} />
        <g {...line} stroke={W.amber}>
          <path d="M36 54l10 6-8 6 10 6" />
          <path d="M30 100l12 4-10 6 12 4" />
          <path d="M178 34l-6 10 8 2-6 10" />
        </g>
      </>
    ),
  },
  {
    title: "A woman with long hair glancing back over her shoulder under a crescent moon",
    problem: "Safety depends on context: the time, the crowd, who you are",
    thought: "Is it safe to go here alone at night?",
    source: "Dubey et al., 2025",
    figure: (
      <>
        <g {...line}>
          <path d="M88 58C74 64 70 78 72 90 70 94 66 98 70 101 72 105 72 111 76 115 84 123 100 121 110 113" />
          <path d="M88 58C106 42 138 50 144 76 150 104 140 132 148 162" />
          <path d="M110 113C113 130 108 146 100 156" />
          <path d="M82 84q4-3 8 0M80 76q6-4 12-1" />
          <path d="M78 106q4 1 7-1" />
          <path d="M38 200C42 170 68 158 100 156 132 156 162 168 170 200" />
          <path d="M100 156l10 14 14-12" />
        </g>
        <circle cx="84" cy="85" r="2.2" fill={W.textLight} />
        <circle cx="84" cy="98" r="4" fill={W.amberDim} />
        <g {...line} stroke={W.amber}>
          <path d="M166 24a16 16 0 1 0 12 24 12 12 0 1 1-12-24z" />
          <path d="M30 46l5 5M22 74h7M38 24l2 6" />
        </g>
      </>
    ),
  },
];

const label = {
  fontSize: "var(--t-caption)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontFamily: "var(--font-body)",
};

export default function ThreeWomen() {
  return (
    <div
      className="w-full my-2"
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3rem)",
      }}
    >
      <div className="flex flex-col gap-2 mb-8">
        <p style={{ ...label, color: W.amber }}>Before she goes out</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.dusk400, lineHeight: 1.6 }}>
          Three patterns from the interviews, and the research behind each.
        </p>
      </div>

      {/* Each column is a subgrid over 4 shared rows (bubble, figure, problem,
          source), so the three figures line up however long each thought runs. */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:grid-rows-[repeat(4,auto)] sm:gap-x-6 sm:gap-y-0">
        {WOMEN.map((w) => (
          <figure key={w.problem} className="m-0 flex flex-col sm:grid sm:grid-rows-subgrid sm:row-span-4 sm:gap-y-0">
            {/* Thought bubble: a rounded cloud with two trailing dots down to the head */}
            <div className="relative self-start sm:self-end justify-self-start max-w-[240px] mb-1">
              <p
                className="px-4 py-3"
                style={{
                  backgroundColor: W.surface1,
                  borderRadius: 20,
                  border: "1.5px solid rgba(42,31,40,0.14)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-caption)",
                  color: W.textLight,
                  lineHeight: 1.5,
                }}
              >
                {w.thought}
              </p>
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ width: 12, height: 12, left: 44, bottom: -14, backgroundColor: W.surface1, border: "1.5px solid rgba(42,31,40,0.14)" }}
              />
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ width: 7, height: 7, left: 58, bottom: -26, backgroundColor: W.surface1, border: "1.5px solid rgba(42,31,40,0.14)" }}
              />
            </div>
            <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mt-4 mb-5" role="img" aria-label={w.title}>
              {w.figure}
            </svg>
            <p
              className="mb-3"
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", fontWeight: 500, color: W.textLight, lineHeight: 1.45 }}
            >
              {w.problem}
            </p>
            <figcaption className="mt-auto" style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.dusk500 }}>
              {w.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
