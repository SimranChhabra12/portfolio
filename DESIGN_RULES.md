> # ⚠️ SUPERSEDED — do not follow this file
>
> Replaced by **`notes/DESIGN_DOC.md`**, which is now the single authority.
> Kept only for history. Three rules below are known to be wrong and were corrected there:
>
> | rule here | corrected to | why |
> |---|---|---|
> | Type scale 60/42/28 "close to honeymehta.design" | 84/50/36 | Measured at 1440px, Honey runs 85/50.6/36.7 — this was 24–29% smaller |
> | Display tracking −2% | **+2%** | Honey measures +2% at every display level |
> | `--radius-card` 24px | 4px | All three references use 0–4px |
>
> It also missed the failure that mattered most: nothing here prevented portrait screenshots
> from being letterboxed into landscape slots. `DESIGN_DOC.md` §5 covers that.

---

# Design Rules — simranchhabradesign.com

Rules for Claude Code to follow on every change to this site. These are decided; don't
re-litigate them. If something can't fit these rules, flag it rather than adding a one-off value.

The through-line: **restraint in the system, personality at the moments.** A calm, warm,
disciplined base — with personality concentrated in a few deliberate places (voice, one scroll
interaction, later a signature element), not sprayed everywhere.

---

## 1. Color

Warm neutrals only. Never mix warm and cool grays. Never use pure black (#000) or pure white (#fff) —
they read cold and templated against a warm base.

```
--cream:        #FAF8F5   /* page background — ~60% of any screen */
--surface:      #F0ECE6   /* cards, alternate sections — ~30% */
--ink:          #3A2A38   /* all body text and headings (warm aubergine, not black) */
--accent:       #7A3F5D   /* plum — links, buttons, hover, active states ONLY (~10%) */
--mauve:        #C99BA9   /* secondary: subtle borders, marginalia, hover tints */
--blush:        #E7C9C6   /* secondary: light background washes */
--dark-bg:      #2A1F28   /* dark sections — warm aubergine, NEVER #111 */
--dark-surface: #3A2A38   /* dark section cards */
```

Rules:
- Accent is a wayfinding tool, not decoration. It marks what the eye should go to. If everything
  is accented, nothing is. Keep it to ~10% of the surface.
- Accent must be dark enough to carry cream/white text on a button AND be readable as a link on cream.
  The mauve/blush secondaries are too light for those jobs — never use them for links or button fills.
- On dark sections, muted text = cream at lower opacity, never mauve, never pure white.
- Check text/background contrast in both light and dark contexts (WCAG AA: 4.5:1 for body text).

## 2. Typography

Two typefaces, loaded via next/font/google.
- **Playfair Display** — display / headings only (hero, section headings, case study titles).
  Weights 400/500/600 loaded. Section and page headings sit at medium (500); the hero display
  and other stand-alone hero-style statements sit at semibold (600) so they carry real presence
  at large sizes — don't let it default to 400, it reads thin and hesitant at this scale.
- **Inter** — body / UI / labels / captions / tags (the quiet workhorse).

Hierarchy comes from size *and* weight now that Playfair Display can carry both — still never
from adding more fonts.

**Type scale (six sizes only — remove any others):**
```
13px  captions, labels, meta
16px  body (base) — minimum size for any paragraph, never smaller
20px  subheadings
28px  section titles      (medium, 500)
42px  page headings       (medium, 500)
60px  hero / display      (semibold, 600)
```

Sized and weighted to sit close to the reference (honeymehta.design) at a 1440px viewport —
if the scale ever feels small or thin next to it again, check actual rendered px there before
guessing; don't nudge blind.

**Line height** (scales opposite to size — big type needs less):
- Body sizes (13/16/20): 150%
- Heading sizes (28/42/60): 120% (60px display: 115%, tightened further for its scale)

**Letter spacing:**
- 60px display: -2% (large type drifts apart optically; tighten it)
- All-caps labels: +8% (caps are drawn to sit next to lowercase, not each other)
- Everything else: 0

**Text rules:**
- Body text max-width: 65ch. Never wider — past ~75 characters the eye loses the line return.
- Body text left-aligned. Never justified (rivers of gaps), never centered for paragraphs.
- Headings use Playfair Display; all body, UI, and labels use Inter.
- Nothing below 13px anywhere.

## 3. Spacing

Everything on an 8pt grid. All margins, padding, gaps are multiples of 8 (4 allowed only for
fine-tuning inside small components).
```
Allowed steps: 8, 16, 24, 32, 48, 64, 96
```

Spacing encodes relationships (Gestalt proximity) — this is not arbitrary:
- Heading to its own paragraph: 8–16px (they belong together)
- Within a component: 16–24px
- Between components: 32–48px
- Between page sections: 64–96px

**The non-negotiable rule:** internal spacing ≤ external spacing. A component's inner padding must
never exceed the gap between it and its neighbors. When this flips, elements visually detach from
their container and attach to their neighbors, and the whole layout reads subtly broken.

Whitespace is active, not leftover. More space around an element signals more importance. Prefer
generous gaps over visible divider lines; when a divider is needed, make it a whisper (1px, low opacity).

## 4. Layout & hierarchy

- The hero is a thesis, not a template. No big-number-with-small-label unless it's genuinely the
  best answer. Lead with the most characteristic thing about the work.
- Structural devices (eyebrows, numbers, dividers) must encode something true. Only number things
  that are actually a sequence.
- Squint test: blurred, the most important thing should still dominate. If it's an even gray mush,
  the hierarchy isn't working.
- Everything left-aligned — text, cards, section headings. One deliberate exception: the hero
  photo is centered within its column (matching the reference's hero image treatment), while the
  hero headline directly below it stays left-aligned like everything else. Don't extend the
  exception beyond the hero photo itself.
- Section boundaries (light ↔ dark) transition through a soft gradient band
  (`--section-transition`, 128px) instead of a hard color cut.
- Cards (case study covers, Playground tiles) use `--radius-card` (24px) — generous, rounded,
  image-forward. Not the sharp/square corners of earlier drafts.

## 5. Motion

- Two deliberate interactions, not scattered effects:
  1. A simple scroll-reveal (fade/rise) for the case studies, in a chosen order.
  2. The hero photo carousel — auto-flips (3D rotateY, matching the reference) through personal
     photos every 4s, pauses on hover/focus, and shows a single static photo (no interval at all)
     under `prefers-reduced-motion`. This is the site's one signature motion moment.
- Simple hover states on links/cards (plum).
- Nothing fancier for now. Extra animation reads as AI-generated. Signature interactive elements
  (e.g. the Kaiser pixel creature) are a later, deliberate phase — not scattered in now.

## 6. Copy (words are design material)

- Write from the user's side of the screen. Plain, specific, active voice. Specific beats clever.
- Sentence case. No filler. Each element does one job.
- Buttons say what happens ("View prototype", not "Submit"). An action keeps its name through the flow.
- This site's voice is Simran's own — warm, honest, a little literary. Never fill hero/about/case-study
  copy with generic placeholder voice. Where real copy isn't written yet, use an obvious
  `[TAGLINE — TBD]` marker rather than inventing it.

## 7. Quality floor (meet without announcing)

- Responsive, mobile-first (Android-common widths matter for this audience).
- Visible keyboard focus states.
- Respect `prefers-reduced-motion`.
- Semantic HTML, alt text on images.
- No layout shift from the scroll-reveal.

## 8. What "generic" looks like — avoid

The current AI-design cliché is warm cream + high-contrast serif + terracotta accent. This site is
close (cream + Playfair Display + plum) — so the guard against genericness is NOT the palette, it's:
personal voice in the copy, a real signature element (later), and the specific plum (#7A3F5D, from
Simran's Sri Lanka photos) instead of a default terracotta. Keep the base disciplined; earn
distinctiveness through content and one signature moment, not decoration.
