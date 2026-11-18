"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { leadership } from "@/lib/data";
import { Diamond, EASE_EDITORIAL } from "@/components/ui/Ornaments";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = usePrefersReducedMotion();
  // Start at the real value so SSR and crawlers read the true number.
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1500, 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    // Reset to zero only once we know we're animating client-side.
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export function Leadership() {
  return (
    <SectionShell id="leadership">
      <SectionHead
        numeral="VI"
        eyebrow="Beyond Code"
        title={<>Leading the tech community.</>}
        side={<>{leadership.blurb}</>}
      />

      <div className="mt-16 grid gap-6 md:grid-cols-12">
        <div className="grid grid-cols-2 gap-6 md:col-span-7">
          {leadership.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_EDITORIAL }}
              className="card p-8 md:p-10"
            >
              <p className="font-display text-5xl font-light leading-none text-quill md:text-[3.4rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <span aria-hidden className="mt-5 block h-px w-7 bg-gold/60" />
              <p className="mt-4 font-sans text-[10px] uppercase tracking-label text-quill-mute">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE_EDITORIAL }}
          className="card card-static p-8 md:col-span-5 md:p-10"
        >
          <p className="font-sans text-[10px] uppercase tracking-label text-gold">
            {leadership.role}
          </p>
          <p className="mt-2 font-display text-xl font-normal text-quill">{leadership.org}</p>

          <span aria-hidden className="mt-7 block h-px w-full bg-rule/20" />

          <ul className="mt-7 space-y-5">
            {leadership.activities.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.09, ease: EASE_EDITORIAL }}
                className="flex items-start gap-3.5 text-[15px] leading-relaxed text-quill-soft"
              >
                <Diamond />
                {a}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  );
}
