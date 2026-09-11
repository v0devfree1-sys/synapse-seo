import { motion } from "framer-motion";
import ScoreRing from "@/components/ScoreRing";
import VitalCard from "./VitalCard";
import SlowPages from "./SlowPages";
import ResourceBreakdown from "./ResourceBreakdown";
import { performanceData } from "@/lib/seoData";

// Performance module — Core Web Vitals, slow routes, and resource composition.
export default function PerformanceView() {
  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4">
        <div className="eyebrow">Performance</div>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Core Web Vitals</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="surface-1 flex flex-col items-center justify-center gap-2 p-4 lg:col-span-2"
        >
          <ScoreRing value={performanceData.score} size={180} label="Perf Score" sublabel={`${performanceData.score - performanceData.prev} vs last crawl`} delta={1} />
          <div className="font-mono text-[10px] text-fg-secondary">median across 75th-percentile sessions</div>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-4 lg:content-center">
          {performanceData.vitals.map((v, i) => (
            <VitalCard key={v.key} vital={v} index={i} />
          ))}
        </div>

        <div className="lg:col-span-3">
          <SlowPages pages={performanceData.slowPages} />
        </div>
        <div className="lg:col-span-2">
          <ResourceBreakdown resources={performanceData.resources} ai={performanceData.ai} />
        </div>
      </div>
    </div>
  );
}