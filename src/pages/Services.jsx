// ============================================================
// Services.jsx — Servicios con scroll reveal + SVG icons
// ============================================================
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { useScrollReveal, fadeUpStyle, scaleStyle } from "../hooks/useScrollReveal";
import {
  IconCode, IconServer, IconBuilding, IconZap,
  IconLink, IconLayers, IconDatabase, IconPenTool,
} from "../components/Icons";
import { services } from "../data/index";

const SERVICE_ICONS = {
  1: IconCode, 2: IconServer, 3: IconBuilding, 4: IconZap,
  5: IconLink, 6: IconLayers, 7: IconDatabase, 8: IconPenTool,
};

function Reveal({ children, delay = 0, direction = "up" }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });
  const style = direction === "scale" ? scaleStyle(visible, delay) : fadeUpStyle(visible, delay);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function Services() {
  return (
    <MainLayout>
      <section style={{ padding: "9rem 1.5rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>Lo que hacemos</div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
                Nuestros <span className="gradient-text">Servicios</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: "1.75" }}>
                Soluciones integrales de ingeniería de software para empresas que quieren crecer
                con tecnología de alto rendimiento.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {services.map((svc, i) => {
              const Icon = SERVICE_ICONS[svc.id] || IconCode;
              return (
                <Reveal key={svc.id} delay={i * 0.06}>
                  <PrismaticCard className="glass-card" style={{ padding: "2rem", height: "100%" }}>
                    <div style={{
                      width: "50px", height: "50px", borderRadius: "12px",
                      background: `${svc.color}12`, border: `1px solid ${svc.color}28`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "1.25rem",
                    }}>
                      <Icon color={svc.color} size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.7rem", color: svc.color, fontFamily: "'Exo 2', sans-serif" }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.53)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
                      {svc.description}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {svc.tags.map((tag) => (
                        <span key={tag} style={{
                          padding: "0.18rem 0.65rem",
                          background: `${svc.color}10`, border: `1px solid ${svc.color}25`,
                          borderRadius: "100px", fontSize: "0.63rem", color: svc.color, fontFamily: "monospace",
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

          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
                ¿No encuentras exactamente lo que necesitas?
              </p>
              <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "0.85rem 2.5rem" }}>
                  Cuéntanos tu proyecto →
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
