---
title: GestureSketch
subtitle: AI Art Therapist
oneLiner: Concept, one piece built
role: Research, framework, interaction design, build
course: NYU · UX & AI
scope: Research, concept framework, working prototype
builtWith: p5.js · HandPose
live: https://simranchhabra12.github.io/gesturedrawing
---

# Art therapy works. Starting is the hard part.

**AI Art Therapist · Concept, one piece built**

Most people don't freeze because they have nothing to say. They freeze because on paper, one wrong line feels permanent, so it's easier not to begin. I wanted to see if AI could take the pressure off the mechanics without taking over the meaning. I mapped where AI should help and where it shouldn't, landed on three ideas, and built one.

| | |
|---|---|
| **Role** | Research, framework, interaction design, build |
| **Course** | NYU · UX & AI |
| **Scope** | Research, concept framework, working prototype |
| **Built with** | p5.js · HandPose |

## Where this started

I kept coming back to one thing about art therapy: everyone I talked to believed it could help them, and almost no one actually did it.

So I ran 7 interviews and a short survey to find out where the gap was. The answers were consistent. People didn't know how to start, they'd sit down to do something creative and feel stuck before they'd made a single mark. A lot of them were anxious about being bad at it, worried the thing they made would be judged, or would just prove they couldn't draw. And the younger people I spoke to didn't really want a person in the room for this. They wanted something private, on their own time, no one watching.

Three problems, one shape. Getting in is the hard part. Not the drawing, the starting.

> _[visual: method strip — 7 interviews + survey, then the 3 findings as a small row]_

## Where should AI actually help?

People wanted support, but the moment AI did too much, the drawing stopped being theirs. Smooth every line, fix every shape, and it's the AI's art, not yours. The whole point of art therapy is that the thing you made came from you.

So I mapped it before designing anything. One axis: how much a moment should lean on AI. The other: whether it's mechanical or personal. The split was clear. Hand off the friction, getting started, loosening up, the tools. Protect the meaning, the choices, the reflection, what the piece is about. A few things sit in between, where AI helps but you stay in control.

Build the parts that make starting easier and leave the meaning alone.

> _[visual: the 2×2 — offload to AI / keep human, across session moments. Marquee diagram, redrawn in the design system]_

## Three ideas, one built

The map pointed to three, each for a different moment in a session.

**Gesture drawing**, for starting. Draw in the air with your hand, nothing permanent, nothing to ruin.

**A prompt assistant**, for when you're stuck. Gentle nudges you could take or ignore, never an instruction.

**Audio-visual calm**, for before you begin. Sound and visuals to settle you in.

I built the first one. Starting was the problem almost everyone named, so that's where a real prototype beat a mockup.

I did try the prompt assistant, then cut it. The therapists kept saying people need to draw without being interrupted, and the AI prompts fought the quiet the drawing was there to create.

> _[visual: three solutions, 3-up — before / start / stuck. GestureSketch marked as built, prompt assistant marked as tried and cut]_

## GestureSketch

A webcam turns your hand into a brush. Pinch thumb and index to draw, tap thumb and middle to change color, tap thumb and pinky to undo. No stylus, no menus to learn, no blank sheet waiting to be ruined. You move, and a line follows.

> _[visual: GestureSketch live — the canvas mid-drawing, hand tracked. Browser mockup]_

The whole tool is built around one idea: nothing you do is permanent. Undo is a gesture, not a buried button. Clear is one tap. Every stroke keeps its own color and size, so nothing you draw later can overwrite what's already there. You can't wreck it, which is the point, that's the fear the research kept turning up, and taking it away is the whole design.

A few things I learned building it. Gestures need dead-zones, small buffers so a shaky hand doesn't jitter into a mark you didn't mean. Undo and clear also live as real buttons, not just gestures, because having a visible way out builds the confidence to make a mess in the first place. And the interface stays minimal, fewer controls, less to feel intimidated by.

It opens on a welcome screen that shows you the three gestures before you start, so the camera never turns on cold.

> _[visual: the welcome / instructions screen — already built]_

**Live:** [simranchhabra12.github.io/gesturedrawing](https://simranchhabra12.github.io/gesturedrawing)

## Five layouts, six people

The concept was decided. The interface wasn't. So I sketched five layouts, each with the tools and the AI in a different place, and showed them to 6 people one at a time.

> _[visual: the 5 layout sketches, grid. Layout 5 marked as the one that won]_

I was looking for where they agreed, and they agreed on a lot.

Color and stroke size belong together, not on opposite sides of the screen. Save and clear belong together too, and away from everything else, so you don't hit one when you meant the other. The prompt had to stay on the same screen, people said they'd forget it if it opened another page. The camera window should be the biggest thing. And undo came up a lot, some people wanted it as a gesture, not a button to hunt for.

Most people preferred Layout 5, so I built from it and added the fixes they named.

One more thing came up across almost every session: people froze at the very start, unsure which gesture actually draws. So I kept the welcome screen to one job, the three gestures and nothing else. No settings, no options, nothing to read past what you need to make your first mark.

## What it does and what it doesn't

GestureSketch is a working prototype, not a finished product, and it's the one piece of the larger concept I actually built. It does the thing it set out to do, which is make starting feel safe enough to begin. But it's early, and I haven't tested it where it would actually live, in a real session with a real client.

The closest I got was showing it to Tanak Bajaj, an art therapist in London, who saw the thing I was hoping for:

> "Clients simply move their hands to express what they're feeling, and I can watch their creations unfold in real time. It really bridges the gap that screens often put between therapist and client."

That's one therapist's reaction, not a study, so whether it holds up in actual therapy is still the open question, and it's the one that matters most.

**Where I'd take it next:**

I'd try prompts again, but built the opposite way from the ones I cut. The version I removed interrupted you mid-drawing. A better one would wait until you asked for it, on-demand, right beside the canvas, there when you're stuck and invisible when you're not. I'd add gesture-triggered shapes, so a pinch could pull in a simple circle or wave to build from when a blank canvas still feels like too much. And the real next step is proper testing with therapists and their clients, to find out whether any of this actually helps where it counts.

## What I took away

The thing I keep coming back to is the feature I removed. I built an AI prompt assistant that pushed suggestions on you while you were drawing, and it fought the quiet the drawing was supposed to create, so I took it out. What I learned wasn't that AI doesn't belong here. It was that it can't be the one deciding when to speak. The prompts weren't the problem. The interruption was.
