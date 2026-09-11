import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const intentTone = {
  Informational: "var(--info)",
  Commercial: "var(--warning)",
  Transactional: "var(--accent-brand)",
  Navigational: "var(--success)",
};

// Content gaps — uncovered topics ranked by demand vs difficulty.
export default function ContentGaps({ gaps }) {
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Content Gaps</div>
      <div className="flex flex-col gap-3">
        {gaps.map((g, i) => (
          <motion.div
            key={g.topic}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold">{g.topic}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase" style={{ color: intentTone[g.intent] }}>
                {g.intent}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-4 font-mono text-[10px] text-fg-secondary">
              <span className="flex items-center gap-1.5">
                demand
                <span className="inline-block h-1 w-14 overflow-hidden rounded-full bg-[var(--surface-2)] align-middle">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: `${g.demand}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                    className="block h-full rounded-full bg-[var(--info)]"
                  />
                </span>
                {g.demand}
              </span>
              <span className="flex items-center gap-1.5">
                difficulty
                <span className="inline-block h-1 w-14 overflow-hidden rounded-full bg-[var(--surface-2)] align-middle">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: `${g.difficulty}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                    className="block h-full rounded-full bg-[var(--warning)]"
                  />
                </span>
                {g.difficulty}
              </span>
            </div>
            <div className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-fg-secondary">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0" style={{ color: "var(--accent-secondary)" }} />
              {g.ai}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}