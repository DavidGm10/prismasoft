// ============================================================
// ParticleBackground.jsx — Partículas cibernéticas interactivas
// Reacciona al mouse y cambia de colores dinámicamente
// ============================================================
import { useCallback, useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);

  const COLORS = [
    "#00f5ff", "#a855f7", "#ff006e", "#39ff14",
    "#ffd700", "#0066ff", "#ff4500", "#00ff88",
    "#ff00ff", "#00bfff",
  ];

  const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  const createParticle = (canvas) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 2.5 + 0.5,
    color: randomColor(),
    alpha: Math.random() * 0.7 + 0.3,
    colorTimer: Math.random() * 200,
    colorInterval: Math.random() * 100 + 80,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.04 + 0.01,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Create initial particles
    const COUNT = Math.min(Math.floor((W * H) / 8000), 180);
    particlesRef.current = Array.from({ length: COUNT }, () => createParticle(canvas));

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const newCount = Math.min(Math.floor((W * H) / 8000), 180);
      particlesRef.current = Array.from({ length: newCount }, () => createParticle(canvas));
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onTouchMove = (e) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const MOUSE_RADIUS = 140;
      const CONNECT_DIST = 110;

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Color cycling
        p.colorTimer++;
        if (p.colorTimer > p.colorInterval) {
          p.color = randomColor();
          p.colorTimer = 0;
          p.colorInterval = Math.random() * 100 + 80;
        }

        // Twinkle
        p.twinkle += p.twinkleSpeed;
        const twinkleAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
          // Flash to bright color on interaction
          if (dist < 60) p.color = randomColor();
        }

        // Speed limit + friction
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) {
          p.vx = (p.vx / speed) * 2.5;
          p.vy = (p.vy / speed) * 2.5;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // Draw glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grd.addColorStop(0, p.color + Math.floor(twinkleAlpha * 255).toString(16).padStart(2, "0"));
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = twinkleAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const opacity = (1 - d / CONNECT_DIST) * 0.25;
            const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grd.addColorStop(0, a.color);
            grd.addColorStop(1, b.color);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grd;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
