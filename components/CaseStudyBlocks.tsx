import Image from "next/image";
import type { Block } from "@/data/caseStudies";

export default function CaseStudyBlocks({
  blocks,
  color,
}: {
  blocks: Block[];
  color: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, i) => (
        <CaseStudyBlock key={i} block={block} color={color} />
      ))}
    </div>
  );
}

function CaseStudyBlock({ block, color }: { block: Block; color: string }) {
  switch (block.type) {
    case "p":
      return <p className="t-body text-ink">{block.text}</p>;

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
        <div className="grid grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden">
          {block.items.map((s, i) => (
            <div key={i} className="bg-surface/60 p-8 flex flex-col gap-2">
              <span className="font-serif text-[39px] text-ink leading-[1.2]">
                {s.value}
              </span>
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
              <h3 className="font-serif text-[20px] lg:text-[25px] text-ink leading-[1.2] mb-3">
                {d.title}
              </h3>
              <p className="t-body text-ink !max-w-none">{d.body}</p>
            </div>
          ))}
        </div>
      );

    case "hmw":
      return (
        <div className="bg-ink rounded-2xl p-8 lg:p-12">
          <p className="label text-white/40 mb-4">How Might We</p>
          <p className="font-serif text-[20px] lg:text-[25px] leading-[1.5] text-surface italic">
            {block.text}
          </p>
        </div>
      );

    case "note":
      return (
        <div
          className="rounded-2xl p-6 lg:p-8 border"
          style={{ borderColor: `${color}40`, backgroundColor: `${color}0d` }}
        >
          <p className="t-body text-ink !max-w-none">{block.text}</p>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 pl-6" style={{ borderColor: color }}>
          <p className="font-serif text-[20px] lg:text-[25px] leading-[1.5] text-ink italic mb-3">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="t-caption text-mauve not-italic">{block.attribution}</cite>
          )}
        </blockquote>
      );

    case "asset":
      return (
        <div className="rounded-2xl border border-dashed border-ink/20 px-8 py-10 flex items-center text-left">
          <p className="t-caption text-mauve !max-w-none">[{block.label}]</p>
        </div>
      );

    case "screens":
      return (
        <div className="overflow-x-auto -mx-8 lg:-mx-0">
          <div className="flex gap-4 px-8 lg:px-0 pb-4" style={{ width: "max-content" }}>
            {block.images.map((screen, i) => (
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
                  <p className="t-caption text-mauve text-left">{screen.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "prototype":
      return (
        <div>
          <div className="rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
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
