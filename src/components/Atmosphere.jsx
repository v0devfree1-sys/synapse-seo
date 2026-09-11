import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Restrained atmospheric background — slow-moving rose/magenta orbs + radial illumination.
// Never placed behind dense tables. Pointer-reactive only on the launch surface.
export default function Atmosphere({ intensity = 1, interactive = false }) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.4 });

  useEffect(() => {
    if (!interactive) return;
    const handler = (e) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [interactive]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(244,63,94,0.10), transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(217,70,239,0.07), transparent 50%)",
        }}
      />
      {/* slow orbs */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 520, height: 520,
          left: "12%", top: "8%",
          background: "radial-gradient(circle, rgba(244,63,94,0.16), transparent 70%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], opacity: [0.7, 1, 0.8, 0.7] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px]"
        style={{
          width: 460, height: 460,
          right: "8%", bottom: "6%",
          background: "radial-gradient(circle, rgba(217,70,239,0.13), transparent 70%)",
        }}
        animate={{ x: [0, -30, 10, 0], y: [0, 20, -10, 0], opacity: [0.6, 0.9, 0.7, 0.6] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* pointer-reactive glow */}
      {interactive && (
        <div
          className="absolute h-[420px] w-[420px] rounded-full blur-[100px] transition-[left,top] duration-[var(--duration-slow)]"
          style={{
            left: `calc(${pos.x * 100}% - 210px)`,
            top: `calc(${pos.y * 100}% - 210px)`,
            background: "radial-gradient(circle, rgba(244,63,94,0.14), transparent 70%)",
          }}
        />
      )}
      {/* fine grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}