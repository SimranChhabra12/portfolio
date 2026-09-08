"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { T } from "../tokens";
import { K } from "./screens/kit";

// Hero — the scrubbable season wheel.
//
// Blockparty's logic (bevyip.com): give the hero one object and make it respond,
// rather than showing a still of the product. The object here is AIRA's own
// framing — the cycle as four seasons — so dragging turns the year and changes the
// season, the reading, and the light in the band at once.
//
// The season names, phase names, colours and "how it feels" lines are the same four
// rows as SeasonsDiagram further down the page, deliberately: the hero states the
// framing, the diagram explains it. They must never drift, so both read the same
// palette out of T.aira.
//
// Why the ring is drawn as ~120 interpolated segments rather than four solid arcs:
// seasons don't snap, they bleed. A four-block ring says "four categories"; a ring
// that melts winter into spring says "one continuous thing you're somewhere inside
// of," which is the actual argument the case study makes.

const A = T.aira;
const DAYS = 28;

const SEASONS = [
  {
    season: "Winter",
    phase: "Menstrual",
    from: 1,
    to: 5,
    color: A.purple,
    feel: "Rest and recovery",
    note: "Low energy, and that's the assignment. Gentle habits hold; nothing here needs pushing through.",
    glow: 0.32,
  },
  {
    season: "Spring",
    phase: "Follicular",
    from: 6,
    to: 13,
    color: A.blue,
    feel: "Rising energy, new ideas",
    note: "Energy climbs day over day. This is the cheapest week of the month to start something.",
    glow: 0.38,
  },
  {
    season: "Summer",
    phase: "Ovulatory",
    from: 14,
    to: 17,
    color: A.green,
    feel: "High energy and clarity",
    note: "Peak output. Hard efforts and hard conversations both land better right now.",
    glow: 0.54,
  },
  {
    season: "Autumn",
    phase: "Luteal",
    from: 18,
    to: 28,
    color: A.coralPhase,
    feel: "Slowing down, turning inward",
    note: "The wind-down. Steady, moderate movement, and more sleep than the rest of the month asks for.",
    glow: 0.40,
  },
] as const;

/** Mid-day of each season, in degrees clockwise from 12 o'clock — the anchor a
 *  season's colour is fully itself at, and where its label sits. */
const CENTERS = SEASONS.map((s) => {
  const mid = (s.from + s.to) / 2;
  return { ...s, deg: ((mid - 1) / DAYS) * 360 };
});

const SIZE = 460;
const C = SIZE / 2;
const R = 152;
const LABEL_R = 196;
const TICK_R = R + 20;
const SEGMENTS = 120;

function seasonForDay(day: number) {
  return SEASONS.find((s) => day >= s.from && day <= s.to) ?? SEASONS[0];
}

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  // Smoothstep rather than linear: each season holds its own colour through its
  // middle and does the handover near the boundary, instead of being a permanent
  // gradient with no identity anywhere.
  const e = t * t * (3 - 2 * t);
  const c = (x: number, y: number) => Math.round(x + (y - x) * e);
  return `rgb(${c(r1, r2)}, ${c(g1, g2)}, ${c(b1, b2)})`;
}

/**
 * The lit version of a season's colour, used wherever the active season has to read
 * as *on*: the raised arc, the "how it feels" line, the core and the band's ambient.
 *
 * It can't be a fixed tint, and it can't be a mix toward white. AIRA's four hues sit
 * at very different lightnesses — winter's #4A3F6B is nearly as dark as the ground,
 * so at full saturation the active arc disappears and the feel line fails contrast.
 * But mixing it toward the light ink to fix that drains the purple out of it and
 * winter arrives as grey. So this raises lightness in HSL and leaves hue alone: every
 * season reaches the same readable level while still looking like itself.
 */
const LIT_L = 0.62;

function lit(hex: string) {
  const [h, sat, l] = rgbToHsl(hexToRgb(hex));
  if (l >= LIT_L) return hslToCss(h, sat, l);
  // Deep colours lose a little saturation as they lighten; give it back so winter
  // stays unmistakably purple rather than drifting to lavender-grey.
  return hslToCss(h, Math.min(1, sat + (LIT_L - l) * 0.35), LIT_L);
}

function rgbToHsl([r, g, b]: number[]): [number, number, number] {
  const R = r / 255, G = g / 255, B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
  else if (max === G) h = ((B - R) / d + 2) / 6;
  else h = ((R - G) / d + 4) / 6;
  return [h, s, l];
}

function hslToCss(h: number, s: number, l: number) {
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/** Degrees either side of a season boundary that the handover happens over. */
const BLEND = 13;

/**
 * Colour of the wheel at an angle. Each season holds its own colour across its own
 * arc and only trades near its boundaries — blending the whole way from one season
 * centre to the next turns green-to-coral into olive and blue-to-purple into slate,
 * which reads as mud rather than as seasons.
 */
function colorAt(deg: number) {
  const d = ((deg % 360) + 360) % 360;
  const bounds = SEASONS.map((s, i) => ({
    at: ((s.from - 1) / DAYS) * 360,
    before: SEASONS[(i + SEASONS.length - 1) % SEASONS.length].color,
    after: s.color,
  }));

  for (const b of bounds) {
    // Signed distance to this boundary, wrapped to [-180, 180).
    let delta = d - b.at;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    if (Math.abs(delta) < BLEND) {
      return mix(b.before, b.after, (delta + BLEND) / (2 * BLEND));
    }
  }

  const own = SEASONS.find((s) => {
    const from = ((s.from - 1) / DAYS) * 360;
    const to = (s.to / DAYS) * 360;
    return from <= to ? d >= from && d < to : d >= from || d < to;
  });
  return own?.color ?? SEASONS[0].color;
}

// Rounded to 3dp: Node and the browser can serialise the last bit of a float
// differently, which React reports as a hydration mismatch on every arc and tick.
const q = (n: number) => Math.round(n * 1000) / 1000;

function pt(deg: number, r: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: q(C + r * Math.cos(rad)), y: q(C + r * Math.sin(rad)) };
}

function arc(from: number, to: number, r: number) {
  const a = pt(from, r);
  const b = pt(to, r);
  const large = to - from > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

export default function HeroScrub() {
  const [day, setDay] = useState(20);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const ringRef = useRef<SVGSVGElement>(null);
  const active = seasonForDay(day);
  const glowColor = lit(active.color);

  const dayFromEvent = useCallback((clientX: number, clientY: number) => {
    const el = ringRef.current;
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const dx = clientX - (b.left + b.width / 2);
    const dy = clientY - (b.top + b.height / 2);
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    return Math.min(DAYS, Math.max(1, Math.round((deg / 360) * DAYS) + 1));
  }, []);

  const set = useCallback((d: number | null) => {
    if (d == null) return;
    setDay(d);
    setTouched(true);
  }, []);

  // Bound to the window while dragging so the pointer can leave the ring without
  // the value sticking — the usual failure of hand-rolled radial controls.
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => set(dayFromEvent(e.clientX, e.clientY));
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [dragging, dayFromEvent, set]);

  const handleDeg = ((day - 1) / DAYS) * 360;
  const handle = pt(handleDeg, R);
  const activeFrom = ((active.from - 1) / DAYS) * 360;
  const activeTo = ((active.to - 1) / DAYS) * 360 + 360 / DAYS;

  const segs = Array.from({ length: SEGMENTS }, (_, i) => {
    const a0 = (i / SEGMENTS) * 360;
    const a1 = ((i + 1) / SEGMENTS) * 360 + 0.45; // overlap kills the hairline seams
    return { d: arc(a0, a1, R), c: colorAt(a0 + 180 / SEGMENTS) };
  });

  return (
    <div
      id="aira-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: K.ground,
        paddingTop: "clamp(5rem, 4rem + 3vw, 7rem)",
        paddingBottom: "clamp(3rem, 2.25rem + 2.5vw, 4.5rem)",
      }}
    >
      {/* The band's light is the season. Winter is dim and cool, summer bright and
          open — the ambient carries the same reading the copy does. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            `radial-gradient(58% 74% at 50% 2%, ${rgbaOf(glowColor, active.glow)} 0%, ${rgbaOf(glowColor, 0.12)} 44%, transparent 76%), ` +
            `radial-gradient(120% 110% at 50% -10%, ${K.surface}CC 0%, transparent 70%)`,
          transition: "background 560ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <div className="relative flex flex-col items-center px-5">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: K.faint,
            margin: "0 0 clamp(1rem, 2vw, 1.75rem)",
          }}
        >
          Phases → Seasons → How it feels
        </p>

        <svg
          ref={ringRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="slider"
          tabIndex={0}
          aria-label="Cycle day"
          aria-valuemin={1}
          aria-valuemax={DAYS}
          aria-valuenow={day}
          aria-valuetext={`Day ${day} — ${active.season}, the ${active.phase.toLowerCase()} phase. ${active.feel}.`}
          onPointerDown={(e) => {
            e.preventDefault();
            // No setPointerCapture here: the window-level listeners above already
            // follow the pointer off the ring, and capturing retargets the move
            // events away from them.
            setDragging(true);
            set(dayFromEvent(e.clientX, e.clientY));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); set(day === DAYS ? 1 : day + 1); }
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); set(day === 1 ? DAYS : day - 1); }
            if (e.key === "Home") { e.preventDefault(); set(1); }
            if (e.key === "End") { e.preventDefault(); set(DAYS); }
          }}
          style={{
            display: "block",
            touchAction: "none",
            cursor: dragging ? "grabbing" : "grab",
            width: "min(100%, 460px)",
            height: "auto",
            outline: "none",
          }}
        >
          {/* Inner disc, lit in the current season — gives the wheel a centre to sit
              on instead of a hole, and carries the season colour behind the type. */}
          <defs>
            <radialGradient id="aira-core">
              <stop offset="0%" stopColor={active.color} stopOpacity="0.30" />
              <stop offset="70%" stopColor={active.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={active.color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={C} cy={C} r={R - 12} fill="url(#aira-core)" style={{ transition: "all 500ms ease" }} />

          {/* Day ticks — 28 of them. The instrument reading, under the seasons. */}
          {Array.from({ length: DAYS }, (_, i) => {
            const deg = (i / DAYS) * 360;
            const on = i + 1 === day;
            const a = pt(deg, TICK_R);
            const b = pt(deg, TICK_R + (on ? 9 : 5));
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={on ? K.coral : K.text}
                strokeOpacity={on ? 1 : 0.18}
                strokeWidth={on ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* The wheel: a continuous blend, held back so the active season can lead. */}
          <g opacity={0.42}>
            {segs.map((s, i) => (
              <path key={i} d={s.d} stroke={s.c} strokeWidth={16} fill="none" strokeLinecap="butt" />
            ))}
          </g>

          {/* The active season, drawn over the top at full strength and heavier. */}
          <g style={{ transition: "opacity 400ms ease" }}>
            <path
              d={arc(activeFrom, Math.min(activeTo, activeFrom + 359.9), R)}
              stroke={glowColor}
              strokeWidth={22}
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Season names around the wheel, at each season's own arc. This is the
              framing stated on the object itself rather than in a legend below it. */}
          {CENTERS.map((s) => {
            const p = pt(s.deg, LABEL_R);
            const on = s.season === active.season;
            return (
              <text
                key={s.season}
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  fill: on ? K.text : K.text,
                  fillOpacity: on ? 1 : 0.3,
                  transition: "fill-opacity 320ms ease",
                }}
              >
                {s.season.toUpperCase()}
              </text>
            );
          })}

          {/* Handle: coral, because it is the interactive element. The season hues
              stay reserved for data, exactly as in the rebuilt screens. */}
          <circle cx={handle.x} cy={handle.y} r={14} fill={K.ground} />
          <circle cx={handle.x} cy={handle.y} r={9} fill={K.coral} />
          <circle cx={handle.x} cy={handle.y} r={3.5} fill={K.ground} fillOpacity={0.55} />

          {/* Centre: the season leads in the display serif, the clinical reading sits
              under it. The export set label and value at the same size; this doesn't. */}
          <text
            x={C} y={C - 40} textAnchor="middle"
            style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", fill: K.faint }}
          >
            {`DAY ${day} OF ${DAYS}`}
          </text>
          <text
            x={C} y={C + 8} textAnchor="middle"
            style={{ fontFamily: "var(--font-display), serif", fontSize: 44, fontWeight: 500, letterSpacing: "0.02em", fill: K.text }}
          >
            {active.season}
          </text>
          <text
            x={C} y={C + 36} textAnchor="middle"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fill: K.muted }}
          >
            {`${active.phase} phase`}
          </text>
          <text
            x={C} y={C + 62} textAnchor="middle"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, fill: glowColor }}
          >
            {active.feel}
          </text>
        </svg>

        {/* Fixed height so the band never reflows as the note changes length. */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.6,
            color: K.muted,
            textAlign: "center",
            maxWidth: 480,
            margin: "clamp(1rem, 2vw, 1.75rem) 0 0",
            minHeight: 48,
          }}
        >
          {active.note}
        </p>

        <p
          aria-hidden
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: K.faint,
            margin: "16px 0 0",
            opacity: touched ? 0 : 1,
            transition: "opacity 400ms ease",
          }}
        >
          Drag to turn the year
        </p>
      </div>
    </div>
  );
}

/** lit() returns "hsl(...)", so the gradients take their alpha this way rather than
 *  by appending hex digits to a hex string. */
function rgbaOf(color: string, a: number) {
  const m = color.match(/[\d.]+/g);
  if (!m) return color;
  return `hsla(${m[0]}, ${m[1]}%, ${m[2]}%, ${a})`;
}
