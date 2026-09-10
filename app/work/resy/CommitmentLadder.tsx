import { T } from "@/components/casestudy2/tokens";

const RUST = "#C4472A";

// The commitment mechanism, drawn at the model level.
//
// This replaces an "asset needed" placeholder that used to sit here. The screens
// for the card hold genuinely don't exist yet, and the case study still says so
// — but the mechanism itself is a design decision, not a missing asset, and it
// can be shown without pretending a UI exists.
//
// The argument the diagram has to make: commitment is asymmetric. For the first
// three stages the restaurant is putting up more than the guest — a room, a
// kitchen, a staffing plan — against nothing. The hold is the point where the
// two sides finally carry comparable risk, which is why the 8+ gate exists at
// all. Filled bars mean real exposure; hollow means none.

type Stage = {
  stage: string;
  guest: string;
  guestWeight: 0 | 1 | 2 | 3;
  restaurant: string;
  restaurantWeight: 0 | 1 | 2 | 3;
  hold?: boolean;
};

const STAGES: Stage[] = [
  {
    stage: "Request sent",
    guest: "Preferences and a headcount",
    guestWeight: 1,
    restaurant: "Nothing yet. The request is just sitting there",
    restaurantWeight: 0,
  },
  {
    stage: "Restaurant accepts",
    guest: "Still nothing at stake",
    guestWeight: 1,
    restaurant: "A room, a date, and a set menu held open",
    restaurantWeight: 2,
  },
  {
    stage: "Card held, not charged",
    guest: "A card on file against the minimum spend",
    guestWeight: 3,
    restaurant: "Staffing and prep committed against a real booking",
    restaurantWeight: 3,
    hold: true,
  },
  {
    stage: "Night of",
    guest: "Deposit split across the group, settled on arrival",
    guestWeight: 3,
    restaurant: "A live headcount instead of a three-week-old number",
    restaurantWeight: 3,
  },
];

function Weight({ value, filled }: { value: number; filled: string }) {
  // Three segments. Hollow segments are outlined, never absent, so an empty
  // track still reads as a track.
  return (
    <div className="flex gap-1" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 20,
            height: 5,
            borderRadius: 1,
            backgroundColor: i <= value ? filled : "transparent",
            border: i <= value ? "none" : `1px solid ${T.inkMuted}`,
            opacity: i <= value ? 1 : 0.35,
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
}

const LABEL = {
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.09em",
  color: T.inkMuted,
};

// A timeline, not a table. It used to be a four-cell bordered grid, which read
// as a slide. The stages now sit along one line with a dot each, and the hold is
// marked on the line itself rather than by shading a box.
export default function CommitmentLadder() {
  return (
    <figure className="w-full m-0">
      <p className="mb-4" style={{ ...LABEL, fontSize: T.type.caption }}>
        Who has committed what, stage by stage
      </p>

      <ol
        className="relative grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-8 list-none m-0 p-0 pt-8"
        style={{ borderTop: `1px solid ${T.ink}` }}
      >
        {STAGES.map((s) => (
          <li key={s.stage} className="relative flex flex-col gap-5 min-w-0">
            {/* The dot sits on the top rule, so the rule reads as the timeline. */}
            <span
              aria-hidden
              className="absolute"
              style={{
                top: "calc(-2rem - 6px)",
                left: 0,
                width: 11,
                height: 11,
                borderRadius: 999,
                backgroundColor: s.hold ? RUST : T.cream,
                border: `1.5px solid ${s.hold ? RUST : T.ink}`,
              }}
            />

            <div className="flex flex-col gap-1">
              <p style={{ ...LABEL, color: RUST, visibility: s.hold ? "visible" : "hidden" }}>
                The mechanism
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: s.hold ? RUST : T.ink,
                  lineHeight: 1.3,
                }}
              >
                {s.stage}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p style={LABEL}>Guest</p>
              <Weight value={s.guestWeight} filled={RUST} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: T.ink, lineHeight: 1.5 }}>
                {s.guest}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p style={LABEL}>Restaurant</p>
              <Weight value={s.restaurantWeight} filled={T.ink} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: T.ink, lineHeight: 1.5 }}>
                {s.restaurant}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption
        className="mt-8"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          color: T.inkMuted,
          lineHeight: 1.6,
          maxWidth: "68ch",
        }}
      >
        For the first two stages the restaurant is carrying almost all of the risk. That
        imbalance is the whole reason 8+ sits behind an email gate today. The card hold is the
        first point where both sides have something at stake, which is what lets a restaurant
        say yes inside the app.
      </figcaption>
    </figure>
  );
}
