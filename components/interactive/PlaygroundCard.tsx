import Image from "next/image";
import Link from "next/link";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import type { PlaygroundEntry } from "@/data/playgroundEntries";

/**
 * The playground card. Deliberately the same five parts, in the same order, as a work
 * row in `components/layout/WorkChapters.tsx` — 5:3 media slot, role eyebrow, one title
 * line, link affordance — so the two halves of the site read as one set.
 *
 * NOTE: this duplicates the WorkChapters treatment rather than sharing a component.
 * Extracting a shared card would mean editing WorkChapters, which is owned elsewhere.
 * If the two ever drift, that is the fix.
 *
 * Every entry gets this card, at this scale, regardless of `kind`.
 */
export default function PlaygroundCard({
  entry,
  preload = false,
  sizes = "(max-width: 1024px) 100vw, 620px",
}: {
  entry: PlaygroundEntry;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/playground/${entry.slug}`}
      className="group block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {/* 1 — media, 5:3. Uniform slot is the point: it is what makes the grid one set. */}
      <div className="relative w-full aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface">
        {entry.cover ? (
          <Image
            src={entry.cover.src}
            alt={entry.cover.alt}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover"
            // Portrait covers name a focal point, so the crop keeps the subject.
            style={entry.coverPosition ? { objectPosition: entry.coverPosition } : undefined}
          />
        ) : (
          <CoverPlaceholder
            src="/images/covers/vr.jpg"
            alt={`${entry.title} — cover image coming soon`}
            initial={entry.title[0]}
            label="Coming soon"
            sizes={sizes}
          />
        )}
      </div>

      <div className="max-w-[var(--col-text,640px)]">
        {/* 2 — eyebrow */}
        <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-6">{entry.tags}</p>

        {/* 3 — title and what it was, one line, one size (matches the work cards) */}
        <h3 className="t-section text-ink !max-w-none mt-2 transition-colors [@media(hover:hover)]:group-hover:text-accent">
          {entry.title} — {entry.oneLiner}
        </h3>

        {/* 4 — link affordance */}
        <span className="t-body text-accent inline-flex items-center gap-2 mt-4">
          View project
          <span
            aria-hidden
            className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-[2px] [@media(hover:hover)]:group-hover:-translate-y-[2px]"
          >
            ↗
          </span>
        </span>
      </div>
    </Link>
  );
}
