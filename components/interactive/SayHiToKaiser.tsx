"use client";

import { useRef, useState } from "react";
import { KAISER_SUMMON, type SummonDetail } from "./KaiserCursor";

const MESSAGE = "Hi, I\u2019m Kaiser! My digital version is still a work in progress.";

/**
 * "Say hi to Kaiser" on /about. Clicking sends the cursor-companion Kaiser a
 * summon: he runs over, sits beside the button and says MESSAGE.
 *
 * He doesn't render on touch screens or under reduced motion, so the listener
 * marks the event handled; when nobody does, the same message appears here as
 * text instead. It's also always announced to screen readers, since the dog
 * himself is aria-hidden.
 */
export default function SayHiToKaiser({ className = "mt-8" }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [fallback, setFallback] = useState(false);
  const [announce, setAnnounce] = useState("");

  const summon = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const detail: SummonDetail = { x: r.left, y: r.top, w: r.width, h: r.height, message: MESSAGE, handled: false };
    window.dispatchEvent(new CustomEvent(KAISER_SUMMON, { detail }));
    setFallback(!detail.handled);
    setAnnounce(MESSAGE);
  };

  return (
    <div className={`${className} flex flex-col items-center gap-2 text-center`}>
      <button
        ref={ref}
        type="button"
        onClick={summon}
        className="t-caption text-accent underline underline-offset-4 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
      >
        Come say hi to my baby boy, Kaiser!
      </button>
      {fallback && <p className="t-caption text-mauve-deep">{MESSAGE}</p>}
      <span className="sr-only" aria-live="polite">{announce}</span>
    </div>
  );
}
