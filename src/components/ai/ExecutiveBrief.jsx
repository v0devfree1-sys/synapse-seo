import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Executive brief — synthesized summary of all AI findings.
export default function ExecutiveBrief({ brief, stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="surface p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "rgba(217,70,239,0.12)", border: "1px solid rgba(217,70,239,0.25)" }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-secondary)" }} />
        </div>
        <span className="eyebrow">Executive Brief</span>
      </div>
      <p className="text-[15px] leading-relaxed text-foreground">{brief}</p>
      <div className="mt-4 flex flex-wrap gap-4 border-t border-[var(--border-subtle)] pt-3">
        <span className="font-mono text-[11px] text-fg-secondary">
          <span className="tabular text-foreground">{stats.total}</span> insights
        </span>
        <span className="font-mono text-[11px]" style={{ color: "var(--critical)" }}>
          <span className="tabular">{stats.highImpact}</span> high impact
        </span>
        <span className="font-mono text-[11px]" style={{ color: "var(--info)" }}>
          <span className="tabular">{stats.opportunities}</span> opportunities
        </span>
        <span className="font-mono text-[11px]" style={{ color: "var(--accent-secondary)" }}>
          <span className="tabular">{stats.patterns}</span> patterns
        </span>
        <span className="font-mono text-[11px] text-fg-secondary">
          avg confidence <span className="tabular text-foreground">{stats.avgConfidence}%</span>
        </span>
      </div>
    </motion.div>
  );
}
