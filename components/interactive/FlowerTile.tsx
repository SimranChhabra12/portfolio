"use client";

import { useEffect, useRef, useState } from "react";
import type p5 from "p5";

// The flower moment from GestureSketch v2, lifted out as a tile anyone can play with.
//
// It opens on a single flower. Clicking it (or "Make it rain") starts a flower shower;
// after that, clicks and taps burst flowers and dragging leaves a trail. That all works
// the instant the page loads, on phones too, with nothing to allow.
//
// The hand version is opt-in behind a button, for two reasons: browsers won't start a
// camera without a permission prompt, and prompting the moment someone lands feels
// intrusive; and the hand model is 7.8MB, which nobody should download unless they asked.
// It reuses the model already hosted with the v2 prototype, and the same MediaPipe
// version v2 was tuned against. Gestures match v2: a fist bursts flowers from your hand,
// a wave makes them rain.

const MEDIAPIPE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
const MODEL = "/prototypes/gesturesketch-v2/hand_landmarker.task";

const FLOWER_COLORS: [number, number, number][] = [
  [255, 215, 90],
  [190, 155, 245],
  [255, 130, 110],
  [130, 215, 175],
];

type Flower = {
  x: number; y: number; vx: number; vy: number; gravity: number;
  rot: number; rotV: number; size: number; life: number; decay: number;
  c: [number, number, number];
};

type HandPoint = { x: number; y: number };
type Landmarker = {
  detectForVideo: (v: HTMLVideoElement, t: number) => { landmarks?: HandPoint[][] };
  close: () => void;
};
type CameraStatus = "off" | "loading" | "on" | "blocked";

const SHOWER_MS = 2600;

export default function FlowerTile() {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const instanceRef = useRef<p5 | null>(null);

  // Shared between the p5 loop and the React handlers without re-rendering.
  const flowersRef = useRef<Flower[]>([]);
  const startedRef = useRef(false);
  const showerUntilRef = useRef(0);
  const actionsRef = useRef<{ start: () => void; rain: () => void }>({ start: () => {}, rain: () => {} });
  const handRef = useRef<{
    landmarker: Landmarker | null;
    stream: MediaStream | null;
    detecting: boolean;
    point: HandPoint | null;
    fistFrames: number;
    fistActive: boolean;
    wrist: number[];
  }>({ landmarker: null, stream: null, detecting: false, point: null, fistFrames: 0, fistActive: false, wrist: [] });

  const [started, setStarted] = useState(false);
  const [camera, setCamera] = useState<CameraStatus>("off");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const cleanups: (() => void)[] = [];

    const flowers = flowersRef.current;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (x: number, y: number, vx: number, vy: number, gravity: number, decay: number, size = rnd(14, 26)): Flower => ({
      x, y, vx, vy, gravity, decay, size,
      rot: rnd(0, Math.PI * 2), rotV: rnd(-0.1, 0.1), life: 1,
      c: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
    });
    const burst = (cx: number, cy: number, n = 22) => {
      for (let i = 0; i < n; i++) {
        const a = rnd(-Math.PI, 0), s = rnd(4, 11);
        flowers.push(make(cx + rnd(-30, 30), cy, Math.cos(a) * s, Math.sin(a) * s, 0.28, rnd(0.01, 0.016)));
      }
    };
    const rainDrop = () => flowers.push(make(rnd(0, host.clientWidth), -30, rnd(-1.2, 1.2), rnd(2.5, 5), 0.04, 0.005));

    const rain = () => { showerUntilRef.current = performance.now() + SHOWER_MS; };
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setStarted(true);
      // The opening flower breaks apart into a burst, then the shower begins.
      burst(host.clientWidth / 2, host.clientHeight / 2, 30);
      rain();
    };
    actionsRef.current = { start, rain };

    // Pointer input on the host rather than p5's mouse callbacks, so mouse and touch
    // behave the same whatever the p5 version.
    let lastTrail = 0;
    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      if (!startedRef.current) { start(); return; }
      const { x, y } = local(e);
      burst(x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!startedRef.current) return;
      if (e.pointerType === "mouse" && e.buttons !== 1) return;
      const now = performance.now();
      if (now - lastTrail < 40) return;
      lastTrail = now;
      const { x, y } = local(e);
      flowers.push(make(x, y, rnd(-1, 1), rnd(-2, 0), 0.08, 0.02));
    };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);

    import("p5").then((mod) => {
      if (cancelled) return;
      const P5 = mod.default;
      instanceRef.current = new P5((p: p5) => {
        let lastRain = 0;
        let lastShowerDrop = 0;

        p.setup = () => {
          p.createCanvas(host.clientWidth, host.clientHeight);
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        };

        p.draw = () => {
          p.clear();
          const now = performance.now();

          if (!startedRef.current) {
            // The single opening flower: large, centred, turning slowly and breathing
            // so it reads as something to press.
            const t = reduced ? 0 : now / 1000;
            const s = Math.min(p.width, p.height) * 0.34 * (1 + (reduced ? 0 : Math.sin(t * 2) * 0.04));
            drawFlower(p, {
              x: p.width / 2, y: p.height / 2, vx: 0, vy: 0, gravity: 0, decay: 0,
              rot: t * 0.25, rotV: 0, size: s, life: 1, c: FLOWER_COLORS[2],
            });
            return;
          }

          // A shower from "Make it rain" or from starting: dense for a couple of seconds.
          if (now < showerUntilRef.current && now - lastShowerDrop > 28) {
            rainDrop(); rainDrop();
            lastShowerDrop = now;
          }
          // After that, gentle ambient rain so it stays alive, never a busy screensaver.
          if (!reduced && now - lastRain > 900) { rainDrop(); lastRain = now; }

          trackHand(p, burst, rainDrop);

          for (const f of flowers) {
            f.vy += f.gravity; f.x += f.vx; f.y += f.vy; f.vx *= 0.99;
            f.rot += f.rotV; f.life -= f.decay;
            drawFlower(p, f);
          }
          for (let i = flowers.length - 1; i >= 0; i--) {
            if (flowers[i].life <= 0 || flowers[i].y > p.height + 60) flowers.splice(i, 1);
          }

          // Where the tracked hand is, so people can see the camera is following them.
          const pt = handRef.current.point;
          if (pt) {
            p.noFill();
            p.stroke(58, 42, 56, 120);
            p.strokeWeight(2);
            p.circle(pt.x * p.width, pt.y * p.height, 28);
          }
        };
      }, host);

      const ro = new ResizeObserver(() => instanceRef.current?.resizeCanvas(host.clientWidth, host.clientHeight));
      ro.observe(host);
      // Off-screen: stop drawing. Back on screen: pick up where it left off.
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? instanceRef.current?.loop() : instanceRef.current?.noLoop()));
      io.observe(host);
      cleanups.push(() => { ro.disconnect(); io.disconnect(); });
    });

    return () => {
      cancelled = true;
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      cleanups.forEach((c) => c());
      instanceRef.current?.remove();
      instanceRef.current = null;
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function trackHand(p: p5, burst: (x: number, y: number, n?: number) => void, rainDrop: () => void) {
    const h = handRef.current;
    const video = videoRef.current;
    if (!h.landmarker || !video || video.readyState < 2 || h.detecting) return;
    h.detecting = true;
    try {
      const res = h.landmarker.detectForVideo(video, performance.now());
      const lm = res.landmarks?.[0];
      if (!lm) { h.point = null; h.fistFrames = 0; return; }

      // Mirrored, so moving your hand right moves the ring right.
      const palm = { x: 1 - lm[9].x, y: lm[9].y };
      h.point = palm;

      // Fist: all four fingertips below their middle joints. Confirmed over 3 frames so a
      // single misread frame doesn't fire a burst.
      const fist = [[8, 6], [12, 10], [16, 14], [20, 18]].every(([t, j]) => lm[t].y > lm[j].y + 0.02);
      h.fistFrames = fist ? h.fistFrames + 1 : 0;
      if (h.fistFrames >= 3 && !h.fistActive) {
        h.fistActive = true;
        burst(palm.x * p.width, palm.y * p.height, 26);
      } else if (!fist) {
        h.fistActive = false;
      }

      // Wave: the wrist changes direction at least twice across the last 10 frames.
      h.wrist.push(lm[0].x);
      if (h.wrist.length > 10) h.wrist.shift();
      let reversals = 0, prev = 0;
      for (let i = 1; i < h.wrist.length; i++) {
        const v = h.wrist[i] - h.wrist[i - 1];
        if (Math.abs(v) < 0.015) continue;
        const dir = v > 0 ? 1 : -1;
        if (prev && dir !== prev) reversals++;
        prev = dir;
      }
      if (reversals >= 2) for (let i = 0; i < 3; i++) rainDrop();
    } finally {
      h.detecting = false;
    }
  }

  async function startCamera() {
    if (camera === "loading" || camera === "on") return;
    actionsRef.current.start();
    setCamera("loading");
    const h = handRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 } });
      h.stream = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();

      // Loaded from the CDN at click time, never bundled: a visitor who only clicks
      // never downloads it. The ignore comments keep the bundler from resolving the URL.
      const url = MEDIAPIPE;
      const vision = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url);
      const fileset = await vision.FilesetResolver.forVisionTasks(`${MEDIAPIPE}/wasm`);
      h.landmarker = await vision.HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL },
        runningMode: "VIDEO",
        numHands: 1,
      });
      setCamera("on");
    } catch {
      stopCamera();
      setCamera("blocked");
    }
  }

  function stopCamera() {
    const h = handRef.current;
    h.stream?.getTracks().forEach((t) => t.stop());
    h.stream = null;
    h.landmarker?.close();
    h.landmarker = null;
    h.point = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  const hint =
    !started ? "Click the flower to start."
    : camera === "on" ? "Make a fist for a burst. Wave for rain."
    : camera === "loading" ? "Starting the camera…"
    : camera === "blocked" ? "The camera isn't available, but clicking still works."
    : "Click or tap anywhere for more flowers.";

  const pill = "t-caption rounded-full px-4 py-2 shadow-sm focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <figure className="m-0">
      <div
        ref={hostRef}
        className={`relative w-full aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface touch-none select-none [&>canvas]:absolute [&>canvas]:inset-0 ${
          started ? "cursor-crosshair" : "cursor-pointer"
        }`}
        aria-label="Interactive flowers. Click the flower to start, make it rain, or turn on your camera and use your hand."
        role="img"
      >
        {/* Small mirrored preview, shown only while the camera is on, so it's always
            obvious the camera is running. */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={`absolute right-3 bottom-3 z-10 w-24 rounded-[var(--radius-card)] -scale-x-100 shadow ${
            camera === "on" || camera === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        <div className="absolute left-4 bottom-4 z-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => (startedRef.current ? actionsRef.current.rain() : actionsRef.current.start())}
            className={`${pill} bg-ink text-cream hover:bg-accent`}
          >
            Make it rain
          </button>
          {camera === "on" || camera === "loading" ? (
            <button
              type="button"
              onClick={() => { stopCamera(); setCamera("off"); }}
              className={`${pill} bg-cream/90 text-ink hover:bg-cream`}
            >
              Turn camera off
            </button>
          ) : (
            <button
              type="button"
              onClick={startCamera}
              className={`${pill} bg-cream/90 text-ink hover:bg-cream`}
            >
              Try it with your hand
            </button>
          )}
        </div>
      </div>
      <figcaption className="t-caption text-mauve mt-3" aria-live="polite">
        {hint} From GestureSketch, my hand-tracking drawing tool.
      </figcaption>
    </figure>
  );
}

function drawFlower(p: p5, f: Flower) {
  const a = Math.max(0, f.life) * 255;
  const r = f.size * 0.5;
  p.push();
  p.translate(f.x, f.y);
  p.rotate(f.rot);
  p.noStroke();
  p.fill(f.c[0], f.c[1], f.c[2], a);
  for (let i = 0; i < 5; i++) {
    p.push();
    p.rotate((i / 5) * Math.PI * 2);
    p.ellipse(0, r * 0.55, r * 0.55, r);
    p.pop();
  }
  p.fill(255, 230, 100, a);
  p.circle(0, 0, r * 0.55);
  p.pop();
}
