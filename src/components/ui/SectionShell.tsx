"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Full-width section wrapper. Generous vertical rhythm (160px desktop) plus a
 * restrained scroll-linked drift so content settles into place rather than
 * snapping. Opacity never drops below 0.75 — a section you're still reading
 * should not fade out under you.
 */
export function SectionShell({
  id,
  children,
  className,
  parallax = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.25, 1], parallax ? [56, 0, -28] : [0, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [0, 1, 1, 0.75]);

  return (
    <section ref={ref} id={id} className={cn("relative py-24 md:py-32 lg:py-40", className)}>
      <motion.div style={{ y, opacity }} className="container-px">
        {children}
      </motion.div>
    </section>
  );
}
