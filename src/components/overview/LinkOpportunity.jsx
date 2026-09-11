import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

// AI link opportunity — source → target with suggested anchor + reasoning.
export default function LinkOpportunity({ opp, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
      className="surface-1 group p-3.5 transition-colors hover:border-[var(--border-hover)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="eyebrow">Link Opportunity</span>
        <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "var(--accent-brand)" }}>
          <Zap className="h-3 w-3" /> {opp.score}
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span className="truncate text-fg-secondary">{opp.source}</span>
        <ArrowRight className="h-3 w-3 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span className="truncate font-medium" style={{ color: "var(--accent-brand)" }}>{opp.target}</span>
      </div>
      <div className="mt-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-0)] px-2.5 py-1.5 font-mono text-[11px] text-fg-secondary">
        anchor: <span style={{ color: "var(--foreground)" }}>"{opp.anchor}"</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-1">
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