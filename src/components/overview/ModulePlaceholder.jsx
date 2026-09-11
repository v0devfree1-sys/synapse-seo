import { motion } from "framer-motion";
import { Network } from "lucide-react";

// Designed intentional state for modules not yet wired with live data.
export default function ModulePlaceholder({ title, description }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-1)] pulse-edge">
          <Network className="h-5 w-5" style={{ color: "var(--accent-brand)" }} />
        </div>
        <div className="eyebrow">Module</div>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-fg-secondary">{description}</p>
        <p className="mt-4 font-mono text-[11px] text-fg-secondary/60">Run a crawl to populate this surface with live data.</p>
      </motion.div>
    </div>
  );
}