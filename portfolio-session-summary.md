# Portfolio Session — Full Summary

This document captures everything worked on in this chat: the Whspr and AIRA case
studies (locked content), the visual system, the build prompts, the work-card
image prompts, and the open items across projects.

---

## 0. The overarching goal & priority

- **34 days left on OPT.** Applications stop the clock, not a perfect portfolio.
- Highest-value path: get **2 strong case studies + a presentable homepage live → start applying.** Resy, GestureSketch, and Playground can be pushed while applications are already going out.
- **Execution rule:** don't run parallel Claude Code agents on one repo (they conflict). Do **sequential focused sessions, one concern at a time, commit between each.**

**Master build checklist (run in order, commit after each):**
1. ⬜ Whspr + AIRA case study pages — build prompt in this doc (Section 5)
2. ⬜ Homepage — build prompt lives in the homepage chat
3. ⬜ Resy + GestureSketch pages — from those chats
4. ⬜ Playground changes — from that chat
5. Apply once homepage + Whspr + AIRA are live.

---

## 1. The visual system (applies to ALL case study pages)

This is the spec that fixes the "AI slop / unrefined" problem (center-aligned,
thin small headlines, low contrast, clunky image borders, dropped-in visuals).

**North star:** Beverly Yip (bevyip.com) for structure, Jackie Nam
(jackienam.com/dandi) for image treatment. (Honey's editorial polish judged too
time-expensive to hit now.)

**Fonts:**
- Headlines: **Playfair Display**, weight 500–600 (NOT thin, not heavier than 600)
- Body/captions/labels: **Inter**

**Type scale:**
- Hero/page title: 56–72px, Playfair 500–600
- Section headline: 36–44px, Playfair 600
- Sub-head: 22–26px, Playfair 600
- Body: 18–20px, Inter 400, line-height 1.6–1.7
- Caption: 14–15px, Inter 400
- Max text width (measure): 65–70 characters

**Layout:**
- EVERYTHING LEFT-ALIGNED (no center alignment anywhere). This is the single
  biggest fix.
- Generous whitespace: 80–120px between major sections.

**Color:**
- Case study page background: cream **#FAF8F5**
- All headlines + body text: ink **#2A1F28** (HIGH contrast, no low-contrast gray)
- NO plum, NO amber/coral on the cream page. Color comes ONLY from product
  visuals inside their dark blocks.
- Plum stays only on homepage/About (personal brand).

**Image / screen treatment (from jackienam.com/dandi):**
- FEATURE screens: LARGE, ~60–80% page width, one per row, sized to command the
  section (not thumbnails). Each pairs with a short Playfair headline + one line
  of Inter caption (like Dandi's "Care That Adapts to You" pattern).
- Phone screens in clean, CONSISTENT device mockups (same frame, size, soft
  shadow every time). NO thick/wide borders (remove the clunky ones). Soft shadow
  only, e.g. `0 4px 24px rgba(0,0,0,0.08)`, 8–12px radius.
- SUPPORTING images: tidy rows of 2–3 at a smaller consistent size.
- Diagrams/deck slides sit in framed dark blocks using each product's tokens.
- Every visual: consistent max-width, consistent generous margins, deliberately
  placed. Never cramped, never dropped-in.
- Stat callouts + quote callouts render as distinct, larger, set-apart moments.

**Two build checks (both pages):**
1. ⚠️ Headlines render in INK (#2A1F28), NOT plum. No plum on case study pages.
2. ⚠️ Every dark visual uses the EXACT product tokens — no stray shades.

---

## 2. Product palette tokens (exact)

**Whspr (dark + amber):**
- Bg Midnight 950 #07080A, surface1 #1A1A24, surface2/icon circles #252533
- Signal Amber #FF8830, Amber Dim #CC6F00
- Text light #F4F4F8, Dusk 400 #9292A0, Dusk 500 #6B6B7E
- Fonts in-app: DM Serif Display + DM Sans

**AIRA (dark + coral, from real screens):**
- Bg #0A0A0C / #101012, surface cards #252528
- Coral accent #E8845C
- Phase colors: purple/winter #4A3F6B, blue/spring #6B93C4, green/summer #4CA67E,
  coral/autumn-luteal #EFA07A
- Text white / soft gray

**Resy (from Resy page palette):**
- Cream #FAF7F2, berry #8C2F39 (lead accent), warm stone neutrals, ink #2A2320

**Case study pages themselves:** always cream #FAF8F5 + ink #2A1F28, neutral.

---

## 3. WHSPR — locked case study content

Saved in Notion (page ID `38ea37e2-a4b0-81be-a846-d47d67e5796a`).

**Structure/flow:** Hero/Metadata → Overview → Context → Research → First Pass →
Gap diagram → Insight → Design Decisions ×4 → Solution → Design System → Testing
→ What I'd Do Next → What I Took Away.

**Metadata**
- One-liner: "Whspr: a crowdsourced urban intelligence platform for women navigating NYC"
- Hats Worn: Product Design · UX Research · Product Strategy · Prototyping · UI Design
- Mentor: Prof. Margaret Jack
- Platform: Mobile Application
- Timeline: 4 months (Jan 2026 – May 2026)

**My Role** — led end to end (research, product, IA, contribution flow, trust/
verification, visual system). Designed and built the working prototype solo in
Claude Code (the AI-native differentiator — surfaced deliberately).

**Context**
> Women already share knowledge about places all the time. Before going somewhere
> new, they'll text a friend, check a neighborhood subreddit, or read reviews to
> get a sense of what a place is actually like. But that knowledge is scattered
> and it disappears fast. It lives in group chats and comment threads, and none
> of it is anywhere you can actually find when you need it.
>
> **There's no interface designed to support collective sensemaking around
> women's perceived safety in public spaces.**

**Where I Began (Research)** — "I began by researching why women still resort to
the whisper network in the age of apps. I started where the best unsolved stories
tend to begin: in academia." → Slide 6 (Three Key Frameworks) → "The frameworks
explained the problem, but they couldn't tell me how to design for it. For that,
I needed to hear how women actually move through the city, and what they wished
existed." → Slide 7 (What Women Actually Said).

**The First Pass**
> My research pointed me toward a few observations that I started building on.
> That first build still carried some conventional assumptions:
> - Crime statistics and population density layered onto search
> - AI pose detection for verification
> - An LLM to summarize contributions
>
> All three did the same thing: they tried to manage women's knowledge instead of
> just making room for it. That went against the whole point of Whspr, so none of
> them made it to v2.

**Gap diagram** (dark/amber, "Not another safety app.") — the hinge between First
Pass and Insight.

**The Insight**
> I set out to build a safety tool. The research told me I was solving the wrong
> problem.
>
> Women weren't asking for another app to warn them about danger. They already had
> that, and it wasn't working. What they wanted was the thing they were already
> giving each other in group chats: a sense of what a place actually feels like,
> at a certain time, for a certain kind of person.
>
> That reframed everything. Whspr wasn't a safety problem. It was a knowledge
> problem. Women already do the work of noticing, sharing, and warning each other.
> What's missing is anywhere for that knowledge to live.

**Design Decisions (4)** — intro line: "All of these decisions came out of my
secondary and primary research."
1. **No star ratings** — familiarity (not scores) is what makes women feel safe
   (Dubey et al., 2025). Cut ratings; leave a short first-hand account tagged with
   the time you were there.
2. **A day/night toggle** — familiarity means knowing what to expect at the time
   you'll be there; a place differs at 6pm vs 1am.
3. **Verification, without surveillance** — posting requires ID verification (confirms
   contributor identifies as female); browsing open; posts stay anonymous; no
   personal data stored. Keeps it trustworthy, surfaces patterns over time.
4. **Friction as a feature** — 5-step contribution flow (been here before / when /
   solo or group / category / observation). Structure filters for quality over
   volume and signals the input matters (Nissenbaum). Voice-input annotation.

**The Solution** — app video + key screens. Highlighted pull-quote:
> The interface had to do two things at once: let someone post what a place was
> like, and let someone else read it to decide whether to go. The whole design
> keeps those two jobs working together without letting either one flatten the other.

**Design System** — dark/calm interface, Midnight base, single Signal Amber
accent, DM Serif Display + DM Sans. Colors + type slides.

**Testing It on the Street** — guerrilla research, WSQ Park + West Village, ~11
women / 6 conversations (problem first, prototype second, per Prof. Bloom).
Findings: word of mouth #1; safety unprompted; Reddit named as broken; women-only
framing landed positively; "just less blind" quote. Uses quote callouts (slide 19)
+ the real WSQ night photo.

**What I'd Do Next** — Verification & inclusion (selfie/pose excludes low-vision;
gender verification complex for trans women). Trust at scale (astroturfing). More
of what women asked for (cost/cover, events, queer-friendliness; basic read-side
filtering exists, would personalize). From places to routes (Whspr layer over the
map). An idea for adoption (QR in venues — bars/restaurants want women to feel
safe, so a QR to leave a note on the spot could get it off the ground).

**What I Took Away**
> Women already hold this knowledge. The systems built around them just haven't
> treated it as real. What Whspr taught me is that the defaults we design with, the
> ones that feel neutral, quietly decide whose experience counts. The work I care
> about most was refusing them, and building something that treats what women
> already know as real.

---

## 4. AIRA — locked case study content

Saved in Notion (page ID `38ea37e2-a4b0-81dd-a6de-fa6dca4a7f7c`).
Shorter than Whspr, insight-and-screens-led. **PCOS renamed to PMOS in 2026** —
use PMOS (formerly PCOS).

**Structure:** What is PMOS? → The problem → My role & team → Research → Insight
→ four-seasons explainer → What I designed (cycle ring → Seasons/Phases toggle →
Learn tab → Nutrition → Activity) → Designing the nudges → What I'd do next →
What I took away.

**What is PMOS?** — hormonal/metabolic condition, renamed from PCOS in 2026.
Stat callouts: **1 in 8 women / 170M worldwide** (Endocrine Society, 2026);
**up to 70% undiagnosed** (WHO).

**The problem** (neutral third person)
> PMOS is hard to manage because it's hard to even understand. It presents
> differently in everyone, so figuring out how it shows up in one person is its own
> ongoing task. And managing it means changing several habits at once, food, sleep,
> movement, stress, cycle, all of which affect each other.
>
> The tools don't help much. Each habit lives in a separate app, and none of them
> connect. Even wearables only capture a slice, like steps and sleep, not the
> fuller picture of cycle, nutrition, and symptoms that PMOS involves, and they
> remain out of reach for a lot of people. So people track constantly and still
> can't see how it all fits together, and most eventually fall off.
>
> That full picture is the point. With no cure, managing PMOS comes down to
> spotting patterns, what sets off symptoms, what actually helps. Connected data
> could reveal those patterns. Scattered across apps, it stays noise.

Visual: line illustration of an overwhelmed woman surrounded by the many things
she manages (generated in Gemini — see prompt in Section 6).

**My role & team** — class project on habit change; chose PMOS (daily-habit
condition, underserved, personal proximity: she has it, a teammate is diabetic).
Team built AIRA around seven connected health pillars + a daily readiness score.
**Teammates:** onboarding, sleep, mood, help. **Simran owned:** cycle tracking,
nutrition, activity/step score, dashboard.

**Research** — survey (25 responses, 13 with PMOS) + 3 interviews + behavior-change
models (Fogg, COM-B). Callout stats: symptoms "vary too much to tell"; "start
strong but can't stay consistent"; want gentle nudges + cycle-phase guidance.
Quote callout: existing trackers like Flo and Clue "don't cheer you on."

**The insight** — Maitreyi's quote: "I'm trying to think of my cycle like seasons,
four different weeks…" The reframe: most trackers assume a predictable 28-day
cycle; irregular cycles are a commonly reported PMOS symptom; the seasons framing
centers how each phase *feels*, which holds up whether the cycle is regular or not.

**On the seasons framing** (states it confidently, no defensiveness)
> The four phases of the menstrual cycle are often described as inner seasons, a
> framing rooted in the body's infradian rhythm... Adjusting habits to each phase,
> known as cycle syncing, was popularized by Alisa Vitti, who developed it while
> managing her own PMOS.

Visual: four-seasons explainer diagram (dark bg; purple/winter, blue/spring,
green/summer, coral/autumn), teaches phases → seasons → feeling of each.

**What I designed:**
- Cycle ring (filling ring colored by phase; "rest + recovery" / "high energy + clarity").
- **Design decision: seasons or phases** — a toggle. Same data, two framings
  (Seasons: Winter/Spring/Summer/Autumn; Phases: menstrual/follicular/ovulatory/
  luteal). Backed by CHI research (personalization — view signals in the way
  relevant to you). Inclusive; covers newcomers.
- **Learn tab (Daily Pulse)** — phase-tagged education (cycle science, PMOS basics,
  daily fact, quick tip). Keeps education out of tracking screens.
- **Nutrition (Meal Tracking)** — macro tracking + gentle nudge ("low on protein
  today, try Greek yogurt") + type-or-speak logging. Most conventional; would push
  toward phase-personalization.
- **Activity** — encouraging confirmation, not a number.

**Designing the nudges** — every interview: apps either nag or stay silent. "Don't
cheer you on." Nudges grounded in Fogg/COM-B: arrive at low-energy moments, tie to
behavior not fixed times, sound like encouragement. Survey backed it. Visual:
notification screen (two warm lock-screen nudges + mascot) + widget screen.

**What I'd do next** — dashboard (patterns across cycle/food/activity in one place);
cycle-to-cycle comparison (CHI-backed, matters most for irregular cycles); nutrition
phase-personalization.

**What I took away**
> AIRA started from something a user said almost in passing, that she'd started
> thinking of her cycle as seasons. The work was recognizing that offhand comment
> as the whole design, and building an interface that treats an irregular, personal
> experience as something worth designing around, instead of a problem to correct.

**AIRA v2 backlog (post-portfolio):** dashboard, cycle-comparison view, nutrition
personalization, light mode + accessibility pass.

**Citations:** WHO (undiagnosed), Endocrine Society 2026 (1 in 8 / 170M), CHI 2024
(menstrual data viz — personalization + cycle comparison), Fogg / COM-B, Alisa
Vitti / infradian rhythm (cycle syncing).

---

## 5. Session 1 build prompt (Whspr + AIRA) — paste into Claude Code

```
Build two case study pages for my portfolio: Whspr and AIRA. Read the full
content for each directly from Notion (my Notion MCP is connected):
- Whspr: Notion page ID 38ea37e2-a4b0-81be-a846-d47d67e5796a
- AIRA:  Notion page ID 38ea37e2-a4b0-81dd-a6de-fa6dca4a7f7c

Each page has the content in order, inline [visual: ...] markers for images/
diagrams, and a "Build / Visual System Notes" section at the bottom with exact
color tokens and asset guidance. Follow those notes precisely.

STEP 1 — before building, list the files in public/whspr/, public/aira/ (and
any other AIRA image folders) and map each [visual: ...] marker to the correct
real file by matching names. Do NOT hardcode filenames that might not exist.
Flag any [visual] marker with no matching asset so I can add it. Don't touch
the homepage.

VISUAL SYSTEM — apply exactly to BOTH pages. Priority: the pages must look
refined and intentional, like a strong editorial portfolio (reference the
polish of bevyip.com and jackienam.com case studies). My current pages look
templated, center-aligned, thin-typed, and cramped — fix all of that.

Fonts (next/font/google):
- Headlines: Playfair Display, weight 500-600 (NOT thin; NOT heavier than 600)
- Body/captions/labels: Inter

Type scale (these fix "headlines too small/thin"):
- Hero/page title: 56-72px, Playfair 500-600
- Section headline: 36-44px, Playfair 600
- Sub-head: 22-26px, Playfair 600
- Body: 18-20px, Inter 400, line-height 1.6-1.7
- Caption: 14-15px, Inter 400
- Max text width (measure): 65-70 characters

Layout — EVERYTHING LEFT-ALIGNED. No center alignment anywhere (headlines OR
body). Left-align to a consistent left margin. Generous whitespace: 80-120px
between major sections.

Color:
- Page background: cream #FAF8F5
- All headlines and body text: ink #2A1F28 (HIGH contrast — no low-contrast
  gray text on cream)
- NO plum and NO amber/coral on the cream page itself. Page = calm cream +
  high-contrast ink only. Color comes ONLY from product visuals in their dark
  blocks.

IMAGE / SCREEN TREATMENT (adapt from jackienam.com/dandi — my images currently
look small and "dropped in"):
- FEATURE screens/visuals: show LARGE, ~60-80% page width, one per row,
  generously sized so they command the section (NOT small thumbnails). Each
  feature visual pairs with a short Playfair headline + one line of Inter
  caption beside or below it (like Dandi's "Care That Adapts to You" pattern).
- Phone screens go in clean, consistent device mockups (phone frames), framed
  programmatically — same frame, same size, same soft shadow every time. NO
  thick/wide borders (my current wide borders look clunky — remove them). Soft
  shadow only, e.g. 0 4px 24px rgba(0,0,0,0.08), 8-12px border-radius.
- SUPPORTING images (secondary shots, small diagrams): tidy rows of 2-3 at a
  smaller consistent size.
- Diagrams and deck slides sit in framed dark blocks. Whspr dark blocks use
  Whspr tokens (Midnight #07080A / #1A1A24 / #252533, Signal Amber #FF8830).
  AIRA dark blocks/screens use AIRA tokens (dark #0A0A0C, coral #E8845C, phase
  colors purple #4A3F6B / blue #6B93C4 / green #4CA67E / coral #EFA07A).
- Every visual: consistent max-width, consistent generous margin above/below,
  placed so it feels deliberately positioned. Never cramped, never dropped-in.
- Stat callouts and quote callouts (marked in Notion) render as distinct,
  larger, visually-set-apart moments — not inline text.

Build clean, componentized pages with design tokens for all type/spacing/color
so I can tweak easily. Respect prefers-reduced-motion. Mobile responsive.

TWO BUILD CHECKS before done:
1. Case study headlines render in INK (#2A1F28), NOT plum. No plum anywhere on
   the case study pages.
2. Every dark visual block uses the EXACT tokens above — no stray shades.

Do NOT touch the homepage. Flag anything unclear rather than guessing. When
finished, tell me which [visual] markers (if any) had no matching image.
```

---

## 6. Work-card hero image prompts (for Gemini / image gen)

**Decision made:** product colors per card (not plum), wordmark in Playfair
Display. NOTE: cards will read as three different color worlds on the grid — this
was chosen deliberately. Image models often mangle lettering; if the wordmark
looks off, strip it and set real Playfair in Figma.

**Whspr**
> Landscape composition for a website card, 3:2. Dark Midnight background
> (#07080A) with wide margins. Fine single-weight line drawing in Signal Amber
> (#FF8830) only, no fill, no shading, no gradients. Center-left: a place pin split
> down the middle, a small sun and open storefront traced on the left half, a moon
> and the same storefront on the right half, drawn as one continuous object. A
> single amber hairline rule beneath it. Right side left mostly empty for text.
> Wordmark "Whspr" in a high-contrast serif (Playfair Display), Signal Amber,
> generous letter spacing. Calm, editorial, uncrowded.

**AIRA**
> Landscape composition for a website card, 3:2. Dark background (#0A0A0C) with
> wide margins. Fine single-weight line drawing in warm coral (#E8845C) only, no
> fill, no shading. Center-left: a single open ring drawn as an outline, divided
> into four quarter-arcs, each holding one small season glyph traced in line, a
> bare branch, a sprouting stem, a full sun, a falling leaf. The ring breaks at one
> point like a dial mid-turn. Right side left mostly empty for text. Wordmark
> "AIRA" in a high-contrast serif (Playfair Display), coral, wide tracking. Calm,
> editorial, uncrowded.

**Resy Celebrations**
> Landscape composition for a website card, 3:2. Warm cream background (#FAF7F2)
> with wide margins. Fine single-weight line drawing in berry (#8C2F39) only, no
> fill, no shading. Center-left: a long table traced from directly above, place
> settings drawn as simple line circles, one seat left as an empty outline. A
> single card shape overlapping the table corner, angled like a swipe mid-motion.
> Right side left mostly empty for text. Wordmark "Resy Celebrations" in a
> high-contrast serif (Playfair Display), berry, wide tracking. Calm, editorial,
> uncrowded.

**GestureSketch** — NEEDS INPUT: palette (dark + gold from the app's welcome
modal?) and visual concept (suggested: a hand with fingers pinching, a fluid
continuous line flowing from the fingertips into an expressive stroke).

**Nightmare in Neverland** — NEEDS INPUT: what the project actually is, its
palette, and a visual concept.

**AIRA overwhelm illustration (Gemini prompt):**
> A minimal, elegant single-line drawing (continuous line art style) of a young
> woman sitting down, looking quietly overwhelmed and tired — head tilted slightly,
> one hand resting on her forehead or temple. Weary and human, not dramatic. Around
> her, floating in the space, small simple line-drawn icons of the many things she
> tracks: a crescent moon (sleep), a plate/fork (food), a water droplet, a pill, a
> heart, a calendar, a small chart/wave, a clock, a dumbbell — orbiting loosely,
> slightly crowded, suggesting mental load. A few small notification dots. Style:
> clean thin continuous line work, minimal, elegant modern editorial illustration,
> hand-drawn feel. Single warm terracotta/coral line color (#E8845C) on soft cream
> (#FAF8F5). No shading, no fill. Lots of negative space. Calm, empathetic,
> sophisticated. Portrait orientation.

---

## 7. Cross-project status (across chats)

- **Whspr** — content + visuals DONE, in Notion. Needs build (Session 1).
- **AIRA** — content + visuals DONE, in Notion. Needs build (Session 1).
- **Resy** — being edited in parallel; older version in Notion; needs a rebuild
  pass (voice/tightening/visuals). Palette: cream #FAF7F2, berry #8C2F39.
- **GestureSketch / AI Art Therapist** — in a separate chat. Live app already
  presentable (welcome modal w/ gesture instructions, brush/color/undo/clear/save).
  Live: simranchhabra12.github.io/gesturedrawing | Repo: github.com/SimranChhabra12/gesturedrawing.
  Open decision: frame as full "AI Art Therapist concept" (research + cognitive-
  offloading 2x2 + 3 solutions, GestureSketch as built proof) vs. just GestureSketch.
- **Homepage** — in the homepage chat; needs its own build session (front door;
  Honey/Beverly-style; same visual spec; links to case studies).
- **Playground** — in that chat.
- **Resume** — parallel track with Rakesh.

**Voice rules (all copy):** no em dashes; no "X, not Y" symmetrical antithesis; no
decorative analogies; no "signals" for experiences/posts; plain over dramatic;
vary sentence length; her words as raw material; state facts confidently without
defensiveness.
