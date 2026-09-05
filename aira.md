---
title: AIRA
oneLiner: A lifestyle-management app for living with PMOS
hats: [UX Research, Product Design, Prototyping]
platform: Mobile Application
context: UX class project on habit change
---

# AIRA

**A lifestyle-management app for living with PMOS**

## What is PMOS?

PMOS (polyendocrine metabolic ovarian syndrome, renamed from PCOS in 2026) is a hormonal and metabolic condition. It shows up differently for everyone: irregular cycles, insulin resistance, fatigue, weight changes, acne, mood swings. There's no cure. It's managed, day to day, through habits.

> **1 in 8 women** affected — more than **170 million worldwide** (Endocrine Society, 2026)
>
> **Up to 70%** of cases go undiagnosed (WHO)

## The problem

PMOS is hard to manage because it's hard to even understand. It presents differently in everyone, so figuring out how it shows up in one person is its own ongoing task. And managing it means changing several habits at once, food, sleep, movement, stress, cycle, all of which affect each other.

The tools don't help much. Each habit lives in a separate app, and none of them connect. Even wearables only capture a slice, like steps and sleep, not the fuller picture of cycle, nutrition, and symptoms that PMOS involves, and they remain out of reach for a lot of people. So people track constantly and still can't see how it all fits together, and most eventually fall off.

That full picture is the point. With no cure, managing PMOS comes down to spotting patterns, what sets off symptoms, what actually helps. Connected data could reveal those patterns. Scattered across apps, it stays noise.

> _[visual: line illustration of an overwhelmed woman surrounded by the many things she manages]_

## My role & the team

AIRA began as a project for a UX class on habit change. We chose PMOS because it lives almost entirely in daily habit work, and because the people living with it are badly served by what already exists. It was also personal. I have it, and one of my teammates is diabetic, so we knew a lot of this firsthand.

The team built AIRA around seven connected health pillars and a single daily readiness score, instead of a pile of separate charts to make sense of alone. My teammates did onboarding, sleep, mood, and the help section. I owned cycle tracking, nutrition, activity, and the dashboard.

## Research

We ran a short survey (25 responses, 13 from women with PMOS) and three interviews, alongside secondary research grounded in behavior-change models like Fogg and COM-B. A few patterns came through clearly.

> - Nearly everyone said their symptoms "vary too much to tell" — PMOS doesn't run on a predictable schedule
> - "I start strong but can't stay consistent" was the most common reason habits fell apart
> - Most-requested support: gentle nudges during low-energy moments, and cycle-phase guidance

The interviews filled in the why. People weren't dropping habits because they didn't care. They dropped them on the days they had no energy, which for PMOS is a lot of days. And they were tired of apps that just sent reminders without any warmth.

> One participant said existing trackers like Flo and Clue "don't cheer you on."

One of those interviews changed how I approached the cycle-tracking work.

## The insight

> **"Most things feel like tasks. I'm trying to think of my cycle like seasons, four different weeks. Maybe the app could say, you're going into this week, how was your past week?" — Maitreyi, interview**

This stuck with me. She wasn't asking for a better tracker. She was describing a different way to relate to her cycle: four phases, each with its own feeling and its own needs, moving through the month like seasons.

It also solved something I'd been stuck on. Most period trackers assume a predictable cycle. Irregular cycles are one of the most commonly reported PMOS symptoms, so when someone's cycle doesn't fit the 28-day model the app is built on, the app quietly stops being useful, and it can leave the user feeling like the problem is them. The seasons framing sidesteps that. Instead of counting down to a date, it centers how each phase actually feels, which holds up whether your cycle is regular or not.

### On the seasons framing

The four phases of the menstrual cycle are often described as inner seasons, a framing rooted in the body's infradian rhythm, the roughly monthly hormonal cycle that shapes energy, mood, and metabolism. Adjusting habits to each phase, known as cycle syncing, was popularized by Alisa Vitti, who developed it while managing her own PMOS.

> _[visual: four-seasons explainer diagram — dark bg, phase colors (purple/winter, blue/spring, green/summer, coral/autumn), teaches phases → seasons → feeling of each. In AIRA palette.]_

## What I designed

I owned the cycle-tracking experience, plus the activity and nutrition pieces and the education layer. The cycle work is where the seasons insight became a real interface.

The core screen shows where you are in your cycle as a filling ring, colored by phase, with a short read on what that phase asks for that day: rest and recovery in winter, high energy and clarity in summer. The data is simple and the guidance sits right next to it, so it never becomes logging for its own sake.

### Design decision: seasons or phases

Not everyone relates to the cycle the same way. In interviews, some people naturally used metaphors like seasons; others thought in clinical terms (luteal, follicular) and wanted the facts. The CHI research on menstrual data backs this up: one of its core findings is that people want to view the signals in the way that's relevant to them, not a single default framing.

So the phase screen has a toggle. The same cycle data renders two ways: a **Seasons** view (Winter, Spring, Summer, Autumn, with the associated energy and needs) and a **Phases** view (menstrual, follicular, ovulatory, luteal, with the clinical labels). The underlying data is identical; only the framing changes.

This also covers the range of users. The Phases view is legible to anyone familiar with cycle basics. The Seasons view is the more intuitive entry point for people who don't track clinically. Neither is forced on the user.

> _[visual: Winter (M) and Menstrual Phase screens side by side in mockups, showing the toggle]_

### The Learn tab

The seasons framing only works if people understand it, so the app has a dedicated space for that. The Learn tab (the Daily Pulse) holds short, phase-tagged content: cycle science, PMOS basics, a daily fact, a quick tip. It keeps the education out of the tracking screens and gives curious users somewhere to go deeper.

> _[visual: Learn tab in mockup]_

### Nutrition

The nutrition screen handles food logging, with macro tracking and a gentle nudge when something's off ("low on protein today, try a Greek yogurt snack") rather than a guilt-trip. Logging is low-effort: you can type or just speak your meal. It's the most conventional piece of the app, and the one I'd push furthest next, toward guidance that adapts to your current phase.

> _[visual: Meal Tracking screen in mockup]_

### Activity

Logging movement ends on an encouraging note rather than a number, because the research was clear that people with PMOS fall off when tracking feels like judgment. The activity screen confirms the log and ties it back to why it matters, gently.

> _[visual: Activity Insights screen in mockup]_

## Designing the nudges

One thing came through in every interview: existing apps either nag or stay silent, and neither helps. As one participant put it, trackers like Flo and Clue "don't cheer you on."

So I looked at how to make notifications feel supportive instead of clinical. Grounded in behavior-change research (Fogg, COM-B), the nudges are built to arrive at low-energy moments and tie to behavior rather than fixed times, and to sound like encouragement, not instruction. The survey backed this: people overwhelmingly wanted gentle, well-timed prompts over rigid reminders.

> _[visual: AIRA notification screen — two warm lock-screen nudges with the mascot ("A little reflection can go a long way. Want to check in?" / "Nice work getting some movement in, your hormones love steady routines."). Optionally also the home-screen widget.]_

## What I'd do next

**A dashboard that pulls it together.** The piece I'd build next is a home screen that surfaces patterns across cycle, food, and activity in one place, so the connections become visible instead of living in separate tabs.

**Cycle-to-cycle comparison.** The CHI research on menstrual data found that comparing cycles side by side is one of the things users most want, and it matters even more for irregular cycles, where a single averaged view doesn't reflect reality. It's the clearest next step for the tracking work.

**Refining the nutrition screen** into something more personalized to each phase and each person.

## What I took away

AIRA started from something a user said almost in passing, that she'd started thinking of her cycle as seasons. The work was recognizing that offhand comment as the whole design, and building an interface that treats an irregular, personal experience as something worth designing around, instead of a problem to correct.
