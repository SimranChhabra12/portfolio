"use client";

import { useEffect, useRef, useState } from "react";
import { R, FONT } from "./kit";

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

export function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: R.type.label.size,
        fontWeight: R.type.label.weight,
        letterSpacing: R.type.label.tracking,
        textTransform: "uppercase",
        color: R.faint,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: R.type.body.size, lineHeight: 1.45, color: R.muted, margin: 0, ...style }}>
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Photo
// ---------------------------------------------------------------------------

/**
 * Every image in the prototype goes through here. The old build hotlinked a
 * third-party stock service that has since died, so the live prototype currently
 * renders broken-image icons on its most important screen. Images are local now,
 * and a failure still degrades to a styled block rather than a broken icon.
 */
export function Photo({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        aria-label={alt}
        role="img"
        style={{
          background: `linear-gradient(135deg, ${R.raised}, ${R.surface})`,
          display: "block",
          ...style,
        }}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- authored inside a
    // CSS-scaled 390pt viewport, where next/image's layout math doesn't apply.
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ objectFit: "cover", display: "block", background: R.raised, ...style }}
    />
  );
}

// ---------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "quiet";
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const palette = {
    primary: { background: R.brand, color: R.brandInk, border: "none" },
    secondary: { background: R.raised, color: R.text, border: `1px solid ${R.hairline}` },
    quiet: { background: "transparent", color: R.muted, border: `1px solid ${R.hairline}` },
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: 52,
        borderRadius: R.radius.control,
        fontFamily: FONT,
        fontSize: R.type.value.size,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        transition: "opacity 160ms ease, filter 160ms ease",
        ...palette,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/** Selectable pill. `aria-pressed` because it's a toggle, not a link. */
export function Chip({
  children,
  selected = false,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        padding: "9px 15px",
        borderRadius: R.radius.pill,
        cursor: "pointer",
        whiteSpace: "nowrap",
        color: selected ? R.brand : R.text,
        background: selected ? R.brandWash : R.raised,
        border: `1px solid ${selected ? R.brand : "transparent"}`,
        transition: "background 140ms ease, color 140ms ease",
      }}
    >
      {children}
    </button>
  );
}

/** Read-only fact marker. Never interactive — that's what Chip is for. */
export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "brand" }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 600,
        padding: "5px 10px",
        borderRadius: R.radius.pill,
        whiteSpace: "nowrap",
        color: tone === "brand" ? R.brand : R.muted,
        background: tone === "brand" ? R.brandWash : R.raised,
      }}
    >
      {children}
    </span>
  );
}

export function StatusChip({
  status,
}: {
  status:
    | "confirmed"
    | "pending"
    | "declined"
    | "countered"
    | "reviewing"
    | "paid"
    | "unpaid"
    | "accepted"
    | "guaranteed"
    | "awaiting-hold";
}) {
  const map = {
    confirmed: { label: "Confirmed", fg: R.status.confirmed, bg: R.status.confirmedWash },
    pending: { label: "Pending", fg: R.status.pending, bg: R.status.pendingWash },
    // Payment is its own axis. Reusing "Confirmed" for a paid share made the
    // guest list read as an attendance list with the wrong numbers on it.
    paid: { label: "Paid", fg: R.status.confirmed, bg: R.status.confirmedWash },
    accepted: { label: "Accepted", fg: R.brand, bg: R.brandWash },
    guaranteed: { label: "Guaranteed", fg: R.status.confirmed, bg: R.status.confirmedWash },
    "awaiting-hold": { label: "Awaiting hold", fg: R.status.pending, bg: R.status.pendingWash },
    unpaid: { label: "Unpaid", fg: R.status.pending, bg: R.status.pendingWash },
    reviewing: { label: "Reviewing", fg: R.status.pending, bg: R.status.pendingWash },
    countered: { label: "Counter-offer", fg: R.brand, bg: R.brandWash },
    declined: { label: "Declined", fg: R.status.declined, bg: R.status.declinedWash },
  }[status];

  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 700,
        padding: "5px 11px",
        borderRadius: R.radius.pill,
        color: map.fg,
        background: map.bg,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {map.label}
    </span>
  );
}

export function Stepper({
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  const btn = (label: string, delta: number, disabled: boolean) => (
    <button
      type="button"
      onClick={() => onChange(Math.min(max, Math.max(min, value + delta)))}
      disabled={disabled}
      aria-label={delta > 0 ? "Add a guest" : "Remove a guest"}
      style={{
        width: 34,
        height: 34,
        borderRadius: R.radius.pill,
        border: "none",
        background: R.raised,
        color: disabled ? R.faint : R.text,
        fontSize: 19,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: R.space.md,
        background: R.surface,
        borderRadius: R.radius.control,
        padding: 8,
      }}
    >
      {btn("−", -1, value <= min)}
      <span
        aria-live="polite"
        style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: R.text, minWidth: 24, textAlign: "center" }}
      >
        {value}
      </span>
      {btn("+", 1, value >= max)}
      {suffix && <span style={{ fontFamily: FONT, fontSize: 13, color: R.faint, paddingRight: 8 }}>{suffix}</span>}
    </div>
  );
}

export function Segmented({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: "flex", background: R.surface, borderRadius: R.radius.pill, padding: 3, gap: 3 }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            style={{
              padding: "6px 16px",
              borderRadius: R.radius.pill,
              border: "none",
              cursor: "pointer",
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 700,
              color: on ? R.brandInk : R.muted,
              background: on ? R.brand : "transparent",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function Avatar({ text, size = 30 }: { text: string; size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: R.radius.pill,
        background: R.brandWash,
        color: R.brand,
        border: `1px solid ${R.brand}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontSize: size * 0.36,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {text}
    </span>
  );
}

export function Chevron({ dir = "right", color = R.faint }: { dir?: "left" | "right"; color?: string }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path
        d={dir === "right" ? "M1 1L7 7L1 13" : "M7 1L1 7L7 13"}
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Structure
// ---------------------------------------------------------------------------

/**
 * A grouped block inside a screen.
 *
 * This exists because globals.css sets `section { padding: calc(var(--section-gap)/2) 0 }`
 * in @layer base — page furniture, sized for a 1280px editorial column. Inside a
 * 390pt phone screen it injected roughly 60pt of dead space between every group.
 * Keeping the <section> element preserves the document outline; the reset stops
 * the page's rhythm from leaking into the product UI.
 */
export function Group({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <section style={{ padding: 0, flexShrink: 0, ...style }}>{children}</section>;
}

export function Card({
  children,
  onClick,
  style,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  label?: string;
}) {
  const base: React.CSSProperties = {
    background: R.surface,
    borderRadius: R.radius.card,
    padding: R.space.lg,
    width: "100%",
    textAlign: "left",
    border: "none",
    display: "block",
    // Screens stack their content in a scrolling flex column, where the default
    // flex-shrink would squash a card down to whatever space was left.
    flexShrink: 0,
    ...style,
  };
  if (!onClick) return <div style={base}>{children}</div>;
  return (
    <button type="button" onClick={onClick} aria-label={label} style={{ ...base, cursor: "pointer" }}>
      {children}
    </button>
  );
}

/** Label / value row. One shape for every spec table in the prototype. */
export function DetailRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: R.space.md,
        padding: `${R.space.md}px 0`,
        borderBottom: `1px solid ${R.hairline}`,
      }}
    >
      <span style={{ fontFamily: FONT, fontSize: 13, color: R.muted, flexShrink: 0 }}>{label}</span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: muted ? 500 : 700,
          color: muted ? R.muted : R.text,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** The four-step rail. `current` is the furthest reached step, 0-indexed. */
export function ProgressRail({
  steps,
  current,
  complete = false,
  derailed,
}: {
  steps: string[];
  current: number;
  complete?: boolean;
  derailed?: "countered" | "declined";
}) {
  const accent = derailed === "declined" ? R.status.declined : derailed === "countered" ? R.brand : complete ? R.status.confirmed : R.brand;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", paddingTop: R.space.sm }}>
      {steps.map((s, i) => {
        const done = i <= current;
        return (
          <div key={s} style={{ flex: 1, position: "relative", textAlign: "center" }}>
            {i > 0 && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-50%",
                  right: "50%",
                  top: 4,
                  height: 2,
                  background: done ? accent : R.hairline,
                }}
              />
            )}
            <span
              aria-hidden
              style={{
                position: "relative",
                display: "block",
                width: 10,
                height: 10,
                margin: "0 auto",
                borderRadius: R.radius.pill,
                background: done ? accent : R.raised,
                border: `1px solid ${done ? accent : R.hairline}`,
              }}
            />
            <span
              style={{
                display: "block",
                marginTop: 7,
                fontFamily: FONT,
                fontSize: 10,
                fontWeight: i === current ? 700 : 500,
                lineHeight: 1.25,
                color: i === current ? (derailed ? accent : R.text) : R.faint,
              }}
            >
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Horizontal scroller with chevrons that appear only when there is more to see.
 * Carried over from the standalone build, where the missing affordance was
 * specific feedback: people didn't know the row scrolled.
 */
export function HScroll({ children, gap = R.space.sm }: { children: React.ReactNode; gap?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = () => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    return () => el.removeEventListener("scroll", measure);
  }, []);

  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 160, behavior: "smooth" });

  const chev = (side: "left" | "right", visible: boolean) => (
    <button
      type="button"
      onClick={() => nudge(side === "left" ? -1 : 1)}
      aria-label={side === "left" ? "Scroll left" : "Scroll right"}
      tabIndex={visible ? 0 : -1}
      style={{
        position: "absolute",
        [side]: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 26,
        height: 26,
        borderRadius: R.radius.pill,
        border: `1px solid ${R.hairline}`,
        background: R.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 160ms ease",
        zIndex: 2,
      } as React.CSSProperties}
    >
      <Chevron dir={side} color={R.text} />
    </button>
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={ref}
        style={{ display: "flex", gap, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}
      >
        {children}
      </div>
      {chev("left", edges.left)}
      {chev("right", edges.right)}
    </div>
  );
}

/** Bottom sheet. The old build had no modal layer at all. */
export function Sheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer" }}
      />
      <div
        role="dialog"
        aria-label={title}
        style={{
          position: "relative",
          background: R.ground,
          borderTopLeftRadius: R.radius.sheet,
          borderTopRightRadius: R.radius.sheet,
          borderTop: `1px solid ${R.hairline}`,
          padding: R.pagePad,
          paddingBottom: R.space.xxl,
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <span
          aria-hidden
          style={{ display: "block", width: 36, height: 4, borderRadius: 2, background: R.hairline, margin: "0 auto 16px" }}
        />
        <h2 style={{ fontFamily: FONT, fontSize: R.type.screenTitle.size, fontWeight: 700, color: R.text, margin: 0, marginBottom: R.space.lg }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "absolute",
        left: R.pagePad,
        right: R.pagePad,
        bottom: R.chrome.tabBar + 16,
        zIndex: 60,
        background: R.raised,
        border: `1px solid ${R.hairline}`,
        borderRadius: R.radius.control,
        padding: "12px 16px",
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        color: R.text,
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {message}
    </div>
  );
}
