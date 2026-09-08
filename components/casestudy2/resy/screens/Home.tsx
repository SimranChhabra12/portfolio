"use client";

import { R, FONT } from "../kit";
import { EVENT_TYPES, HERO_IMAGE, RESTAURANTS } from "../data";
import { dateLabel, restaurantById, stepIndex, TRACKER_STEPS } from "../store";
import { Body, Btn, Card, Chevron, Group, Label, Photo, Pill, ProgressRail, StatusChip } from "../primitives";
import type { ScreenProps } from "./types";

/**
 * The Celebrations tab.
 *
 * The standalone build's home was a title, a "Switch to Restaurant View" row, a
 * hardcoded empty state that never updated even after you sent an inquiry, and
 * roughly 250pt of dead black. It gave a visitor no reason to believe this was a
 * surface for planning anything.
 *
 * Two things this screen has to do beyond looking better, both from feedback:
 *
 *  1. Frame the action as an *inquiry*, not a booking. Every downstream screen
 *     already says inquiry; the entry point was the last place still promising a
 *     booking it can't deliver.
 *  2. Be defensible from the research. The survey finding the case study leads
 *     with is that 67% didn't learn a venue's minimum spend until after they'd
 *     already reached out. So minimum spend and capacity appear here, on the
 *     first screen, before any commitment — that's the whole argument, made
 *     immediately rather than three screens deep.
 *
 * The party-size boundary is stated outright rather than discovered, because
 * Celebrations being a distinct mode (not a filter on the normal flow) is the
 * first structural decision the case study defends.
 */
export default function Home({ state, dispatch }: ScreenProps) {
  const mine = state.requests.filter((r) => r.mine);
  const preview = [...RESTAURANTS].sort((a, b) => a.minSpend - b.minSpend).slice(0, 4);

  const start = (eventType: string | null) =>
    dispatch({ type: "set", patch: { eventType, stack: [...state.stack, "preferences"] } });

  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: R.chrome.tabBar + R.space.xxl }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 250 }}>
        <Photo src={HERO_IMAGE} alt="" style={{ width: "100%", height: "100%" }} />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${R.ground} 2%, rgba(20,20,22,0.74) 48%, rgba(20,20,22,0.28))`,
          }}
        />
        <div style={{ position: "absolute", left: R.pagePad, right: R.pagePad, bottom: R.space.lg }}>
          <span
            style={{
              display: "inline-block",
              marginBottom: R.space.sm,
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: R.type.label.tracking,
              textTransform: "uppercase",
              color: R.brand,
              background: R.brandWash,
              border: `1px solid ${R.brand}`,
              borderRadius: R.radius.pill,
              padding: "4px 10px",
            }}
          >
            Parties of 8 to 20
          </span>
          {/* h2, not h1: this screen renders inside the case study page, which
              already owns the page's single h1. */}
          <h2 style={{ fontFamily: FONT, fontSize: R.type.display.size, fontWeight: 800, color: R.text, margin: 0, lineHeight: 1.1 }}>
            Celebrations
          </h2>
          <Body style={{ marginTop: 6, color: "rgba(255,255,255,0.78)" }}>
            Minimums, capacity and policies before you ask. Booking for 7 or fewer? Use Search.
          </Body>
        </div>
      </div>

      <div style={{ padding: `${R.space.xl}px ${R.pagePad}px 0`, display: "flex", flexDirection: "column", gap: R.space.xxl }}>
        {/* Occasion-led entry */}
        <Group>
          <Label style={{ marginBottom: R.space.md }}>Start with the occasion</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: R.space.sm }}>
            {EVENT_TYPES.slice(0, 4).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => start(e)}
                style={{
                  background: R.surface,
                  border: `1px solid ${R.hairline}`,
                  borderRadius: R.radius.card,
                  padding: `${R.space.lg}px ${R.space.md}px`,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: R.space.sm,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: R.text }}>{e}</span>
                <Chevron color={R.brand} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => start(null)}
            style={{
              marginTop: R.space.sm,
              width: "100%",
              background: "none",
              border: "none",
              padding: R.space.md,
              cursor: "pointer",
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 600,
              color: R.brand,
            }}
          >
            Something else — start from scratch
          </button>
        </Group>

        {/* Live inquiries, from the shared store */}
        <Group>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: R.space.md }}>
            <Label>Your inquiries</Label>
            {mine.length > 0 && (
              <button
                type="button"
                onClick={() => dispatch({ type: "push", screen: "tracker" })}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 12, fontWeight: 700, color: R.brand }}
              >
                See all
              </button>
            )}
          </div>

          {mine.length === 0 ? (
            <Card style={{ textAlign: "center", padding: R.space.xl }}>
              <Body style={{ color: R.text, fontWeight: 600 }}>Nothing sent yet</Body>
              <Body style={{ marginTop: 4, fontSize: 13 }}>
                Pick an occasion above. You&apos;ll see every venue&apos;s minimum before you ask for anything.
              </Body>
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: R.space.sm }}>
              {mine.slice(0, 2).map((req) => {
                const rest = restaurantById(req.restaurantId);
                return (
                  <Card
                    key={req.id}
                    label={`${rest?.name} inquiry`}
                    onClick={() => dispatch({ type: "set", patch: { activeRequestId: req.id, stack: [...state.stack, "tracker"] } })}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: R.space.md }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: R.text, margin: 0 }}>{rest?.name}</p>
                        <Body style={{ fontSize: 13, marginTop: 2 }}>
                          {dateLabel(req.dateOffset)} · {req.headcount} guests
                        </Body>
                      </div>
                      <StatusChip status={req.status === "accepted" ? "confirmed" : req.status === "sent" ? "pending" : req.status} />
                    </div>
                    <div style={{ marginTop: R.space.md }}>
                      <ProgressRail
                        steps={TRACKER_STEPS}
                        current={stepIndex(req.status)}
                        complete={req.status === "accepted"}
                        derailed={req.status === "countered" ? "countered" : req.status === "declined" ? "declined" : undefined}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Group>

        {/* The research made visible: minimums up front, before anyone asks. */}
        <Group>
          <Label style={{ marginBottom: 6 }}>Venues that take groups</Label>
          <Body style={{ fontSize: 13, marginBottom: R.space.md }}>Minimum spend and capacity shown before you reach out.</Body>
          <div style={{ display: "flex", flexDirection: "column", gap: R.space.sm }}>
            {preview.map((r) => (
              <Card key={r.id} label={`${r.name} details`} onClick={() => dispatch({ type: "openRestaurant", id: r.id })} style={{ padding: R.space.md }}>
                <div style={{ display: "flex", alignItems: "center", gap: R.space.md }}>
                  <Photo src={r.photo} alt="" style={{ width: 52, height: 52, borderRadius: R.radius.control, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: R.text, margin: 0 }}>{r.name}</p>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <Pill tone="brand">${r.minSpend} min</Pill>
                      <Pill>Seats {r.capacity}</Pill>
                    </div>
                  </div>
                  <Chevron />
                </div>
              </Card>
            ))}
          </div>
        </Group>

        {/* The restaurant side is a demo affordance, and says so. */}
        <Group style={{ paddingBottom: R.space.lg }}>
          <Label style={{ marginBottom: R.space.md }}>Prototype</Label>
          <Btn variant="secondary" onClick={() => dispatch({ type: "push", screen: "manager" })}>
            See the restaurant&apos;s side →
          </Btn>
          <Body style={{ fontSize: 12, marginTop: R.space.sm, textAlign: "center" }}>
            Any inquiry you send arrives in that dashboard.
          </Body>
        </Group>
      </div>
    </div>
  );
}
