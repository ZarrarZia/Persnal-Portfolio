"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { skills, skillCategories } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_EDITORIAL } from "@/components/ui/Ornaments";

interface Node {
  id: string;
  label: string;
  level: number;
  description: string;
  x: number;
  y: number;
}

/** Golden-angle spiral, stretched to a wide field. */
function layout(): Node[] {
  const n = skills.length;
  return skills.map((s, i) => {
    const a = i * 2.399963;
    const r = Math.sqrt(i / n);
    // Rounded so SSR and client compute identical coordinates — Math.cos can
    // differ in the last bits between Node and the browser, which would
    // otherwise be a hydration mismatch.
    return {
      id: s.id,
      label: s.label,
      level: s.level,
      description: s.description,
      x: +(50 + Math.cos(a) * r * 42).toFixed(3),
      y: +(50 + Math.sin(a) * r * 36).toFixed(3),
    };
  });
}

export function Skills() {
  const nodes = useMemo(layout, []);
  const [hover, setHover] = useState<string | null>(null);
  const reduce = usePrefersReducedMotion();

  const lines = useMemo(() => {
    const out: { a: Node; b: Node }[] = [];
    nodes.forEach((p, i) => {
      [i - 1, i - 3].forEach((j) => {
        if (j >= 0) out.push({ a: p, b: nodes[j] });
      });
    });
    return out;
  }, [nodes]);

  const active = nodes.find((n) => n.id === hover) ?? null;

  return (
    <SectionShell id="skills">
      <SectionHead
        numeral="V"
        eyebrow="The Stack"
        title={<>A connected system of capabilities.</>}
        side={
          <>
            AI, backend, frontend, data, DevOps and the AI platforms I build
            with — wired into one network I reach across daily.
          </>
        }
      />

      {/* ------------------------------------------------ CONSTELLATION --- */}
      <div className="relative mt-16 h-[440px] w-full md:h-[540px]">
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {lines.map((l, i) => (
            <motion.line
              key={i}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              className="stroke-gold"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.16 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: i * 0.018, ease: EASE_EDITORIAL }}
            />
          ))}
        </svg>

        {nodes.map((p, i) => {
          const size = 9 + (p.level / 100) * 11;
          const isActive = hover === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.035, type: "spring", stiffness: 190, damping: 17 }}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.id)}
              onBlur={() => setHover(null)}
              data-cursor="hover"
              aria-label={`${p.label} — ${p.description}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, -(3 + (i % 3) * 1.5), 0] }}
                transition={{
                  duration: 4 + (i % 4),
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (i % 5) * 0.45,
                }}
                className="relative flex flex-col items-center"
              >
                {/* Hollow ring with a solid centre — an engraved star chart. */}
                <span
                  className="grid place-items-center rounded-full border transition-all duration-300"
                  style={{
                    width: size,
                    height: size,
                    borderColor: isActive
                      ? "rgb(var(--gold))"
                      : "rgb(var(--gold) / 0.55)",
                    borderWidth: isActive ? 1.5 : 1,
                    background: isActive ? "rgb(var(--wine) / 0.35)" : "transparent",
                  }}
                >
                  <span className="h-[3px] w-[3px] rounded-full bg-gold" />
                </span>
                <span
                  className={`mt-2 whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive ? "text-quill" : "text-quill-mute"
                  }`}
                >
                  {p.label}
                </span>
              </motion.span>
            </motion.button>
          );
        })}

        {/* Floating tooltip card, anchored to the hovered node. */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
              className="pointer-events-none absolute z-20 w-60 -translate-x-1/2 -translate-y-full border border-gold/40 bg-raised p-5 shadow-none"
              style={{ left: `${active.x}%`, top: `calc(${active.y}% - 26px)` }}
            >
              <p className="font-display text-lg font-normal leading-tight text-quill">
                {active.label}
              </p>
              <span aria-hidden className="mt-2.5 block h-px w-6 bg-gold/60" />
              <p className="mt-3 text-[13px] leading-relaxed text-quill-mute">
                {active.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------ LEGEND ---- */}
      <div className="mt-10 border-t border-rule/15 pt-9">
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          {skillCategories.map((c) => (
            <span
              key={c.key}
              className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-label text-quill-mute"
            >
              <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
