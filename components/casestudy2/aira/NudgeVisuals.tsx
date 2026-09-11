import Image from "next/image";
import { T } from "../tokens";
import { Mascot } from "./prototype/ui";

// The Nudges figure: the lock-screen notification export beside a home-screen
// widget drawn in code.
//
// The widget used to be a Figma export reading "Calories Left 630Kcal" — a
// countdown number, which is exactly what Decision 03 argues against. It now
// shows where you are in the cycle in the prototype's own season copy, with
// nothing to fall short of. The surrounding icons are deliberately blank so the
// figure doesn't borrow any real app's branding.

// Same proportions as the 1308x2664 device exports it sits beside.
const OUTER_W = 1308 / 3;
const OUTER_H = 2664 / 3;
const BEZEL = 14;
const SCREEN_W = OUTER_W - BEZEL * 2;
const SCREEN_H = OUTER_H - BEZEL * 2;

const WALLPAPER =
  "linear-gradient(160deg, #F7C6C0 0%, #F2A08F 32%, #B9A7B8 55%, #2E7C9A 78%, #0E3550 100%)";

function Blank({ size = 62 }: { size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: 15, background: "rgba(255,255,255,0.32)" }} />;
}

function WidgetPhone({ width }: { width: number }) {
  const scale = width / OUTER_W;
  return (
    <div role="img" aria-label="Home-screen widget: AIRA mascot, Autumn, day 18, slowing down, turning inward" style={{ width, height: OUTER_H * scale, maxWidth: "100%" }}>
      <div
        style={{
          width: OUTER_W, height: OUTER_H, transform: `scale(${scale})`, transformOrigin: "top left",
          background: "#111", borderRadius: 66, padding: BEZEL, boxSizing: "border-box",
          boxShadow: "0 0 0 5px #D4D4D8, 0 0 0 6px #B8B8BE",
        }}
      >
        <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 52, overflow: "hidden", background: WALLPAPER, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          <div aria-hidden style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 118, height: 34, borderRadius: 20, background: "#000" }} />
          <p style={{ position: "absolute", top: 22, left: 40, margin: 0, fontSize: 16, fontWeight: 600, color: "#fff" }}>9:41</p>

          {/* The AIRA widget */}
          <div style={{ position: "absolute", top: 92, left: 26, width: 172, height: 172, borderRadius: 26, background: "#fff", padding: "14px 16px", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <div style={{ marginLeft: -6 }}><Mascot size={72} mood="calm" /></div>
            <p style={{ margin: "auto 0 2px", fontSize: 13, fontWeight: 600, color: T.aira.coral }}>Autumn · Day 18</p>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.25, color: "#1C1C1F" }}>Slowing down, turning inward.</p>
          </div>
          <p style={{ position: "absolute", top: 272, left: 26, width: 172, margin: 0, textAlign: "center", fontSize: 12, color: "#fff" }}>AIRA</p>

          {/* Neutral filler: a second widget slot and icon rows */}
          <div style={{ position: "absolute", top: 92, right: 26, width: 172, height: 172, borderRadius: 26, background: "rgba(255,255,255,0.32)" }} />
          <div style={{ position: "absolute", top: 318, left: 34, right: 34, display: "grid", gridTemplateColumns: "repeat(4, 62px)", justifyContent: "space-between", rowGap: 30 }}>
            {Array.from({ length: 8 }, (_, i) => <Blank key={i} />)}
          </div>
          <div style={{ position: "absolute", bottom: 18, left: 14, right: 14, height: 88, borderRadius: 34, background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {Array.from({ length: 4 }, (_, i) => <Blank key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NudgeVisuals({ pairWidth, headline, caption }: { pairWidth: number; headline: string; caption: string }) {
  const label = { fontSize: T.type.caption, color: T.inkMuted, fontFamily: "var(--font-body)", lineHeight: 1.5 };
  return (
    <div className="w-full flex flex-col gap-6 items-start">
      <div className="flex flex-col gap-1.5">
        <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: T.type.sub, color: T.ink, lineHeight: 1.3 }}>{headline}</h4>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: T.inkMuted, lineHeight: 1.5, maxWidth: "60ch" }}>{caption}</p>
      </div>
      <div className="flex flex-wrap gap-8 items-start w-full">
        <figure className="flex flex-col gap-3 m-0" style={{ width: pairWidth, maxWidth: "100%" }}>
          <Image
            src="/projects/aira-pcos/aira/aira 3x/Notification.png"
            alt="Lock-screen nudge"
            width={1308}
            height={2664}
            style={{ width: "100%", height: "auto", display: "block" }}
            sizes={`${pairWidth}px`}
          />
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
