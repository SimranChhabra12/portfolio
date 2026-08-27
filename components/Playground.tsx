import CoverPlaceholder from "@/components/CoverPlaceholder";

const cards = [
  { title: "Gesture Sketch", image: "/covers/gesture-sketch.jpg" },
  { title: "VR", image: "/covers/vr.jpg" },
  { title: "Styling + Art Direction", image: "/covers/styling.jpg" },
];

const tags = ["RTX", "Fangirl", "Poetry (Photos)", "Events"];

export default function Playground() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-14 lg:gap-y-20 mb-16">
        {cards.map((card) => (
          <div key={card.title} className="text-left">
            <div className="relative aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface mb-10">
              <CoverPlaceholder
                src={card.image}
                alt={`${card.title} placeholder cover`}
                initial={card.title[0]}
                label="Coming soon"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <h3 className="t-heading text-ink !max-w-none">{card.title}</h3>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="t-caption text-ink border border-mauve rounded-full px-4 py-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
