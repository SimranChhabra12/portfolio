export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  disciplines: string[];
  color: string; // card accent color
  tagline: string;
  overview: {
    problem: string;
    role: string;
    tools: string[];
    timeline: string;
  };
  sections: Section[];
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
    slug: "aira-pcos",
    title: "AIRA",
    subtitle: "A circadian rhythm app for PCOS management",
    role: "Product Designer & Researcher",
    year: "2024",
    disciplines: ["UX Research", "Product Design", "Interaction Design"],
    color: "#2D2D2D",
    tagline:
      "Turning invisible hormonal struggles into visible, manageable rhythms.",
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
      timeline: "12 weeks",
    },
    sections: [
      {
        type: "text",
        heading: "The Research",
        body: "I conducted 5 in-depth interviews with diagnosed women ages 22–35, a survey of 20+ respondents, and an expert consultation with an endocrinologist. Three patterns emerged immediately.",
      },
      {
        type: "findings",
        heading: "Key Findings",
        items: [
          'The Guilt Cycle — users internalize symptoms as moral failures, not biological realities. \u201cI feel like I\u2019m fighting my own body every single day.\u201d',
          "The Energy Gap — users don't want to track habits; they want to track biological capacity. They need permission to rest, not a reminder that they failed.",
          "Cycle Awareness as Validation — understanding why symptoms happen (e.g., \u201cIt\u2019s because I\u2019m ovulating\u201d) is a more powerful motivator than any streak counter.",
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
      {
        type: "metrics",
        heading: "Outcomes",
        metrics: [
          { label: "Pillars unified", value: "5" },
          { label: "User interviews", value: "5" },
          { label: "Survey respondents", value: "20+" },
          { label: "MVP features defined", value: "8" },
        ],
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
      timeline: "8 weeks",
    },
    sections: [
      {
        type: "text",
        heading: "Dual-Perspective Research",
        body: "I interviewed both sides of the transaction — NYC users (students and young professionals) and restaurant managers at three Brooklyn restaurants. This revealed a fundamental mismatch: users wanted instant transparency, restaurants needed structured context before committing. Neither the current email workflow nor the app's hard cap at 6 seats served either side.",
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
      timeline: "6 weeks",
    },
    sections: [
      {
        type: "text",
        heading: "Interaction Model",
        body: "I designed a three-gesture vocabulary that maps to natural hand movements: index finger + thumb pinch to draw, thumb + ring finger to cycle colors, thumb + pinky to undo. Button backups for undo and clear sit at screen edges as a confidence-building safety net for new users.",
      },
      {
        type: "findings",
        heading: "Key Design Decisions",
        items: [
          "Dead-zones around each gesture trigger to absorb jitter from natural hand movement",
          "Immutable strokes — each stroke stores its own size and color, preventing accidental overrides",
          "Minimal UI — no toolbars, no menus, nothing that interrupts creative flow",
          "SVG export for persistent, shareable creations",
          "LLM prompts deferred to v2 after tuning issues — shipped a clean, fast core first",
        ],
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
        heading: "Outcomes",
        metrics: [
          { label: "Gestures in vocabulary", value: "3" },
          { label: "Frames per second", value: "60" },
          { label: "Therapy validation", value: "✓" },
          { label: "v2 roadmap items", value: "4" },
        ],
      },
    ],
    next: "whspr",
  },
  {
    slug: "whspr",
    title: "Whspr",
    subtitle: "Gender-aware urban safety intelligence, powered by community",
    role: "Product Lead & Designer",
    year: "2026",
    disciplines: ["Product Design", "Full-Stack", "AI Integration"],
    color: "#1B1B2F",
    tagline: "Real signals. Real data. Safety intelligence that adapts to you.",
    overview: {
      problem:
        "Urban safety apps are generic — they don't account for time of day, your gender, or the lived experience of the people who actually use a space. Whspr crowdsources hyperlocal safety signals, layers them with real NYPD crime data, and generates AI summaries tailored to day/night context and gender identity.",
      role: "Product lead and designer — tech stack selection, database schema, anti-bot trust scoring system, AI integration strategy, and MVP scoping.",
      tools: [
        "Next.js + Vercel",
        "Supabase (Postgres)",
        "Mapbox API",
        "OpenAI GPT-4o-mini",
        "NYC Open Data (NYPD)",
        "Figma",
      ],
      timeline: "6 sprints",
    },
    sections: [
      {
        type: "text",
        heading: "The Product",
        body: "Users search any NYC venue or neighborhood via Mapbox autocomplete. The place profile surfaces crowdsourced signals, 90-day NYPD crime statistics, and a live AI-generated summary that regenerates when you toggle day/night or gender filter. The contribute flow collects signals through a 3-step form after a lightweight sign-up that captures gender once, not on every submission.",
      },
      {
        type: "highlight",
        heading: "Trust Scoring System",
        body: "Whspr's anti-bot layer scores every signal in real time: −0.2 for accounts under 7 days old, −0.3 for burst submissions (5+ signals per hour), −0.5 for 2+ community flags. Signals below 0.4 are hidden automatically — not deleted, kept for audit. This keeps the feed credible without requiring moderation.",
      },
      {
        type: "findings",
        heading: "Key Design Decisions",
        items: [
          "Gender field on the users table (not signals) — consistent identity, single capture",
          "Real NYPD crime data over synthetic alternatives — academic credibility matters for a thesis",
          "GPT-4o-mini for LLM summaries — cheapest, fastest model that still handles nuanced tone",
          "NYC Mapbox bounding box to prevent scope creep in the MVP",
          "Seed data: 5–6 venues with 4–6 realistic signals each — quality over quantity",
        ],
      },
      {
        type: "findings",
        heading: "Four-Table Schema",
        items: [
          "users — auth, gender, account age for trust scoring",
          "places — Mapbox POI data, geocoordinates, neighborhood",
          "signals — crowdsourced submissions with trust score and flag count",
          "routes — optional route-level safety for v2 expansion",
        ],
      },
      {
        type: "metrics",
        heading: "Outcomes",
        metrics: [
          { label: "Production screens", value: "3" },
          { label: "Real data sources", value: "2" },
          { label: "Trust score variables", value: "3" },
          { label: "Sprint delivery", value: "6" },
        ],
      },
    ],
    next: "aira-pcos",
  },
];

export default projects;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
