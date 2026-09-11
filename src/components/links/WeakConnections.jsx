import { motion } from "framer-motion";

// Weakly connected pages — low internal link count, sorted by most neglected.
export default function WeakConnections({ nodes }) {
  const max = Math.max(...nodes.map((n) => n.inlinks));
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Weakly Connected</div>
      <div className="flex flex-col gap-2.5">
        {nodes.map((n, i) => (
          <motion.div
            key={n.path}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-0)] p-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="truncate font-mono text-[11px] text-foreground">{n.path}</span>
              <span className="shrink-0 font-mono text-[10px] text-fg-secondary">{n.label}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(n.inlinks / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="h-full rounded-full"
                  style={{ background: "var(--warning)" }}
                />
              </div>
              <span className="tabular shrink-0 font-mono text-[10px]" style={{ color: "var(--warning)" }}>
                {n.inlinks} links
              </span>
              <span className="tabular shrink-0 font-mono text-[10px] text-fg-secondary">· score {n.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
