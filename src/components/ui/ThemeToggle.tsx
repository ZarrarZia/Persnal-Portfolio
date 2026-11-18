"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/* Fine-line glyphs — 1.25px strokes, no filled icons anywhere in this system. */
function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" className={className}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" className={className}>
      <circle cx="12" cy="12" r="4.2" />
      <path
        strokeLinecap="round"
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
      />
    </svg>
  );
}

/**
 * Day/night switch rendered as a hairline capsule with a travelling gold pill.
 * Clicking hands the pointer position to the theme provider, which expands a
 * circular gold ink-wash from that exact point across the page.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      data-cursor="hover"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to day" : "Switch to night"}
      title={isDark ? "Day" : "Night"}
      className={cn(
        "relative inline-flex h-7 w-[58px] shrink-0 items-center rounded-full border border-rule/35 px-1 transition-colors duration-500 hover:border-gold/70",
        className
      )}
    >
      {/* The pill slides between the two glyphs; layout animation does the easing. */}
      <motion.span
        aria-hidden
        layout
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        className="absolute h-5 w-5 rounded-full bg-gold/15 ring-1 ring-gold/60"
        style={isDark ? { left: 4 } : { right: 4 }}
      />
      <span className="relative z-10 grid w-1/2 place-items-center">
        <Moon
          className={cn(
            "h-3.5 w-3.5 transition-colors duration-500",
            isDark ? "text-gold" : "text-quill-mute"
          )}
        />
      </span>
      <span className="relative z-10 grid w-1/2 place-items-center">
        <Sun
          className={cn(
            "h-3.5 w-3.5 transition-colors duration-500",
            isDark ? "text-quill-mute" : "text-gold"
          )}
        />
      </span>
    </button>
  );
}
