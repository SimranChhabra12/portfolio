"use client";

import { R, FONT } from "../kit";
import { dateLabel, requestById, restaurantById } from "../store";
import { Body, Btn, Card, DetailRow, Group, Label } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

export default function RequestDetail({ state, dispatch }: ScreenProps) {
  const req = requestById(state, state.activeRequestId);
  if (!req) return null;
  const r = restaurantById(req.restaurantId);
  const live = req.status === "sent" || req.status === "reviewing";
  const guestDietary = Object.entries(req.guestDietary).filter(([, v]) => v.length > 0);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title={req.guest} onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.xl }}>
        <Card>
          <DetailRow label="Occasion" value={req.eventType} />
          <DetailRow label="Date" value={dateLabel(req.dateOffset)} />
          <DetailRow label="Timing" value={req.timing} />
          <DetailRow label="Headcount" value={`${req.headcount} guests`} />
          <DetailRow label="Your minimum" value={`$${r?.minSpend} · ${r?.chargeType}`} />
          <DetailRow label="Dietary" value={req.dietary.length ? req.dietary.join(", ") : "None given"} muted={!req.dietary.length} />
        </Card>

        {req.note && (
          <Group>
            <Label style={{ marginBottom: R.space.md }}>What they wrote</Label>
            <Card>
              <Body style={{ fontSize: 14, color: R.text, lineHeight: 1.5 }}>&ldquo;{req.note}&rdquo;</Body>
            </Card>
          </Group>
        )}

        {guestDietary.length > 0 && (
          <Group>
            <Label style={{ marginBottom: R.space.md }}>Added by guests since</Label>
            <Card>
              <Body style={{ fontSize: 13 }}>
                {guestDietary.length} {guestDietary.length === 1 ? "guest has" : "guests have"} added dietary needs through the
                RSVP link: {Array.from(new Set(guestDietary.flatMap(([, v]) => v))).join(", ")}.
              </Body>
            </Card>
          </Group>
        )}
      </div>

      {live && (
        <div style={{ padding: `0 ${R.pagePad}px ${R.space.xl}px`, display: "flex", gap: R.space.sm }}>
          <Btn variant="quiet" style={{ height: 46, fontSize: 14 }} onClick={() => { dispatch({ type: "resolveRequest", id: req.id, status: "declined" }); dispatch({ type: "back" }); }}>
            Decline
          </Btn>
          <Btn variant="secondary" style={{ height: 46, fontSize: 14 }} onClick={() => dispatch({ type: "set", patch: { sheet: "counter" } })}>
            Counter
          </Btn>
          <Btn style={{ height: 46, fontSize: 14 }} onClick={() => { dispatch({ type: "resolveRequest", id: req.id, status: "accepted" }); dispatch({ type: "back" }); }}>
            Accept
          </Btn>
        </div>
      )}

      {!live && (
        <div style={{ padding: `0 ${R.pagePad}px ${R.space.xl}px` }}>
          <Body style={{ fontSize: 13, textAlign: "center" }}>
            {req.status === "accepted" && "Accepted. The guest can now invite their group."}
            {req.status === "declined" && "Declined. The guest has been told."}
            {req.status === "countered" && "Counter-offer sent. Waiting on the guest."}
          </Body>
        </div>
      )}
    </div>
  );
}
