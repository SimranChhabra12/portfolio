"use client";

import { useState } from "react";
import { T } from "@/components/casestudy2/tokens";

// AIRA's three design decisions, each drawn as the contrast it makes instead of
// a filled-in "instead of / because" card. Every visual shows the same data
// twice: once the way other trackers frame it, once the way AIRA does.
//
// Copy marked PLACEHOLDER still needs to come from the prototype.

const A = T.aira;
const SEASON_COLORS = [A.purple, A.blue, A.green, A.coralPhase];
const LATE = "#E24B4A";

function Decision({
  index,
  title,
  rejected,
  caption,
  children,
}: {
  index: number;
  title: string;
  rejected: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full my-2 px-6 lg:px-8 pt-7 pb-6" style={{ backgroundColor: T.cream, borderRadius: 12 }}>
      <p style={{ fontSize: "0.8125rem", color: T.inkMuted, marginBottom: "0.75rem" }}>
        Decision {String(index).padStart(2, "0")}
      </p>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: T.type.sub, color: T.ink, lineHeight: 1.35, marginBottom: "0.5rem" }}>
        {title}
      </p>
      <p style={{ fontSize: "0.9375rem", color: T.inkMuted, lineHeight: 1.6, marginBottom: "1.75rem" }}>
        Not <s style={{ textDecorationColor: A.coral }}>{rejected}</s>
      </p>
      {children}
      <p style={{ fontSize: "0.8125rem", color: T.inkMuted, lineHeight: 1.6, marginTop: "1.5rem" }}>{caption}</p>
    </div>
  );
}

/* ---------- 01: Seasons / Phases toggle ---------- */

const VOCAB = {
  seasons: {
    names: ["Winter", "Spring", "Summer", "Autumn"],
    current: "Autumn",
    // From the prototype's season copy (SeasonsDiagram / HeroCover)
    note: "Slowing down, turning inward.",
  },
  phases: {
    names: ["Menstrual", "Follicular", "Ovulatory", "Luteal"],
    current: "Luteal phase",
    // From the prototype's luteal blurb (prototype/ui.tsx PHASES)
    note: "Energy naturally tapers here. Steadier routines, grounding food and gentler plans help.",
  },
};

const CX = 200, CY = 130, R = 90, GAP = 3;
function arc(i: number) {
  const pt = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return `${(CX + R * Math.sin(r)).toFixed(2)} ${(CY - R * Math.cos(r)).toFixed(2)}`;
  };
  return `M${pt(i * 90 + GAP / 2)} A${R} ${R} 0 0 1 ${pt((i + 1) * 90 - GAP / 2)}`;
}

// Label anchors sit outside each quarter, clear of the stroke.
const LABELS: { x: number; y: number; anchor: "start" | "end" }[] = [
  { x: 318, y: 46, anchor: "start" },
  { x: 318, y: 222, anchor: "start" },
  { x: 82, y: 222, anchor: "end" },
  { x: 82, y: 46, anchor: "end" },
];

function VocabToggle() {
  const [mode, setMode] = useState<keyof typeof VOCAB>("seasons");
  const v = VOCAB[mode];
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1" role="group" aria-label="Cycle vocabulary">
        {(Object.keys(VOCAB) as (keyof typeof VOCAB)[]).map((k) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            aria-pressed={mode === k}
            style={{
              borderRadius: 999,
              padding: "5px 16px",
              fontSize: "0.8125rem",
              background: mode === k ? A.coral : "transparent",
              color: mode === k ? "#fff" : T.inkMuted,
              cursor: "pointer",
            }}
          >
            {k === "seasons" ? "Seasons" : "Phases"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 400 260" className="w-full" style={{ maxWidth: 400, marginTop: 12 }} role="img" aria-label={`Cycle ring labelled ${v.names.join(", ")}`}>
        {SEASON_COLORS.map((c, i) => (
          <path key={i} d={arc(i)} fill="none" stroke={c} strokeWidth={22} />
        ))}
        {LABELS.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor={l.anchor} fontSize={12} fill={T.inkMuted}>
            {v.names[i]}
          </text>
        ))}
        <text x={CX} y={126} textAnchor="middle" fontSize={15} fontWeight={600} fill={T.ink}>{v.current}</text>
        <text x={CX} y={146} textAnchor="middle" fontSize={12} fill={T.inkMuted}>day 18</text>
      </svg>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", lineHeight: 1.7, color: T.ink, textAlign: "center", maxWidth: "40ch", marginTop: 12 }}>
        {v.note}
      </p>
    </div>
  );
}

/* ---------- 02: countdown vs phase bands ---------- */

const CYCLE = 41; // PLACEHOLDER example cycle length
const PREDICTED = 28;
// Season lines are the prototype's own (prototype/ui.tsx PHASES.seasonLine).
// Winter and summer bands are too narrow to hold them, so every line sits
// below its band, alternating between two rows so neighbours never collide.
const BANDS = [
  { name: "Winter", line: "Rest and recovery", days: 5, dark: true },
  { name: "Spring", line: "Growth and renewal", days: 17 },
  { name: "Sum.", line: "High energy and clarity", days: 4 },
  { name: "Autumn", line: "Slowing down · you’re likely here", days: 15 },
];

function CountdownVsPhases() {
  const W = 620, cell = W / CYCLE;
  let x = 0;
  return (
    <svg viewBox="0 0 620 226" className="w-full" role="img" aria-label="A 41-day cycle shown as a failing 28-day countdown, and as AIRA phase bands">
      <text x={0} y={14} fontSize={12} fill={T.inkMuted}>Typical tracker</text>
      {Array.from({ length: CYCLE }, (_, i) => (
        <rect key={i} x={i * cell} y={28} width={cell - 2} height={30} rx={2} fill={i >= PREDICTED ? "#F09595" : "rgba(0,0,0,0.12)"} />
      ))}
      <line x1={PREDICTED * cell - 1} y1={24} x2={PREDICTED * cell - 1} y2={62} stroke={T.ink} strokeDasharray="3 3" />
      <text x={PREDICTED * cell + 4} y={76} fontSize={11} fill={T.inkMuted}>predicted day {PREDICTED}</text>
      <text x={W} y={76} textAnchor="end" fontSize={11} fill={LATE}>{CYCLE - PREDICTED} days late</text>

      <text x={0} y={116} fontSize={12} fill={T.inkMuted}>AIRA</text>
      {BANDS.map((b, i) => {
        const w = b.days * cell;
        const el = (
          <g key={i}>
            <rect x={x} y={126} width={w - 2} height={30} rx={4} fill={SEASON_COLORS[i]} />
            <text x={x + 8} y={145} fontSize={12} fill={b.dark ? A.textLight : A.dark}>{b.name}</text>
            <line x1={x + 1} y1={158} x2={x + 1} y2={i % 2 ? 184 : 166} stroke={SEASON_COLORS[i]} strokeWidth={2} />
            <text x={x + 7} y={i % 2 ? 188 : 170} fontSize={11} fill={T.inkMuted}>{b.line}</text>
          </g>
        );
        x += w;
        return el;
      })}
      <text x={0} y={220} fontSize={11} fill={T.inkMuted}>Same {CYCLE} days. Nothing is late.</text>
    </svg>
  );
}

/* ---------- 03: fixed reminders vs energy-timed nudges ---------- */

const CURVE = "M0 60 C40 40 70 50 90 70 S140 150 180 145 S240 60 270 55 S330 150 370 155 S430 140 460 90 S540 40 620 50";

function EnergyNudges() {
  const fixed = [30, 118, 206, 294, 382, 470, 558];
  return (
    <>
      <svg viewBox="0 0 620 200" className="w-full" role="img" aria-label="Energy across a week: fixed daily reminders land on low days, AIRA nudges land on higher ones">
        <path d={CURVE} fill="none" stroke={T.inkMuted} strokeWidth={2} />
        <text x={0} y={20} fontSize={11} fill={T.inkMuted}>energy</text>
        {fixed.map((cx) => <circle key={cx} cx={cx} cy={185} r={5} fill={LATE} />)}
        <line x1={206} y1={178} x2={206} y2={140} stroke={LATE} strokeDasharray="2 3" />
        <line x1={382} y1={178} x2={382} y2={156} stroke={LATE} strokeDasharray="2 3" />
        <text x={214} y={170} fontSize={11} fill={LATE}>“You missed yesterday”</text>
        {[[45, 45], [270, 55], [540, 42]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r={7} fill={A.coral} />)}
        <text x={280} y={44} fontSize={11} fill="#993C1D">“Good moment to log, if you want”</text>
        <text x={620} y={198} textAnchor="end" fontSize={11} fill={T.inkMuted}>red: fixed daily reminder · coral: AIRA nudge</text>
      </svg>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {[
          { who: "Other trackers", msg: "3-day streak lost. Log now to restart.", accent: false },
          { who: "AIRA, end of log", msg: "That’s enough for today. Rest counts too.", accent: true },
        ].map((n) => (
          <div key={n.who} style={{ background: "#fff", border: `1px solid ${n.accent ? A.coral : "rgba(0,0,0,0.1)"}`, borderRadius: 12, padding: "14px 16px", fontSize: "0.875rem", lineHeight: 1.6, color: T.ink }}>
            <span style={{ color: n.accent ? A.coral : T.inkMuted }}>{n.who}</span>
            <br />
            {n.msg}
          </div>
        ))}
      </div>
    </>
  );
}

export function AiraDecisions() {
  return (
    <div className="flex flex-col gap-5">
      <Decision
        index={1}
        title="One toggle, two vocabularies, same cycle"
        rejected="picking one framing for everyone"
        caption="The ring doesn’t move when you switch. Only the words change. Source: CHI research on menstrual data framing."
      >
        <VocabToggle />
      </Decision>
      <Decision
        index={2}
        title="How the phase feels, not a countdown"
        rejected="the 28-day predicted-date model"
        caption="Survey: nearly everyone said their symptoms “vary too much to tell.”"
      >
        <CountdownVsPhases />
      </Decision>
      <Decision
        index={3}
        title="Nudges that wait for energy"
        rejected="9am reminders and streak counters"
        caption="Fogg Behavior Model and COM-B. Survey respondents chose gentle, well-timed prompts over rigid reminders."
      >
        <EnergyNudges />
      </Decision>
    </div>
  );
}
