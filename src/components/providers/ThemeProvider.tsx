"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "zz-theme";

interface ThemeContextValue {
  theme: Theme;
  /** Toggle day/night. Pass the click origin to animate the ink-wash reveal from it. */
  toggle: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The inline script in <head> has already set the class before paint; read it
  // back on mount rather than guessing, so React and the DOM never disagree.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  // Follow the OS only while the visitor hasn't made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next: Theme = mq.matches ? "dark" : "light";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      const commit = () => {
        apply(next);
        setTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* private browsing — the choice just won't persist */
        }
      };

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = document.startViewTransition?.bind(document);

      if (reduced || !start || !origin) {
        commit();
        return;
      }

      // Gold ink-wash: expand a circular clip from the toggle to cover the page.
      const transition = start(commit);
      transition.ready
        .then(() => {
          const { x, y } = origin;
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          /* transition was skipped — the commit already happened */
        });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
}

/**
 * Runs before first paint to resolve the theme from storage (or the OS) and
 * stamp the class on <html>. Inlined in <head> — never a flash of wrong theme.
 */
export const themeScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';r.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;
