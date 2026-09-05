# Playground — Content & Structure

Source of truth for the Playground section of simranchhabradesign.com.
All copy is final and written in Simran's voice (no em dashes, no AI
transition openers, plain and specific). Do not rewrite copy when
building — use it verbatim.

---

## Structure

Modeled on jackienam.com/#works.

- One uniform grid. Every tile is the same size. Each tile shows an
  image + two short tags.
- Clicking ANY tile opens a pop-up / modal over a dimmed grid. Same
  interaction for every tile — no tile navigates away directly.
- Close returns to the grid (click-outside + X).
- There is NO loose list under the grid. Exactly 9 tiles.

### Two card variants (difference lives inside the pop-up, not in tile size)

- **Full cards** — pop-up shows a 2–3 line teaser + a prominent
  "See more →" button that routes to a full project page.
- **Light cards** — pop-up shows context + image/gallery, complete in
  the modal. No link out, no "see more".

### Cleanup note

Any leftover tiles from the old stub — "Poetry (Photos)", "RTX",
"Events", "Styling + Art Direction", "Gesture Sketch" as a playground
item — must be removed or remapped. They map to: Spoken Word, The Road
Trip Experience, (removed), the individual styling entries.
(Gesture Sketch is a case study, not a playground entry.)

---

## The 9 tiles

### FULL cards (teaser + "See more →" → full page)

**Si.Ch** — tags: `Fashion · Brand`
Teaser: "A gender-neutral fashion label I designed and ran for a year.
It started on a trip to Sri Lanka and the sky I kept photographing."

**The Road Trip Experience** — tags: `Art · Documentary`
Teaser: "Sixteen artists, one car, across Gujarat. I ran the experience
and operations, and we ended up preserving the lost music of Kutchh on
film."

**Nightmare in Neverland** — tags: `VR · Art Direction`
Teaser: "A surreal VR dreamscape, built by three of us. I made the tea
party, where a little horror stays fun as long as you keep it
whimsical."

### LIGHT cards (context + gallery inside the pop-up, no link)

**Humans Were Made To Love** — tags: `Styling · Art Direction`
"A gender-fluid fashion spread I conceptualized, directed, and styled in
design school."

**Verve Magazine** — tags: `Styling · Editorial`
"Assistant stylist on an editorial story and two supplement covers, with
Shriya Saran and Tamannah Bhatia."

**Niluk by Nilima Mehta** — tags: `Styling · Art Direction`
"Creative direction and styling for the 'Safar' collection — Indian
embroidery on Western silhouettes."

**Zebein** — tags: `Styling · Art Direction`
"Creative direction and styling for the debut campaign of an Indian
contemporary label."

**Spoken Word** — tags: `Poetry · Performance`
"In 2017, a few friends and I, all obsessed with Button Poetry, started a
spoken word movement in our home city of Ahmedabad. Over the next two
years we ran more than 20 open mics, tapping into the city's creative
nerve and building a space for storytelling and performance."

**Big Squat Festival** — tags: `Events · Artist Relations`
"Organizing committee, artist relations, for Fangirl Live's eight-week
indie arts festival."

---

## Full-page bodies

Copy for the three full-card pages.

### Si.Ch

Header-light (no section titles), two paragraphs.

> A gender-neutral fashion label I designed and ran for a year.
>
> Si.Ch started on a trip to Sri Lanka, which I didn't know then would be
> my last trip for a while, right before the pandemic. I kept
> photographing the sky. Cities, mountains, beaches, and it was different
> in every one. That became the whole thing. The color palette came
> straight off those photos, and the motifs came from the species I saw
> on the island: the chestnut-backed owl, the Sri Lankan water lily, the
> Olive Ridley and Hawksbill turtles, the Persian violet. I drew each one
> by hand and turned them into repeat patterns.
>
> Then it stopped being a moodboard and became clothes. Cotton-linen,
> gender-neutral, cut simple enough to work across bodies instead of one
> type. I shot the collection with my friends, made a brand film, and ran
> Si.Ch as an actual label for about a year, which is the part I'm
> proudest of. It was rooted in research, and then it had to survive as a
> business.

Visuals: hero = colorboard or a strong shoot image. Gallery = colorboard,
hand-drawn motif line drawings, pattern development tiles, shoot photos.
Video = brand film (YouTube embed, link TBD).

### The Road Trip Experience

> Experience & Operations Manager. An art and documentary project with
> Mahindra, sixteen artists, and one car across Gujarat.
>
> We took sixteen artists from around the world into Gujarat to work
> alongside local indigenous artists. My job was the experience and the
> operations: making the whole thing actually run, from the ground up,
> across a lot of moving parts and a lot of terrain.
>
> The point was cross-pollination, international and local artists making
> things together instead of one observing the other. The piece I'm
> proudest of came out of Kutchh: a documentary on the region's lost
> music, which meant recording and preserving something that was
> genuinely disappearing. Not just a nice output, an actual bit of
> cultural preservation.
>
> And yes, at one point I was hand-painting the car.

Visuals: hero = the car-painting shot. Gallery = additional images from
the old Webflow Road Trip page.

### Nightmare in Neverland

> VR dreamscape, group project. I ran the art direction.
>
> The brief was to build a VR experience around a dream, a memory, or a
> ritual, and we went with dream, which is how three of us ended up
> making a surreal three-level world you walk through: a room, a tea
> party, a maze. I took the tea party.
>
> It was supposed to be creepy, and for a while it was just generically
> creepy in the way everything is when you haven't figured it out yet.
> Then I turned the lighting pink and green, and somewhere in the
> tinkering I landed on the thing that made it work: a little horror
> stays fun when you keep it whimsical. Floating teacups, an animated cat
> sitting at the head of the table like it was hosting, a portal in the
> corner that no one asked for.
>
> The part I actually cared about was harder to see. There's no dialogue
> in the experience, no text telling you what to do, so the only things
> moving you through the space are light, sound, and where I chose to put
> stuff. You don't really know if that works until you watch someone try.
> At the showcase I stood there while people got lost, nudged a light or a
> sound cue, and watched them find their way. That was the whole thing I
> took from it.

Role: Designer (art direction). Team of 3 — Sarah led technical + Level 3,
Ana did Level 1, Simran did Level 2 (the tea party).
Visuals: hero = Level Two pink/green wide shot. Gallery = tea table +
floating teacups, ground-level teddy bear + cat, wide forest shot,
teacup-rotation blueprint. Video = Simran's Level Two walkthrough (lead)
+ optionally Ana's full edit at the end.

---

## Image handling (site-wide fix)

Applies to homepage, playground, and case study pages.

- No tilt/rotate transforms on images. Images sit upright.
- Do not force every image into one aspect ratio with object-fit: cover
  + center crop. Let each image's natural orientation drive its
  container. Use object-fit: contain or per-image object-position where a
  subject is being cropped out. Never stretch or squish.
- Fix at the shared image component, not section by section. Go image by
  image to confirm each shows its subject and is right-side up.

---

## Outstanding (not yet done)

- Styling high-res images + Road Trip extra images + Si.Ch shoot/film:
  export and place in /public/playground/<project>/.
- Si.Ch brand film YouTube link.
- Decide playground hero palette: berry/Playfair vs plum/Fraunces.
- Simran's own Level Two VR walkthrough video (to replace/lead over
  Ana's edit).
