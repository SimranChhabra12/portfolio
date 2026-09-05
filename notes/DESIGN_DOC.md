# Portfolio Design Doc

**Status: authoritative.** This supersedes `DESIGN_RULES.md`. Where they disagree, this wins.

Every value here was measured at a 1440px viewport from one of three reference sites — bevyip.com,
jackienam.com/dandi, honeymehta.design — or from the live site. Measurements are recorded in
`site-teardowns.md`. Don't nudge these by feel; if something looks wrong, re-measure and update this file.

Written to be executed by someone with no other context.

---

## 0. What we're fixing

The current site isn't failing on taste. It fails on four measurable things:

1. **Portrait screenshots letterboxed into landscape slots.** A 402×977 phone screen inside a 576×346
   `object-contain` box fills 20% of the card. Roughly 80% of each work card is empty space.
2. **No type hierarchy.** Section titles and project titles are both Playfair 500 at 42px — a 1.0× ratio.
   Beverly runs 3.1×, Honey 1.4×. Blurred, the page is even gray mush.
3. **Placeholder assets.** Every cover is 1000×750 at 16KB. Five playground images fail to load.
4. **Proportion.** Playground occupies 59% of homepage height while being explicitly secondary content.

Everything below exists to make those four things impossible to reintroduce.

---

## 1. Principles

- **Calm page, vivid product.** The page itself is quiet cream and ink. All color and life comes from the
  product visuals sitting in their own blocks. A dark section competes with vivid visuals — don't add one.
- **Editorial, not journal.** Curate ruthlessly. Keep decisions and turns; cut documentation to a line.
  The test for any element: does this prove I think well?
- **Restraint in the system, personality at the moments.** A disciplined base, with personality
  concentrated in a few deliberate places — voice, one scroll interaction — not sprayed everywhere.
- **Two-layer reading.** Scannable headlines + visuals + one-line takeaways on top; prose underneath for
  whoever slows down. A recruiter gets the whole story in ~30 seconds.
- **Confident, not timid.** Big readable headlines, left-aligned, using the page. Generous whitespace.

---

## 2. Type

Two families. Headlines **Playfair Display**, body/UI **Inter**. Hierarchy comes from size and weight —
never from adding a third font.

Scale calibrated to honeymehta.design at 1440px (measured: 85.1 / 50.6 / 36.7 / 19.5 / 15.7).

| token | px | family | weight | line-height | tracking | use |
|---|---|---|---|---|---|---|
| `--t-display` | 84 | Playfair | 600 | 1.18 | **+2%** | hero `<h1>`, once per page |
| `--t-page` | 50 | Playfair | 500 | 1.29 | **+2%** | page + section headings |
| `--t-project` | 36 | Playfair | 500 | 1.33 | **+2%** | project titles in work rows |
| `--t-sub` | 20 | Inter | 400 | 1.40 | 0 | subheads, lede |
| `--t-body` | 16 | Inter | 400 | 1.50 | 0 | body — never smaller for paragraphs |
| `--t-caption` | 13 | Inter | 400 | 1.50 | +8% if caps | labels, meta, tags |

**Tracking is positive on display serif.** This reverses the old rule (`DESIGN_RULES` §2 said −2%). Honey
measures +2% at every display level and it lets Playfair breathe. Beverly runs negative (−3%) — the two
references genuinely disagree, and we're following Honey, which is the site the scale is calibrated to.

**Line-heights are looser than the old rule** (which said 1.15–1.2 for headings). Use the values above.

### The ratio rule — non-negotiable

**Section heading : project title must be at least 1.35×.** Currently it's 1.0×, which is the entire
reason the page reads flat. At the values above it's 50 ÷ 36 = 1.39×. If a future change collapses these
toward each other, the hierarchy is broken regardless of what else is right.

### Other type rules

- Body max-width **65ch**. Never wider.
- Body left-aligned. Never justified, never centered for paragraphs.
- Nothing below 13px anywhere.
- Mobile: display steps down via `clamp()`, body never below 16px.

---

## 3. Color

Warm neutrals only. Never mix warm and cool grays. **Never pure black or pure white** — both read cold
against a warm base.

```
--cream:        #FAF8F5   /* page background — the ground for ~everything */
--surface:      #F0ECE6   /* cards, alternate blocks */
--ink:          #3A2A38   /* body text and headings (warm aubergine) */
--accent:       #7A3F5D   /* plum — links, hover, active states ONLY (~10%) */
--mauve:        #C99BA9   /* subtle borders, marginalia, hover tints */
--blush:        #E7C9C6   /* light background washes */
--dark-bg:      #2A1F28   /* footer only */
--dark-surface: #3A2A38   /* footer cards */
```

**Ground rule: cream throughout, dark footer only.** The old dark work section is removed. Product color
now lives inside the composed visuals, and a dark section would fight them.

Accent is wayfinding, not decoration — it marks where the eye should go. Keep it near 10% of surface.
Mauve and blush are too light to carry cream text on a button or read as a link on cream; never use them
for either. On the dark footer, muted text is cream at lower opacity — never mauve, never pure white.

Check contrast both directions (WCAG AA, 4.5:1 body).

### Product palettes — inside visuals only

Never on the page itself. These keep each product looking like itself while the pages stay one family.

- **Whspr** — midnight `#07080A`, surfaces `#1A1A24` / `#252533`, signal amber `#FF8830`, amber dim
  `#CC6F00`, text `#F4F4F8`, dusk `#9292A0` / `#6B6B7E`
- **AIRA** — bg `#0A0A0C` / `#101012`, cards `#252528`, coral `#E8845C`; phase colors purple `#4A3F6B`,
  blue `#6B93C4`, green `#4CA67E`, luteal coral `#EFA07A`
- **Resy** — cream `#FAF7F2`, berry `#8C2F39` (lead), warm stone neutrals, ink `#2A2320`

---

## 4. Layout

```
--page-max:     1280px    /* content shell */
--page-gutter:  32px      /* Jackie measures 32; Beverly 24. 32 at this max-width */
--col-media:    1000px    /* wide visuals */
--col-text:     640px     /* prose — lands near 65ch at 16px */
--section-gap:  clamp(4rem, 10vh, 6rem)   /* 64–96px */
--radius-card:  4px
```

### Media vs text columns

The single most important layout decision, taken from Jackie's Dandi: **visuals are wider than prose.**
She runs a 995px media column against a 562px text measure — visuals are 1.8× the width of the words.
That ratio is what makes her visuals feel like they command the page.

- Feature visuals: `--col-media` (1000px), left-aligned
- Prose: `--col-text` (640px), left-aligned to the same left edge
- Supporting screens: tidy 3-up rows inside the media column

**Never set prose to the media width.** A 1000px-wide paragraph is unreadable and is the fastest way to
make a page look untended.

### Section rhythm

Beverly's pattern — one variable, halved on each side, so neighbours share the gap:

```css
:root { --section-gap: clamp(4rem, 10vh, 6rem); }
section { padding: calc(var(--section-gap) / 2) 0; }
@media (max-width: 767px) { :root { --section-gap: clamp(2.75rem, 7vh, 3.5rem); } }
```

This replaces the current uniform `py-16` on every section, which produced no rhythm at all.

### Spacing

8pt grid. Steps: **8, 16, 24, 32, 48, 64, 96**. (4 allowed only inside small components.)

Spacing encodes relationships: heading→its paragraph 8–16px; within a component 16–24px; between
components 32–48px; between sections 64–96px.

**Internal spacing ≤ external spacing**, always. When a component's inner padding exceeds the gap to its
neighbours, elements visually detach from their container and attach to their neighbours — and the layout
reads subtly broken without it being obvious why.

### Alignment

Everything left-aligned — text, cards, section headings. One exception: the hero photo is centered in its
column. Don't extend the exception past the hero photo.

---

## 5. Image system

This section fixes the biggest problem. Read it before touching any image.

### The rule

> **A raw portrait screenshot may never be placed in a landscape slot.**

`object-contain` does not solve this — it letterboxes, which is what produces the 20%-filled cards. If a
portrait asset must appear in a wide slot, it goes into a **composed scene** (below), never directly.

### Slots

| slot | aspect | fit | what may go in it |
|---|---|---|---|
| work row feature | 5:3 | `cover` | composed scene only |
| case study feature | 16:10 | `cover` | composed scene, or a natively-landscape capture |
| supporting row (3-up) | **the file's own aspect** | `cover` | single phone screens — see the correction below |
| playground tile | native | `cover` | photography, cropped to the tile's aspect |
| hero photo | 628:438 | `cover` | **landscape source only** — see below |

**Correction — supporting screens do not get a fixed 4:5 slot.** This section originally specified 4:5,
which contradicted the ">15% aspect mismatch" gate in the verification section. A real phone screenshot
is about 0.41 aspect (402×977); a 4:5 slot is 0.80. Forcing one into the other with `cover` is a **48.6%
mismatch and crops 49% of the screen away** — half the UI, gone. Both rules could not hold at once.

The rule is: **give each supporting screen a slot matching its own aspect ratio**, then lay those slots
out 3-up inside the media column. Uniformity comes from the *grid* — equal column widths, shared left
edges, consistent gaps — not from forcing every image into an identical box. That preserves the tidy
3-up rhythm without destroying the content.

### Composed scenes

Each product's work-row visual is built, not screenshotted: 2–3 phone screens arranged on a ground in that
product's own color. This is Beverly's approach (her thumbs are `888/500` composed frames), and it's the
only way a mobile product fills a wide row honestly.

- Output 5:3, rendered at **2×** (2000×1200 minimum)
- Ground = the product's palette, from §3
- Flat rectangles: **radius 0, no drop shadows, no realistic device chrome.** None of the three references
  use frames or shadows — they get presence from scale. This overrides the "device frames with soft
  shadows" line in `portfolio-vision.md`.

### Source quality

- No image may render larger than its intrinsic size. Current covers are 1000×750 at 16KB displayed at
  576px — visibly soft.
- Screens for composition need **2× or 3× exports**. Current Whspr (402×874) and AIRA (440×956) exports
  are 1× and are not sufficient.
- No raw camera originals in `public/`. `playground/Niluk/` currently holds ~107MB of 9MB JPEGs.
- Every `<img>` needs meaningful `alt`.

### Hero photo

Sources must be **landscape**. `hero-2.jpg` is currently 1440×1595 portrait being center-cropped into a
628×438 frame — 37% of the image is discarded, uncontrolled. Re-crop to landscape before use.

---

## 6. Components

### Nav
Left wordmark, right links (Work / Play / About). Inter, `--t-caption`, uppercase, +8% tracking. Plum on
hover. Not sticky.

### Hero
`<h1>` at `--t-display` — **a thesis sentence**, not a three-slot identity template. It should say what
she does and why it's different, the way Beverly's *"I'm Beverly, a designer built on engineering"* does.
The lead is designing for people and needs that existing systems overlook or dismiss.

Below it: one line of context at `--t-sub`. Hero photo above, centered in column, landscape, carousel
(§7). **There must be exactly one `<h1>` per page** — the current homepage has none.

### Work row
One project per full-width row, stacked. Anatomy top to bottom:

1. Composed scene, 5:3, `--col-media` wide
2. Eyebrow — role tags, `--t-caption`, mauve
3. Title — `--t-project`, ink, Playfair 500. Title states impact then problem, e.g. *"Doubling user
   engagement for a surgery preparation app"*
4. One-line takeaway — `--t-sub`, constrained to `--col-text`
5. Link affordance — plum, with `↗`

Whole row is one link target. Hover: plum on title, arrow nudges `translate(2px, -2px)`. Gate hover
behind `@media (hover: hover)` so it never fires on touch.

### Playground teaser (homepage)
Section heading + a short row of small tiles + a link to `/playground`. Must stay well under the work
section in height — target **≤25% of homepage height** (currently 59%).

### Playground page
The full collection at `/playground`. Grid of tiles, native aspects, minimal chrome.

### Footer
`--dark-bg`. Contact line, socials, résumé link (a plain Drive link is fine — Honey does exactly that).
Muted text is cream at lower opacity.

---

## 7. Motion

Two deliberate interactions. Nothing else — scattered animation reads as AI-generated.

**1. Scroll reveal.** Beverly's technique, which reads far more crafted than a plain fade at the same cost:

- Visuals wipe up: `clip-path: inset(100% 0 0)` → `inset(0)`, `1.2s cubic-bezier(.4, 0, .2, 1)`
- Text rises after: `opacity 0 → 1`, `translateY(30px) → 0`, `1s cubic-bezier(.4, 0, .2, 1)`, staggered
  ~200ms behind its visual

**2. Hero photo carousel.** Auto-advances every 4s, pauses on hover/focus. The site's one signature
moment. Sources must be landscape (§5).

**Hover states** on links and rows: plum, `.2s`. Gated behind `@media (hover: hover)`.

**`prefers-reduced-motion: reduce`** — carousel shows a single static photo with no interval at all;
reveals resolve to their final state with no transition. Not optional.

No layout shift from any of this.

---

## 8. Voice

Use the `simran-voice` skill for any copy that ships. Never generic UX-case-study language, never
placeholder voice.

- Warm, honest, a little literary. Plain, specific, active. Specific beats clever.
- Sentence case. No filler. Each element does one job.
- Buttons say what happens ("View prototype", not "Submit").
- Where real copy isn't written, use an obvious `[TBD]` marker. Never invent it.

**Two lines must be replaced before launch.** The current hero *"Product Designer / Creative Wildflower /
Endlessly Curious"* is Honey's three-slot construction with one word swapped, and the footer *"Welcome to
the wild side"* is her footer headline verbatim. Both need original copy — this is also the main guard
against the site reading generic, since the palette (cream + serif) is already close to a common look.

---

## 9. Quality floor

Meet these without announcing them.

- Exactly one `<h1>` per page; headings nest properly.
- Responsive, mobile-first. Verify at 1440 / 768 / 390.
- Visible keyboard focus states — 2px plum outline.
- `prefers-reduced-motion` respected everywhere.
- Meaningful `alt` on every image. Semantic HTML.
- No layout shift on scroll reveal.
- No image renders above its intrinsic size; no image fails to load.
- Contrast ≥ 4.5:1 for body text, both light and dark contexts.

---

## Verification

Run these before calling any work package done:

- **Type** — measure rendered px at 1440. Section:project ratio ≥ 1.35×. Levels within ~10% of §2.
- **Images** — script every `<img>` comparing box aspect to natural aspect. Zero mismatches >15%, zero
  `naturalWidth === 0`, no source smaller than its rendered box.
- **Structure** — exactly one `<h1>`. Playground ≤25% of homepage height.
- **Motion** — reveals complete (wait for transitions before screenshotting); reduced-motion
  short-circuits.
- **Responsive** — 1440 / 768 / 390, no horizontal scroll.
