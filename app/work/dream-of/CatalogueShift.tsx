import { T } from "@/components/casestudy2/tokens";

const SAGE = "#6C8B6B";

// The whole case study in one figure.
//
// Left: the four products as a catalogue sorted the way a haircare brand thinks
// — by what the thing IS. Right: the same four SKUs, re-sorted by what people
// actually said when asked about their hair. Nothing is added or removed; the
// only thing that changes is what the shopper has to know to find their jar.
//
// The right-hand labels are hair states, not categories. That's the point. They
// are the language already printed on the front of every bottle, which is where
// they come from — not from quoted interview transcripts.

type Row = { type: string; state: string; product: string };

const RANGE: Row[] = [
  { type: "Dry shampoo", state: "Oily, flat roots", product: "Instant Refresh" },
  { type: "Shampoo scrub", state: "A greasy, itchy scalp", product: "Fresh Start" },
  { type: "Hair mask", state: "Frizz", product: "Smooth Route" },
  { type: "Leave-in conditioner", state: "Dry ends", product: "Soft Landing" },
];

const COL_LABEL = {
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.09em",
};

function Cell({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div
      className="px-5 py-4 flex flex-col justify-center"
      style={{ borderTop: `1px solid ${T.inkFaint}`, minHeight: 76 }}
    >
      <p
        style={{
          fontFamily: muted ? "var(--font-body)" : "var(--font-display)",
          fontStyle: muted ? "normal" : "italic",
          fontSize: muted ? "0.9375rem" : "1rem",
          color: muted ? T.inkMuted : T.ink,
          lineHeight: 1.45,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default function CatalogueShift() {
  return (
    <figure className="w-full my-2 m-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: T.inkFaint }}>
        {/* How the range was organised */}
        <div style={{ backgroundColor: T.cream }}>
          <div className="px-5 pb-4">
            <p style={{ ...COL_LABEL, color: T.inkMuted }}>How the shop was sorted</p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: T.inkMuted,
                lineHeight: 1.5,
                marginTop: "0.5rem",
              }}
            >
              By what the product is. The shopper does the translating.
            </p>
          </div>
          {RANGE.map((r) => (
            <Cell key={r.type} muted>
              {r.type}
            </Cell>
          ))}
        </div>

        {/* Sorted by hair state */}
        <div style={{ backgroundColor: "rgba(108, 139, 107, 0.06)" }}>
          <div className="px-5 pb-4">
            <p style={{ ...COL_LABEL, color: SAGE }}>The hair state it&apos;s for</p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: T.inkMuted,
                lineHeight: 1.5,
                marginTop: "0.5rem",
              }}
            >
              By what their hair is doing. The shop does the translating.
            </p>
          </div>
          {RANGE.map((r) => (
            <div
              key={r.state}
              className="px-5 py-4 flex flex-col justify-center gap-1"
              style={{ borderTop: `1px solid ${T.inkFaint}`, minHeight: 76 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: T.ink,
                  lineHeight: 1.4,
                }}
              >
                {r.state}
              </p>
              <p style={{ ...COL_LABEL, color: SAGE, letterSpacing: "0.06em" }}>{r.product}</p>
            </div>
          ))}
        </div>
      </div>

      <figcaption
        className="mt-4"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          color: T.inkMuted,
          lineHeight: 1.6,
          maxWidth: "68ch",
        }}
      >
        Same four products, same four jars. The only thing that changed is which side of the
        translation the shopper has to do — and the right-hand column is language that was
        already printed on the front of every bottle.
      </figcaption>
    </figure>
  );
}
