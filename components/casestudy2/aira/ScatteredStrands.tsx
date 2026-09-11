"use client";

import { useMemo, useState } from "react";
import { T } from "../tokens";

const A = T.aira;

// "Managed separately, felt all at once." One illustrative month of the eight
// things PMOS asks you to track, each drawn on its own line because each lives
// in its own app. Hover a day to see how many places you'd have to look;
// "Connect the dots" reveals the pattern none of those apps could see.

const DAYS = 30;
const PATTERN_DAYS = [8, 17, 25]; // bad sleep → low mood → no movement

function noise(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

type Strand = {
  key: string;
  label: string;
  app: string;
  values: (number | null)[]; // 0–1, null = not logged
  fmt: (v: number) => string;
  linked?: boolean; // part of the hidden pattern
};

function build(): Strand[] {
  const r = noise(7);
  const wobble = (base: number, amp: number) => Math.min(1, Math.max(0, base + (r() - 0.5) * amp));
  const days = Array.from({ length: DAYS }, (_, d) => d);
  const inPattern = (d: number) => PATTERN_DAYS.includes(d);
  const logged = (ranges: [number, number][]) => (d: number) => ranges.some(([a, b]) => d >= a && d <= b);

  const nutritionLogged = logged([[0, 9], [15, 18]]);
  const suppsLogged = logged([[0, 6], [13, 16]]);
  const moodLogged = logged([[0, 12], [16, 27]]);

  return [
    {
      key: "sleep", label: "Sleep", app: "Apple Health", linked: true,
      values: days.map((d) => (inPattern(d) ? 0.08 : wobble(0.6, 0.55))),
      fmt: (v) => `${(4 + v * 4.5).toFixed(1)} hrs`,
    },
    {
      key: "schedule", label: "Schedule", app: "Calendar",
      values: days.map((d) => (inPattern(d - 1) ? 0.95 : wobble(0.5, 0.7))),
      fmt: (v) => (v > 0.7 ? "Packed" : v > 0.35 ? "Busy" : "Light"),
    },
    {
      key: "weight", label: "Weight", app: "Apple Health",
      values: days.map((d) => (d === 2 ? 0.55 : d === 13 ? 0.62 : d === 27 ? 0.6 : null)),
      fmt: (v) => `${(66 + v * 3).toFixed(1)} kg`,
    },
    {
      key: "period", label: "Period", app: "Flo",
      values: days.map((d) => (d <= 4 ? 1 : 0)),
      fmt: (v) => (v ? "Bleeding" : "Nothing yet"),
    },
    {
      key: "movement", label: "Movement", app: "Apple Health", linked: true,
      values: days.map((d) => (inPattern(d) || inPattern(d - 1) ? 0.06 : wobble(0.55, 0.7))),
      fmt: (v) => `${Math.round(800 + v * 9000).toLocaleString()} steps`,
    },
    {
      key: "mood", label: "Mood", app: "Flo", linked: true,
      values: days.map((d) => (!moodLogged(d) ? null : inPattern(d) ? 0.05 : wobble(0.55, 0.6))),
      fmt: (v) => (v > 0.7 ? "Good" : v > 0.45 ? "Okay" : v > 0.2 ? "Flat" : "Low"),
    },
    {
      key: "nutrition", label: "Nutrition", app: "MyFitnessPal",
      values: days.map((d) => (nutritionLogged(d) ? wobble(0.5, 0.8) : null)),
      fmt: (v) => `${Math.round(1100 + v * 1000).toLocaleString()} kcal`,
    },
    {
      key: "supplements", label: "Supplements", app: "Pill reminder",
      values: days.map((d) => (suppsLogged(d) ? (r() > 0.25 ? 1 : 0) : null)),
      fmt: (v) => (v ? "Taken" : "Missed"),
    },
  ];
}

// SVG geometry
const W = 760;
const LEFT = 132;
const RIGHT = 16;
const TOP = 18;
const ROW = 44;
const AMP = 13;
const H = TOP + ROW * 8 + 8;
const dx = (W - LEFT - RIGHT) / (DAYS - 1);
const xAt = (d: number) => LEFT + d * dx;
const yAt = (row: number, v: number) => TOP + row * ROW + ROW / 2 + (0.5 - v) * 2 * AMP;

function segments(values: (number | null)[], row: number) {
  const out: string[] = [];
  let cur: string[] = [];
  values.forEach((v, d) => {
    if (v === null) {
      if (cur.length) out.push(cur.join(" "));
      cur = [];
    } else cur.push(`${xAt(d).toFixed(1)},${yAt(row, v).toFixed(1)}`);
  });
  if (cur.length) out.push(cur.join(" "));
  return out;
}

const faint = "rgba(245, 243, 241, 0.32)";
const ghost = "rgba(245, 243, 241, 0.1)";

export default function ScatteredStrands() {
  const strands = useMemo(build, []);
  const [day, setDay] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  const apps = new Set(strands.map((s) => s.app)).size;
  const entries = strands.reduce((n, s) => n + s.values.filter((v) => v !== null).length, 0);
  const gaps = strands.reduce((n, s) => n + s.values.filter((v) => v === null).length, 0);

  const stats = [
    { value: String(strands.length), label: "things to track" },
    { value: String(apps), label: "apps that don't talk" },
    { value: String(entries), label: "entries this month" },
    { value: String(gaps), label: "days that slipped" },
    { value: connected ? String(PATTERN_DAYS.length) : "0", label: "patterns found", hot: connected },
  ];

  return (
    <div
      style={{
        backgroundColor: A.dark,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.5rem, 1rem + 2.5vw, 3rem)",
        color: A.textLight,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <p
          style={{
            fontSize: T.type.caption,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: A.textMuted,
          }}
        >
          One month of managing PMOS · illustrative
        </p>
        <button
          type="button"
          onClick={() => setConnected((c) => !c)}
          aria-pressed={connected}
          className="rounded-full px-4 py-2 transition-colors"
          style={{
            fontSize: T.type.caption,
            border: `1px solid ${connected ? A.coral : "rgba(245,243,241,0.25)"}`,
            backgroundColor: connected ? A.coral : "transparent",
            color: connected ? A.dark : A.textLight,
          }}
        >
          {connected ? "Scatter it again" : "Connect the dots"}
        </button>
      </div>

      <dl className="grid grid-cols-3 sm:grid-cols-5 gap-x-4 gap-y-3 mb-6">
        {stats.map((s) => (
          <div key={s.label}>
            <dd
              style={{
                fontSize: "var(--t-project)",
                lineHeight: 1.1,
                color: s.hot ? A.coral : A.textLight,
                transition: "color 300ms",
              }}
            >
              {s.value}
            </dd>
            <dt style={{ fontSize: "var(--t-caption)", color: A.textMuted }}>{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="overflow-x-auto -mx-2 px-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[560px] select-none"
          role="img"
          aria-label="Eight health signals over thirty days, each tracked on its own line in a separate app, with gaps where logging stopped."
          onPointerLeave={() => setDay(null)}
        >
          {strands.map((s, i) => {
            const dim = connected && !s.linked;
            const y = TOP + i * ROW + ROW / 2;
            return (
              <g key={s.key} style={{ transition: "opacity 400ms", opacity: dim ? 0.25 : 1 }}>
                <text x={0} y={y - 2} fontSize={13} fill={A.textLight}>{s.label}</text>
                <text x={0} y={y + 13} fontSize={10.5} fill={A.textMuted}>{s.app}</text>
                <line x1={LEFT} x2={W - RIGHT} y1={y} y2={y} stroke={ghost} strokeDasharray="1 5" />
                {segments(s.values, i).map((pts, k) => (
                  <polyline
                    key={k}
                    points={pts}
                    fill="none"
                    stroke={connected && s.linked ? A.textLight : faint}
                    strokeWidth={1.6}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    style={{ transition: "stroke 400ms" }}
                  />
                ))}
                {s.values.map((v, d) =>
                  v !== null && (s.values[d - 1] ?? null) === null && (s.values[d + 1] ?? null) === null ? (
                    <circle key={d} cx={xAt(d)} cy={yAt(i, v)} r={2.5} fill={faint} />
                  ) : null
                )}
              </g>
            );
          })}

          {/* the hidden pattern */}
          <g style={{ opacity: connected ? 1 : 0, transition: "opacity 500ms" }} pointerEvents="none">
            {PATTERN_DAYS.map((d) => {
              const pts = strands
                .map((s, i) => (s.linked && s.values[d] !== null ? { x: xAt(d), y: yAt(i, s.values[d] as number) } : null))
                .filter(Boolean) as { x: number; y: number }[];
              return (
                <g key={d}>
                  <line
                    x1={pts[0].x} x2={pts[0].x} y1={pts[0].y} y2={pts[pts.length - 1].y}
                    stroke={A.coral} strokeWidth={1.5} strokeDasharray="3 4"
                  />
                  {pts.map((p, k) => <circle key={k} cx={p.x} cy={p.y} r={4.5} fill={A.coral} />)}
                </g>
              );
            })}
          </g>

          {/* hover scrubber */}
          {day !== null && (
            <g pointerEvents="none">
              <line x1={xAt(day)} x2={xAt(day)} y1={TOP} y2={H - 8} stroke="rgba(245,243,241,0.4)" />
              {strands.map((s, i) =>
                s.values[day] !== null ? (
                  <circle key={s.key} cx={xAt(day)} cy={yAt(i, s.values[day] as number)} r={3.5} fill={A.textLight} />
                ) : (
                  <text key={s.key} x={xAt(day)} y={TOP + i * ROW + ROW / 2 + 4} fontSize={12} textAnchor="middle" fill={A.coral}>?</text>
                )
              )}
            </g>
          )}
          {Array.from({ length: DAYS }, (_, d) => (
            <rect
              key={d}
              x={xAt(d) - dx / 2}
              y={0}
              width={dx}
              height={H}
              fill="transparent"
              onPointerEnter={() => setDay(d)}
              onPointerDown={() => setDay(d)}
            />
          ))}
        </svg>
      </div>

      <div className="mt-5 min-h-[7.5rem]" aria-live="polite">
        {connected ? (
          <p style={{ fontSize: T.type.body, lineHeight: 1.55, maxWidth: "52ch" }}>
            <span style={{ color: A.coral }}>Bad sleep, then a low mood, then no movement.</span>{" "}
            Three times this month. Each piece sat in a different app, so none of them saw it.
          </p>
        ) : day === null ? (
          <p style={{ fontSize: T.type.caption, color: A.textMuted }}>
            Hover a day to see what it takes to piece it together.
          </p>
        ) : (
          <>
            <p style={{ fontSize: T.type.caption, color: A.textMuted }} className="mb-3">
              Day {day + 1} · {strands.filter((s) => s.values[day] !== null).length} readings across{" "}
              {new Set(strands.filter((s) => s.values[day] !== null).map((s) => s.app)).size} apps
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {strands.map((s) => {
                const v = s.values[day];
                return (
                  <div key={s.key} className="rounded-xl px-3 py-2" style={{ backgroundColor: A.surface }}>
                    <div style={{ fontSize: "var(--t-caption)", color: A.textMuted }}>
                      {s.label} · {s.app}
                    </div>
                    <div style={{ fontSize: "var(--t-body)", color: v === null ? A.coral : A.textLight }}>
                      {v === null ? "Not logged" : s.fmt(v)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
