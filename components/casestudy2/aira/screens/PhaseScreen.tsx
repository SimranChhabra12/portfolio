import { K, SCREEN_W } from "./kit";
import { StatusBar, Label, Body, Card, Segmented, ScreenHeader, FONT } from "./primitives";

// Luteal phase (Autumn), day 18 — the same day the Home screen and the hero's
// season panel show, so every surface on the cover tells one story.
//
// Fixed from the export: the orphaned floating "Phases" toggle is now a labelled
// segmented control in the header stack; the dead zone between the ring and the
// prompts carries the phase legend that the ring's colours actually needed; the
// centre reads label-then-value instead of two identical lines; and the prompt rows
// take the same card radius as every other card, at one chevron weight.
const PHASES = [
  { name: "Menstrual", color: K.phase.menstrual, days: 5 },
  { name: "Follicular", color: K.phase.follicular, days: 8 },
  { name: "Ovulatory", color: K.phase.ovulatory, days: 4 },
  { name: "Luteal", color: K.phase.luteal, days: 11 },
] as const;

const TOTAL = PHASES.reduce((n, p) => n + p.days, 0);

function Ring() {
  const size = 224;
  const r = 94;
  const c = size / 2;
  const stroke = 14;
  const circ = 2 * Math.PI * r;
  const gap = 2.5; // a hair of ground between segments, so they read as distinct

  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ display: "block" }}>
      <g transform={`rotate(-90 ${c} ${c})`}>
        {PHASES.map((p) => {
          const len = (p.days / TOTAL) * circ;
          const el = (
            <circle
              key={p.name}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={stroke}
              strokeDasharray={`${Math.max(len - gap, 1)} ${circ - Math.max(len - gap, 1)}`}
              strokeDashoffset={-offset}
              // Day 1 sits at the top of the menstrual band: full opacity for the
              // active phase, the rest recede so the ring has a clear subject.
              opacity={p.name === ACTIVE ? 1 : 0.38}
            />
          );
          offset += len;
          return el;
        })}
      </g>
    </svg>
  );
}

const ACTIVE = "Luteal";

export default function PhaseScreen() {
  return (
    <div style={{ width: SCREEN_W, height: "100%", background: K.ground, position: "relative" }}>
      <StatusBar />
      <ScreenHeader title="Luteal Phase" nav />

      <div style={{ padding: `${K.space.lg}px ${K.pagePad}px 0` }}>
        <Segmented options={["Phases", "Calendar"]} active={0} />
        {/* Left-aligned: the centred version set ragged on both edges. */}
        <Body style={{ marginTop: K.space.lg }}>
          Energy is winding down. Steady movement and a little more sleep help most this week.
        </Body>
      </div>

      <div style={{ display: "flex", justifyContent: "center", position: "relative", marginTop: K.space.xl }}>
        <Ring />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
          <div>
            <Label>Cycle day 18</Label>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 600,
                color: K.text,
                margin: "6px 0 4px",
              }}
            >
              Slowing down
            </p>
            <Body style={{ fontSize: K.type.caption.size }}>Autumn · Tue, Jan 7</Body>
          </div>
        </div>
      </div>

      {/* The legend fills what used to be dead space, and is what makes the ring
          readable at all — four hues with no key is decoration, not data. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: `${K.space.sm}px ${K.space.lg}px`,
          padding: `${K.space.xl}px ${K.pagePad}px 0`,
        }}
      >
        {PHASES.map((p) => (
          <span key={p.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <i
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: p.color,
                display: "block",
                opacity: p.name === ACTIVE ? 1 : 0.5,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontSize: K.type.caption.size,
                color: p.name === ACTIVE ? K.text : K.faint,
                fontWeight: p.name === ACTIVE ? 600 : 400,
              }}
            >
              {p.name}
            </span>
          </span>
        ))}
      </div>

      {/* In flow, not pinned to the bottom edge: the export left a hole between the
          ring and these two rows that read as two stacked screens. */}
      <div style={{ padding: `${K.space.xxl}px ${K.pagePad}px 0` }}>
        <Label style={{ marginBottom: K.space.md }}>Support today</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: K.space.md }}>
          <Card title="How do you feel today?" chevron />
          <Card title="What can help this week?" chevron />
        </div>
      </div>
    </div>
  );
}
