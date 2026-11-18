"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { siteConfig } from "@/lib/site";
import { sections } from "@/lib/sections";
import { Crest, EASE_EDITORIAL } from "@/components/ui/Ornaments";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const nav = [
  { label: "Journey", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/** Two hairlines that cross into an ×. Replaces the filled hamburger icon. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-5">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
        className="absolute left-0 top-0 h-px w-full origin-center bg-current"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
        className="absolute bottom-0 left-0 h-px w-full origin-center bg-current"
      />
    </span>
  );
}

export function TopBar() {
  const { enabled, toggle } = useAmbientSound();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A full-screen drawer that can still be scrolled behind is a trap on mobile.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE_EDITORIAL }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-rule/20 bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Reading progress — a single gold hairline across the very top edge. */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gold"
        />

        {/* A three-column grid rather than an absolutely-centred nav: the middle
            track absorbs the slack, so the links can never ride over the
            controls on the right at awkward widths. */}
        <div
          className={`container-px grid grid-cols-[auto_1fr_auto] items-center transition-[height] duration-500 ${
            scrolled ? "h-[62px]" : "h-[76px]"
          }`}
        >
          <a href="#home" data-cursor="hover" className="flex items-center gap-3.5">
            <Crest size={scrolled ? 30 : 34} className="transition-all duration-500" />
            <span className="hidden font-sans text-[11px] font-medium uppercase tracking-label text-quill sm:block">
              Zarrar Zia
            </span>
          </a>

          <nav className="hidden items-center justify-center gap-7 lg:flex xl:gap-9">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-cursor="hover"
                className="group relative whitespace-nowrap py-1 font-sans text-[11px] font-medium uppercase tracking-label text-quill-mute transition-colors duration-300 hover:text-quill"
              >
                {n.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-editorial group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <ThemeToggle />
            <button
              onClick={toggle}
              data-cursor="hover"
              aria-pressed={enabled}
              aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
              className="hidden text-quill-mute transition-colors duration-300 hover:text-gold xl:block"
            >
              {enabled ? <HiVolumeUp size={17} /> : <HiVolumeOff size={17} />}
            </button>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="btn-primary hidden h-11 px-6 lg:inline-flex"
            >
              Start a project
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              aria-label="Menu"
              aria-expanded={open}
              className="text-quill lg:hidden"
            >
              <MenuGlyph open={open} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ------------------------------------------------ MOBILE DRAWER ----
          A full-screen engraved card: hairline frame inset from every edge,
          roman-numeral index column, oversized serif labels. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-canvas lg:hidden"
          >
            <div className="absolute inset-4 border border-gold/25" />

            <div className="relative flex h-full flex-col overflow-y-auto px-10 pb-10 pt-8">
              <div className="flex items-center justify-between">
                <Crest size={34} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-quill"
                >
                  <MenuGlyph open />
                </button>
              </div>

              <nav className="mt-12 flex-1">
                {sections.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.5, ease: EASE_EDITORIAL }}
                    className="group flex items-baseline gap-5 border-b border-rule/12 py-3.5"
                  >
                    <span className="w-9 shrink-0 font-sans text-[10px] font-medium uppercase tracking-index text-gold">
                      {s.numeral}
                    </span>
                    <span className="font-display text-[2rem] font-light leading-tight text-quill transition-colors duration-300 group-hover:text-gold">
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-10 space-y-5">
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Start a project
                </a>
                <p className="text-center font-sans text-xs text-quill-mute">
                  {siteConfig.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
