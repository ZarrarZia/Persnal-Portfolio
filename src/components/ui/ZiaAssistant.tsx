"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ZiaMessage } from "@/types";
import { askZia, ziaGreeting, ziaSuggestions } from "@/lib/zia-brain";
import { EASE_EDITORIAL } from "@/components/ui/Ornaments";

let idCounter = 0;
const nextId = () => `m${idCounter++}`;

/* Fine-line glyphs, matching the rest of the icon system. */
function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" strokeLinejoin="round" className={className}>
      <path d="M12 2.5 14 10l7.5 2-7.5 2-2 7.5-2-7.5L2.5 12 10 10l2-7.5Z" />
    </svg>
  );
}

function Close({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" strokeLinecap="round" className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function Send({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.25} stroke="currentColor" strokeLinejoin="round" className={className}>
      <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </svg>
  );
}

/**
 * The concierge. Same in-page answering brain as before, re-dressed as a
 * die-cut card: hairline frame, engraved corner brackets, oxblood user
 * messages and gold-outlined replies.
 */
export function ZiaAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ZiaMessage[]>([
    { id: nextId(), role: "assistant", text: ziaGreeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
    setTyping(true);
    const { text: answer, scrollTo } = askZia(text);
    const delay = 520 + Math.min(answer.length * 9, 900);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), role: "assistant", text: answer }]);
      setTyping(false);
      if (scrollTo) document.querySelector(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 18 }}
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        className="group fixed bottom-7 right-7 z-[70] grid h-14 w-14 place-items-center bg-wine text-[rgb(237_230_218)] transition-colors duration-300 hover:bg-wine-deep"
        style={{
          clipPath:
            "polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px)",
        }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-[3px] border border-gold/55 transition-colors duration-300 group-hover:border-gold" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Close className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Compass className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="card card-static fixed bottom-24 right-5 z-[70] flex h-[34rem] w-[calc(100vw-2.5rem)] max-w-[24rem] flex-col overflow-hidden bg-raised sm:right-7"
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-rule/20 px-5 py-4">
              <span className="plate h-10 w-10">
                <Compass className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="font-sans text-[11px] font-medium uppercase tracking-label text-quill">
                  Crafty
                </p>
                <p className="mt-1 flex items-center gap-2 font-sans text-[9px] uppercase tracking-label text-quill-mute">
                  <span className="h-1 w-1 rotate-45 animate-pulse-soft bg-sage" />
                  At your service
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="text-quill-mute transition-colors hover:text-gold"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line px-4 py-3 text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-wine text-[rgb(237_230_218)]"
                        : "border border-gold/30 text-quill"
                    }`}
                    style={{
                      clipPath:
                        m.role === "user"
                          ? "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
                          : "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 border border-gold/30 px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1 w-1 rotate-45 bg-gold"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.95, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
                {ziaSuggestions.map((s) => (
                  <button
                    key={s.query}
                    onClick={() => send(s.query)}
                    data-cursor="hover"
                    className="chip shrink-0 border-gold/40 text-gold"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2.5 border-t border-rule/20 p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Zarrar…"
                aria-label="Ask about Zarrar"
                className="h-11 flex-1 border border-rule/25 bg-transparent px-3.5 text-[14px] text-quill placeholder:text-quill-mute focus:border-gold focus:outline-none"
                style={{ borderRadius: 2 }}
              />
              <button
                type="submit"
                data-cursor="hover"
                aria-label="Send"
                className="grid h-11 w-11 shrink-0 place-items-center bg-wine text-[rgb(237_230_218)] transition-colors duration-300 hover:bg-wine-deep"
                style={{ borderRadius: 2 }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
