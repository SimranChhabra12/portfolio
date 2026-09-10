import Image from "next/image";

// Dream Of's cover band.
//
// The one case study on the site that is real, shipped work for a real brand, so
// the cover is the brand's own campaign photography rather than a constructed
// scene — the device Beverly Yip's Dandi cover and Honey Mehta's CNN banner both
// use. Nothing is drawn here; the argument is that this exists.
//
// The image is 2000x1333 and is cropped by the band rather than letterboxed into
// it, so the band can be short without the photograph being squashed. The scrim
// is there for the nav: white nav type over the tile would otherwise fail
// contrast wherever the image goes light.
export default function HeroCover() {
  return (
    <div
      id="dream-of-cover"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#2C3A2E", height: "clamp(340px, 46vw, 560px)" }}
    >
      <Image
        src="/projects/dream-of/campaign-bath.jpg"
        alt="Dream Of campaign photography — the Fresh Start and Smooth Route jars on the edge of a bath"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 38%" }}
      />
      {/* Top scrim only — the nav sits over this, and the photograph is bright. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: 180,
          background: "linear-gradient(to bottom, rgba(20, 26, 21, 0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
