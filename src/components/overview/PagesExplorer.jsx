import { motion } from "framer-motion";
import { audit } from "@/lib/seoData";
import { Search, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const statusTone = (code) => {
  if (code >= 400) return "var(--critical)";
  if (code >= 300) return "var(--warning)";
  return "var(--success)";
};

// Premium URL explorer — dense, sticky header, row hover, keyboard-friendly.
export default function PagesExplorer({ onNavigate }) {
  const [q, setQ] = useState("");
  const rows = audit.pages.filter((p) => p.path.includes(q.toLowerCase()) || p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="eyebrow">Page Explorer</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{audit.pagesAnalyzed.toLocaleString()} URLs</h2>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-fg-secondary" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Filter URLs…"
            className="w-40 bg-transparent font-mono text-xs outline-none placeholder:text-fg-secondary sm:w-56"
          />
        </div>
      </div>

      <div className="surface overflow-hidden">
        <div className="grid grid-cols-[2fr_0.6fr_0.7fr_0.5fr_0.5fr_0.6fr] gap-3 border-b border-[var(--border)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-fg-secondary sticky top-0 bg-[var(--surface-0)]">
          <span>URL</span><span>Status</span><span>Indexable</span><span>Depth</span><span>Links</span><span>Health</span>
        </div>
        <div>
          {rows.map((p, i) => (
            <motion.div
              key={p.path}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="grid grid-cols-[2fr_0.6fr_0.7fr_0.5fr_0.5fr_0.6fr] items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-2.5 font-mono text-xs transition-colors hover:bg-[var(--surface-hover)]"
            >
              <span className="truncate text-foreground">{p.path}</span>
              <span className="tabular" style={{ color: statusTone(p.status) }}>{p.status}</span>
              <span style={{ color: p.indexable ? "var(--success)" : "var(--critical)" }}>{p.indexable ? "yes" : "no"}</span>
              <span className="text-fg-secondary">{p.depth}</span>
              <span className="tabular text-fg-secondary">{p.links}</span>
              <span className="tabular" style={{ color: p.score >= 80 ? "var(--success)" : p.score >= 60 ? "var(--warning)" : "var(--critical)" }}>
                {p.score || "—"}
              </span>
            </motion.div>
          ))}
          {rows.length === 0 && <div className="px-4 py-10 text-center text-sm text-fg-secondary">No URLs match "{q}"</div>}
        </div>
      </div>
    </div>
  );
}