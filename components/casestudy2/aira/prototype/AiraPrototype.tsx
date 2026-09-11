"use client";

import { useEffect, useState } from "react";
import {
  C, F, PHASES, GLOBAL_CSS, Device, StatusBar, Header, Txt, Label, Icon, Mascot, Primary, TextBtn,
  Group, Row, Check, Toggle, Segmented, Chip, Card, MonthGrid, iconBtn,
} from "./ui";

// AIRA — end-to-end clickable prototype.
// Onboarding → Today dashboard → Track (cycle, meals, activity, sleep) → Learn,
// plus the energy check-in branch (Zen breathing, "just one thing", talk it out).
// Every screen is built from ./ui so the whole app shares one visual system.

type Tab = "home" | "track" | "learn";
export type Nav = {
  go: (id: string) => void;
  back: () => void;
  tab: (t: Tab) => void;
  toast: (m: string) => void;
  s: AppState;
  set: (p: Partial<AppState>) => void;
};
export type AppState = {
  name: string;
  goals: string[];
  perms: Record<string, boolean>;
  lastPeriod: number | null;
  irregular: boolean;
  bed: number; // minutes after 18:00
  wake: number; // minutes after 00:00
  flow: string;
  symptoms: string[];
  energy: string;
  meals: { name: string }[];
  workout: string;
  phaseIdx: number;
  seasons: boolean;
  zenLen: number;
};

export const INITIAL: AppState = {
  name: "",
  goals: [],
  perms: { motion: true, sleep: true, cycle: true, notify: false },
  lastPeriod: 4,
  irregular: true,
  bed: 5 * 60, // 23:00
  wake: 7 * 60 + 30,
  flow: "Medium",
  symptoms: ["Abdominal cramps", "Headaches"],
  energy: "Medium energy",
  meals: [
    { name: "Overnight oats, berries" },
    { name: "Chicken grain bowl" },
    { name: "Apple and almond butter" },
  ],
  workout: "Pilates",
  phaseIdx: 3,
  seasons: false,
  zenLen: 2,
};

// ─── Screen chrome ──────────────────────────────────────────────────────────
function Screen({
  children,
  tab,
  nav,
  bg = C.ground,
  pad = true,
  footer,
}: {
  children: React.ReactNode;
  tab?: Tab;
  nav?: Nav;
  bg?: string;
  pad?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <div className="aira-screen" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: bg }}>
      <StatusBar />
      <div className="aira-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: pad ? "0 20px" : 0, paddingBottom: tab ? 110 : footer ? 16 : 40 }}>
        {children}
      </div>
      {footer && <div style={{ padding: "12px 20px 34px", flexShrink: 0 }}>{footer}</div>}
      {tab && nav && <TabBar active={tab} nav={nav} />}
    </div>
  );
}

function TabBar({ active, nav }: { active: Tab; nav: Nav }) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "home", label: "Today", icon: "sun" },
    { id: "track", label: "Track", icon: "plus" },
    { id: "learn", label: "Learn", icon: "books" },
  ];
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, height: 88, paddingBottom: 26, display: "flex",
      background: "rgba(14,14,17,0.92)", backdropFilter: "blur(16px)", borderTop: `1px solid ${C.line}`, zIndex: 20,
    }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => nav.tab(t.id)} style={{
            flex: 1, background: "none", border: 0, cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
          }}>
            <Icon name={t.icon} size={23} color={on ? C.coral : C.faint} w={on ? 2 : 1.75} />
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: on ? C.coral : C.faint }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Title({ children, sub, style }: { children: React.ReactNode; sub?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ margin: "12px 0 24px", ...style }}>
      <Txt v="title" style={{ fontSize: 26, lineHeight: 1.18 }}>{children}</Txt>
      {sub && <Txt v="sub" style={{ marginTop: 8, fontSize: 15 }}>{sub}</Txt>}
    </div>
  );
}

function Progress({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div style={{ display: "flex", gap: 4, flex: 1, margin: "0 8px" }}>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? C.coral : C.cardHi, transition: "background 300ms" }} />
      ))}
    </div>
  );
}

function OnbHeader({ nav, step }: { nav: Nav; step: number }) {
  return (
    <div style={{ height: 52, display: "flex", alignItems: "center", margin: "0 -8px" }}>
      <button onClick={nav.back} aria-label="Back" style={iconBtn}><Icon name="back" size={22} /></button>
      <Progress step={step} />
      <span style={{ width: 40 }} />
    </div>
  );
}

const fmt = (mins: number) => {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
};

// ═══ ONBOARDING ═════════════════════════════════════════════════════════════
function Splash({ nav }: { nav: Nav }) {
  return (
    <Screen
      footer={
        <>
          <Primary onClick={() => nav.go("intro")}>Get started</Primary>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <TextBtn color={C.muted} onClick={() => nav.go("signin")}>I already have an account</TextBtn>
          </div>
        </>
      }
    >
      <div style={{ height: 560, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {[C.lavender, C.blue, C.green, C.peach].map((c, i) => (
          <i key={i} aria-hidden style={{
            position: "absolute", width: 14, height: 14, borderRadius: 999, background: c, opacity: 0.85,
            top: 170 + Math.sin(i * 1.6) * 110, left: 175 + Math.cos(i * 1.6) * 130,
          }} />
        ))}
        <div style={{ animation: "airaFloat 4s ease-in-out infinite" }}><Mascot size={148} /></div>
        <Txt v="largeTitle" style={{ fontSize: 40, marginTop: 28 }}>Aira</Txt>
        <Txt v="sub" style={{ marginTop: 8, fontSize: 16, textAlign: "center", maxWidth: 260 }}>
          A habit coach that moves with your cycle, not against it.
        </Txt>
      </div>
    </Screen>
  );
}

const SLIDES = [
  { title: "Managing PMOS shouldn't feel like a second job", body: "Sleep, food, movement, mood and your cycle — tracked in one calm place instead of five apps.", art: "stack" },
  { title: "One plan that adapts to you", body: "Aira reads each day against where you are in your cycle, so your plan changes when your energy does.", art: "wheel" },
  { title: "Small steps. Real patterns. Zero guilt.", body: "Gentle nudges on low-energy days, and the patterns behind your symptoms when you're ready to look.", art: "steps" },
];

function IntroArt({ kind }: { kind: string }) {
  if (kind === "wheel")
    return (
      <svg width="230" height="230" viewBox="0 0 230 230" aria-hidden>
        {PHASES.map((p, i) => {
          const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2 + 0.05;
          const a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.05;
          const r = 92;
          return <path key={p.key} d={`M ${115 + r * Math.cos(a0)} ${115 + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${115 + r * Math.cos(a1)} ${115 + r * Math.sin(a1)}`} stroke={p.color} strokeWidth="22" fill="none" strokeLinecap="round" />;
        })}
        <foreignObject x="65" y="62" width="100" height="100"><Mascot size={100} mood="calm" /></foreignObject>
      </svg>
    );
  if (kind === "steps")
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 230 }}>
        {[60, 92, 124, 156].map((h, i) => (
          <i key={h} style={{ width: 40, height: h, borderRadius: 12, background: [C.lavender, C.blue, C.green, C.coral][i], opacity: 0.9 }} />
        ))}
        <div style={{ marginLeft: -6, marginBottom: 150 }}><Mascot size={74} /></div>
      </div>
    );
  return (
    <div style={{ position: "relative", width: 240, height: 230 }}>
      {[
        { i: "moon", c: C.lavender, x: 8, y: 30, r: -8 }, { i: "bowl", c: C.peach, x: 150, y: 12, r: 6 },
        { i: "walk", c: C.green, x: 170, y: 140, r: 10 }, { i: "drop", c: C.coral, x: 12, y: 150, r: -4 }, { i: "mind", c: C.blue, x: 90, y: 178, r: 0 },
      ].map((b) => (
        <span key={b.i} style={{ position: "absolute", left: b.x, top: b.y, width: 58, height: 58, borderRadius: 18, background: C.card, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${b.r}deg)` }}>
          <Icon name={b.i} size={26} color={b.c} />
        </span>
      ))}
      <div style={{ position: "absolute", left: 70, top: 62 }}><Mascot size={100} /></div>
    </div>
  );
}

function Intro({ nav }: { nav: Nav }) {
  const [i, setI] = useState(0);
  const s = SLIDES[i];
  const last = i === SLIDES.length - 1;
  return (
    <Screen
      footer={
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
            {SLIDES.map((_, k) => (
              <i key={k} style={{ width: k === i ? 22 : 6, height: 6, borderRadius: 3, background: k === i ? C.coral : C.cardHi, transition: "all 250ms" }} />
            ))}
          </div>
          <Primary onClick={() => (last ? nav.go("auth") : setI(i + 1))}>{last ? "Create my plan" : "Next"}</Primary>
        </>
      }
    >
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 -8px" }}>
        <button onClick={() => (i ? setI(i - 1) : nav.back())} aria-label="Back" style={iconBtn}><Icon name="back" size={22} /></button>
        {!last && <TextBtn color={C.muted} onClick={() => nav.go("auth")}>Skip</TextBtn>}
      </div>
      <div key={i} className="aira-screen">
        <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}><IntroArt kind={s.art} /></div>
        <Txt v="title" style={{ fontSize: 28, lineHeight: 1.15 }}>{s.title}</Txt>
        <Txt v="sub" style={{ marginTop: 12, fontSize: 16 }}>{s.body}</Txt>
      </div>
    </Screen>
  );
}

function Auth({ nav }: { nav: Nav }) {
  const opt = (label: string, icon: React.ReactNode, tone: "light" | "quiet" | "coral", to = "signup") => (
    <Primary tone={tone} icon={icon} onClick={() => nav.go(to)}>{label}</Primary>
  );
  return (
    <Screen pad={false}>
      <div style={{ height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Mascot size={120} />
        <Txt v="title" style={{ marginTop: 20 }}>Welcome to Aira</Txt>
      </div>
      <div style={{ background: C.card, borderRadius: "28px 28px 0 0", padding: "28px 20px 40px", minHeight: 380 }}>
        <Txt v="headline" style={{ textAlign: "center", fontSize: 18 }}>Small steps. Real patterns.</Txt>
        <Txt v="sub" style={{ textAlign: "center", marginTop: 6, marginBottom: 24 }}>Create an account to save your plan.</Txt>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {opt("Continue with Apple", <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill={C.ground} d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3-2.5.9-1.4 1.3-2.8 1.3-2.9-.1 0-2.9-1.1-2.9-4.1zM13.9 5c.7-.8 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg>, "light")}
          {opt("Continue with Google", <span style={{ fontWeight: 700, fontSize: 17, color: C.text }}>G</span>, "quiet")}
          {opt("Continue with email", <Icon name="mail" size={19} color={C.ground} />, "coral")}
        </div>
        <Txt v="caption" style={{ textAlign: "center", marginTop: 20, color: C.faint, fontWeight: 400 }}>
          By continuing you agree to Aira's Terms and Privacy Policy. Your health data is never sold.
        </Txt>
      </div>
    </Screen>
  );
}

function SignUp({ nav, mode = "signup" }: { nav: Nav; mode?: "signup" | "signin" }) {
  const [name, setName] = useState(nav.s.name);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const ok = mode === "signin" ? true : name.trim().length > 0;
  return (
    <Screen
      footer={
        <Primary
          disabled={!ok}
          onClick={() => {
            nav.set({ name: name.trim() || "Maya" });
            if (mode === "signin") nav.tab("home");
            else nav.go("goals");
          }}
        >
          {mode === "signin" ? "Log in" : "Continue"}
        </Primary>
      }
    >
      <div style={{ height: 52, display: "flex", alignItems: "center", margin: "0 -8px" }}>
        <button onClick={nav.back} aria-label="Back" style={iconBtn}><Icon name="back" size={22} /></button>
      </div>
      <Title sub={mode === "signin" ? "Good to see you again." : "It takes about two minutes to set up."}>
        {mode === "signin" ? "Log in" : "Let's get started"}
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {mode === "signup" && (
          <Field label="What should we call you?">
            <input className="aira-input" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        )}
        <Field label="Email">
          <input className="aira-input" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <input className="aira-input" type="password" placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
        </Field>
        {mode === "signin" && <div style={{ textAlign: "right", marginTop: -6 }}><TextBtn color={C.muted}>Forgot password?</TextBtn></div>}
      </div>
    </Screen>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <Txt v="caption" style={{ marginBottom: 8, color: C.muted }}>{label}</Txt>
      {children}
    </label>
  );
}

const GOALS = [
  { id: "cycle", label: "Understand my cycle", icon: "drop", c: C.lavender },
  { id: "energy", label: "Have steadier energy", icon: "bolt", c: C.peach },
  { id: "weight", label: "Manage my weight", icon: "walk", c: C.green },
  { id: "calm", label: "Feel calmer", icon: "mind", c: C.blue },
  { id: "sleep", label: "Sleep better", icon: "moon", c: C.lavender },
  { id: "food", label: "Eat for my hormones", icon: "bowl", c: C.peach },
];

function Goals({ nav }: { nav: Nav }) {
  const g = nav.s.goals;
  const toggle = (id: string) => nav.set({ goals: g.includes(id) ? g.filter((x) => x !== id) : [...g, id] });
  return (
    <Screen footer={<Primary disabled={!g.length} onClick={() => nav.go("perms")}>Continue</Primary>}>
      <OnbHeader nav={nav} step={1} />
      <Title sub="Pick as many as you like. You can change these any time.">
        {nav.s.name ? `${nav.s.name}, what` : "What"} matters most to you right now?
      </Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {GOALS.map((x) => {
          const on = g.includes(x.id);
          return (
            <button key={x.id} onClick={() => toggle(x.id)} className="aira-press" style={{
              height: 124, borderRadius: 18, padding: 16, textAlign: "left", cursor: "pointer", fontFamily: F,
              background: on ? C.cardHi : C.card, border: `1.5px solid ${on ? C.coral : "transparent"}`,
              display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative",
            }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: `${x.c}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={x.icon} size={21} color={x.c} />
              </span>
              <span style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.25, paddingRight: 8 }}>{x.label}</span>
              <span style={{ position: "absolute", top: 14, right: 14 }}><Check on={on} /></span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}

function Perms({ nav }: { nav: Nav }) {
  const p = nav.s.perms;
  const flip = (k: string) => nav.set({ perms: { ...p, [k]: !p[k] } });
  const items = [
    { k: "motion", icon: "walk", c: C.green, t: "Motion and steps", d: "Counts movement without a wearable." },
    { k: "sleep", icon: "moon", c: C.lavender, t: "Sleep", d: "Nightstand detection estimates when you fell asleep." },
    { k: "cycle", icon: "drop", c: C.coral, t: "Cycle data", d: "Imports past periods from Apple Health." },
    { k: "notify", icon: "bell", c: C.blue, t: "Gentle nudges", d: "Two a day at most. Never on rest days." },
  ];
  return (
    <Screen footer={<Primary onClick={() => nav.go("cycleSetup")}>Continue</Primary>}>
      <OnbHeader nav={nav} step={2} />
      <Title sub="Aira connects the pieces so you don't have to. Turn on what you're comfortable with.">A few ingredients we need</Title>
      <Group>
        {items.map((it) => (
          <Row key={it.k} onClick={() => flip(it.k)} label={it.t} detail={it.d}
            lead={<span style={{ width: 36, height: 36, borderRadius: 10, background: `${it.c}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={it.icon} size={19} color={it.c} /></span>}
            right={<Toggle on={p[it.k]} />} />
        ))}
      </Group>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 20, padding: "0 4px" }}>
        <Icon name="lock" size={16} color={C.faint} />
        <Txt v="caption" style={{ color: C.faint, fontWeight: 400 }}>Stored on your phone and encrypted. You can revoke access in Settings.</Txt>
      </div>
    </Screen>
  );
}

function CycleSetup({ nav }: { nav: Nav }) {
  return (
    <Screen footer={<Primary onClick={() => nav.go("sleepSetup")}>Continue</Primary>}>
      <OnbHeader nav={nav} step={3} />
      <Title sub="An estimate is fine. Aira learns from every cycle you log.">When did your last period start?</Title>
      <Card><MonthGrid selected={nav.s.lastPeriod} onSelect={(d) => nav.set({ lastPeriod: d })} today={21} /></Card>
      <Group style={{ marginTop: 12 }}>
        <Row label="My cycles are irregular" detail="Very common with PMOS. We'll follow how you feel, not a 28-day countdown."
          onClick={() => nav.set({ irregular: !nav.s.irregular })} right={<Toggle on={nav.s.irregular} />} />
      </Group>
    </Screen>
  );
}

function SleepSetup({ nav }: { nav: Nav }) {
  const { bed, wake } = nav.s;
  const dur = 24 * 60 - (18 * 60 + bed) + wake;
  const stepper = (label: string, value: string, dec: () => void, inc: () => void, icon: string) => (
    <Card style={{ flex: 1, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={icon} size={15} color={C.muted} /><Txt v="caption">{label}</Txt></div>
      <Txt v="title" style={{ fontSize: 22, margin: "8px 0 12px", fontVariantNumeric: "tabular-nums" }}>{value}</Txt>
      <div style={{ display: "flex", gap: 8 }}>
        {[["−", dec], ["+", inc]].map(([s, fn]) => (
          <button key={s as string} onClick={fn as () => void} style={{ flex: 1, height: 34, borderRadius: 10, border: 0, background: C.cardHi, color: C.text, fontSize: 18, cursor: "pointer" }}>{s as string}</button>
        ))}
      </div>
    </Card>
  );
  const bedAngle = ((18 * 60 + bed) % (24 * 60)) / (24 * 60) * 360;
  const wakeAngle = wake / (24 * 60) * 360;
  const R = 86;
  const pt = (a: number) => ({ x: 110 + R * Math.sin((a * Math.PI) / 180), y: 110 - R * Math.cos((a * Math.PI) / 180) });
  const a = pt(bedAngle), b = pt(wakeAngle);
  const sweep = (wakeAngle - bedAngle + 360) % 360;
  return (
    <Screen footer={<Primary onClick={() => nav.go("ready")}>Continue</Primary>}>
      <OnbHeader nav={nav} step={4} />
      <Title sub="Your usual weeknight is enough to start.">What does a typical night look like?</Title>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden>
          <circle cx="110" cy="110" r={R} stroke={C.card} strokeWidth="26" fill="none" />
          <path d={`M ${a.x} ${a.y} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${b.x} ${b.y}`} stroke={C.lavender} strokeWidth="26" fill="none" strokeLinecap="round" />
          <circle cx={a.x} cy={a.y} r="10" fill={C.text} /><circle cx={b.x} cy={b.y} r="10" fill={C.coral} />
          {["12AM", "6AM", "12PM", "6PM"].map((l, i) => {
            const p = { x: 110 + 52 * Math.sin((i * 90 * Math.PI) / 180), y: 114 - 52 * Math.cos((i * 90 * Math.PI) / 180) };
            return <text key={l} x={p.x} y={p.y} textAnchor="middle" fontSize="10" fill={C.faint} fontFamily="inherit">{l}</text>;
          })}
          <text x="110" y="106" textAnchor="middle" fontSize="22" fontWeight="650" fill={C.text}>{Math.floor(dur / 60)}h {dur % 60 ? `${dur % 60}m` : ""}</text>
          <text x="110" y="126" textAnchor="middle" fontSize="11" fill={C.muted}>in bed</text>
        </svg>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {stepper("Bedtime", fmt(18 * 60 + bed), () => nav.set({ bed: Math.max(120, bed - 15) }), () => nav.set({ bed: Math.min(420, bed + 15) }), "moon")}
        {stepper("Wake up", fmt(wake), () => nav.set({ wake: Math.max(300, wake - 15) }), () => nav.set({ wake: Math.min(600, wake + 15) }), "sun")}
      </div>
    </Screen>
  );
}

function Ready({ nav }: { nav: Nav }) {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1400); return () => clearTimeout(t); }, []);
  return (
    <Screen footer={<Primary disabled={!done} onClick={() => nav.tab("home")}>{done ? "Take me to Today" : "Building your plan…"}</Primary>}>
      <OnbHeader nav={nav} step={5} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 30 }}>
        <div style={{ position: "relative" }}>
          <i aria-hidden style={{ position: "absolute", inset: -24, borderRadius: 999, background: C.lavenderWash, animation: "airaPulse 2.4s ease-in-out infinite" }} />
          <Mascot size={140} mood="sleepy" />
        </div>
        <Txt v="caption" style={{ marginTop: 36, color: C.coral, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Your ideal sleep</Txt>
        <Txt v="largeTitle" style={{ fontSize: 44, marginTop: 6 }}>8h 30m</Txt>
        <Txt v="sub" style={{ marginTop: 12, fontSize: 15, maxWidth: 290 }}>
          Based on your luteal phase and the night you described. We'll adjust it as your cycle moves.
        </Txt>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 28 }}>
          <Chip>Luteal · Day 18</Chip>
          <Chip color={C.lavender} wash={C.lavenderWash}>Irregular-friendly</Chip>
          {nav.s.goals.length > 0 && (
            <Chip color={C.text} wash={C.card}>{nav.s.goals.length} goal{nav.s.goals.length === 1 ? "" : "s"}</Chip>
          )}
        </div>
      </div>
    </Screen>
  );
}

// ═══ TODAY (dashboard) ══════════════════════════════════════════════════════
function Gauge({ score }: { score: number }) {
  const r = 104, cx = 130, cy = 124;
  const sweep = (score / 100) * 240;
  const pt = (deg: number) => ({ x: cx + r * Math.cos(((deg - 210) * Math.PI) / 180), y: cy + r * Math.sin(((deg - 210) * Math.PI) / 180) });
  const s = pt(0), e = pt(240), v = pt(sweep);
  return (
    <svg width="260" height="210" viewBox="0 0 260 210" aria-hidden>
      <defs>
        <linearGradient id="airaG" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={C.coral} /><stop offset="1" stopColor={C.green} /></linearGradient>
      </defs>
      <path d={`M ${s.x} ${s.y} A ${r} ${r} 0 1 1 ${e.x} ${e.y}`} stroke={C.card} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${v.x} ${v.y}`} stroke="url(#airaG)" strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx={v.x} cy={v.y} r="9" fill={C.ground} stroke={C.green} strokeWidth="4" />
    </svg>
  );
}

function Home({ nav }: { nav: Nav }) {
  const phase = PHASES[3];
  const pillars = [
    { t: "Sleep", v: "8h 46m", d: "+1h vs avg", icon: "moon", c: C.lavender, to: "sleep" },
    { t: "Move", v: "9,466", d: "steps", icon: "walk", c: C.green, to: "steps" },
    { t: "Fuel", v: `${nav.s.meals.length}`, d: "meals logged", icon: "bowl", c: C.peach, to: "meals" },
    { t: "Mind", v: "Calm", d: "check in", icon: "mind", c: C.blue, to: "energy" },
  ];
  return (
    <Screen tab="home" nav={nav}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", margin: "8px 0 20px" }}>
        <div>
          <Txt v="caption" style={{ color: C.faint }}>Thursday, December 21</Txt>
          <Txt v="largeTitle" style={{ marginTop: 4 }}>Good morning{nav.s.name ? `, ${nav.s.name}` : ""}</Txt>
        </div>
        <span style={{ width: 40, height: 40, borderRadius: 999, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
          <Icon name="user" size={20} color={C.muted} />
        </span>
      </div>

      {/* Cycle position — the context every other number on this screen is read against */}
      <Card onClick={() => nav.go("phase")} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
          {PHASES.map((p, i) => {
            const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2 + 0.12, a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.12;
            return <path key={p.key} d={`M ${22 + 17 * Math.cos(a0)} ${22 + 17 * Math.sin(a0)} A 17 17 0 0 1 ${22 + 17 * Math.cos(a1)} ${22 + 17 * Math.sin(a1)}`} stroke={p.color} strokeOpacity={i === 3 ? 1 : 0.3} strokeWidth="6" fill="none" strokeLinecap="round" />;
          })}
        </svg>
        <div style={{ flex: 1 }}>
          <Txt v="headline">{phase.phase} · Day 18</Txt>
          <Txt v="sub" style={{ marginTop: 2, whiteSpace: "nowrap" }}>{phase.season} season</Txt>
        </div>
        {/* Logging a period is the most time-sensitive entry in the app, so it
            gets a direct action here instead of living two taps deep in Track. */}
        <button
          onClick={(e) => { e.stopPropagation(); nav.go("logPeriod"); }}
          className="aira-press"
          style={{
            height: 34, padding: "0 12px", borderRadius: 999, border: 0, cursor: "pointer", flexShrink: 0,
            background: C.coralWash, color: C.coral, fontFamily: F, fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          <Icon name="drop" size={14} color={C.coral} w={2} /> Log period
        </button>
      </Card>

      {/* Readiness */}
      <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Gauge score={92} />
        <div style={{ position: "absolute", top: 70, textAlign: "center" }}>
          <Txt style={{ fontSize: 60, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>92</Txt>
          <Label style={{ marginTop: 8 }}>Readiness</Label>
          <Chip color={C.green} wash="rgba(93,184,142,0.14)">Great</Chip>
        </div>
      </div>
      <Txt v="sub" style={{ textAlign: "center", fontSize: 15, margin: "-8px 16px 24px", color: C.muted }}>
        Your hormones are working for you today. Closing last night's sleep gap did most of the work.
      </Txt>

      {/* Pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {pillars.map((p) => (
          <Card key={p.t} onClick={() => nav.go(p.to)} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={p.icon} size={16} color={p.c} /><Txt v="caption">{p.t}</Txt></span>
              <Icon name="chevron" size={14} color={C.faint} />
            </div>
            <Txt v="title" style={{ fontSize: 22, marginTop: 10, fontVariantNumeric: "tabular-nums" }}>{p.v}</Txt>
            <Txt v="caption" style={{ color: C.faint, fontWeight: 400, marginTop: 2 }}>{p.d}</Txt>
          </Card>
        ))}
      </div>

      {/* Check-in */}
      <Card onClick={() => nav.go("energy")} style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14, background: C.coralWash }}>
        <span style={{ width: 40, height: 40, borderRadius: 12, background: C.coral, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="heart" size={20} color={C.ground} /></span>
        <div style={{ flex: 1 }}>
          <Txt v="headline">How are you feeling right now?</Txt>
          <Txt v="sub" style={{ marginTop: 2 }}>A 10-second check-in tunes today's plan.</Txt>
        </div>
        <Icon name="chevron" size={16} color={C.coral} />
      </Card>

      <Label style={{ margin: "28px 0 12px" }}>Today&rsquo;s signals</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Card onClick={() => nav.go("sleep")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Txt v="headline">Sleep debt</Txt><Chip color={C.lavender} wash={C.lavenderWash}>1.7 h</Chip>
          </div>
          <Txt v="sub">Naps aren't needed. An earlier lights-out tonight closes the gap on its own.</Txt>
        </Card>
        <Card onClick={() => nav.go("winddown")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Txt v="headline">Wind down starts at 8:00 PM</Txt><Icon name="moon" size={18} color={C.lavender} />
          </div>
          <Txt v="sub">Last meal three hours before bed — digestion disrupts deep sleep.</Txt>
        </Card>
        <Card onClick={() => nav.go("article")}>
          <Label style={{ color: C.coral, marginBottom: 6 }}>Worth knowing</Label>
          <Txt v="sub" style={{ color: C.text }}>Gentle movement boosts insulin sensitivity. Short walks after meals count more than you think.</Txt>
        </Card>
      </div>
    </Screen>
  );
}

// ═══ TRACK ══════════════════════════════════════════════════════════════════
function Track({ nav }: { nav: Nav }) {
  const logs = [
    { t: "Period", icon: "drop", c: C.coral, to: "logPeriod" },
    { t: "Symptoms", icon: "heart", c: C.lavender, to: "logSymptoms" },
    { t: "Meal", icon: "bowl", c: C.peach, to: "meals" },
    { t: "Activity", icon: "walk", c: C.green, to: "logActivity" },
    { t: "Sleep", icon: "moon", c: C.lavender, to: "sleep" },
    { t: "Mood", icon: "mind", c: C.blue, to: "energy" },
  ];
  return (
    <Screen tab="track" nav={nav}>
      <Txt v="largeTitle" style={{ margin: "8px 0 6px" }}>Track</Txt>
      <Txt v="sub" style={{ marginBottom: 24, fontSize: 15 }}>Log what you can. Every entry sharpens your patterns.</Txt>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {logs.map((l) => (
          <button key={l.t} onClick={() => nav.go(l.to)} className="aira-press" style={{
            height: 100, borderRadius: 16, background: C.card, border: 0, cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 10, fontFamily: F,
          }}>
            <span style={{ width: 40, height: 40, borderRadius: 999, background: `${l.c}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={l.icon} size={20} color={l.c} /></span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{l.t}</span>
          </button>
        ))}
      </div>
      <Label style={{ margin: "28px 0 12px" }}>Insights</Label>
      <Group>
        <Row label="Cycle insights" detail="Predictions and phase guidance" chevron onClick={() => nav.go("cycle")} lead={<Icon name="drop" size={20} color={C.coral} />} />
        <Row label="Activity insights" detail="Phase-matched movement" chevron onClick={() => nav.go("activity")} lead={<Icon name="walk" size={20} color={C.green} />} />
        <Row label="Steps" detail="9,466 today" chevron onClick={() => nav.go("steps")} lead={<Icon name="bolt" size={20} color={C.peach} />} />
        <Row label="Sleep window" detail="8h 46m last night" chevron onClick={() => nav.go("sleep")} lead={<Icon name="moon" size={20} color={C.lavender} />} />
      </Group>
    </Screen>
  );
}

// ═══ CYCLE ══════════════════════════════════════════════════════════════════
function Cycle({ nav }: { nav: Nav }) {
  return (
    <Screen tab="track" nav={nav} pad={false}>
      <Header title="Cycle insights" onBack={nav.back} />
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 28px" }}>
          <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden>
            {/* The four phases, clockwise from the top; the current one (luteal) is full strength */}
            {[[65, 26], [104, 65], [65, 104], [26, 65]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 3 ? 22 : 18} fill={PHASES[i].color} opacity={i === 3 ? 1 : 0.35} />
            ))}
          </svg>
        </div>
        <Card style={{ background: C.lavenderWash, marginBottom: 24 }}>
          <Txt v="headline" style={{ fontSize: 17 }}>You're in your luteal phase</Txt>
          <Txt v="sub" style={{ marginTop: 6, color: C.text, opacity: 0.8 }}>
            Log your period when it starts and Aira will sharpen your predictions and daily guidance.
          </Txt>
        </Card>
        <Group>
          <Row label="Log my period" lead={<Icon name="drop" size={20} color={C.coral} />} chevron onClick={() => nav.go("logPeriod")} />
          <Row label="Cycle prediction" lead={<Icon name="calendar" size={20} color={C.muted} />} chevron onClick={() => nav.go("prediction")} />
          <Row label="Phase-based insights" lead={<Icon name="sparkle" size={20} color={C.muted} />} chevron onClick={() => nav.go("phase")} />
        </Group>
      </div>
    </Screen>
  );
}

function LogPeriod({ nav }: { nav: Nav }) {
  const [day, setDay] = useState(21);
  return (
    <Screen pad={false} footer={<Primary onClick={() => nav.go("logSymptoms")}>Next: symptoms</Primary>}>
      <Header title="Log period" onBack={nav.back} />
      <div style={{ padding: "8px 20px 0" }}>
        <Card><MonthGrid selected={day} onSelect={setDay} today={21} /></Card>
        <Label style={{ margin: "24px 0 6px" }}>Flow level</Label>
        <Txt v="sub" style={{ marginBottom: 12 }}>Logging flow at the start of your period helps Aira predict the next one.</Txt>
        <Group>
          {["Light", "Medium", "Heavy", "Spotting only"].map((f) => (
            <Row key={f} label={f} selected={nav.s.flow === f} onClick={() => nav.set({ flow: f })}
              right={nav.s.flow === f ? <Icon name="check" size={18} color={C.coral} w={2.25} /> : null} />
          ))}
        </Group>
      </div>
    </Screen>
  );
}

const SYMPTOMS = ["Abdominal cramps", "Acne", "Appetite changes", "Bloating", "Breast tenderness", "Back pain", "Headaches", "Hair shedding"];

function LogSymptoms({ nav }: { nav: Nav }) {
  const sel = nav.s.symptoms;
  const flip = (x: string) => nav.set({ symptoms: sel.includes(x) ? sel.filter((y) => y !== x) : [...sel, x] });
  return (
    <Screen pad={false} footer={<Primary onClick={() => { nav.toast("Logged. Your insights just updated."); nav.back(); }}>Save</Primary>}>
      <Header title="How do you feel?" sub="Today, 21 Dec" onBack={nav.back} />
      <div style={{ padding: "12px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <Label>Symptoms</Label><Txt v="caption" style={{ color: C.faint }}>{sel.length} selected</Txt>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SYMPTOMS.map((x) => {
            const on = sel.includes(x);
            return (
              <button key={x} onClick={() => flip(x)} style={{
                height: 40, padding: "0 16px", borderRadius: 999, cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 500,
                background: on ? C.coralWash : C.card, color: on ? C.coral : C.text, border: `1.5px solid ${on ? C.coral : "transparent"}`,
              }}>{x}</button>
            );
          })}
          <button style={{ height: 40, padding: "0 16px", borderRadius: 999, fontFamily: F, fontSize: 14, background: "transparent", color: C.muted, border: `1.5px dashed ${C.faint}`, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="plus" size={14} color={C.muted} /> Add
          </button>
        </div>
        <Label style={{ margin: "28px 0 12px" }}>Energy</Label>
        <Segmented options={["Low", "Medium", "High"]} value={["Low energy", "Medium energy", "High energy"].indexOf(nav.s.energy)}
          onChange={(i) => nav.set({ energy: ["Low energy", "Medium energy", "High energy"][i] })} />
      </div>
    </Screen>
  );
}

function Prediction({ nav }: { nav: Nav }) {
  return (
    <Screen pad={false}>
      <Header title="Cycle prediction" onBack={nav.back} />
      <div style={{ padding: "8px 20px 0" }}>
        <Card style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: C.coralWash, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="drop" size={18} color={C.coral} /></span>
          <div>
            <Txt v="headline">Next period around Dec 25</Txt>
            <Txt v="sub" style={{ marginTop: 2 }}>A 5-day window, since your cycles vary. Confidence grows with every log.</Txt>
          </div>
        </Card>
        <Card><MonthGrid marked={[23, 24, 25, 26, 27]} today={21} /></Card>
        <Label style={{ margin: "24px 0 12px" }}>Your cycles</Label>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <Txt v="headline">Current cycle</Txt><Txt v="sub">Day 18</Txt>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <i key={i} style={{ flex: 1, height: 22, borderRadius: 3, background: i < 5 ? C.coral : i < 18 ? C.cardHi : "transparent", border: i >= 18 ? `1px dashed ${C.line}` : 0 }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <Txt v="caption" style={{ color: C.faint }}>Started Dec 4 · 5-day period</Txt>
            <Txt v="caption" style={{ color: C.faint }}>Avg 31 days</Txt>
          </div>
        </Card>
      </div>
    </Screen>
  );
}

function PhaseScreen({ nav }: { nav: Nav }) {
  const i = nav.s.phaseIdx;
  const p = PHASES[i];
  const seasons = nav.s.seasons;
  const R = 104, W = 260;
  return (
    <Screen pad={false}>
      <Header title={seasons ? `${p.season}` : `${p.phase} phase`} onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <div style={{ width: 220, margin: "0 auto 20px" }}>
          <Segmented options={["Phases", "Seasons"]} value={seasons ? 1 : 0} onChange={(v) => nav.set({ seasons: v === 1 })} />
        </div>
        <div style={{ position: "relative", width: W, height: W, margin: "0 auto" }}>
          <svg width={W} height={W} viewBox={`0 0 ${W} ${W}`} aria-hidden>
            {PHASES.map((q, k) => {
              const a0 = (k / 4) * Math.PI * 2 - Math.PI / 2 + 0.06, a1 = ((k + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.06;
              return (
                <path key={q.key} onClick={() => nav.set({ phaseIdx: k })} style={{ cursor: "pointer", transition: "all 300ms" }}
                  d={`M ${W / 2 + R * Math.cos(a0)} ${W / 2 + R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${W / 2 + R * Math.cos(a1)} ${W / 2 + R * Math.sin(a1)}`}
                  stroke={q.color} strokeOpacity={k === i ? 1 : 0.22} strokeWidth={k === i ? 30 : 22} fill="none" strokeLinecap="round" />
              );
            })}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <Label style={{ color: p.color }}>{seasons ? p.phase : p.season}</Label>
            <Txt v="title" style={{ marginTop: 6 }}>Days {p.days[0]}–{p.days[1]}</Txt>
            <Txt v="sub" style={{ marginTop: 4 }}>{seasons ? p.seasonLine : p.energy}</Txt>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "12px 0 20px" }}>
          <button style={iconBtn} aria-label="Previous phase" onClick={() => nav.set({ phaseIdx: (i + 3) % 4 })}><Icon name="back" size={20} color={C.muted} /></button>
          <div style={{ display: "flex", gap: 6 }}>
            {PHASES.map((q, k) => <i key={q.key} style={{ width: 6, height: 6, borderRadius: 3, background: k === i ? q.color : C.cardHi }} />)}
          </div>
          <button style={iconBtn} aria-label="Next phase" onClick={() => nav.set({ phaseIdx: (i + 1) % 4 })}><Icon name="chevron" size={20} color={C.muted} /></button>
        </div>
        <Txt v="body" style={{ textAlign: "center", color: C.muted, marginBottom: 24, padding: "0 8px" }}>{p.blurb}</Txt>
        <Group>
          <Row label="How do you feel today?" chevron onClick={() => nav.go("logSymptoms")} />
          <Row label="What can help this week?" chevron onClick={() => nav.go("activity")} />
        </Group>
      </div>
    </Screen>
  );
}

// ═══ MEALS ══════════════════════════════════════════════════════════════════
function Meals({ nav }: { nav: Nav }) {
  const [day, setDay] = useState(3);
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    nav.set({ meals: [...nav.s.meals, { name: draft.trim() }] });
    setDraft("");
    nav.toast("Meal added");
  };
  return (
    <Screen tab="track" nav={nav} pad={false}>
      <Header title="Meals" onBack={nav.back} right={<Icon name="calendar" size={20} color={C.muted} />} />
      <div style={{ padding: "4px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => (
            <button key={k} onClick={() => setDay(k)} style={{
              width: 42, height: 60, borderRadius: 14, border: 0, cursor: "pointer", fontFamily: F, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
              background: k === day ? C.coral : "transparent", color: k === day ? C.ground : C.muted,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{d}</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: k === day ? C.ground : C.text }}>{18 + k}</span>
            </button>
          ))}
        </div>
        {/* No calorie budget: a number to stay under reads as judgment on low days
            (see Decision 03). The card says what helps this phase instead. */}
        <Card style={{ padding: 20 }}>
          <Txt v="caption" style={{ color: C.peach }}>Luteal · Autumn</Txt>
          <Txt v="headline" style={{ fontSize: 20, marginTop: 6 }}>Steady, grounding meals</Txt>
          <Txt v="sub" style={{ marginTop: 6 }}>Energy naturally tapers here. Regular meals with some protein and slow carbs help keep it even.</Txt>
          <Txt v="caption" style={{ color: C.muted, marginTop: 16 }}>{nav.s.meals.length} meals logged today</Txt>
        </Card>
        <Card style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
          <Icon name="bulb" size={22} color={C.peach} />
          <div>
            <Txt v="headline" style={{ fontSize: 15 }}>An easy add this week</Txt>
            <Txt v="sub" style={{ marginTop: 2 }}>Greek yogurt or a handful of nuts as a snack helps with afternoon dips.</Txt>
          </div>
        </Card>
        <Label style={{ margin: "28px 0 12px" }}>Log a meal</Label>
        <div style={{ position: "relative" }}>
          <input className="aira-input" style={{ height: 56, paddingRight: 96 }} placeholder="Type or say what you ate" value={draft}
            onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <span style={{ position: "absolute", right: 8, top: 8, display: "flex", gap: 4 }}>
            <span style={{ ...iconBtn, background: C.cardHi }}><Icon name="mic" size={18} color={C.muted} /></span>
            <button onClick={add} aria-label="Add meal" style={{ ...iconBtn, background: draft.trim() ? C.coral : C.cardHi }}>
              <Icon name="sparkle" size={18} color={draft.trim() ? C.ground : C.muted} />
            </button>
          </span>
        </div>
        <Label style={{ margin: "28px 0 12px" }}>Today</Label>
        <Group>
          {nav.s.meals.map((m, k) => (
            <Row key={k} label={m.name} detail={["Breakfast", "Lunch", "Snack", "Dinner"][k] ?? "Snack"} />
          ))}
        </Group>
      </div>
    </Screen>
  );
}

// ═══ ACTIVITY ═══════════════════════════════════════════════════════════════
function Activity({ nav }: { nav: Nav }) {
  const tips = ["Low-impact strength", "Keep intensity moderate", "Walking and pilates", "Longer, calmer cooldowns"];
  return (
    <Screen tab="track" nav={nav} pad={false}>
      <Header title="Activity" onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <Card style={{ padding: 20, background: "linear-gradient(160deg, rgba(239,160,122,0.22), rgba(22,22,26,1) 70%)" }}>
          <Chip>Autumn · Luteal</Chip>
          <Txt v="title" style={{ marginTop: 14 }}>Move gently this week</Txt>
          <Txt v="sub" style={{ marginTop: 6 }}>Your energy is settling. Steady movement helps with cravings and mood more than hard sessions do.</Txt>
        </Card>
        <Label style={{ margin: "24px 0 12px" }}>What might feel good today</Label>
        <Group>
          {tips.map((t, k) => (
            <Row key={t} label={t} lead={<span style={{ width: 26, height: 26, borderRadius: 999, background: C.cardHi, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 12, fontWeight: 600, color: C.muted }}>{k + 1}</span>} />
          ))}
        </Group>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          <Primary onClick={() => nav.go("logActivity")}>Log activity</Primary>
          <Primary tone="quiet" onClick={() => nav.go("steps")}>See step count</Primary>
        </div>
      </div>
    </Screen>
  );
}

function LogActivity({ nav }: { nav: Nav }) {
  const kinds = ["Walking", "Pilates", "Strength", "Yoga", "Cycling", "Running"];
  const [intensity, setIntensity] = useState(1);
  const [mins, setMins] = useState(30);
  return (
    <Screen pad={false} footer={<Primary onClick={() => nav.go("activityDone")}>Save activity</Primary>}>
      <Header title="Log activity" onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <Txt v="sub" style={{ marginBottom: 20, fontSize: 15 }}>Big or small, it all adds up.</Txt>
        <Label style={{ marginBottom: 12 }}>Type</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {kinds.map((k) => {
            const on = nav.s.workout === k;
            return (
              <button key={k} onClick={() => nav.set({ workout: k })} style={{
                height: 48, borderRadius: 12, cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 500,
                background: on ? C.coralWash : C.card, color: on ? C.coral : C.text, border: `1.5px solid ${on ? C.coral : "transparent"}`,
              }}>{k}</button>
            );
          })}
        </div>
        <Label style={{ margin: "28px 0 12px" }}>Details</Label>
        <Group>
          <Row label="Start time" right={<Txt v="sub">10:07 AM</Txt>} />
          <Row label="Duration" right={
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setMins(Math.max(5, mins - 5))} style={{ ...iconBtn, width: 30, height: 30, background: C.cardHi, color: C.text, fontSize: 16 }}>−</button>
              <Txt v="body" style={{ width: 54, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{mins} min</Txt>
              <button onClick={() => setMins(mins + 5)} style={{ ...iconBtn, width: 30, height: 30, background: C.cardHi, color: C.text, fontSize: 16 }}>+</button>
            </span>
          } />
        </Group>
        <Label style={{ margin: "28px 0 12px" }}>Intensity</Label>
        <Segmented options={["Easy", "Moderate", "Hard"]} value={intensity} onChange={setIntensity} />
        <Txt v="caption" style={{ color: C.faint, fontWeight: 400, marginTop: 10 }}>
          {["Light effort — you could hold a conversation.", "Breathing harder, but steady.", "Vigorous. Best saved for your follicular week."][intensity]}
        </Txt>
      </div>
    </Screen>
  );
}

function ActivityDone({ nav }: { nav: Nav }) {
  return (
    <Screen footer={<><Primary onClick={() => nav.tab("home")}>Back to Today</Primary><div style={{ textAlign: "center", marginTop: 8 }}><TextBtn color={C.muted} onClick={() => nav.go("steps")}>View activity history</TextBtn></div></>}>
      <div style={{ height: 560, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
        <i aria-hidden style={{ position: "absolute", width: 300, height: 300, borderRadius: 999, background: "radial-gradient(circle, rgba(93,184,142,0.25), transparent 65%)" }} />
        <span style={{ width: 76, height: 76, borderRadius: 999, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Icon name="check" size={36} color={C.ground} w={2.75} />
        </span>
        <Txt v="title" style={{ marginTop: 28, position: "relative" }}>{nav.s.workout} logged</Txt>
        <Txt v="sub" style={{ marginTop: 10, maxWidth: 280, fontSize: 15, position: "relative" }}>
          Nice work showing up for yourself. Small, steady movement helps your body regulate energy and symptoms over time.
        </Txt>
      </div>
    </Screen>
  );
}

function Steps({ nav }: { nav: Nav }) {
  const [range, setRange] = useState(1);
  const data = [5200, 7400, 9100, 6300, 9466, 8100, 4200];
  const max = 10000;
  return (
    <Screen pad={false}>
      <Header title="Steps" onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <Segmented options={["Day", "Week", "Month"]} value={range} onChange={setRange} />
        <div style={{ margin: "24px 0 4px" }}>
          <Txt v="caption" style={{ color: C.faint }}>Daily average</Txt>
          <Txt style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4 }}>7,109 <span style={{ fontSize: 15, fontWeight: 500, color: C.muted }}>steps</span></Txt>
          <Txt v="caption" style={{ color: C.faint, fontWeight: 400 }}>Dec 15 – 21</Txt>
        </div>
        <Card style={{ marginTop: 16, padding: "20px 12px 14px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 180, gap: 10, position: "relative" }}>
            <i aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: `${(8000 / max) * 100}%`, borderTop: `1px dashed ${C.faint}` }} />
            {data.map((v, k) => (
              <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <i style={{ width: "100%", maxWidth: 28, height: `${(v / max) * 100}%`, borderRadius: 8, background: k === 4 ? C.coral : v >= 8000 ? C.green : C.cardHi }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 10 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, k) => <span key={k} style={{ flex: 1, textAlign: "center", fontFamily: F, fontSize: 11, fontWeight: 600, color: k === 4 ? C.coral : C.faint }}>{d}</span>)}
          </div>
        </Card>
        <Label style={{ margin: "24px 0 12px" }}>Highlight</Label>
        <Card style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Mascot size={44} />
          <div>
            <Txt v="headline" style={{ fontSize: 15 }}>Up 1,200 steps on last week</Txt>
            <Txt v="sub" style={{ marginTop: 2 }}>Three days over your 8,000 goal — during your luteal week, too.</Txt>
          </div>
        </Card>
      </div>
    </Screen>
  );
}

// ═══ SLEEP ══════════════════════════════════════════════════════════════════
function Sleep({ nav }: { nav: Nav }) {
  const stages = [
    { t: "Awake", w: 4, c: C.peach }, { t: "Light", w: 22, c: C.blue }, { t: "Deep", w: 14, c: C.lavender }, { t: "REM", w: 10, c: C.green },
    { t: "Light", w: 18, c: C.blue }, { t: "Deep", w: 8, c: C.lavender }, { t: "REM", w: 14, c: C.green }, { t: "Awake", w: 3, c: C.peach }, { t: "Light", w: 7, c: C.blue },
  ];
  const lvl: Record<string, number> = { Awake: 0, REM: 1, Light: 2, Deep: 3 };
  return (
    <Screen tab="track" nav={nav} pad={false}>
      <Header title="Sleep" onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <Card style={{ flex: 1 }}>
            <Txt v="caption">Last night</Txt>
            <Txt v="title" style={{ marginTop: 6 }}>8h 46m</Txt>
            <Txt v="caption" style={{ color: C.green, marginTop: 2 }}>Above your need</Txt>
          </Card>
          <Card style={{ flex: 1 }}>
            <Txt v="caption">Sleep need</Txt>
            <Txt v="title" style={{ marginTop: 6 }}>8h 45m</Txt>
            <Txt v="caption" style={{ color: C.faint, fontWeight: 400, marginTop: 2 }}>Luteal +15m</Txt>
          </Card>
        </div>
        <Card style={{ marginTop: 10, padding: "18px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <Txt v="headline" style={{ fontSize: 15 }}>Stages</Txt>
            <Txt v="caption" style={{ color: C.faint }}>11:16 PM – 8:02 AM</Txt>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 120 }}>
              {Object.keys(lvl).map((k) => <span key={k} style={{ fontFamily: F, fontSize: 10.5, color: C.faint, height: 16 }}>{k}</span>)}
            </div>
            <div style={{ flex: 1, position: "relative", height: 120 }}>
              {(() => {
                let x = 0;
                return stages.map((s, k) => {
                  const el = <i key={k} style={{ position: "absolute", left: `${x}%`, width: `calc(${s.w}% - 2px)`, top: lvl[s.t] * 34, height: 16, borderRadius: 4, background: s.c }} />;
                  x += s.w;
                  return el;
                });
              })()}
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
          <Icon name="sparkle" size={20} color={C.lavender} />
          <Txt v="sub">Measured with Aira nightstand detection. No wearable needed.</Txt>
        </Card>
        <Label style={{ margin: "28px 0 12px" }}>Tonight</Label>
        <Group>
          <Row label="Wind-down routine" detail="Starts 8:00 PM" chevron onClick={() => nav.go("winddown")} lead={<Icon name="moon" size={20} color={C.lavender} />} />
          <Row label="Suggested lights-out" detail="10:45 PM closes your sleep debt" lead={<Icon name="bulb" size={20} color={C.peach} />} />
        </Group>
      </div>
    </Screen>
  );
}

function WindDown({ nav }: { nav: Nav }) {
  const [h, setH] = useState(0);
  const rules = [
    { t: "No more food", d: "Digestion disrupts deep sleep.", i: "bowl" },
    { t: "Close the laptop", d: "Finish work and park tomorrow's to-dos.", i: "bulb" },
    { t: "Screens off, lights low", d: "Dim light lets melatonin rise on time.", i: "moon" },
  ];
  const cards = [
    { t: "Morning sunlight", g: `linear-gradient(150deg, ${C.peach}, #6B3A26)` },
    { t: "The caffeine cutoff", g: `linear-gradient(150deg, #8C6A4E, #2B211B)` },
    { t: "Exercise timing", g: `linear-gradient(150deg, ${C.green}, #1E3A2E)` },
    { t: "Screens in the morning", g: `linear-gradient(150deg, ${C.blue}, #1E2A3A)` },
  ];
  return (
    <Screen pad={false}>
      <Header title="Wind down" onBack={nav.back} />
      <div style={{ padding: "4px 20px 0" }}>
        <Segmented options={["3 hrs before", "2 hrs", "1 hr"]} value={h} onChange={setH} />
        <Card key={h} style={{ marginTop: 16, padding: 20, display: "flex", gap: 14, alignItems: "center", background: C.lavenderWash }}>
          <span style={{ width: 48, height: 48, borderRadius: 14, background: C.lavender, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={rules[h].i} size={24} color={C.ground} />
          </span>
          <div>
            <Txt v="headline" style={{ fontSize: 17 }}>{rules[h].t}</Txt>
            <Txt v="sub" style={{ marginTop: 2, color: C.text, opacity: 0.75 }}>{rules[h].d}</Txt>
          </div>
        </Card>
        <Label style={{ margin: "28px 0 12px" }}>One-minute reads</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {cards.map((c) => (
            <div key={c.t} onClick={() => nav.go("article")} className="aira-press" style={{ height: 150, borderRadius: 16, background: c.g, padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end", cursor: "pointer" }}>
              <Txt v="headline" style={{ fontSize: 15 }}>{c.t}</Txt>
              <Txt v="caption" style={{ color: "rgba(245,243,241,0.75)", marginTop: 2 }}>1 min read</Txt>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ═══ ENERGY CHECK-IN BRANCH ═════════════════════════════════════════════════
const FEELINGS = [
  { t: "Mind racing", c: C.lavender, to: "zen", r: "58% 42% 50% 50% / 45% 55% 45% 55%", col: "1 / 2", row: "1 / 3" },
  { t: "Angry", c: "#E36A5C", to: "zen", r: "45% 55% 40% 60% / 55% 45% 55% 45%", col: "2 / 3", row: "1 / 2" },
  { t: "Overwhelmed", c: C.peach, to: "oneThing", r: "50% 50% 60% 40% / 40% 60% 40% 60%", col: "2 / 3", row: "2 / 4" },
  { t: "Energized", c: C.green, to: "home", r: "40% 60% 55% 45% / 60% 40% 60% 40%", col: "1 / 2", row: "3 / 4" },
  { t: "Feeling ashamed", c: C.blue, to: "talk", r: "55% 45% 45% 55% / 50% 50% 50% 50%", col: "1 / 2", row: "4 / 5" },
  { t: "Cravings", c: C.coral, to: "meals", r: "60% 40% 50% 50% / 50% 50% 50% 50%", col: "2 / 3", row: "4 / 5" },
];

function Energy({ nav }: { nav: Nav }) {
  return (
    <Screen pad={false}>
      <Header onBack={nav.back} />
      <div style={{ padding: "0 20px" }}>
        <Chip color={C.peach} wash="rgba(239,160,122,0.14)">Readiness 45 · Luteal day 18</Chip>
        <Title style={{ marginTop: 14 }} sub="Tap what's closest. There's no wrong answer.">How is it showing up for you right now?</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(4, 104px)", gap: 10 }}>
          {FEELINGS.map((f) => (
            <button key={f.t} className="aira-press" onClick={() => {
              if (f.to === "home") { nav.toast("Love that. Today's plan leans into it."); nav.tab("home"); }
              else nav.go(f.to);
            }} style={{
              gridColumn: f.col, gridRow: f.row, borderRadius: f.r, background: f.c, border: 0, cursor: "pointer",
              fontFamily: F, fontSize: 15, fontWeight: 600, color: "#1A1418", padding: 12,
            }}>{f.t}</button>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function Zen({ nav }: { nav: Nav }) {
  const lens = [2, 5, 10];
  return (
    <Screen pad={false} bg="radial-gradient(120% 70% at 50% 35%, #2A2340 0%, #0A0A0C 70%)">
      <Header onBack={nav.back} />
      <div style={{ height: 330, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px" }}>
        <Txt v="caption" style={{ color: C.muted, display: "flex", gap: 6, alignItems: "center" }}><Icon name="bell" size={14} color={C.muted} /> Notifications paused while you relax</Txt>
        <Txt v="largeTitle" style={{ marginTop: 16, fontSize: 32 }}>Switching to Zen mode</Txt>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: C.card, borderRadius: "28px 28px 0 0", padding: "24px 20px 44px" }}>
        <Label style={{ textAlign: "center", marginBottom: 14 }}>Choose a length</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
          {lens.map((l) => (
            <button key={l} onClick={() => nav.set({ zenLen: l })} style={{
              height: 52, borderRadius: 14, cursor: "pointer", fontFamily: F, fontSize: 16, fontWeight: 600,
              background: nav.s.zenLen === l ? C.lavender : C.cardHi, color: nav.s.zenLen === l ? C.ground : C.text, border: 0,
            }}>{l} min</button>
          ))}
        </div>
        <Group style={{ background: C.cardHi, marginBottom: 20 }}>
          <Row label="Sound" right={<Txt v="sub">Rain</Txt>} chevron />
          <Row label="Start and end chime" right={<Toggle on />} />
        </Group>
        <Primary onClick={() => nav.go("breathe")} icon={<Icon name="play" size={16} color={C.ground} fill />}>Begin</Primary>
      </div>
    </Screen>
  );
}

function Breathe({ nav }: { nav: Nav }) {
  const total = nav.s.zenLen * 60;
  const [left, setLeft] = useState(total);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left, paused]);
  const inhale = Math.floor((total - left) / 4) % 2 === 0;
  return (
    <Screen pad={false} bg="radial-gradient(120% 70% at 50% 45%, #2A2340 0%, #0A0A0C 72%)"
      footer={
        <div style={{ display: "flex", gap: 10 }}>
          <Primary tone="quiet" onClick={() => setPaused(!paused)} icon={<Icon name={paused ? "play" : "pause"} size={16} color={C.text} fill={paused} />}>{paused ? "Resume" : "Pause"}</Primary>
          <Primary tone="light" onClick={() => { nav.toast("Session saved. Readiness updates tonight."); nav.tab("home"); }}>End now</Primary>
        </div>
      }>
      <Header onBack={nav.back} />
      <div style={{ height: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Txt v="title" style={{ fontSize: 26, height: 34 }}>{left <= 0 ? "Well done" : paused ? "Paused" : inhale ? "Breathe in through your nose" : "And slowly out"}</Txt>
        <div style={{ width: 260, height: 260, margin: "44px 0", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[1, 0.78, 0.56].map((s, k) => (
            <i key={k} style={{
              position: "absolute", width: 260 * s, height: 260 * s, borderRadius: "46% 54% 52% 48% / 50% 45% 55% 50%",
              background: `rgba(157,144,217,${0.18 + k * 0.22})`,
              animation: paused || left <= 0 ? "none" : `airaBreath 8s ease-in-out infinite`, animationDelay: `${k * 0.15}s`,
            }} />
          ))}
        </div>
        <Txt style={{ fontSize: 28, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</Txt>
        <Txt v="caption" style={{ color: C.faint, marginTop: 4 }}>remaining</Txt>
      </div>
    </Screen>
  );
}

function OneThing({ nav }: { nav: Nav }) {
  const opts = [
    { t: "Talk about what you're feeling", to: "talk", i: "chat" },
    { t: "Sit together quietly", to: "breathe", i: "heart" },
    { t: "Meditate for a bit", to: "zen", i: "mind" },
  ];
  return (
    <Screen pad={false} bg="radial-gradient(120% 60% at 50% 30%, #3A2A24 0%, #0A0A0C 70%)">
      <Header onBack={nav.back} />
      <div style={{ padding: "40px 24px 0", textAlign: "center" }}>
        <Mascot size={96} mood="calm" />
        <Txt v="largeTitle" style={{ marginTop: 24, fontSize: 30 }}>Let's just do one thing</Txt>
        <Txt v="sub" style={{ marginTop: 10, fontSize: 15 }}>Everything else can wait. If it helps, here are some choices.</Txt>
      </div>
      <div style={{ padding: "36px 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {opts.map((o) => (
          <Card key={o.t} onClick={() => nav.go(o.to)} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(22,22,26,0.8)" }}>
            <Icon name={o.i} size={20} color={C.peach} />
            <Txt v="body" style={{ flex: 1 }}>{o.t}</Txt>
            <Icon name="chevron" size={16} color={C.faint} />
          </Card>
        ))}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <TextBtn color={C.muted} onClick={() => nav.tab("home")}>None of these — we can just stay as we are</TextBtn>
        </div>
      </div>
    </Screen>
  );
}

function Talk({ nav }: { nav: Nav }) {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  return (
    <Screen pad={false} bg="radial-gradient(120% 60% at 50% 40%, #2B2530 0%, #0A0A0C 72%)"
      footer={
        listening ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <button onClick={() => setListening(false)} aria-label="Stop" style={{ width: 72, height: 72, borderRadius: 999, border: `3px solid ${C.coral}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <i style={{ width: 24, height: 24, borderRadius: 6, background: C.coral }} />
            </button>
            <button onClick={() => { nav.toast("Thanks for sharing. That took courage."); nav.tab("home"); }} aria-label="Finish" style={{ width: 52, height: 52, borderRadius: 999, border: 0, background: C.coral, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="check" size={24} color={C.ground} w={2.5} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <Primary tone="quiet" onClick={() => { if (text.trim()) { nav.toast("Saved to your journal."); nav.tab("home"); } }} disabled={!text.trim()}>Save</Primary>
            <Primary onClick={() => setListening(true)} icon={<Icon name="mic" size={18} color={C.ground} />}>Talk instead</Primary>
          </div>
        )
      }>
      <Header onBack={nav.back} />
      <div style={{ padding: "24px 24px 0" }}>
        <Txt v="caption" style={{ color: C.muted }}>You've been doing great so far</Txt>
        <Txt v="largeTitle" style={{ marginTop: 8, fontSize: 30 }}>What would you like to talk about?</Txt>
        {listening ? (
          <div style={{ height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", height: 80 }}>
              {Array.from({ length: 9 }, (_, k) => (
                <i key={k} style={{ width: 6, borderRadius: 3, background: C.peach, height: 20 + ((k * 37) % 50), animation: `airaBreath ${1 + (k % 3) * 0.3}s ease-in-out infinite`, animationDelay: `${k * 0.1}s` }} />
              ))}
            </div>
            <Txt v="sub" style={{ marginTop: 24 }}>I'm listening…</Txt>
          </div>
        ) : (
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing. Nobody sees this but you."
            style={{ marginTop: 28, width: "100%", height: 280, background: "rgba(22,22,26,0.7)", border: `1.5px solid ${C.line}`, borderRadius: 16, padding: 16, boxSizing: "border-box", color: C.text, fontFamily: F, fontSize: 16, lineHeight: 1.5, resize: "none", outline: "none" }} />
        )}
      </div>
    </Screen>
  );
}

// ═══ LEARN ══════════════════════════════════════════════════════════════════
function Learn({ nav }: { nav: Nav }) {
  const jump = [
    { t: "PMOS 101", m: "5 min left", g: `linear-gradient(155deg, ${C.coral}, ${C.lavender})`, i: "play" },
    { t: "Morning sunlight", m: "12 min left", g: `linear-gradient(155deg, ${C.blue}, ${C.peach})`, i: "books" },
    { t: "Cycle syncing", m: "6 min left", g: `linear-gradient(155deg, ${C.green}, #B0746C)`, i: "play" },
    { t: "Insulin and you", m: "8 min left", g: `linear-gradient(155deg, ${C.lavender}, #3D3560)`, i: "books" },
  ];
  return (
    <Screen tab="learn" nav={nav}>
      <Txt v="caption" style={{ color: C.faint, marginTop: 8 }}>Thursday, December 21</Txt>
      <Txt v="largeTitle" style={{ margin: "4px 0 24px" }}>The Daily Pulse</Txt>
      <Card style={{ background: C.coral, padding: 20 }}>
        <Label style={{ color: "rgba(26,20,24,0.6)" }}>Daily fact</Label>
        <Txt v="headline" style={{ color: "#1A1418", fontSize: 18, marginTop: 8, lineHeight: 1.35 }}>Cinnamon can help steady blood sugar after meals.</Txt>
      </Card>
      <Card style={{ marginTop: 10, background: C.lavenderWash, display: "flex", gap: 12, alignItems: "center" }}>
        <Icon name="walk" size={20} color={C.lavender} />
        <Txt v="body"><span style={{ color: C.lavender, fontWeight: 600 }}>Quick tip · </span>Try a 10-minute walk after lunch.</Txt>
      </Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "32px 0 12px" }}>
        <Txt v="headline" style={{ fontSize: 18 }}>Jump back in</Txt>
        <TextBtn>See all</TextBtn>
      </div>
      <div className="aira-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -20px", padding: "0 20px" }}>
        {jump.map((j) => (
          <div key={j.t} onClick={() => nav.go("article")} className="aira-press" style={{ flex: "0 0 132px", height: 168, borderRadius: 16, background: j.g, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ alignSelf: "flex-end", width: 30, height: 30, borderRadius: 999, background: "rgba(10,10,12,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={j.i} size={14} color={C.text} fill={j.i === "play"} /></span>
            <div>
              <Txt v="headline" style={{ fontSize: 15 }}>{j.t}</Txt>
              <Txt v="caption" style={{ color: "rgba(245,243,241,0.8)", marginTop: 2 }}>{j.m}</Txt>
            </div>
          </div>
        ))}
      </div>
      <Txt v="headline" style={{ fontSize: 18, margin: "32px 0 12px" }}>For your readiness today</Txt>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { tag: "Emotional health", t: "Breaking the thought spiral", d: "Spot the loops that keep you stuck.", m: "4 min", to: "article" },
          { tag: "Movement", t: "Best workouts for this week", d: "Keep energy flowing, and go easy.", m: "5–10 min", to: "activity" },
        ].map((a) => (
          <Card key={a.t} onClick={() => nav.go(a.to)} style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Chip color={C.lavender} wash={C.lavenderWash}>{a.tag}</Chip>
                <Txt v="caption" style={{ color: C.faint }}>{a.m}</Txt>
              </div>
              <Txt v="headline" style={{ marginTop: 10 }}>{a.t}</Txt>
              <Txt v="sub" style={{ marginTop: 2 }}>{a.d}</Txt>
            </div>
            <span style={{ width: 40, height: 40, borderRadius: 999, border: `1.5px solid ${C.faint}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="play" size={14} color={C.text} fill /></span>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function Article({ nav }: { nav: Nav }) {
  return (
    <Screen pad={false}>
      <div style={{ height: 240, background: `linear-gradient(160deg, ${C.coral}, ${C.lavender})`, position: "relative", marginTop: -50 }}>
        <button onClick={nav.back} aria-label="Back" style={{ ...iconBtn, position: "absolute", top: 60, left: 12, background: "rgba(10,10,12,0.3)" }}><Icon name="back" size={20} /></button>
        <div style={{ position: "absolute", right: 24, bottom: -30 }}><Mascot size={92} mood="calm" /></div>
      </div>
      <div style={{ padding: "28px 20px 0" }}>
        <Chip color={C.lavender} wash={C.lavenderWash}>Emotional health · 4 min</Chip>
        <Txt v="largeTitle" style={{ marginTop: 14, fontSize: 28 }}>Breaking the thought spiral</Txt>
        <Txt v="body" style={{ marginTop: 16, color: C.muted }}>
          In the days before your period, falling progesterone can make worries feel louder and stickier. That isn't a character flaw — it's chemistry.
        </Txt>
        <Txt v="body" style={{ marginTop: 14, color: C.muted }}>
          When a thought starts looping, name it out loud ("I'm spiralling about work"), then give your body something slow to do: a four-count breath, a short walk, a warm drink.
        </Txt>
        <Card style={{ marginTop: 20, background: C.coralWash }}>
          <Txt v="headline" style={{ fontSize: 15 }}>Try it now</Txt>
          <Txt v="sub" style={{ marginTop: 4, marginBottom: 14 }}>Two minutes of guided breathing.</Txt>
          <Primary onClick={() => nav.go("zen")}>Start Zen mode</Primary>
        </Card>
      </div>
    </Screen>
  );
}

// ═══ Router ═════════════════════════════════════════════════════════════════
export const SCREENS: Record<string, (p: { nav: Nav }) => React.ReactElement> = {
  splash: Splash, intro: Intro, auth: Auth, signup: (p) => <SignUp {...p} />, signin: (p) => <SignUp {...p} mode="signin" />,
  goals: Goals, perms: Perms, cycleSetup: CycleSetup, sleepSetup: SleepSetup, ready: Ready,
  home: Home, track: Track, learn: Learn,
  cycle: Cycle, logPeriod: LogPeriod, logSymptoms: LogSymptoms, prediction: Prediction, phase: PhaseScreen,
  meals: Meals, activity: Activity, logActivity: LogActivity, activityDone: ActivityDone, steps: Steps,
  sleep: Sleep, winddown: WindDown, energy: Energy, zen: Zen, breathe: Breathe, oneThing: OneThing, talk: Talk, article: Article,
};

export const FLOWS: { label: string; stack: string[] }[] = [
  { label: "Onboarding", stack: ["splash"] },
  { label: "Today dashboard", stack: ["home"] },
  { label: "Cycle and phases", stack: ["track", "cycle", "phase"] },
  { label: "Log period and symptoms", stack: ["track", "cycle", "logPeriod"] },
  { label: "Meals", stack: ["track", "meals"] },
  { label: "Activity", stack: ["track", "activity"] },
  { label: "Sleep and wind down", stack: ["track", "sleep"] },
  { label: "Energy check-in", stack: ["home", "energy"] },
  { label: "Zen breathing", stack: ["home", "energy", "zen"] },
  { label: "Learn", stack: ["learn"] },
];

export default function AiraPrototype() {
  const [stack, setStack] = useState<string[]>(["splash"]);
  const [s, setS] = useState<AppState>(INITIAL);
  const [toastMsg, setToast] = useState<string | null>(null);

  // Deep links: ?s=track,cycle,phase opens straight onto that stack, so the case
  // study can link to a specific flow.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("s");
    const ids = q?.split(",").filter((x) => x in SCREENS);
    if (ids?.length) setStack(ids);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const nav: Nav = {
    go: (id) => setStack((st) => [...st, id]),
    back: () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st)),
    tab: (t) => setStack([t]),
    toast: setToast,
    s,
    set: (p) => setS((prev) => ({ ...prev, ...p })),
  };

  const id = stack[stack.length - 1];
  const Current = SCREENS[id];
  const flowIdx = FLOWS.findIndex((f) => f.stack.join() === stack.join());

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-center">
      <style>{GLOBAL_CSS}</style>
      <Device>
        <Current key={stack.join("/")} nav={nav} />
        {toastMsg && (
          <div role="status" style={{
            position: "absolute", left: "50%", bottom: 104, transform: "translateX(-50%)", zIndex: 40, whiteSpace: "nowrap",
            background: C.text, color: C.ground, fontFamily: F, fontSize: 14, fontWeight: 600, padding: "12px 18px", borderRadius: 999,
            animation: "airaToast 220ms ease-out", boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}>{toastMsg}</div>
        )}
      </Device>

      <nav aria-label="Jump to a flow" className="w-full lg:w-64 lg:pt-6">
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(42,31,40,0.55)", marginBottom: 12 }}>
          Jump to a flow
        </p>
        <ul className="grid grid-cols-2 lg:grid-cols-1 gap-1">
          {FLOWS.map((f, k) => (
            <li key={f.label}>
              <button
                onClick={() => setStack(f.stack)}
                className="w-full text-left rounded-lg px-3 py-2 transition-colors hover:bg-black/5"
                style={{
                  fontFamily: "var(--font-body)", fontSize: 15, color: "#2A1F28",
                  fontWeight: k === flowIdx ? 600 : 400, background: k === flowIdx ? "rgba(232,132,92,0.14)" : undefined,
                }}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => { setS(INITIAL); setStack(["splash"]); }}
          className="mt-4 px-3 py-2 rounded-lg hover:bg-black/5"
          style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(42,31,40,0.6)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Restart from the beginning
        </button>
      </nav>
    </div>
  );
}
