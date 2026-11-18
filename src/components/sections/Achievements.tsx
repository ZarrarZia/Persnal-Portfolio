"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { achievements } from "@/lib/data";
import { EASE_EDITORIAL } from "@/components/ui/Ornaments";

/* --------------------------------------------------------------------------
   Fine-line glyphs. Drawn here rather than pulled from an icon set so every
   mark shares the same 1.25px stroke weight and open, engraved character.
   -------------------------------------------------------------------------- */
type GlyphProps = { className?: string };
const svg = (children: React.ReactNode) =>
  function Glyph({ className }: GlyphProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.25}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {children}
      </svg>
    );
  };

/** A neural node cluster — three linked points around a centre. */
const Neural = svg(
  <>
    <circle cx="12" cy="12" r="2.1" />
    <circle cx="5" cy="6.5" r="1.6" />
    <circle cx="19" cy="6.5" r="1.6" />
    <circle cx="5.5" cy="18" r="1.6" />
    <circle cx="18.5" cy="18" r="1.6" />
    <path d="M6.3 7.6 10.4 10.7M17.7 7.6 13.6 10.7M6.8 16.9l3.7-3.2M17.2 16.9l-3.7-3.2" />
  </>
);

/** A controller, drawn as an outline. */
const Controller = svg(
  <>
    <path d="M8.5 8.5h7a5.5 5.5 0 0 1 5 7.8c-.6 1.3-2.2 1.7-3.2.7l-1.6-1.6H8.3l-1.6 1.6c-1 1-2.6.6-3.2-.7a5.5 5.5 0 0 1 5-7.8Z" />
    <path d="M7 12.2h2.4M8.2 11v2.4M15.4 11.8h.01M17.2 13.4h.01" />
  </>
);

/** Three figures — a team. */
const Team = svg(
  <>
    <circle cx="12" cy="8" r="2.6" />
    <path d="M7.4 18.2a4.6 4.6 0 0 1 9.2 0" />
    <circle cx="4.6" cy="10.6" r="1.9" />
    <path d="M1.6 17.4a3.4 3.4 0 0 1 3.6-3.2" />
    <circle cx="19.4" cy="10.6" r="1.9" />
    <path d="M22.4 17.4a3.4 3.4 0 0 0-3.6-3.2" />
  </>
);

/** Concentric target with a struck centre. */
const Target = svg(
  <>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1" />
  </>
);

const GLYPHS: Record<string, ComponentType<GlyphProps>> = {
  brain: Neural,
  gamepad: Controller,
  users: Team,
  target: Target,
};

export function Achievements() {
  return (
    <SectionShell id="achievements">
      <SectionHead
        numeral="VIII"
        eyebrow="Recognition"
        title={<>Workshops, talks &amp; credentials.</>}
        side={
          <>
            A track record of teaching, leading and shipping — recognized along
            the way.
          </>
        }
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Glyph = GLYPHS[a.icon] ?? Neural;
          return (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: EASE_EDITORIAL }}
              className="card group p-8 md:p-9"
            >
              <span className="plate h-13 w-13" style={{ width: 52, height: 52 }}>
                <Glyph className="h-5 w-5 transition-transform duration-300 ease-editorial group-hover:scale-110" />
              </span>

              <h3 className="mt-8 font-display text-[1.45rem] font-normal leading-snug text-quill">
                {a.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-quill-soft">{a.description}</p>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
