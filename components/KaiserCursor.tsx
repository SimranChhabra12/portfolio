"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import KaiserSprite from "./KaiserSprite";

/**
 * Kaiser — a cursor companion, not a cursor replacement.
 *
 * The real pointer stays visible and functional the whole time; Kaiser trots
 * along a little behind and below it. That's deliberate: swapping out the OS
 * cursor costs you the I-beam and the link pointer, and a portfolio that
 * recruiters skim can't afford to make targets harder to hit.
 *
 * DESIGN_DOC §7 caps the site at three deliberate interactions and this is the
 * third, so it's gated hard: fine pointers only, nothing at all under
 * prefers-reduced-motion, and the load greeting fires once per browser session.
 *
 * Position is driven by one rAF loop writing `transform` straight to the DOM —
 * never React state, which would re-render on every mouse move. It's also why
 * position can't be a CSS transition: globals.css:104 flattens every transition
 * to 0.01ms under reduced motion, and rAF sidesteps that entirely.
 */

/** How far the sprite sits from the true pointer, so it never covers the target. */
const OFFSET_X = 14;
const OFFSET_Y = 10;

/** Fraction of the remaining distance closed per frame. Lower = more lag. */
const EASE = 0.12;

/** Below this gap we snap, write once, and cancel the loop — no idle CPU burn. */
const PARK_EPSILON = 0.15;

/** Horizontal movement needed to commit to a direction, so he doesn't flip on jitter. */
const FLIP_DEADZONE = 0.6;

/** Quiet pointer for this long and he stops trotting. */
const IDLE_AFTER_MS = 900;

const GREET_TRAVEL_MS = 1400;
const GREET_BUBBLE_IN_MS = 250;
const GREET_HOLD_MS = 2500;
const GREET_BUBBLE_OUT_MS = 400;
const GREET_BUBBLE_AT_MS = GREET_TRAVEL_MS + GREET_BUBBLE_IN_MS;
const GREET_TOTAL_MS = GREET_BUBBLE_AT_MS + GREET_HOLD_MS + GREET_BUBBLE_OUT_MS;

const SESSION_KEY = "kaiser-greeted";

type Phase = "trotting" | "idle" | "sitting";
type Mode = "greet" | "follow";

export default function KaiserCursor() {
  const [enabled, setEnabled] = useState(false);
  const [phase, setPhase] = useState<Phase>("trotting");
  const [bubble, setBubble] = useState(false);
  const [hidden, setHidden] = useState(true);

  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const rootRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  // ── Gate. Both queries are watched so a plugged-in mouse or a flipped OS
  //    setting takes effect without a reload.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const flip = flipRef.current;
    if (!root || !flip) return;

    const pos = { x: -120, y: -120 };
    const target = { x: pos.x, y: pos.y };
    let facing = 1;
    let mode: Mode = "follow";
    let raf: number | null = null;
    let greetStart = 0;
    let greetFromX = -80;
    let greetToX = 0;
    let greetReady = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let cleanupSkip: (() => void) | null = null;
    const isHidden = { current: true };

    const write = () => {
      root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const face = (dir: number) => {
      if (dir === facing) return;
      facing = dir;
      flip.style.transform = `scaleX(${dir})`;
    };

    const start = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      raf = null;

      if (mode === "greet") {
        // Viewport geometry is read on the first frame, not at mount: in a tab
        // that hasn't been laid out yet, innerWidth/innerHeight are still 0 at
        // hydration and the whole greeting anchors to the top-left corner.
        if (!greetReady) {
          const vw = document.documentElement.clientWidth || window.innerWidth;
          const vh = document.documentElement.clientHeight || window.innerHeight;
          if (!vw || !vh) {
            raf = requestAnimationFrame(tick);
            return;
          }
          greetToX = Math.max(64, vw * 0.22);
          pos.x = greetFromX;
          pos.y = vh * 0.72;
          target.x = pos.x;
          target.y = pos.y;
          greetStart = now;
          greetReady = true;
          isHidden.current = false;
          setHidden(false);
        }

        // The whole sequence is clocked off rAF rather than setTimeout. Those two
        // clocks diverge in a backgrounded tab — rAF throttles to a crawl while
        // timers keep firing on wall time — which would land someone returning to
        // the tab on a half-played greeting. Off one clock it just resumes.
        // React bails out on identical state, so re-setting these per frame is free.
        const elapsed = now - greetStart;
        const t = Math.min(1, elapsed / GREET_TRAVEL_MS);
        pos.x = greetFromX + (greetToX - greetFromX) * (1 - Math.pow(1 - t, 3));
        write();
        setPhase(t < 1 ? "trotting" : "sitting");
        setBubble(
          elapsed >= GREET_BUBBLE_AT_MS && elapsed < GREET_BUBBLE_AT_MS + GREET_HOLD_MS,
        );
        if (elapsed >= GREET_TOTAL_MS) {
          finishGreeting();
          return;
        }
      } else {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        if (Math.abs(dx) > FLIP_DEADZONE) face(dx > 0 ? 1 : -1);
        if (Math.hypot(dx, dy) < PARK_EPSILON) {
          pos.x = target.x;
          pos.y = target.y;
          write();
          return; // parked — pointermove restarts us
        }
        pos.x += dx * EASE;
        pos.y += dy * EASE;
        write();
      }

      raf = requestAnimationFrame(tick);
    };

    // ── Following ──────────────────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX + OFFSET_X;
      target.y = e.clientY + OFFSET_Y;
      if (isHidden.current) {
        isHidden.current = false;
        setHidden(false);
      }
      if (mode !== "follow") return;
      setPhase("trotting");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setPhase("idle"), IDLE_AFTER_MS);
      start();
    };

    const hide = () => {
      if (mode !== "follow" || isHidden.current) return;
      isHidden.current = true;
      setHidden(true);
    };
    const onPointerLeave = (e: PointerEvent) => {
      // relatedTarget null means the pointer actually left the window
      if (e.relatedTarget === null) hide();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") hide();
    };

    // ── Greeting ───────────────────────────────────────────────────────────
    const finishGreeting = () => {
      cleanupSkip?.();
      cleanupSkip = null;
      // Marked spent only once it has actually played out. Writing this up front
      // would make React's StrictMode double-invoke swallow the greeting: the
      // first pass sets the key, the discarded second pass reads it and skips.
      sessionStorage.setItem(SESSION_KEY, "1");
      setBubble(false);
      mode = "follow";
      setPhase("trotting");
      start();
    };

    const shouldGreet =
      pathnameRef.current === "/" && !sessionStorage.getItem(SESSION_KEY);

    if (shouldGreet) {
      mode = "greet";
      setPhase("trotting");
      write();
      raf = requestAnimationFrame(tick);

      // Never make someone wait on a dog: any real interaction ends it early.
      const skip = () => {
        if (mode === "follow") return;
        finishGreeting();
      };
      window.addEventListener("pointerdown", skip);
      window.addEventListener("wheel", skip, { passive: true });
      window.addEventListener("keydown", skip);
      cleanupSkip = () => {
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("wheel", skip);
        window.removeEventListener("keydown", skip);
      };
    } else {
      write();
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cleanupSkip?.();
      if (idleTimer) clearTimeout(idleTimer);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="k-root"
      data-state={phase}
      data-hidden={hidden ? "true" : "false"}
      aria-hidden="true"
    >
      <div ref={flipRef} className="k-flip">
        <KaiserSprite />
      </div>
      <div className="k-bubble" data-show={bubble ? "true" : "false"}>
        Hi, I&rsquo;m Kaiser.
      </div>
    </div>
  );
}
