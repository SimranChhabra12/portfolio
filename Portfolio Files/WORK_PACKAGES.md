# Work Packages — portfolio revamp

Sharded from `DESIGN_DOC.md`. Each brief is self-contained: an agent should be able to execute from it
plus the design doc, with no other context.

**Every package must read `Portfolio Files/DESIGN_DOC.md` first.** It is the authority.
`DESIGN_RULES.md` is superseded — ignore it.

Base branch: `redesign` (cut from `main`, commit `a67286b`). Nothing merges to `main` until the whole
revamp is better than what's live.

---

## Dependency order

```
WP0 (tokens) ──┬── WP1 (cover scenes)      [blocked on 2x asset exports]
   BLOCKING    ├── WP2 (homepage)
   lands alone ├── WP3 (playground page)
               └── WP4 (case study template)
                        │
                   WP2 done ──┬── WP5 (motion)
                              └── WP6 (copy)   [needs Simran's input]
```

**WP0 lands directly on `redesign`, alone.** Every other package edits files that depend on its tokens;
running anything in parallel with it will collide.

WP1–WP4 then run in parallel, each in its own git worktree off `redesign`, merged back as they land.

---

## WP0 · Design tokens — BLOCKING

**Files:** `app/globals.css`

Replace the current token block and type scale with §2, §3, §4 of the design doc.

- Six type steps as CSS custom properties + matching `.t-*` utility classes. Sizes, weights,
  line-heights and tracking exactly as tabled. **Tracking is positive on display serif** — this reverses
  the current `-0.02em`.
- Layout tokens: `--page-max`, `--page-gutter`, `--col-media`, `--col-text`, `--section-gap`,
  `--radius-card: 4px` (down from 24px).
- Section rhythm via the halved-gap pattern in §4, replacing uniform `py-16`.
- Keep the existing color tokens — they don't change. Remove nothing else yet; later packages will
  clean up call sites.

**Done when:** the dev server compiles, and measuring at 1440 shows the six steps landing within ~10% of
the doc's table. Expect the page to look *worse* mid-flight — call sites still use old classes. That's
fine; don't fix them here.

---

## WP1 · Composed cover scenes

**Files:** new generator + `public/covers/*`

⚠️ **Blocked** on higher-res source screens. Current exports are 1× — Whspr 402×874 (27 files in
`public/whspr/`), AIRA 440×956 (21 in `public/AIRAScreens/`), and there are **no Resy screens in
`public/` at all**. Composed scenes render at 2×, so these need 2–3× re-exports from Figma. Resy screens
can be captured at 2× from the live prototype at
`/Users/simranchhabra/Organized/03_Portfolio_Reference/Resy/Resy_Celebrations_Prototype`.

Build a generator that composes each product's work-row visual per §5:

- 2–3 phone screens arranged on a ground in that product's palette (§3)
- Output **5:3, rendered at 2× — 2000×1200 minimum**
- **Flat: radius 0, no drop shadows, no device chrome.** Presence comes from scale, not framing.
- Replace `public/covers/{whspr,aira,resy}.jpg` (currently 1000×750 at 16KB)

Prefer a repeatable script over hand-placed one-offs — these will be restyled.

**Done when:** three covers exist at ≥2000×1200, and no cover renders above its intrinsic size.

---

## WP2 · Homepage restructure

**Files:** `app/page.tsx`, `components/WorkGrid.tsx`, `components/HeroPhoto.tsx`

Depends on WP0.

1. **Hero** — add a real `<h1>` at `--t-display`. There is currently **no `<h1>` on the page**; the hero
   line is a `<p>`. Use `[HERO — TBD]` as the copy; WP6 writes the real line. Do not invent it.
2. **Ground** — remove the dark work section (`bg-dark-bg`). Cream throughout; dark stays in the footer
   only (§3).
3. **Work rows** — replace the 2-up grid with stacked full-width rows, one project each, per the §6
   anatomy: composed scene (5:3, `--col-media`) → role eyebrow → title at `--t-project` → one-line
   takeaway at `--t-sub` constrained to `--col-text` → plum link with `↗`. Whole row is one link target.
   Hover gated behind `@media (hover: hover)`.
4. **Playground** — cut to a compact teaser: heading, a short tile row, link to `/playground`. Target
   **≤25% of homepage height** (currently 59%).
5. Delete the `object-contain p-8` card treatment entirely — that's the 20%-fill bug.

Until WP1 lands, point rows at the existing covers. They'll be soft; that's expected.

**Done when:** exactly one `<h1>`; no landscape slot holds a raw portrait image; section:project type
ratio ≥ 1.35×; playground ≤25% of page height.

---

## WP3 · Playground page

**Files:** `app/playground/`, `public/playground/`

Independent of WP0's visuals but should use its tokens.

1. Full collection moves to `/playground` (homepage keeps only the teaser from WP2).
2. **Fix five broken images.** `public/playground/Styling Assistant - Verve/` is an **empty folder** —
   either source the images or remove the entry. Others report `naturalWidth === 0`.
3. **Compress `public/playground/Niluk/`** — ~107MB of raw camera originals, individual files up to
   9.8MB. Resize to a sane web max (~2000px long edge) and re-encode.
4. Tiles use native aspects with `cover` (§5) — no letterboxing.
5. Meaningful `alt` on everything.

**Done when:** zero images with `naturalWidth === 0`; `public/playground/` well under 10MB; page renders
clean at all three widths.

---

## WP4 · Case study template

**Files:** `components/CaseStudyBlocks.tsx`, `app/work/[slug]/page.tsx`, `components/ScreenStrip.tsx`

Depends on WP0.

Adopt Jackie's proportions (§4) — the single change that makes case studies feel designed:

- Feature visuals at `--col-media` (1000px)
- Prose at `--col-text` (640px), same left edge
- Supporting screens in tidy 3-up rows inside the media column, 4:5 portrait slots — phone screens are
  fine as portrait *here*, since the slot is portrait too
- Current images sit in 576px boxes; that's what makes visuals feel small

**Done when:** media column measures ~1.5–1.8× the text column; no image mismatches >15%.

---

## WP5 · Motion

**Files:** `components/Reveal.tsx`, `components/HeroPhoto.tsx`, `app/globals.css`

After WP0 + WP2.

1. **Upgrade the reveal** (§7). Visuals wipe: `clip-path: inset(100% 0 0)` → `inset(0)`,
   `1.2s cubic-bezier(.4,0,.2,1)`. Text rises: opacity + `translateY(30px)`,
   `1s cubic-bezier(.4,0,.2,1)`, staggered ~200ms behind its visual. Current is a flat 0.6s fade.
   The existing IntersectionObserver in `Reveal.tsx` works — keep it, change the CSS.
2. **Re-crop hero photos to landscape.** `public/hero/hero-2.jpg` is 1440×1595 portrait losing 37% to an
   uncontrolled center crop; `hero-3` and `hero-4` are 4284×5712 portrait. Crop deliberately.
3. **Reduced motion:** carousel shows one static photo with *no interval at all*; reveals resolve
   instantly. Verify by emulating the media query, not by reading the CSS.

**Note for whoever verifies:** a blank screenshot mid-scroll is usually the reveal in flight, not a bug.
Wait for transitions to finish before capturing.

**Done when:** reveals complete and are visible; reduced-motion short-circuits both; no layout shift.

---

## WP6 · Copy

**Files:** `app/page.tsx`, footer component

Needs Simran's input — **do not invent this copy.** Use the `simran-voice` skill.

1. **Hero thesis.** Replace `[HERO — TBD]` with a real sentence saying what she does and why it's
   different — the way *"I'm Beverly, a designer built on engineering"* does. The lead is designing for
   people and needs existing systems overlook or dismiss. **Not** a three-slot identity line: the current
   *"Product Designer / Creative Wildflower / Endlessly Curious"* is Honey's construction with one word
   swapped.
2. **Footer.** *"Welcome to the wild side"* is Honey's footer headline **verbatim**. Must be replaced.
3. Project titles: impact first, then problem — e.g. *"Doubling user engagement for a surgery preparation
   app"*.

This is the main guard against the site reading generic, since cream + serif is already a common look.

**Done when:** no `[TBD]` markers remain, and neither borrowed line survives anywhere.

---

## Integration checklist

Before `redesign` → `main`:

- [ ] `git diff main...redesign` reviewed
- [ ] Type: section:project ratio ≥ 1.35×; levels within ~10% of §2 at 1440
- [ ] Images: zero aspect mismatches >15%; zero `naturalWidth === 0`; nothing upscaled past intrinsic
- [ ] Exactly one `<h1>` per page
- [ ] Playground ≤25% of homepage height
- [ ] Reduced motion verified by emulation
- [ ] 1440 / 768 / 390 — no horizontal scroll
- [ ] Side-by-side against the three references
- [ ] No `[TBD]` copy shipped
- [ ] `Portfolio Files/` still gitignored except `DESIGN_DOC.md` — **the repo is public**
