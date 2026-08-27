export default function SectionTransition({ className }: { className: string }) {
  return <div aria-hidden className={`h-[var(--section-transition)] ${className}`} />;
}
