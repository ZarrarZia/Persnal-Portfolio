"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Crest, EASE_CURTAIN, EASE_EDITORIAL } from "@/components/ui/Ornaments";

// Plays for ~2.4s on the first visit, then skips on same-session reloads (and
// for reduced-motion visitors) so it never becomes a repeat toll.
const FILL_MS = 2400;

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("zz_loaded");
    if (seen || reduce) {
      setDone(true);
      onComplete?.();
      return;
    }
    sessionStorage.setItem("zz_loaded", "1");

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / FILL_MS, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setDone(true); onComplete?.(); }, 140);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_CURTAIN }}
          className="loader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-canvas"
        >
          {/* Engraved certificate frame. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            aria-hidden
            className="pointer-events-none absolute inset-6 border border-gold/25 sm:inset-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
          >
            <Crest size={46} />
          </motion.div>

          <div className="mt-8 overflow-hidden">
            <motion.p
              initial={{ y: "130%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EDITORIAL, delay: 0.1 }}
              className="eyebrow text-gold"
            >
              AI Developer · Agentic AI Engineer
            </motion.p>
          </div>

          <div className="overflow-hidden px-6">
            {/* Visual wordmark only — the page's single H1 lives in the hero. */}
            <motion.div
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE_EDITORIAL, delay: 0.18 }}
              aria-hidden
              className="mt-4 font-display text-6xl font-light tracking-tight text-quill sm:text-8xl"
            >
              Zarrar<span className="ml-0.5 inline-block h-2 w-2 bg-gold align-baseline sm:h-2.5 sm:w-2.5" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 h-px w-56 overflow-hidden bg-rule/20 sm:w-72"
          >
            <div
              className="h-full bg-gold transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="absolute bottom-12 right-12 font-sans text-[10px] tabular-nums uppercase tracking-index text-quill-mute sm:bottom-16 sm:right-16"
          >
            {String(progress).padStart(3, "0")}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
