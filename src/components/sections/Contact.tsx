"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa6";
import { SectionShell } from "@/components/ui/SectionShell";
import { socials } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DoubleRule, EASE_EDITORIAL, SectionIndex } from "@/components/ui/Ornaments";

const channels = [
  { id: "whatsapp", icon: FaWhatsapp },
  { id: "linkedin", icon: FaLinkedinIn },
  { id: "email", icon: FaEnvelope },
  { id: "phone", icon: FaPhone },
  { id: "instagram", icon: FaInstagram },
];

// Pre-filled so the chat opens ready to go.
const whatsappLink = `${siteConfig.social.whatsapp}?text=${encodeURIComponent(
  "Hi Zarrar, I came across your portfolio and I'd like to talk about a project."
)}`;

export function Contact() {
  const reduce = usePrefersReducedMotion();

  return (
    <SectionShell id="contact" parallax={false}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* --------------------------------------------------------- LEFT */}
        <div className="lg:col-span-6">
          <SectionIndex numeral="IX" label="Let's Build" className="mb-9" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="clip-line"
          >
            <motion.h2
              variants={{
                hidden: { y: "115%" },
                visible: { y: 0, transition: { duration: 1, ease: EASE_EDITORIAL } },
              }}
              className="font-display text-[2.6rem] font-light leading-[1.02] tracking-tight text-quill sm:text-6xl lg:text-[4.4rem]"
            >
              Tell me what you <br className="hidden sm:block" />
              want to <span className="text-gold">build</span>
              <span className="ml-1 inline-block h-2.5 w-2.5 bg-wine align-baseline" />
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EDITORIAL }}
            className="mt-8 max-w-prose text-pretty text-[17px] leading-[1.8] text-quill-soft"
          >
            Share the problem — I&apos;ll come back with a sharp, honest take and a
            plan. Open to AI roles, agentic builds and automation projects.
          </motion.p>

          <div className="mt-12 flex flex-wrap gap-3">
            {channels.map(({ id, icon: Icon }, i) => {
              const s = socials.find((x) => x.id === id);
              if (!s) return null;
              return (
                <motion.a
                  key={id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 260, damping: 22 }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  href={s.href}
                  target={id === "phone" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label={s.label}
                  className="plate h-13 w-13"
                  style={{ width: 52, height: 52 }}
                >
                  <Icon size={15} />
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 space-y-3"
          >
            {[siteConfig.email, siteConfig.phoneDisplay, siteConfig.location].map((line) => (
              <p key={line} className="flex items-center gap-4 text-[14px] text-quill-soft">
                <span aria-hidden className="h-px w-5 shrink-0 bg-gold/60" />
                {line}
              </p>
            ))}
          </motion.div>
        </div>

        {/* -------------------------------------------------------- RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
          className="card card-static flex flex-col justify-center p-9 md:p-12 lg:col-span-6"
        >
          <div className="flex items-center gap-6">
            <span className="relative grid h-16 w-16 shrink-0 place-items-center">
              {/* Concentric hairline square, offset outward. */}
              <span aria-hidden className="absolute -inset-2 border border-gold/35" />
              <span className="plate h-16 w-16">
                <FaWhatsapp size={24} />
              </span>
              {!reduce && (
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.28], opacity: [0.45, 0] }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
                  className="absolute -inset-2 border border-gold/60"
                />
              )}
            </span>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-label text-quill-mute">
                Fastest way to reach me
              </p>
              <h3 className="mt-2 font-display text-[1.9rem] font-normal leading-tight text-quill md:text-[2.2rem]">
                Chat on WhatsApp
              </h3>
            </div>
          </div>

          <DoubleRule className="my-9" />

          <p className="max-w-prose text-[15px] leading-[1.8] text-quill-soft">
            Skip the forms. Message me directly with what you want to build — I
            usually reply within a few hours.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="btn-primary mt-10 w-full"
          >
            <FaWhatsapp size={16} /> Start a chat
          </a>

          <a
            href={siteConfig.social.phone}
            data-cursor="hover"
            className="btn-ghost mt-3 w-full"
          >
            Prefer a call? {siteConfig.phoneDisplay}
            <span aria-hidden className="text-sm leading-none">↗</span>
          </a>
        </motion.div>
      </div>
    </SectionShell>
  );
}
