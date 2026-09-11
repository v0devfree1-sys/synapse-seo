import { motion } from "framer-motion";
import { useState } from "react";
import { audit } from "@/lib/seoData";
import ScoreRing from "@/components/ScoreRing";
import SubScoreRail from "@/components/overview/SubScoreRail";
import DepthChart from "@/components/overview/DepthChart";
import LinkOpportunity from "@/components/overview/LinkOpportunity";
import IssueExplorer from "@/components/overview/IssueExplorer";
import AIAnalysis from "@/components/overview/AIAnalysis";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

function Stat({ label, value, delta, up }) {
  return (
    <div className="surface p-3.5">
      <div className="eyebrow">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="tabular font-display text-2xl font-bold">{value}</span>
        {delta != null && (
          <span className="flex items-center gap-0.5 font-mono text-[11px]" style={{ color: up ? "var(--success)" : "var(--critical)" }}>
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Overview({ domain, onNavigate }) {
  const [depthFilter, setDepthFilter] = useState(null);
  const delta = audit.healthScore - audit.prevHealth;

  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      {/* Hero row — editorial asymmetric score module */}
      <motion.section
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]"
      >
        <div className="surface relative flex flex-col items-center justify-center overflow-hidden p-6 lg:min-w-[300px]">
          <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(244,63,94,0.12), transparent 70%)" }} />
          <div className="relative z-10 flex flex-col items-center">
            <ScoreRing value={audit.healthScore} size={200} label="SEO Health" sublabel={`GOOD · ${delta > 0 ? "+" : ""}${delta} since last crawl`} delta={delta} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Sub-System Diagnostics</span>
              <span className="font-mono text-[10px] text-fg-secondary">{domain}</span>
            </div>
            <SubScoreRail items={audit.subscores} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Pages Analyzed" value={audit.pagesAnalyzed.toLocaleString()} delta="+34" up />
            <Stat label="Critical" value={audit.critical} delta="-9" up />
            <Stat label="Indexed" value={audit.indexed.toLocaleString()} delta="+34" up />
            <Stat label="Broken Links" value={audit.brokenLinks} delta="-16" up />
          </div>
        </div>
      </motion.section>

      {/* Main region — AI analysis + issues (left 65%) / sidebar (right 35%) */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.85fr_1fr]">
        <div className="flex flex-col gap-4">
          <AIAnalysis />
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Issue Explorer</span>
              <button onClick={() => onNavigate?.("issues")} className="flex items-center gap-1 text-xs text-fg-secondary transition-colors hover:text-foreground">
                View all <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <IssueExplorer />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="surface p-4">
            <DepthChart active={depthFilter} onSelect={setDepthFilter} />
            {depthFilter != null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-0)] px-3 py-2 font-mono text-[11px] text-fg-secondary">
                filtering depth <span style={{ color: "var(--accent-brand)" }}>level {depthFilter}</span> ·{" "}
                {audit.depth.find((d) => d.level === depthFilter)?.count.toLocaleString()} pages
              </motion.div>
            )}
          </div>

          <div className="surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Internal Link Authority</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Orphan Pages", val: 42, tone: "var(--critical)" },
                { label: "Weakly Connected", val: 87, tone: "var(--warning)" },
                { label: "High Authority", val: 24, tone: "var(--success)" },
                { label: "AI Opportunities", val: 163, tone: "var(--accent-brand)" },
              ].map((s) => (
                <div key={s.label} className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-0)] p-2.5">
                  <div className="tabular font-display text-xl font-bold" style={{ color: s.tone }}>{s.val}</div>
                  <div className="eyebrow mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Top Link Opportunities</span>
              <button onClick={() => onNavigate?.("links")} className="text-xs text-fg-secondary transition-colors hover:text-foreground">all</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {audit.linkOpportunities.map((o, i) => <LinkOpportunity key={i} opp={o} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}