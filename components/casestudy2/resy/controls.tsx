"use client";

import { R, FONT } from "./kit";
import { BUDGET_LABELS } from "./data";
import { dateFromOffset } from "./store";
import { HScroll } from "./primitives";

/** 14-day picker. Offsets, not fixed dates, so the demo never goes stale. */
export function DateStrip({
  value,
  onChange,
  days = 14,
}: {
  value: number;
  onChange: (offset: number) => void;
  days?: number;
}) {
  return (
    <HScroll>
      {Array.from({ length: days }, (_, i) => {
        const d = dateFromOffset(i);
        const on = i === value;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-pressed={on}
            style={{
              flexShrink: 0,
              width: 58,
              padding: "10px 0",
              borderRadius: R.radius.control,
              cursor: "pointer",
              background: on ? R.brandWash : R.surface,
              border: `1px solid ${on ? R.brand : "transparent"}`,
              fontFamily: FONT,
            }}
          >
            <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: on ? R.brand : R.faint }}>
              {i === 0 ? "TODAY" : d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
            </span>
            <span style={{ display: "block", marginTop: 3, fontSize: 17, fontWeight: 700, color: on ? R.brand : R.text }}>
              {d.getDate()}
            </span>
          </button>
        );
      })}
    </HScroll>
  );
}

/**
 * Budget as a 1–5 range rather than a number. Direct feedback on the earlier
 * build: people don't know their exact budget up front, and asking for one adds
 * friction at the least-informed moment.
 */
export function BudgetSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Budget range"
        aria-valuetext={BUDGET_LABELS[value - 1]}
        style={{ width: "100%", accentColor: R.brand, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        {BUDGET_LABELS.map((l, i) => (
          <span
            key={l}
            style={{
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: i + 1 === value ? 700 : 500,
              color: i + 1 === value ? R.brand : R.faint,
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
