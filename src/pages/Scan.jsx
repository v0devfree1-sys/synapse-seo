import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { crawlEventSequence, audit } from "@/lib/seoData";
import ScanTree from "@/components/ScanTree";
import CrawlStream from "@/components/CrawlStream";
import Atmosphere from "@/components/Atmosphere";

const PHASES = ["Discovery", "Crawling", "Rendering", "Analyzing", "Intelligence"];
const STAGES = [
  { label: "Technical SEO", key: "tech" },
  { label: "Content", key: "content" },
  { label: "Links", key: "links" },
  { label: "Performance", key: "perf" },
  { label: "AI Intelligence", key: "ai" },
];

// Live analysis environment — not a spinner. The system moves through the website.
export default function Scan({ domain, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [events, setEvents] = useState([]);
  const [discovered, setDiscovered] = useState(0);
  const [counts, setCounts] = useState({ crawling: 0, rendering: 0, analyzing: 0 });
  const [stageIdx, setStageIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const total = 9000;
    const tick = 60;
    let elapsed = 0;
    timer.current = setInterval(() => {
      elapsed += tick;
      const p = Math.min(1, elapsed / total);
      setProgress(p);

      // reveal events progressively
      const eventCount = Math.floor(p * crawlEventSequence.length);
      setEvents(crawlEventSequence.slice(0, eventCount));
      setDiscovered(Math.floor(p * audit.pagesAnalyzed));
      setCounts({
        crawling: Math.floor(p * 847),
        rendering: Math.floor(p * 198),
        analyzing: Math.floor(p * 431),
      });
      setStageIdx(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));

      if (p >= 1) {
        clearInterval(timer.current);
        setEvents(crawlEventSequence);
        setDone(true);
        setTimeout(() => onComplete?.(), 1400);
      }
    }, tick);
    return () => clearInterval(timer.current);
  }, [onComplete]);

  const activePhase = PHASES[Math.min(PHASES.length - 1, Math.floor(progress * PHASES.length))];

  return (
    <div className="relative min-h-full">
      <Atmosphere intensity={0.6} />
      <div className="relative z-10 flex h-full flex-col px-4 py-4 lg:px-6 lg:py-6">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">{done ? "Audit Complete" : "Analyzing"}</div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{domain}</h2>
          </div>
          <div className="flex items-baseline gap-2">
            <motion.span
              key={discovered}
              initial={{ opacity: 0.5, y: -2 }} animate={{ opacity: 1, y: 0 }}
              className="tabular font-display text-4xl font-bold leading-none text-glow-brand"
              style={{ color: "var(--accent-brand)" }}
            >
              {discovered.toLocaleString()}
            </motion.span>
            <span className="eyebrow">URLs discovered</span>
          </div>
        </div>

        {/* Scan field bar */}
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-1)]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--accent-brand), var(--accent-secondary))" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Main split */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
          {/* Visualization 60% */}
          <div className="surface relative min-h-[280px] overflow-hidden p-2 lg:min-h-0">
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <span className="eyebrow">Site Topology</span>
            </div>
            <ScanTree progress={progress} />
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/40 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="eyebrow" style={{ color: "var(--success)" }}>Audit Complete</div>
                    <div className="mt-2 font-display text-3xl font-bold">{audit.pagesAnalyzed.toLocaleString()} pages</div>
                    <div className="mt-1 font-mono text-xs text-fg-secondary">{audit.critical} critical · {audit.highImpact} high impact · {audit.opportunities} opportunities</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column — stream + counters */}
          <div className="flex min-h-0 flex-col gap-4">
            <div className="surface flex-1 overflow-hidden p-3 lg:min-h-0">
              <CrawlStream events={events} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Crawling", val: counts.crawling, total: 847 },
                { label: "Rendering", val: counts.rendering, total: 198 },
                { label: "Analyzing", val: counts.analyzing, total: 431 },
              ].map((c) => (
                <div key={c.label} className="surface p-2.5">
                  <div className="eyebrow">{c.label}</div>
                  <div className="mt-1 tabular font-mono text-sm font-semibold">
                    {c.val}<span className="text-fg-secondary"> / {c.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage rail */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {STAGES.map((s, i) => {
            const state = i < stageIdx ? "done" : i === stageIdx ? "active" : "pending";
            return (
              <div key={s.key} className="flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors"
                  style={{
                    background: state === "active" ? "rgba(244,63,94,0.12)" : "transparent",
                    color: state === "done" ? "var(--success)" : state === "active" ? "var(--accent-brand)" : "var(--foreground-secondary)",
                    border: `1px solid ${state === "active" ? "var(--border-active)" : "var(--border-subtle)"}`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{
                    background: state === "done" ? "var(--success)" : state === "active" ? "var(--accent-brand)" : "rgba(255,255,255,0.15)",
                  }} />
                  {s.label}
                </span>
                {i < STAGES.length - 1 && <span className="text-fg-secondary/40">·</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}