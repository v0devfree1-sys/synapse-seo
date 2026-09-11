import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, AlertTriangle, FileText, Link2, Network, Gauge,
  Sparkles, Radar, Settings, Search, Command, Menu, X,
  PanelLeftClose, PanelLeft,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "issues", label: "Issues", icon: AlertTriangle },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "content", label: "Content", icon: FileText },
  { id: "links", label: "Links", icon: Link2 },
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "performance", label: "Performance", icon: Gauge },
  { id: "ai", label: "AI Insights", icon: Sparkles },
];
const NAV_FOOTER = [
  { id: "scan", label: "New Crawl", icon: Radar },
  { id: "settings", label: "Settings", icon: Settings },
];

function NavList({ activeView, onNavigate, collapsed, onPick }) {
  const Item = ({ item }) => {
    const active = activeView === item.id;
    const Icon = item.icon;
    return (
      <button
        onClick={() => { onNavigate(item.id); onPick?.(); }}
        className={`group relative flex w-full items-center gap-3 rounded-md px-2.5 py-2 transition-colors ${
          active ? "text-foreground" : "text-fg-secondary hover:text-foreground hover:bg-[var(--surface-1)]"
        }`}
      >
        {active && (
          <motion.div
            layoutId={onPick ? "nav-active-m" : "nav-active"}
            className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full"
            style={{ background: "var(--accent-brand)", boxShadow: "0 0 8px var(--accent-brand)" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <Icon className="h-[18px] w-[18px] shrink-0" style={active ? { color: "var(--accent-brand)" } : {}} />
        {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
      </button>
    );
  };
  return (
    <>
      <nav className="flex flex-1 flex-col gap-0.5 px-2 py-2">
        {NAV.map((n) => <Item key={n.id} item={n} />)}
      </nav>
      <div className="flex flex-col gap-0.5 border-t border-[var(--border-subtle)] px-2 py-2">
        {NAV_FOOTER.map((n) => <Item key={n.id} item={n} />)}
      </div>
    </>
  );
}

export default function AppShell({ activeView, onNavigate, onOpenCommand, domain, children }) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        <header className="z-10 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--background)]/80 px-3 py-2.5 backdrop-blur-xl">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-fg-secondary transition-colors hover:text-foreground"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 font-mono text-xs text-fg-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {domain || "no project"}
          </div>
          <button
            onClick={onOpenCommand}
            aria-label="Open command palette"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-fg-secondary transition-colors hover:border-[var(--border-hover)] hover:text-foreground"
          >
            <Command className="h-4 w-4" />
          </button>
        </header>

        <main className="relative min-w-0 flex-1 overflow-y-auto">{children}</main>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="bg-[var(--sidebar-background)] text-foreground">
            <DrawerHeader className="flex flex-row items-center justify-between pb-2">
              <DrawerTitle className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "linear-gradient(135deg, var(--accent-brand), var(--accent-secondary))" }}>
                  <Network className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-sm font-bold tracking-tight">STRATA</span>
              </DrawerTitle>
              <button onClick={() => setDrawerOpen(false)} className="text-fg-secondary"><X className="h-4 w-4" /></button>
            </DrawerHeader>
            <div className="px-2 pb-6">
              <NavList activeView={activeView} onNavigate={onNavigate} collapsed={false} onPick={() => setDrawerOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <motion.aside
        animate={{ width: collapsed ? 56 : 200 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar-background)]"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "linear-gradient(135deg, var(--accent-brand), var(--accent-secondary))" }}>
            <Network className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-sm font-bold tracking-tight">
              STRATA
            </motion.span>
          )}
        </div>
        <NavList activeView={activeView} onNavigate={onNavigate} collapsed={collapsed} />
        <div className="border-t border-[var(--border-subtle)] px-2 py-2">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-fg-secondary transition-colors hover:text-foreground hover:bg-[var(--surface-1)]"
          >
            {collapsed ? <PanelLeft className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            {!collapsed && <span className="text-[13px] font-medium">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="z-10 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--background)]/80 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2 font-mono text-xs text-fg-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {domain || "no project"}
          </div>
          <button
            onClick={onOpenCommand}
            className="ml-auto flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-1.5 text-xs text-fg-secondary transition-colors hover:border-[var(--border-hover)] hover:text-foreground"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Quick search</span>
            <kbd className="flex items-center gap-0.5 font-mono text-[10px]">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>
        </header>
        <main className="relative min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}