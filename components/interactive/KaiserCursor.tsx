"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import KaiserSprite from "./KaiserSprite";
import BoneSprite from "./BoneSprite";

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

/** The bone rides just off the pointer tip, close enough to read as held by it. */
const BONE_OFFSET_X = 10;
const BONE_OFFSET_Y = 6;

/** Sprite box, and where his mouth sits inside it when he faces RIGHT (element
    px, i.e. viewBox units x 56/64). Flipped left, the mouth is the mirror of
    MOUTH_X about the box. */
const SPRITE_W = 56;
const MOUTH_X = 52;
const MOUTH_Y = 16;

const BONE_W = 24;
const BONE_H = 12;

/** Where the bone's centre sits relative to the pointer. */
const BONE_CX = BONE_OFFSET_X + BONE_W / 2;
const BONE_CY = BONE_OFFSET_Y + BONE_H / 2;

/**
 * Where he has to stand for his mouth to land on the bone — the whole chase
 * resolves here, so it's derived from the mouth and bone geometry rather than
 * being a hand-picked offset. It depends on which way he's facing: coming from
 * the left he reaches the bone with the right-hand mouth, coming from the right
 * with the mirrored one, and the two park spots sit on opposite sides of the
 * pointer.
 */
const parkX = (facing: number) =>
  BONE_CX - (facing === 1 ? MOUTH_X : SPRITE_W - MOUTH_X);
const PARK_Y = BONE_CY - MOUTH_Y;

/**
 * Walking speed, px per second.
 *
 * Deliberately a constant speed rather than the usual ease-toward-target: an
 * exponential approach closes a shrinking fraction of a shrinking gap, so at a
 * slow enough setting he crawls the last stretch and effectively never arrives.
 * Since the point of the chase is that he *gets* the bone, he walks at a fixed
 * pace instead and always closes the distance.
 */
const SPEED = 35;

/**
 * The pounce. At the amble above he covers a viewport width in ten seconds, so
 * while you're actually moving the mouse he never closes — which reads as him
 * never catching it at all. Once the pointer has been still this long he
 * commits and runs the rest in, so the grab is something you see every time you
 * stop rather than a reward for sitting perfectly still for ten seconds.
 */
const POUNCE_AFTER_MS = 320;
const POUNCE_SPEED = 207;

/** rAF gaps are clamped before they're integrated, so a throttled or
    backgrounded tab can't hand back one huge dt and teleport him. */
const MAX_FRAME_MS = 50;

/** How much closer the other park spot has to be before he'll turn around.
    The two spots are SPRITE_W - 2 * (SPRITE_W - MOUTH_X) apart, so anything
    under that gap still lets a genuine crossing flip him; the margin is only
    there to stop a dog sitting between them from dithering. */
const SIDE_SWITCH_MARGIN = 24;

const GREET_TRAVEL_MS = 1400;
const GREET_BUBBLE_IN_MS = 250;
const GREET_HOLD_MS = 2500;
const GREET_BUBBLE_OUT_MS = 400;
const GREET_BUBBLE_AT_MS = GREET_TRAVEL_MS + GREET_BUBBLE_IN_MS;
const GREET_TOTAL_MS = GREET_BUBBLE_AT_MS + GREET_HOLD_MS + GREET_BUBBLE_OUT_MS;

const SESSION_KEY = "kaiser-greeted";

/** Summoned: he runs in faster than the pounce, sits beside the button, and
    holds the bubble long enough to read a full sentence. */
const SUMMON_SPEED = POUNCE_SPEED * 1.6;
const SUMMON_BUBBLE_IN_MS = 250;
const SUMMON_HOLD_MS = 3400;
const SUMMON_GAP = 10;
const SPRITE_H = 42;

/**
 * Where he's allowed to be.
 *
 * Everywhere except the case studies. Those pages are sustained, effortful
 * reading, and something trotting through peripheral vision is a real cost to
 * that — but the bigger reason is editorial: a case study is where restraint
 * has to do the talking, and a dog crossing the research synthesis argues
 * against the page it's on. The work index is fine; that's scanning, not
 * reading.
 *
 * Deliberately a route test rather than a container. Penning him inside a
 * bordered box would turn a companion into a demo widget, which is the weaker
 * of the two things to show.
 */
const isOffLimits = (pathname: string) =>
  /^\/work\/[^/]+/.test(pathname);

type Phase = "trotting" | "idle" | "sitting" | "holding";
type Mode = "greet" | "follow" | "summon";

/** Fired by the "say hi to Kaiser" button on /about. The listener marks
    `handled`, so the button knows whether anyone came (he doesn't render on
    touch screens or under reduced motion) and can fall back to text. */
export const KAISER_SUMMON = "kaiser:summon";
export type SummonDetail = {
  x: number; y: number; w: number; h: number;
  message: string;
  handled: boolean;
};

export default function KaiserCursor() {
  const [enabled, setEnabled] = useState(false);
  const [phase, setPhase] = useState<Phase>("trotting");
  const [bubble, setBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("Hi, I\u2019m Kaiser.");
  // Summoned to a link that sits under a line of text, the bubble opens below
  // him, into the gap, so it never covers what's above. Set inline rather than
  // by a stylesheet rule so it's one piece of state, next to the text it moves.
  const [bubbleBelow, setBubbleBelow] = useState(false);
  const [hidden, setHidden] = useState(true);
  // Separate from `hidden`: the bone stays off screen through the greeting,
  // which plays before the pointer has told us where it is.
  const [boneShown, setBoneShown] = useState(false);

  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const rootRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const boneRef = useRef<HTMLDivElement>(null);

  // ── Gate. Both queries are watched so a plugged-in mouse or a flipped OS
  //    setting takes effect without a reload.
  useEffect(() => {
    if (isOffLimits(pathname)) {
      setEnabled(false);
      return;
    }
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
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const flip = flipRef.current;
    const bone = boneRef.current;
    if (!root || !flip || !bone) return;

    const pos = { x: -120, y: -120 };
    const target = { x: pos.x, y: pos.y };
    /** Last known pointer position. The target is derived from this every frame
        rather than written on pointermove, because which side of the bone he
        aims for depends on the way he's currently facing. */
    const ptr = { x: pos.x, y: pos.y };
    let facing = 1;
    /** Which side of the bone he's approaching from: 1 = from the left. */
    let side = 1;
    let mode: Mode = "follow";
    let raf: number | null = null;
    let greetStart = 0;
    /** Timestamp of the previous frame, for dt-based movement. */
    let last = 0;
    /** When the pointer last moved — the pounce is keyed off how stale this is. */
    let lastMoveAt = 0;
    let wasPouncing = false;
    let greetFromX = -80;
    let greetToX = 0;
    let greetReady = false;
    let cleanupSkip: (() => void) | null = null;
    const isHidden = { current: true };
    // Whether the pointer has ever reported a position. The bone can't be shown
    // before it has: it would sit at 0,0 in the corner.
    let pointerSeen = false;
    /** True while the bone is in his mouth rather than on the pointer. */
    let held = false;
    /** Summon: the spot beside the button, which way to face once there, and
        when he arrived (0 while still running). */
    const summon = { x: 0, y: 0, face: 1, arrivedAt: 0 };

    const write = () => {
      root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const face = (dir: number) => {
      if (dir === facing) return;
      facing = dir;
      flip.style.transform = `scaleX(${dir})`;
    };

    const start = () => {
      if (raf === null) {
        last = 0; // parked for who knows how long; don't integrate that gap
        raf = requestAnimationFrame(tick);
      }
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
      } else if (mode === "summon") {
        const dt = Math.min(now - (last || now), MAX_FRAME_MS);
        last = now;
        if (summon.arrivedAt === 0) {
          const dx = summon.x - pos.x;
          const dy = summon.y - pos.y;
          const dist = Math.hypot(dx, dy);
          const step = (SUMMON_SPEED * dt) / 1000;
          if (dist <= step) {
            pos.x = summon.x;
            pos.y = summon.y;
            write();
            face(summon.face);
            summon.arrivedAt = now;
            root.dataset.run = "false";
            wasPouncing = false;
            setPhase("sitting");
          } else {
            face(dx >= 0 ? 1 : -1);
            pos.x += (dx / dist) * step;
            pos.y += (dy / dist) * step;
            write();
            setPhase("trotting");
          }
        } else {
          // Clocked off rAF like the greeting, so a backgrounded tab resumes
          // mid-sentence rather than skipping it.
          const since = now - summon.arrivedAt;
          setBubble(since >= SUMMON_BUBBLE_IN_MS && since < SUMMON_BUBBLE_IN_MS + SUMMON_HOLD_MS);
          if (since >= SUMMON_BUBBLE_IN_MS + SUMMON_HOLD_MS + GREET_BUBBLE_OUT_MS) {
            mode = "follow";
            root.dataset.bubbleSide = "right";
            setBubbleBelow(false);
            setBubble(false);
            setPhase("trotting");
          }
        }
      } else {
        const dt = Math.min(now - (last || now), MAX_FRAME_MS);
        last = now;
        const pouncing = now - lastMoveAt > POUNCE_AFTER_MS;
        const speed = pouncing ? POUNCE_SPEED : SPEED;
        // Written straight to the DOM, and only on a change — the stride rate is
        // presentation, and routing it through state would re-render the tree.
        if (pouncing !== wasPouncing) {
          wasPouncing = pouncing;
          root.dataset.run = pouncing ? "true" : "false";
        }

        // Which side he comes at the bone from — and so which of the two park
        // spots he walks to — is chosen by which spot is nearer, never by his
        // direction of travel. Travel-derived facing is what caused the shake:
        // the two spots straddle the pointer, so a dog between them faced right,
        // saw the left-hand target, flipped, saw the right-hand target, flipped
        // back, every frame. Nearest-spot also gives the right answer when the
        // bone is carried TO him — he turns to meet it instead of reversing 50px
        // to line up the far side — and the margin stops him dithering when the
        // two are near enough to equal.
        const spotL = ptr.x + parkX(1);
        const spotR = ptr.x + parkX(-1);
        const mine = Math.abs(pos.x - (side === 1 ? spotL : spotR));
        const other = Math.abs(pos.x - (side === 1 ? spotR : spotL));
        if (mine - other > SIDE_SWITCH_MARGIN) side = -side;
        face(side);

        target.x = ptr.x + parkX(side);
        target.y = ptr.y + PARK_Y;
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;

        const dist = Math.hypot(dx, dy);
        const step = (speed * dt) / 1000;
        if (dist <= step) {
          // Arrived. One fixed step always overshoots the last sliver of the
          // gap, so the catch is guaranteed rather than asymptotic.
          pos.x = target.x;
          pos.y = target.y;
          write();
          // The bone stops tracking the pointer and hangs in his mouth until
          // the next pointermove takes it back.
          holdBone();
          setPhase("holding");
          return; // parked — pointermove restarts us
        }
        // Gait follows the legs, not the mouse. At this pace he's still walking
        // long after the pointer has stopped, and a timer-driven idle would have
        // him gliding across the page mid-stride with his legs frozen.
        setPhase("trotting");
        pos.x += (dx / dist) * step;
        pos.y += (dy / dist) * step;
        write();
      }

      raf = requestAnimationFrame(tick);
    };

    // ── The grab ───────────────────────────────────────────────────────────
    const holdBone = () => {
      const mouthX = facing === 1 ? MOUTH_X : SPRITE_W - MOUTH_X;
      bone.style.transform = `translate3d(${pos.x + mouthX - BONE_W / 2}px, ${
        pos.y + MOUTH_Y - BONE_H / 2
      }px, 0)`;
      bone.dataset.held = "true";
      held = true;
    };

    // ── Following ──────────────────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      lastMoveAt = performance.now();
      pointerSeen = true;
      // The bone is pinned to the pointer, so it's written straight here rather
      // than eased in the rAF loop — no lag between it and the real cursor.
      // This is also the release: moving the mouse pulls it out of his mouth.
      bone.style.transform = `translate3d(${e.clientX + BONE_OFFSET_X}px, ${
        e.clientY + BONE_OFFSET_Y
      }px, 0)`;
      if (held) {
        bone.dataset.held = "false";
        held = false;
      }
      if (isHidden.current) {
        isHidden.current = false;
        setHidden(false);
      }
      if (mode !== "follow") return;
      setBoneShown(true);
      setPhase("trotting");
      start();
    };

    const hide = () => {
      if (mode !== "follow" || isHidden.current) return;
      isHidden.current = true;
      setHidden(true);
      setBoneShown(false);
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
      // Someone who moved the mouse during the greeting gets the bone the moment
      // it ends, rather than waiting for their next movement.
      if (pointerSeen) setBoneShown(true);
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

    // ── Summoned ("say hi to Kaiser" on /about) ──────────────────────────────
    const onSummon = (e: Event) => {
      const d = (e as CustomEvent<SummonDetail>).detail;
      if (!d) return;
      d.handled = true;
      if (mode === "greet") {
        cleanupSkip?.();
        cleanupSkip = null;
        sessionStorage.setItem(SESSION_KEY, "1");
      }
      const vw = document.documentElement.clientWidth || window.innerWidth;
      // Sit beside the button on its baseline: to its left if there's room,
      // facing it, otherwise to its right facing back.
      const leftX = d.x - SPRITE_W - SUMMON_GAP;
      const fromLeft = leftX > 8;
      summon.x = fromLeft ? leftX : Math.min(vw - SPRITE_W - 8, d.x + d.w + SUMMON_GAP);
      summon.y = d.y + d.h - SPRITE_H;
      summon.face = fromLeft ? 1 : -1;
      summon.arrivedAt = 0;
      // Never been on screen yet: run in from the nearer edge, not the corner.
      if (pos.x < -SPRITE_W / 2) {
        pos.x = fromLeft ? -SPRITE_W : vw;
        pos.y = summon.y;
        write();
      }
      root.dataset.bubbleSide = fromLeft ? "right" : "left";
      setBubbleBelow(true);
      mode = "summon";
      setBubbleText(d.message);
      setBubble(false);
      isHidden.current = false;
      setHidden(false);
      root.dataset.run = "true";
      wasPouncing = true;
      start();
    };

    window.addEventListener(KAISER_SUMMON, onSummon);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener(KAISER_SUMMON, onSummon);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cleanupSkip?.();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={boneRef}
        className="k-bone"
        data-hidden={boneShown ? "false" : "true"}
        data-held="false"
        aria-hidden="true"
      >
        <BoneSprite />
      </div>
      <div
        ref={rootRef}
        className="k-root"
        data-state={phase}
        data-run="false"
        data-hidden={hidden ? "true" : "false"}
        data-bubble-side="right"
        aria-hidden="true"
      >
        <div ref={flipRef} className="k-flip">
          <KaiserSprite />
        </div>
        <div
          className="k-bubble"
          data-show={bubble ? "true" : "false"}
          data-wrap={bubbleText.length > 24 ? "true" : "false"}
          style={bubbleBelow ? { top: 46, bottom: "auto" } : undefined}
        >
          {bubbleText}
        </div>
      </div>
    </>
  );
}
