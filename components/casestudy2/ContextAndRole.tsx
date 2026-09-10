import type { ReactNode } from "react";
import { T } from "./tokens";

export interface RoleColumn {
  heading: string;
  body: ReactNode;
}

/**
 * The two columns that answer the two questions a reader has in the first ten
 * seconds: what is this thing, and what did she actually do on it. Sits directly
 * under the headline block on every case study.
 *
 * Kept to exactly two columns on purpose. The four-across meta grids these
 * replaced (Role / Team / Platform / Duration) answered neither question — they
 * repeated the credits already stacked beside the headline, in smaller type.
 */
export default function ContextAndRole({ columns }: { columns: RoleColumn[] }) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
      {columns.map((c) => (
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
          <div
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: T.type.body,
              lineHeight: 1.65,
              color: T.ink,
            }}
          >
            {c.body}
          </div>
        </div>
      ))}
    </div>
  );
}
