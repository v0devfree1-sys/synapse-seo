import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import CommandPalette from "@/components/CommandPalette";
import Launch from "@/pages/Launch";
import Scan from "@/pages/Scan";
import Overview from "@/pages/Overview";
import IssueExplorer from "@/components/overview/IssueExplorer";
import PagesExplorer from "@/components/overview/PagesExplorer";
import ModulePlaceholder from "@/components/overview/ModulePlaceholder";
import ArchitectureView from "@/components/architecture/ArchitectureView";
import ContentView from "@/components/content/ContentView";
import PerformanceView from "@/components/performance/PerformanceView";
import LinkIntelligenceView from "@/components/links/LinkIntelligenceView";
import AIInsightsView from "@/components/ai/AIInsightsView";
import SettingsView from "@/components/settings/SettingsView";
import { audit } from "@/lib/seoData";

const MODULES = {
  content: { title: "Content Intelligence", description: "Semantic intent, entity mapping, cannibalization clusters, and content gaps — visualized as a living content workspace." },
  architecture: { title: "Site Architecture", description: "An interactive force-directed graph of every page and internal link. Zoom, isolate clusters, and highlight orphans in real time." },
  performance: { title: "Performance", description: "Core Web Vitals mapped against page templates, resources, and scripts — with AI pattern detection across your slowest routes." },
  ai: { title: "AI Insights", description: "A proactive intelligence feed that surfaces patterns, opportunities, and prioritized strategy from your latest crawl." },
  links: { title: "Internal Link Intelligence", description: "Orphan pages, weakly connected nodes, authority distribution, and AI-suggested link opportunities with anchor reasoning." },
  scan: { title: "New Crawl", description: "Analyze a fresh domain to populate every surface with live data." },
  settings: { title: "Settings", description: "Crawl configuration, crawl frequency, and project preferences." },
};

// Orchestrates the continuous cinematic experience: launch → scan → overview.
export default function Workspace() {
  const [phase, setPhase] = useState("launch"); // launch | scanning | complete
  const [domain, setDomain] = useState("");
  const [view, setView] = useState("overview");
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleActivate = (host) => {
    setDomain(host);
    setPhase("scanning");
  };
  const handleComplete = () => {
    setPhase("complete");
    setView("overview");
  };
  const handleNavigate = (id) => {
    if (id === "scan") { setPhase("launch"); return; }
    if (phase !== "complete") return;
    setView(id);
  };
  const handleCommand = (id) => {
    if (id === "scan") { setPhase("launch"); return; }
    if (phase !== "complete") return;
    setView(id);
  };

  const activeView = phase === "complete" ? view : "scan";

  const renderWorkspace = () => {
    if (phase === "launch") return <Launch onActivate={handleActivate} />;
    if (phase === "scanning") return <Scan domain={domain} onComplete={handleComplete} />;
    // complete
    switch (view) {
      case "overview": return <Overview domain={domain || audit.domain} onNavigate={handleNavigate} />;
      case "issues": return (
        <div className="px-4 py-5 lg:px-6 lg:py-6">
          <div className="mb-4"><div className="eyebrow">Issue Explorer</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{audit.critical + audit.highImpact} prioritized issues</h2></div>
          <IssueExplorer />
        </div>
      );
      case "pages": return <PagesExplorer />;
      case "ai": return <AIInsightsView />;
      case "links": return <LinkIntelligenceView />;
      case "content": return <ContentView />;
      case "architecture": return <ArchitectureView />;
      case "performance": return <PerformanceView />;
      case "settings": return <SettingsView />;
      default: return <Overview domain={domain || audit.domain} onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <AppShell
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenCommand={() => setCmdOpen(true)}
        domain={phase === "launch" ? null : (domain || audit.domain)}
      >
        {renderWorkspace()}
      </AppShell>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onAction={handleCommand} />
    </>
  );
}