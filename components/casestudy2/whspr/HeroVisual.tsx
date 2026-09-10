import { T } from "../tokens";
import PhoneMockup from "../PhoneMockup";

const W = T.whspr;

// Full-bleed cover band at the very top of /work/whspr, sitting behind the
// page header. A midnight ground lit by one amber glow — the app's own
// palette — carrying three real screens.
//
// All three sources are 402x874, so at one shared width they render at
// identical heights: no phone reads as stretched or squat. Set flat and
// evenly spaced, no rotation.
const PHONE_W = 200;

// The cover's light: one amber source, top centre. Exported so the intro-screens block
// further down the page is lit by the same lamp and the two can never drift apart.
export const AMBER_GLOW =
  `radial-gradient(55% 70% at 50% 0%, ${W.amber}66 0%, ${W.amber}26 40%, transparent 72%), ` +
  `radial-gradient(120% 110% at 50% -10%, ${W.surface2}CC 0%, transparent 70%)`;

const PHONES = [
  {
    src: "/projects/whspr/whspr/search-results.png",
    alt: "Whspr search results for bars in the Lower East Side",
    pixelWidth: 402,
    pixelHeight: 874,
    center: false,
  },
  {
    src: "/projects/whspr/whspr/Home/Hi-Fi.png",
    alt: "Whspr home screen: a map of NYC with women's first-hand accounts of places",
    pixelWidth: 804,
    pixelHeight: 1748,
    center: true,
  },
  {
    src: "/projects/whspr/whspr/saved.png",
    alt: "Saved places in Whspr",
    pixelWidth: 402,
    pixelHeight: 874,
    center: false,
  },
];

export default function HeroVisual() {
  return (
    <div
      id="whspr-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: W.midnight,
        // Top padding clears the fixed nav, which sits transparent over this band.
        paddingTop: "clamp(6rem, 4.5rem + 4vw, 8rem)",
        paddingBottom: "clamp(3rem, 2rem + 3vw, 4.5rem)",
      }}
    >
      {/* Single amber light source, top centre */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: AMBER_GLOW,
        }}
      />

      <div className="relative flex items-center justify-center gap-8 sm:gap-14 px-4">
        {PHONES.map((p) => (
          <div key={p.src} className={p.center ? undefined : "hidden sm:block"}>
            <PhoneMockup
              src={p.src}
              alt={p.alt}
              width={PHONE_W}
              pixelWidth={p.pixelWidth}
              pixelHeight={p.pixelHeight}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
