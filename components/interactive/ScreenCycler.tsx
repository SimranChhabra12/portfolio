"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The homepage work card, cycling through a project's actual screens.
//
// The composition problem this solves: the card slot is 5:3 landscape and every screen is
// a ~402x977 portrait export. Cropping a phone screen to 5:3 leaves a horizontal band of
// UI that reads as nothing, `object-contain` letterboxes it (DESIGN_DOC §5), and fitting
// the whole screen into the slot renders it at 0.32x — where 14px UI type lands at 4.5px
// and no amount of resolution helps.
//
// So the card is composed instead of filled, after honeymehta.design: a pale ground in the
// project's own colour, ONE screen shown large in a device and bleeding off the bottom
// edge, and the readable detail lifted out beside it as a text chip at 13px rather than
// left inside the screenshot to be shrunk. The screen ends up at 0.46x, and the part you
// are meant to read is real text.
//
// Timing mirrors the playground mosaic — in-view only, staggered per card, cross-faded,
// still under reduced motion — so the two sections feel like one behaviour rather than
// two different slideshows on one page.
const DWELL_MS = 3600;
const FADE_MS = 600;

// Widest screen ratio across every project's `cardScreens` (AIRA 440x956 = 0.4603).
// If a project ever adds a wider export than this, its sides WILL be cropped — re-measure
// and raise this rather than letting the frame quietly trim the new screens.
const FRAME_ASPECT = "440 / 956";

// Chip copy comes from the screen's own alt text, which is already written per screen as
// "<Product> <screen> — <what it does>". The half after the dash is the part worth reading
// at card size; the half before is the product name, which the title already says. Falls
// back to the whole string, so a screen whose alt has no dash still gets a chip.
const label = (alt: string) => {
  const [, tail] = alt.split(/\s+—\s+/);
  const text = (tail ?? alt).trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function ScreenCycler({
  screens,
  cover,
  coverAlt,
  tint,
  wordmark,
  stagger = 0,
}: {
  screens: { src: string; alt: string }[];
  cover: string;
  coverAlt: string;
  tint: string;
  wordmark: string;
  stagger?: number;
}) {
  const [index, setIndex] = useState(0);
  const [reached, setReached] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const advance = () =>
    setIndex((i) => {
      const next = (i + 1) % screens.length;
      setReached((r) => Math.max(r, next));
      return next;
    });

  useEffect(() => {
    if (!inView || screens.length < 2) return;
    const id = setInterval(advance, DWELL_MS + stagger);
    return () => clearInterval(id);
    // `advance` is stable in behaviour (setState updaters only) and re-creating the
    // interval on every render would reset the timer on each tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, screens.length, stagger]);

  const mountUpTo = Math.min(reached + 1, screens.length - 1);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" onMouseEnter={advance}>
      {/* Ground: a pale wash of the project's own colour, not the blurred cover.
          The blur was solving the wrong problem — it filled the tile without saying
          anything, and all four covers being dark composites made the grid read as one
          texture. A per-project tint is what makes a set of cards look like a set of
          different things. The value arrives ready to use as `cardTint` — see that field's
          note in data/caseStudies.ts for how each was sampled — and is deliberately NOT
          mixed down further here. The first version derived it from `color` with a 10%
          mix, which put Whspr and AIRA on the same grey, because both of those are
          near-black UI chrome rather than a product colour. */}
      <div aria-hidden className="absolute inset-0" style={{ background: tint }} />

      {/* Product name, set large and low-contrast in the ground — the equivalent of the
          client logo the reference puts in the corner of each banner. Set in the site's
          own display face rather than as a logo asset: none of these products has a
          wordmark file in the repo, and drawing a facsimile of a real company's mark is
          not something to do by hand on a student concept.
          It has to stay in the top-right CORNER, clear of the device — not merely painted
          behind it. `max-w-[45%]` is what enforces that: the phone's right edge lands at
          ~45% of the tile, so a name is boxed into the free half and wraps there instead
          of running back across the screen. One-word names ("Whspr", "AIRA") still fit on
          a line; "Resy Celebrations" breaks to two, right-aligned to the corner.
          14% ink so it never competes with the screen or the chip. `select-none` because
          it is texture, not content — the title underneath the card already says this. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[7%] max-w-[45%] select-none text-right font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-ink/[0.14] [text-wrap:balance]"
      >
        {wordmark}
      </span>

      {/* The phone. Anchored to the bottom and taller than the tile, so it bleeds off the
          bottom edge rather than sitting complete in the middle. That is a composition
          choice, not a way to hide anything: a device that runs out of frame reads as
          deliberate, where the same screen shrunk to fit reads as a thumbnail. Bleeding
          also buys real scale — 466px tall here against 310px when it had to fit.
          Anchored from the TOP, not the bottom: bottom-anchoring bled the same 113px off
          the top edge and took the header with it, and the header is the half of a screen
          that says what the screen is. */}
      <div className="absolute inset-0">
        {/* The device. Bezel is drawn, not an asset: a PNG frame would have to be fetched
            per card and would fight `object-cover` at every breakpoint, where this scales
            with the tile for free.
            `p-[1.15%]` — percentage padding resolves against the CONTAINING BLOCK's width
            (the tile, 588px), not the element's own, on all four sides. So the bezel is an
            even thickness that scales with the card, where a fixed px value would not; the
            number looks small because it is a share of the tile, and 1.15% of 588 lands at
            ~6.8px, about 3.5% of the phone's own width — a real handset's proportion. At
            2.6% it measured 15.3px, roughly double a real bezel.
            FRAME ASPECT — the rule: it must be at least as WIDE as the widest screen in
            any set, because `object-cover` crops whichever axis is in surplus. At 402/977
            (0.411) every AIRA screen (440x956, 0.460) lost 11% off its sides — 5.5% off
            each edge — and so did two of Whspr's five (402x874). Side-cropping is the one
            crop that damages a screen: it eats the leading and trailing edge of every row
            of UI and pushes what is left into the bezel.
            0.460 is the widest ratio measured across both sets, so nothing is cropped
            horizontally any more, and taller screens now lose only their bottom — the tab
            bar and safe area — which `object-top` was already protecting against.
            It is also, by coincidence worth keeping, almost exactly a real handset:
            393/852 on an iPhone 15 is 0.4613. */}
        <div
          className={
            // Body: a vertical gradient rather than one flat fill, so the titanium rail
            // catches light down its length instead of reading as a black rectangle.
            // `w-auto`: an absolutely positioned box with no width and no right offset
            // shrink-wraps its content, so the body is exactly the screen plus its bezel.
            "absolute top-[10%] left-[9%] h-[126%] w-auto bg-gradient-to-b from-[#3A3540] via-[#15131A] to-[#2A2530] p-[1.15%] " +
            // Corner radius has to track the device width, and a percentage radius would
            // resolve per-axis and go elliptical on a 0.41 portrait. So: two fixed values.
            // A real handset's corner is ~12% of its width — 13px on the 106px phone a
            // mobile card renders, 23px on the 192px one at desktop.
            "rounded-[13px] md:rounded-[23px] " +
            // The rim: a hairline inset highlight is what separates glass from a slab.
            "shadow-[0_18px_40px_-12px_rgba(58,42,56,0.35),inset_0_0_0_1px_rgba(255,255,255,0.14)]"
          }
        >
          <div
            style={{ aspectRatio: FRAME_ASPECT }}
            className={
              // The aspect lives HERE, on the screen, not on the body. With it on the body,
              // the uniform bezel padding made the inner box narrower than the frame —
              // 0.443 against the 0.460 the screens need — and AIRA still lost 3.8% off its
              // sides after the frame itself was corrected. The screen is what has to match
              // the export; the body is then whatever that plus a bezel comes to.
              "relative h-full w-auto overflow-hidden rounded-[9px] md:rounded-[17px] " +
              // Screen sits *in* the body: a dark inner hairline stops the screenshot's
              // own edge butting flush against the bezel highlight.
              "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.55)]"
            }
          >
            {screens.slice(0, mountUpTo + 1).map((screen, i) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                aria-hidden={i !== index}
                fill
                sizes="240px"
                // `object-top`: where the heights differ it is the bottom of the screen —
                // tab bar, safe area — that is expendable, never the header.
                className="object-cover object-top transition-opacity motion-reduce:transition-none"
                style={{ opacity: i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
              />
            ))}

            {/* Dynamic island. Sized off the screen width so it tracks the bezel, and
                deliberately drawn ON the screenshot: these exports carry a status bar but
                no cut-out, so without it the frame reads as a generic slab. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[1.6%] h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-[#15131A]"
            />
          </div>
        </div>

        {/* Callout chip. This is the actual answer to "the screens look small": the
            readable detail is set as real text beside the phone, at 13px, instead of
            being asked to survive a 0.32x reduction inside the screenshot. The copy is
            not invented — it is the second half of each screen's own `alt`, which was
            already written per screen ("Whspr search — recently active places"). So the
            chip always describes the screen currently showing, and cross-fades with it. */}
        <div className="absolute right-[6%] top-1/2 w-[42%] -translate-y-1/2">
          {screens.slice(0, mountUpTo + 1).map((screen, i) => (
            <p
              key={screen.src}
              aria-hidden
              className="t-caption absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[var(--radius-card-sm)] bg-cream px-3.5 py-2.5 text-ink shadow-[0_8px_24px_-10px_rgba(58,42,56,0.45)] transition-opacity motion-reduce:transition-none"
              style={{ opacity: i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            >
              {label(screen.alt)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
