"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Jewel } from "@/components/three/Jewel";
import { useTheme } from "@/components/providers/ThemeProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** If WebGL is unavailable or the scene throws, fall back to the engraved mark. */
class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** A pure-CSS stand-in: concentric gold hairline rings around an oxblood facet. */
function EngravedFallback() {
  return (
    <div aria-hidden className="grid h-full w-full place-items-center">
      <div className="relative grid h-56 w-56 place-items-center">
        <span className="absolute inset-0 rounded-full border border-gold/20" />
        <span className="absolute inset-6 rounded-full border border-gold/30" />
        <span className="absolute inset-12 rotate-45 border border-gold/50 bg-wine/25" />
      </div>
    </div>
  );
}

export default function JewelScene() {
  const { theme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely once the hero scrolls away — the GPU shouldn't be
  // drawing an object nobody can see for the rest of the page.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <SceneBoundary fallback={<EngravedFallback />}>
        <Canvas
          // Cap the pixel ratio — a 3x retina buffer buys nothing here and
          // costs a lot of fill rate.
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Jewel theme={theme} still={reduced} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
