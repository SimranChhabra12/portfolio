import { T } from "../tokens";

// Two columns that answer the two questions a reader has in the first ten
// seconds: what is this thing, and what did she actually do on it.

const COLUMNS: { heading: string; body: string }[] = [
  {
    heading: "What is Whspr?",
    body:
      "Whspr is a mobile app that makes what women already know about places in the city findable, collecting short first-hand accounts instead of star ratings, and tagging each one with the time of the visit so you can tell what a place is actually like before you go.",
  },
  {
    heading: "My Role",
    body:
      "I led this end to end: the interview study, the information architecture, the contribution flow, the trust and verification system, visual design system and a prototype using AI.",
  },
];

export default function WhatAndRole() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
      {COLUMNS.map((c) => (
        <div key={c.heading} className="min-w-0">
          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 1.4rem + 1.5vw, 2.375rem)",
              lineHeight: 1.15,
              color: T.ink,
              margin: 0,
              marginBottom: "1.25rem",
            }}
          >
            {c.heading}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: T.type.body,
              lineHeight: 1.65,
              color: T.ink,
              margin: 0,
            }}
          >
            {c.body}
          </p>
        </div>
      ))}
    </div>
  );
}
