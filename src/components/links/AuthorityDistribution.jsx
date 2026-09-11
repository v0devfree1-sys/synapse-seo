import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Internal link authority distribution across site clusters — horizontal
// equity bars + AI pattern detection, mirroring the ResourceBreakdown pattern.
export default function AuthorityDistribution({ clusters, ai }) {
  const max = Math.max(...clusters.map((c) => c.inlinks));
  return (
    <div className="surface-1 p-4">
      <div className="eyebrow mb-3">Authority Distribution</div>
      <div className="flex flex-col gap-2.5">
        {clusters.map((c, i) => (
          <div key={c.cluster} className="flex items-center gap-3">
            <span className="w-20 shrink-0 font-mono text-[11px] text-fg-secondary">{c.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${max > 0 ? (c.inlinks / max) * 100 : 0}%` }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: c.color, boxShadow: c.inlinks > 0 ? `0 0 10px -2px ${c.color}` : "none" }}
              />
            </div>
            <span className="tabular w-10 shrink-0 text-right font-mono text-[11px] text-foreground">{c.inlinks}</span>
            <span className="tabular w-10 shrink-0 text-right font-mono text-[10px] text-fg-secondary">{c.share}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
        <div className="eyebrow mb-1.5">Pattern Detected</div>
        <div className="flex items-start gap-2 text-xs leading-relaxed text-fg-secondary">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-secondary)" }} />
          {ai}
        </div>
      </div>
    </div>
  );
}
