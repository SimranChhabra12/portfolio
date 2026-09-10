"use client";

import { R, FONT } from "../kit";
import { BUDGET_LABELS } from "../data";
import { deposit, restaurantById } from "../store";
import { Body, Btn, Card, DetailRow, HScroll, Label, Photo } from "../primitives";
import type { ScreenProps } from "./types";
import { PinnedCta } from "../PhoneShell";

export default function RestaurantScreen({ state, dispatch }: ScreenProps) {
  const r = restaurantById(state.activeRestaurantId);
  if (!r) return null;

  const saved = state.savedIds.includes(r.id);
  const { total, perPerson } = deposit(r, state.partySize);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: R.chrome.cta + R.space.xl }}>
        {/* Hero */}
        <div style={{ position: "relative", height: 230 }}>
          <Photo src={r.photo} alt={`${r.name} dining room`} style={{ width: "100%", height: "100%" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${R.ground}, transparent 45%)` }} />
          <div style={{ position: "absolute", top: R.chrome.statusBar + 4, left: R.pagePad, right: R.pagePad, display: "flex", justifyContent: "space-between" }}>
            <IconBtn label="Close" onClick={() => dispatch({ type: "back" })}>✕</IconBtn>
            <IconBtn label={saved ? "Remove from saved" : "Save"} onClick={() => dispatch({ type: "toggleSaved", id: r.id })} active={saved}>
              {saved ? "♥" : "♡"}
            </IconBtn>
          </div>
        </div>

        <div style={{ padding: `0 ${R.pagePad}px`, display: "flex", flexDirection: "column", gap: R.space.xl }}>
          <div>
            <h2 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, color: R.text, margin: 0 }}>{r.name}</h2>
            <Body style={{ marginTop: 6 }}>
              ★ {r.rating} ({r.reviews}) · {r.cuisine} · {BUDGET_LABELS[r.price - 1]} · {r.neighborhood}
            </Body>
          </div>

          {/* The commercial facts, before any commitment. */}
          <Card>
            <p style={{ fontFamily: FONT, fontSize: R.type.cardTitle.size, fontWeight: 700, color: R.text, margin: 0, marginBottom: R.space.sm }}>
              Celebrations at {r.name}
            </p>
            <DetailRow label="Minimum spend" value={`$${r.minSpend}`} />
            <DetailRow label="Charged as" value={r.chargeType} />
            <DetailRow label="Max capacity" value={`Seats up to ${r.capacity}`} />
            <DetailRow label="Deposit to hold" value={`$${total} · about $${perPerson} a head`} />

            <button
              type="button"
              onClick={() => dispatch({ type: "set", patch: { sheet: "policy" } })}
              style={{
                marginTop: R.space.md,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 700,
                color: R.brand,
              }}
            >
              Deposit &amp; cancellation terms →
            </button>
          </Card>

          <div>
            <Label style={{ marginBottom: R.space.md }}>What&apos;s included</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: R.space.sm }}>
              {r.includes.map((i) => (
                <div key={i} style={{ display: "flex", gap: R.space.md, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ color: R.brand, fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>✓</span>
                  <Body style={{ color: R.text, fontSize: 14 }}>{i}</Body>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label style={{ marginBottom: R.space.md }}>The space</Label>
            <HScroll>
              {r.gallery.map((g, i) => (
                <Photo key={g + i} src={g} alt={`${r.name}, view ${i + 1}`} style={{ width: 190, height: 130, borderRadius: R.radius.control, flexShrink: 0 }} />
              ))}
            </HScroll>
          </div>
        </div>
      </div>

      <PinnedCta>
        <Btn onClick={() => dispatch({ type: "push", screen: "inquiry" })}>Send an inquiry</Btn>
        <Body style={{ fontSize: 12, marginTop: R.space.sm, textAlign: "center" }}>
          Nothing is charged yet. You&apos;ll confirm after they reply.
        </Body>
      </PinnedCta>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      style={{
        width: 34,
        height: 34,
        borderRadius: R.radius.pill,
        border: "none",
        background: "rgba(0,0,0,0.55)",
        color: active ? R.brand : R.text,
        fontSize: 15,
        cursor: "pointer",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}
