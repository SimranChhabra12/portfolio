import Image from "next/image";
import PhoneMockup from "./PhoneMockup";
import { T } from "./tokens";

export interface FeatureImage {
  src: string;
  alt: string;
  pixelWidth: number;
  pixelHeight: number;
  label?: string;
}

// The flagship visual for a section: shown large (one per row), paired with
// a short Playfair headline + one line of Inter caption above it — never a
// small thumbnail dropped into a paragraph. `images` holds 2 entries for a
// side-by-side comparison (e.g. a toggle), otherwise a single large visual.
export default function FeatureVisual({
  kind,
  images,
  headline,
  caption,
  phoneWidth = 340,
  pairWidth = 250,
  plainMaxWidth = 720,
}: {
  kind: "phone" | "plain";
  images: FeatureImage[];
  headline?: string;
  caption?: string;
  phoneWidth?: number;
  pairWidth?: number;
  plainMaxWidth?: number;
}) {
  const isPair = images.length > 1;

  return (
    <div className="w-full flex flex-col gap-6 items-start">
      {(headline || caption) && (
        <div className="flex flex-col gap-1.5">
          {headline && (
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: T.type.sub,
                color: T.ink,
                lineHeight: 1.3,
              }}
            >
              {headline}
            </h4>
          )}
          {caption && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: T.inkMuted,
                lineHeight: 1.5,
                maxWidth: "60ch",
              }}
            >
              {caption}
            </p>
          )}
        </div>
      )}

      {kind === "phone" ? (
        <div className="flex flex-wrap gap-8 items-start w-full">
          {images.map((img, i) => (
            <PhoneMockup
              key={i}
              src={img.src}
              alt={img.alt}
              caption={img.label}
              width={isPair ? pairWidth : phoneWidth}
              pixelWidth={img.pixelWidth}
              pixelHeight={img.pixelHeight}
            />
          ))}
        </div>
      ) : (
        <div className="w-full" style={{ maxWidth: plainMaxWidth }}>
          <div
            style={{
              borderRadius: T.radius.darkBlock,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              border: `1px solid ${T.inkFaint}`,
            }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={images[0].pixelWidth}
              height={images[0].pixelHeight}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes={`(max-width: 768px) 100vw, ${plainMaxWidth}px`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
