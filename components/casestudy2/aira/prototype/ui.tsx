"use client";

import { useEffect, useRef, useState } from "react";
import { K } from "../screens/kit";

// Shared UI for the AIRA prototype. One set of rules for every screen, so the
// onboarding (which was a looser, earlier Figma pass) and the final screens read
// as the same app:
//  - one 20pt page margin, one 4pt spacing scale
//  - one type scale (large title → title → headline → body → caption → label)
//  - coral is the only interactive accent; phase hues only ever encode the cycle
//  - one card surface, one radius for cards/rows, pills only for chips + toggles

export const F = "var(--font-body), system-ui, -apple-system, sans-serif";

export const C = {
  ...K,
  card: "#16161A",
  cardHi: "#1F1F24",
  line: "rgba(245, 243, 241, 0.07)",
  lavender: "#9D90D9", // menstrual hue, lifted so it reads as a fill on the dark ground
  lavenderWash: "rgba(157, 144, 217, 0.16)",
  green: "#5DB88E",
  blue: "#7BA3D3",
  peach: "#EFA07A",
};

export const PHASES = [
  { key: "menstrual", phase: "Menstrual", season: "Winter", color: C.lavender, days: [1, 5], energy: "Low energy", seasonLine: "Rest and recovery",
    blurb: "This week is about rest and steady, gentle habits. Here's what can support you today." },
  { key: "follicular", phase: "Follicular", season: "Spring", color: C.blue, days: [6, 13], energy: "Rising energy", seasonLine: "Growth and renewal",
    blurb: "Energy is waking up again. A good time for light momentum and rebuilding your routine." },
  { key: "ovulatory", phase: "Ovulatory", season: "Summer", color: C.green, days: [14, 16], energy: "Peak energy", seasonLine: "High energy and clarity",
    blurb: "Your energy is at its peak. You may feel more social, clear and active in this short window." },
  { key: "luteal", phase: "Luteal", season: "Autumn", color: C.peach, days: [17, 28], energy: "Steady energy", seasonLine: "Slowing down",
    blurb: "Energy naturally tapers here. Steadier routines, grounding food and gentler plans help." },
] as const;

export const T = {
  largeTitle: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12 },
  title: { fontSize: 22, fontWeight: 650, letterSpacing: "-0.01em", lineHeight: 1.2 },
  headline: { fontSize: 16, fontWeight: 600, lineHeight: 1.3 },
  body: { fontSize: 15, fontWeight: 400, lineHeight: 1.45 },
  sub: { fontSize: 13.5, fontWeight: 400, lineHeight: 1.45 },
  caption: { fontSize: 12, fontWeight: 500, lineHeight: 1.35 },
} as const;

export function Txt({
  v = "body",
  color,
  style,
  children,
}: {
  v?: keyof typeof T;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <p style={{ fontFamily: F, margin: 0, color: color ?? (v === "sub" || v === "caption" ? C.muted : C.text), ...T[v], ...style }}>
      {children}
    </p>
  );
}

export function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: F, margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.faint, ...style }}>
      {children}
    </p>
  );
}

// ─── Icons: one stroke weight, one optical size ─────────────────────────────
const PATHS: Record<string, string> = {
  back: "M15 5l-7 7 7 7",
  chevron: "M9 5l7 7-7 7",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4",
  books: "M5 4h3v16H5zM10 4h3v16h-3zM15.2 4.6l2.9-.8 3.9 15.4-2.9.8z",
  moon: "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z",
  drop: "M12 3.5s6 6.4 6 10.5a6 6 0 01-12 0c0-4.1 6-10.5 6-10.5z",
  walk: "M13 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 21l2-6 3 3v3M8.5 12l2.5-3.5 3 1.5 2 3M11 8.5L9 14",
  bowl: "M4 11h16a8 8 0 01-16 0zM8 7c0-1.5 1-1.5 1-3M12 7c0-1.5 1-1.5 1-3M16 7c0-1.5 1-1.5 1-3",
  mind: "M12 20v-3M8 17h8M7.5 13.5A5.5 5.5 0 1116.5 13.5c-1 .9-1.5 2-1.5 3.5H9c0-1.5-.5-2.6-1.5-3.5z",
  mic: "M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM5.5 11.5a6.5 6.5 0 0013 0M12 18v3",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5",
  bolt: "M13 2.5L5.5 13.5H12L11 21.5l7.5-11H12z",
  calendar: "M4 6.5h16v13.5H4zM4 10.5h16M8.5 4v4M15.5 4v4",
  bulb: "M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1116 14.5c-.7.7-1 1.5-1 2.5H9c0-1-.3-1.8-1-2.5z",
  play: "M8 5.5v13l10.5-6.5z",
  pause: "M8 5.5v13M16 5.5v13",
  bell: "M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15zM10 20.5a2 2 0 004 0",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z",
  chat: "M4.5 5.5h15v10h-8l-4.5 3.5v-3.5H4.5z",
  lock: "M6 11h12v9.5H6zM8.5 11V8a3.5 3.5 0 017 0v3",
  mail: "M4 6h16v12H4zM4.5 6.5L12 13l7.5-6.5",
};

export function Icon({ name, size = 20, color = C.text, w = 1.75, fill = false }: { name: string; size?: number; color?: string; w?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : "none"} aria-hidden style={{ flexShrink: 0, display: "block" }}>
      <path d={PATHS[name]} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── The mascot, drawn once so it scales cleanly on every screen ─────────────
export function Mascot({ size = 120, mood = "happy" }: { size?: number; mood?: "happy" | "sleepy" | "calm" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden style={{ display: "block" }}>
      <path d="M60 106S14 78 14 44a24 24 0 0146-10 24 24 0 0146 10c0 34-46 62-46 62z" fill={C.coral} />
      <path d="M60 106S14 78 14 44a24 24 0 0120-23.6C24 30 22 52 38 70c8 9 17 15 22 17z" fill="rgba(0,0,0,0.08)" />
      {mood === "sleepy" ? (
        <>
          <path d="M40 52q6 5 12 0M68 52q6 5 12 0" stroke={C.ground} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M92 26h8l-8 9h8" stroke={C.text} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : mood === "calm" ? (
        <path d="M40 51q6-5 12 0M68 51q6-5 12 0" stroke={C.ground} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <ellipse cx="46" cy="50" rx="4.5" ry="6" fill={C.ground} />
          <ellipse cx="74" cy="50" rx="4.5" ry="6" fill={C.ground} />
          <circle cx="47.5" cy="48" r="1.6" fill={C.text} />
          <circle cx="75.5" cy="48" r="1.6" fill={C.text} />
        </>
      )}
      <path d="M52 64q8 7 16 0" stroke={C.ground} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="62" rx="6" ry="3.5" fill="rgba(255,255,255,0.22)" />
      <ellipse cx="84" cy="62" rx="6" ry="3.5" fill="rgba(255,255,255,0.22)" />
    </svg>
  );
}

// ─── Layout ─────────────────────────────────────────────────────────────────
export function StatusBar() {
  return (
    <div style={{ height: 50, flexShrink: 0, padding: "0 28px 0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: F, color: C.text, fontSize: 15, fontWeight: 600 }}>
      <span>9:41</span>
      <span aria-hidden style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {[4, 6, 8, 10].map((h) => <i key={h} style={{ width: 3, height: h, background: C.text, borderRadius: 1 }} />)}
        </span>
        <i style={{ width: 22, height: 11, border: `1.5px solid ${C.muted}`, borderRadius: 3.5, padding: 1.5, boxSizing: "border-box", display: "flex" }}>
          <i style={{ flex: 1, background: C.text, borderRadius: 1.5 }} />
        </i>
      </span>
    </div>
  );
}

export function Header({
  title,
  sub,
  onBack,
  right,
}: {
  title?: string;
  sub?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div style={{ height: 52, flexShrink: 0, display: "grid", gridTemplateColumns: "56px 1fr 56px", alignItems: "center" }}>
      <div style={{ paddingLeft: 12 }}>
        {onBack && (
          <button onClick={onBack} aria-label="Back" style={iconBtn}>
            <Icon name="back" size={22} />
          </button>
        )}
      </div>
      <div style={{ textAlign: "center", minWidth: 0 }}>
        {title && <Txt v="headline" style={{ fontSize: 17 }}>{title}</Txt>}
        {sub && <Txt v="caption" style={{ marginTop: 1 }}>{sub}</Txt>}
      </div>
      <div style={{ paddingRight: 16, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

export const iconBtn: React.CSSProperties = {
  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
  background: "transparent", border: 0, borderRadius: 999, cursor: "pointer", padding: 0,
};

export function TextBtn({ children, onClick, color = C.coral }: { children: React.ReactNode; onClick?: () => void; color?: string }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: 0, padding: "8px 4px", cursor: "pointer", fontFamily: F, fontSize: 15, fontWeight: 600, color }}>
      {children}
    </button>
  );
}

export function Primary({
  children,
  onClick,
  disabled,
  tone = "coral",
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "coral" | "quiet" | "light";
  icon?: React.ReactNode;
}) {
  // Disabled is its own neutral state, not a faded accent: coral at low opacity
  // on near-black reads as muddy brown.
  const bg = disabled ? C.card : tone === "coral" ? C.coral : tone === "light" ? C.text : C.cardHi;
  const fg = disabled ? C.faint : tone === "quiet" ? C.text : C.ground;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="aira-press"
      style={{
        width: "100%", height: 52, borderRadius: 14, border: 0, cursor: disabled ? "default" : "pointer",
        background: bg, color: fg, fontFamily: F, fontSize: 16, fontWeight: 600,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 200ms",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

/** Grouped list — the one container for every list of rows. */
export function Group({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", ...style }}>
      {Array.isArray(children)
        ? children.filter(Boolean).map((c, i) => (
            <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : 0 }}>{c}</div>
          ))
        : children}
    </div>
  );
}

export function Row({
  label,
  detail,
  right,
  onClick,
  selected,
  lead,
  chevron,
}: {
  label: React.ReactNode;
  detail?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  lead?: React.ReactNode;
  chevron?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", minHeight: 52, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
        background: "transparent", border: 0, cursor: onClick ? "pointer" : "default", textAlign: "left", fontFamily: F,
      }}
    >
      {lead}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 15, color: selected ? C.coral : C.text, fontWeight: selected ? 600 : 400 }}>{label}</span>
        {detail && <span style={{ display: "block", fontSize: 12.5, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{detail}</span>}
      </span>
      {right}
      {chevron && <Icon name="chevron" size={16} color={C.faint} />}
    </button>
  );
}

export function Check({ on }: { on: boolean }) {
  return (
    <span style={{
      width: 22, height: 22, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
      border: on ? 0 : `1.5px solid ${C.faint}`, background: on ? C.coral : "transparent", transition: "all 150ms",
    }}>
      {on && <Icon name="check" size={14} color={C.ground} w={2.5} />}
    </span>
  );
}

export function Toggle({ on, onClick }: { on: boolean; onClick?: () => void }) {
  return (
    <span onClick={onClick} role="switch" aria-checked={on} style={{
      width: 46, height: 28, borderRadius: 999, padding: 3, boxSizing: "border-box", flexShrink: 0, cursor: "pointer",
      background: on ? C.coral : C.cardHi, transition: "background 200ms", display: "flex",
    }}>
      <i style={{ width: 22, height: 22, borderRadius: 999, background: C.text, transform: `translateX(${on ? 18 : 0}px)`, transition: "transform 200ms" }} />
    </span>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", background: C.card, borderRadius: 999, padding: 3, gap: 2 }}>
      {options.map((o, i) => (
        <button key={o} onClick={() => onChange(i)} style={{
          flex: 1, border: 0, cursor: "pointer", fontFamily: F, fontSize: 13, fontWeight: 600, padding: "8px 0", borderRadius: 999,
          color: i === value ? C.ground : C.muted, background: i === value ? C.text : "transparent", transition: "all 180ms",
        }}>{o}</button>
      ))}
    </div>
  );
}

export function Chip({ children, color = C.coral, wash = C.coralWash }: { children: React.ReactNode; color?: string; wash?: string }) {
  return (
    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color, background: wash, borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4 }}>
      {children}
    </span>
  );
}

export function Card({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <div onClick={onClick} className={onClick ? "aira-press" : undefined} style={{ background: C.card, borderRadius: 16, padding: 16, cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

// ─── Calendar (used by onboarding, log period, prediction) ───────────────────
export function MonthGrid({
  month = "December 2025",
  firstWeekday = 0, // Monday-based: Dec 1 2025 is a Monday
  days = 31,
  selected,
  onSelect,
  marked = [],
  today,
}: {
  month?: string;
  firstWeekday?: number;
  days?: number;
  selected?: number | null;
  onSelect?: (d: number) => void;
  marked?: number[];
  today?: number;
}) {
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Txt v="headline">{month}</Txt>
        <span style={{ display: "flex", gap: 4 }}>
          <span style={{ ...iconBtn, width: 32, height: 32 }}><Icon name="back" size={18} color={C.muted} /></span>
          <span style={{ ...iconBtn, width: 32, height: 32 }}><Icon name="chevron" size={18} color={C.muted} /></span>
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 4 }}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} style={{ textAlign: "center", fontFamily: F, fontSize: 11, fontWeight: 600, color: C.faint, paddingBottom: 6 }}>{d}</span>
        ))}
        {cells.map((d, i) => {
          const isSel = d !== null && d === selected;
          const isMark = d !== null && marked.includes(d);
          return (
            <button
              key={i}
              disabled={d === null}
              onClick={() => d && onSelect?.(d)}
              style={{
                height: 38, border: 0, background: "transparent", padding: 0, cursor: d && onSelect ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {d && (
                <span style={{
                  width: 34, height: 34, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: F, fontSize: 14, fontWeight: isSel || d === today ? 600 : 400,
                  color: isSel ? C.ground : isMark ? C.coral : C.text,
                  background: isSel ? C.coral : isMark ? C.coralWash : "transparent",
                  border: d === today && !isSel ? `1.5px solid ${C.faint}` : "1.5px solid transparent",
                  transition: "background 150ms",
                }}>{d}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Device: renders at true 390×844 points and scales to fit ────────────────
export const DEVICE_W = 390;
export const DEVICE_H = 844;

export function Device({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const BEZEL = 12;
  const outerW = DEVICE_W + BEZEL * 2;
  const outerH = DEVICE_H + BEZEL * 2;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / outerW)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [outerW]);

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: outerW }}>
      <div style={{ height: outerH * scale }}>
        <div style={{
          width: outerW, height: outerH, transform: `scale(${scale})`, transformOrigin: "top left",
          background: "#141416", borderRadius: 62, padding: BEZEL, boxSizing: "border-box",
          boxShadow: "0 0 0 1.5px #2A2A2E, 0 30px 60px -20px rgba(42,31,40,0.45)",
        }}>
          <div style={{ position: "relative", width: DEVICE_W, height: DEVICE_H, borderRadius: 50, overflow: "hidden", background: C.ground, isolation: "isolate" }}>
            {children}
            <div aria-hidden style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 122, height: 34, borderRadius: 20, background: "#000", zIndex: 50 }} />
            <div aria-hidden style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(245,243,241,0.6)", zIndex: 50, pointerEvents: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const GLOBAL_CSS = `
.aira-scroll{scrollbar-width:none}
.aira-scroll::-webkit-scrollbar{display:none}
.aira-press{transition:transform 120ms ease, opacity 200ms}
.aira-press:active{transform:scale(0.98)}
.aira-screen{animation:airaIn 260ms cubic-bezier(.2,.8,.2,1)}
@keyframes airaIn{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}
@keyframes airaBreath{0%,100%{transform:scale(0.62)}50%{transform:scale(1)}}
@keyframes airaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes airaPulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.12);opacity:.25}}
@keyframes airaToast{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
.aira-input{width:100%;height:50px;border-radius:12px;border:1.5px solid transparent;background:${C.card};color:${C.text};padding:0 14px;font:400 15px ${F};outline:none;box-sizing:border-box}
.aira-input:focus{border-color:${C.coral}}
.aira-input::placeholder{color:${C.faint}}
`;
