"use client";

interface FlowStep {
  step: string;
  note: string;
  isPainPoint?: boolean;
}

interface FlowComparisonProps {
  before: FlowStep[];
  after: FlowStep[];
  color: string;
}

export default function FlowComparison({ before, after, color }: FlowComparisonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden">
      {/* Before */}
      <div className="bg-cream p-8 lg:p-10">
        <p className="text-xs uppercase tracking-widest text-ink-muted mb-8">
          Current Resy — groups of 8+
        </p>
        <ol className="flex flex-col gap-0">
          {before.map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0 pt-0.5">
                <div
                  className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.isPainPoint ? "#fee2e2" : "transparent" }}
                >
                  <span className="text-[10px] font-medium text-ink-muted">{i + 1}</span>
                </div>
                {i < before.length - 1 && (
                  <div className="w-px flex-1 bg-ink/10 my-2" style={{ minHeight: "24px" }} />
                )}
              </div>
              <div className={`pb-6 ${i === before.length - 1 ? "pb-0" : ""}`}>
                <p className="font-medium text-sm text-ink leading-snug">{item.step}</p>
                <p className="text-ink-muted text-xs leading-relaxed mt-1">{item.note}</p>
                {item.isPainPoint && (
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-red-400 border border-red-200 rounded px-2 py-0.5">
                    friction
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* After */}
      <div className="p-8 lg:p-10" style={{ backgroundColor: `${color}08` }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: color }}>
          Resy Celebrations
        </p>
        <ol className="flex flex-col gap-0">
          {after.map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0 pt-0.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-[10px] font-medium text-white">{i + 1}</span>
                </div>
                {i < after.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ minHeight: "24px", backgroundColor: `${color}30` }} />
                )}
              </div>
              <div className={`pb-6 ${i === after.length - 1 ? "pb-0" : ""}`}>
                <p className="font-medium text-sm text-ink leading-snug">{item.step}</p>
                <p className="text-ink-muted text-xs leading-relaxed mt-1">{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
