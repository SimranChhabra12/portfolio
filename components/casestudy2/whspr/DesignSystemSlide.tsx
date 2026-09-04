import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { T } from "../tokens";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
const dmSans = DM_Sans({ weight: ["400", "500"], subsets: ["latin"] });

const W = T.whspr;

const swatches = [
  { name: "Midnight", hex: W.midnight },
  { name: "Surface 1", hex: W.surface1 },
  { name: "Surface 2", hex: W.surface2 },
  { name: "Signal Amber", hex: W.amber },
  { name: "Amber Dim", hex: W.amberDim },
];

// Whspr's own product design system, shown at face value — the colors
// and type it actually ships with, not a re-interpretation.
export default function DesignSystemSlide() {
  return (
    <div
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.75rem, 1.25rem + 2.5vw, 3.5rem)",
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10 lg:mb-12">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col gap-3">
            <div
              style={{
                backgroundColor: s.hex,
                aspectRatio: "1 / 1",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
            <div>
              <p style={{ fontFamily: dmSans.style.fontFamily, fontSize: "0.8125rem", color: W.textLight }}>
                {s.name}
              </p>
              <p style={{ fontFamily: dmSans.style.fontFamily, fontSize: "0.75rem", color: W.dusk400 }}>
                {s.hex}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p
          style={{
            fontFamily: dmSerif.style.fontFamily,
            fontSize: "clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)",
            color: W.textLight,
            lineHeight: 1.2,
          }}
        >
          DM Serif Display
        </p>
        <p style={{ fontFamily: dmSans.style.fontFamily, fontSize: "1.0625rem", color: W.dusk400 }}>
          DM Sans — body, labels, captions
        </p>
      </div>
    </div>
  );
}
