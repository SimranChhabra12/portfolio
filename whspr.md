---
title: Whspr
oneLiner: A crowdsourced urban intelligence platform for women navigating NYC
hats: [Product Design, UX Research, Product Strategy, Prototyping, UI Design]
mentor: Prof. Margaret Jack
platform: Mobile Application
timeline: 4 months (Jan 2026 – May 2026)
---

# Whspr

**A crowdsourced urban intelligence platform for women navigating NYC**

## My Role

I led this end to end, as researcher, product lead, and designer. That meant the interview study, the information architecture, the contribution flow, the trust and verification system, and the visual design system (dark UI, Signal Amber accent, DM Serif Display / DM Sans).

I also designed and built the working prototype myself, solo, in Claude Code, so the product decisions and the technical ones were the same set of decisions. Building it meant I couldn't hand-wave the hard parts: the schema, the trust scoring, the API integrations all had to actually work.

## Context

Women already share knowledge about places all the time. Before going somewhere new, they'll text a friend, check a neighborhood subreddit, or read reviews to get a sense of what a place is actually like. But that knowledge is scattered and it disappears fast. It lives in group chats and comment threads, and none of it is anywhere you can actually find when you need it.

**There's no interface designed to support collective sensemaking around women's perceived safety in public spaces.**

## Where I Began

I began by researching why women still resort to the whisper network in the age of apps. I started where the best unsolved stories tend to begin: in academia.

> _[visual: Slide 6 — Three Key Frameworks]_

The frameworks explained the problem, but they couldn't tell me how to design for it. For that, I needed to hear how women actually move through the city, and what they wished existed.

> _[visual: Slide 7 — What Women Actually Said]_

## The First Pass

My research pointed me toward a few observations that I started building on. That first build still carried some conventional assumptions:

- Crime statistics and population density layered onto search
- AI pose detection for verification
- An LLM to summarize contributions

All three did the same thing: they tried to manage women's knowledge instead of just making room for it. That went against the whole point of Whspr, so none of them made it to v2.

> _[visual: Gap diagram — dark/amber, "Not another safety app." The hinge between First Pass and Insight.]_

## The Insight

I set out to build a safety tool. The research told me I was solving the wrong problem.

Women weren't asking for another app to warn them about danger. They already had that, and it wasn't working. What they wanted was the thing they were already giving each other in group chats: a sense of what a place actually feels like, at a certain time, for a certain kind of person.

That reframed everything. Whspr wasn't a safety problem. It was a knowledge problem. Women already do the work of noticing, sharing, and warning each other. What's missing is anywhere for that knowledge to live.

## Design Decisions

All of these decisions came out of my secondary and primary research.

### No star ratings

The research was clear that familiarity, knowing what to expect from a place, is what actually makes women feel safe in it (Dubey et al., 2025). A star rating gives you none of that. It flattens a place into a single number and strips out the context that builds familiarity in the first place: what the crowd was like, how the staff treated you, whether it felt okay to be there alone. So I cut ratings entirely. Instead, you leave a short, first-hand account of what a place was actually like, tagged with the time you were there.

### A day/night toggle

Familiarity means knowing what to expect from a place at the time you'll actually be there. But a place doesn't stay the same. Somewhere well-lit and full of people at 6pm can feel completely different at 1am. So Whspr keeps the two apart and lets you toggle between them.

### Verification, without surveillance

A platform built on women's experiences only works if the people posting them actually are women. So posting requires ID verification to confirm the contributor identifies as female, while browsing stays open to everyone. But verification cuts against the other thing that makes people contribute: privacy. So the two are kept apart. Verification confirms identity at the door, posts stay anonymous, and nothing personal is collected or stored along the way. It keeps the platform trustworthy, and over time, helps surface patterns across posts worth trusting.

### Friction as a feature

Verification decides who can post. The contribution flow decides what a post is worth. Research on contribution quality shows that low-barrier input produces volume rather than value, while a bit more structure produces something usable (Nissenbaum). So instead of an open text box, the flow walks you through five quick prompts before you can submit: whether you've been there before, when you went, whether you were alone or in a group, what your observation is about, and finally the observation itself. The structure does two things at once. It filters for quality over volume, and it signals to the person contributing that their input actually matters.

> _Annotation on this visual: the flow also includes a voice input option, so someone can speak their experience instead of typing it._

> _[visual: Slide 13 — the friction/contribution flow screen. Each decision's screen shown in a device mockup, matched sizing.]_

## The Solution

> _[visual: prototype video (screen-recorded from the deck's latest link) / hero shot of the main screens]_

Whspr came together as a mobile app built to hold the knowledge women were already sharing, and make it findable.

**The interface had to do two things at once: let someone post what a place was like, and let someone else read it to decide whether to go. The whole design keeps those two jobs working together without letting either one flatten the other.**

> _[visual: key screens in sequence — search → place profile → contribution — in device mockups]_

You search a place and see what other women actually experienced there, tagged with the time they went and the kind of visit it was. No score, no crime feed. Just first-hand accounts from people who were there.

## The Design System

Whspr runs on a dark, calm interface, built to feel like a quiet resource rather than an alarm. A Midnight base, a single Signal Amber accent, and DM Serif Display paired with DM Sans.

> _[visuals: colors slide + typography slide]_

## Testing It on the Street

> _[visual: the WSQ Park guerrilla research photo]_

To pressure-test the concept, I took it out for guerrilla research around Washington Square Park and the West Village, about eleven women across six short conversations. Each one followed the same order, suggested by Professor Bloom: validate the problem first, show the prototype second, ask about use last. That way people named the problem in their own words before they ever saw my solution.

A few things came back clearly.

**Word of mouth was the number one factor for everyone.** As one woman put it, "if someone I know has an opinion about it, that's the number one thing that affects my decision." That validated the whole premise: women already share this knowledge, so the job was to build infrastructure for it, not invent a behavior.

**Safety came up on its own, unprompted.** She wasn't asking for alerts. She was asking for context.

**Reddit kept getting named as the current option, and described as broken.** "People on r/NYC are like, this question's been asked so many times, I don't even wanna answer it."

And the women-only framing, which I'd worried might be contested, landed positively in every single conversation. The line that stuck with me most was the simplest: one woman said going somewhere with Whspr would make it "just less blind."

> _[quote callouts styled like Slide 19]_

## What I'd Do Next

Whspr was prototyped, not launched, so some of the hardest problems are still open.

**Verification and inclusion.** The verification I designed confirms identity but raises real questions I didn't fully resolve. Selfie and pose-based checks exclude low-vision users, and gender verification is genuinely complicated for trans women, who the platform is meant to include. Getting this right matters more than getting it fast.

**Trust at scale.** A platform built on contributions is only as trustworthy as the people contributing. Guarding against coordinated manipulation and astroturfing is something I'd need to design for before this could be real.

**More of what women actually asked for.** The research surfaced dimensions the current version doesn't capture yet: cost and cover charges, event info, and queer-friendliness, which every existing place-review platform underserves. A basic filtering layer already exists on the read side, and I'd build it out to be more personal, so someone can shape what they see around the context they care about most.

**From places to routes.** The most ambitious direction is a Whspr layer over the map itself, so women could leave and read feedback along a route, not just at a place. The way you get somewhere carries its own texture, and no platform treats a route as something worth knowing about.

**An idea for adoption.** Bars and restaurants have their own reason to want women to feel safe in their space, so a QR code in venues, where women can leave a note on the spot, could be a way to get Whspr off the ground.

## What I Took Away

Women already hold this knowledge. The systems built around them just haven't treated it as real. What Whspr taught me is that the defaults we design with, the ones that feel neutral, quietly decide whose experience counts. The work I care about most was refusing them, and building something that treats what women already know as real.
