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

// The row visual is a 5:3 landscape slot, so it takes the composed cover scene from
// `/covers/*` — never `project.realCover`, which is a raw portrait phone screenshot.
// A portrait asset in a landscape slot letterboxes (DESIGN_DOC §5); `object-cover` on
// a composed 5:3 source is the only honest fit here.
export default function WorkChapters() {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {orderedForHomepage.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
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
            <div className="relative w-full max-w-[var(--col-media,1000px)] aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface">
              <Image
                src={project.coverImage}
                alt={`Composed product screens from ${project.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
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

            <div className="max-w-[var(--col-text,640px)]">
              {/* 2 — role eyebrow. Was `text-mauve`, which measures 2.27:1 on cream
                  and fails AA for text. Mauve stays the marginalia/border colour per
                  DESIGN_DOC §3; this eyebrow is meaningful text, so it takes ink at
                  70% — 5.00:1, AA pass. */}
              {project.homeTags && (
                <p className="t-caption uppercase tracking-[0.08em] text-ink/70 mt-6">
                  {project.homeTags.join(" · ")}
                </p>
              )}

              {/* 3 — title: project name AND the problem it solves, one line, one size
                  (task D1). `.t-section`, not `.t-heading`: the section heading above
                  these rows keeps `.t-heading`, and the gap between the two is the
                  hierarchy. The em dash is glued to the title with a non-breaking
                  space so it can never wrap onto a line of its own at 390px, and
                  `text-wrap: pretty` keeps the last line off a single-word orphan. */}
              <h3 className="t-section text-ink !max-w-none mt-2 [text-wrap:pretty] transition-colors [@media(hover:hover)]:group-hover:text-accent">
                {`${project.title} — ${project.homeOneLiner}`}
              </h3>

              {/* 4 — link affordance */}
              <span className="t-body text-accent inline-flex items-center gap-2 mt-4">
                View case study
                <span
                  aria-hidden
                  className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-[2px] [@media(hover:hover)]:group-hover:-translate-y-[2px]"
                >
                  ↗
                </span>
              </span>
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
