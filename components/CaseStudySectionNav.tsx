"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

export default function CaseStudySectionNav({ items, color }: { items: NavItem[]; color: string }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav className="hidden xl:flex flex-col gap-1 sticky top-32 self-start w-48 shrink-0">
      {items.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
            }}
            className="flex items-center gap-3 py-1.5 transition-colors group"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
              style={{
                backgroundColor: isActive ? color : "transparent",
                border: `1.5px solid ${isActive ? color : "var(--mauve)"}`,
                transform: isActive ? "scale(1.2)" : "scale(1)",
              }}
            />
            <span
              className="label transition-colors duration-200 leading-tight"
              style={{ color: isActive ? "var(--ink)" : "var(--mauve)" }}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
