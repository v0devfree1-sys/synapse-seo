import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Radar, Globe, ArrowRight, Lock } from "lucide-react";
import Atmosphere from "@/components/Atmosphere";

// Project onboarding — the URL field is an instrument, not a form.
export default function Launch({ onActivate }) {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState(null);

  const normalize = (v) => {
    let val = v.trim();
    if (!val) return "";
    if (!/^https?:\/\//i.test(val)) val = "https://" + val;
    return val;
  };

  useEffect(() => {
    if (!url) { setValid(null); return; }
    try {
      const u = new URL(normalize(url));
      setValid(u.hostname.includes(".") && u.hostname.length > 3);
    } catch { setValid(false); }
  }, [url]);

  const submit = () => {
    if (!valid) return;
    const u = new URL(normalize(url));
    onActivate(u.hostname.replace(/^www\./, ""));
  };

  return (
    <div className="relative flex min-h-full items-center justify-center px-6 py-16">
      <Atmosphere interactive />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="eyebrow">AI SEO Intelligence OS</span>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Understand what
            <br />
            <span style={{ background: "linear-gradient(120deg, var(--accent-brand), var(--accent-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Google sees.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-fg-secondary">
            Crawl, analyze, and visualize your entire site architecture — then let AI prioritize what actually moves rankings.
          </p>
        </motion.div>

        {/* Instrument field */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-9"
        >
          <div
            className="relative flex items-center gap-3 rounded-lg border bg-[var(--surface-0)]/80 px-4 py-4 backdrop-blur-xl transition-all duration-[var(--duration-normal)]"
            style={{
              borderColor: focused ? "var(--border-active)" : "var(--border)",
              boxShadow: focused
                ? "0 0 0 1px var(--border-active), 0 0 40px -8px rgba(244,63,94,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <Globe className={`h-5 w-5 shrink-0 transition-colors ${focused ? "" : "text-fg-secondary"}`} style={focused ? { color: "var(--accent-brand)" } : {}} />
            <div className="flex flex-1 items-center gap-1.5">
              <AnimatePresence mode="popLayout">
                {focused && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                    className="font-mono text-sm text-fg-secondary whitespace-nowrap"
                  >
                    https://
                  </motion.span>
                )}
              </AnimatePresence>
              <input
                value={url.replace(/^https?:\/\//i, "")}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="example.com"
                className="w-full bg-transparent font-mono text-base text-foreground outline-none placeholder:text-fg-secondary/60"
              />
            </div>
            <AnimatePresence>
              {valid === true && (
                <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0 }}
                  className="h-2 w-2 rounded-full" style={{ background: "var(--success)" }} />
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={submit}
            disabled={!valid}
            whileHover={valid ? { scale: 1.01 } : {}}
            whileTap={valid ? { scale: 0.99 } : {}}
            className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-lg py-3.5 font-display text-sm font-semibold tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: valid ? "linear-gradient(120deg, var(--accent-brand), var(--accent-secondary))" : "var(--surface-2)",
              color: "#fff",
              boxShadow: valid ? "0 8px 30px -8px rgba(244,63,94,0.5)" : "none",
            }}
          >
            <Radar className="h-4 w-4" />
            ACTIVATE SCAN ENGINE
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-5 text-center font-mono text-[11px] text-fg-secondary/70"
        >
          No signup required for demo · Press <Lock className="inline h-3 w-3" /> ⌘K anytime
        </motion.p>
      </div>
    </div>
  );
}