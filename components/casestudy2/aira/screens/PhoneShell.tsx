import { SCREEN_W, SCREEN_H, K } from "./kit";

// Same chassis proportions as PhoneMockup (bezel 4.5%, 17% outer radius,
// dynamic island, home indicator) — but it frames live markup instead of a PNG.
//
// Children are authored once at 390x844 device points and CSS-scaled to whatever
// width the page asks for, so a screen never has to be redrawn per size and text
// can't reflow between the hero band and an inline figure.
export default function PhoneShell({
  children,
  label,
  width = 240,
}: {
  children: React.ReactNode;
  /** Accessible name for the screen, e.g. "AIRA home". */
  label: string;
  width?: number;
}) {
  const bezel = Math.round(width * 0.045);
  const outerRadius = Math.round(width * 0.17);
  const innerRadius = Math.max(outerRadius - bezel, 10);
  const notchWidth = Math.round(width * 0.32);
  const notchHeight = Math.round(width * 0.055);
  const chassis = "#161618";

  const inner = width - bezel * 2;
  const scale = inner / SCREEN_W;

  return (
    <div
      role="img"
      aria-label={label}
      className="relative"
      style={{
        width,
        maxWidth: "100%",
        borderRadius: outerRadius,
        padding: bezel,
        backgroundColor: chassis,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Side buttons */}
      <span aria-hidden style={btn(-1.5, width * 0.22, width * 0.05, chassis, "left")} />
      <span aria-hidden style={btn(-1.5, width * 0.3, width * 0.08, chassis, "left")} />
      <span aria-hidden style={btn(-1.5, width * 0.26, width * 0.11, chassis, "right")} />

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: innerRadius,
          width: inner,
          height: Math.round(inner * (SCREEN_H / SCREEN_W)),
          backgroundColor: K.ground,
        }}
      >
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>

        {/* Dynamic-island notch */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: bezel * 0.7,
            left: "50%",
            transform: "translateX(-50%)",
            width: notchWidth,
            height: notchHeight,
            borderRadius: notchHeight / 2,
            backgroundColor: chassis,
          }}
        />
      </div>

      {/* Home indicator */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: bezel * 0.55,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.28,
          height: Math.max(width * 0.012, 2.5),
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.35)",
        }}
      />
    </div>
  );
}

function btn(
  offset: number,
  top: number,
  height: number,
  color: string,
  side: "left" | "right",
): React.CSSProperties {
  return {
    position: "absolute",
    [side]: offset,
    top,
    width: 1.5,
    height,
    borderRadius: 1,
    backgroundColor: color,
  } as React.CSSProperties;
}
