// ============================================================
// Process.jsx — Timeline corregido + scroll reveal bidireccional
// + iconos SVG planos profesionales
// ============================================================
import { useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { useScrollReveal, fadeLeftStyle, fadeRightStyle, fadeUpStyle } from "../hooks/useScrollReveal";
import {
  IconSearch, IconEdit, IconCode, IconFlask, IconRocket, IconShield,
} from "../components/Icons";
import { processSteps } from "../data/index";

// SVG icon por fase
const PHASE_ICONS = {
  "01": IconSearch, "02": IconEdit, "03": IconCode,
  "04": IconFlask,  "05": IconRocket, "06": IconShield,
};

// ─── CONTENIDO DE CADA CARD ─────────────────────────────
function StepContent({ step }) {
  const Icon = PHASE_ICONS[step.step] || IconCode;
  return (
    <PrismaticCard className="glass-card" style={{ padding: "1.6rem" }}>
      <div style={{
        fontSize: "0.58rem", fontFamily: "monospace", color: step.color,
        letterSpacing: "0.25em", marginBottom: "0.5rem", textTransform: "uppercase",
      }}>
        FASE {step.step}
      </div>
      <h3 style={{
        fontSize: "1.05rem", fontWeight: "700", color: "white",
        marginBottom: "0.55rem", fontFamily: "'Exo 2', sans-serif",
        display: "flex", alignItems: "center", gap: "0.6rem",
      }}>
        <Icon color={step.color} size={18} />
        {step.title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.52)", lineHeight: "1.68", margin: 0 }}>
        {step.description}
      </p>
    </PrismaticCard>
  );
}

// ─── FILA DESKTOP ────────────────────────────────────────
function DesktopRow({ step, index }) {
  const isLeft = index % 2 === 0;
  const { ref, visible } = useScrollReveal({ threshold: 0.15 });
  const cardStyle = isLeft
    ? fadeLeftStyle(visible, 0.05)
    : fadeRightStyle(visible, 0.05);
  const dotStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.6)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  const Icon = PHASE_ICONS[step.step] || IconCode;

  return (
    <div
      ref={ref}
      style={{
        display: "flex", alignItems: "center",
        marginBottom: "2.5rem", minHeight: "110px",
      }}
    >
      {/* LEFT half */}
      <div style={{ flex: 1, paddingRight: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
        {isLeft ? (
          <div style={{ width: "100%", maxWidth: "400px", ...cardStyle }}>
            <StepContent step={step} />
          </div>
        ) : (
          <div style={{
            height: "1px", width: "100%",
            background: `linear-gradient(90deg, transparent, ${step.color}35)`,
            ...dotStyle,
          }} />
        )}
      </div>

      {/* CENTER dot */}
      <div style={{
        flexShrink: 0, width: "54px", height: "54px", borderRadius: "50%",
        background: `${step.color}15`, border: `2px solid ${step.color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 22px ${step.color}45, 0 0 44px ${step.color}18`,
        zIndex: 2, ...dotStyle,
      }}>
        <Icon color={step.color} size={22} />
      </div>

      {/* RIGHT half */}
      <div style={{ flex: 1, paddingLeft: "2.5rem", display: "flex", justifyContent: "flex-start" }}>
        {!isLeft ? (
          <div style={{ width: "100%", maxWidth: "400px", ...cardStyle }}>
            <StepContent step={step} />
          </div>
        ) : (
          <div style={{
            height: "1px", width: "100%",
            background: `linear-gradient(90deg, ${step.color}35, transparent)`,
            ...dotStyle,
          }} />
        )}
      </div>
    </div>
  );
}

// ─── PASO MOBILE ─────────────────────────────────────────
function MobileStep({ step, index, isLast }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.12 });
  const style = fadeUpStyle(visible, 0);
  const Icon = PHASE_ICONS[step.step] || IconCode;

  return (
    <div ref={ref} style={{ display: "flex", gap: "0.9rem", ...style }}>
      {/* Left: icon + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          background: `${step.color}15`, border: `2px solid ${step.color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 14px ${step.color}38`, flexShrink: 0,
        }}>
          <Icon color={step.color} size={18} />
        </div>
        {!isLast && (
          <div style={{
            width: "2px", flex: 1, minHeight: "20px",
            background: `linear-gradient(180deg, ${step.color}55, transparent)`,
            margin: "0.4rem 0",
          }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "1.4rem" }}>
        <PrismaticCard className="glass-card" style={{ padding: "1.2rem" }}>
          <div style={{ fontSize: "0.57rem", fontFamily: "monospace", color: step.color, letterSpacing: "0.2em", marginBottom: "0.35rem" }}>
            FASE {step.step}
          </div>
          <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "white", marginBottom: "0.4rem", fontFamily: "'Exo 2', sans-serif" }}>
            {step.title}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.52)", lineHeight: "1.65", margin: 0 }}>
            {step.description}
          </p>
        </PrismaticCard>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────
export default function Process() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <MainLayout>
      <section style={{ padding: "9rem 1.5rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              textAlign: "center", marginBottom: "5rem",
              ...fadeUpStyle(headerVisible),
            }}
          >
            <div className="section-tag" style={{ justifyContent: "center" }}>Metodología</div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
              Nuestro <span className="gradient-text">Proceso</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: "1.75" }}>
              Un enfoque estructurado que garantiza calidad en cada etapa del desarrollo
              de tu proyecto.
            </p>
          </div>

          {/* ── DESKTOP TIMELINE ── */}
          <div className="timeline-desktop" style={{ position: "relative" }}>
            {/* Vertical gradient line */}
            <div style={{
              position: "absolute", left: "50%", top: "27px", bottom: "27px",
              width: "1px", transform: "translateX(-50%)",
              background: "linear-gradient(180deg, transparent 0%, var(--cyan) 8%, var(--purple) 35%, var(--pink) 65%, var(--green) 92%, transparent 100%)",
              zIndex: 1,
            }} />
            {processSteps.map((step, i) => (
              <DesktopRow key={step.step} step={step} index={i} />
            ))}
          </div>

          {/* ── MOBILE TIMELINE ── */}
          <div className="timeline-mobile" style={{ display: "none" }}>
            {processSteps.map((step, i) => (
              <MobileStep
                key={step.step} step={step} index={i}
                isLast={i === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile  { display: block !important; }
        }
      `}</style>
    </MainLayout>
  );
}
