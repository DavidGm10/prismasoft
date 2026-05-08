// ============================================================
// CustomCursor.jsx — Cursor personalizado (solo desktop)
// ============================================================
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top = ringPos.current.y + "px";
      raf.current = requestAnimationFrame(animate);
    };

    // Hover effects
    const onHover = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(168, 85, 247, 0.8)";
      dot.style.transform = "translate(-50%, -50%) scale(2)";
    };
    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(0, 245, 255, 0.5)";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const clickables = document.querySelectorAll("a, button, [data-cursor]");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          width: "8px",
          height: "8px",
          background: "var(--cyan)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease",
          boxShadow: "0 0 10px var(--cyan), 0 0 20px var(--cyan)",
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          width: "36px",
          height: "36px",
          border: "1.5px solid rgba(0, 245, 255, 0.5)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
