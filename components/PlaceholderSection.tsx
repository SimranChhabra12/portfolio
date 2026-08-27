import Reveal from "@/components/Reveal";

export default function PlaceholderSection({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section className="px-8 lg:px-16 py-24 border-b border-ink/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="label text-mauve mb-6">{eyebrow}</p>
          <h2 className="t-heading text-ink mb-8">{title}</h2>
          <div className="border border-dashed border-ink/20 rounded-2xl px-8 py-12 max-w-xl">
            <p className="t-body text-mauve !max-w-none">{note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
