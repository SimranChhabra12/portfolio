import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Reveal from "@/components/ui/Reveal";
import caseStudies from "@/data/caseStudies";

// Cover-video controller (task D2). This is an inline `next/script` rather than a
// client component on purpose: making WorkChapters `"use client"` would drag the
// whole of `data/caseStudies` — every section, every paragraph — into the client
// bundle just to animate four covers. This keeps the component server-rendered
// and costs well under a kilobyte.
//
// It also has to exist at all. The obvious markup — `<video autoplay preload="none">`
// — does NOT lazy-load: measured on this page, `autoplay` overrides `preload`, and
// all four videos fetched and played while sitting 3600px below the fold. So the
// src is held in `data-src` and only promoted to `src` when the card is close to
// the viewport, and playback pauses again on the way out.
//
// Reduced motion returns early, so those users never fetch a byte of video and keep
// the still. `.cover-video` is also display:none'd in globals.css, which covers the
// no-JS case and stops a stray frame ever painting.
const COVER_VIDEO_SCRIPT = `
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var v = entry.target;
      if (entry.isIntersecting) {
        if (!v.getAttribute('src')) v.setAttribute('src', v.dataset.src);
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { rootMargin: '300px 0px' });
  document.querySelectorAll('video.cover-video').forEach(function (v) {
    io.observe(v);
  });
})();
`;

// Homepage display order: Whspr + AIRA, then Resy, then GestureSketch.
// (Independent of the canonical caseStudies order, which drives "next project" on the case study pages.)
// Slugs that aren't in caseStudies — a hidden project, say — simply drop out below.
const HOMEPAGE_ORDER = ["whspr", "aira-pcos", "resy", "gesture-sketch"];
const orderedForHomepage = HOMEPAGE_ORDER.map((slug) =>
  caseStudies.find((p) => p.slug === slug)
).filter((p): p is (typeof caseStudies)[number] => Boolean(p));

// The card visual is a 5:3 landscape slot, so it takes the composed cover scene from
// `/covers/*` — never `project.realCover`, which is a raw portrait phone screenshot.
// A portrait asset in a landscape slot letterboxes (DESIGN_DOC §5); `object-cover` on
// a composed 5:3 source is the only honest fit here.
//
// Two-up tiled grid, matching the reference layout: each project is a self-contained
// card — image tile, then a caption line under it — with two cards per row and a single
// column below `md`. `items-start` matters: without it the grid stretches every card in
// a row to the tallest one, and a two-line caption would silently pad the card beside it.
export default function WorkChapters() {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16 items-start">
      {orderedForHomepage.map((project, i) => (
        // Stagger by column, not by index, so the two cards in a row reveal together
        // rather than the right one always trailing the left one into view.
        <Reveal key={project.slug} delay={(i % 2) * 60}>
          <Link
            href={`/work/${project.slug}`}
            className="group block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {/* 1 — composed scene, 5:3, media column.
                The still is always rendered as the base layer; `coverVideo`, when a
                project has one, stacks on top of it. So the still is simultaneously
                the poster, the loading state and the reduced-motion fallback, and the
                slot is never blank — which is also why the <video> carries no `poster`
                attribute: it would re-fetch the same artwork unoptimised, when the
                `next/image` copy underneath is already there and responsive. */}
            <div className="relative w-full aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface">
              <Image
                src={project.coverImage}
                alt={`Composed product screens from ${project.title}`}
                fill
                className="object-cover"
                /* Half-width slot now, not the 1000px media column — two cards share
                   the shell, so each is ~50vw on desktop and full-bleed once stacked. */
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {project.coverVideo && (
                <video
                  className="cover-video absolute inset-0 h-full w-full object-cover"
                  /* Deliberately `data-src`, not `src` — see COVER_VIDEO_SCRIPT.
                     No `autoPlay` either: the script starts it on intersection. */
                  data-src={project.coverVideo}
                  loop
                  muted
                  playsInline
                  preload="none"
                  /* Decorative: the still underneath already carries the alt text,
                     and the video adds no information a screen reader needs. */
                  aria-hidden
                  tabIndex={-1}
                />
              )}
            </div>

            {/* Caption block under the tile. The reference puts title left and role right
                on ONE line, which works there because its titles are short ("Dandi: A
                Bio-Smart Wearable for PCOS"). Ours carry the full problem statement (task
                D1), so sharing that line cost the title ~280px and ran Resy to four lines
                in a 588px column. Title takes the full width; the role sits under it. */}
            <div className="mt-4 flex flex-col gap-y-2">
              {/* Title: project name AND the problem it solves, one line, one size
                  (task D1). `.t-sub`, not `.t-section` — the card is now half the width
                  it was, and 36px over a ~590px column ran every one of these to three
                  lines. The em dash is glued to the name with a non-breaking space so it
                  can never wrap onto a line of its own, and `text-wrap: pretty` keeps the
                  last line off a single-word orphan. */}
              <h3 className="t-sub text-ink !max-w-none [text-wrap:pretty] transition-colors [@media(hover:hover)]:group-hover:text-accent">
                {`${project.title} — ${project.homeOneLiner}`}
              </h3>

              {/* Role/discipline. Was `text-mauve`, which measures 2.27:1 on cream and
                  fails AA for text. Mauve stays the marginalia colour per DESIGN_DOC §3;
                  this is meaningful text, so it takes ink at 70% — 5.00:1, AA pass.
                  Kept whole rather than truncated: "Student concept" is the attribution
                  that stops the Resy card reading as a shipped feature. */}
              {project.homeTags && (
                <p className="t-caption uppercase tracking-[0.08em] text-ink/70">
                  {project.homeTags.join(" · ")}
                </p>
              )}
            </div>
          </Link>
        </Reveal>
      ))}

      {/* Rendered once, after the cards, so the videos it observes already exist.
          Only mounted when at least one project actually has a video. */}
      {orderedForHomepage.some((p) => p.coverVideo) && (
        <Script
          id="cover-video-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: COVER_VIDEO_SCRIPT }}
        />
      )}
    </div>
  );
}
