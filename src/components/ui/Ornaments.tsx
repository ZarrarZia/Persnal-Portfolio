"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
export const EASE_CURTAIN = [0.83, 0, 0.17, 1] as const;

/** Roman numerals for the nine section indices. */
export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"] as const;

/* -------------------------------------------------------------------------- */
/*  MONOGRAM CREST                                                             */
/* -------------------------------------------------------------------------- */
/**
 * The house mark: "MZZ" letter-spaced inside a die-cut gold hairline square.
 * Used in the top bar, the loader and above the footer rule.
 */
export function Crest({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("plate font-display font-light leading-none text-gold", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.3,
        letterSpacing: "0.08em",
        paddingLeft: "0.08em",
      }}
    >
      MZZ
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  DOUBLE RULE                                                                */
/* -------------------------------------------------------------------------- */
/** Two gold hairlines with a 3px gap, drawn outward from the centre on entry. */
export function DoubleRule({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
      className={cn("rule-double origin-center", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  SECTION INDEX                                                              */
/* -------------------------------------------------------------------------- */
/**
 * Roman numeral → a hairline that draws left-to-right → the section label.
 * Replaces the old cyan mono eyebrow everywhere.
 */
export function SectionIndex({
  numeral,
  label,
  className,
}: {
  numeral: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={cn("flex items-center gap-4", className)}
    >
      <motion.span
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
        className="index-numeral"
      >
        {numeral}
      </motion.span>
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE_EDITORIAL }}
        className="h-px w-10 origin-left bg-gold"
      />
      <motion.span
        variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="eyebrow"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MASKED LINE REVEAL                                                         */
/* -------------------------------------------------------------------------- */
/**
 * Slides a line of type up from behind a mask. The viewport trigger lives on
 * the (unclipped) wrapper — a clipped child would never intersect and the
 * reveal would never fire.
 */
export function LineReveal({
  children,
  delay = 0,
  className,
  as = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const Tag = motion[as];
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="clip-line"
    >
      <Tag
        variants={{
          hidden: { y: "115%" },
          visible: { y: 0, transition: { duration: 1, delay, ease: EASE_EDITORIAL } },
        }}
        className={cn("block", className)}
      >
        {children}
      </Tag>
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  DIAMOND BULLET                                                             */
/* -------------------------------------------------------------------------- */
/** A 4px gold diamond — the house bullet. Never a round dot. */
export function Diamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-gold", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  FADE-UP                                                                    */
/* -------------------------------------------------------------------------- */
/** The house entry animation: drift up 40px and settle. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay, ease: EASE_EDITORIAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
