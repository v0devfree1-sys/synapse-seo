import EntityMap from "./EntityMap";
import ContentGaps from "./ContentGaps";
import CannibalizationCluster from "./CannibalizationCluster";
import { contentIntel } from "@/lib/seoData";

// Content Intelligence module — semantic entities, cannibalization, and gaps.
export default function ContentView() {
  const thin = 126; // from audit.thin-content
  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">Content Intelligence</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Semantic content workspace</h2>
        </div>
        <div className="tabular flex gap-4 font-mono text-[11px] text-fg-secondary">
          <span>{contentIntel.entities.length} entities</span>
          <span>{contentIntel.clusters.length} cannibalization clusters</span>
          <span style={{ color: "var(--warning)" }}>{thin} thin pages</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-3">
          <div className="eyebrow">Cannibalization Clusters</div>
          {contentIntel.clusters.map((c, i) => (
            <CannibalizationCluster key={c.id} cluster={c} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <EntityMap entities={contentIntel.entities} />
          <ContentGaps gaps={contentIntel.gaps} />
        </div>
      </div>
    </div>
  );
}