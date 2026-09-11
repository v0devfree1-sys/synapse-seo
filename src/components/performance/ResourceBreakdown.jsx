import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Page-weight composition + AI pattern detection.
export default function ResourceBreakdown({ resources, ai }) {
  const total = resources.reduce((s, r) => s + r.weight, 0);
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Page Weight · {total.toFixed(1)} MB median</div>
      <div className="flex h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
        {resources.map((r, i) => (
          <motion.div
            key={r.type}
            initial={{ width: 0 }}
            animate={{ width: `${r.share}%` }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="h-full"
            style={{ background: `hsl(var(--chart-${(i % 5) + 1}))` }}
            title={`${r.type} — ${r.weight.toFixed(1)} MB`}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
        {resources.map((r, i) => (
          <span key={r.type} className="flex items-center gap-1.5 font-mono text-[10px] text-fg-secondary">
            <span className="h-2 w-2 rounded-full" style={{ background: `hsl(var(--chart-${(i % 5) + 1}))` }} />
            {r.type} {r.weight.toFixed(1)} MB
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
        <div className="eyebrow mb-1.5">Pattern Detected</div>
        <div className="flex items-start gap-2 text-xs leading-relaxed text-fg-secondary">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-secondary)" }} />
          {ai}
        </div>
      </div>
    </div>
  );
}