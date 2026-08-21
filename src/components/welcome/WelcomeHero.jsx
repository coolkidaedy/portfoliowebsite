import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Welcome composition, ported from the example's Figma-driven layout, with
// an interactive layer:
//   - Each word in the title and quote subscribes to the cursor and shoves
//     gently away when it gets close, then springs back.

const titleWords = ["Aedin's", "World"];

const quote = [
  { text: "Crafting" },
  { text: "intelligent", emphasis: true },
  { text: "systems,", emphasis: true },
  { text: "one" },
  { text: "problem" },
  { text: "at" },
  { text: "a" },
  { text: "time." },
];

export const WelcomeHero = ({ onExplore }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const shoves = Array.from(root.querySelectorAll("[data-shove]"));
    if (shoves.length === 0) return;

    const targets = new WeakMap();
    const currents = new WeakMap();

    shoves.forEach((el) => {
      targets.set(el, { x: 0, y: 0 });
      currents.set(el, { x: 0, y: 0 });
    });

    let mx = -9999;
    let my = -9999;

    function handlePointer(e) {
      mx = e.detail.x;
      my = e.detail.y;
    }
    window.addEventListener("welcome:pointer", handlePointer);

    const RADIUS = 95;
    const STRENGTH = 26; // px max push at zero distance

    let rafId = 0;

    function tick() {
      for (const el of shoves) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy) || 1;
        const t = targets.get(el);
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) ** 1.4;
          t.x = (dx / dist) * force * STRENGTH;
          t.y = (dy / dist) * force * STRENGTH;
        } else {
          t.x = 0;
          t.y = 0;
        }
        const c = currents.get(el);
        c.x += (t.x - c.x) * 0.18;
        c.y += (t.y - c.y) * 0.18;
        el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("welcome:pointer", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-dvh grid place-items-center px-4 sm:px-6 relative w-full"
    >
      <div className="flex flex-col items-center gap-8 sm:gap-10 w-full max-w-[454px]">
        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
          <div className="flex flex-col items-center gap-1 leading-none">
            <p
              className="uppercase text-sm sm:text-base text-center w-full"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-mute)" }}
            >
              Welcome to
            </p>
            <p
              className="font-light leading-none w-full text-center flex justify-center gap-2 flex-wrap"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 6vw, 36px)",
                color: "var(--color-ink-inverted)",
              }}
            >
              {titleWords.map((word) => (
                <span key={word} data-shove className="inline-block will-change-transform">
                  {word}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              id="enter-cta"
              onClick={onExplore}
              className="cosmic-button uppercase text-[14px] leading-none whitespace-nowrap inline-flex items-center justify-center px-3 py-2 rounded-[12px]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--color-bg)",
                color: "var(--color-ink)",
              }}
            >
              explore →
            </button>
            <button
              onClick={onExplore}
              className="text-xs uppercase leading-none tracking-wide transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-ink-mute)",
                opacity: 0.55,
                transition: "opacity 0.24s var(--ease-out-soft), color 0.24s var(--ease-out-soft)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.55")}
            >
              skip intro
            </button>
          </div>
        </div>

        <p
          className="uppercase text-center w-full max-w-[346px] leading-snug"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "var(--color-ink-mute)",
          }}
        >
          {quote.map((w, i) => (
            <span key={i}>
              <span
                data-shove
                className={cn(
                  "inline-block will-change-transform",
                  w.emphasis && "text-white"
                )}
              >
                {w.text}
              </span>
              {i < quote.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
