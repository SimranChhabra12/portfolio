"use client";

import { useState } from "react";
import { R, FONT } from "./kit";
import { TIMINGS } from "./data";
import { dateLabel, requestById, restaurantById, type Action, type State } from "./store";
import { Body, Btn, Chip, DetailRow, Group, Label, Sheet, Stepper } from "./primitives";
import { DateStrip } from "./controls";

type Props = { state: State; dispatch: React.Dispatch<Action> };

/**
 * The counter-offer.
 *
 * "Modify" in the old build was a label: it fired a toast reading "Changes
 * proposed — sent to guest" and changed nothing. There was no form, no proposal
 * object, and nothing reached the guest.
 *
 * This is the piece that makes the two-sided argument real. A large-party booking
 * is a negotiation — the manager interviews were about event type, seating,
 * dietary needs, minimum spend, prix fixe, none of which fit a fixed reservation.
 * Accept-or-decline can't hold that conversation; a counter can.
 */
export function CounterSheet({ state, dispatch }: Props) {
  const req = requestById(state, state.activeRequestId);
  const r = req ? restaurantById(req.restaurantId) : null;

  const [date, setDate] = useState(req?.dateOffset ?? 0);
  const [timing, setTiming] = useState(req?.timing ?? TIMINGS[1]);
  const [headcount, setHeadcount] = useState(req?.headcount ?? 8);
  const [minSpend, setMinSpend] = useState(r?.minSpend ?? 0);
  const [message, setMessage] = useState("");

  if (!req || !r) return null;

  const changed =
    date !== req.dateOffset || timing !== req.timing || headcount !== req.headcount || minSpend !== r.minSpend;

  return (
    <Sheet title="Propose a change" onClose={() => dispatch({ type: "set", patch: { sheet: null } })}>
      <Body style={{ fontSize: 13, marginBottom: R.space.xl }}>
        Change what you can&apos;t take and say why. The guest can accept or decline it.
      </Body>

      <div style={{ display: "flex", flexDirection: "column", gap: R.space.xl }}>
        <Group>
          <Label style={{ marginBottom: R.space.md }}>Date</Label>
          <DateStrip value={date} onChange={setDate} />
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Timing</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {TIMINGS.map((t) => (
              <Chip key={t} selected={t === timing} onClick={() => setTiming(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Headcount you can seat</Label>
          <Stepper value={headcount} min={2} max={r.capacity} suffix={`max ${r.capacity}`} onChange={setHeadcount} />
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Minimum spend</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: R.space.sm }}>
            {[r.minSpend, r.minSpend + 200, r.minSpend + 400].map((v) => (
              <Chip key={v} selected={v === minSpend} onClick={() => setMinSpend(v)}>
                ${v}
              </Chip>
            ))}
          </div>
        </Group>

        <Group>
          <Label style={{ marginBottom: R.space.md }}>Note to the guest</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="We can't do Saturday at 8, but the private room is free at 6:30 for the same minimum."
            rows={3}
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

        <Btn
          disabled={!changed}
          onClick={() =>
            dispatch({
              type: "resolveRequest",
              id: req.id,
              status: "countered",
              counter: {
                date: date !== req.dateOffset ? date : undefined,
                timing: timing !== req.timing ? timing : undefined,
                headcount: headcount !== req.headcount ? headcount : undefined,
                minSpend: minSpend !== r.minSpend ? minSpend : undefined,
                message: message.trim() || "We've proposed a change to your request.",
              },
            })
          }
        >
          {changed ? "Send counter-offer" : "Change something to counter"}
        </Btn>
      </div>
    </Sheet>
  );
}

/**
 * Deposit and cancellation terms.
 *
 * Absent entirely from the old build — the deposit appeared as a number with no
 * explanation of what it protected against. The case study names no-show and
 * last-minute-cancellation risk as an honest gap: understood from the manager
 * research, never translated into the design. This is that translation, and it
 * sits in front of the guest before they inquire rather than after they commit.
 */
export function PolicySheet({ state, dispatch }: Props) {
  const r = restaurantById(state.activeRestaurantId);
  if (!r) return null;
  const dep = Math.round((r.minSpend * r.policy.depositPct) / 100 / 10) * 10;

  return (
    <Sheet title="Deposit & cancellation" onClose={() => dispatch({ type: "set", patch: { sheet: null } })}>
      <div>
        <DetailRow label="Deposit" value={`$${dep} (${r.policy.depositPct}% of minimum)`} />
        <DetailRow label="Taken" value="Only once they accept" />
        <DetailRow label="Fully refundable until" value={`${r.policy.refundableUntilDays} days before`} />
        <DetailRow label="Final headcount locks" value={`${r.policy.headcountLockDays} days before`} />
        <DetailRow label="Counts toward the bill" value="Yes, in full" />
      </div>

      <Body style={{ fontSize: 13, marginTop: R.space.xl, color: R.text, lineHeight: 1.5 }}>
        {r.policy.cancellation}
      </Body>
      <Body style={{ fontSize: 13, marginTop: R.space.md }}>
        Holding {r.capacity} seats means turning away other bookings for the night. The deposit is what lets{" "}
        {r.name} say yes to a group this size on {dateLabel(state.dateOffset)}.
      </Body>
    </Sheet>
  );
}
