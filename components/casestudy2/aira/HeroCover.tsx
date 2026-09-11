import { T } from "../tokens";
import { StaticScreen } from "./prototype/StaticScreen";
import { GLOBAL_CSS } from "./prototype/ui";
import { K } from "./screens/kit";

const A = T.aira;

// AIRA's cover band.
//
// Built on honeymehta.design's two hero devices rather than a third centred row of
// phones. From Tart: a soft, marbled colour field carrying the mood before any UI
// appears — here it is drawn from AIRA's four season hues rather than photographed,
// so the palette is the product's own and the file weighs nothing. From CNN: the
// phones sit asymmetric, at different scales, cropped by the band's bottom edge,
// with two UI fragments lifted out of them and floated alongside — the hero teases
// one mechanic instead of showing whole screens.
//
// The season wheel used to live here. It has moved down to §05, next to the seasons
// framing it illustrates, where it can be read as an explanation rather than as
// decoration above the title.

/** Soft overlapping washes in the season hues — the marbled field, drawn. */
function SeasonField() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          `radial-gradient(70% 90% at 12% 8%, ${A.purple}B3 0%, transparent 62%)`,
          `radial-gradient(64% 86% at 38% 88%, ${A.blue}A6 0%, transparent 60%)`,
          `radial-gradient(58% 78% at 72% 16%, ${A.green}8C 0%, transparent 58%)`,
          `radial-gradient(76% 92% at 92% 78%, ${A.coralPhase}B3 0%, transparent 64%)`,
          `radial-gradient(120% 100% at 50% 50%, ${A.coral}33 0%, transparent 70%)`,
          `linear-gradient(160deg, ${A.dark} 0%, #14121A 45%, ${A.dark} 100%)`,
        ].join(", "),
      }}
    />
  );
}

/** A grain wash. Without it the gradients band visibly on wide dark screens. */
function Grain() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.16,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

const SEASONS = [
  { name: "Winter", color: A.purple, days: 5 },
  { name: "Spring", color: A.blue, days: 8 },
  { name: "Summer", color: A.green, days: 4 },
  { name: "Autumn", color: A.coralPhase, days: 11 },
];

const PHONE_W = 232;
const PANEL_W = 212;

/**
 * A side panel. Both panels share one width, one padding, one radius and one
 * header treatment, so they read as a pair of annotations on the phones rather
 * than as stickers dropped wherever there was room.
 */
function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      style={{
        width: PANEL_W,
        background: "rgba(20, 20, 23, 0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(245, 243, 241, 0.10)",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.35)",
        fontFamily: "var(--font-body)",
        color: K.text,
      }}
    >
      <span
        style={{
          display: "block",
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: K.faint,
          marginBottom: 14,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function ReadinessPanel() {
  // Same arc geometry as the Home screen's gauge, at panel scale.
  const r = 34;
  const sweep = 0.92 * 180;
  const rad = ((180 + sweep) * Math.PI) / 180;
  const end = { x: 40 + r * Math.cos(rad), y: 40 + r * Math.sin(rad) };
  return (
    <Panel label="Readiness">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="80" height="46" viewBox="0 0 80 46" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="hero-panel-gauge" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor={K.coral} />
              <stop offset="100%" stopColor={A.green} />
            </linearGradient>
          </defs>
          <path d={`M 6 40 A ${r} ${r} 0 0 1 74 40`} stroke={K.raised} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d={`M 6 40 A ${r} ${r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`} stroke="url(#hero-panel-gauge)" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
        <span style={{ fontSize: 34, fontWeight: 600, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>92</span>
      </div>
      <p style={{ margin: "14px 0 0", fontSize: 12.5, lineHeight: 1.5, color: K.muted }}>
        Seven pillars, one number for the day.
      </p>
    </Panel>
  );
}

function SeasonPanel() {
  const total = SEASONS.reduce((n, s) => n + s.days, 0);
  return (
    <Panel label="Your season">
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {SEASONS.map((s) => (
          <i
            key={s.name}
            style={{
              display: "block",
              height: 6,
              borderRadius: 3,
              flex: s.days / total,
              background: s.color,
              opacity: s.name === "Autumn" ? 1 : 0.32,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>Autumn</span>
        <span style={{ fontSize: 12, color: K.muted }}>Day 18</span>
      </div>
      <p style={{ margin: "6px 0 0", fontSize: 12.5, lineHeight: 1.5, color: K.muted }}>
        Luteal phase. Slowing down, turning inward.
      </p>
    </Panel>
  );
}

export default function HeroCover() {
  return (
    <div
      id="aira-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: A.dark,
        paddingTop: "clamp(6rem, 4.5rem + 4vw, 8.5rem)",
      }}
    >
      <style>{GLOBAL_CSS + ".aira-screen{animation:none}"}</style>
      <SeasonField />
      <Grain />

      {/* One row on one grid: panel, two phones, panel. The phones share a width
          and a top line, stand upright, and are cropped together by the band's
          bottom edge. The panels share a width and sit on the same top line,
          level with the phones' content rather than their bezels. */}
      <div
        className="relative mx-auto flex justify-center items-start"
        style={{ maxWidth: 1000, paddingInline: 24, gap: 40, height: "clamp(300px, 32vw, 420px)" }}
      >
        <div className="hidden lg:block" style={{ paddingTop: 72 }}>
          <ReadinessPanel />
        </div>

        <div className="flex items-start" style={{ gap: 28 }}>
          <div className="hidden sm:block" style={{ width: PHONE_W, flex: "0 0 auto" }}>
            <StaticScreen width={PHONE_W} shot={{ screen: "phase", state: { phaseIdx: 3, seasons: false }, alt: "AIRA phase screen, Luteal phase" }} />
          </div>
          <div style={{ width: PHONE_W, flex: "0 0 auto" }}>
            <StaticScreen width={PHONE_W} shot={{ screen: "home", alt: "AIRA Today screen: Luteal, day 18, readiness 92" }} />
          </div>
        </div>

        <div className="hidden lg:block" style={{ paddingTop: 72 }}>
          <SeasonPanel />
        </div>
      </div>
    </div>
  );
}
