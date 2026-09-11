import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExecutiveBrief from "./ExecutiveBrief";
import InsightCard from "./InsightCard";
import { aiInsightsData } from "@/lib/seoData";

const FILTERS = ["All", "High Impact", "Opportunity", "Pattern Detected"];

// AI Insights module — proactive intelligence feed with executive brief,
// category filtering, and prioritized insight cards.
export default function AIInsightsView() {
  const [filter, setFilter] = useState("All");
  const { brief, stats, insights } = aiInsightsData;
  const filtered = filter === "All" ? insights : insights.filter((i) => i.kind === filter);

  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4">
        <div className="eyebrow">AI Insights</div>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Intelligence feed</h2>
      </div>

      <ExecutiveBrief brief={brief} stats={stats} />

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          const count = f === "All" ? insights.length : insights.filter((i) => i.kind === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                active
                  ? "border-[var(--border-active)] bg-[var(--surface-2)] text-foreground"
                  : "border-[var(--border-subtle)] text-fg-secondary hover:border-[var(--border)] hover:text-foreground"
              }`}
            >
              {f} <span className="tabular text-fg-secondary/70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((ins, i) => (
            <InsightCard key={ins.title} insight={ins} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
