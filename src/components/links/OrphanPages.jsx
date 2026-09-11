import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { statusTone } from "@/lib/seoData";

const toneColor = {
  critical: "var(--critical)",
  warning: "var(--warning)",
  success: "var(--success)",
};

// Orphan pages — zero internal links, with AI-suggested re-link hub.
export default function OrphanPages({ orphans }) {
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Orphan Pages · {orphans.length} unreachable</div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-2 pb-2 font-mono text-[10px] uppercase tracking-wider text-fg-secondary">
          <span className="flex-1">Path</span>
          <span className="w-12 text-right">Score</span>
          <span className="w-32">Suggested Hub</span>
        </div>
        {orphans.map((p, i) => {
          const tone = toneColor[statusTone(p.status)];
          return (
            <motion.div
              key={p.path}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-2 py-2.5 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-[11px] text-foreground">{p.path}</div>
                <div className="truncate text-[10px] text-fg-secondary">{p.reason}</div>
              </div>
              <span
                className="tabular w-12 shrink-0 text-right font-mono text-xs"
                style={{ color: p.score === 0 ? "var(--critical)" : p.score >= 50 ? "var(--warning)" : "var(--critical)" }}
              >
                {p.score}
              </span>
              <div className="flex w-32 shrink-0 items-center gap-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone }} />
                <ArrowRight className="h-3 w-3 shrink-0 text-fg-secondary" />
                <span className="truncate font-mono text-[11px]" style={{ color: "var(--accent-brand)" }}>
                  {p.suggestedHub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
