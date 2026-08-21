import { useEffect, useRef } from "react";

// Periodic ASCII shooting stars across the dark welcome background.
// Each star is a span with a single CSS animation that translates it
// diagonally and fades it. JS spawns one every few seconds with a
// randomized lane + delay.
export const ShootingStars = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ASCII shapes — trail FIRST, star LAST so the star ends up at the
    // leading tip after the element is rotated to follow its trajectory.
    const shapes = ["──────✦", "─────·", "──────⋆", "·─────✦", "─────˚"];

    function launch(startX, startY, dx, dy, duration) {
      const el = document.createElement("span");
      el.className = "shooting-star";
      el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      el.style.left = `${startX}px`;
      el.style.top = `${startY}px`;
      el.style.setProperty("--shoot-dx", `${dx}px`);
      el.style.setProperty("--shoot-dy", `${dy}px`);
      el.style.setProperty("--shoot-duration", `${duration}s`);
      el.style.setProperty("--shoot-angle", `${angle}deg`);

      stage.appendChild(el);
      setTimeout(() => el.remove(), duration * 1000 + 200);
    }

    function spawn() {
      // Random start position somewhere in the upper-right region; travels
      // toward the lower-left, so the trail leans in a consistent direction.
      const w = window.innerWidth;
      const h = window.innerHeight;
      const startX = w * (0.55 + Math.random() * 0.4);
      const startY = h * (Math.random() * 0.55);
      const dx = -(w * (0.5 + Math.random() * 0.3));
      const dy = h * (0.3 + Math.random() * 0.35);
      const duration = 1.2 + Math.random() * 0.8;
      launch(startX, startY, dx, dy, duration);
    }

    let loopTimer;
    function loop() {
      // At most one star at a time so the sky stays quiet in between.
      const alive = stage.childElementCount;
      if (alive === 0) spawn();
      // A star roughly every 4-7s feels alive without being a meteor shower.
      const delay = 4000 + Math.random() * 3000;
      loopTimer = window.setTimeout(loop, delay);
    }

    const spawnTimer = window.setTimeout(spawn, 800);
    const loopStartTimer = window.setTimeout(loop, 3500);

    return () => {
      clearTimeout(spawnTimer);
      clearTimeout(loopStartTimer);
      clearTimeout(loopTimer);
      stage.replaceChildren();
    };
  }, []);

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes shoot {
          0%   { transform: translate3d(0, 0, 0) rotate(var(--shoot-angle)); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate3d(var(--shoot-dx), var(--shoot-dy), 0) rotate(var(--shoot-angle)); opacity: 0; }
        }

        .shooting-star {
          position: absolute;
          font-family: var(--font-mono);
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
          font-size: 13px;
          letter-spacing: 0.12em;
          white-space: nowrap;
          will-change: transform, opacity;
          pointer-events: none;
          user-select: none;
          transform-origin: left center;
          animation: shoot var(--shoot-duration) cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
        }
      `}</style>
    </div>
  );
};
