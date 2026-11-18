"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_EDITORIAL, SectionIndex } from "@/components/ui/Ornaments";

// WebGL only ever runs in the browser, and it should never block first paint.
const JewelScene = dynamic(() => import("@/components/three/JewelScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const stats = [
  { value: 3, suffix: "+", label: "Years building AI" },
  { value: 8, suffix: "+", label: "Systems in production" },
  { value: 10, suffix: "+", label: "LLM integrations" },
  { value: 60, suffix: "fps", label: "Relentlessly tuned" },
];

const marquee = [
  "OpenAI", "Claude", "Gemini", "Ollama", "Node.js",
  "Python", "FastAPI", "Docker", "Redis", "Supabase",
];

/**
 * Eased count-up. Initial state is the REAL value (not 0) so the
 * server-rendered HTML and the no-JS/crawler view read the true number — the
 * animation is a client-side enhancement only.
 */
function StatCounter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(value);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / 1500, 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, reduce]);

  return (
    <>
      {n}
      <span className="text-gold">{suffix}</span>
    </>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % siteConfig.titles.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-32 lg:pb-20"
    >
      <div className="container-px grid w-full items-center gap-16 lg:grid-cols-12 lg:gap-8">
        {/* ------------------------------------------------------- LEFT --- */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <SectionIndex numeral="I" label="Introduction" className="mb-9" />
          </motion.div>

          <h1 className="font-display text-[3.1rem] font-light leading-[0.98] tracking-tight text-quill sm:text-7xl lg:text-[5.4rem]">
            {["Hi, I'm", "Muhammad", "Zarrar Zia"].map((line, idx) => (
              <span key={line} className="clip-line">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, ease: EASE_EDITORIAL, delay: 0.4 + idx * 0.13 }}
                  className="block"
                >
                  {idx === 0 && <span className="text-quill-mute">{line}</span>}
                  {idx === 1 && <span>{line}</span>}
                  {idx === 2 && (
                    <span className="text-gold">
                      {line}
                      <span className="ml-1.5 inline-block h-2.5 w-2.5 bg-wine align-baseline" />
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE_EDITORIAL }}
            className="mt-9 max-w-prose text-pretty text-[17px] leading-[1.8] text-quill-soft"
          >
            An AI developer building intelligent systems, autonomous agents and
            scalable AI pipelines with OpenAI, Claude &amp; Gemini for modern products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE_EDITORIAL }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" data-cursor="hover" className="btn-primary">
              See my work
            </a>
            <a href="#contact" data-cursor="hover" className="btn-ghost">
              Start a project
            </a>

            <span className="ml-2 inline-flex h-5 items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={siteConfig.titles[i]}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                  className="inline-flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-label text-quill-mute"
                >
                  <span className="h-1 w-1 rotate-45 animate-pulse-soft bg-gold" />
                  {siteConfig.titles[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Statistics, separated by vertical hairlines. */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE_EDITORIAL }}
            className="mt-16 grid max-w-2xl grid-cols-2 gap-y-8 sm:grid-cols-4"
          >
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={idx > 0 ? "sm:border-l sm:border-rule/20 sm:pl-6" : ""}
              >
                <dd className="font-display text-4xl font-light leading-none text-quill md:text-[2.9rem]">
                  <StatCounter value={s.value} suffix={s.suffix} start={ready} />
                </dd>
                <dt className="mt-3 font-sans text-[10px] uppercase tracking-label text-quill-mute">
                  {s.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------------------------------ RIGHT — 3D ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.7, ease: EASE_EDITORIAL }}
          className="relative h-[340px] w-full sm:h-[440px] lg:col-span-5 lg:h-[600px]"
        >
          {/* Concentric hairline rings sit behind the stone like a mount. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="absolute aspect-square w-[78%] rounded-full border border-gold/[0.16]" />
            <span className="absolute aspect-square w-[58%] rounded-full border border-gold/[0.10]" />
            <span className="absolute aspect-square w-[38%] animate-spin-slow rounded-full border border-dashed border-gold/[0.18]" />
          </div>

          <JewelScene />

          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[9px] uppercase tracking-index text-quill-mute/70">
            Agentic AI · In the round
          </p>
        </motion.div>
      </div>

      {/* --------------------------------------------------- MARQUEE ------ */}
      <div className="marquee-paused absolute inset-x-0 bottom-0 overflow-hidden border-t border-rule/15 py-5 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...marquee, ...marquee].map((m, idx) => (
            <span
              key={idx}
              className="flex items-center font-sans text-[10px] uppercase tracking-index text-quill-mute"
            >
              {m}
              <span aria-hidden className="mx-8 h-1 w-1 rotate-45 bg-gold/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
