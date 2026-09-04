import Image from "next/image";
import { T } from "./tokens";

// Real deck slides (already rendered in Whspr's own dark/amber system) —
// shown at face value with a consistent frame, not re-skinned.
export default function DeckSlide({
  src,
  alt,
  caption,
  maxWidth = 720,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
}) {
  return (
    <figure className="w-full flex flex-col gap-3" style={{ maxWidth }}>
      <div
        style={{
          borderRadius: T.radius.darkBlock,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: `1px solid ${T.inkFaint}`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={960}
          height={540}
          style={{ width: "100%", height: "auto", display: "block" }}
          sizes={`(max-width: 768px) 100vw, ${maxWidth}px`}
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
