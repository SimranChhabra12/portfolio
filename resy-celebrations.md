---
title: Resy Celebrations
oneLiner: A large-party booking flow inside Resy, for groups of 8+
hats: [UX Research, Product Design, Prototyping]
team: 4 (me + 3 engineers). I led project direction and owned research end to end.
timeline: Semester 3, UX design course
platform: Mobile feature (existing Resy app)
---

# Resy Celebrations

**A large-party booking flow inside Resy, for groups of 8+**

## Context

Booking a table for 2 on Resy takes seconds. Booking for 15 sends you to your email.

For groups of 8 or more, most restaurants can't confirm through the app. Resy caps the party size and tells you to email the restaurant directly. So the thing Resy is good at, fast and clear booking, quietly stops right at the point where a group dinner gets hard to coordinate.

> **There's no infrastructure inside Resy for the one kind of booking that needs it most.**

## Where I Began

This was the first project in my UX course, built to teach the research end of the process: find a gap in an existing product, understand it, design for it. I was put with three engineers who asked me to lead.

The problem found me before the project did. My birthday was coming up, and I was trying to book a group dinner in New York. Once I set the party size past 6 on Resy and OpenTable, both apps told me to email the restaurant. So I did. Most took 2-3 days to reply, some never did, and a lot of them didn't list a phone number at all. When they did write back, it was usually a hefty per-person quote I had no way to see coming. I couldn't picture the space from the few photos online either.

My partner and I gave up and went to the Lower East Side and East Village in person, walking into bars to ask about minimum spends and availability. We got more in an afternoon on foot than in a week of emails. That's the gap I wanted to design for.

> _[visual: current-state journey — the painful email/call loop. Slide from deck.]_

## The First Pass

Going in, I framed this as a user problem. Someone's trying to book a big group and can't, so fix their flow. My first pass carried that assumption:

- Better filters on the existing Resy flow
- A results list you narrow down after the fact
- Fixing the email hand-off so responses came faster

The user stayed my focus the whole way through. That didn't change. What changed was that I couldn't design their side properly without understanding the other one.

So we interviewed restaurant managers too. And the restaurant side turned out to be enormous, an operational problem in its own right, minimum spends, kitchen strain, staffing, no-show risk. Solving all of that was never the scope of a research course project. What the manager research did was let me design a grounded, hypothetical experience for their side, built on what they actually told us, without pretending I'd solved restaurant operations. The user was the problem I was solving. The managers were the context that made the user's side designable.

> _[visual: two-sided problem diagram — dark block. User side vs. restaurant side, and the email gap between them. The hinge into the insight.]_

## Research

I ran a survey to define who this was for, then two rounds of interviews: 15 users first, then 6 restaurant managers across Brooklyn and Manhattan.

The survey decided the target. Students dropped out fast, most don't use Resy because it wants a card on file, and a sit-down dinner for 15 isn't in the budget. That left working professionals, roughly 29-33.

> **📊 67% didn't learn a restaurant's minimum spend or event policy until after they'd already reached out.**
>
> **📊 93% still call or email restaurants directly for group bookings, even when they normally use an app.**
>
> **📊 87% said limited availability and hidden costs were their biggest frustration.**

The thing that would decide whether a place was even an option, the minimum spend, the policy, was the one thing you couldn't see until you'd already spent the effort to ask.

The user interviews confirmed the pattern. Everyone had tried Resy for a big group at some point. Almost nobody had booked through it. They'd called, emailed, or gone with whoever replied first. The words that kept coming up were "waiting," "hidden costs," and "I didn't even know if it was confirmed."

The manager interviews were the ones that reframed the problem, and I'll get to why in a second. But one line from them set up everything after it:

> "If guests saw sample menus, pricing, and policies before emailing us, that would filter out groups who aren't serious." — Convivium Osteria

## The Insight

We almost didn't interview restaurant managers. My professor pushed us past the user side to talk to the people running these rooms.

That's where the problem got more interesting.

The managers weren't refusing large bookings. They were doing work Resy had no infrastructure for. Event type, seating, dietary needs, minimum spend, prix fixe, none of it fits a standard reservation. So they took the conversation to email, because email was the only place it could happen.

The back-and-forth email wasn't really the problem. Resy just didn't have anywhere for restaurants and guests to exchange the specifics at all. Once I saw that, I understood I couldn't fix the user's side by speeding up email. The fix had to give both sides a place to have the conversation Resy had been pushing off the platform.

> **How might we help users book and manage a large-party reservation inside Resy, instead of routing them back to email?**

## Design Decisions

All four came out of the research.

### Celebrations as its own mode, not a filter

The first call was structural. I could have bolted a party-size filter onto the existing flow. But a large-group booking isn't a bigger version of a table for 2. It carries different information, a longer timeline, and higher stakes on both sides. A dedicated Celebrations tab signals that upfront, to guests and restaurants both.

### Preference-first discovery

Before showing any restaurants, Celebrations asks what you're planning: event type, party size, date, budget range, vibe. Most discovery shows results first and filters after. The research said why that fails here, people were reaching out to places that couldn't hold them, then finding out 3 emails deep. Collecting preferences first means every result on screen is already a real option. Browsing happens through a scrollable list with a map toggle, the pattern Resy users already know, with minimum spend and capacity visible on each card.

### A structured request, and a place for the restaurant to answer it

Instead of open email, the guest sends a structured request: event type, headcount, dietary needs, timing. The restaurant receives it in a manager dashboard, pre-filled, and can accept, counter, or decline without touching their inbox. This is the two-sided piece. Every manager said the same thing, the email was never the point, there was just nowhere else for that conversation to live. The dashboard is that somewhere. Input stays light while you're inquiring, and only steps up to committing detail once the restaurant says yes.

### Group coordination and payment split

Once it's confirmed, the booking becomes a shared space. The host sends an RSVP link through the app, guests confirm and split any deposit in-app, and the restaurant's headcount updates automatically before the cutoff. No chasing 12 people on Venmo.

> _[visual: annotated Celebrations screen — the list card or the request form, labeled. In device mockup.]_

## The Solution

> _[visual: prototype walkthrough video / hero shot of key screens]_

Resy Celebrations is a dedicated tab inside Resy for groups of 8 or more. Not a filter, not a workaround. A separate mode that tells both the user and the restaurant this is a different kind of booking.

> **The whole feature does one thing the old flow couldn't: it keeps the guest and the restaurant in the same place long enough to actually agree on a plan.**

You open Celebrations and tell it what you're planning. That filters the restaurants before they appear, so everything shown can actually hold your group. You browse a list or map, each place showing its minimum spend, capacity, and layout upfront. No costs discovered 3 emails later. You send one structured request. The restaurant answers it in a dashboard, and you watch the status move in real time instead of refreshing your inbox. Once it's confirmed, everyone RSVPs and splits the deposit in the same place.

<!-- Notion's image URLs are signed and expire. Replace these with the exported SVGs. -->
![Booking a large party today, without Celebrations](./assets/resy_without_celebrations_flow.svg)
![Booking a large party through Celebrations](./assets/resy_with_celebrations_flow.svg)

_Before/after: booking a large party today vs. through Celebrations._

> _[visual: key screens in sequence — preferences → matches → restaurant page → request → tracker → event → split — in device mockups]_

## Where It Landed

The scope of this project was needfinding and proposing a solution, so that's what the course asked for and what we delivered: end-to-end research across 15 users and 6 managers, a survey, synthesis, personas, current and future journey maps, and a lo-fi prototype covering the full flow on both sides.

The hi-fi prototype in this case study I built after the course, on my own, to take the proposed solution from a flow into something you can actually move through.

The honest gaps, named plainly. The solution didn't go far enough on how Celebrations protects restaurants from no-shows and last-minute cancellations, I understood that risk from the manager research but didn't fully translate it into the design. The original swipe-to-browse mechanic got fair pushback for working better as discovery than as a primary way to choose a high-stakes booking, which is why the current version uses Resy's list and map instead. And we carried one persona too many, with two that overlapped.

## What I'd Do Differently

I'd have tried to talk to someone at Resy. We understood the problem cold from the user and restaurant sides, but we never pressure-tested whether this was viable for Resy as a business. Is the 8+ gap a technical limit, a strategic choice, a resource call? I don't know, and that conversation would have made the whole solution sharper. We also debated the scope early, sit-down dinners versus standing events, bigger market versus tighter problem, and chose to focus on 8-15 sit-down. I still think that was right, but I'd defend it out loud rather than leave it implicit.

## What This Taught Me

This was my first two-sided problem, and I didn't really understand what that meant until I was inside it. The moment the restaurant side came in, almost every decision I'd made for the user had to be reconsidered. You can't design one side of a transaction well without understanding what the other side actually needs.
