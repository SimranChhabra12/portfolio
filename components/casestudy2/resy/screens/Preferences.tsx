"use client";

import { R } from "../kit";
import { EVENT_TYPES, VIBES, VIBE_LABELS } from "../data";
import { filterMatches } from "../store";
import { Body, Btn, Chip, Group, Label, Stepper } from "../primitives";
import { BudgetSlider, DateStrip } from "../controls";
import type { ScreenProps } from "./types";
import { ScreenHeader, PinnedCta } from "../PhoneShell";

/**
 * Preference-first discovery: everything asked here narrows the list before any
 * venue appears, because the research said the opposite order is what fails —
 * people reached out to places that couldn't hold them and found out three
 * emails deep.
 *
 * `Find restaurants` is disabled until an occasion is picked. The old build let
 * you through with nothing selected, which quietly proved the filter did nothing.
 */
export default function Preferences({ state, dispatch }: ScreenProps) {
  const { matches } = filterMatches(state);
  const ready = state.eventType !== null;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Plan a celebration" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.chrome.cta + R.space.xl}px`, display: "flex", flexDirection: "column", gap: R.space.xxl }}>
        <Group>
          <Label style={{ marginBottom: R.space.md }}>Occasion</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {EVENT_TYPES.map((e) => (
              <Chip key={e} selected={state.eventType === e} onClick={() => dispatch({ type: "set", patch: { eventType: e } })}>
                {e}
              </Chip>
            ))}
          </div>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Party size</Label>
          <Stepper value={state.partySize} min={8} max={20} suffix="guests" onChange={(v) => dispatch({ type: "set", patch: { partySize: v } })} />
          <Body style={{ fontSize: 12, marginTop: R.space.sm }}>
            Under 8? That&apos;s a standard Resy booking, no inquiry needed.
          </Body>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Date</Label>
          <DateStrip value={state.dateOffset} onChange={(v) => dispatch({ type: "set", patch: { dateOffset: v } })} />
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Budget</Label>
          <BudgetSlider value={state.budget} onChange={(v) => dispatch({ type: "set", patch: { budget: v } })} />
          <Body style={{ fontSize: 12, marginTop: R.space.sm }}>A ballpark. Exact minimums show on every result.</Body>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Vibe</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {VIBES.map((v) => (
              <Chip key={v} selected={state.vibes.includes(v)} onClick={() => dispatch({ type: "toggleVibe", vibe: v })}>
                {VIBE_LABELS[v]}
              </Chip>
            ))}
          </div>
        </Group>
      </div>

      <PinnedCta>
        <Btn disabled={!ready} onClick={() => dispatch({ type: "push", screen: "matches" })}>
          {ready ? `Find restaurants (${matches.length})` : "Pick an occasion to continue"}
        </Btn>
      </PinnedCta>
    </div>
  );
}
