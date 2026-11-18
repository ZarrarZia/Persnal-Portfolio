import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Every token is a CSS custom property holding an "R G B" triplet, so
        // the whole palette flips with the .dark class while Tailwind's
        // opacity modifiers (bg-gold/20) keep working.
        //
        // NOTE: never name a token `base` — Tailwind would generate a
        // `.text-base` COLOR utility that collides with the font-size utility
        // of the same name and silently blacks out body copy.
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        wine: {
          DEFAULT: "rgb(var(--wine) / <alpha-value>)",
          deep: "rgb(var(--wine-deep) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          soft: "rgb(var(--gold-soft) / <alpha-value>)",
        },
        quill: {
          DEFAULT: "rgb(var(--quill) / <alpha-value>)",
          soft: "rgb(var(--quill-soft) / <alpha-value>)",
          mute: "rgb(var(--quill-mute) / <alpha-value>)",
        },
        rule: "rgb(var(--rule) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Legacy alias — any stray `font-mono` stays on-brand instead of
        // falling back to a monospace face that breaks the type system.
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.24em",
        index: "0.30em",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "pulse-soft": { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
        "spin-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          from: { transform: "translateX(-120%)" },
          to: { transform: "translateX(120%)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "pulse-soft": "pulse-soft 3.4s ease-in-out infinite",
        "spin-slow": "spin-slow 48s linear infinite",
        drift: "drift 7s ease-in-out infinite",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.30, 1)",
        curtain: "cubic-bezier(0.83, 0, 0.17, 1)",
        ink: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
