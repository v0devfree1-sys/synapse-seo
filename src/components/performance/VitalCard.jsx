import { motion } from "framer-motion";

const TONE = {
  good: "var(--success)",
  "needs-improvement": "var(--warning)",
  poor: "var(--critical)",
};

// One Core Web Vital — reading, threshold, and assessment bar.
export default function VitalCard({ vital, index }) {
  const tone = TONE[vital.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="surface-1 p-4"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs font-semibold tracking-widest text-foreground">{vital.label}</span>
        <span className="font-mono text-[10px] text-fg-secondary">{vital.threshold}</span>
      </div>
      <div className="tabular mt-2 font-display text-2xl font-bold" style={{ color: tone }}>
        {vital.value}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${vital.pct}%` }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: tone, boxShadow: `0 0 12px -2px ${tone}` }}
        />
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wider" style={{ color: tone }}>
        {vital.status.replace("-", " ")}
      </div>
    </motion.div>
  );
}