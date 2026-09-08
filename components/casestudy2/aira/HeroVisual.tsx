import { T } from "../tokens";
import PhoneShell from "./screens/PhoneShell";
import HomeScreen from "./screens/HomeScreen";
import PhaseScreen from "./screens/PhaseScreen";
import ActivityScreen from "./screens/ActivityScreen";

const A = T.aira;

// Full-bleed cover band at the very top of /work/aira-pcos, sitting behind the
// page header — the same format as Whspr's cover: a dark ground lit by one
// source in the product's own palette, carrying three real screens.
//
// The screens are the rebuilt, coded AIRA UI (see ./screens), not the original
// Figma exports — same three views, corrected ground, accent discipline, radius
// scale and type scale. Authored at one logical size, so they render at identical
// heights. Set flat and evenly spaced, no rotation.
const PHONE_W = 200;

// The cover's light: one coral source, top centre. Coral is AIRA's lead accent;
// the second, cooler wash is the app's surface so the ground doesn't read flat.
export const CORAL_GLOW =
  `radial-gradient(55% 70% at 50% 0%, ${A.coral}59 0%, ${A.coral}22 40%, transparent 72%), ` +
  `radial-gradient(120% 110% at 50% -10%, ${A.surface}CC 0%, transparent 70%)`;


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
        <div className="hidden sm:block">
          <PhoneShell label="AIRA cycle phase screen" width={PHONE_W}>
            <PhaseScreen />
          </PhoneShell>
        </div>
        <PhoneShell label="AIRA home — one daily readiness score" width={PHONE_W}>
          <HomeScreen />
        </PhoneShell>
        <div className="hidden sm:block">
          <PhoneShell label="AIRA logged activity screen" width={PHONE_W}>
            <ActivityScreen />
          </PhoneShell>
        </div>
      </div>
    </div>
  );
}
