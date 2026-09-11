import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const equityTone = {
  High: "var(--success)",
  Medium: "var(--warning)",
  Low: "var(--fg-secondary)",
};

// AI-suggested internal link opportunity — source → target with anchor + reasoning.
export default function LinkOpportunityCard({ opp, index = 0 }) {
  const tone = equityTone[opp.equity] || "var(--fg-secondary)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: "easeOut" }}
      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-0)] p-3 transition-colors hover:border-[var(--border-hover)]"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "var(--accent-brand)" }}>
          <Zap className="h-3 w-3" /> {opp.score}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: tone }}>
          {opp.equity} equity
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span className="truncate text-fg-secondary">{opp.source}</span>
        <ArrowRight className="h-3 w-3 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span className="truncate font-medium" style={{ color: "var(--accent-brand)" }}>{opp.target}</span>
      </div>
      <div className="mt-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-1)] px-2.5 py-1.5 font-mono text-[11px] text-fg-secondary">
        anchor: <span style={{ color: "var(--foreground)" }}>"{opp.anchor}"</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1">
        {opp.reason.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-fg-secondary">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent-brand)" }} />
            {r}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
