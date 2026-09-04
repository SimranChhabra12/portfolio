import PhoneMockup from "./PhoneMockup";

export interface ScreenItem {
  src: string;
  alt: string;
  caption?: string;
  pixelWidth: number;
  pixelHeight: number;
}

// Supporting images: a tidy, wrapping row — never more than a few per line,
// never an endless horizontal scroll strip.
export default function ScreensRow({
  screens,
  width = 240,
}: {
  screens: ScreenItem[];
  width?: number;
}) {
  return (
    <div className="flex flex-wrap gap-6 items-start w-full">
      {screens.map((s, i) => (
        <PhoneMockup
          key={i}
          src={s.src}
          alt={s.alt}
          caption={s.caption}
          width={width}
          pixelWidth={s.pixelWidth}
          pixelHeight={s.pixelHeight}
        />
      ))}
    </div>
  );
}
