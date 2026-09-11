import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

// Instrument-style health ring with ambient rose energy + tabular count-up.
export default function ScoreRing({ value = 0, size = 220, stroke = 10, label, sublabel, delta }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const display = useMotionValue(0);
  const rounded = useTransform(display, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(display, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [value]);

  const offset = useTransform(display, (v) => c - (v / 100) * c);
  const tone = value >= 85 ? "var(--success)" : value >= 70 ? "var(--warning)" : "var(--critical)";

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} filter="url(#ringGlow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="tabular font-display font-bold leading-none text-glow-brand"
          style={{ fontSize: size * 0.34, color: "var(--foreground)" }}
        >
          {rounded}
        </motion.span>
        {label && <span className="eyebrow mt-2">{label}</span>}
        {sublabel && (
          <span className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: tone }}>
            {delta != null && (delta > 0 ? "▲" : "▼")} {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}