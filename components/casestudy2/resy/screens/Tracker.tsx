"use client";

import { R, FONT } from "../kit";
import { dateLabel, deposit, guestChip, isConfirmed, railStep, restaurantById, TRACKER_STEPS, type Request } from "../store";
import { Body, Btn, Card, Label, Photo, ProgressRail, StatusChip } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

/**
 * The tracker was the clearest fake in the old build: it rendered its rail at a
 * hardcoded step index, so nothing ever advanced and "Response received" was
 * unreachable by any path. It also invented a second, already-confirmed
 * restaurant to give the event and split screens something to open, and made the
 * request you'd actually just sent unclickable.
 *
 * Every card here is a real request from the shared store. It moves when the
 * restaurant acts.
 */
export default function Tracker({ state, dispatch }: ScreenProps) {
  const mine = state.requests.filter((r) => r.mine);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Your inquiries" onBack={() => dispatch({ type: "back" })} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.md }}>
        {mine.length === 0 && (
          <Card style={{ padding: R.space.xl, textAlign: "center" }}>
            <Body style={{ color: R.text, fontWeight: 700 }}>No inquiries yet</Body>
          </Card>
        )}

        {mine.map((req) => (
          <TrackerCard key={req.id} req={req} state={state} dispatch={dispatch} />
        ))}

        {mine.some((r) => r.status === "reviewing" || r.status === "sent") && (
          <Card style={{ background: "transparent", border: `1px dashed ${R.hairline}`, padding: R.space.lg }}>
            <Label style={{ marginBottom: 6 }}>Waiting on the restaurant</Label>
            <Body style={{ fontSize: 13 }}>
              In the real product you&apos;d wait. Here you can answer as the restaurant and watch this move.
            </Body>
            <Btn variant="secondary" style={{ marginTop: R.space.md, height: 44 }} onClick={() => dispatch({ type: "push", screen: "manager" })}>
              Open the restaurant dashboard →
            </Btn>
          </Card>
        )}
      </div>
    </div>
  );
}

function TrackerCard({ req, state, dispatch }: { req: Request } & ScreenProps) {
  const r = restaurantById(req.restaurantId);
  const open = isConfirmed(req);

  return (
    <Card
      onClick={open ? () => dispatch({ type: "set", patch: { activeRequestId: req.id, stack: [...state.stack, "event"] } }) : undefined}
      label={open ? `Open your ${r?.name} event` : undefined}
    >
      <div style={{ display: "flex", alignItems: "center", gap: R.space.md }}>
        {r && <Photo src={r.photo} alt="" style={{ width: 42, height: 42, borderRadius: R.radius.control, flexShrink: 0 }} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: R.text, margin: 0 }}>{r?.name}</p>
          <Body style={{ fontSize: 13, marginTop: 2 }}>
            {dateLabel(req.dateOffset)} · {req.headcount} guests
          </Body>
        </div>
        <StatusChip status={guestChip(req)} />
      </div>

      <div style={{ marginTop: R.space.lg }}>
        <ProgressRail
          steps={TRACKER_STEPS}
          current={railStep(req)}
          complete={isConfirmed(req)}
          derailed={req.status === "countered" ? "countered" : req.status === "declined" ? "declined" : undefined}
        />
      </div>

      {req.status === "countered" && req.counter && (
        <div style={{ marginTop: R.space.lg, background: R.brandWash, border: `1px solid ${R.brand}`, borderRadius: R.radius.control, padding: R.space.md }}>
          <Label style={{ color: R.brand, marginBottom: 6 }}>They proposed a change</Label>
          <Body style={{ fontSize: 13, color: R.text }}>{req.counter.message}</Body>
          <ul style={{ margin: `${R.space.sm}px 0 0`, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {req.counter.date !== undefined && <CounterFact>{dateLabel(req.counter.date)}</CounterFact>}
            {req.counter.timing && <CounterFact>{req.counter.timing}</CounterFact>}
            {req.counter.headcount !== undefined && <CounterFact>{req.counter.headcount} guests</CounterFact>}
            {req.counter.minSpend !== undefined && <CounterFact>${req.counter.minSpend} minimum</CounterFact>}
          </ul>
          <div style={{ display: "flex", gap: R.space.sm, marginTop: R.space.md }}>
            <Btn style={{ height: 42 }} onClick={() => dispatch({ type: "acceptCounter", id: req.id })}>
              Accept
            </Btn>
            <Btn
              variant="quiet"
              style={{ height: 42 }}
              onClick={() => dispatch({ type: "resolveRequest", id: req.id, status: "declined" })}
            >
              Decline
            </Btn>
          </div>
        </div>
      )}

      {/* The restaurant said yes. The booking isn't real for them until the guest
          commits back, so this is the one step the guest has to take. */}
      {req.status === "accepted" && !req.held && r && (
        <div style={{ marginTop: R.space.lg, background: R.brandWash, border: `1px solid ${R.brand}`, borderRadius: R.radius.control, padding: R.space.md }}>
          <Label style={{ color: R.brand, marginBottom: 6 }}>They said yes</Label>
          <Body style={{ fontSize: 13, color: R.text }}>
            Hold a card to lock in the table. Nothing is charged now. ${deposit(r, req.headcount).total} is only
            taken if you cancel inside {r.policy.refundableUntilDays}{" "}days or the group doesn&apos;t show.
          </Body>
          <Btn
            style={{ height: 42, marginTop: R.space.md }}
            onClick={() => dispatch({ type: "set", patch: { activeRequestId: req.id, sheet: "hold" } })}
          >
            Hold my table
          </Btn>
        </div>
      )}

      {req.status === "declined" && (
        <Body style={{ fontSize: 13, marginTop: R.space.md }}>
          They couldn&apos;t take this one. Your preferences are saved, and the other matches are still there.
        </Body>
      )}
    </Card>
  );
}

function CounterFact({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: R.brand, background: "rgba(0,0,0,0.25)", borderRadius: R.radius.pill, padding: "4px 10px" }}>
      {children}
    </li>
  );
}
