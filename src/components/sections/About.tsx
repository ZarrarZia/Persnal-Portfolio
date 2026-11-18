"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { timeline } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { EASE_EDITORIAL } from "@/components/ui/Ornaments";

export function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.7", "end 0.55"],
  });
  // Spring-smoothed so the marker glides instead of tracking the wheel 1:1.
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });
  const height = useTransform(fill, [0, 1], ["0%", "100%"]);
  const markerY = useTransform(fill, [0, 1], ["0%", "100%"]);

  return (
    <SectionShell id="about">
      <SectionHead
        numeral="II"
        eyebrow="The Journey"
        title={
          <>
            An engineered path, <br className="hidden sm:block" />
            student to AI architect.
          </>
        }
        side={
          <>
            No shortcuts. Every chapter moved through the same disciplined arc —
            from first line of code to autonomous systems in production.
          </>
        }
      />

      {/* Quotable lead — real text in the rendered HTML for humans and AI search
          engines alike. The full bio still ships in JSON-LD. */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        className="drop-cap mt-16 max-w-prose text-pretty text-[17px] leading-[1.85] text-quill-soft"
      >
        {siteConfig.bioShort}
      </motion.p>

      <div ref={lineRef} className="relative mt-20 pl-10 md:pl-20">
        {/* Track, gold fill, and the diamond that rides the leading edge. */}
        <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-rule/18 md:left-[15px]" />
        <motion.div
          style={{ height }}
          className="absolute left-[7px] top-2 w-px bg-gold md:left-[15px]"
        />
        <motion.div
          style={{ top: markerY }}
          className="absolute left-[7px] z-10 -translate-x-1/2 md:left-[15px]"
        >
          <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
        </motion.div>

        <div className="space-y-6">
          {timeline.map((s, idx) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-14%" }}
              transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
              className="card group relative p-8 md:p-10"
            >
              {/* The connector hairline from the spine to the card. */}
              <span
                aria-hidden
                className="absolute -left-[42px] top-12 hidden h-px w-[42px] bg-rule/25 transition-colors duration-500 group-hover:bg-gold/60 md:block"
              />

              <div className="flex items-center gap-5">
                <span className="font-display text-2xl font-light leading-none text-gold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-6 bg-rule/30" />
                <span className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
                  {s.year}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[1.75rem] font-normal leading-tight text-quill md:text-[2rem]">
                {s.title}
              </h3>
              <p className="mt-1.5 font-sans text-[10px] uppercase tracking-label text-gold">
                {s.subtitle}
              </p>
              <p className="mt-5 max-w-prose text-[15px] leading-[1.8] text-quill-soft">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
