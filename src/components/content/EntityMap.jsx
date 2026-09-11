import { motion } from "framer-motion";

// Entity map — salience-ranked bars for the site's dominant entities.
export default function EntityMap({ entities }) {
  const max = Math.max(...entities.map((e) => e.salience));
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Entity Map</div>
      <div className="flex flex-col gap-2">
        {entities.map((e, i) => (
          <div key={e.name} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-xs font-medium">{e.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(e.salience / max) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, var(--accent-brand), var(--accent-secondary))" }}
              />
            </div>
            <span className="tabular w-8 shrink-0 text-right font-mono text-[10px] text-fg-secondary">{e.salience}</span>
            <span className="tabular w-12 shrink-0 text-right font-mono text-[10px] text-fg-secondary opacity-60">{e.mentions}×</span>
          </div>
        ))}
      </div>
    </div>
  );
}