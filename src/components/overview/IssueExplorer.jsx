import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Sparkles, Wrench, MessageSquare } from "lucide-react";
import { audit } from "@/lib/seoData";

const categoryTone = {
  Critical: "var(--critical)",
  "High Impact": "var(--warning)",
  Opportunity: "var(--info)",
  Notice: "var(--foreground-secondary)",
  Passed: "var(--success)",
};

const toneColor = {
  critical: "var(--critical)", warning: "var(--warning)", muted: "var(--foreground-secondary)", success: "var(--success)",
};

function SeverityChip({ category }) {
  const tone = categoryTone[category] || "var(--foreground-secondary)";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xs px-2 py-0.5 font-mono text-[10px] font-medium" style={{ color: tone, background: `${tone}1a`, border: `1px solid ${tone}33` }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
      {category.toUpperCase()}
    </span>
  );
}

// Expandable issue explorer — preserves context, no separate page navigation.
export default function IssueExplorer() {
  const [openId, setOpenId] = useState(audit.issues[0]?.id);
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Critical", "High Impact", "Opportunity", "Notice"];
  const list = filter === "All" ? audit.issues : audit.issues.filter((i) => i.category === filter);

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              filter === f ? "bg-[var(--surface-2)] text-foreground" : "text-fg-secondary hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {list.map((issue, i) => {
            const open = openId === issue.id;
            return (
              <motion.div
                key={issue.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="surface overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(open ? null : issue.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <SeverityChip category={issue.category} />
                  <span className="font-medium">{issue.title}</span>
                  <span className="tabular font-mono text-xs text-fg-secondary">{issue.count} pages</span>
                  <div className="ml-auto">
                    <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
                      <ChevronRight className="h-4 w-4 text-fg-secondary" />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--border-subtle)] px-4 py-3.5">
                        <p className="text-sm text-fg-secondary">{issue.summary}</p>
                        <div className="mt-3 flex flex-col gap-1.5">
                          {issue.evidence.map((e, j) => (
                            <div key={j} className="flex items-center justify-between font-mono text-[11px]">
                              <span className="text-fg-secondary">{e.label}</span>
                              <span style={{ color: toneColor[e.tone] }}>{e.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 rounded-md border border-[var(--border-subtle)] bg-[rgba(217,70,239,0.04)] p-3">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-secondary)" }} />
                            <span className="eyebrow" style={{ color: "var(--accent-secondary)" }}>AI Analysis</span>
                          </div>
                          <p className="text-[13px] leading-relaxed text-fg-secondary">{issue.ai}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button className="flex items-center gap-1.5 rounded-md bg-[var(--surface-2)] px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--surface-active)]">
                            <Wrench className="h-3 w-3" /> Generate fix
                          </button>
                          <button className="flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs transition-colors hover:border-[var(--border-hover)]">
                            <MessageSquare className="h-3 w-3" /> Ask AI
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}