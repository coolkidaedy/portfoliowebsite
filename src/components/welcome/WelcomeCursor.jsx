import { useEffect, useRef } from "react";

// White glowing cursor for the welcome scene. Lives independently from the
// portfolio's themed cursor — this one is always white because the welcome
// scene exists before any theme choice has been made.
//
// The cursor element doubles as a global mouse-position broadcaster — every
// frame it dispatches `welcome:pointer` with the current pointer coords so
// the parallax + text-shove effects can read a single source of truth.
export const WelcomeCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!cursor || !fine) return;

    cursor.classList.remove("hidden");
    document.documentElement.setAttribute("data-welcome-cursor-active", "");

    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;
    let initialized = false;
    let rafId = 0;
    let idleTimer = 0;

    cursor.style.opacity = "0";

    function tick() {
      currX += (targetX - currX) * 0.35;
      currY += (targetY - currY) * 0.35;
      cursor.style.transform = `translate3d(${currX}px, ${currY}px, 0)`;
      window.dispatchEvent(
        new CustomEvent("welcome:pointer", { detail: { x: currX, y: currY } })
      );
      rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }
    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }
    function resetIdle() {
      clearTimeout(idleTimer);
      startLoop();
      idleTimer = window.setTimeout(stopLoop, 500);
    }

    startLoop();

    function handlePointerMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!initialized) {
        currX = targetX;
        currY = targetY;
        cursor.style.opacity = "1";
        initialized = true;
      }
      resetIdle();
    }

    function handleMouseLeave() {
      cursor.style.opacity = "0";
    }
    function handleMouseEnter() {
      cursor.style.opacity = initialized ? "1" : "0";
    }
    function handleVisibilityChange() {
      if (document.hidden) {
        stopLoop();
        clearTimeout(idleTimer);
      } else if (initialized) {
        cursor.style.opacity = "1";
        resetIdle();
      }
    }
    function handleMouseOver(e) {
      const interactive = e.target?.closest?.("a, button, [role='button']");
      cursor.dataset.mode = interactive ? "link" : "dot";
    }

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      stopLoop();
      clearTimeout(idleTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeAttribute("data-welcome-cursor-active");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="welcome-cursor pointer-events-none fixed top-0 left-0 z-[100] hidden"
    >
      <div className="welcome-cursor__shape" />

      <style>{`
        .welcome-cursor {
          will-change: transform;
        }
        .welcome-cursor__shape {
          position: absolute;
          top: 0;
          left: 0;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 0 16px rgba(255, 255, 255, 0.6),
            0 0 32px rgba(255, 255, 255, 0.35),
            0 0 64px rgba(255, 255, 255, 0.18);
          transition: width 0.28s var(--ease-out-soft), height 0.28s var(--ease-out-soft), margin 0.28s var(--ease-out-soft);
        }
        .welcome-cursor[data-mode="link"] .welcome-cursor__shape {
          width: 32px;
          height: 32px;
          margin-left: -16px;
          margin-top: -16px;
        }
        html[data-welcome-cursor-active] *,
        html[data-welcome-cursor-active] {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
};
