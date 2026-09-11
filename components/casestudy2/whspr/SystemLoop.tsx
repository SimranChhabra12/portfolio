import { T } from "../tokens";

const W = T.whsprLight;

// How the system fits together. The loop sits alone at the top, since what one
// woman posts reaching the next one who searches is the whole premise. The two
// trust rules sit underneath as a matched pair, each shown as the state it
// produces rather than written in a footnote.

const label = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--t-caption)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};

// Nodes on a circle of radius 100 around (260, 150). Each label sits outside its
// node, in the direction the node faces, so no two labels compete for space.
// `ny` is the name's baseline; the note always sits 18 units under it.
const NODES = [
  { n: 1, name: "Search", note: "Find a place", cx: 260, cy: 50, lx: 260, ny: -4, anchor: "middle" },
  { n: 2, name: "Read", note: "What women said", cx: 360, cy: 150, lx: 396, ny: 146, anchor: "start" },
  { n: 3, name: "Contribute", note: "5 prompts", cx: 260, cy: 250, lx: 260, ny: 298, anchor: "middle" },
  { n: 4, name: "Surface", note: "To the next woman", cx: 160, cy: 150, lx: 124, ny: 146, anchor: "end" },
] as const;

function Loop() {
  return (
    <svg
      viewBox="0 -28 520 356"
      className="w-full max-w-[520px] mx-auto block"
      role="img"
      aria-label="A loop: search, read, contribute, surface to the next woman, and back to search"
    >
      <defs>
        <marker id="loop-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke={W.dusk400} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
        <marker id="loop-head-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke={W.amber} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>

      <g fill="none" strokeWidth="1.5" strokeLinecap="round">
        <path d="M290 58A100 100 0 0 1 352 120" stroke={W.dusk400} markerEnd="url(#loop-head)" />
        <path d="M352 180A100 100 0 0 1 290 242" stroke={W.dusk400} markerEnd="url(#loop-head)" />
        <path d="M230 242A100 100 0 0 1 168 180" stroke={W.dusk400} markerEnd="url(#loop-head)" />
        <path d="M168 120A100 100 0 0 1 230 58" stroke={W.amber} strokeDasharray="4 5" markerEnd="url(#loop-head-amber)" />
      </g>

      {NODES.map(({ n, name, note, cx, cy, lx, ny, anchor }) => {
        const last = n === 4;
        return (
          <g key={n} fontFamily="var(--font-body)">
            <circle cx={cx} cy={cy} r="22" fill={last ? W.amber : W.surface1} stroke={last ? "none" : W.textLight} strokeWidth="1.5" />
            <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fill={last ? W.surface1 : W.textLight}>
              {n}
            </text>
            <text x={lx} y={ny} textAnchor={anchor} fontSize="14" fontWeight={500} fill={last ? W.amber : W.textLight}>
              {name}
            </text>
            <text x={lx} y={ny + 18} textAnchor={anchor} fontSize="12" fill={W.dusk500}>
              {note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const rule = {
  backgroundColor: W.surface1,
  borderRadius: 14,
};

const ruleText = { fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.dusk400, lineHeight: 1.6 };

export default function SystemLoop() {
  return (
    <div
      className="w-full my-2"
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)",
      }}
    >
      <p style={{ ...label, fontSize: "var(--t-caption)", color: W.amber, marginBottom: "0.5rem" }}>How it fits together</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.dusk400, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        What one woman posts reaches the next one who searches.
      </p>

      <Loop />

      <p
        style={{
          ...label,
          color: W.dusk500,
          marginTop: "3rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(42,31,40,0.1)",
          marginBottom: "1.5rem",
        }}
      >
        Two rules that keep it honest
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 flex flex-col gap-5" style={rule}>
          <div className="flex items-end gap-2" aria-hidden="true">
            {[
              { t: "2 weeks", o: 1 },
              { t: "4 months", o: 0.55 },
              { t: "7 months", o: 0.25 },
            ].map(({ t, o }) => (
              <div key={t} className="flex-1 flex flex-col gap-2" style={{ opacity: o }}>
                <div style={{ height: 36, borderRadius: 6, backgroundColor: W.midnight }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.textLight }}>{t}</span>
              </div>
            ))}
          </div>
          <p style={ruleText}>
            <strong style={{ color: W.textLight, fontWeight: 500 }}>Old posts fade.</strong> After 6 months a post
            dims, because a bar can change a lot in a year.
          </p>
        </div>

        <div className="p-6 flex flex-col gap-5" style={rule}>
          <div className="flex items-center justify-between gap-3" aria-hidden="true" style={{ minHeight: 60 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.textLight }}>Laser Wolf</span>
            <span
              className="rounded-full"
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", padding: "3px 10px", color: W.amber, border: `1px dashed ${W.amber}` }}
            >
              Early data · 2 accounts
            </span>
          </div>
          <p style={ruleText}>
            <strong style={{ color: W.textLight, fontWeight: 500 }}>Thin places get flagged.</strong>{" "}Under 4
            accounts, a place carries a warning, so 2 people can&apos;t define it.
          </p>
        </div>
      </div>
    </div>
  );
}
