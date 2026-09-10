"use client";

import { R, FONT } from "../kit";
import { GUESTS, initials } from "../data";
import { countRsvps, deposit, requestById, restaurantById } from "../store";
import { Avatar, Body, Btn, Card, Group, Label, StatusChip } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

export default function Split({ state, dispatch }: ScreenProps) {
  const req = requestById(state, state.activeRequestId);
  const r = req ? restaurantById(req.restaurantId) : null;
  if (!req || !r) return null;

  const { yes } = countRsvps(req);
  const { total, perPerson } = deposit(r, Math.max(yes, 1));
  const paying = GUESTS.filter((g) => req.rsvps[g.id] === "yes");
  const pending = paying.filter((g) => req.payments[g.id] !== "paid");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Split the deposit" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.xl }}>
        <Card style={{ textAlign: "center", padding: R.space.xl }}>
          <Label>Deposit to hold the table</Label>
          <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 800, color: R.text, margin: `${R.space.sm}px 0 0` }}>${total}</p>
          <Body style={{ fontSize: 13, marginTop: 4 }}>
            ${perPerson} each · {paying.length} confirmed guests
          </Body>
        </Card>

        {/* The terms restate here, at the moment money is involved. */}
        <Card style={{ background: R.brandWash, border: `1px solid ${R.brand}` }}>
          <Label style={{ color: R.brand, marginBottom: 6 }}>What this deposit does</Label>
          <Body style={{ fontSize: 13, color: R.text }}>{r.policy.cancellation}</Body>
          <Body style={{ fontSize: 13, marginTop: 6 }}>
            It comes off your final bill. It exists so {r.name} can hold {req.headcount} seats and turn away other bookings.
          </Body>
        </Card>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Guests</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: R.radius.card, overflow: "hidden" }}>
            {paying.map((g) => (
              <div key={g.id} style={{ display: "flex", alignItems: "center", gap: R.space.md, background: R.surface, padding: `${R.space.md}px ${R.space.lg}px` }}>
                <Avatar text={initials(g.name)} />
                <span style={{ flex: 1, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: R.text }}>{g.name}</span>
                <StatusChip status={req.payments[g.id] === "paid" ? "paid" : "unpaid"} />
              </div>
            ))}
          </div>
        </Group>
      </div>

      <div style={{ padding: `0 ${R.pagePad}px ${R.space.xl}px` }}>
        <Btn
          disabled={pending.length === 0}
          onClick={() => dispatch({ type: "remindPending", id: req.id })}
        >
          {pending.length === 0 ? "Everyone has paid" : `Remind ${pending.length} unpaid`}
        </Btn>
      </div>
    </div>
  );
}
