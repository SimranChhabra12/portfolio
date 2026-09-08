"use client";

import { useEffect, useState } from "react";
import { R, FONT, SCREEN_W, SCREEN_H } from "./kit";
import { Chevron } from "./primitives";

/**
 * Device chassis. Same proportions as the AIRA PhoneShell, but this one frames a
 * live, interactive app rather than a static screen — so it is not role="img",
 * and the scale transform has to preserve hit-testing (CSS transforms do).
 *
 * Children are authored once at 390x844 device points and CSS-scaled to whatever
 * width the page asks for, so nothing has to be redrawn per breakpoint.
 */
export default function PhoneShell({
  children,
  width = 390,
  label,
}: {
  children: React.ReactNode;
  /** Widest the device is allowed to be. It renders narrower in a narrow column. */
  width?: number;
  label: string;
}) {
  return (
    <div data-resy-proto style={{ width: "100%", maxWidth: width, minWidth: 0 }}>
      <div
        style={{
          borderRadius: 52,
          padding: 12,
          backgroundColor: "#0B0B0C",
          boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
        }}
      >
        <div
          aria-label={label}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 40,
            width: "100%",
            aspectRatio: `${SCREEN_W} / ${SCREEN_H}`,
            backgroundColor: R.ground,
            // Makes this box the query container the canvas below scales against.
            containerType: "inline-size",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: SCREEN_W,
              height: SCREEN_H,
              transformOrigin: "top left",
              // Screens are authored once at 390x844 and scaled to whatever width
              // the column gives them, so nothing is redrawn per breakpoint.
              //
              // The scale factor is the container's width divided by 390 — a ratio
              // of two lengths, which calc() can't express. tan(atan2(a, b)) does:
              // atan2 takes two lengths and returns an angle, and its tangent is
              // the unitless ratio. Doing it in CSS rather than by measuring in JS
              // means it is right on first paint, and stays right when the column
              // resizes without the window resizing.
              transform: `scale(tan(atan2(100cqw, ${SCREEN_W}px)))`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** iOS status bar. Drawn rather than screenshotted so it matches the ground exactly. */
export function StatusBar() {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(/\s?[AP]M/, ""));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: R.chrome.statusBar,
        zIndex: 30,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: `0 ${R.pagePad}px 8px`,
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 700,
        color: R.text,
        pointerEvents: "none",
      }}
    >
      <span>{time}</span>
      <span style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
        {[4, 6, 8, 10].map((h) => (
          <i key={h} style={{ width: 3, height: h, background: R.text, borderRadius: 1, display: "block" }} />
        ))}
        <i style={{ width: 16, height: 9, border: `1.5px solid ${R.text}`, borderRadius: 2.5, display: "block", marginLeft: 4 }} />
      </span>
    </div>
  );
}

/** Inner-screen header: back / title / optional trailing slot, at one weight. */
export function ScreenHeader({
  title,
  onBack,
  trailing,
}: {
  title: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: R.space.md,
        height: R.chrome.header,
        padding: `0 ${R.pagePad}px`,
        flexShrink: 0,
      }}
    >
      <span style={{ width: 30, display: "flex" }}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            style={{ background: "none", border: "none", padding: 6, cursor: "pointer", marginLeft: -6 }}
          >
            <Chevron dir="left" color={R.text} />
          </button>
        )}
      </span>
      <h2
        style={{
          flex: 1,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: R.type.screenTitle.size,
          fontWeight: 700,
          color: R.text,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={{ width: 30, display: "flex", justifyContent: "flex-end" }}>{trailing}</span>
    </div>
  );
}

export const TABS = ["Discover", "Search", "Celebrations", "Account"] as const;
export type TabName = (typeof TABS)[number];

export function TabBar({ active, onSelect }: { active: TabName; onSelect: (t: TabName) => void }) {
  return (
    <nav
      aria-label="Main"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: R.chrome.tabBar,
        zIndex: 20,
        display: "flex",
        paddingTop: 10,
        background: R.ground,
        borderTop: `1px solid ${R.hairline}`,
      }}
    >
      {TABS.map((t) => {
        const on = t === active;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onSelect(t)}
            aria-current={on ? "page" : undefined}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <TabIcon name={t} color={on ? R.brand : R.faint} />
            <span
              style={{
                display: "block",
                marginTop: 4,
                fontFamily: FONT,
                fontSize: 10,
                fontWeight: on ? 700 : 500,
                color: on ? R.brand : R.faint,
              }}
            >
              {t}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function TabIcon({ name, color }: { name: TabName; color: string }) {
  const common = { stroke: color, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden style={{ display: "block", margin: "0 auto" }}>
      {name === "Discover" && <path {...common} d="M10 2.5l7 3.6v7.8L10 17.5 3 13.9V6.1z" />}
      {name === "Search" && (
        <>
          <circle {...common} cx="9" cy="9" r="5.5" />
          <path {...common} d="M13.2 13.2L17 17" />
        </>
      )}
      {name === "Celebrations" && (
        <path
          d="M10 2.5l2.2 4.9 5.3.5-4 3.6 1.2 5.2L10 14l-4.7 2.7 1.2-5.2-4-3.6 5.3-.5z"
          fill={color}
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      )}
      {name === "Account" && (
        <>
          <circle {...common} cx="10" cy="7" r="3.2" />
          <path {...common} d="M4 17c0-3.2 2.7-5 6-5s6 1.8 6 5" />
        </>
      )}
    </svg>
  );
}

/** Pinned bottom CTA with a scrim so content scrolls under it legibly. */
export function PinnedCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 15,
        padding: `${R.space.xl}px ${R.pagePad}px ${R.space.xl}px`,
        background: `linear-gradient(to top, ${R.ground} 62%, transparent)`,
      }}
    >
      {children}
    </div>
  );
}
