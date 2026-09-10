import { T } from "../tokens";
import GestureArtwork from "./GestureArtwork";

// Cover band at the very top of /work/gesture-sketch, matching the Whspr and
// AIRA covers in height and behaviour. Those two carry product screens on the
// product's own ground; this project has no screens worth showing at that
// scale — its interface is deliberately almost empty — so the cover carries the
// drawing instead.
export default function HeroVisual() {
  return (
    <div
      id="gesture-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: T.cream,
        height: "clamp(280px, 42vh, 460px)",
      }}
    >
      <GestureArtwork crop="band" className="absolute inset-0 w-full h-full" />
    </div>
  );
}
