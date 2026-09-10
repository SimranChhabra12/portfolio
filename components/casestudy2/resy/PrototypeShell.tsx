"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { R } from "./kit";
import { initialState, reducer, type ScreenId } from "./store";
import { Body, Toast } from "./primitives";
import PhoneShell, { StatusBar, TabBar, type TabName } from "./PhoneShell";
import { CounterSheet, HoldSheet, PolicySheet } from "./sheets";
import Home from "./screens/Home";
import Preferences from "./screens/Preferences";
import Matches from "./screens/Matches";
import RestaurantScreen from "./screens/RestaurantScreen";
import Inquiry from "./screens/Inquiry";
import Tracker from "./screens/Tracker";
import EventScreen from "./screens/EventScreen";
import Split from "./screens/Split";
import Rsvp from "./screens/Rsvp";
import Manager from "./screens/Manager";
import RequestDetail from "./screens/RequestDetail";

/**
 * The prototype's single client boundary. Everything above it stays a server
 * component, matching how the rest of the case-study pages are built.
 *
 * Navigation is a stack, not a router: the prototype lives inside a page that has
 * its own URL, so pushing app screens into browser history would hijack the
 * reader's Back button.
 */
export default function PrototypeShell({ width = 390 }: { width?: number }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reduced, setReduced] = useState(false);
  const prevDepth = useRef(state.stack.length);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Toasts clear themselves.
  useEffect(() => {
    if (!state.toast) return;
    const id = setTimeout(() => dispatch({ type: "toast", message: null }), 2400);
    return () => clearTimeout(id);
  }, [state.toast]);

  /**
   * A freshly sent inquiry moves to "reviewing" on its own, so the rail visibly
   * advances once without the reader having to switch sides. Everything past that
   * needs a real decision in the restaurant dashboard — the demo nudges the first
   * step, it doesn't fake the outcome.
   */
  useEffect(() => {
    const fresh = state.requests.find((r) => r.mine && r.status === "sent");
    if (!fresh) return;
    const id = setTimeout(() => dispatch({ type: "advanceToReviewing", id: fresh.id }), 2600);
    return () => clearTimeout(id);
  }, [state.requests]);

  const depth = state.stack.length;
  const direction = depth >= prevDepth.current ? "forward" : "back";
  // The first screen is already there — it must not slide in from off-frame on
  // load, which reads as a rendering fault rather than a transition.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    prevDepth.current = depth;
    setMounted(true);
  }, [depth]);

  const current = state.stack[depth - 1];
  const behind = depth > 1 ? state.stack[depth - 2] : null;

  const onTab = (t: TabName) => {
    if (t === "Celebrations") dispatch({ type: "reset" });
    else dispatch({ type: "toast", message: `${t} isn't part of this prototype` });
  };

  return (
    <PhoneShell width={width} label="Resy Celebrations prototype">
      <StatusBar />

      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {behind && (
          <ScreenLayer key={`${behind}-behind`} offset={reduced ? "0" : "-24%"} dim reduced={reduced}>
            {render(behind, state, dispatch)}
          </ScreenLayer>
        )}
        <ScreenLayer
          key={`${current}-${depth}`}
          offset="0"
          enterFrom={mounted ? (direction === "forward" ? "100%" : "-24%") : undefined}
          reduced={reduced}
        >
          {render(current, state, dispatch)}
        </ScreenLayer>
      </div>

      {state.sheet === "counter" && <CounterSheet state={state} dispatch={dispatch} />}
      {state.sheet === "policy" && <PolicySheet state={state} dispatch={dispatch} />}
      {state.sheet === "hold" && <HoldSheet state={state} dispatch={dispatch} />}

      {state.toast && <Toast message={state.toast} />}

      {/* Tab bar on the root screen only. It sits above the pinned CTAs, so
          leaving it up on a pushed screen hid the primary action behind it. */}
      {current === "home" && <TabBar active="Celebrations" onSelect={onTab} />}
    </PhoneShell>
  );
}

/**
 * iOS-style push: the incoming screen slides in from the right while the one
 * behind parallaxes a quarter-width left. Short-circuited under
 * prefers-reduced-motion, which the site treats as non-optional.
 */
function ScreenLayer({
  children,
  offset,
  enterFrom,
  dim = false,
  reduced,
}: {
  children: React.ReactNode;
  offset: string;
  enterFrom?: string;
  dim?: boolean;
  reduced: boolean;
}) {
  const [at, setAt] = useState(enterFrom && !reduced ? enterFrom : offset);

  useEffect(() => {
    if (!enterFrom || reduced) return;
    const id = requestAnimationFrame(() => setAt(offset));
    return () => cancelAnimationFrame(id);
  }, [enterFrom, offset, reduced]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: R.chrome.statusBar,
        background: R.ground,
        transform: `translateX(${at})`,
        transition: reduced ? "none" : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        filter: dim ? "brightness(0.6)" : undefined,
        pointerEvents: dim ? "none" : undefined,
      }}
    >
      {children}
    </div>
  );
}

function render(
  screen: ScreenId,
  state: React.ComponentProps<typeof Home>["state"],
  dispatch: React.ComponentProps<typeof Home>["dispatch"],
) {
  const props = { state, dispatch };
  switch (screen) {
    case "home":
      return <Home {...props} />;
    case "preferences":
      return <Preferences {...props} />;
    case "matches":
      return <Matches {...props} />;
    case "restaurant":
      return <RestaurantScreen {...props} />;
    case "inquiry":
      return <Inquiry {...props} />;
    case "tracker":
      return <Tracker {...props} />;
    case "event":
      return <EventScreen {...props} />;
    case "split":
      return <Split {...props} />;
    case "rsvp":
      return <Rsvp {...props} />;
    case "manager":
      return <Manager {...props} />;
    case "request-detail":
      return <RequestDetail {...props} />;
    default:
      return <Body>Not built</Body>;
  }
}
