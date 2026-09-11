import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Search, Radar, LayoutDashboard, AlertTriangle, FileText, Link2,
  Network, Gauge, Sparkles, Globe, CornerDownLeft, ChevronUp, ChevronDown, Settings,
} from "lucide-react";

const ACTIONS = [
  { id: "scan", label: "Start New Crawl", hint: "Analyze a domain", icon: Radar, group: "Actions" },
  { id: "overview", label: "Go to Overview", hint: "Audit summary", icon: LayoutDashboard, group: "Navigate" },
  { id: "issues", label: "Go to Issues", hint: "Critical & high impact", icon: AlertTriangle, group: "Navigate" },
  { id: "pages", label: "Go to Pages", hint: "URL explorer", icon: FileText, group: "Navigate" },
  { id: "links", label: "Go to Links", hint: "Internal link intelligence", icon: Link2, group: "Navigate" },
  { id: "architecture", label: "Go to Architecture", hint: "Site graph", icon: Network, group: "Navigate" },
  { id: "performance", label: "Go to Performance", hint: "Core Web Vitals", icon: Gauge, group: "Navigate" },
  { id: "ai", label: "Open AI Insights", hint: "Intelligence feed", icon: Sparkles, group: "Navigate" },
  { id: "settings", label: "Open Settings", hint: "Crawl config & preferences", icon: Settings, group: "Navigate" },
  { id: "find-url", label: "Find URL", hint: "Search crawled pages", icon: Search, group: "Filter" },
  { id: "filter-critical", label: "Filter Critical Issues", hint: "12 critical", icon: AlertTriangle, group: "Filter" },
];

export default function CommandPalette({ open, onClose, onAction }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    if (!query) return ACTIONS;
    const q = query.toLowerCase();
    return ACTIONS.filter((a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter" && filtered[active]) { e.preventDefault(); onAction?.(filtered[active].id); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, active, onClose, onAction]);

  useEffect(() => { if (!open) setQuery(""); }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(560px,92vw)] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--popover)] shadow-2xl inner-highlight"
            style={{ boxShadow: "0 0 0 1px rgba(244,63,94,0.08), 0 24px 60px -12px rgba(0,0,0,0.7), 0 0 80px -20px rgba(244,63,94,0.15)" }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
              <Search className="h-4 w-4 text-fg-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, navigate, run actions…"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-fg-secondary"
              />
              <kbd className="font-mono text-[10px] text-fg-secondary">ESC</kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-fg-secondary">No results for "{query}"</div>
              )}
              {filtered.map((a, i) => {
                const Icon = a.icon;
                const sel = i === active;
                return (
                  <button
                    key={a.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => { onAction?.(a.id); onClose(); }}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                      sel ? "bg-[var(--surface-2)]" : "hover:bg-[var(--surface-1)]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${sel ? "" : "text-fg-secondary"}`} style={sel ? { color: "var(--accent-brand)" } : {}} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{a.label}</div>
                      <div className="text-[11px] text-fg-secondary">{a.hint}</div>
                    </div>
                    <span className="eyebrow">{a.group}</span>
                    {sel && <CornerDownLeft className="h-3.5 w-3.5 text-fg-secondary" />}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2 font-mono text-[10px] text-fg-secondary">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> select</span>
              </div>
              <span>STRATA Command</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}