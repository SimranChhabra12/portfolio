"use client";

import { T as CS } from "../../tokens";
import { C, GLOBAL_CSS } from "./ui";
import { SCREENS, INITIAL, type AppState, type Nav } from "./AiraPrototype";

// Single prototype screens, frozen in a given state, for the case study body.
//
// The case study used to show Figma PNG exports of AIRA. These render the real
// prototype screens instead, from the same components /work/aira-pcos/prototype
// runs, so a figure can never show a version of the app the prototype has moved
// past. They are pictures of the app, not the app: inert, no pointer events.
//
// The frame deliberately doesn't reuse ui.tsx's <Device>. Device measures its
// container with a ResizeObserver, so it server-renders at full size and shrinks
// after hydration; eleven of those on one page means the page jumps. Here the
// scale is computed from the width prop, so first paint is already correct.

const noop = () => {};
const BEZEL = 12;
const SCREEN_W = 390;
const SCREEN_H = 844;
const OUTER_W = SCREEN_W + BEZEL * 2;
const OUTER_H = SCREEN_H + BEZEL * 2;

export interface ProtoShot {
  screen: keyof typeof SCREENS;
  state?: Partial<AppState>;
  alt: string;
  caption?: string;
}

export function StaticScreen({ shot, width }: { shot: ProtoShot; width: number }) {
  const Screen = SCREENS[shot.screen];
  const nav: Nav = { go: noop, back: noop, tab: noop, toast: noop, set: noop, s: { ...INITIAL, ...shot.state } };
  const scale = width / OUTER_W;

  return (
    <figure className="flex flex-col gap-3 m-0" style={{ width, maxWidth: "100%" }}>
      <div role="img" aria-label={shot.alt} style={{ width, height: OUTER_H * scale, maxWidth: "100%" }}>
        <div
          inert
          style={{
            width: OUTER_W, height: OUTER_H, transform: `scale(${scale})`, transformOrigin: "top left",
            background: "#141416", borderRadius: 62, padding: BEZEL, boxSizing: "border-box",
            boxShadow: "0 0 0 1.5px #2A2A2E, 0 30px 60px -20px rgba(42,31,40,0.45)", pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 50, overflow: "hidden", background: C.ground, isolation: "isolate" }}>
            <Screen nav={nav} />
            <div aria-hidden style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 122, height: 34, borderRadius: 20, background: "#000", zIndex: 50 }} />
            <div aria-hidden style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(245,243,241,0.6)", zIndex: 50 }} />
          </div>
        </div>
      </div>
      {shot.caption && (
        <figcaption style={{ fontSize: CS.type.caption, color: CS.inkMuted, fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** A wrapping row of prototype screens, with the same optional heading treatment as FeatureVisual. */
export default function ProtoScreens({
  shots, width, headline, caption,
}: { shots: ProtoShot[]; width: number; headline?: string; caption?: string }) {
  return (
    <div className="w-full flex flex-col gap-6 items-start">
      {/* The prototype's shared CSS: hides inner scrollbars, and keyframes some screens reference. */}
      <style>{GLOBAL_CSS + ".aira-screen{animation:none}"}</style>
      {(headline || caption) && (
        <div className="flex flex-col gap-1.5">
          {headline && (
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: CS.type.sub, color: CS.ink, lineHeight: 1.3 }}>{headline}</h4>
          )}
          {caption && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: CS.inkMuted, lineHeight: 1.5, maxWidth: "60ch" }}>{caption}</p>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-6 items-start w-full">
        {shots.map((s, i) => <StaticScreen key={i} shot={s} width={width} />)}
      </div>
    </div>
  );
}
