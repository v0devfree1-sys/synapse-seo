import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { statusTone } from "@/lib/seoData";

const toneColor = {
  success: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--critical)",
};

// Vertical real-time monospace crawl event stream.
export default function CrawlStream({ events = [] }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [events.length]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 pb-2 pt-1">
        <span className="eyebrow">Live Stream</span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-fg-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3 font-mono text-[11px] leading-relaxed">
        <AnimatePresence initial={false}>
          {events.map((e, i) => {
            const tone = statusTone(e.code);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center gap-3 py-0.5"
              >
                <span className="tabular w-8 shrink-0 text-right" style={{ color: toneColor[tone] }}>
                  {e.code}
                </span>
                <span className="truncate text-fg-secondary">{e.path}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </div>
  );
}