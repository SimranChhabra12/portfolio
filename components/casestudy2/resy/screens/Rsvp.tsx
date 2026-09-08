"use client";

import { R, FONT } from "../kit";
import { DIETARY, GUESTS } from "../data";
import { countRsvps, dateLabel, deposit, requestById, restaurantById } from "../store";
import { Body, Btn, Card, Chip, DetailRow, Group, Label, Photo } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

/**
 * What an invited guest sees behind the RSVP link.
 *
 * The old build had the link and a Copy button, and nothing behind it — so half
 * the product's users had no interface at all, and the host's "9 of 12 confirmed"
 * was a frozen literal that no action could ever change.
 *
 * Answering here writes back to the same request, so the host's headcount and the
 * split both move, and the restaurant's final numbers are a real derivation
 * rather than a number typed into a mock.
 */
export default function Rsvp({ state, dispatch }: ScreenProps) {
  const req = requestById(state, state.activeRequestId);
  const r = req ? restaurantById(req.restaurantId) : null;
  if (!req || !r) return null;

  const me = GUESTS.find((g) => g.id === state.rsvpGuestId);
  if (!me) return null;

  const answer = req.rsvps[me.id] ?? "pending";
  const mine = req.guestDietary[me.id] ?? [];
  const paid = req.payments[me.id] === "paid";
  const { yes } = countRsvps(req);
  const { perPerson } = deposit(r, Math.max(yes, 1));

  const toggle = (item: string) => {
    const next =
      item === "No restrictions"
        ? mine.includes(item)
          ? []
          : [item]
        : mine.filter((d) => d !== "No restrictions").includes(item)
          ? mine.filter((d) => d !== item && d !== "No restrictions")
          : [...mine.filter((d) => d !== "No restrictions"), item];
    dispatch({ type: "setGuestDietary", id: req.id, guestId: me.id, items: next });
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="You're invited" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.xl }}>
        <Body style={{ fontSize: 12 }}>Viewing as {me.name} — an invited guest, not the host.</Body>

        <div style={{ borderRadius: R.radius.card, overflow: "hidden" }}>
          <Photo src={r.photo} alt="" style={{ width: "100%", height: 140 }} />
        </div>

        <div>
          <Label style={{ marginBottom: 6 }}>{req.eventType}</Label>
          <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: R.text, margin: 0 }}>{r.name}</h2>
          <Body style={{ marginTop: 4 }}>
            {dateLabel(req.dateOffset)} · {req.timing} · {r.neighborhood}
          </Body>
        </div>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Can you make it?</Label>
          <div style={{ display: "flex", gap: R.space.sm }}>
            <Btn
              variant={answer === "yes" ? "primary" : "secondary"}
              onClick={() => dispatch({ type: "setRsvp", id: req.id, guestId: me.id, answer: "yes" })}
            >
              {answer === "yes" ? "You're going ✓" : "Yes, I'm in"}
            </Btn>
            <Btn
              variant={answer === "no" ? "primary" : "quiet"}
              onClick={() => dispatch({ type: "setRsvp", id: req.id, guestId: me.id, answer: "no" })}
            >
              Can&apos;t make it
            </Btn>
          </div>
        </Group>

        {answer === "yes" && (
          <>
            <Group>
              <Label style={{ marginBottom: 6 }}>Anything you can&apos;t eat?</Label>
              <Body style={{ fontSize: 12, marginBottom: R.space.md }}>Goes straight to the kitchen with the booking.</Body>
              <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
                {DIETARY.map((d) => (
                  <Chip key={d} selected={mine.includes(d)} onClick={() => toggle(d)}>
                    {d}
                  </Chip>
                ))}
              </div>
            </Group>

            <Group>
              <Label style={{ marginBottom: R.space.md }}>Your share of the deposit</Label>
              <Card>
                <DetailRow label="Your share" value={`$${perPerson}`} />
                <DetailRow label="Refundable until" value={`${r.policy.refundableUntilDays} days before`} muted />
                <Body style={{ fontSize: 12, marginTop: R.space.md }}>
                  Comes off the final bill. You&apos;re not paying for the meal here.
                </Body>
                <Btn
                  disabled={paid}
                  style={{ marginTop: R.space.md, height: 46 }}
                  onClick={() => dispatch({ type: "payShare", id: req.id, guestId: me.id })}
                >
                  {paid ? "Paid ✓" : `Pay $${perPerson}`}
                </Btn>
              </Card>
            </Group>
          </>
        )}

        {answer === "no" && (
          <Card>
            <Body style={{ fontSize: 13, color: R.text }}>
              You&apos;re marked as out. The host&apos;s headcount and everyone&apos;s share have both updated.
            </Body>
          </Card>
        )}
      </div>
    </div>
  );
}
