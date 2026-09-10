// Prototype state: one reducer owning navigation and one shared request collection.
//
// The standalone build kept the guest and restaurant sides as two disconnected
// demos. Sending an inquiry never created a manager request, and accepting a
// request never advanced a tracker — so to have something for the event, RSVP and
// split screens to hang off, the tracker fabricated a *second, different*
// restaurant that was already confirmed, and deliberately made the request you had
// just sent unclickable. That seam is the thing a reviewer notices first, and it
// undercuts the two-sided argument the case study is built on.
//
// Here both sides read the same `requests` array. Your inquiry appears in the
// manager dashboard; accepting it there advances your tracker and unlocks your
// event page. Nothing is fabricated.

import { GUESTS, RESTAURANTS, type Restaurant } from "./data";

export type ScreenId =
  | "home"
  | "preferences"
  | "matches"
  | "restaurant"
  | "inquiry"
  | "tracker"
  | "event"
  | "split"
  | "rsvp"
  | "manager"
  | "request-detail";

export type RequestStatus = "sent" | "reviewing" | "countered" | "accepted" | "declined";

/** The four rail steps a guest sees. `countered` and `declined` render off-rail. */
export const TRACKER_STEPS = ["Sent", "Restaurant reviewing", "Response received", "Confirmed"];

export type Counter = {
  date?: number;
  timing?: string;
  headcount?: number;
  minSpend?: number;
  message: string;
};

export type Request = {
  id: string;
  restaurantId: string;
  guest: string;
  eventType: string;
  headcount: number;
  /** Day offset from today. Kept as an offset so the demo never goes stale. */
  dateOffset: number;
  timing: string;
  dietary: string[];
  note: string;
  status: RequestStatus;
  counter?: Counter;
  /**
   * True once the guest has held a card against the booking. Acceptance alone is
   * the restaurant saying yes; the hold is the guest committing back, and it's the
   * point the booking becomes guaranteed for the restaurant.
   */
  held?: boolean;
  /** Present once accepted. Keyed by guest id. */
  rsvps: Record<string, "yes" | "no" | "pending">;
  payments: Record<string, "paid" | "pending">;
  /** Dietary needs invitees added themselves, keyed by guest id. */
  guestDietary: Record<string, string[]>;
  /** True for the request this visitor created, vs. the seeded demo ones. */
  mine: boolean;
};

export type State = {
  stack: ScreenId[];
  /** Guest discovery preferences. */
  eventType: string | null;
  partySize: number;
  dateOffset: number;
  budget: number;
  vibes: string[];
  /** Inquiry-specific fields. */
  dietary: string[];
  timing: string;
  note: string;
  activeRestaurantId: string | null;
  activeRequestId: string | null;
  matchesView: "list" | "map";
  savedIds: string[];
  requests: Request[];
  toast: string | null;
  sheet: "counter" | "policy" | "hold" | null;
  /** Which guest the RSVP screen is answering as. */
  rsvpGuestId: string;
};

function seedRsvps(headcount: number) {
  const rsvps: Record<string, "yes" | "no" | "pending"> = {};
  const payments: Record<string, "paid" | "pending"> = {};
  // The roster is however many named guests we actually have, not the requested
  // headcount — otherwise a party of 20 renders "12 of 12 confirmed", which reads
  // as everyone having answered when really the list just ran out.
  const roster = GUESTS.slice(0, Math.min(headcount, GUESTS.length));
  roster.forEach((g, i) => {
    // A partly-answered group: enough movement to be legible, enough pending for
    // the RSVP and reminder actions to have something to change.
    rsvps[g.id] = i < roster.length - 4 ? "yes" : "pending";
    payments[g.id] = i < roster.length - 7 ? "paid" : "pending";
  });
  return { rsvps, payments, guestDietary: {} as Record<string, string[]> };
}

/**
 * Two requests the manager already has when you arrive, so the dashboard isn't
 * empty before you've sent anything. Neither is `mine`, so neither is used to
 * fake the guest's own progress.
 */
const SEEDED: Request[] = [
  {
    id: "req-seed-1",
    restaurantId: "nuaa",
    guest: "Daniel W.",
    eventType: "Work dinner",
    headcount: 9,
    dateOffset: 9,
    timing: "6:30–7:30 PM",
    dietary: ["Gluten-free"],
    note: "Year-end team dinner. We may need a second seating if numbers grow.",
    status: "sent",
    ...seedRsvps(9),
    mine: false,
  },
  {
    id: "req-seed-2",
    restaurantId: "nuaa",
    guest: "Aisha R.",
    eventType: "Engagement",
    headcount: 14,
    dateOffset: 21,
    timing: "8–9 PM",
    dietary: ["Vegetarian"],
    note: "Engagement dinner. Hoping for the private room if it's free.",
    status: "reviewing",
    ...seedRsvps(14),
    mine: false,
  },
];

export const initialState: State = {
  stack: ["home"],
  eventType: null,
  partySize: 8,
  dateOffset: 0,
  budget: 2,
  vibes: [],
  dietary: [],
  timing: "7–8:30 PM",
  note: "",
  activeRestaurantId: null,
  activeRequestId: null,
  matchesView: "list",
  savedIds: [],
  requests: SEEDED,
  toast: null,
  sheet: null,
  rsvpGuestId: "g10",
};

export type Action =
  | { type: "push"; screen: ScreenId }
  /** Swaps the top of the stack. Used after submit so Back skips the form. */
  | { type: "replace"; screen: ScreenId }
  | { type: "back" }
  | { type: "reset" }
  | { type: "set"; patch: Partial<State> }
  | { type: "toggleVibe"; vibe: string }
  | { type: "toggleDietary"; item: string }
  | { type: "toggleSaved"; id: string }
  | { type: "openRestaurant"; id: string }
  | { type: "submitInquiry" }
  | { type: "advanceToReviewing"; id: string }
  | { type: "resolveRequest"; id: string; status: RequestStatus; counter?: Counter }
  | { type: "acceptCounter"; id: string }
  | { type: "holdCard"; id: string }
  | { type: "setRsvp"; id: string; guestId: string; answer: "yes" | "no" }
  | { type: "setGuestDietary"; id: string; guestId: string; items: string[] }
  | { type: "payShare"; id: string; guestId: string }
  | { type: "remindPending"; id: string }
  | { type: "toast"; message: string | null };

let seq = 0;

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "push":
      return { ...state, stack: [...state.stack, action.screen], sheet: null };

    case "replace":
      return { ...state, stack: [...state.stack.slice(0, -1), action.screen], sheet: null };

    case "back":
      // A sheet is a layer, not a screen — Back closes it before it pops.
      if (state.sheet) return { ...state, sheet: null };
      if (state.stack.length <= 1) return state;
      return { ...state, stack: state.stack.slice(0, -1) };

    case "reset":
      return { ...state, stack: ["home"], sheet: null };

    case "set":
      return { ...state, ...action.patch };

    case "toggleVibe":
      return {
        ...state,
        vibes: state.vibes.includes(action.vibe)
          ? state.vibes.filter((v) => v !== action.vibe)
          : [...state.vibes, action.vibe],
      };

    case "toggleDietary": {
      // "No restrictions" is exclusive with everything else, in both directions.
      if (action.item === "No restrictions") {
        return { ...state, dietary: state.dietary.includes(action.item) ? [] : [action.item] };
      }
      const base = state.dietary.filter((d) => d !== "No restrictions");
      return {
        ...state,
        dietary: base.includes(action.item)
          ? base.filter((d) => d !== action.item)
          : [...base, action.item],
      };
    }

    case "toggleSaved":
      return {
        ...state,
        savedIds: state.savedIds.includes(action.id)
          ? state.savedIds.filter((i) => i !== action.id)
          : [...state.savedIds, action.id],
        toast: state.savedIds.includes(action.id) ? "Removed from saved" : "Saved",
      };

    case "openRestaurant":
      return {
        ...state,
        activeRestaurantId: action.id,
        stack: [...state.stack, "restaurant"],
        sheet: null,
      };

    case "submitInquiry": {
      const id = `req-mine-${++seq}`;
      const request: Request = {
        id,
        restaurantId: state.activeRestaurantId!,
        guest: "You",
        eventType: state.eventType ?? "Other",
        headcount: state.partySize,
        dateOffset: state.dateOffset,
        timing: state.timing,
        dietary: state.dietary,
        note: state.note,
        status: "sent",
        ...seedRsvps(state.partySize),
        mine: true,
      };
      return {
        ...state,
        requests: [request, ...state.requests],
        activeRequestId: id,
        // `replace`, not `push`: the form is done, and Back from the tracker
        // should return to the restaurant rather than re-open a sent inquiry.
        stack: [...state.stack.slice(0, -1), "tracker"],
        sheet: null,
      };
    }

    case "advanceToReviewing":
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.id && r.status === "sent" ? { ...r, status: "reviewing" } : r,
        ),
      };

    case "resolveRequest":
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.id ? { ...r, status: action.status, counter: action.counter } : r,
        ),
        sheet: null,
        toast:
          action.status === "accepted"
            ? "Request accepted. The guest has been notified"
            : action.status === "declined"
              ? "Request declined"
              : "Counter-offer sent to the guest",
      };

    case "acceptCounter":
      return {
        ...state,
        requests: state.requests.map((r) => {
          if (r.id !== action.id || !r.counter) return r;
          return {
            ...r,
            status: "accepted",
            dateOffset: r.counter.date ?? r.dateOffset,
            timing: r.counter.timing ?? r.timing,
            headcount: r.counter.headcount ?? r.headcount,
          };
        }),
        toast: "Counter accepted. Hold the table to confirm.",
      };

    case "holdCard":
      return {
        ...state,
        requests: state.requests.map((r) => (r.id === action.id ? { ...r, held: true } : r)),
        sheet: null,
        toast: "Card held. Nothing is charged tonight.",
      };

    case "setRsvp":
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.id ? { ...r, rsvps: { ...r.rsvps, [action.guestId]: action.answer } } : r,
        ),
      };

    case "setGuestDietary":
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.id ? { ...r, guestDietary: { ...r.guestDietary, [action.guestId]: action.items } } : r,
        ),
      };

    case "payShare":
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.id ? { ...r, payments: { ...r.payments, [action.guestId]: "paid" } } : r,
        ),
        toast: "Your share is paid",
      };

    case "remindPending": {
      const req = state.requests.find((r) => r.id === action.id);
      // Only people who are actually coming and haven't paid — the same set the
      // button counts. Counting the whole roster made the button say 3 and the
      // confirmation say 6.
      const n = req
        ? Object.keys(req.payments).filter((g) => req.rsvps[g] === "yes" && req.payments[g] !== "paid").length
        : 0;
      return {
        ...state,
        toast: n === 0 ? "Everyone has paid" : `Reminder sent to ${n} ${n === 1 ? "guest" : "guests"}`,
      };
    }

    case "toast":
      return { ...state, toast: action.message };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Derivations
// ---------------------------------------------------------------------------

/**
 * Real filtering. The old build collected all six preference inputs into state
 * and then rendered the full restaurant array unfiltered — party size 20 still
 * offered a room that seats 14, and `tags` was dead data the vibe chips never
 * touched. Discovery being preference-first is the case study's second design
 * decision, so it has to actually be true.
 *
 * Returns matches and near-misses separately: a blank list teaches the visitor
 * nothing, whereas "seats 20" vs "seats 14, ask anyway" makes the filter legible.
 */
export function filterMatches(state: State): { matches: Restaurant[]; near: Restaurant[] } {
  const matches: Restaurant[] = [];
  const near: Restaurant[] = [];

  for (const r of RESTAURANTS) {
    const fits = r.capacity >= state.partySize;
    // Budget is a ceiling, not an exact match — nobody is upset by cheaper.
    const affordable = r.price <= state.budget + 1;
    const vibeOk = state.vibes.length === 0 || state.vibes.some((v) => r.tags.includes(v));

    if (fits && affordable && vibeOk) matches.push(r);
    else if (fits || affordable) near.push(r);
  }

  matches.sort((a, b) => a.minSpend - b.minSpend);
  near.sort((a, b) => a.minSpend - b.minSpend);
  return { matches, near: near.slice(0, 3) };
}

export function restaurantById(id: string | null) {
  return RESTAURANTS.find((r) => r.id === id) ?? null;
}

export function requestById(state: State, id: string | null) {
  return state.requests.find((r) => r.id === id) ?? null;
}

/** Confirmed means accepted AND held. An accepted request still needs the hold. */
export function isConfirmed(req: Request) {
  return req.status === "accepted" && !!req.held;
}

/** Where the guest's rail sits. Acceptance is "Response received"; the hold confirms. */
export function railStep(req: Request): number {
  if (req.status === "accepted") return req.held ? 3 : 2;
  return stepIndex(req.status);
}

/** The chip a guest sees for their own request. */
export function guestChip(req: Request) {
  if (req.status === "accepted") return req.held ? ("confirmed" as const) : ("accepted" as const);
  if (req.status === "sent") return "pending" as const;
  return req.status;
}

export function stepIndex(status: RequestStatus): number {
  switch (status) {
    case "sent":
      return 0;
    case "reviewing":
      return 1;
    case "countered":
    case "declined":
      return 2;
    case "accepted":
      return 3;
  }
}

/** Deposit owed, and what each paying head covers. */
export function deposit(r: Restaurant, headcount: number) {
  const total = Math.round((r.minSpend * r.policy.depositPct) / 100 / 10) * 10;
  return { total, perPerson: Math.round(total / Math.max(headcount, 1)) };
}

export function countRsvps(req: Request) {
  const values = Object.values(req.rsvps);
  return {
    yes: values.filter((v) => v === "yes").length,
    total: values.length,
  };
}

export function dateFromOffset(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}

export function dateLabel(offset: number) {
  return dateFromOffset(offset).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
