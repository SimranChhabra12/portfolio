import { K, SCREEN_W } from "./kit";
import { StatusBar, Label, Body, Card, ScreenHeader, Chip, FONT } from "./primitives";

// Activity — a logged workout read back against the current phase.
//
// Fixed from the export: the full-bleed rainbow blur is gone (it carried no
// information and imported four hues the screen had no use for), the centred wall
// of copy is now a confirmation line plus real logged values, and the closing
// footnote is a tappable row rather than a floating grey caption.
const STATS = [
  { label: "Duration", value: "32 min" },
  { label: "Avg HR", value: "128 bpm" },
  { label: "Effort", value: "Moderate" },
];

export default function ActivityScreen() {
  return (
    <div style={{ width: SCREEN_W, height: "100%", background: K.ground, position: "relative" }}>
      <StatusBar />
      <ScreenHeader title="Activity" nav />

      <div style={{ padding: `${K.space.xxl}px ${K.pagePad}px 0`, textAlign: "center" }}>
        {/* One coral mark confirms the action. No illustration doing mood work. */}
        <div
          aria-hidden
          style={{
            width: 56,
            height: 56,
            margin: "0 auto",
            borderRadius: 999,
            background: K.coralWash,
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5L9.5 18L20 6.5" stroke={K.coral} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 600,
            color: K.text,
            margin: `${K.space.lg}px 0 ${K.space.sm}px`,
          }}
        >
          Workout logged
        </p>
        <Body>Steady movement helps regulate energy and symptoms over time.</Body>
      </div>

      <div style={{ padding: `${K.space.xxl}px ${K.pagePad}px 0` }}>
        {/* Label above value, at different size and weight — the export set both
            the same, so neither read as the answer. */}
        <div
          style={{
            display: "flex",
            background: K.surface,
            borderRadius: K.radius.card,
            padding: `${K.space.lg}px 0`,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                textAlign: "center",
                borderLeft: i === 0 ? "none" : `1px solid ${K.hairline}`,
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 17,
                  fontWeight: 600,
                  color: K.text,
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.value}
              </p>
              <Label style={{ marginTop: 5 }}>{s.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `${K.space.xxl}px ${K.pagePad}px 0` }}>
        <Label style={{ marginBottom: K.space.md }}>In your luteal phase</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: K.space.md }}>
          <Card
            title="This matched your energy"
            body="Moderate effort is where luteal days tend to feel best. Nothing to adjust."
            chip="Good fit"
          />
          <Card title="See your activity history" chevron />
        </div>
      </div>

      {/* Phase marker, tied to the same hue the ring uses for luteal. Kept in flow
          under the cards it qualifies, rather than stranded at the bottom edge. */}
      <div
        style={{
          padding: `${K.space.lg}px ${K.pagePad}px`,
          display: "flex",
          alignItems: "center",
          gap: K.space.sm,
        }}
      >
        <i style={{ width: 7, height: 7, borderRadius: 999, background: K.phase.luteal, display: "block" }} />
        <Body style={{ fontSize: K.type.caption.size }}>Luteal phase · Day 18 of 28</Body>
      </div>
    </div>
  );
}
