"use client";

import { R } from "./kit";
import PhoneShell from "./PhoneShell";
import Home from "./screens/Home";
import Matches from "./screens/Matches";
import Manager from "./screens/Manager";
import { initialState, reducer, type State } from "./store";

// Resy Celebrations' cover band.
//
// Three screens from the in-repo prototype, rendered live rather than screenshotted
// — the same components /work/resy/prototype runs, so the cover can never show a
// version of the product that no longer exists.
//
// Ground is a warm near-black with one rose light source. Resy's red is the app's
// only interactive accent, so the band borrows its hue for the light and leaves the
// saturated red to the buttons inside the screens, where it means something.

/** Screens are read-only here; nothing in a cover image should be clickable. */
const noop = () => {};

/** Derived states, computed once at module scope — these are pure reducer calls. */
const HOME: State = initialState;

// Party of 8 with no vibe filter, so filterMatches actually returns matches.
// A tighter brief (12 people, "Lively") is a truthful state of the product but a
// useless cover image: the screen fills with "Nothing fits all of that".
const MATCHES: State = reducer(initialState, {
  type: "set",
  patch: { eventType: "Birthday", partySize: 8, budget: 3, stack: ["home", "matches"] },
});

// The restaurant's inbox rather than the guest's tracker. Tracker lists only
// requests where `mine` is true, and the seeded ones are all incoming — so the
// guest-side tracker renders its empty state on a fresh store, while the manager
// screen shows the two-sided story the case study is actually about.
const MANAGER: State = reducer(initialState, {
  type: "set",
  patch: { stack: ["home", "manager"] },
});

const PHONES: { state: State; label: string; Screen: (p: { state: State; dispatch: typeof noop }) => React.ReactNode; center: boolean }[] = [
  { state: MATCHES, label: "Resy Celebrations — restaurants that fit the whole party", Screen: Matches, center: false },
  { state: HOME, label: "Resy Celebrations — the Celebrations tab", Screen: Home, center: true },
  { state: MANAGER, label: "Resy Celebrations — the restaurant\u2019s inbox of incoming inquiries", Screen: Manager, center: false },
];

export default function HeroCover() {
  return (
    <div
      id="resy-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#15100E",
        paddingTop: "clamp(6rem, 4.5rem + 4vw, 8rem)",
        paddingBottom: "clamp(3rem, 2rem + 3vw, 4.5rem)",
      }}
    >
      {/* One rose light source, top centre — the same single-lamp construction the
          Whspr band uses, in this product's palette rather than amber. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            `radial-gradient(55% 70% at 50% 0%, ${R.brand}52 0%, ${R.brand}1F 40%, transparent 72%), ` +
            `radial-gradient(120% 110% at 50% -10%, ${R.surface}CC 0%, transparent 70%)`,
        }}
      />

      {/* Pointer-events off: this is a picture of the product. The real, operable
          copy is the prototype in §09. */}
      <div
        className="relative flex items-start justify-center gap-8 sm:gap-12 px-4"
        style={{ pointerEvents: "none" }}
      >
        {PHONES.map(({ state, label, Screen, center }) => (
          // PhoneShell is width:100% with a maxWidth, so its flex parent needs an
          // explicit width — otherwise the item shrinks to zero and the band renders empty.
          <div
            key={label}
            className={center ? undefined : "hidden sm:block"}
            style={{ width: center ? 260 : 224, flex: "0 0 auto" }}
          >
            <PhoneShell label={label} width={center ? 260 : 224}>
              <Screen state={state} dispatch={noop} />
            </PhoneShell>
          </div>
        ))}
      </div>
    </div>
  );
}
