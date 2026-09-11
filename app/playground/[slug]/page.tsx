import { notFound } from "next/navigation";
import Wordmark from "@/components/ui/Wordmark";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import PlaygroundCarousel from "@/components/interactive/PlaygroundCarousel";
import P5Sketch from "@/components/interactive/P5Sketch";
import playgroundEntries, { getPlaygroundEntry } from "@/data/playgroundEntries";

// An entry whose `href` leaves /playground is written up somewhere else on the site; the
// self-referential hrefs most entries carry are not that.
const isWrittenElsewhere = (e: { href?: string }) =>
  Boolean(e.href && !e.href.startsWith("/playground/"));

// Every entry gets a page. The `full` / `light` split is still what decides how much
// body copy a page carries, but it no longer decides whether a page exists — a `light`
// entry used to open in a small modal instead, which is what made the detail views
// inconsistent in size.
export async function generateStaticParams() {
  // Most entries carry an `href` that simply points at their own page here. One points
  // AWAY — GestureSketch is listed in the playground but written up as a case study — and
  // that one gets no page of its own, since it would be a thinner duplicate.
  return playgroundEntries.filter((e) => !isWrittenElsewhere(e)).map((e) => ({ slug: e.slug }));
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
  // Filtering generateStaticParams stops these being built, but a direct request would
  // still render one, so the route refuses them outright.
  if (!entry || isWrittenElsewhere(entry)) notFound();

  // `pageImages` is the page-specific set where one exists; otherwise the entry's own
  // images are the gallery. Either way the carousel frames them identically.
  const gallery = entry.pageImages?.length ? entry.pageImages : entry.images;

  return (
    <main className="min-h-screen bg-cream pt-[66px]">
      <Nav />

      <section className="pt-40">
        <div className="max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)]">
          <Link
            href="/playground"
            className="t-caption text-mauve hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Playground
          </Link>

          <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-6">{entry.tags}</p>
          <h1 className="t-display text-ink !max-w-none mt-2">{entry.title}</h1>
          <p className="t-body text-ink !max-w-[var(--col-text,640px)] mt-6">{entry.teaser}</p>
          {entry.body?.map((para, i) => (
            <p key={i} className="t-body text-ink/85 !max-w-[var(--col-text,640px)] mt-4">
              {para}
            </p>
          ))}

          {entry.sketch && entry.cover && (
            <div className="mt-12">
              <P5Sketch
                sketch={entry.sketch}
                poster={entry.cover}
                caption="Running live in the browser."
              />
            </div>
          )}

          {/* Films lead: they carry the piece better than any single still. */}
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

          {/* Entries made of distinct shoots get one titled carousel per shoot; the rest
              keep a single gallery. */}
          {entry.pageGalleries
            ? entry.pageGalleries.map((g) => (
                <section key={g.title} className="mt-16">
                  <h2 className="t-section text-ink !max-w-[var(--col-text,640px)]">{g.title}</h2>
                  {g.details?.map((d, i) => (
                    <p key={d} className={`t-caption text-ink/70 ${i === 0 ? "mt-3" : "mt-1"}`}>
                      {d}
                    </p>
                  ))}
                  <div className="mt-6">
                    <PlaygroundCarousel images={g.images} label={g.title} />
                  </div>
                </section>
              ))
            : gallery.length > 0 && (
                <div className="mt-12">
                  <PlaygroundCarousel images={gallery} label={`${entry.title} gallery`} />
                </div>
              )}
        </div>
      </section>

      <footer className="bg-dark-bg border-t border-white/5 py-8 mt-24">
        <div className="max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/playground"
            className="t-caption text-mauve hover:text-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Playground
          </Link>
          <Wordmark size="16px" className="text-mauve" />
        </div>
      </footer>
    </main>
  );
}
