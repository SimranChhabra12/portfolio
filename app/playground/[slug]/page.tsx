import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import playgroundEntries, { getPlaygroundEntry } from "@/data/playgroundEntries";

export async function generateStaticParams() {
  return playgroundEntries.filter((e) => e.kind === "full").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPlaygroundEntry(slug);
  if (!entry || entry.kind !== "full") return {};
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
  if (!entry || entry.kind !== "full") notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <section className="px-8 lg:px-16 pt-40 pb-16">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/playground"
            className="t-caption text-mauve hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Playground
          </Link>
          <p className="label text-mauve mt-6 mb-4">{entry.tags}</p>
          <h1 className="t-display text-ink mb-4 !max-w-none">{entry.title}</h1>
          <p className="t-body text-ink/70 !max-w-none mb-4">{entry.teaser}</p>
          <p className="t-caption text-mauve">[Full write-up — TBD]</p>
        </div>
      </section>

      {(entry.pageImages?.length || entry.videos?.length) && (
        <section className="px-8 lg:px-16 pb-24">
          <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-3">
            {entry.pageImages?.map((img, i) => (
              <div
                key={i}
                className="mb-3 overflow-hidden rounded-[var(--radius-card-sm)] bg-surface break-inside-avoid"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
            {entry.videos?.map((v, i) => (
              <div
                key={`video-${i}`}
                className="mb-3 overflow-hidden rounded-[var(--radius-card-sm)] bg-dark-bg break-inside-avoid"
              >
                <video
                  src={v.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={v.alt}
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="bg-dark-bg border-t border-white/5 py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
