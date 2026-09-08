import type { Block } from "@/data/caseStudies";

// DESIGN_DOC §4 — visuals run the media column, prose runs the text column and
// shares its left edge. Fallbacks match the §4 values so this renders correctly
// even on a branch that hasn't picked up the layout tokens yet.
const COL_MEDIA = "var(--col-media, 1000px)";
const COL_TEXT = "var(--col-text, 640px)";
const RADIUS = "var(--radius-card, 4px)";

// Which blocks are words (text column) and which are visuals (media column).
const MEDIA_BLOCKS = new Set(["screens", "prototype"]);

export default function CaseStudyBlocks({
  blocks,
  color,
}: {
  blocks: Block[];
  color: string;
}) {
  return (
    <div className="flex flex-col gap-8 items-start w-full min-w-0">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="w-full min-w-0"
          style={{ maxWidth: MEDIA_BLOCKS.has(block.type) ? COL_MEDIA : COL_TEXT }}
        >
          <CaseStudyBlock block={block} color={color} />
        </div>
      ))}
    </div>
  );
}

function CaseStudyBlock({ block, color }: { block: Block; color: string }) {
  switch (block.type) {
    case "p":
      return <p className="t-body text-ink !max-w-none">{block.text}</p>;

    case "fields":
      return (
        <div className="flex flex-col gap-6">
          {block.items.map((f, i) => (
            <div key={i}>
              <p className="label text-mauve mb-2">{f.label}</p>
              <p className="t-body text-ink !max-w-none">{f.value}</p>
            </div>
          ))}
        </div>
      );

    case "stats":
      return (
        <div
          className="grid grid-cols-2 gap-px bg-ink/10 overflow-hidden"
          style={{ borderRadius: RADIUS }}
        >
          {block.items.map((s, i) => (
            <div key={i} className="bg-surface/60 p-8 flex flex-col gap-2">
              <span className="t-section text-ink">{s.value}</span>
              <span className="label text-mauve">{s.label}</span>
            </div>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="flex flex-col gap-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                style={{ backgroundColor: color }}
              />
              <p className="t-body text-ink !max-w-none">{item}</p>
            </li>
          ))}
        </ul>
      );

    case "decisions":
      return (
        <div className="flex flex-col gap-12">
          {block.items.map((d, i) => (
            <div key={i}>
              <p className="label mb-3" style={{ color }}>
                Decision {i + 1}
              </p>
              <h3 className="t-sub font-serif text-ink mb-3">{d.title}</h3>
              <p className="t-body text-ink !max-w-none">{d.body}</p>
            </div>
          ))}
        </div>
      );

    case "hmw":
      return (
        <div className="bg-ink p-8 lg:p-12" style={{ borderRadius: RADIUS }}>
          <p className="label text-surface/60 mb-4">How Might We</p>
          <p className="t-sub font-serif text-surface italic">{block.text}</p>
        </div>
      );

    case "note":
      return (
        <div
          className="p-6 lg:p-8 border"
          style={{
            borderColor: `${color}40`,
            backgroundColor: `${color}0d`,
            borderRadius: RADIUS,
          }}
        >
          <p className="t-body text-ink !max-w-none">{block.text}</p>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 pl-6" style={{ borderColor: color }}>
          <p className="t-sub font-serif text-ink italic mb-3">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="t-caption text-mauve not-italic">{block.attribution}</cite>
          )}
        </blockquote>
      );

    case "asset":
      return (
        <div
          className="border border-dashed border-ink/20 px-8 py-10 flex items-center text-left"
          style={{ borderRadius: RADIUS }}
        >
          <p className="t-caption text-mauve">Needs asset — {block.label}</p>
        </div>
      );

    case "screens":
      // Tidy 3-up rows inside the media column (§4). Portrait phone screens in
      // portrait slots — each slot takes its aspect from the file itself, so
      // nothing is letterboxed and nothing is cropped. These blocks carry no
      // intrinsic dimensions, so a plain <img> (which reads the real ratio) is
      // safer here than next/image with guessed width/height.
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-start">
          {block.images.map((screen, i) => (
            <figure key={i} className="flex flex-col gap-2 min-w-0">
              <div
                className="overflow-hidden"
                style={{ backgroundColor: `${color}15`, borderRadius: RADIUS }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.src}
                  alt={screen.caption ?? `Product screen ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {screen.caption && (
                <figcaption className="t-caption text-mauve">{screen.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case "prototype":
      return (
        <div>
          <div
            className="overflow-hidden border border-ink/10"
            style={{ borderRadius: RADIUS }}
          >
            <iframe
              src={block.url}
              title={block.label ?? "Live prototype"}
              className="w-full"
              style={{ height: "70vh", border: "none" }}
              loading="lazy"
            />
          </div>
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 label text-mauve hover:text-accent transition-colors mt-4"
          >
            Open full prototype ↗
          </a>
        </div>
      );

    default:
      return null;
  }
}
