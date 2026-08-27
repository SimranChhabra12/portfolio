"use client";

import Image from "next/image";

interface Screen {
  src: string;
  caption?: string;
}

interface ScreenStripProps {
  screens: Screen[];
  color: string;
}

export default function ScreenStrip({ screens, color }: ScreenStripProps) {
  return (
    <div className="overflow-x-auto -mx-8 lg:-mx-0">
      <div className="flex gap-4 px-8 lg:px-0 pb-4" style={{ width: "max-content" }}>
        {screens.map((screen, i) => (
          <div key={i} className="flex flex-col gap-2 shrink-0">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ width: 200, backgroundColor: `${color}15` }}
            >
              <Image
                src={screen.src}
                alt={screen.caption ?? `Screen ${i + 1}`}
                width={402}
                height={874}
                style={{ width: 200, height: "auto", display: "block" }}
              />
            </div>
            {screen.caption && (
              <p className="text-ink-muted text-xs text-left uppercase tracking-widest">
                {screen.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
