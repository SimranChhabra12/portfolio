import { T } from "../tokens";

const W = T.whsprLight;

// The contribution friction model as two columns: the prompts a contributor
// answers, and the account the next woman reads. Each answer shows up once, as a
// tag on the post, so the payoff reads without repeating the inputs.

const PROMPTS = [
  "Have you been here before?",
  "When were you there?",
  "Were you alone or with people?",
  "What is it about?",
  "What happened? Type it or say it.",
];

const TAGS = ["First time", "Friday night", "Solo", "Getting home"];

const label = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--t-caption)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};

const hairline = "1px solid rgba(42,31,40,0.1)";

export default function FrictionModel() {
  return (
    <div
      className="w-full my-2"
      style={{
        backgroundColor: W.midnight,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)",
      }}
    >
      <p style={{ ...label, fontSize: "var(--t-caption)", color: W.amber, marginBottom: "0.5rem" }}>
        The contribution friction model
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.dusk400, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        5 prompts before you post, and what they turn into.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p style={{ ...label, color: W.dusk500, paddingBottom: "0.75rem", borderBottom: hairline }}>What you answer</p>
          <ol className="list-none m-0 p-0">
            {PROMPTS.map((q, i) => (
              <li key={q} className="flex gap-4 items-baseline py-3.5" style={{ borderBottom: hairline }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--t-body)", color: W.amber, minWidth: "1.25rem" }}>
                  {i + 1}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.textLight, lineHeight: 1.5 }}>{q}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p style={{ ...label, color: W.dusk500, paddingBottom: "0.75rem", borderBottom: hairline, marginBottom: "1.25rem" }}>
            What the next woman reads
          </p>
          <figure className="m-0 p-6 flex flex-col gap-4" style={{ backgroundColor: W.surface1, borderRadius: 14 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", fontWeight: 500, color: W.textLight }}>
              Schmuck, East Village
            </p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t, i) => (
                <span
                  key={t}
                  className="rounded-full"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--t-caption)",
                    padding: "3px 10px",
                    color: i === TAGS.length - 1 ? W.amber : W.dusk400,
                    backgroundColor: i === TAGS.length - 1 ? "#F7E6D4" : W.midnight,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <blockquote
              className="m-0"
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-body)", color: W.textLight, lineHeight: 1.55 }}
            >
              &ldquo;Gets loud after 10pm, but it&apos;s easy to get a cab after midnight.&rdquo;
            </blockquote>
          </figure>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-caption)", color: W.dusk400, lineHeight: 1.6, marginTop: "1.25rem" }}>
            A star rating would have said 4.2. This says who went, when, and what it was about.
          </p>
        </div>
      </div>
    </div>
  );
}
