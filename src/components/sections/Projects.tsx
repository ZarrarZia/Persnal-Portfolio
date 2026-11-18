"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { DoubleRule, EASE_EDITORIAL, SectionIndex } from "@/components/ui/Ornaments";

/** Status reads in the palette, never in stock semantic colours. */
const STATUS: Record<string, { className: string; label: string }> = {
  Live: { className: "text-sage", label: "Live" },
  "In Development": { className: "text-gold", label: "In Development" },
  Prototype: { className: "text-quill-mute", label: "Prototype" },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  // The section is as tall as the row is wide, which is what converts vertical
  // scroll into horizontal travel while the inner panel stays pinned.
  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      setDist(Math.max(0, row.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-px pb-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionIndex numeral="IV" label="Selected Work" className="mb-8" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clip-line"
              >
                <motion.h2
                  variants={{
                    hidden: { y: "115%" },
                    visible: { y: 0, transition: { duration: 1, ease: EASE_EDITORIAL } },
                  }}
                  className="font-display text-[2.4rem] font-light leading-[1.02] tracking-tight text-quill sm:text-5xl md:text-6xl"
                >
                  Systems in production.
                </motion.h2>
              </motion.div>
            </div>

            <div className="hidden flex-col items-end gap-4 md:flex">
              <span className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
                Scroll to explore
              </span>
              <div className="h-px w-44 overflow-hidden bg-rule/20">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full w-full origin-left bg-gold"
                />
              </div>
            </div>
          </div>

          <DoubleRule className="mt-10" />
        </div>

        {/* --------------------------------------------- HORIZONTAL ROW --- */}
        <motion.div ref={rowRef} style={{ x }} className="flex gap-6 px-6 md:px-12">
          {projects.map((p, i) => {
            const status = STATUS[p.status] ?? STATUS.Prototype;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: i * 0.06, ease: EASE_EDITORIAL }}
                className="card group flex w-[80vw] shrink-0 flex-col justify-between p-8 sm:w-[420px] md:w-[470px] md:p-10"
                style={{ height: "min(62vh, 470px)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-index text-quill-mute">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span
                    className={`inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-label ${status.className}`}
                  >
                    <span className="h-1 w-1 rotate-45 animate-pulse-soft bg-current" />
                    {status.label}
                  </span>
                </div>

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-label text-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-[2.1rem] font-normal leading-tight text-quill md:text-[2.4rem]">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-quill-soft">
                    {p.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-rule/20 pt-7">
                  {p.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="font-display text-[2rem] font-light leading-none text-gold">
                        {m.value}
                      </p>
                      <p className="mt-2.5 font-sans text-[9px] uppercase tracking-label text-quill-mute">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
