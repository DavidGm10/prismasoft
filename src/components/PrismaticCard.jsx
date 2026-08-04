// ============================================================
// PrismaticCard.jsx — Efecto holográfico 3D tipo carta Pokémon
// Funciona con mouse en desktop y touch en mobile
// ============================================================
import { useRef, useCallback } from "react";

export default function PrismaticCard({
  children,
  className = "",
  style = {},
  intensity = 18, // degrees of tilt
  glareOpacity = 0.6,
  borderGlow = true,
  onClick,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const applyEffect = useCallback((x, y) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const pctX = dx / (rect.width / 2);  // -1 to 1
    const pctY = dy / (rect.height / 2); // -1 to 1

    const rotateY = pctX * intensity;
    const rotateX = -pctY * intensity;

    // Holo gradient angle
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Rainbow shift based on position
    const hue = ((pctX + 1) / 2) * 360;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = "transform 0.05s ease";
      card.style.zIndex = "10";

      if (borderGlow) {
        card.style.boxShadow = `
          ${pctX * 8}px ${pctY * 8}px 30px rgba(0, 245, 255, 0.2),
          ${-pctX * 4}px ${-pctY * 4}px 20px rgba(168, 85, 247, 0.15),
          inset 0 0 20px rgba(0,0,0,0.2)
        `;
      }

      if (glare) {
        glare.style.opacity = glareOpacity.toString();
        glare.style.background = `
          radial-gradient(
            ellipse at ${((pctX + 1) / 2) * 100}% ${((pctY + 1) / 2) * 100}%,
            hsla(${hue}, 100%, 80%, 0.35) 0%,
            hsla(${hue + 60}, 100%, 60%, 0.2) 25%,
            hsla(${hue + 120}, 100%, 70%, 0.15) 50%,
            hsla(${hue + 180}, 100%, 60%, 0.08) 75%,
            transparent 100%
          ),
          linear-gradient(
            ${angle}deg,
            hsla(${hue}, 100%, 70%, 0.1) 0%,
            hsla(${hue + 180}, 100%, 70%, 0.08) 100%
          )
        `;
      }
    });
  }, [intensity, glareOpacity, borderGlow]);

  const resetCard = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    cancelAnimationFrame(rafRef.current);
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    card.style.boxShadow = "";
    card.style.zIndex = "";
    if (glare) glare.style.opacity = "0";
  }, []);

  // Mouse handlers
  const onMouseMove = useCallback((e) => applyEffect(e.clientX, e.clientY), [applyEffect]);
  const onMouseLeave = useCallback(resetCard, [resetCard]);

  // Touch handlers for mobile
  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches[0]) applyEffect(e.touches[0].clientX, e.touches[0].clientY);
  }, [applyEffect]);
  const onTouchEnd = useCallback(resetCard, [resetCard]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 0.5s ease",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchStart={(e) => e.preventDefault()}
    >
      {/* Holographic glare overlay */}
      <div
        ref={glareRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 2,
          borderRadius: "inherit",
          mixBlendMode: "screen",
        }}
      />

      {/* Rainbow border shimmer */}
      <div
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "inherit",
          background: `linear-gradient(135deg,
            rgba(0,245,255,0.5),
            rgba(168,85,247,0.5),
            rgba(255,0,110,0.5),
            rgba(57,255,20,0.5),
            rgba(255,215,0,0.5),
            rgba(0,245,255,0.5)
          )`,
          backgroundSize: "300% 300%",
          animation: "prismShift 4s ease infinite",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        className="card-border-glow"
      />

      {/* Actual content */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>

      <style>{`
        div:hover > .card-border-glow { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
