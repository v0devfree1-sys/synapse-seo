import { motion } from "framer-motion";
import AuthorityDistribution from "./AuthorityDistribution";
import OrphanPages from "./OrphanPages";
import WeakConnections from "./WeakConnections";
import LinkOpportunityCard from "./LinkOpportunityCard";
import { linkIntel } from "@/lib/seoData";

// Internal Link Intelligence module — authority distribution, orphan pages,
// weak connections, and AI-suggested link opportunities with anchor reasoning.
export default function LinkIntelligenceView() {
  const { authorityByCluster, orphans, weakNodes, opportunities, ai } = linkIntel;
  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">Internal Link Intelligence</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Link authority &amp; opportunities</h2>
        </div>
        <div className="tabular flex gap-4 font-mono text-[11px] text-fg-secondary">
          <span style={{ color: "var(--critical)" }}>{orphans.length} orphans</span>
          <span>{weakNodes.length} weak nodes</span>
          <span style={{ color: "var(--accent-brand)" }}>{opportunities.length} AI opportunities</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Row 1: authority distribution (3) + link opportunities (2) */}
        <div className="lg:col-span-3">
          <AuthorityDistribution clusters={authorityByCluster} ai={ai} />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-2">
          <div className="eyebrow">AI Link Opportunities</div>
          {opportunities.map((o, i) => (
            <LinkOpportunityCard key={i} opp={o} index={i} />
          ))}
        </div>

        {/* Row 2: orphan pages (3) + weak connections (2) */}
        <div className="lg:col-span-3">
          <OrphanPages orphans={orphans} />
        </div>
        <div className="lg:col-span-2">
          <WeakConnections nodes={weakNodes} />
        </div>
      </div>
    </div>
  );
}
