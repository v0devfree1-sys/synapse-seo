import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph from "./ForceGraph";
import ClusterLegend from "./ClusterLegend";
import NodeInspector from "./NodeInspector";
import useForceLayout from "./useForceLayout";
import { siteGraph } from "@/lib/seoData";

// Site Architecture module — live force-directed topology of every page and
// internal link, with cluster isolation, orphan detection, and node inspection.
export default function ArchitectureView() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isolate, setIsolate] = useState(null);
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { positions, dragTo, endDrag } = useForceLayout({
    nodes: siteGraph.nodes,
    edges: siteGraph.edges,
    width: size.w,
    height: size.h,
  });

  const counts = useMemo(() => {
    const c = {};
    siteGraph.nodes.forEach((n) => { c[n.cluster] = (c[n.cluster] ?? 0) + 1; });
    return c;
  }, []);

  const orphans = siteGraph.nodes.filter((n) => n.orphan).length;
  const selectedNode = siteGraph.nodes.find((n) => n.id === selected) || null;

  return (
    <div className="flex h-full flex-col px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">Site Architecture</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Internal link topology</h2>
        </div>
        <div className="tabular flex gap-4 font-mono text-[11px] text-fg-secondary">
          <span>{siteGraph.nodes.length} nodes</span>
          <span>{siteGraph.edges.length} links</span>
          <span style={{ color: "var(--critical)" }}>{orphans} orphans</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <div ref={wrapRef} className="surface relative min-h-[420px] flex-1 overflow-hidden lg:min-h-0">
          {size.w > 0 && (
            <ForceGraph
              nodes={siteGraph.nodes}
              edges={siteGraph.edges}
              clusters={siteGraph.clusters}
              positions={positions}
              selected={selected}
              hovered={hovered}
              isolate={isolate}
              onHover={setHovered}
              onSelect={setSelected}
              dragTo={dragTo}
              endDrag={endDrag}
              width={size.w}
              height={size.h}
            />
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 lg:w-72">
          <ClusterLegend clusters={siteGraph.clusters} counts={counts} isolate={isolate} onIsolate={setIsolate} />
          <NodeInspector node={selectedNode} edges={siteGraph.edges} nodes={siteGraph.nodes} />
        </div>
      </div>
    </div>
  );
}