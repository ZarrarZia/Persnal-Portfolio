"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { education } from "@/lib/data";
import { Diamond, EASE_EDITORIAL } from "@/components/ui/Ornaments";

/** Fine-line mortarboard — 1.25px strokes, matching the icon system. */
function Cap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" className={className}>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" strokeLinejoin="round" />
      <path d="M6.5 10.8v4.4c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.4" strokeLinecap="round" />
      <path d="M21.5 8.5v5" strokeLinecap="round" />
    </svg>
  );
}

export function Education() {
  return (
    <SectionShell id="education">
      <SectionHead
        numeral="VII"
        eyebrow="Education"
        title={<>Built on engineering fundamentals.</>}
        side={
          <>
            The formal foundation — systems thinking, algorithms and
            architecture — that every production AI system stands on.
          </>
        }
      />

      <div className="mt-16 space-y-6">
        {education.map((e) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
            className="card card-static group grid gap-10 p-8 md:grid-cols-12 md:p-12"
          >
            {/* Identity */}
            <div className="md:col-span-7">
              <div className="flex items-start gap-5">
                <span className="plate h-14 w-14">
                  <Cap className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </span>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
                    {e.period} · {e.location}
                  </span>
                  <h3 className="mt-2 font-display text-[2rem] font-normal leading-tight text-quill md:text-[2.4rem]">
                    {e.degree}
                  </h3>
                </div>
              </div>
              <p className="mt-4 font-sans text-[10px] uppercase tracking-label text-gold">
                {e.institution}
              </p>
              <p className="mt-6 max-w-prose text-[15px] leading-[1.8] text-quill-soft">
                {e.description}
              </p>
            </div>

            {/* Standing + highlights */}
            <div className="flex flex-col justify-between gap-8 md:col-span-5 md:border-l md:border-rule/20 md:pl-10">
              <div>
                <p className="font-display text-[3.2rem] font-light leading-none text-gold">
                  {e.grade}
                </p>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-label text-quill-mute">
                  Academic standing
                </p>
              </div>

              <ul className="space-y-4">
                {e.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.09, ease: EASE_EDITORIAL }}
                    className="flex items-start gap-3.5 text-[14px] leading-relaxed text-quill-soft"
                  >
                    <Diamond />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
