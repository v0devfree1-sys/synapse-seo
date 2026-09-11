import { motion } from "framer-motion";

// Interactive cluster legend — click a cluster to isolate it in the graph.
export default function ClusterLegend({ clusters, counts, isolate, onIsolate }) {
  return (
    <div className="surface-1 p-3.5">
      <div className="eyebrow mb-2.5">Clusters</div>
      <div className="flex flex-col gap-1">
        {clusters.map((c) => {
          const active = isolate === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onIsolate(active ? null : c.id)}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors ${
                active ? "bg-[var(--surface-active)]" : "hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: c.color, boxShadow: active ? `0 0 8px ${c.color}` : undefined }}
              />
              <span className="text-xs font-medium">{c.label}</span>
              <span className="tabular ml-auto font-mono text-[10px] text-fg-secondary">{counts[c.id] ?? 0}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-2.5 border-t border-[var(--border-subtle)] pt-2 font-mono text-[10px] leading-relaxed text-fg-secondary">
        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          ●
        </motion.span>{" "}
        pulsing nodes receive zero internal links
      </div>
    </div>
  );
}