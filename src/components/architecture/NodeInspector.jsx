import { Crosshair } from "lucide-react";
import { statusTone } from "@/lib/seoData";

const toneColor = { success: "var(--success)", warning: "var(--warning)", critical: "var(--critical)" };

const Row = ({ label, value, tone }) => (
  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1.5 last:border-0">
    <span className="eyebrow">{label}</span>
    <span className="tabular text-xs font-medium" style={tone ? { color: toneColor[tone] } : undefined}>{value}</span>
  </div>
);

// Side panel showing full diagnostics for the selected graph node.
export default function NodeInspector({ node, edges, nodes }) {
  if (!node) {
    return (
      <div className="surface-1 flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <Crosshair className="h-5 w-5 text-fg-secondary" />
        <span className="text-xs text-fg-secondary">Click a node to inspect its link equity, status, and connections.</span>
      </div>
    );
  }
  const nodesById = new Map(nodes.map((n) => [n.id, n]));
  const incoming = edges.filter((e) => e.target === node.id).map((e) => nodesById.get(e.source));
  const outgoing = edges.filter((e) => e.source === node.id).map((e) => nodesById.get(e.target));
  const tone = statusTone(node.status);

  return (
    <div className="surface-1 flex flex-1 flex-col p-3.5">
      <div className="eyebrow">Node Inspector</div>
      <div className="mt-2 truncate font-display text-sm font-bold tracking-tight">{node.label}</div>
      <div className="truncate font-mono text-[11px] text-fg-secondary">{node.path}</div>

      <div className="mt-3">
        <Row label="Status" value={node.status} tone={tone} />
        <Row label="Inlinks" value={node.inlinks} />
        <Row label="Outlinks" value={outgoing.length} />
        <Row label="SEO Score" value={node.score || "—"} />
        {node.orphan && <Row label="Orphan" value="no internal links" tone="critical" />}
      </div>

      {(incoming.length > 0 || outgoing.length > 0) && (
        <div className="mt-3 border-t border-[var(--border-subtle)] pt-2.5">
          <div className="eyebrow mb-1.5">Connections</div>
          <div className="flex flex-col gap-1 font-mono text-[10px]">
            {incoming.map((n) => n && (
              <div key={`in-${n.id}`} className="flex items-center gap-1.5 text-fg-secondary">
                <span style={{ color: "var(--success)" }}>←</span>
                <span className="truncate">{n.path}</span>
              </div>
            ))}
            {outgoing.map((n) => n && (
              <div key={`out-${n.id}`} className="flex items-center gap-1.5 text-fg-secondary">
                <span style={{ color: "var(--accent-brand)" }}>→</span>
                <span className="truncate">{n.path}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}