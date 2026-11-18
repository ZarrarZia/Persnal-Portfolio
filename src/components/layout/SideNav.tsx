"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/sections";

/**
 * The section rail: nine markers down the right edge. The active one becomes a
 * solid gold diamond inside a drawn ring, and reveals its roman numeral +
 * label. A shared layoutId moves the ring between markers.
 */
export function SideNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor="hover"
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`font-sans text-[9px] font-medium uppercase tracking-index transition-all duration-400 ${
                isActive
                  ? "text-gold opacity-100"
                  : "text-quill-mute opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.numeral} · {s.label}
            </span>
            <span className="relative grid h-3.5 w-3.5 place-items-center">
              <span
                className={`rotate-45 transition-all duration-400 ${
                  isActive
                    ? "h-1.5 w-1.5 bg-gold"
                    : "h-1 w-1 bg-quill-mute/45 group-hover:bg-quill-mute"
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="rail-ring"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rotate-45 border border-gold/70"
                />
              )}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
