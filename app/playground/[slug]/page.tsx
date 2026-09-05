import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import PlaygroundCarousel from "@/components/interactive/PlaygroundCarousel";
import P5Sketch from "@/components/interactive/P5Sketch";
import playgroundEntries, { getPlaygroundEntry } from "@/data/playgroundEntries";

// Every entry gets a page. The `full` / `light` split is still what decides how much
// body copy a page carries, but it no longer decides whether a page exists — a `light`
// entry used to open in a small modal instead, which is what made the detail views
// inconsistent in size.
export async function generateStaticParams() {
  return playgroundEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPlaygroundEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Simran Chhabra`,
    description: entry.teaser,
  };
}

export default async function PlaygroundEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPlaygroundEntry(slug);
  if (!entry) notFound();

  // `pageImages` is the page-specific set where one exists; otherwise the entry's own
  // images are the gallery. Either way the carousel frames them identically.
  const gallery = entry.pageImages?.length ? entry.pageImages : entry.images;

  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <section className="px-[var(--page-gutter,32px)] pt-40">
        <div className="max-w-[var(--page-max,1280px)] mx-auto">
          <Link
            href="/playground"
            className="t-caption text-mauve hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Playground
          </Link>

          <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-6">{entry.tags}</p>
          <h1 className="t-display text-ink !max-w-none mt-2">{entry.title}</h1>
          <p className="t-sub text-ink/75 !max-w-none mt-3">{entry.oneLiner}</p>
          <p className="t-body text-ink !max-w-[var(--col-text,640px)] mt-6">{entry.teaser}</p>

          {entry.sketch && entry.cover && (
            <div className="mt-12">
              <P5Sketch
                sketch={entry.sketch}
                poster={entry.cover}
                caption="Running live in the browser."
              />
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-12">
              <PlaygroundCarousel images={gallery} label={`${entry.title} gallery`} />
            </div>
          )}

          {entry.videos && entry.videos.length > 0 && (
            <ul className="list-none p-0 m-0 mt-12 flex flex-col gap-8 max-w-[var(--col-media,1000px)]">
              {entry.videos.map((v, i) => (
                <li key={i} className="overflow-hidden rounded-[var(--radius-card)] bg-dark-bg">
                  <video
                    src={v.src}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={v.alt}
                    className="block w-full h-auto"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <footer className="bg-dark-bg border-t border-white/5 py-8 px-[var(--page-gutter,32px)] mt-24">
        <div className="max-w-[var(--page-max,1280px)] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/playground"
            className="t-caption text-mauve hover:text-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Playground
          </Link>
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
        </div>
      </footer>
    </main>
  );
}
