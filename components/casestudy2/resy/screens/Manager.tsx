"use client";

import { R, FONT } from "../kit";
import { dateLabel, restaurantById, type Request } from "../store";
import { Body, Btn, Card, Label, Pill, StatusChip } from "../primitives";
import type { ScreenProps } from "./types";
import { ScreenHeader } from "../PhoneShell";

/**
 * The restaurant's inbox.
 *
 * This side stays deliberately small. The manager research is what justifies the
 * feature existing — every manager said the email was never the point, there was
 * just nowhere else for the conversation to live — but the consumer flow is what
 * a reviewer evaluates first, so the dashboard exists to make the guest's side
 * real, not to be a second product.
 *
 * The venue header follows the request being answered. In the old build it was
 * hardcoded to one restaurant regardless of where you'd actually inquired.
 */
export function managerVenueId(requests: Request[]) {
  return requests.find((r) => r.mine)?.restaurantId ?? "nuaa";
}

export default function Manager({ state, dispatch }: ScreenProps) {
  const venueId = managerVenueId(state.requests);
  const venue = restaurantById(venueId);
  const open = state.requests.filter((r) => r.status === "sent" || r.status === "reviewing");
  const resolved = state.requests.filter((r) => r.status !== "sent" && r.status !== "reviewing");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Requests" onBack={() => dispatch({ type: "back" })} />

      <div style={{ padding: `0 ${R.pagePad}px ${R.space.lg}px` }}>
        <Label style={{ color: R.brand }}>Restaurant view</Label>
        <p style={{ fontFamily: FONT, fontSize: 19, fontWeight: 800, color: R.text, margin: "4px 0 0" }}>{venue?.name}</p>
        <Body style={{ fontSize: 13, marginTop: 2 }}>
          {venue?.neighborhood} · ${venue?.minSpend} minimum · seats {venue?.capacity}
        </Body>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${R.pagePad}px ${R.space.xxl}px`, display: "flex", flexDirection: "column", gap: R.space.md }}>
        {open.length === 0 && resolved.length === 0 && (
          <Card style={{ padding: R.space.xl, textAlign: "center" }}>
            <Body style={{ color: R.text, fontWeight: 700 }}>Nothing waiting</Body>
          </Card>
        )}

        {open.map((req) => (
          <RequestCard key={req.id} req={req} state={state} dispatch={dispatch} />
        ))}

        {resolved.length > 0 && (
          <>
            <Label style={{ marginTop: R.space.lg }}>Answered</Label>
            {resolved.map((req) => (
              <RequestCard key={req.id} req={req} state={state} dispatch={dispatch} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function RequestCard({ req, state, dispatch }: { req: Request } & ScreenProps) {
  const live = req.status === "sent" || req.status === "reviewing";
  const dietaryFromGuests = Object.values(req.guestDietary).flat();
  const allDietary = Array.from(new Set([...req.dietary, ...dietaryFromGuests]));

  const openDetail = () =>
    dispatch({ type: "set", patch: { activeRequestId: req.id, stack: [...state.stack, "request-detail"] } });

  return (
    <Card style={{ opacity: live ? 1 : 0.66 }}>
      <button
        type="button"
        onClick={openDetail}
        aria-label={`Open ${req.guest}'s request`}
        style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: R.space.md }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: R.text, margin: 0 }}>
              {req.guest}
              {req.mine && <span style={{ color: R.brand, fontSize: 12, marginLeft: 8 }}>your inquiry</span>}
            </p>
            <Body style={{ fontSize: 13, marginTop: 2 }}>{dateLabel(req.dateOffset)}</Body>
          </div>
          {!live && (
            <StatusChip
              status={
                req.status === "accepted"
                  ? req.held
                    ? "guaranteed"
                    : "awaiting-hold"
                  : req.status === "countered"
                    ? "countered"
                    : "declined"
              }
            />
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: R.space.md }}>
          <Pill tone="brand">{req.eventType}</Pill>
          <Pill>{req.headcount} guests</Pill>
          <Pill>{req.timing}</Pill>
          {allDietary.length > 0 && <Pill>{allDietary.join(" · ")}</Pill>}
        </div>

        {req.note && (
          <Body style={{ fontSize: 13, marginTop: R.space.md, fontStyle: "italic" }}>&ldquo;{req.note}&rdquo;</Body>
        )}
      </button>

      {live && (
        <div style={{ display: "flex", gap: R.space.sm, marginTop: R.space.lg }}>
          <Btn variant="quiet" style={{ height: 42, fontSize: 13 }} onClick={() => dispatch({ type: "resolveRequest", id: req.id, status: "declined" })}>
            Decline
          </Btn>
          <Btn
            variant="secondary"
            style={{ height: 42, fontSize: 13 }}
            onClick={() => dispatch({ type: "set", patch: { activeRequestId: req.id, sheet: "counter" } })}
          >
            Counter
          </Btn>
          <Btn style={{ height: 42, fontSize: 13 }} onClick={() => dispatch({ type: "resolveRequest", id: req.id, status: "accepted" })}>
            Accept
          </Btn>
        </div>
      )}
    </Card>
  );
}
