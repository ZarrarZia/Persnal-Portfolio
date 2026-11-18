"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { experiences } from "@/lib/data";
import { Diamond, EASE_EDITORIAL } from "@/components/ui/Ornaments";

/** Fine-line arrow — no filled icons anywhere in this system. */
function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" strokeWidth={1.25} stroke="currentColor" className={className}>
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Experience() {
  return (
    <SectionShell id="experience">
      <SectionHead
        numeral="III"
        eyebrow="How I Work"
        title={<>Experience, engineered end to end.</>}
        side={
          <>
            Roles where I shipped AI into production — from LLM backends and
            agentic workflows to containerized pipelines that scale.
          </>
        }
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: EASE_EDITORIAL }}
            className="card group flex flex-col p-8 md:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
                {exp.period}
              </span>
              <Arrow className="h-4 w-4 shrink-0 text-quill-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
            </div>

            <h3 className="mt-10 font-display text-[1.9rem] font-normal leading-tight text-quill">
              {exp.role}
            </h3>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-label text-gold">
              {exp.company}
            </p>

            <span aria-hidden className="mt-6 h-px w-8 bg-gold/50" />

            <p className="mt-6 text-[15px] leading-[1.8] text-quill-soft">{exp.summary}</p>

            <ul className="mt-7 space-y-3">
              {exp.responsibilities.slice(0, 3).map((r) => (
                <li key={r} className="flex items-start gap-3 text-[14px] leading-relaxed text-quill-soft">
                  <Diamond />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {exp.stack.slice(0, 4).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
