import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { audit } from "@/lib/seoData";

const kindTone = {
  "High Impact": "var(--critical)",
  Opportunity: "var(--info)",
  "Pattern Detected": "var(--accent-secondary)",
};

// Executive AI analysis surface — intelligence feed, not a chatbot.
export default function AIAnalysis() {
  return (
    <div className="surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "rgba(217,70,239,0.12)", border: "1px solid rgba(217,70,239,0.25)" }}>
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-secondary)" }} />
          </div>
          <span className="eyebrow">AI Executive Analysis</span>
        </div>
        <span className="font-mono text-[10px] text-fg-secondary">3 insights</span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 text-[15px] leading-relaxed text-foreground"
      >
        Your site is <span className="font-semibold">technically healthy</span>, but three structural problems are limiting organic visibility.
        The highest-impact opportunity is not content volume — it is{" "}
        <span style={{ color: "var(--accent-brand)" }} className="font-semibold">internal authority distribution</span>.
      </motion.p>

      <div className="flex flex-col gap-3">
        {audit.aiInsights.map((ins, i) => {
          const tone = kindTone[ins.kind];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-0)] p-3.5 transition-colors hover:border-[var(--border)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider" style={{ color: tone }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
                  {ins.kind}
                </span>
                <div className="flex items-center gap-3 font-mono text-[10px] text-fg-secondary">
                  <span>impact <span style={{ color: "var(--foreground)" }}>{ins.impact}</span></span>
                  <span>confidence <span className="tabular" style={{ color: "var(--foreground)" }}>{ins.confidence}%</span></span>
                </div>
              </div>
              <p className="mb-1 text-sm font-medium leading-snug">{ins.title}</p>
              <p className="text-[13px] leading-relaxed text-fg-secondary">{ins.body}</p>
              <button className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>
                Investigate <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}