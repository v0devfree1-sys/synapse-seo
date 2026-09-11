import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";

const intentTone = {
  Transactional: "var(--accent-brand)",
  Informational: "var(--info)",
  Navigational: "var(--success)",
  Commercial: "var(--warning)",
};

// Cannibalization cluster card — competing pages for one search intent.
export default function CannibalizationCluster({ cluster, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="surface-1 p-4 transition-colors hover:border-[var(--border-hover)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs text-foreground">
          <GitMerge className="h-3.5 w-3.5" style={{ color: "var(--accent-brand)" }} />
          “{cluster.query}”
        </span>
        <span
          className="rounded-xs border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
          style={{ color: intentTone[cluster.intent], borderColor: "var(--border)" }}
        >
          {cluster.intent}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {cluster.pages.map((p) => {
          const strong = p.overlap === 100;
          return (
            <div key={p.path} className="flex items-center gap-3">
              <span className="w-9 shrink-0 text-right font-mono text-[10px]" style={{ color: strong ? "var(--success)" : "var(--warning)" }}>
                {p.overlap}%
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-[11px] text-fg-secondary">{p.path}</div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.overlap}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: strong ? "var(--success)" : "var(--warning)", opacity: strong ? 0.9 : 0.7 }}
                  />
                </div>
              </div>
              <span className="tabular w-8 shrink-0 font-mono text-[10px] text-fg-secondary">{p.score}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 border-t border-[var(--border-subtle)] pt-2.5">
        <div className="eyebrow mb-1">AI Recommendation</div>
        <p className="text-xs leading-relaxed text-fg-secondary">{cluster.ai}</p>
      </div>
    </motion.div>
  );
}