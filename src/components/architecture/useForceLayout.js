import { useCallback, useEffect, useRef, useState } from "react";

// Lightweight force-directed simulation: pairwise repulsion, spring attraction
// along edges, weak center gravity, decaying alpha. Nodes can be pinned by drag.
export default function useForceLayout({ nodes, edges, width, height }) {
  const [positions, setPositions] = useState([]);
  const simRef = useRef(null);

  useEffect(() => {
    if (!width || !height || !nodes.length) return undefined;

    const pts = nodes.map((n) => ({
      id: n.id,
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      vx: 0, vy: 0, fx: null, fy: null,
    }));
    const byId = new Map(pts.map((p) => [p.id, p]));
    const springs = edges
      .map((e) => [byId.get(e.source), byId.get(e.target)])
      .filter(([a, b]) => a && b);

    const sim = { pts, springs, alpha: 1, width, height, start: null };
    simRef.current = sim;

    let raf = 0;
    let running = false;

    const step = () => {
      const { pts: P, springs: S, alpha } = sim;
      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        for (let j = i + 1; j < P.length; j++) {
          const b = P[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy || 1;
          const d = Math.sqrt(d2);
          const f = (2600 / d2) * alpha;
          const ux = dx / d;
          const uy = dy / d;
          a.vx -= ux * f; a.vy -= uy * f;
          b.vx += ux * f; b.vy += uy * f;
        }
      }
      for (const [a, b] of S) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.max(Math.hypot(dx, dy), 1);
        const f = (d - 130) * 0.018 * alpha;
        const ux = dx / d;
        const uy = dy / d;
        a.vx += ux * f; a.vy += uy * f;
        b.vx -= ux * f; b.vy -= uy * f;
      }
      for (const p of P) {
        p.vx += (width / 2 - p.x) * 0.004 * alpha;
        p.vy += (height / 2 - p.y) * 0.004 * alpha;
        p.vx *= 0.86; p.vy *= 0.86;
        if (p.fx != null) {
          p.x = p.fx; p.y = p.fy; p.vx = 0; p.vy = 0;
        } else {
          p.x = Math.min(width - 26, Math.max(26, p.x + p.vx));
          p.y = Math.min(height - 26, Math.max(26, p.y + p.vy));
        }
      }
      sim.alpha *= 0.994;
      setPositions(P.map((p) => ({ id: p.id, x: p.x, y: p.y })));
    };

    const loop = () => {
      step();
      if (sim.alpha > 0.02) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const start = () => {
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
    };
    sim.start = start;
    start();

    return () => { cancelAnimationFrame(raf); running = false; };
  }, [nodes, edges, width, height]);

  const dragTo = useCallback((id, x, y) => {
    const sim = simRef.current;
    if (!sim) return;
    const p = sim.pts.find((q) => q.id === id);
    if (!p) return;
    p.fx = x; p.fy = y;
    sim.alpha = Math.max(sim.alpha, 0.3);
    sim.start();
  }, []);

  const endDrag = useCallback((id) => {
    const sim = simRef.current;
    if (!sim) return;
    const p = sim.pts.find((q) => q.id === id);
    if (p) { p.fx = null; p.fy = null; }
    sim.alpha = Math.max(sim.alpha, 0.25);
    sim.start();
  }, []);

  return { positions, dragTo, endDrag };
}