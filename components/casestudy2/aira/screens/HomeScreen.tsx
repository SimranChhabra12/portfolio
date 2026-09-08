import { K, SCREEN_W } from "./kit";
import { StatusBar, Label, Body, Card, TabBar, FONT } from "./primitives";

// Home — one readiness score over seven pillars, then the signals that produced it.
//
// Fixed from the export: the ground is no longer pure black, the streak marker is a
// coral wash instead of a competing purple fill, the gauge's own colour is the only
// non-coral hue on the screen, and the three signal cards share one padding and one
// title/body rhythm.
const SCORE = 92;

function Gauge() {
  // 180deg arc, 220 wide. Stroke runs coral -> green so the colour itself carries
  // the reading; the number never has to be re-explained by a legend.
  const w = 220;
  const r = 96;
  const cx = w / 2;
  const cy = 104;
  const sweep = (SCORE / 100) * 180;
  const end = polar(cx, cy, r, 180 + sweep);
  const large = sweep > 180 ? 1 : 0;

  return (
    <svg width={w} height={124} viewBox={`0 0 ${w} 124`} aria-hidden style={{ display: "block" }}>
      <defs>
        <linearGradient id="aira-gauge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={K.coral} />
          <stop offset="100%" stopColor={K.phase.ovulatory} />
        </linearGradient>
      </defs>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={K.raised}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
        stroke="url(#aira-gauge)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function HomeScreen() {
  return (
    <div style={{ width: SCREEN_W, height: "100%", background: K.ground, position: "relative" }}>
      <StatusBar />

      {/* Header: title and cycle position on the left, streak on the right —
          the streak is a value marker, so it takes the coral wash, not a fill. */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: `${K.space.sm}px ${K.pagePad}px ${K.space.xl}px`,
        }}
      >
        <div>
          {/* <p>, not a heading — see the note in primitives.tsx ScreenHeader. */}
          <p
            style={{
              fontFamily: FONT,
              fontSize: K.type.screenTitle.size,
              fontWeight: K.type.screenTitle.weight,
              color: K.text,
              margin: 0,
              marginBottom: 3,
            }}
          >
            Today
          </p>
          <Body style={{ fontSize: K.type.caption.size }}>Luteal phase · Day 18</Body>
        </div>
        <span
          style={{
            fontFamily: FONT,
            fontSize: K.type.caption.size,
            fontWeight: 600,
            color: K.coral,
            background: K.coralWash,
            borderRadius: K.radius.pill,
            padding: "5px 11px",
          }}
        >
          7-day streak
        </span>
      </div>

      {/* Readiness. The metric is the largest thing on the screen; its label sits
          below it at label size, so value and label are never confusable. */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <Gauge />
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: K.type.metric.size,
              fontWeight: K.type.metric.weight,
              color: K.text,
              margin: 0,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {SCORE}
          </p>
          <Label style={{ marginTop: 6 }}>Readiness</Label>
        </div>
      </div>

      {/* Left-aligned, not centred — no ragged double edge. */}
      <div style={{ padding: `${K.space.lg}px ${K.pagePad}px ${K.space.xxl}px` }}>
        <Body>
          Your hormones are working for you today. Closing your sleep gap did most of the work.
        </Body>
      </div>

      <div style={{ padding: `0 ${K.pagePad}px` }}>
        <Label style={{ marginBottom: K.space.md }}>Today&rsquo;s signals</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: K.space.md }}>
          <Card
            title="Sleep debt"
            body="Naps aren't needed. An earlier lights-out closes the gap on its own."
            chip="1.7 h"
          />
          <Card
            title="Phase insight"
            body="Hormones are rising steadily, giving you more energy and mental clarity."
          />
          <Card
            title="Worth knowing"
            body="Gentle movement boosts insulin sensitivity — short walks count more than you think."
          />
        </div>
      </div>

      <TabBar active="Home" />
    </div>
  );
}
