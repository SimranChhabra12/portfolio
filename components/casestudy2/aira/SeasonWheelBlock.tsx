import { T } from "../tokens";
import HeroScrub from "./HeroScrub";

/**
 * The season wheel, in the body of the case study rather than at the top of it.
 *
 * HeroScrub was built as a full-bleed cover band; inside the media column it needs
 * a rounded dark block to sit in, matching DarkBlock's radius so it reads as one of
 * the page's figures. The wheel itself is unchanged — same component, same
 * interaction — so the two can't drift.
 */
export default function SeasonWheelBlock() {
  return (
    <div
      className="overflow-hidden"
      style={{ borderRadius: T.radius.darkBlock, backgroundColor: T.aira.dark }}
    >
      <HeroScrub inline />
    </div>
  );
}
