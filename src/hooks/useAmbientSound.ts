"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Synthesized cinematic ambient drone — no audio asset required. Two detuned
 * oscillators through a slow LFO-modulated low-pass filter. Created lazily on
 * first enable to respect browser autoplay policies (needs a user gesture).
 */
export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const ensure = useCallback(() => {
    if (ctxRef.current) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 340;
    filter.Q.value = 3;
    filter.connect(master);

    // warm, mellow lo-fi chord (C major-ish, soft sines)
    [65.41, 98.0, 130.81, 164.81].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 3 ? "triangle" : "sine";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = i === 3 ? 0.12 : 0.22;
      osc.connect(g);
      g.connect(filter);
      osc.start();
    });

    // gentle, slow filter sway for that cozy tape warble
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    ctxRef.current = ctx;
    gainRef.current = master;
  }, []);

  const toggle = useCallback(() => {
    ensure();
    const ctx = ctxRef.current!;
    const master = gainRef.current!;
    if (ctx.state === "suspended") ctx.resume();
    const next = !enabled;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(next ? 0.09 : 0.0001, now + 0.6);
    setEnabled(next);
  }, [enabled, ensure]);

  return { enabled, toggle };
}
