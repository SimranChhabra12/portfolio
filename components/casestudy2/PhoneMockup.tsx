import Image from "next/image";
import { T } from "./tokens";

// Consistent iPhone-style device frame: chassis, dynamic-island notch, side
// buttons, home indicator. Same proportions at every width so every screen
// on the page reads as the same "device," never a bare screenshot.
export default function PhoneMockup({
  src,
  alt,
  caption,
  width = 240,
  pixelWidth,
  pixelHeight,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  pixelWidth: number;
  pixelHeight: number;
}) {
  const bezel = Math.round(width * 0.045);
  const outerRadius = Math.round(width * 0.17);
  const innerRadius = Math.max(outerRadius - bezel, 10);
  const notchWidth = Math.round(width * 0.32);
  const notchHeight = Math.round(width * 0.055);
  const chassis = "#161618";

  return (
    <figure className="flex flex-col gap-3" style={{ width, maxWidth: "100%" }}>
      <div
        className="relative"
        style={{
          borderRadius: outerRadius,
          padding: bezel,
          backgroundColor: chassis,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Side buttons */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: -1.5,
            top: width * 0.22,
            width: 1.5,
            height: width * 0.05,
            borderRadius: 1,
            backgroundColor: chassis,
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: -1.5,
            top: width * 0.3,
            width: 1.5,
            height: width * 0.08,
            borderRadius: 1,
            backgroundColor: chassis,
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: -1.5,
            top: width * 0.26,
            width: 1.5,
            height: width * 0.11,
            borderRadius: 1,
            backgroundColor: chassis,
          }}
        />

        <div className="relative overflow-hidden" style={{ borderRadius: innerRadius }}>
          <Image
            src={src}
            alt={alt}
            width={pixelWidth}
            height={pixelHeight}
            style={{ width: "100%", height: "auto", display: "block" }}
            sizes={`${width}px`}
          />
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
      {caption && (
        <figcaption
          style={{
            fontSize: T.type.caption,
            color: T.inkMuted,
            fontFamily: "var(--font-body)",
            lineHeight: 1.5,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
