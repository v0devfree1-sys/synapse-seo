import { motion } from "framer-motion";

// Sub-system diagnostic rail — compact horizontal bars, not identical cards.
export default function SubScoreRail({ items = [] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((s, i) => {
        const tone = s.value >= 85 ? "var(--success)" : s.value >= 70 ? "var(--warning)" : "var(--critical)";
        const up = s.value > s.prev;
        return (
          <div key={s.key} className="group">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="eyebrow">{s.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="tabular font-mono text-sm font-semibold" style={{ color: tone }}>{s.value}</span>
                {up && (
                  <span className="font-mono text-[10px]" style={{ color: "var(--success)" }}>▲{s.value - s.prev}</span>
                )}
              </div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${tone}, ${tone}cc)` }}
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}