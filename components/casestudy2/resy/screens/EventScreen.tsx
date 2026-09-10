"use client";

import { R, FONT } from "../kit";
import { GUESTS, initials } from "../data";
import { countRsvps, dateLabel, deposit, requestById, restaurantById } from "../store";
import { Avatar, Body, Btn, Card, DetailRow, Group, Label, Photo, StatusChip } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

export default function EventScreen({ state, dispatch }: ScreenProps) {
  const req = requestById(state, state.activeRequestId);
  const r = req ? restaurantById(req.restaurantId) : null;
  if (!req || !r) return null;

  const { yes, total } = countRsvps(req);
  const { total: dep, perPerson } = deposit(r, Math.max(yes, 1));
  const link = `resy.com/celebrate/${r.id}-9x3k`;
  const answered = GUESTS.filter((g) => req.rsvps[g.id] === "yes");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Your event" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.xl }}>
        <div style={{ position: "relative", borderRadius: R.radius.card, overflow: "hidden" }}>
          <Photo src={r.photo} alt="" style={{ width: "100%", height: 150 }} />
          <span style={{ position: "absolute", top: R.space.md, right: R.space.md }}>
            <StatusChip status="confirmed" />
          </span>
        </div>

        <div>
          <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: R.text, margin: 0 }}>{r.name}</h2>
          <Body style={{ marginTop: 4 }}>
            {dateLabel(req.dateOffset)} · {req.timing} · {req.headcount} guests
          </Body>
        </div>

        {/* Invite */}
        <Group>
          <Label style={{ marginBottom: R.space.md }}>Invite your group</Label>
          <div style={{ display: "flex", gap: R.space.sm, alignItems: "center", background: R.surface, borderRadius: R.radius.control, padding: `${R.space.sm}px ${R.space.sm}px ${R.space.sm}px ${R.space.md}px` }}>
            <span style={{ flex: 1, minWidth: 0, fontFamily: FONT, fontSize: 13, color: R.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {link}
            </span>
            <Btn
              style={{ width: "auto", height: 36, padding: "0 16px", fontSize: 13 }}
              onClick={() => {
                navigator.clipboard?.writeText(`https://${link}`).catch(() => {});
                dispatch({ type: "toast", message: "Invite link copied" });
              }}
            >
              Copy
            </Btn>
          </div>
          <Btn
            variant="secondary"
            style={{ marginTop: R.space.sm, height: 44 }}
            onClick={() =>
              dispatch({
                type: "set",
                patch: {
                  // View as someone who hasn't answered yet, so the screen has a
                  // decision to make. Resolved once, on entry, so the identity
                  // doesn't slide to the next guest the moment you RSVP.
                  rsvpGuestId: GUESTS.find((g) => req.rsvps[g.id] === "pending")?.id ?? GUESTS[0].id,
                  stack: [...state.stack, "rsvp"],
                },
              })
            }
          >
            Preview what a guest sees →
          </Btn>
        </Group>

        {/* Headcount — derived, and it moves when guests answer. */}
        <Group>
          <Label style={{ marginBottom: R.space.md }}>Headcount</Label>
          <Card>
            <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: R.text, margin: 0 }}>
              {yes} of {total} confirmed
            </p>
            <div style={{ display: "flex", gap: 5, marginTop: R.space.md, flexWrap: "wrap" }}>
              {answered.slice(0, 7).map((g) => (
                <Avatar key={g.id} text={initials(g.name)} />
              ))}
              {answered.length > 7 && <Avatar text={`+${answered.length - 7}`} />}
            </div>
            <div style={{ marginTop: R.space.lg }}>
              <DetailRow label="Final numbers lock" value={`${r.policy.headcountLockDays} days before`} />
              <DetailRow label="Deposit held" value={`$${dep}`} />
              <DetailRow label="Per confirmed guest" value={`$${perPerson}`} muted />
            </div>
          </Card>
        </Group>
      </div>

      <div style={{ padding: `0 ${R.pagePad}px ${R.space.xl}px` }}>
        <Btn onClick={() => dispatch({ type: "push", screen: "split" })}>Split the deposit</Btn>
      </div>
    </div>
  );
}
