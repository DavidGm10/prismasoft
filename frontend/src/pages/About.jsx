// ============================================================
// About.jsx — Quiénes somos / Nosotros
// ============================================================
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { stats } from "../data/index";

const values = [
  {
    icon: "💡",
    title: "Innovación",
    description: "Nos mantenemos a la vanguardia del ecosistema tecnológico, adoptando y aplicando las últimas herramientas y metodologías.",
    color: "#00f5ff",
  },
  {
    icon: "🛡️",
    title: "Resiliencia",
    description: "Construimos sistemas que resisten, escalamos con los desafíos y nos adaptamos a los cambios del mercado con agilidad.",
    color: "#a855f7",
  },
  {
    icon: "🤝",
    title: "Colaboración",
    description: "Trabajamos como socios estratégicos de nuestros clientes. Su éxito es nuestra métrica de éxito más importante.",
    color: "#ff006e",
  },
  {
    icon: "🎯",
    title: "Precisión",
    description: "Cada línea de código tiene propósito. Ingeniería de software con atención obsesiva al detalle y la calidad.",
    color: "#39ff14",
  },
  {
    icon: "🚀",
    title: "Velocidad",
    description: "Metodologías ágiles y entregas iterativas que te permiten ver resultados desde las primeras semanas del proyecto.",
    color: "#ffd700",
  },
  {
    icon: "🌐",
    title: "Visión Global",
    description: "Software diseñado para escalar. Construimos con los estándares internacionales de las mejores software houses del mundo.",
    color: "#0066ff",
  },
];

export default function About() {
  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Hero about */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              marginBottom: "6rem",
            }}
          >
            <div>
              <div className="section-tag" style={{ marginBottom: "1rem" }}>Quiénes somos</div>
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: "800",
                  fontFamily: "'Exo 2', sans-serif",
                  lineHeight: "1.15",
                  marginBottom: "1.5rem",
                }}
              >
                Somos <span className="gradient-text">PrismaSoft</span>
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: "1.8",
                  marginBottom: "1.25rem",
                }}
              >
                Somos una empresa de desarrollo de software fundada por desarrolladores
                apasionados con una misión clara: construir tecnología que transforme
                la forma en que las empresas operan y compiten.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: "1.8",
                  marginBottom: "2rem",
                }}
              >
                Como un prisma que refracta la luz en todos sus colores, nosotros
                tomamos las ideas de nuestros clientes y las transformamos en soluciones
                digitales brillantes, precisas y únicas.
              </p>
              <Link to="/equipo" style={{ textDecoration: "none" }}>
                <button className="btn-primary">Conoce el equipo →</button>
              </Link>
            </div>

            {/* Stats card */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((s) => (
                <PrismaticCard
                  key={s.label}
                  className="glass-card"
                  style={{ padding: "1.5rem", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontSize: "2.2rem",
                      fontWeight: "900",
                      fontFamily: "'Orbitron', monospace",
                      color: s.color,
                      textShadow: `0 0 20px ${s.color}60`,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </PrismaticCard>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div style={{ marginBottom: "5rem", textAlign: "center" }}>
            <div className="section-tag" style={{ justifyContent: "center", marginBottom: "1rem" }}>Filosofía</div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                fontWeight: "700",
                fontFamily: "'Exo 2', sans-serif",
                marginBottom: "1.5rem",
              }}
            >
              Nuestros <span className="gradient-text">Valores</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "1rem",
                maxWidth: "560px",
                margin: "0 auto 3rem",
              }}
            >
              Los principios que guían cada decisión técnica y cada interacción
              con nuestros clientes.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {values.map((v) => (
                <PrismaticCard
                  key={v.title}
                  className="glass-card"
                  style={{ padding: "1.75rem", textAlign: "left" }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: v.color,
                      marginBottom: "0.6rem",
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.65" }}>
                    {v.description}
                  </p>
                </PrismaticCard>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div
            style={{
              padding: "3.5rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,255,0.1)",
              borderRadius: "24px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, rgba(168,85,247,0.05), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔮</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700", marginBottom: "1rem", fontFamily: "'Exo 2', sans-serif" }}>
              Nuestra <span className="gradient-text">Misión</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "700px",
                margin: "0 auto 2rem",
                lineHeight: "1.8",
                fontStyle: "italic",
              }}
            >
              "Democratizar el acceso a software de alta calidad para empresas que quieren
              crecer. Construimos con pasión, entregamos con precisión y evolucionamos
              con nuestros clientes."
            </p>
            <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.85rem 2.5rem" }}>
                Trabajemos juntos ✦
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </MainLayout>
  );
}
