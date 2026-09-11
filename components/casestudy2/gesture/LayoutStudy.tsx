import { T } from "../tokens";

const G = T.gesture;

// Five layouts, six people, one at a time. Each sketch puts the camera window,
// the tools and the AI prompt somewhere different; what I was after was where
// people agreed, not which one they liked. Layout 5 is the one most of them
// preferred, and the one I built from.
//
// Redrawn from the paper sketches as wireframes — the originals are pencil on
// a page and unreadable at this size.
type Role = "canvas" | "tools" | "actions" | "prompt";
type Block = { x: number; y: number; w: number; h: number; role: Role };

const LAYOUTS: { n: number; blocks: Block[]; note: string; won?: boolean }[] = [
  {
    n: 1,
    note: "Tools in a left rail, prompt under the canvas",
    blocks: [
      { x: 56, y: 8, w: 136, h: 84, role: "canvas" },
      { x: 8, y: 8, w: 40, h: 114, role: "tools" },
      { x: 56, y: 98, w: 136, h: 24, role: "prompt" },
    ],
  },
  {
    n: 2,
    note: "Tools across the top, prompt in a right rail",
    blocks: [
      { x: 8, y: 26, w: 136, h: 96, role: "canvas" },
      { x: 8, y: 8, w: 184, h: 14, role: "tools" },
      { x: 152, y: 26, w: 40, h: 96, role: "prompt" },
    ],
  },
  {
    n: 3,
    note: "Everything stacked in one column beside the canvas",
    blocks: [
      { x: 8, y: 8, w: 116, h: 114, role: "canvas" },
      { x: 132, y: 8, w: 60, h: 52, role: "tools" },
      { x: 132, y: 66, w: 60, h: 56, role: "prompt" },
    ],
  },
  {
    n: 4,
    note: "Prompt floats over the canvas, tools along the bottom",
    blocks: [
      { x: 8, y: 8, w: 184, h: 88, role: "canvas" },
      { x: 118, y: 58, w: 66, h: 30, role: "prompt" },
      { x: 8, y: 102, w: 184, h: 20, role: "tools" },
    ],
  },
  {
    n: 5,
    won: true,
    note: "Biggest canvas. Colour and size together, save and clear together and far away from them, prompt on the same screen.",
    blocks: [
      { x: 8, y: 8, w: 184, h: 80, role: "canvas" },
      { x: 8, y: 96, w: 72, h: 26, role: "tools" },
      { x: 86, y: 96, w: 48, h: 26, role: "prompt" },
      { x: 140, y: 96, w: 52, h: 26, role: "actions" },
    ],
  },
];

function blockStyle(role: Role) {
  switch (role) {
    case "canvas":
      return { fill: G.tint, fillOpacity: 0.8, stroke: G.green, strokeOpacity: 0.5, dash: undefined };
    case "prompt":
      return { fill: "none", fillOpacity: 1, stroke: T.ink, strokeOpacity: 0.28, dash: "4 4" };
    case "actions":
      return { fill: G.plum, fillOpacity: 0.12, stroke: G.plum, strokeOpacity: 0.35, dash: undefined };
    default:
      return { fill: T.ink, fillOpacity: 0.06, stroke: T.ink, strokeOpacity: 0.2, dash: undefined };
  }
}

export default function LayoutStudy() {
  return (
    <figure className="w-full m-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {LAYOUTS.map((l) => (
          <div key={l.n} className="flex flex-col gap-2">
            <div
              style={{
                border: l.won ? `1.5px solid ${G.green}` : `1px solid ${T.inkFaint}`,
                borderRadius: T.radius.mockup,
                backgroundColor: l.won ? G.tint + "33" : T.cream,
                padding: 6,
              }}
            >
              <svg viewBox="0 0 200 130" style={{ display: "block", width: "100%", height: "auto" }} aria-hidden>
                {l.blocks.map((b, i) => {
                  const s = blockStyle(b.role);
                  return (
                    <rect
                      key={i}
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={b.h}
                      rx={4}
                      fill={s.fill}
                      fillOpacity={s.fillOpacity}
                      stroke={s.stroke}
                      strokeOpacity={s.strokeOpacity}
                      strokeWidth={1.5}
                      strokeDasharray={s.dash}
                    />
                  );
                })}
              </svg>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-caption)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: l.won ? G.green : T.inkMuted,
              }}
            >
              {l.won ? `Layout ${l.n} (built from this)` : `Layout ${l.n}`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {[
          { role: "canvas" as Role, label: "Camera window" },
          { role: "tools" as Role, label: "Colour + size" },
          { role: "actions" as Role, label: "Save + clear" },
          { role: "prompt" as Role, label: "AI prompt" },
        ].map(({ role, label }) => {
          const s = blockStyle(role);
          return (
            <span key={label} className="flex items-center gap-2">
              <span
                style={{
                  width: 14,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: s.fill === "none" ? "transparent" : s.fill,
                  opacity: s.fill === "none" ? 1 : s.fillOpacity,
                  border: `1px ${s.dash ? "dashed" : "solid"} ${s.stroke}`,
                }}
              />
              <span
                style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: T.inkMuted }}
              >
                {label}
              </span>
            </span>
          );
        })}
      </div>
    </figure>
  );
}
