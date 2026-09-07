import { T } from "../tokens";
import PhoneMockup from "../PhoneMockup";

const A = T.aira;

// Full-bleed cover band at the very top of /work/aira-pcos, sitting behind the
// page header — the same format as Whspr's cover: a dark ground lit by one
// source in the product's own palette, carrying three real screens.
//
// All three sources are 880x1912, so at one shared width they render at
// identical heights. Set flat and evenly spaced, no rotation.
const PHONE_W = 200;

// The cover's light: one coral source, top centre. Coral is AIRA's lead accent;
// the second, cooler wash is the app's surface so the ground doesn't read flat.
export const CORAL_GLOW =
  `radial-gradient(55% 70% at 50% 0%, ${A.coral}59 0%, ${A.coral}22 40%, transparent 72%), ` +
  `radial-gradient(120% 110% at 50% -10%, ${A.surface}CC 0%, transparent 70%)`;

const PHONES = [
  {
    src: "/projects/aira-pcos/aira/Menstrual Phase.png",
    alt: "AIRA menstrual phase screen — what the current phase means for energy",
    center: false,
  },
  {
    src: "/projects/aira-pcos/aira/HOme tab_.png",
    alt: "AIRA home — one daily readiness score over seven connected health pillars",
    center: true,
  },
  {
    src: "/projects/aira-pcos/aira/Workout - Cycle Insight.png",
    alt: "AIRA workout screen — training adjusted to the current cycle phase",
    center: false,
  },
];

export default function HeroVisual() {
  return (
    <div
      id="aira-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: A.dark,
        // Top padding clears the fixed nav, which sits transparent over this band.
        paddingTop: "clamp(6rem, 4.5rem + 4vw, 8rem)",
        paddingBottom: "clamp(3rem, 2rem + 3vw, 4.5rem)",
      }}
    >
      {/* Single coral light source, top centre */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: CORAL_GLOW }}
      />

      <div className="relative flex items-center justify-center gap-8 sm:gap-14 px-4">
        {PHONES.map((p) => (
          <div key={p.src} className={p.center ? undefined : "hidden sm:block"}>
            <PhoneMockup
              src={p.src}
              alt={p.alt}
              width={PHONE_W}
              pixelWidth={880}
              pixelHeight={1912}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
