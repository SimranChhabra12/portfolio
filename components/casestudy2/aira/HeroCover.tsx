import { T } from "../tokens";
import PhoneShell from "./screens/PhoneShell";
import HomeScreen from "./screens/HomeScreen";
import PhaseScreen from "./screens/PhaseScreen";
import { K } from "./screens/kit";

const A = T.aira;

// AIRA's cover band.
//
// Built on honeymehta.design's two hero devices rather than a third centred row of
// phones. From Tart: a soft, marbled colour field carrying the mood before any UI
// appears — here it is drawn from AIRA's four season hues rather than photographed,
// so the palette is the product's own and the file weighs nothing. From CNN: the
// phones sit asymmetric, at different scales, cropped by the band's bottom edge,
// with two UI fragments lifted out of them and floated alongside — the hero teases
// one mechanic instead of showing whole screens.
//
// The season wheel used to live here. It has moved down to §05, next to the seasons
// framing it illustrates, where it can be read as an explanation rather than as
// decoration above the title.

/** Soft overlapping washes in the season hues — the marbled field, drawn. */
function SeasonField() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          `radial-gradient(70% 90% at 12% 8%, ${A.purple}B3 0%, transparent 62%)`,
          `radial-gradient(64% 86% at 38% 88%, ${A.blue}A6 0%, transparent 60%)`,
          `radial-gradient(58% 78% at 72% 16%, ${A.green}8C 0%, transparent 58%)`,
          `radial-gradient(76% 92% at 92% 78%, ${A.coralPhase}B3 0%, transparent 64%)`,
          `radial-gradient(120% 100% at 50% 50%, ${A.coral}33 0%, transparent 70%)`,
          `linear-gradient(160deg, ${A.dark} 0%, #14121A 45%, ${A.dark} 100%)`,
        ].join(", "),
      }}
    />
  );
}

/** A grain wash. Without it the gradients band visibly on wide dark screens. */
function Grain() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.16,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** One lifted UI fragment, floated off the phones. */
function Lifted({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className="hidden lg:block absolute"
      style={{
        background: "rgba(20, 20, 23, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid rgba(245, 243, 241, 0.10)`,
        borderRadius: 12,
        padding: "12px 14px",
        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.38)",
        fontFamily: "var(--font-body)",
        color: K.text,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function HeroCover() {
  return (
    <div
      id="aira-cover"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: A.dark,
        paddingTop: "clamp(6rem, 4.5rem + 4vw, 8.5rem)",
      }}
    >
      <SeasonField />
      <Grain />

      {/* Cropped by the bottom edge — the phones continue past frame rather than
          sitting centred in their own empty room. */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: 1000, paddingInline: 24, height: "clamp(260px, 30vw, 400px)" }}
      >
        <div
          className="absolute"
          style={{ left: "8%", bottom: -28, transform: "rotate(-3.5deg)" }}
        >
          <PhoneShell label="AIRA cycle phase screen" width={196}>
            <PhaseScreen />
          </PhoneShell>
        </div>

        <div
          className="absolute"
          style={{ left: "34%", bottom: -74, transform: "rotate(1.5deg)" }}
        >
          <PhoneShell label="AIRA home — one daily readiness score" width={244}>
            <HomeScreen />
          </PhoneShell>
        </div>

        {/* The two mechanics the case study is actually about, pulled out of the
            screens so they read at cover scale. */}
        <Lifted style={{ right: "2%", top: "16%" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: K.faint, display: "block" }}>
            READINESS
          </span>
          <span style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
            92
          </span>
        </Lifted>

        <Lifted style={{ right: "12%", top: "56%", display: "flex", alignItems: "center", gap: 9 }}>
          <i style={{ width: 8, height: 8, borderRadius: 999, background: A.coralPhase, display: "block" }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Autumn</span>
          <span style={{ fontSize: 13, color: K.muted }}>· luteal, day 18</span>
        </Lifted>
      </div>
    </div>
  );
}
