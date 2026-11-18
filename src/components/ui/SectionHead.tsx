"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DoubleRule, EASE_EDITORIAL, SectionIndex } from "@/components/ui/Ornaments";

/**
 * The house section header: roman numeral index → oversized Cormorant title
 * revealed from behind a mask → supporting note in the right column → the
 * double rule beneath the whole thing.
 */
export function SectionHead({
  numeral,
  eyebrow,
  title,
  side,
  className,
}: {
  numeral: string;
  eyebrow: string;
  title: ReactNode;
  side?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionIndex numeral={numeral} label={eyebrow} className="mb-8" />
          {/* Viewport detection lives on the unclipped wrapper — a clipped
              child never intersects, so the reveal would never fire. */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            className="clip-line"
          >
            <motion.h2
              variants={{
                hidden: { y: "115%" },
                visible: { y: 0, transition: { duration: 1, ease: EASE_EDITORIAL } },
              }}
              className="font-display text-[2.4rem] font-light leading-[1.02] tracking-tight text-quill sm:text-5xl md:text-6xl lg:text-[4rem]"
            >
              {title}
            </motion.h2>
          </motion.div>
        </div>

        {side && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EDITORIAL }}
            className="text-[15px] leading-[1.75] text-quill-mute md:col-span-5 md:pb-2"
          >
            {side}
          </motion.div>
        )}
      </div>

      <DoubleRule className="mt-12" />
    </div>
  );
}
