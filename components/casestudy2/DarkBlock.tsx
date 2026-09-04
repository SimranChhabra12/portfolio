import { T } from "./tokens";

export default function DarkBlock({
  bg,
  children,
  label,
}: {
  bg: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      className="my-2"
      style={{
        backgroundColor: bg,
        borderRadius: T.radius.darkBlock,
        padding: "clamp(1.5rem, 1rem + 2.5vw, 3rem)",
      }}
    >
      {label && (
        <p
          className="mb-6"
          style={{
            fontSize: T.type.caption,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
