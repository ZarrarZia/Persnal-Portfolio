"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { siteConfig } from "@/lib/site";
import { Crest, EASE_EDITORIAL } from "@/components/ui/Ornaments";

const links = [
  { icon: FaWhatsapp, href: siteConfig.social.whatsapp, label: "WhatsApp" },
  { icon: FaLinkedinIn, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FaEnvelope, href: siteConfig.social.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-14 pt-24">
      <div className="container-px">
        {/* The double rule, with the crest sitting on it — the rules appear to
            pass behind the mark. */}
        <div className="relative">
          <div className="rule-double" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-canvas px-6">
            <Crest size={44} />
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
          className="mt-16 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start"
        >
          <div className="text-center md:text-left">
            <p className="font-display text-3xl font-light leading-none text-quill">
              Zarrar
              <span className="ml-1 inline-block h-1.5 w-1.5 bg-gold align-baseline" />
            </p>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-label text-quill-mute">
              AI Developer &amp; Agentic AI Engineer
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor="hover"
                className="plate h-11 w-11 transition-transform duration-300 hover:-translate-y-1"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
              © 2026 — Built end to end
            </p>
            <a href="#home" data-cursor="hover" className="btn-link mt-4 inline-flex">
              Back to top
              <span aria-hidden className="text-sm leading-none">↑</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Oversized wordmark watermark, cropped by the bottom edge. */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_EDITORIAL }}
        className="pointer-events-none mt-12 select-none whitespace-nowrap text-center font-display text-[22vw] font-light leading-[0.62] tracking-tight text-quill/[0.045]"
      >
        ZARRAR
      </motion.p>
    </footer>
  );
}
