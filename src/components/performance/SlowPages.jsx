import { motion } from "framer-motion";

// Slowest routes — LCP and page weight by template.
export default function SlowPages({ pages }) {
  const worst = Math.max(...pages.map((p) => p.lcp));
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Slowest Routes</div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-2 pb-2 font-mono text-[10px] uppercase tracking-wider text-fg-secondary">
          <span className="flex-1">Route</span>
          <span className="w-16 text-right">LCP</span>
          <span className="w-16 text-right">Weight</span>
          <span className="w-14 text-right">Req</span>
        </div>
        {pages.map((p, i) => {
          const poor = p.lcp >= 4;
          const tone = poor ? "var(--critical)" : p.lcp >= 2.5 ? "var(--warning)" : "var(--success)";
          return (
            <motion.div
              key={p.path}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-2 py-2.5 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-[11px] text-foreground">{p.path}</div>
                <div className="text-[10px] text-fg-secondary">{p.template} template</div>
                <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.lcp / worst) * 100}%` }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{ background: tone }}
                  />
                </div>
              </div>
              <span className="tabular w-16 text-right font-mono text-xs" style={{ color: tone }}>
                {p.lcp.toFixed(1)}s
              </span>
              <span className="tabular w-16 text-right font-mono text-[11px] text-fg-secondary">
                {p.weight.toFixed(1)} MB
              </span>
              <span className="tabular w-14 text-right font-mono text-[11px] text-fg-secondary">{p.requests}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}