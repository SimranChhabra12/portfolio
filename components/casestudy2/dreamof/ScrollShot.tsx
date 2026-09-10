import Image from "next/image";
import { T } from "../tokens";

// A full-length page capture shown the way a page is actually used: in a
// fixed-height window you scroll inside. The Dream Of screens are 5,000 to
// 11,000px tall, so shrinking one to fit the column would turn it into an
// unreadable strip, and cropping it would throw most of the design away.
//
// Flat frame, no device chrome (DESIGN_DOC §5). The image renders at the
// frame's width and its own aspect, so nothing is letterboxed or upscaled.

export interface Shot {
  src: string;
  alt: string;
  pixelWidth: number;
  pixelHeight: number;
}

function Frame({
  shot,
  height,
  label,
}: {
  shot: Shot;
  height: number;
  label?: string;
}) {
  return (
    <figure className="m-0 flex flex-col gap-2 min-w-0 w-full">
      <div
        tabIndex={0}
        aria-label={`${shot.alt}. Scrollable.`}
        className="w-full overflow-y-auto overscroll-contain"
        style={{
          height,
          border: `1px solid ${T.inkFaint}`,
          backgroundColor: "#fff",
          borderRadius: 4,
        }}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.pixelWidth}
          height={shot.pixelHeight}
          sizes="(max-width: 1024px) 100vw, 760px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {label && (
        <figcaption
          style={{
            fontFamily: "var(--font-body)",
            fontSize: T.type.caption,
            color: T.inkMuted,
          }}
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Desktop and mobile of the same page side by side. The mobile frame keeps a
 * phone's width so its type reads at the size it was designed for.
 */
export default function ScrollShot({
  desktop,
  mobile,
  height = 620,
  caption,
}: {
  desktop?: Shot;
  mobile?: Shot;
  height?: number;
  caption?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Side by side from md up; stacked on phones, where a 260px mobile column
          would squeeze the desktop frame to nothing. */}
      <div
        className={`grid gap-4 w-full grid-cols-1 ${
          desktop && mobile ? "md:grid-cols-[minmax(0,1fr)_minmax(0,260px)]" : ""
        }`}
      >
        {desktop && <Frame shot={desktop} height={height} label="Desktop" />}
        {mobile && <Frame shot={mobile} height={height} label="Mobile" />}
      </div>
      {caption && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: T.type.caption,
            color: T.inkMuted,
            lineHeight: 1.6,
            maxWidth: "68ch",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
