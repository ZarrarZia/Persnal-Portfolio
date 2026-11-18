"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6",
          scrolled ? "glass-strong shadow-glow" : "bg-transparent"
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 font-display text-base font-extrabold text-[#05060a]">
            Z
            <span className="absolute inset-0 rounded-lg bg-cyan-400/40 blur-md transition group-hover:bg-purple-500/50" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-white/90 sm:block">
            Zarrar Zia
            <span className="block text-[10px] font-normal uppercase tracking-[0.3em] text-cyan-300/70">
              The AI Architect
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden overflow-hidden rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition sm:inline-flex"
          >
            <span className="relative z-10">Hire Me</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 transition-transform duration-500 group-hover:translate-x-0" />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong absolute inset-x-4 top-24 z-40 overflow-hidden rounded-2xl p-3 lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block rounded-xl px-4 py-3 text-base font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
