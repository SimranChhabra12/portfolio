"use client";

import { R, FONT } from "../kit";
import { DIETARY, TIMINGS } from "../data";
import { dateLabel, restaurantById } from "../store";
import { Body, Btn, Card, Chip, Group, Label } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader, PinnedCta } from "../PhoneShell";

/**
 * The structured request — the thing that replaces the email.
 *
 * Direct feedback on the earlier build was that this screen duplicated the
 * discovery flow: it repeated the occasion chips, the party-size stepper and the
 * date strip in full, under a "carried over from your preferences" header. So it
 * looked like the same form twice, and the carry-over read as a claim rather than
 * a fact.
 *
 * Now what's already known is a *recap* — compact, and tappable to go back and
 * change — and the screen only asks what discovery genuinely didn't: dietary
 * needs, timing, and one note. Budget deliberately does not reappear; at this
 * point the guest can see the venue's actual minimum, so re-asking a ballpark
 * would be asking a question we've already answered for them.
 */
export default function Inquiry({ state, dispatch }: ScreenProps) {
  const r = restaurantById(state.activeRestaurantId);
  if (!r) return null;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Your inquiry" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.chrome.cta + R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.xxl }}>
        <Body style={{ fontSize: 13 }}>
          To <span style={{ color: R.text, fontWeight: 700 }}>{r.name}</span> · ${r.minSpend} minimum
        </Body>

        {/* Recap, not a second form. */}
        <Group>
          <Label style={{ marginBottom: R.space.md }}>What they&apos;ll see</Label>
          <Card style={{ padding: R.space.md }}>
            <div style={{ display: "flex", alignItems: "center", gap: R.space.md }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: R.text, margin: 0 }}>
                  {state.eventType ?? "Celebration"} · {state.partySize} guests
                </p>
                <Body style={{ fontSize: 13, marginTop: 2 }}>{dateLabel(state.dateOffset)}</Body>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "push", screen: "preferences" })}
                style={{ background: "none", border: "none", padding: 6, cursor: "pointer", fontFamily: FONT, fontSize: 13, fontWeight: 700, color: R.brand }}
              >
                Change
              </button>
            </div>
          </Card>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Dietary needs</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {DIETARY.map((d) => (
              <Chip key={d} selected={state.dietary.includes(d)} onClick={() => dispatch({ type: "toggleDietary", item: d })}>
                {d}
              </Chip>
            ))}
          </div>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Timing</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {TIMINGS.map((t) => (
              <Chip key={t} selected={state.timing === t} onClick={() => dispatch({ type: "set", patch: { timing: t } })}>
                {t}
              </Chip>
            ))}
          </div>
        </Group>

        {/* One note field, and it is actually kept — the manager reads this. */}
        <Group>
          <Label style={{ marginBottom: 6 }}>Anything else</Label>
          <Body style={{ fontSize: 12, marginBottom: R.space.md }}>
            Optional. This is what the restaurant reads first.
          </Body>
          <textarea
            value={state.note}
            onChange={(e) => dispatch({ type: "set", patch: { note: e.target.value } })}
            placeholder="Celebrating my 30th, we'd love the private room if it's free."
            rows={4}
            style={{
              width: "100%",
              resize: "none",
              background: R.surface,
              border: `1px solid ${R.hairline}`,
              borderRadius: R.radius.control,
              padding: R.space.md,
              fontFamily: FONT,
              fontSize: 14,
              lineHeight: 1.45,
              color: R.text,
            }}
          />
        </Group>
      </div>

      <PinnedCta>
        <Btn onClick={() => dispatch({ type: "submitInquiry" })}>Send to {r.name}</Btn>
      </PinnedCta>
    </div>
  );
}
