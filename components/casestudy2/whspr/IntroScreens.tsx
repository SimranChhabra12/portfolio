import { T } from "../tokens";
import PhoneMockup from "../PhoneMockup";
import { AMBER_GLOW } from "./HeroVisual";

// The app's three onboarding screens, sitting directly under the headline. Same midnight
// ground and same amber lamp as the cover above (AMBER_GLOW is the cover's own gradient),
// so the top of the page reads as one piece of art direction rather than a cover followed
// by plain cream.
//
// Contained rather than full-bleed: the cover already owns the edge-to-edge treatment, and
// a second band that wide would compete with it. This one takes DarkBlock's radius and
// padding so it speaks the page's existing shape language. DarkBlock itself is not reused —
// it has no glow layer and no overflow clipping, which the gradient needs in order to be
// cut by the rounded corners.
const PHONE_W = 240;

// The screens are the 1x set at 402x874; next/image derives the retina source from these.
const SCREENS = [
  {
    src: "/projects/whspr/whspr/intro-1.png",
    alt: "Whspr onboarding, first screen: “The city through her eyes — real experiences from real women.”",
  },
  {
    src: "/projects/whspr/whspr/intro-2.png",
    alt: "Whspr onboarding, second screen, introducing the signals women leave about places.",
  },
  {
    src: "/projects/whspr/whspr/intro-3.png",
    alt: "Whspr onboarding, third screen, closing the introduction before sign-in.",
  },
];

export default function IntroScreens() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: T.whspr.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.5rem, 1rem + 2.5vw, 3rem)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: AMBER_GLOW }}
      />

      {/* 3 x 240 + 2 x 48 = 816, inside the ~904px left after padding in the 1000px media
          column. Wraps below that rather than crushing the phones, same as ScreensRow. */}
      <div className="relative flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        {SCREENS.map((s) => (
          <PhoneMockup
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={PHONE_W}
            pixelWidth={402}
            pixelHeight={874}
          />
        ))}
      </div>
    </div>
  );
}
