import { T } from "../tokens";
import HandGlyph from "./HandGlyph";

const G = T.gesture;

// The welcome screen, which has exactly one job: show the three gestures and
// nothing else, so the camera never turns on cold. Concept testing kept
// turning up the same freeze at the very start — people weren't sure which
// gesture actually draws.
//
// Drawn here rather than screenshotted: the live prototype's own onboarding
// is plain browser default UI, and this is the content of that screen, in the
// case study's palette.
const GESTURES = [
  { pinch: "index", label: "Draw", detail: "Thumb and index" },
  { pinch: "ring", label: "Change colour", detail: "Thumb and ring" },
  { pinch: "pinky", label: "Undo", detail: "Thumb and pinky" },
] as const;

export default function GestureLegend() {
  return (
    <figure className="w-full m-0">
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{
          border: `1px solid ${T.inkFaint}`,
          borderRadius: T.radius.darkBlock,
          backgroundColor: G.tint + "40",
          overflow: "hidden",
        }}
      >
        {GESTURES.map((g, i) => (
          <div
            key={g.label}
            className="flex flex-col items-center gap-5 px-6 py-10 lg:py-14"
            style={{
              borderLeft: i === 0 ? undefined : `1px solid ${T.inkFaint}`,
            }}
          >
            <HandGlyph pinch={g.pinch} size={132} />
            <div className="flex flex-col items-center gap-1.5">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: T.type.sub,
                  color: T.ink,
                }}
              >
                {g.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: T.type.caption,
                  color: T.inkMuted,
                }}
              >
                {g.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <figcaption
        className="mt-3"
        style={{ fontFamily: "var(--font-body)", fontSize: T.type.caption, color: T.inkMuted }}
      >
        The welcome screen: three gestures, no settings, nothing to read past what you need to
        make your first mark.
      </figcaption>
    </figure>
  );
}
