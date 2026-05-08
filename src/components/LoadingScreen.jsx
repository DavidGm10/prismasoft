// ============================================================
// LoadingScreen.jsx — Pantalla de carga futurista
// ============================================================
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING");

  const phases = [
    "INITIALIZING SYSTEM",
    "LOADING COMPONENTS",
    "CALIBRATING UI",
    "READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        const newP = p + Math.random() * 6 + 2;
        const idx = Math.min(Math.floor((newP / 100) * phases.length), phases.length - 1);
        setPhase(phases[idx]);
        return Math.min(newP, 100);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#030712",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', monospace",
      }}
    >
      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
          animation: "scanline 1.5s linear infinite",
          zIndex: 1,
        }}
      />

      {/* Logo */}
      <div className="prisma-logo-text" style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        PrismaSoft
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "280px",
          height: "2px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "2px",
          marginBottom: "1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--cyan), var(--purple))",
            borderRadius: "2px",
            transition: "width 0.1s ease",
            boxShadow: "0 0 8px var(--cyan)",
          }}
        />
      </div>

      {/* Phase text */}
      <div
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "var(--cyan)",
          opacity: 0.8,
          marginBottom: "0.5rem",
        }}
      >
        {phase}
      </div>

      {/* Percentage */}
      <div
        style={{
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.1em",
        }}
      >
        {Math.floor(progress)}%
      </div>

      {/* Corner decorations */}
      {["tl", "tr", "bl", "br"].map((pos) => (
        <div
          key={pos}
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            ...(pos.includes("t") ? { top: "24px" } : { bottom: "24px" }),
            ...(pos.includes("l") ? { left: "24px" } : { right: "24px" }),
            borderTop: pos.includes("t") ? "1px solid var(--cyan)" : "none",
            borderBottom: pos.includes("b") ? "1px solid var(--cyan)" : "none",
            borderLeft: pos.includes("l") ? "1px solid var(--cyan)" : "none",
            borderRight: pos.includes("r") ? "1px solid var(--cyan)" : "none",
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
