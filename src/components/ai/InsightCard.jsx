import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const kindTone = {
  "High Impact": "var(--critical)",
  Opportunity: "var(--info)",
  "Pattern Detected": "var(--accent-secondary)",
  Risk: "var(--warning)",
};

// One AI insight — kind badge, confidence, body, affected scope, investigate action.
export default function InsightCard({ insight, index }) {
  const tone = kindTone[insight.kind] || "var(--fg-secondary)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: "easeOut" }}
      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-0)] p-3.5 transition-colors hover:border-[var(--border)]"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider" style={{ color: tone }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
          {insight.kind}
        </span>
        <div className="flex items-center gap-3 font-mono text-[10px] text-fg-secondary">
          <span>impact <span style={{ color: "var(--foreground)" }}>{insight.impact}</span></span>
          <span>confidence <span className="tabular" style={{ color: "var(--foreground)" }}>{insight.confidence}%</span></span>
        </div>
      </div>
      <p className="mb-1 text-sm font-medium leading-snug">{insight.title}</p>
      <p className="text-[13px] leading-relaxed text-fg-secondary">{insight.body}</p>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-fg-secondary">{insight.affected}</span>
        <button className="inline-flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>
          Investigate <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
