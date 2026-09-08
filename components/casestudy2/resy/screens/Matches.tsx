"use client";

import { R, FONT } from "../kit";
import { BUDGET_LABELS, type Restaurant } from "../data";
import { filterMatches } from "../store";
import { Body, Card, Label, Photo, Pill, Segmented } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

/**
 * Browsing is Resy's own list-and-map, deliberately. An earlier pass used a
 * swipe-to-browse deck; it worked as discovery but not as a way to choose a
 * high-stakes booking, and it was dropped. Nothing here swipes.
 *
 * The list is genuinely filtered. Near-misses are shown separately rather than
 * hidden, because a short list with no explanation reads as a thin prototype,
 * whereas "seats 20" against "seats 14 — ask anyway" makes the filter legible
 * and shows the guest what their own constraint cost them.
 */
export default function Matches({ state, dispatch }: ScreenProps) {
  const { matches, near } = filterMatches(state);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader
        title={`${matches.length} ${matches.length === 1 ? "match" : "matches"}`}
        onBack={() => dispatch({ type: "back" })}
      />

      <div style={{ padding: `0 ${R.pagePad}px ${R.space.md}px` }}>
        <Segmented
          label="Result view"
          options={["List", "Map"]}
          value={state.matchesView === "list" ? "List" : "Map"}
          onChange={(v) => dispatch({ type: "set", patch: { matchesView: v === "List" ? "list" : "map" } })}
        />
        <Body style={{ fontSize: 12, marginTop: R.space.md }}>
          Seats {state.partySize}+ · up to {BUDGET_LABELS[Math.min(state.budget, 4)]}
          {state.vibes.length > 0 && ` · ${state.vibes.length} vibe${state.vibes.length > 1 ? "s" : ""}`}
        </Body>
      </div>

      {state.matchesView === "map" ? (
        <MapView matches={matches} onOpen={(id) => dispatch({ type: "openRestaurant", id })} />
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.md }}>
          {matches.length === 0 && (
            <Card style={{ padding: R.space.xl }}>
              <Body style={{ color: R.text, fontWeight: 700 }}>Nothing fits all of that</Body>
              <Body style={{ fontSize: 13, marginTop: 4 }}>
                A party of {state.partySize} at {BUDGET_LABELS[Math.min(state.budget, 4)]} rules out every room. Widen the budget or drop a vibe.
              </Body>
            </Card>
          )}

          {matches.map((r) => (
            <MatchCard key={r.id} r={r} onOpen={() => dispatch({ type: "openRestaurant", id: r.id })} />
          ))}

          {near.length > 0 && (
            <>
              <Label style={{ marginTop: R.space.lg }}>Close, but not a full fit</Label>
              {near.map((r) => (
                <MatchCard
                  key={r.id}
                  r={r}
                  onOpen={() => dispatch({ type: "openRestaurant", id: r.id })}
                  miss={r.capacity < state.partySize ? `Seats ${r.capacity} — you need ${state.partySize}` : "Above your budget"}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MatchCard({ r, onOpen, miss }: { r: Restaurant; onOpen: () => void; miss?: string }) {
  return (
    <Card onClick={onOpen} label={`${r.name}, ${r.neighborhood}`} style={{ padding: 0, overflow: "hidden", opacity: miss ? 0.72 : 1 }}>
      <div style={{ position: "relative" }}>
        <Photo src={r.photo} alt="" style={{ width: "100%", height: 150 }} />
        <span
          style={{
            position: "absolute",
            top: R.space.md,
            left: R.space.md,
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 700,
            color: R.brandInk,
            background: R.brand,
            borderRadius: R.radius.pill,
            padding: "4px 10px",
          }}
        >
          ✦ Celebrations
        </span>
      </div>
      <div style={{ padding: R.space.lg }}>
        <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: R.text, margin: 0 }}>{r.name}</p>
        <Body style={{ fontSize: 13, marginTop: 2 }}>
          {r.neighborhood} · {r.cuisine} · ★ {r.rating}
        </Body>
        <div style={{ display: "flex", gap: 6, marginTop: R.space.md, flexWrap: "wrap" }}>
          <Pill>{BUDGET_LABELS[r.price - 1]}</Pill>
          <Pill>Seats {r.capacity}</Pill>
          <Pill tone="brand">${r.minSpend} min</Pill>
        </div>
        {miss && (
          <Body style={{ fontSize: 12, marginTop: R.space.md, color: R.status.pending, fontWeight: 600 }}>{miss}</Body>
        )}
      </div>
    </Card>
  );
}

/** Schematic map. Honest about being schematic — no fake street grid pretending. */
function MapView({ matches, onOpen }: { matches: Restaurant[]; onOpen: (id: string) => void }) {
  return (
    <div style={{ flex: 1, position: "relative", margin: `0 ${R.pagePad}px ${R.space.xxl}px`, borderRadius: R.radius.card, overflow: "hidden", background: R.surface }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${R.hairline} 1px, transparent 1px), linear-gradient(90deg, ${R.hairline} 1px, transparent 1px)`,
          backgroundSize: "38px 38px",
        }}
      />
      {matches.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onOpen(r.id)}
          style={{
            position: "absolute",
            left: `${r.pin.x}%`,
            top: `${r.pin.y}%`,
            transform: "translate(-50%, -50%)",
            background: R.brand,
            color: R.brandInk,
            border: "none",
            borderRadius: R.radius.pill,
            padding: "7px 12px",
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
          }}
        >
          ${r.minSpend}
        </button>
      ))}
      <Body style={{ position: "absolute", left: R.space.md, bottom: R.space.md, fontSize: 11 }}>
        Pins show minimum spend
      </Body>
    </div>
  );
}
