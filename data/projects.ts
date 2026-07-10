export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  disciplines: string[];
  color: string; // card accent color
  tagline: string;
  meta: {
    team: string;
    researchMethods: string[];
    platform: string;
    duration: string;
  };
  prototypeUrl?: string;
  overview: {
    problem: string;
    role: string;
    tools: string[];
  };
  objectives: { title: string; body: string }[];
  sections: Section[];
  insights: { insight: string; recommendation: string }[];
  outcomePositive: string[];
  outcomeGrowth: string[];
  learnings: { title: string; body: string }[];
  next: string; // slug of next project
}

export interface Section {
  type: "text" | "highlight" | "findings" | "metrics";
  heading: string;
  body?: string;
  items?: string[];
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    slug: "whspr",
    title: "Whspr",
    subtitle:
      "A crowdsourced urban intelligence platform for women navigating city spaces",
    role: "Product Lead & Designer",
    year: "2026",
    disciplines: ["Product Design", "Full-Stack", "AI Integration"],
    color: "#1B1B2F",
    tagline:
      "The knowledge women already share with each other, finally somewhere to live.",
    meta: {
      team: "Solo \u2014 product lead & designer",
      researchMethods: ["User Interviews", "Secondary Research", "Competitive Analysis"],
      platform: "Mobile Web App",
      duration: "6 sprints",
    },
    overview: {
      problem:
        "It started with something I kept doing without noticing. Every time I went somewhere new at night, I'd text three friends before leaving. \u201cIs this bar okay to go to alone?\u201d \u201cWhat's the vibe there at night?\u201d Yelp doesn't answer that. Neither does Google Maps. That knowledge lives in DMs and disappears the second the conversation ends. 81% of women have experienced harassment in a public space. 70% text or call someone to share their whereabouts when going out alone. That's not an edge case, that's baseline behavior for most women I know, myself included. Whspr exists to make that knowledge findable instead of letting it disappear.",
      role: "I led the research, the product decisions, and the interaction design end to end \u2014 the interview study, the information architecture, the contribution flow, the trust and verification system, and the visual design system. I built the Claude Code prototype solo.",
      tools: [
        "Next.js + Vercel",
        "Supabase (Postgres)",
        "Mapbox API",
        "OpenAI GPT-4o-mini",
        "NYC Open Data (NYPD)",
        "Figma",
      ],
    },
    objectives: [
      {
        title: "Surface Hidden Knowledge",
        body: "Make the safety knowledge women already share in DMs and group chats findable by anyone, not just the people already in that chat.",
      },
      {
        title: "Avoid Alarmism",
        body: "Build something that helps women navigate a city with more confidence, not something that makes the city feel scarier.",
      },
      {
        title: "Design for Trust",
        body: "Let anyone browse freely, but require real verification to contribute, so the feed stays credible without needing heavy moderation.",
      },
    ],
    sections: [
      {
        type: "text",
        heading: "The Research",
        body: "Secondary research pointed to three things: perceived safety, not crime data, drives how women move through a city, and familiarity is the strongest predictor of it. Interviews with women in NYC confirmed the behavior was already happening informally \u2014 warnings in group chats, not public reviews, because that felt exposing. Trust and anonymity were conditions for contributing, not nice-to-haves.",
      },
      {
        type: "metrics",
        heading: "Why This Matters",
        metrics: [
          { label: "Have experienced harassment in public", value: "81%" },
          { label: "Share whereabouts when out alone", value: "70%" },
        ],
      },
      {
        type: "highlight",
        heading: "The Reframe",
        body: "I went in thinking this was a safety problem. It's not, not only. It's a knowledge problem. Women already track and share and warn each other \u2014 what's missing is somewhere for that knowledge to live that doesn't flatten it into a star rating or amplify it into fear.",
      },
      {
        type: "text",
        heading: "The Solution",
        body: "Whspr is a crowdsourced urban intelligence platform for women navigating city spaces. Search a place and see signals \u2014 short, observational, tagged with time and context. Getting There & Back shows the real walk to transit, well lit or not, busy or not. Area Info shows what's open nearby right now. No scores. Just what someone who's actually been there noticed.",
      },
    ],
    insights: [
      {
        insight:
          "Existing safety apps like Citizen raise the salience of threat, alerting users to incidents that aren't even nearby \u2014 research on them describes users feeling more stressed and alarmist, not more prepared.",
        recommendation:
          "No star ratings. Short, observational signals tagged with context instead, so a contribution reads closer to testimony than a transaction or a fear alert.",
      },
      {
        insight:
          "Whether a piece of safety information feels credible depends heavily on who's sharing it, but asking for gender on every post adds friction people won't tolerate.",
        recommendation:
          "Gender lives on the account, not the signal. Self-declared once at sign-up, shown automatically after.",
      },
      {
        insight:
          "Anonymity was a condition for contributing, but so was trust \u2014 interviewees wanted to read from people they could trust, not just fast content.",
        recommendation:
          "Trust is verified, not assumed. Browsing is open, posting requires ID verification, and the trust score factors in contributor history and corroboration instead of a blunt access block.",
      },
      {
        insight:
          "The women I interviewed didn't want another guess. They wanted real transit stops and real walk distances, not app-generated approximations.",
        recommendation:
          "Getting There & Back and Area Info both pull from Mapbox. Real data, not synthetic.",
      },
      {
        insight:
          "A block that's well lit at 6pm and empty at 1am isn't describable with one number.",
        recommendation:
          "Day/Night toggle instead of one blended score. Two pieces of information, kept separate.",
      },
    ],
    outcomePositive: [
      "Every interview confirmed the underlying behavior was real \u2014 not one person questioned why this needed to exist.",
      "The verification-for-trust model landed well. One participant asked about it unprompted, meaning users understand authentication as part of what makes a signal worth reading.",
    ],
    outcomeGrowth: [
      "No formal usability testing on the interface itself yet \u2014 the interviews validated the need, not the flow.",
      "The moderation and corroboration layer is designed but not live. Trust scoring exists in the data model, not yet as active weighting logic.",
    ],
    learnings: [
      {
        title: "Knowledge Needs Infrastructure, Not Invention",
        body: "The knowledge people need already exists. Most of the time it's just sitting in the wrong place \u2014 unsearchable, undervalued, or split across a hundred private conversations. Good design doesn't invent that knowledge. It gives it somewhere to live.",
      },
    ],
    next: "aira-pcos",
  },
  {
    slug: "aira-pcos",
    title: "AIRA",
    subtitle: "A circadian rhythm app for PCOS management",
    role: "Product Designer & Researcher",
    year: "2024",
    disciplines: ["UX Research", "Product Design", "Interaction Design"],
    color: "#2D2D2D",
    tagline:
      "Turning invisible hormonal struggles into visible, manageable rhythms.",
    meta: {
      team: "4-person team (shared build)",
      researchMethods: [
        "User Interviews",
        "Survey",
        "Behavioral Science Review",
        "Expert Consultation",
      ],
      platform: "Mobile App",
      duration: "12 weeks",
    },
    overview: {
      problem:
        "Women with PCOS juggle separate apps for periods, nutrition, sleep, and workouts — none of them talk to each other. The result is tracker fatigue, guilt cycles, and 80% app abandonment within 30 days. AIRA synthesizes five health pillars into a single daily score so users know exactly what their body can handle today.",
      role: "I led mixed-methods research, synthesized behavioral science frameworks, designed the core algorithm and interface, and defined the full feature specification.",
      tools: [
        "Figma",
        "Behavioral science frameworks (Fogg, Tiny Habits, COM-B)",
        "Affinity mapping",
        "Apple Health / Google Fit integration",
      ],
    },
    objectives: [
      {
        title: "Centralize Fragmented Tracking",
        body: "Replace four separate apps for periods, food, sleep, and mood with one place, because switching tools was itself part of the burnout.",
      },
      {
        title: "Design for Capacity, Not Compliance",
        body: "Build for the days someone can't follow through, not just the days they can.",
      },
      {
        title: "Remove Guilt from the Loop",
        body: "Make consistency feel optional, not mandatory, since guilt was already shown to be a reason people quit tracking tools.",
      },
    ],
    sections: [
      {
        type: "text",
        heading: "The Research",
        body: "I conducted 5 in-depth interviews with diagnosed women ages 22–35, a survey of 20+ respondents, and an expert consultation with an endocrinologist. Three patterns emerged immediately.",
      },
      {
        type: "metrics",
        heading: "Survey & Interview Findings",
        metrics: [
          { label: "PCOS survey respondents", value: "13" },
          { label: "In-depth interviews", value: "5" },
          { label: "Majority age range", value: "25–34" },
          { label: "Endocrinologist consults", value: "1" },
        ],
      },
      {
        type: "text",
        heading: "The Solution",
        body: "AIRA introduces the Hormonal Readiness Score — a daily 0\u2013100 metric calculated from sleep, insulin load, cortisol, and cycle phase. The morning check-in takes 60 seconds: the app pulls data from Apple Health, asks \u201cWired or Tired?\u201d, and surfaces the score alongside a 24-hour Energy Wave showing peak windows and cravings danger zones. Every recommendation adapts to the score — yoga on a 40/100 day, HIIT on an 85/100 day.",
      },
      {
        type: "highlight",
        heading: "Core Algorithm",
        body: "Hormonal Readiness = (Sleep Capacity) − (Insulin Load) − (Cortisol Load) + (Restorative Bonus). The formula translates complex hormonal data into a single battery-level metaphor users immediately understand.",
      },
      {
        type: "findings",
        heading: "Key Features",
        items: [
          "Hormonal Readiness Gauge — visual daily score with contextual insight",
          "Energy Wave — scrollable 24-hour circadian visualization with drag-to-adjust sleep handles",
          "Correlation Charts — Cortisol Connection scatter plot, Insulin Loop bar chart, Cycle Predictor heatmap",
          "Non-judgmental logging — photo-based meals, no calorie counts, compassionate prompts",
          "Dark mode first — optimized for PCOS users with migraines and photophobia",
        ],
      },
    ],
    insights: [
      {
        insight:
          "\u201cI don\u2019t have the brain space to figure out alternatives,\u201d one participant said, describing the daily decision fatigue of eating well with PCOS on top of everything else in her day.",
        recommendation:
          "Non-judgmental, photo-based food logging instead of open tracking \u2014 curated suggestions that remove the decision, not just the judgment.",
      },
      {
        insight:
          "\u201cSome days I just sleep the whole day,\u201d the same participant said about her lowest-energy days. Both the Fogg Behavior Model and COM-B point to the same thing here: ability and capability, not motivation, are what's missing on those days.",
        recommendation:
          "Readiness Score over a streak counter. It reflects what the body can handle today instead of punishing the days it can't.",
      },
      {
        insight:
          "Asked what a magic-wand fix would look like, she asked for an energy management system \u2014 something to log when energy dropped and what caused it.",
        recommendation:
          "The Energy Wave \u2014 a pattern-over-time visualization built almost directly from that answer, not a single mood number.",
      },
      {
        insight:
          "Survey respondents named low energy, feeling overwhelmed, and \u2018no immediate results\u2019 as the top reasons habits break \u2014 the exact motivation-decay curve behavioral science predicts for slow-progress conditions.",
        recommendation:
          "Weekly small-wins summaries instead of streaks, grounded in COM-B's motivation pillar and Self-Determination Theory.",
      },
      {
        insight:
          "\u201cNot more than once a week, maybe once in two weeks,\u201d she said when asked how often check-ins should happen \u2014 more than that, and she'd start ignoring them the way she already ignores her phone's reminders.",
        recommendation:
          "A tapered nudge system: higher frequency during onboarding when motivation is naturally high, dropping to one weekly reflection after.",
      },
    ],
    outcomePositive: [
      "The core premise \u2014 PCOS needs multi-symptom, non-judgmental management \u2014 held up across every interview and the survey.",
      "Nobody questioned why mood tracking was missing from existing tools once it was pointed out.",
    ],
    outcomeGrowth: [
      "No confirmed prototype or usability testing yet \u2014 this validated the need, not the interface.",
      "The Readiness Score formula and phase/season toggle haven't been tested with anyone yet.",
    ],
    learnings: [
      {
        title: "One Number Can't Replace a Body",
        body: "A condition that shows up differently in every person needs a tool that doesn't moralize consistency. Health isn't one number, and neither is a good day.",
      },
    ],
    next: "resy",
  },
  {
    slug: "resy",
    title: "Resy Celebrations",
    subtitle: "A large-party booking feature for the Resy platform",
    role: "UX Researcher & Product Designer",
    year: "2024",
    disciplines: ["UX Research", "Feature Design", "Service Design"],
    color: "#C4472A",
    tagline:
      "Bringing the clarity of a one-click reservation to large-group dining.",
    meta: {
      team: "4-person team",
      researchMethods: [
        "User Interviews",
        "Restaurant Manager Interviews",
        "Survey",
        "Affinity Mapping",
        "Journey Mapping",
      ],
      platform: "Mobile App (iOS/Android)",
      duration: "8 weeks",
    },
    prototypeUrl: "https://resy-celebrations-portfolio.surge.sh",
    overview: {
      problem:
        "Booking for 8+ people on Resy ends the same way every time: an email. Users wait days for back-and-forth clarification on minimums, floor plans, and menus. Restaurants spend hours on coordination they could automate. The Celebrations feature closes that gap.",
      role: "Co-lead researcher on a 4-person team. I led the research plan, conducted user and restaurant manager interviews, and co-designed the Celebrations feature concept.",
      tools: [
        "Figma",
        "User interviews",
        "Competitive analysis",
        "Journey mapping",
        "Affinity mapping",
      ],
    },
    objectives: [
      {
        title: "Serve Both Sides",
        body: "Design for restaurants and guests at once \u2014 the two sides needed completely different things from the same booking.",
      },
      {
        title: "Replace Email With Structure",
        body: "Turn an open-ended email thread into a structured flow both sides could actually act on.",
      },
      {
        title: "Filter for Real Options Only",
        body: "Show guests only restaurants that could actually accommodate them, before they reach out.",
      },
    ],
    sections: [
      {
        type: "text",
        heading: "Dual-Perspective Research",
        body: "I interviewed both sides of the transaction — NYC users (students and young professionals) and restaurant managers at three Brooklyn restaurants. This revealed a fundamental mismatch: users wanted instant transparency, restaurants needed structured context before committing. Neither the current email workflow nor the app's hard cap at 6 seats served either side.",
      },
      {
        type: "metrics",
        heading: "Survey Findings",
        metrics: [
          { label: "Contact restaurants directly for large groups", value: "93%" },
          { label: "Only learned minimums after reaching out", value: "67%" },
        ],
      },
      {
        type: "findings",
        heading: "What Users Needed",
        items: [
          "Minimum spend, floor plans, and sample menus visible before reaching out",
          "One-click confirmation comparable to a regular reservation",
          "Budget filters to compare restaurants without hidden-cost surprises",
          "Confidence that their date won't disappear during email delays",
        ],
      },
      {
        type: "findings",
        heading: "What Restaurants Needed",
        items: [
          "Event type upfront — a birthday and a corporate happy hour require different staffing and layouts",
          "A structured intake form in-app instead of open-ended email threads",
          "Protection from last-minute cancellations that cost thousands in missed turnovers",
          "\u201cIf guests saw pricing and policies before emailing us, that would filter out groups who aren\u2019t serious.\u201d",
        ],
      },
      {
        type: "text",
        heading: "The Solution",
        body: "Celebrations is a dedicated section within Resy for 8+ reservations. A filterable restaurant grid surfaces spend minimums, event policies, and sample menus upfront. A structured inquiry form — party size, event type, dietary needs, budget range — replaces the email chain. Restaurants respond through Resy's dashboard, keeping the full loop in-platform.",
      },
      {
        type: "metrics",
        heading: "Research Validation",
        metrics: [
          { label: "User interviews", value: "5+" },
          { label: "Restaurant interviews", value: "3" },
          { label: "Concept directions tested", value: "3" },
          { label: "Email steps eliminated", value: "4–6" },
        ],
      },
    ],
    insights: [
      {
        insight:
          "We almost didn't interview restaurant managers, but once we did, the problem changed. They weren't refusing large bookings \u2014 they were doing work Resy had no infrastructure for at all.",
        recommendation:
          "Celebrations as a separate mode, not a filter. Large-group bookings are a different kind of transaction, with different information needs and higher stakes for both sides.",
      },
      {
        insight:
          "Users were reaching out to restaurants that couldn't accommodate them, only to find out 2\u20133 emails in.",
        recommendation:
          "Preference-first discovery \u2014 event type, party size, date, budget, and vibe collected before any results appear, so every result is already a real option.",
      },
      {
        insight:
          "People weren't overwhelmed by the process itself \u2014 they were overwhelmed by not having the right information at the right moment.",
        recommendation:
          "Swipe-based restaurant cards showing minimum spend, capacity, and layout previews up front, one option at a time.",
      },
      {
        insight:
          "\u201cIf guests saw pricing and policies before emailing us, that would filter out groups who aren\u2019t serious,\u201d one restaurant manager said directly.",
        recommendation:
          "A structured booking request replaces the open email \u2014 restaurants get full context without needing follow-up questions, and users get a progress tracker instead of silence.",
      },
      {
        insight:
          "Every manager said the same thing: the email itself wasn't the problem, it was that there was nowhere else for that conversation to happen.",
        recommendation:
          "A manager dashboard gives restaurants a structured version of the same exchange \u2014 accept, modify, or decline without touching their inbox.",
      },
    ],
    outcomePositive: [
      "Delivered end-to-end research: consumer and restaurant manager interviews, a survey, affinity mapping, personas, journey mapping, and a full lo-fi prototype for both sides of the booking flow.",
      "Feedback from professor and class was largely positive on the overall direction.",
    ],
    outcomeGrowth: [
      "Didn't go far enough in showing how Celebrations protects restaurants from no-shows and last-minute cancellations \u2014 understood the restaurant side through research but didn't fully translate that into the design.",
      "The swipe mechanic got fair pushback \u2014 some reviewers felt it worked better as a discovery tool than a primary interaction pattern.",
    ],
    learnings: [
      {
        title: "Designing for Two Sides at Once",
        body: "This was my first time working on a two-sided problem, and I didn't fully understand what that meant until we were in it. Once the restaurant side came in, almost every decision we'd made about the user had to be reconsidered. You can't design for one without understanding what the other actually needs.",
      },
    ],
    next: "gesture-sketch",
  },
  {
    slug: "gesture-sketch",
    title: "GestureSketch",
    subtitle: "A webcam-driven mid-air drawing tool for expressive therapy",
    role: "Designer & Developer",
    year: "2024",
    disciplines: ["Interaction Design", "Prototyping", "ML Integration"],
    color: "#3D5A80",
    tagline: "Drawing without touching anything — just your hands and a camera.",
    meta: {
      team: "Solo",
      researchMethods: ["Prototype Testing", "Expert Review"],
      platform: "Browser-based (Webcam)",
      duration: "6 weeks",
    },
    overview: {
      problem:
        "Conventional drawing apps require styluses, menus, and technical confidence. For therapy clients seeking expressive creative outlets, this friction kills the flow before it starts. GestureSketch strips the interface down to a single camera and a set of natural hand gestures.",
      role: "Full-stack designer and developer — research, interaction design, prototyping, and implementation.",
      tools: [
        "MediaPipe (hand landmark detection)",
        "p5.js (real-time stroke rendering)",
        "Figma",
        "SVG export",
      ],
    },
    objectives: [
      {
        title: "Remove the Learning Curve",
        body: "Let someone start drawing with zero onboarding \u2014 no styluses, no menus, no tutorial needed.",
      },
      {
        title: "Keep the Interface Invisible",
        body: "Nothing on screen should interrupt creative flow once someone starts.",
      },
      {
        title: "Validate with Real Practitioners",
        body: "Test the concept with someone who'd actually use it in a clinical setting, not just other designers.",
      },
    ],
    sections: [
      {
        type: "text",
        heading: "Interaction Model",
        body: "I designed a three-gesture vocabulary that maps to natural hand movements: index finger + thumb pinch to draw, thumb + ring finger to cycle colors, thumb + pinky to undo. Button backups for undo and clear sit at screen edges as a confidence-building safety net for new users.",
      },
      {
        type: "highlight",
        heading: "Therapist Validation",
        body: "An art therapist reviewed the prototype and praised its ability to bridge the digital/human connection in online therapy sessions. The naturalness of mid-air gestures made the tool feel less like software and more like an expressive medium.",
      },
      {
        type: "findings",
        heading: "Technical Architecture",
        items: [
          "MediaPipe hand-landmark model running in-browser at 60fps",
          "p5.js canvas for real-time stroke rendering",
          "Gesture buffer system with configurable dead-zones to prevent false triggers",
          "Per-stroke metadata storage (color, size, timestamp)",
        ],
      },
      {
        type: "metrics",
        heading: "By the Numbers",
        metrics: [
          { label: "Gestures in vocabulary", value: "3" },
          { label: "Frames per second", value: "60" },
          { label: "Therapy validation", value: "✓" },
          { label: "v2 roadmap items", value: "4" },
        ],
      },
    ],
    insights: [
      {
        insight:
          "Natural hand movement isn't pixel-precise \u2014 a raw gesture-to-draw mapping picked up every small jitter as an unwanted mark.",
        recommendation:
          "Dead-zones around each gesture trigger absorb jitter from natural hand movement without dulling responsiveness.",
      },
      {
        insight:
          "New users don't trust a gesture interface at first \u2014 they need to know undo will actually work before they'll draw freely.",
        recommendation:
          "Button backups for undo and clear sit at the screen edges as a confidence-building safety net alongside the gesture vocabulary.",
      },
      {
        insight:
          "Any UI chrome \u2014 toolbars, menus, settings \u2014 broke the sense of just drawing in the air.",
        recommendation: "Minimal UI. No toolbars, no menus, nothing that interrupts creative flow.",
      },
      {
        insight:
          "Early LLM-prompt features weren't reliable enough to ship without undermining trust in the core drawing experience.",
        recommendation:
          "Deferred LLM prompts to v2 and shipped a clean, fast drawing core first.",
      },
    ],
    outcomePositive: [
      "An art therapist reviewed the prototype and praised its ability to bridge the digital/human connection in online therapy sessions.",
      "The naturalness of mid-air gestures made the tool feel less like software and more like an expressive medium.",
    ],
    outcomeGrowth: [
      "LLM-assisted prompts were cut from v1 after tuning issues \u2014 still on the roadmap for v2.",
      "Only tested with one therapist so far \u2014 needs validation with actual therapy clients, not just the practitioner.",
    ],
    learnings: [
      {
        title: "Constraints Make Interfaces Feel Natural",
        body: "Stripping away every piece of UI chrome was scarier than adding features would have been, but it's what made the tool feel like a medium instead of software.",
      },
    ],
    next: "whspr",
  },
];

export default projects;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
