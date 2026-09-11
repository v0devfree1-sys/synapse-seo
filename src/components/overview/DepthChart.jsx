import { motion } from "framer-motion";
import { audit } from "@/lib/seoData";

// Interactive crawl-depth bar chart. Click a level to filter (visual highlight).
export default function DepthChart({ active, onSelect }) {
  const max = Math.max(...audit.depth.map((d) => d.count));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Crawl Depth</span>
        <span className="font-mono text-[10px] text-fg-secondary">click to filter</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {audit.depth.map((d, i) => {
          const w = (d.count / max) * 100;
          const isActive = active === d.level;
          return (
            <button
              key={d.level}
              onClick={() => onSelect?.(isActive ? null : d.level)}
              className="group flex items-center gap-3 text-left transition-colors"
            >
              <span className="w-6 shrink-0 font-mono text-[10px] text-fg-secondary">{d.label}</span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-sm" style={{ background: "rgba(255,255,255,0.03)" }}>
                <motion.div
                  className="h-full rounded-sm"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, var(--accent-brand), var(--accent-secondary))"
                      : "linear-gradient(90deg, rgba(244,63,94,0.35), rgba(217,70,239,0.2))",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="tabular w-12 shrink-0 text-right font-mono text-[11px] text-fg-secondary">{d.count.toLocaleString()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}