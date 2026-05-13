// ============================================================
// Home.jsx — Página principal de PrismaSoft
// ✓ Animaciones scroll bidireccionales (aparece/desaparece)
// ✓ Iconos SVG planos profesionales (sin emojis)
// ✓ Terminal responsive en mobile
// ============================================================
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { useScrollReveal, fadeUpStyle, fadeLeftStyle, fadeRightStyle, scaleStyle } from "../hooks/useScrollReveal";
import {
  IconCode, IconServer, IconBuilding, IconZap, IconLink, IconLayers,
  IconDatabase, IconPenTool, IconRocket, IconShield, IconCheck,
} from "../components/Icons";
import { services, stats, technologies, testimonials } from "../data/index";

// ─── ICONO POR SERVICIO ──────────────────────────────────
const SERVICE_ICONS = {
  1: IconCode, 2: IconServer, 3: IconBuilding, 4: IconZap,
  5: IconLink, 6: IconLayers, 7: IconDatabase, 8: IconPenTool,
};

// ─── COUNTER (solo cuenta una vez, no retrocede) ─────────
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true;
      const num = parseFloat(target.replace(/[^0-9.]/g, ""));
      const steps = 50;
      const step = num / steps;
      let current = 0;
      const iv = setInterval(() => {
        current += step;
        if (current >= num) { setCount(num); clearInterval(iv); }
        else setCount(Math.floor(current));
      }, 1500 / steps);
    }
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── TERMINAL WIDGET ─────────────────────────────────────
function TerminalWidget() {
  const lines = [
    { text: "$ prismasoft init --project", delay: 0, color: "rgba(255,255,255,0.8)" },
    { text: "✓  Analizando requerimientos...", delay: 700, color: "#00f5ff" },
    { text: "✓  Arquitectura definida", delay: 1400, color: "#39ff14" },
    { text: "✓  Iniciando desarrollo...", delay: 2100, color: "#a855f7" },
    { text: "→  Sistema listo para producción", delay: 2800, color: "#ffd700" },
  ];

  const [shown, setShown] = useState([]);

  useEffect(() => {
    lines.forEach((l, i) => {
      setTimeout(() => setShown((v) => [...v, i]), l.delay + 600);
    });
  }, []);

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.75)",
        border: "1px solid rgba(0,245,255,0.18)",
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        fontFamily: "'Courier New', monospace",
        fontSize: "clamp(0.65rem, 2vw, 0.8rem)",
        lineHeight: "2",
        backdropFilter: "blur(10px)",
        width: "100%",
        maxWidth: "380px",
        boxShadow: "0 0 40px rgba(0,245,255,0.08), 0 20px 60px rgba(0,0,0,0.4)",
        boxSizing: "border-box",
      }}
    >
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.6rem" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", flexShrink: 0 }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", flexShrink: 0 }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", flexShrink: 0 }} />
        <span style={{ marginLeft: "0.4rem", color: "rgba(255,255,255,0.28)", fontSize: "0.6rem", letterSpacing: "0.05em" }}>
          prismasoft — terminal
        </span>
      </div>

      {/* Lines */}
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            color: l.color,
            opacity: shown.includes(i) ? 1 : 0,
            transform: shown.includes(i) ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            whiteSpace: "pre",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {l.text}
          {i === lines.length - 1 && shown.includes(i) && (
            <span className="terminal-cursor" style={{ color: "#00f5ff" }}>▋</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── REVEAL WRAPPER ──────────────────────────────────────
// Envuelve cualquier elemento con animación scroll bidireccional
function Reveal({ children, style: extraStyle = {}, delay = 0, direction = "up", distance = 28 }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.12 });
  const animStyle =
    direction === "up" ? fadeUpStyle(visible, delay, distance) :
    direction === "left" ? fadeLeftStyle(visible, delay, distance) :
    direction === "right" ? fadeRightStyle(visible, delay, distance) :
    scaleStyle(visible, delay);

  return (
    <div ref={ref} style={{ ...animStyle, ...extraStyle }}>
      {children}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 120); }, []);

  return (
    <MainLayout>

      {/* ════════════ HERO ════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 50% at 20% 40%, rgba(0,245,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 60%, rgba(168,85,247,0.06) 0%, transparent 60%)
          `,
        }} />

        <div style={{
          maxWidth: "1200px", width: "100%", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2.5rem",
          alignItems: "center",
          position: "relative", zIndex: 1,
        }}>

          {/* Left text */}
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.9s ease",
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.2)",
              borderRadius: "100px", padding: "0.3rem 1rem", marginBottom: "1.5rem",
              fontSize: "0.68rem", fontFamily: "monospace", color: "var(--cyan)", letterSpacing: "0.1em",
            }}>
              <span style={{
                width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%",
                boxShadow: "0 0 8px var(--green)", display: "inline-block",
                animation: "blink 1.5s ease-in-out infinite",
              }} />
              &gt;_ SYSTEM READY v2.4
            </div>

            <h1 style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: "800", lineHeight: "1.1",
              marginBottom: "1.25rem",
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "-0.02em",
            }}>
              Construimos software que{" "}
              <span className="gradient-text">transforma ideas</span>{" "}en{" "}
              <span style={{ background: "linear-gradient(135deg,var(--purple),var(--pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                soluciones reales
              </span>
            </h1>

            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: "520px", lineHeight: "1.8", marginBottom: "2.25rem" }}>
              Desarrollo de software de alta velocidad y precisión técnica. Escalabilidad
              empresarial con enfoque en diseño de vanguardia y arquitectura robusta.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Link to="/proyectos" style={{ textDecoration: "none" }}>
                <button className="btn-primary">Ver proyectos →</button>
              </Link>
              <Link to="/contacto" style={{ textDecoration: "none" }}>
                <button className="btn-neon">Contactar</button>
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontSize: "1.9rem", fontWeight: "900", color: s.color,
                    fontFamily: "'Orbitron', monospace",
                    textShadow: `0 0 18px ${s.color}55`,
                  }}>
                    <AnimatedCounter
                      target={s.value}
                      suffix={s.value.includes("+") ? "+" : s.value.includes("%") ? "%" : ""}
                    />
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.42)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div
            className="hero-terminal float-anim"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(18px)",
              transition: "all 1.1s ease 0.3s",
              flexShrink: 0,
            }}
          >
            <TerminalWidget />
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          opacity: 0.35, zIndex: 1,
        }}>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(180deg,var(--cyan),transparent)", animation: "float 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--cyan)", fontFamily: "monospace" }}>SCROLL</span>
        </div>
      </section>

      {/* ════════════ SERVICES PREVIEW ════════════ */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <Reveal direction="up" delay={0}>
            <div style={{ marginBottom: "0.75rem" }}>
              <div className="section-tag">Servicios</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.7rem)", fontWeight: "700", fontFamily: "'Exo 2', sans-serif" }}>
                Nuestros <span className="gradient-text">Servicios</span>
              </h2>
              <Link to="/servicios" style={{ textDecoration: "none" }}>
                <button className="btn-neon" style={{ fontSize: "0.65rem" }}>Ver todos →</button>
              </Link>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
            {services.slice(0, 6).map((svc, i) => {
              const Icon = SERVICE_ICONS[svc.id] || IconCode;
              return (
                <Reveal key={svc.id} delay={i * 0.07} direction="up">
                  <PrismaticCard className="glass-card" style={{ padding: "1.75rem", height: "100%" }}>
                    {/* Icon box */}
                    <div style={{
                      width: "46px", height: "46px", borderRadius: "10px",
                      background: `${svc.color}12`, border: `1px solid ${svc.color}28`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "1rem",
                    }}>
                      <Icon color={svc.color} size={22} />
                    </div>

                    <h3 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "0.55rem", color: svc.color, fontFamily: "'Exo 2', sans-serif" }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.52)", lineHeight: "1.65", marginBottom: "1rem" }}>
                      {svc.description}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {svc.tags.map((tag) => (
                        <span key={tag} style={{
                          padding: "0.18rem 0.6rem",
                          background: `${svc.color}10`, border: `1px solid ${svc.color}25`,
                          borderRadius: "100px", fontSize: "0.62rem", color: svc.color, fontFamily: "monospace",
                        }}>
                          &gt;_ {tag}
                        </span>
                      ))}
                    </div>
                  </PrismaticCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ TECH STACK ════════════ */}
      <section style={{ padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal direction="up">
            <div className="section-tag" style={{ marginBottom: "0.75rem" }}>Stack Tecnológico</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: "700", marginBottom: "2.25rem", fontFamily: "'Exo 2', sans-serif" }}>
              Tecnologías que <span className="gradient-text-green">dominamos</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.45rem",
                    padding: "0.45rem 0.9rem",
                    background: "rgba(255,255,255,0.03)", border: `1px solid ${tech.color}22`,
                    borderRadius: "100px", fontSize: "0.83rem", color: "rgba(255,255,255,0.72)",
                    transition: "all 0.3s ease", cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tech.color + "70";
                    e.currentTarget.style.background = tech.color + "12";
                    e.currentTarget.style.color = tech.color;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${tech.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tech.color + "22";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "0.9rem" }}>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <Reveal direction="up">
            <div className="section-tag" style={{ marginBottom: "0.75rem" }}>Testimonios</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: "700", marginBottom: "2.75rem", fontFamily: "'Exo 2', sans-serif" }}>
              Lo que dicen <span className="gradient-text">nuestros clientes</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1} direction="up">
                <PrismaticCard className="glass-card" style={{ padding: "1.75rem", height: "100%" }}>
                  {/* Star rating using SVG */}
                  <div style={{ display: "flex", gap: "3px", marginBottom: "0.75rem" }}>
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="#ffd700">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", lineHeight: "1.72", marginBottom: "1.25rem", fontStyle: "italic" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}70)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.78rem", fontWeight: "700", color: "#030712",
                      fontFamily: "'Orbitron', monospace",
                    }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.84rem", fontWeight: "600", color: "white" }}>{t.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.38)" }}>{t.role} · {t.company}</div>
                    </div>
                  </div>
                </PrismaticCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section style={{ padding: "5rem 1.5rem 6rem", position: "relative", zIndex: 1 }}>
        <Reveal direction="scale">
          <div style={{
            maxWidth: "780px", margin: "0 auto", textAlign: "center",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,245,255,0.1)",
            borderRadius: "24px", padding: "4rem 2rem", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,245,255,0.04), transparent 70%)", pointerEvents: "none" }} />
            <div className="section-tag" style={{ justifyContent: "center", marginBottom: "1rem" }}>¿Listo para empezar?</div>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", fontWeight: "800", marginBottom: "1rem", fontFamily: "'Exo 2', sans-serif" }}>
              Tu proyecto, <span className="gradient-text">nuestra misión</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.98rem", maxWidth: "460px", margin: "0 auto 2.5rem", lineHeight: "1.75" }}>
              Cuéntanos tu idea y convertimos tu visión en software de alto rendimiento.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "0.85rem 2.25rem" }}>
                  Comenzar proyecto →
                </button>
              </Link>
              <Link to="/contacto" style={{ textDecoration: "none" }}>
                <button className="btn-neon">Ver contacto</button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Responsive: ocultar terminal en mobile muy pequeño, apilar hero */}
      <style>{`
        @media (max-width: 860px) {
          .hero-terminal {
            display: none !important;
          }
          section:first-of-type > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .hero-terminal { display: none !important; }
        }
      `}</style>
    </MainLayout>
  );
}
