"use client";

/**
 * The ground the whole site sits on: a warm base, one barely-there oxblood
 * wash in the upper left, and a fine paper grain over everything. Both themes
 * are driven entirely by the CSS tokens, so this component never re-renders on
 * a theme change — the colours simply cross-fade underneath it.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />

      {/* Oxblood wash, upper-left — the only large colour field on the page. */}
      <div className="absolute -left-40 -top-56 h-[46rem] w-[46rem] rounded-full bg-wine/[0.07] blur-[190px] dark:bg-wine/[0.16]" />
      {/* Gold counter-glow, lower-right. Keeps the composition from tipping. */}
      <div className="absolute -bottom-64 -right-40 h-[38rem] w-[38rem] rounded-full bg-gold/[0.05] blur-[190px] dark:bg-gold/[0.07]" />

      {/* Laid-paper grain. Opacity is a token so day reads as paper and night
          as film. */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: "var(--grain-opacity)" }}
      />
    </div>
  );
}
