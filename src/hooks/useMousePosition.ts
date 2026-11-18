"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1..1 from center of viewport. */
  nx: number;
  ny: number;
}

/**
 * Tracks pointer position. Returns a ref (rAF-friendly, no re-render) plus a
 * throttled state value for components that need to render on movement.
 */
export function useMousePosition(track = true) {
  const ref = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    if (!track) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      ref.current = { x: e.clientX, y: e.clientY, nx, ny };
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setPosition(ref.current);
          frame = 0;
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [track]);

  return { ref, position };
}
