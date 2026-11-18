"use client";

import { useEffect, useRef } from "react";

/**
 * A thin gold ring that trails the pointer, plus a precise centre diamond.
 * Expands over anything interactive. Pure rAF — no React re-renders — and it
 * disables itself on touch and under reduced-motion (where globals.css also
 * restores the native cursor).
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(45deg)`;
      }
      const el = e.target as HTMLElement;
      hovering = !!el.closest('a, button, [data-cursor="hover"], input, textarea');
    };

    const render = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${hovering ? 2.1 : 1})`;
        ring.current.style.opacity = hovering ? "1" : "0.55";
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    render();
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-gold transition-[transform,opacity] duration-200 ease-out md:block"
        style={{ marginLeft: "-16px", marginTop: "-16px" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1 w-1 bg-gold md:block"
        style={{ marginLeft: "-2px", marginTop: "-2px" }}
      />
    </>
  );
}
