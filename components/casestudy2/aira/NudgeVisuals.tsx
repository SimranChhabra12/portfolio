import { T } from "../tokens";
import { Mascot } from "./prototype/ui";

// The prototype's dark neutrals, spelled out here rather than imported: ui.tsx is
// a client module, and plain values imported from one into this server component
// arrive empty (only components cross that boundary), which silently dropped
// every colour that referenced them.
const C = {
  text: "#F5F3F1",
  muted: "rgba(245, 243, 241, 0.62)",
  faint: "rgba(245, 243, 241, 0.40)",
  card: "#16161A",
};

// The Nudges figure: a lock-screen notification and a home-screen widget, both
// drawn in code on one shared device frame and wallpaper, so the pair reads as
// one phone on one day. Both use the prototype's dark palette and chassis, so
// they match every other AIRA screen on the page.
//
// The widget used to be a Figma export reading "Calories Left 630Kcal" — a
// countdown number, which is exactly what Decision 03 argues against. It shows
// where you are in the cycle in the prototype's own season copy, with nothing to
// fall short of. The lock screen was a Figma export too, on a different device
// frame and dated Dec 10; it now sits on the case study's own day (Thursday,
// December 21, luteal day 18) at 3:12, the afternoon dip the nudges are timed
// for. Surrounding icons are deliberately blank so the figure doesn't borrow any
// real app's branding.

// Same proportions as the 1308x2664 device exports these replaced.
const OUTER_W = 1308 / 3;
const OUTER_H = 2664 / 3;
const BEZEL = 14;
const SCREEN_W = OUTER_W - BEZEL * 2;
const SCREEN_H = OUTER_H - BEZEL * 2;
const INK = C.text;
const FONT = "var(--font-body), system-ui, sans-serif";

const WALLPAPER =
  "radial-gradient(120% 70% at 30% 18%, #3A2A24 0%, #1A1416 45%, #0A0A0C 78%)";

function Blank({ size = 62 }: { size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: 15, background: "rgba(245,243,241,0.08)" }} />;
}

/** One chassis, wallpaper and Dynamic Island for both phones, scaled from the width prop. */
function DeviceFrame({ width, label, children }: { width: number; label: string; children: React.ReactNode }) {
  const scale = width / OUTER_W;
  return (
    <div role="img" aria-label={label} style={{ width, height: OUTER_H * scale, maxWidth: "100%" }}>
      <div
        style={{
          width: OUTER_W, height: OUTER_H, transform: `scale(${scale})`, transformOrigin: "top left",
          background: "#141416", borderRadius: 66, padding: BEZEL, boxSizing: "border-box",
          boxShadow: "0 0 0 1.5px #2A2A2E, 0 30px 60px -20px rgba(42,31,40,0.45)",
        }}
      >
        <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 52, overflow: "hidden", background: WALLPAPER, fontFamily: FONT }}>
          <div aria-hidden style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 118, height: 34, borderRadius: 20, background: "#000", zIndex: 2 }} />
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Solid-ish card rather than a blurred one: backdrop blur drops out under the
 * scale transform the frame uses, and the notifications have to stay readable.
 */
function Notification({ time, text }: { time: string; text: string }) {
  return (
    <div style={{ background: "rgba(31,31,36,0.9)", borderRadius: 22, padding: "12px 14px 13px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Mascot size={22} mood="happy" />
        </span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", color: C.muted }}>AIRA</span>
        <span style={{ fontSize: 12, color: C.faint }}>{time}</span>
      </div>
      <p style={{ margin: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.3, color: INK }}>{text}</p>
    </div>
  );
}

function LockPhone({ width }: { width: number }) {
  return (
    <DeviceFrame
      width={width}
      label="Lock screen, Thursday December 21 at 3:12, with two AIRA notifications: a gentle check-in, and encouragement after movement"
    >
      <p style={{ position: "absolute", top: 70, left: 0, right: 0, margin: 0, textAlign: "center", fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
        Thursday, December 21
      </p>
      <p style={{ position: "absolute", top: 92, left: 0, right: 0, margin: 0, textAlign: "center", fontSize: 96, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff" }}>
        3:12
      </p>
      <div style={{ position: "absolute", top: 262, left: 14, right: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <Notification time="now" text="A little reflection can go a long way. Want to check in?" />
        <Notification time="2h ago" text="Nice work getting some movement. Your hormones love steady routines." />
      </div>
      {/* Flashlight and camera slots, blank like the widget's icons */}
      <div aria-hidden style={{ position: "absolute", bottom: 34, left: 40, width: 50, height: 50, borderRadius: 999, background: "rgba(245,243,241,0.12)" }} />
      <div aria-hidden style={{ position: "absolute", bottom: 34, right: 40, width: 50, height: 50, borderRadius: 999, background: "rgba(245,243,241,0.12)" }} />
    </DeviceFrame>
  );
}

function WidgetPhone({ width }: { width: number }) {
  return (
    <DeviceFrame width={width} label="Home-screen widget: AIRA mascot, Autumn, day 18, slowing down, turning inward">
      <p style={{ position: "absolute", top: 22, left: 40, margin: 0, fontSize: 16, fontWeight: 600, color: "#fff" }}>9:41</p>

      {/* The AIRA widget */}
      <div style={{ position: "absolute", top: 92, left: 26, width: 172, height: 172, borderRadius: 26, background: C.card, padding: "14px 16px", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ marginLeft: -6 }}><Mascot size={72} mood="calm" /></div>
        <p style={{ margin: "auto 0 2px", fontSize: 13, fontWeight: 600, color: T.aira.coral }}>Autumn · Day 18</p>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.25, color: INK }}>Slowing down, turning inward.</p>
      </div>
      <p style={{ position: "absolute", top: 272, left: 26, width: 172, margin: 0, textAlign: "center", fontSize: 12, color: "#fff" }}>AIRA</p>

      {/* Neutral filler: a second widget slot and icon rows */}
      <div style={{ position: "absolute", top: 92, right: 26, width: 172, height: 172, borderRadius: 26, background: "rgba(245,243,241,0.08)" }} />
      <div style={{ position: "absolute", top: 318, left: 34, right: 34, display: "grid", gridTemplateColumns: "repeat(4, 62px)", justifyContent: "space-between", rowGap: 30 }}>
        {Array.from({ length: 8 }, (_, i) => <Blank key={i} />)}
      </div>
      <div style={{ position: "absolute", bottom: 18, left: 14, right: 14, height: 88, borderRadius: 34, background: "rgba(245,243,241,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        {Array.from({ length: 4 }, (_, i) => <Blank key={i} />)}
      </div>
    </DeviceFrame>
  );
}

export default function NudgeVisuals({ pairWidth, headline, caption }: { pairWidth: number; headline?: string; caption?: string }) {
  const label = { fontSize: T.type.caption, color: T.inkMuted, fontFamily: "var(--font-body)", lineHeight: 1.5 };
  return (
    <div className="w-full flex flex-col gap-6 items-start">
      {(headline || caption) && (
        <div className="flex flex-col gap-1.5">
          {headline && <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: T.type.sub, color: T.ink, lineHeight: 1.3 }}>{headline}</h4>}
          {caption && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: T.inkMuted, lineHeight: 1.5, maxWidth: "60ch" }}>{caption}</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-8 items-start w-full">
        <figure className="flex flex-col gap-3 m-0" style={{ width: pairWidth, maxWidth: "100%" }}>
          <LockPhone width={pairWidth} />
          <figcaption style={label}>Lock-screen nudge</figcaption>
        </figure>
        <figure className="flex flex-col gap-3 m-0" style={{ width: pairWidth, maxWidth: "100%" }}>
          <WidgetPhone width={pairWidth} />
          <figcaption style={label}>Home-screen widget</figcaption>
        </figure>
      </div>
    </div>
  );
}
