import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { statusTone } from "@/lib/seoData";

const toneColor = { success: "var(--success)", warning: "var(--warning)", critical: "var(--critical)" };

// Interactive force-directed SVG canvas: wheel zoom, drag pan, node drag,
// hover/select focus with connected-edge highlighting, cluster isolation.
export default function ForceGraph({ nodes, edges, clusters, positions, selected, hovered, isolate, onHover, onSelect, dragTo, endDrag, width, height }) {
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const [view, setView] = useState({ k: 1, x: 0, y: 0 });

  const posMap = new Map(positions.map((p) => [p.id, p]));
  const colorMap = new Map(clusters.map((c) => [c.id, c.color]));
  const focus = hovered || selected;
  const connected = new Set();
  if (focus) {
    connected.add(focus);
    edges.forEach((e) => {
      if (e.source === focus) connected.add(e.target);
      if (e.target === focus) connected.add(e.source);
    });
  }

  const toGraph = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return { x: (e.clientX - rect.left - view.x) / view.k, y: (e.clientY - rect.top - view.y) / view.k };
  };

  useEffect(() => {
    const el = svgRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setView((v) => {
        const k = Math.min(3, Math.max(0.4, v.k * Math.exp(-e.deltaY * 0.0012)));
        const s = k / v.k;
        return { k, x: mx - (mx - v.x) * s, y: my - (my - v.y) * s };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleBackgroundDown = (e) => {
    svgRef.current.setPointerCapture(e.pointerId);
    dragRef.current = { type: "pan", sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y };
    onSelect(null);
    onHover(null);
  };

  const handleNodeDown = (id) => (e) => {
    e.stopPropagation();
    svgRef.current.setPointerCapture(e.pointerId);
    onSelect(id);
    dragRef.current = { type: "node", id };
    const g = toGraph(e);
    dragTo(id, g.x, g.y);
  };

  const handleMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    if (d.type === "pan") {
      setView((v) => ({ ...v, x: d.vx + (e.clientX - d.sx), y: d.vy + (e.clientY - d.sy) }));
    } else {
      const g = toGraph(e);
      dragTo(d.id, g.x, g.y);
    }
  };

  const handleUp = () => {
    const d = dragRef.current;
    if (d?.type === "node") endDrag(d.id);
    dragRef.current = null;
  };

  const nodeOpacity = (n) => {
    if (isolate && n.cluster !== isolate) return 0.12;
    if (focus && !connected.has(n.id)) return 0.15;
    return 1;
  };
  const edgeOpacity = (e) => {
    if (focus && (e.source === focus || e.target === focus)) return 0.9;
    if (focus) return 0.06;
    if (isolate) {
      const a = nodes.find((n) => n.id === e.source);
      const b = nodes.find((n) => n.id === e.target);
      return a?.cluster === isolate && b?.cluster === isolate ? 0.35 : 0.04;
    }
    return 0.5;
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="block touch-none select-none"
        style={{ cursor: dragRef.current ? "grabbing" : "default" }}
        onPointerDown={handleBackgroundDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
      >
        <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
          {edges.map((e, i) => {
            const a = posMap.get(e.source);
            const b = posMap.get(e.target);
            if (!a || !b) return null;
            const hot = focus && (e.source === focus || e.target === focus);
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={hot ? "var(--accent-brand)" : "rgba(255,255,255,0.10)"}
                strokeWidth={hot ? 1.6 : 1}
                opacity={edgeOpacity(e)}
              />
            );
          })}
          {nodes.map((n) => {
            const p = posMap.get(n.id);
            if (!p) return null;
            const r = 4 + Math.sqrt(n.inlinks + 1) * 1.2;
            const dim = nodeOpacity(n);
            const tone = statusTone(n.status);
            return (
              <g
                key={n.id}
                data-node={n.id}
                transform={`translate(${p.x},${p.y})`}
                style={{ cursor: "grab", opacity: dim, transition: "opacity var(--duration-fast) var(--ease-out)" }}
                onPointerDown={handleNodeDown(n.id)}
                onPointerEnter={() => onHover(n.id)}
                onPointerLeave={() => onHover(null)}
              >
                {n.orphan && (
                  <motion.circle
                    r={r} fill="none" stroke={colorMap.get(n.cluster)} strokeWidth={1}
                    animate={{ r: [r + 2, r + 10], opacity: [0.55, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {n.status !== 200 && (
                  <circle r={r + 4} fill="none" stroke={toneColor[tone]} strokeWidth={1.5} strokeDasharray="3 3" />
                )}
                {selected === n.id && (
                  <circle r={r + 5} fill="none" stroke="var(--accent-brand)" strokeWidth={1.5} opacity={0.9} />
                )}
                <circle r={r} fill={colorMap.get(n.cluster)} stroke="rgba(11,12,14,0.9)" strokeWidth={2} />
                <circle r={r} fill="transparent" style={{ filter: selected === n.id ? "drop-shadow(0 0 6px var(--accent-brand))" : undefined }} />
                <text
                  y={r + 13}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={9}
                  fill="var(--foreground-secondary)"
                  style={{ pointerEvents: "none" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute bottom-2.5 left-3 font-mono text-[10px] text-fg-secondary opacity-70">
        scroll to zoom · drag background to pan · drag nodes to arrange
      </div>
      <button
        aria-label="Reset view"
        onClick={() => setView({ k: 1, x: 0, y: 0 })}
        className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-1)] text-fg-secondary transition-colors hover:text-foreground"
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}