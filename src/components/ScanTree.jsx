import { motion } from "framer-motion";
import { useMemo } from "react";
import { siteTree } from "@/lib/seoData";

// Layered topological site tree. Nodes appear as the scan progresses (progress 0..1).
// Edges carry subtle energy pulses. Critical nodes (4xx/5xx) pulse very subtly.
const NODE_R = 5;
const LEVEL_GAP = 96;
const SIBLING_GAP = 26;

function layout(node, depth = 0, x = { v: 0 }) {
  const children = node.children || [];
  if (children.length === 0) {
    node._x = x.v;
    node._depth = depth;
    x.v += SIBLING_GAP;
    return { width: SIBLING_GAP, leaves: 1 };
  }
  let childWidth = 0;
  let leaves = 0;
  children.forEach((c) => {
    const r = layout(c, depth + 1, x);
    childWidth += r.width;
    leaves += r.leaves;
  });
  node._x = (children[0]._x + children[children.length - 1]._x) / 2;
  node._depth = depth;
  return { width: childWidth, leaves };
}

function flatten(node, acc = []) {
  acc.push(node);
  (node.children || []).forEach((c) => flatten(c, acc));
  return acc;
}

export default function ScanTree({ progress = 0, width = 640, height = 460 }) {
  const { nodes, edges, maxX, maxDepth } = useMemo(() => {
    layout(siteTree);
    const all = flatten(siteTree);
    const maxX = Math.max(...all.map((n) => n._x)) + SIBLING_GAP;
    const maxDepth = Math.max(...all.map((n) => n._depth));
    const e = [];
    all.forEach((n) => (n.children || []).forEach((c) => e.push({ from: n, to: c })));
    return { nodes: all, edges: e, maxX, maxDepth };
  }, []);

  const sx = (x) => 40 + (x / maxX) * (width - 80);
  const sy = (d) => 36 + (d / Math.max(1, maxDepth)) * (height - 72);

  // reveal count grows with progress
  const revealed = Math.floor(progress * nodes.length);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(244,63,94,0.5)" />
            <stop offset="100%" stopColor="rgba(217,70,239,0.25)" />
          </linearGradient>
          <filter id="nodeGlow"><feGaussianBlur stdDeviation="2.4" /></filter>
        </defs>

        {edges.map((e, i) => {
          const fromIdx = nodes.indexOf(e.from);
          const toIdx = nodes.indexOf(e.to);
          if (toIdx >= revealed) return null;
          const x1 = sx(e.from._x), y1 = sy(e.from._depth);
          const x2 = sx(e.to._x), y2 = sy(e.to._depth);
          const midY = (y1 + y2) / 2;
          const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <motion.path
                d={d} fill="none" stroke="url(#edgeGrad)" strokeWidth={1.4}
                strokeDasharray="3 7"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: [-20, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                opacity={fromIdx < revealed ? 0.9 : 0.3}
              />
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const shown = i < revealed;
          if (!shown) return null;
          const isRoot = n._depth === 0;
          const tone = n.status >= 400 ? "var(--critical)" : n.status >= 300 ? "var(--warning)" : "var(--accent-brand)";
          const cx = sx(n._x), cy = sy(n._depth);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {n.status >= 400 && (
                <circle cx={cx} cy={cy} r={NODE_R + 5} fill={tone} opacity={0.18} filter="url(#nodeGlow)">
                  <animate attributeName="r" values={`${NODE_R + 3};${NODE_R + 7};${NODE_R + 3}`} dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={cx} cy={cy} r={NODE_R} fill={isRoot ? "var(--accent-brand)" : "var(--surface-2)"} stroke={tone} strokeWidth={isRoot ? 2 : 1.5} />
              {isRoot && <circle cx={cx} cy={cy} r={NODE_R + 3} fill="none" stroke="var(--accent-brand)" strokeWidth={1} opacity={0.4} />}
              <text x={cx} y={cy + 18} textAnchor="middle" className="font-mono" fontSize={9} fill="var(--foreground-secondary)">
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}