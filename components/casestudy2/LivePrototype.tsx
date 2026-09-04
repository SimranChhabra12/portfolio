"use client";

import { T } from "./tokens";

// Embeds the actual interactive prototype in an iframe, framed like the
// site's other phone mockups so it reads as one more screen on the page —
// not a bare embed dropped into the layout.
export default function LivePrototype({
  src,
  title,
  height = 700,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div
        style={{
          width: "min(360px, 100%)",
          borderRadius: 32,
          padding: 10,
          backgroundColor: "#161618",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 22, backgroundColor: "#000" }}
        >
          <iframe
            src={src}
            title={title}
            loading="lazy"
            style={{ width: "100%", height, border: "none", display: "block" }}
          />
        </div>
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          color: T.inkMuted,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        Open the live prototype in a new tab ↗
      </a>
    </div>
  );
}
