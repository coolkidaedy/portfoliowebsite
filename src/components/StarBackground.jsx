import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const constellationsRef = useRef([]);
  const animationIdRef = useRef(null);

  
  class Star {
    constructor(x, y, id) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.brightness = Math.random() * 0.5 + 0.7;
      this.isPulsing = false;
      this.pulseTime = 0;
      this.constellation = null;
    }

    update(canvas) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 20 || this.x >= canvas.width - 20) this.vx *= -1;
      if (this.y <= 20 || this.y >= canvas.height - 20) this.vy *= -1;

      this.x = Math.max(20, Math.min(canvas.width - 20, this.x));
      this.y = Math.max(20, Math.min(canvas.height - 20, this.y));

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
      const glowSize = 8 * pulseMultiplier;
      const alpha = this.brightness * pulseMultiplier;

      ctx.save();
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
      gradient.addColorStop(0, `rgba(135, 206, 250, ${alpha * 0.8})`);
      gradient.addColorStop(1, `rgba(135, 206, 250, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(this.x, this.y, this.size * pulseMultiplier, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    distanceTo(other) {
      return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
  }

  class Constellation {
    constructor(id) {
      this.id = id;
      this.stars = [];
    }

    addStar(star) {
      star.constellation = this;
      this.stars.push(star);
    }

    sendPulse() {
      this.stars.forEach(star => star.startPulse());
    }

    draw(ctx) {
      for (let i = 0; i < this.stars.length; i++) {
        for (let j = i + 1; j < this.stars.length; j++) {
          const star1 = this.stars[i];
          const star2 = this.stars[j];
          const distance = star1.distanceTo(star2);
          
          if (distance < 150) {
            const opacity = Math.max(0, 1 - distance / 150) * 0.4;
            ctx.save();
            ctx.strokeStyle = `rgba(135, 206, 250, ${opacity})`;
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

  const createStar = (x, y) => {
    const star = new Star(x, y, starsRef.current.length);
    starsRef.current.push(star);

    let closestConstellation = null;
    let minDistance = Infinity;

    constellationsRef.current.forEach(constellation => {
      constellation.stars.forEach(constellationStar => {
        const distance = star.distanceTo(constellationStar);
        if (distance < minDistance && distance < 200) {
          minDistance = distance;
          closestConstellation = constellation;
        }
      });
    });

    if (closestConstellation) {
      closestConstellation.addStar(star);
      closestConstellation.sendPulse();
    } else {
      const newConstellation = new Constellation(constellationsRef.current.length);
      newConstellation.addStar(star);
      constellationsRef.current.push(newConstellation);
      star.startPulse();
    }
  };

  const generateInitialStars = (canvas) => {
    const numStars = Math.min(50, Math.floor((canvas.width * canvas.height) / 30000));
    
    starsRef.current = [];
    constellationsRef.current = [];

    for (let i = 0; i < numStars; i++) {
      const x = 50 + Math.random() * (canvas.width - 100);
      const y = 50 + Math.random() * (canvas.height - 100);
      const star = new Star(x, y, i);
      starsRef.current.push(star);
    }

    starsRef.current.forEach(star => {
      if (!star.constellation) {
        const constellation = new Constellation(constellationsRef.current.length);
        constellation.addStar(star);
        
        starsRef.current.forEach(otherStar => {
          if (!otherStar.constellation && star.distanceTo(otherStar) < 120) {
            constellation.addStar(otherStar);
          }
        });
        
        constellationsRef.current.push(constellation);
      }
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starsRef.current.forEach(star => {
      star.update(canvas);
      star.draw(ctx);
    });

    constellationsRef.current.forEach(constellation => {
      constellation.draw(ctx);
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    generateInitialStars(canvas);
  };

  useEffect(() => {
    setupCanvas();

    
    const handleGlobalClick = (event) => {
      
      const clickedElement = event.target;
      const isInteractiveElement = 
        clickedElement.tagName === 'A' ||
        clickedElement.tagName === 'BUTTON' ||
        clickedElement.closest('a') ||
        clickedElement.closest('button') ||
        clickedElement.classList.contains('cosmic-button') ||
        clickedElement.closest('.cosmic-button');

      
      if (isInteractiveElement) {
        return;
      }

      
      event.preventDefault();
      
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (canvas && container) {
        const containerRect = container.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        
        
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          createStar(x, y);
        }
      }
    };

    
    const handleKeyPress = (event) => {
      if (event.key === ' ' && event.ctrlKey) {
        event.preventDefault();
        const canvas = canvasRef.current;
        if (canvas) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          createStar(x, y);
        }
      }
    };

    const handleResize = () => {
      setupCanvas();
    };

    
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', handleResize);

   
    animate();

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0 pointer-events-none"
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />
      
      <div className="absolute bottom-4 left-4 text-white/60 text-sm pointer-events-none">
        <p>Click on empty space to add stars • Ctrl+Space for random star</p>
      </div>
    </div>
  );
};