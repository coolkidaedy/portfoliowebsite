import { useEffect, useRef } from "react";

// Interactive constellation layer for the welcome scene — ported from the
// original StarBackground component, restyled to the welcome theme (ink /
// cream / white instead of sky blue) so it reads as part of the same sky
// as Starfield rather than a different visual system.
//
// Unlike the ambient Starfield (pre-generated, purely decorative), this
// layer starts empty and only grows as the visitor clicks: each click
// drops a star that drifts freely (same lazy float as the original), with
// just a slight, slow rotational bias around the hero text so the sky
// feels like it's gently turning rather than swept into a rigid orbit.
// Stars joining a constellation sync onto its shared spin direction so the
// whole cluster turns together, then everything fades out and is removed
// after ~12s so the sky doesn't accumulate forever. Position is always
// clamped against the *current* canvas size, so a window resize can't send
// stars flying off-screen.

const STAR_COLOR = "255, 255, 255"; // matches Starfield's white dots/glow
const LINK_DISTANCE = 150;
const JOIN_DISTANCE = 200;
const LIFESPAN_MS = 9500; // fully visible + drifting
const FADE_MS = 2500; // then eases out before removal
const EDGE_MARGIN = 20;

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 1.6 + 1;
    this.brightness = Math.random() * 0.4 + 0.7;
    this.isPulsing = false;
    this.pulseTime = 0;
    this.constellation = null;
    this.dead = false;
    this.lifecycleAlpha = 1;

    // Slow, organic free-float — small random velocity, no fixed path.
    this.vx = (Math.random() - 0.5) * 0.16;
    this.vy = (Math.random() - 0.5) * 0.16;

    // A slight, slow rotational bias around the hero text, layered on top
    // of the drift so the sky feels like it's gently turning rather than
    // locked into a perfect orbit.
    this.spinDirection = Math.random() < 0.5 ? -1 : 1;
    this.spinSpeed = 0.0004 + Math.random() * 0.0005; // rad/frame — barely-there

    this.createdAt = performance.now();
  }

  update(canvas, now) {
    const age = now - this.createdAt;
    if (age < LIFESPAN_MS) {
      this.lifecycleAlpha = 1;
    } else if (age < LIFESPAN_MS + FADE_MS) {
      this.lifecycleAlpha = 1 - (age - LIFESPAN_MS) / FADE_MS;
    } else {
      this.lifecycleAlpha = 0;
      this.dead = true;
    }

    // Free drift, bouncing softly off the current viewport edges.
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= EDGE_MARGIN || this.x >= canvas.width - EDGE_MARGIN) this.vx *= -1;
    if (this.y <= EDGE_MARGIN || this.y >= canvas.height - EDGE_MARGIN) this.vy *= -1;

    // Slight rotation around the hero text (canvas center, recomputed live
    // so it always tracks the current viewport).
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const dx = this.x - cx;
    const dy = this.y - cy;
    const angle = this.spinDirection * this.spinSpeed;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = cx + dx * cos - dy * sin;
    this.y = cy + dx * sin + dy * cos;

    // Final hard clamp against the live canvas size — the one rule that
    // always holds, so a resize (shrinking the window) can never leave a
    // star stranded off-screen.
    this.x = Math.max(EDGE_MARGIN, Math.min(canvas.width - EDGE_MARGIN, this.x));
    this.y = Math.max(EDGE_MARGIN, Math.min(canvas.height - EDGE_MARGIN, this.y));

    if (this.isPulsing) {
      this.pulseTime += 0.1;
      if (this.pulseTime > Math.PI * 2) {
        this.isPulsing = false;
        this.pulseTime = 0;
      }
    }
  }

  startPulse() {
    this.isPulsing = true;
    this.pulseTime = 0;
  }

  draw(ctx) {
    const pulseMultiplier = this.isPulsing ? 1 + Math.sin(this.pulseTime) * 0.5 : 1;
    const glowSize = 7 * pulseMultiplier;
    const alpha = this.brightness * pulseMultiplier * this.lifecycleAlpha;
    if (alpha <= 0) return;

    ctx.save();
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
    gradient.addColorStop(0, `rgba(${STAR_COLOR}, ${alpha * 0.7})`);
    gradient.addColorStop(1, `rgba(${STAR_COLOR}, 0)`);
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `rgba(${STAR_COLOR}, ${alpha})`;
    ctx.arc(this.x, this.y, this.size * pulseMultiplier, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}

class Constellation {
  constructor(spinDirection, spinSpeed) {
    this.stars = [];
    // Every member shares this spin, so joined stars keep a fixed angular
    // offset from each other and the whole cluster turns together instead
    // of drifting apart.
    this.spinDirection = spinDirection;
    this.spinSpeed = spinSpeed;
  }

  addStar(star) {
    star.constellation = this;
    this.stars.push(star);
  }

  sendPulse() {
    this.stars.forEach((star) => star.startPulse());
  }

  pruneDead() {
    this.stars = this.stars.filter((star) => !star.dead);
  }

  draw(ctx) {
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const star1 = this.stars[i];
        const star2 = this.stars[j];
        const distance = star1.distanceTo(star2);

        if (distance < LINK_DISTANCE) {
          const opacity =
            Math.max(0, 1 - distance / LINK_DISTANCE) *
            0.35 *
            Math.min(star1.lifecycleAlpha, star2.lifecycleAlpha);
          if (opacity <= 0) continue;
          ctx.save();
          ctx.strokeStyle = `rgba(${STAR_COLOR}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }
}

export const ConstellationField = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const constellationsRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (x, y) => {
      const star = new Star(x, y);
      starsRef.current.push(star);

      let closestConstellation = null;
      let minDistance = Infinity;

      constellationsRef.current.forEach((constellation) => {
        constellation.stars.forEach((constellationStar) => {
          const distance = star.distanceTo(constellationStar);
          if (distance < minDistance && distance < JOIN_DISTANCE) {
            minDistance = distance;
            closestConstellation = constellation;
          }
        });
      });

      if (closestConstellation) {
        // Sync onto the constellation's shared spin instead of the random
        // one it was born with, so the whole cluster turns together.
        star.spinDirection = closestConstellation.spinDirection;
        star.spinSpeed = closestConstellation.spinSpeed;
        closestConstellation.addStar(star);
        closestConstellation.sendPulse();
      } else {
        const newConstellation = new Constellation(star.spinDirection, star.spinSpeed);
        newConstellation.addStar(star);
        constellationsRef.current.push(newConstellation);
        star.startPulse();
      }
    };

    const animate = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      starsRef.current.forEach((star) => star.update(canvas, now));

      // Prune expired stars from both the flat list and their constellations
      // so dead weight doesn't linger in memory or in the join/link checks.
      starsRef.current = starsRef.current.filter((star) => !star.dead);
      constellationsRef.current.forEach((constellation) => constellation.pruneDead());
      constellationsRef.current = constellationsRef.current.filter(
        (constellation) => constellation.stars.length > 0
      );

      starsRef.current.forEach((star) => star.draw(ctx));
      constellationsRef.current.forEach((constellation) => constellation.draw(ctx));

      animationIdRef.current = requestAnimationFrame(animate);
    };

    setupCanvas();
    animate();

    const handleClick = (event) => {
      const target = event.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cosmic-button");
      if (isInteractive) return;

      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        createStar(x, y);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === " " && event.ctrlKey) {
        event.preventDefault();
        createStar(Math.random() * canvas.width, Math.random() * canvas.height);
      }
    };

    const handleResize = () => setupCanvas();

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      starsRef.current = [];
      constellationsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />

      <p
        className="absolute bottom-[21px] right-[21px] hidden sm:block uppercase text-xs pointer-events-none"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-mute)", opacity: 0.7 }}
      >
        click to add a star · ctrl+space for random
      </p>
    </div>
  );
};
